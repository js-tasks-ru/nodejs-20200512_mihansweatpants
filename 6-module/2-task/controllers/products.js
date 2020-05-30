const Product = require('../models/Product');
const mapProduct = require('../dto/mapProduct');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.request.query;

  if (!subcategory) return next();

  const products = await Product.find({subcategory});

  ctx.body = {products: products.map(mapProduct)};
};

module.exports.productList = async function productList(ctx, next) {
  const products = await Product.find();

  ctx.body = {products: products.map(mapProduct)};
};

module.exports.productById = async function productById(ctx, next) {
  const product = await Product.findById(ctx.params.id);

  if (!product) {
    ctx.status = 404;
    return;
  }

  ctx.body = {product: mapProduct(product)};
};

