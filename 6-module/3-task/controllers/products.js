const Product = require('../models/Product');

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const {query} = ctx.request.query;

  const products = await Product.find(
      {
        $text: {
          $search: query,
        },
      },
      {
        score: {
          $meta: 'textScore',
        },
      },
  ).sort({score: {$meta: 'textScore'}});

  ctx.body = {products: products.map(mapProduct)};
};

function mapProduct({
  id,
  title,
  images,
  category,
  subcategory,
  price,
  description,
}) {
  return {
    id,
    title,
    images,
    category,
    subcategory,
    price,
    description,
  };
}
