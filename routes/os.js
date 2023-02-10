const express = require('express');
const router = express.Router();
const os = require('os')

// lister tout les infos
router.get('/', function (req,res, next) {
    try {
     res.status(200).json({
        hostname: os.hostname(),
        type: os.type(),
        platform: os.platform()
     });
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
});

// lister tout les processeurs
router.get('/cpus', function(req,res, next){
    try {
       res.status(200).json({
        cpus: os.cpus()
       }); 
    } catch (error) {
        res.status(404).json({ message: error.message});  
    }
});

// lister un seul processeur
router.get('/cpus/:id', function(req,res, next){
    const id = req.params.id;
    const cpus = os.cpus();
    try {
        res.status(200).json({
            cpu: cpus[id]
        });
    } catch (error) {
        res.status(404).json({ message: error.message});  
    }
});


module.exports = router;