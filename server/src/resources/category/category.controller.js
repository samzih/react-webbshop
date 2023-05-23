const { CategoryModel } = require('./category.model');

async function getAllCategories(req, res) {
  const categories = await CategoryModel.find({});
  res.status(200).json(categories);
}

async function getCategory(req, res) {
  const category = await CategoryModel.findOne({
    _id: req.params.id,
  });
  res.status(200).json(category);
}

module.exports = {
  getAllCategories,
  getCategory,
};
