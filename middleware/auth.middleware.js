const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTION") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};
