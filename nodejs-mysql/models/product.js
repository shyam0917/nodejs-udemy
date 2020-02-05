// const fs = require('fs');
// const path = require('path');

const db = require('../utils/database');

// const Cart = require('./cart');
// const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     }
//     cb(JSON.parse(fileContent));

//   })
// }


module.exports = class Product {

  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES(?,?,?,?)', [this.title, this.price, this.imageUrl, this.description]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id =?', [id])
  }



}