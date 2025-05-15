const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const models = require('./models/index');
sequelize.models = models;

sequelize
  .sync({ force: true })
  .then(() => {
    return models.User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return models.User.create({
        name: 'user',
        email: 'user@local.com'
      });
    }
    return user;
  })
  .then(user => {
    app.use((req, res, next) => {
      req.user = user;
      next();
    });

    const productAdminRoutes = require('./routes/admin/products');
    app.use('/admin', productAdminRoutes);

    const productRoutes = require('./routes/products');
    app.use(productRoutes);

    app.listen(3002, () => {
      console.log('Server töötab pordil 3002');
    });
  })
  .catch(error => {
    console.log(error);
  });
