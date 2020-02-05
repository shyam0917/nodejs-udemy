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
	Product.fetchAll().then(products => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin Products',
			path: '/admin/products'
		});
	}).catch(err => {
		console.log(err);
	})
}

exports.postAddProduct = (req, res) => {
	const title = req.body.title;
	const price = req.body.price;
	const description = req.body.description;
	const imageUrl = req.body.imageUrl;
	const product = new Product(title, price, description, imageUrl, null, req.user._id)
	product.save().then(result => {
		console.log("Product Saved");
		res.redirect('/admin/products');
	}).catch(err => {
		console.log(err);
	})
}

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/');
	}
	const prodId = req.params.productId;
	Product.findById(prodId)
		.then(product => {
			if (!product) {
				return res.redirect('/');
			}
			res.render('admin/edit-product', {
				pageTitle: 'Edit Product',
				path: '/admin/edit-product',
				editing: editMode,
				product: product
			});
		})
		.catch(err => console.log(err));
};

exports.postEditProduct = (req, res) => {
	const prodId = req.body.productId;
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;

	const product = new Product(title, price, description, imageUrl, prodId);
	product.save().then(result => {
		console.log("Updated Successfully");
		res.redirect('/admin/products');
	})


}

exports.postDeleteProduct = (req, res) => {
	const prodId = req.body.productId;
	Product.deleteById(prodId).then(result => {
		console.log('DESTROYED PRODUCT');
		res.redirect('/admin/products');
	}).catch(err => {
		console.log(err);
	})
}