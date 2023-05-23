const { Router } = require('express');
const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} = require('./product.controller');

const { adminOnly, auth, exists, validate } = require('../middlewares');
const {
  ProductCreateValidationSchema,
  ProductUpdateValidationSchema,
  ProductModel,
} = require('./product.model');

const { CategoryModel } = require('../category/category.model');

const productRouter = Router()
  .get('/products', getAllProducts)
  .get('/products/:id', exists(ProductModel), getProduct)
  .get('/products/byCategory/:id', exists(CategoryModel), getProductsByCategory)
  .post(
    '/products',
    auth,
    adminOnly,
    validate(ProductCreateValidationSchema),
    addProduct,
  )
  .put(
    '/products/:id',
    auth,
    adminOnly,
    exists(ProductModel),
    validate(ProductUpdateValidationSchema),
    updateProduct,
  )
  .delete(
    '/products/:id',
    auth,
    adminOnly,
    exists(ProductModel),
    deleteProduct,
  );

module.exports = { productRouter };
