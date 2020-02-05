const http = require('http');
const path = require('path');
const bodyparser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./utils/database');
const User = require('./models/user');
const Product = require('./models/product');
const express = require('express');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();
app.set('view engine', 'ejs');
//app.set('view engine', 'pug');
app.set('views', 'views');
app.use(bodyparser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});


const adminRouter = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRouter = require('./controllers/error');

app.use("/admin", adminRouter);
app.use(shopRoutes);

app.use(errorController);
Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {
  through: CartItem
});
Product.belongsToMany(Cart, {
  through: CartItem
});

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({
        name: 'Max',
        email: 'test@test.com'
      });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    return user.createCart();
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });