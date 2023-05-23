const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

const AddressSchema = new Schema(
  {
    street: { type: String, required: true },
    zipcode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const OrderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, default: 0 },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
      default: Math.floor(Math.random() * 1000000),
    },
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    orderItems: { type: [OrderItemSchema], required: true },
    deliveryAddress: { type: AddressSchema, required: true },
    shipped: { type: Boolean, required: false, default: false },
    shippingMethod: {
      type: Schema.Types.ObjectId,
      ref: "shippingMethod",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = models.order || model("order", OrderSchema);

const OrderCreateValidationSchema = Joi.object({
  orderItems: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().strict().required(),
        quantity: Joi.number().strict().required(),
        price: Joi.number(),
      })
    )
    .strict()
    .required(),
  deliveryAddress: Joi.object({
    street: Joi.string().strict().required(),
    zipcode: Joi.string().strict().required(),
    city: Joi.string().strict().required(),
    country: Joi.string().strict().required(),
  })
    .strict()
    .required(),
  shippingMethod: Joi.string().strict().required(),
});

const OrderUpdateValidationSchema = OrderCreateValidationSchema.keys({
  _id: Joi.string().strict().required(),
});

module.exports = {
  OrderModel,
  OrderCreateValidationSchema,
  OrderUpdateValidationSchema,
};
