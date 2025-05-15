const Product = require('../models/product');

class productController {
  async getAllProducts(req, res) {
    const products = await Product.findAll();
    console.log(products);
    res.status(201).json({
      products: products
    });
  }
  async getProductById(req, res) {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    res.status(200).json(product);
  }
  
}




module.exports = new productController();
