function one(x, y, result) {
  const { painted } = result;
  return {
    data: { x, y, painted: painted ? true : false },
    error: false
  };
}

module.exports = {
  one
};
