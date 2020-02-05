const http = require('http');
const path = require('path');
const bodyparser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./utils/database');
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

app.use("/admin", adminRouter);
app.use(shopRoutes);

app.use(errorController);
sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });