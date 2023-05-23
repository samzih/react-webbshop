const { Router } = require('express');
const { getAllCategories, getCategory } = require('./category.controller');

const { exists } = require('../middlewares');
const { CategoryModel } = require('./category.model');

const categoryRouter = Router()
  .get('/categories', getAllCategories)
  .get('/categories/:id', exists(CategoryModel), getCategory);

module.exports = { categoryRouter };
