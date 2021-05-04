const express = require('express');
const router = express.Router();
const productController = require('../controllers/API_productController');
const userController = require('../controllers/API_userController');

/*  -------------------------------------------- PRODUCT ROUTES ------------------------------------------------ */

router.get('/products/page/:offset', productController.paginatedProducts)
router.get('/products/:id', productController.productByPk)
router.post('/products', productController.createProduct)
router.patch('/products/:id', productController.updateProduct)
router.delete('/products/:id', productController.deleteProduct)

/*  -------------------------------------------- USER ROUTES ------------------------------------------------ */

router.get('/users/page/:offset', userController.paginatedUsers)
router.get('/users/:id', userController.userByPk)
router.post('/users', userController.createUser)
router.patch('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)


module.exports = router;