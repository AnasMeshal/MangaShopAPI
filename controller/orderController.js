const { Order } = require("../db/models");
const OrderItem = require("../db/models/OrderItem");

exports.checkout = async (req, res, next) => {
  try {
    const newOrder = await Order.create({ userId: req.user.id });
    const cart = req.body.map((item) => ({
      ...item,
      orderId: newOrder.id,
    }));
    const newOrderitem = await OrderItem.bulkCreate(cart);
    res.status(201).json(newOrderitem);
  } catch (error) {
    next(error);
  }
};
