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
	Product.findAll().then(product => {
		console.log(product);
		res.render('admin/products', {
			prods: product,
			pageTitle: 'Admin Products',
			path: '/admin/products'
		});
	}).catch(err => {
		console.log(err);
	})
}

exports.postAddProduct = (req, res) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	Product.create({
		title: title,
		price: price,
		imageUrl: imageUrl,
		description: description
	}).then(result => {
		console.log('Created Product');
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
	Product.findByPk(prodId)
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

	Product.findByPk(prodId).then(product => {
		product.title = title;
		product.price = price;
		product.imageUrl = imageUrl;
		product.description = description;
		return product.save();
	}).then(result => {
		console.log('UPDATED PRODUCT!');
		res.redirect('/admin/products');
	}).catch(err => {
		console.log(err);
	})


}

exports.postDeleteProduct = (req, res) => {
	const id = req.body.productId;
	Product.findByPk(id).then(product => {
			return product.destroy();
		}).then(result => {
			console.log("Deleted Successfully");
			res.redirect('/admin/products');
		})
		.catch(err => {
			console.log(err);
		})
}