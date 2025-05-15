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
  .then(() => models.User.findByPk(1))
  .then(user => {
    if (!user) {
      return models.User.create({ name: 'user', email: 'user@local.com' });
    }
    return user;
  })
  .then(user => {
    return user.createCart().then(cart => {
      console.log('Cart loodud:', cart.id);
      return user;
    });
  })
  .then(user => {
    app.use((req, res, next) => {
      req.user = user;
      next();
    });

    const shopRoutes = require('./routes/shop');
    app.use(shopRoutes);

    app.listen(3002, () => {
      console.log('Server töötab pordil 3002');
    });
  })
  .catch(err => console.error(err));
