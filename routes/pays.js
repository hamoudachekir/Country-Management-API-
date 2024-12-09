var express=require('express');
const router = express.Router();

// Utilisation de "MODEL"  M
const pays = require("../model/pays");
// appeml du controller
const paysController = require("../controller/paysController");
// Utilisation de "Middlewar"
const validate = require("../middleware/validate");


router.get('/', (req,res)=>{res.end("pays")});

router.get("/test",function(req,res){
    res.end('testpays');});
  
  // userController(fichier).getbyid (fonction dans Controller)
  router.get("/get/:id", paysController.getbyid);
  
  // Fonction 1: [READ] --> cette fonction à travers un Controlleur userController(fichier).getall (fonction dans Controller)
  router.get("/getall", paysController.getall);
  
  // Fonction 4: [Ajout] --> cette fonction à travers un Controlleur et le middleware validate 
                                 //(car on a des conditions)
  router.post("/new", validate, paysController.add);
  
  // Fonction 3: [UPDATE] ---> directement dans la route comme ATELIER 3
  router.put("/update/:id", async function (req, res) {
    try {
      
      await pays.findByIdAndUpdate(req.params.id, req.body, { new: true });
     
    } catch (err) {
      res.send(err);
    }
  });
  
  
  // Fonction 4: [DELETE]  ---> directement dans la route comme ATELIER 3
  router.delete("/delete/:id", async function (req, res) {
    try {
        console.log(req.params.id);
        // Utilisée pour les anciennes versions
              //await pays.findByIdAndRemove(req.params.id);
     await pays.findByIdAndDelete(req.params.id);
  
    } catch (err) {
      res.send(err);
    }
  });
  
  

module.exports=router;