// const path = require('path');
const express = require('express');
const productController = require('../controllers/products');
const shopController = require('../controllers/shop');

//const rootDir = require('../utils/path');
const router = express.Router();

// router.get("/", productController.getProducts);
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/orders', shopController.getOrders);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
router.post('/create-order', shopController.postOrder);


module.exports = router;