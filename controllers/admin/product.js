const Product = require('../../models/product');

class adminController {
  async addProduct(req, res) {
    const product = await Product.create({
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description
    });

    res.status(201).json({
      message: 'Product is added',
      productId: product.id
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
  async updateProduct(req, res) {
    const id = req.params.id;
    const product = await Product.findByPk(id);
  
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    product.title = req.body.title;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;
  
    await product.save();
  
    res.status(200).json({ message: 'Product updated' });
  }
  async deleteProduct(req, res) {
    const id = req.params.id;
    const product = await Product.findByPk(id);
  
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    await product.destroy();
  
    res.status(200).json({ message: 'Product deleted' });
  }
  
}

module.exports = new adminController();
