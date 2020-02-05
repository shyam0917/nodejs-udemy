const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true
	})
}

exports.getProducts = (req, res, next) => {
	Product.fetchAll(products => {
		res.render('admin/products', {
			pageTitle: "Admin Products",
			prods: products,
			path: '/admin/products',
			hasProducts: products.length > 0,
			activeShop: true,
			productCSS: true
		});
	})

}

exports.postAddProduct = (req, res) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product(title, imageUrl, description, price);
	product.save();
	// products.push({
	// 	title: req.body.title
	// });
	res.redirect('/');
}