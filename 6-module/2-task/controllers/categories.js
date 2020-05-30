const Category = require('../models/Category');
const mapCategory = require('../dto/mapCategory');

module.exports.categoryList = async function categoryList(ctx, next) {
  const categories = (await Category.find()).map(mapCategory);

  ctx.body = {categories};
};
