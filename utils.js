// Filtering empty values in object
const sanitizedObj = (obj) =>
  Object.keys(obj).reduce(
    (acc, key) => (obj[key] ? { ...acc, [key]: obj[key] } : acc),
    {}
  );

module.exports = {
  sanitizedObj,
};
