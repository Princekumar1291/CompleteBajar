const jwt = require("jsonwebtoken");


const isLoggedIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader === "Bearer null") {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;
    req.userType = decoded.userType;

    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

const isSeller = (req, res, next) => {
  if (req.userType !== "seller") {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
  next();
};

const isCustomer = (req, res, next) => {
  if (req.userType !== "customer") {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
  next();
};

module.exports = { isLoggedIn, isSeller,isCustomer };