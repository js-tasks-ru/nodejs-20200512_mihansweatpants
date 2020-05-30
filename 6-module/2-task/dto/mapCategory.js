const mapSubcategory = require('./mapSubcategory');

function mapCategory({id, title, subcategories}) {
  return {id, title, subcategories: subcategories.map(mapSubcategory)};
}

module.exports = mapCategory;
