const { Router } = require('express');
const {
  getAllOrders,
  getOrder,
  addOrder,
  markAsShipped,
} = require('./order.controller');
const { adminOnly, auth, exists, validate } = require('../middlewares');
const { OrderModel, OrderCreateValidationSchema } = require('./order.model');

const orderRouter = Router()
  .get('/orders', auth, getAllOrders)
  .get('/orders/:id', auth, exists(OrderModel), getOrder)
  .post('/orders', auth, validate(OrderCreateValidationSchema), addOrder)
  .put('/orders/:id', auth, markAsShipped);

module.exports = { orderRouter };
