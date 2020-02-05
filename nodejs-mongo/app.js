const http = require('http');
const path = require('path');
const bodyparser = require('body-parser');
const errorController = require('./controllers/error');
const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user');
const Product = require('./models/product');
const express = require('express');

const app = express();
app.set('view engine', 'ejs');
//app.set('view engine', 'pug');
app.set('views', 'views');
app.use(bodyparser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
const adminRouter = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRouter = require('./controllers/error');

app.use((req, res, next) => {
  User.findById('5e3994f1f2b1854fbf6cf64c')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id)
      next();
    })
    .catch(err => console.log(err));
});


app.use("/admin", adminRouter);
app.use(shopRoutes);

app.use(errorController);

mongoConnect(() => {
  app.listen(3000);
});