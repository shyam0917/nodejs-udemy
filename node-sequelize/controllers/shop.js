const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.findAll().then((products) => {
        res.render('shop/product-list', {
            pageTitle: "All Products",
            prods: products,
            path: '/products',
        });
    }).catch(err => {
        console.log("err", err);
    })

}

exports.getIndex = (req, res, next) => {
    // Product.fetchAll()
    Product.findAll()
        .then((products) => {
            res.render('shop/index', {
                pageTitle: "Shop",
                prods: products,
                path: '/',
            })
        }).catch(err => {
            console.log(err);
        })
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/chekout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}

exports.getProduct = (req, res, next) => {
    let id = req.params.productId;
    Product.findByPk(id).then((product) => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        })
    }).catch(err => {
        console.log("err", err);
    })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};