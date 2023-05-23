const { OrderModel } = require("./order.model");
const { ProductModel } = require("../product/product.model");

const getAllOrders = async (req, res) => {
  const query = req.session.isAdmin ? {} : { customer: req.session._id };
  const orders = await OrderModel.find(query).populate("customer");
  res.status(200).json(orders);
};
const getOrder = async (req, res) => {
  const order = await OrderModel.findById(req.params.id)
    .populate("customer")
    .populate("orderItems.product")
    .populate("shippingMethod");
  if (
    !req.session.isAdmin &&
    req.session._id.toString() !== order.customer._id.toString()
  ) {
    return res
      .status(403)
      .json("You don not have permissions to perform this request");
  }
  res.status(200).json(order);
};
const addOrder = async (req, res, next) => {
  try {
    //Minska lagersaldot på beställda produkter
    for (const orderItem of req.body.orderItems) {
      let product = await ProductModel.findById(orderItem.product);

      if (product) {
        product.inStock -= orderItem.quantity;
        orderItem.price = product.price * orderItem.quantity;
        await product.save();
      }
    }

    const order = new OrderModel({
      ...req.body,
      customer: req.session._id,
      orderNumber: Math.floor(Math.random() * 1000000),
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

async function markAsShipped(req, res) {
  const order = await OrderModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { shipped: true } },
    { new: true }
  );

  res.status(200).json(order);
}

module.exports = {
  getAllOrders,
  getOrder,
  addOrder,
  markAsShipped,
};
