const express = require('express');
const router = express.Router();

const productController = require('../../controllers/admin/product');

router.post('/product/add', (req, res) => productController.addProduct(req, res));
router.get('/product/:id', (req, res) => adminController.getProductById(req, res));
router.put('/product/:id', (req, res) => adminController.updateProduct(req, res));
router.delete('/product/:id', (req, res) => adminController.deleteProduct(req, res));

module.exports = router;
