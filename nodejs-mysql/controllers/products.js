const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true
	})
}

exports.getProducts = (req, res, next) => {
	Product.fetchAll(products => {
		res.render('shop', {
			pageTitle: "Shop",
			prods: products,
			path: '/',
			hasProducts: products.length > 0,
			activeShop: true,
			productCSS: true
		});
	})

}

exports.postAddProduct = (req, res) => {
	const product = new Product(req.body.title);
	product.save();
	// products.push({
	// 	title: req.body.title
	// });
	res.redirect('/');
}