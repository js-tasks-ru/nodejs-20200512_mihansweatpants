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

module.exports = mapProduct;
