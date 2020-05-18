function sum(a, b) {
  if (typeof a !== 'number' && typeof b !== 'number') {
    throw new TypeError('Arguments should be of type number');
  }

  return a + b;
}

module.exports = sum;
