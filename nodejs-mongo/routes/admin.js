const path = require('path');
const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const adminController = require('../controllers/admin');

router.get("/add-product", adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.post('/edit-product', adminController.postEditProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

router.get('/products', adminController.getProducts);

module.exports = router;
// exports.routes = router;
// exports.products = products;