const fs = require('fs');
const path = require ('path');
const jsonTable = require('../database/jsonTable');
const products = jsonTable('spareparts');

//Validaciones
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')

module.exports = {
    products: (req, res) => {
        //Renderiza el detalle de todos los productos por get
        // Solicito todos los productos utilizando el método all() dentro del objeto products, que trae la función de trabajos s/json.
        let allProducts = products.all();
        res.render('products', { allProducts });
    },
    productdetail: (req, res) => {
        //Renderiza el detalle de un producto por get
        let product = products.find(req.params.id);
        res.render('productDetail', {product}); 
    },
    checkout: (req, res) => {
        //Renderiza el carrito de compras
        res.render('cart');
    },
    publish: (req, res) => {
        //Renderiza la web de creación de producto por get
        res.render('publish');
    },
    createproduct: (req, res) => {
        //Crea producto por post
        let errors = validationResult(req);
        // Me fijo si no hay errores
        if (errors.isEmpty()) {
        let newProduct = {
            //vendor: req.session.user.id, // linkeo al vendedor
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            categorie: req.body.categorie,
            quantity: req.body.quantity,
            //img name_ image // que dato tomar de la imágen para mostrarla?
            original: "",
            piecenumber: "",
            carBrand: "",
            carModel: "",
            carYear: "",
        };
        if (req.body.original != "") {
            newProduct.original = req.body.original
        };
        if (req.body.piecenumber != "") {
            newProduct.piecenumber = req.body.piecenumber
        };
        if (req.body.carBrand != "") {
            newProduct.carBrand = req.body.carBrand
        };
        if (req.body.carModel != "") {
            newProduct.carModel = req.body.carModel
        };
        if (req.body.carYear != "") {
            newProduct.carYear = req.body.carYear
        };
        products.create(newProduct);
        let allProducts = products.all();
        return res.render('products', { allProducts });
    }  
    else {
        return res.render('publish', { errors: errors.mapped(), old: req.body }); 
    }
    },
    edit: (req, res) => {
        let product = products.find(req.params.id);
        res.render('productEdit', {product}); 
    },
    update: (req, res) => {
        let product = req.body;
        product.id = Number(req.params.id);

        // // Si viene una imagen nueva la guardo
        // if (req.file) {
        //     user.image = req.file.filename;
        // // Si no viene una imagen nueva, busco en base la que ya había
        // } else {
        //     oldUser = products.find(user.id);
        //     user.image = oldUser.image;
        // }

        let productId = products.update(product);

        return res.redirect(productId + '/editar');
    },
}