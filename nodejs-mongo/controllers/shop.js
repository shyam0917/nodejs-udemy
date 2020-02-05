const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then((products) => {
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
    Product.fetchAll()
        .then(products => {
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
    req.user
        .getCart()
        .then(products => {
            console.log("ps", products, req.user);
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => console.log(err));
}


exports.getOrders = (req, res, next) => {
    req.user.getOrders().then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders
        });
    }).catch(err => {
        console.log(err);
    })

};

exports.getCheckout = (req, res, next) => {
    res.render('shop/chekout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}

exports.getProduct = (req, res, next) => {
    let id = req.params.productId;
    Product.findById(id).then((product) => {
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
    Product.findById(prodId).then(product => {
        return req.user.addToCart(product)
    }).then(result => {
        console.log(result);
        res.redirect('/cart');
    })
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .deleteItemFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .addOrder()
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};