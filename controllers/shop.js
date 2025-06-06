const Product = require('../models/product');

class ShopController {
  async getCart(req, res) {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    res.status(200).json({ products });
  }

  async addToCart(req, res) {
    const productId = req.body.productId;
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: productId } });

    let product;
    if (products.length > 0) {
      product = products[0];
    }

    let newQuantity = 1;
    if (product) {
      const oldQty = product.cartItem.quantity;
      newQuantity = oldQty + 1;
      await cart.addProduct(product, { through: { quantity: newQuantity } });
    } else {
      product = await Product.findByPk(productId);
      await cart.addProduct(product, { through: { quantity: newQuantity } });
    }

    res.status(200).json({ message: 'Toode lisatud kaardile' });
  }

  async removeFromCart(req, res) {
    const productId = req.body.productId;
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: productId } });

    const product = products[0];
    await product.cartItem.destroy();

    res.status(200).json({ message: 'Toode eemaldatud kaardilt' });
  }
  async createOrder(req, res) {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    if (products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = await req.user.createOrder();
    await order.addProducts(
      products.map(product => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      })
    );

    await cart.setProducts(null);

    res.status(201).json({ message: 'Order created', orderId: order.id });
  }

  async getOrders(req, res) {
    const orders = await req.user.getOrders({ include: ['products'] });
    res.status(200).json({ orders });
  }
}

module.exports = new ShopController();
