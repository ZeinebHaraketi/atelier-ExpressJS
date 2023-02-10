const { error } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs');

// lister tous les produits
router.get('/', function(req,res,next){
    try {
        const prod = fs.readFileSync('products.json', 'utf-8');
        res.status(200).json(JSON.parse(prod));
    } catch (error) {
        res.status(404).json({ message: error.message});  
    }
});

// lister un seul produit
router.get('/:id', function(req,res,next){
    const _id = req.params.id.toUpperCase();
    try {
        const data = fs.readFileSync('products.json', 'utf-8');
        const products = JSON.parse(data);
        
        const product = products[_id];


        if (product) {
            res.status(200).json(product);
        } else {
           res.status(404).json({ message: error.message}); 
        }
    } catch (error) {
        res.status(500).json({ message: error.message});  
    }
});

//Affiche le prix total pour qt fois le prix du produit id
router.get('/:id/:qt', function(req,res,next){
    const _id = req.params.id.toUpperCase();
    const qt = parseInt(req.params.qt);

    try {
        const data = fs.readFileSync('products.json', 'utf-8');
        const products = JSON.parse(data);

        const product = products[_id];

        if (product) {
            //Prix total:
            const total = product.price * qt;
            res.status(200).json({ product, total});
        }
        else{
            res.status(404).json({ message: error.message});  
        }

    } catch (error) {
        res.status(500).json({ message: error.message});  
    }
});

//Ajoutez la route : /products/instock/:qt : Afficher seulement les produits dont le stock est supérieur ou égal à qt.
router.get('/instock/:qt', function(req,res,next){
    const qt = parseInt(req.params.qt);

    try {
        const inStock = Object.values(products).filter(product => product.stock >= qt);
        res.status(200).json({ inStock });
    } catch (error) {
        res.status(500).json({ message: error.message});  
    }
});

module.exports = router;