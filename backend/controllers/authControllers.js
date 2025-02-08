const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");


const emailValidation = body("email").isEmail().withMessage("Enter a valid email");
const nameValidation = body("name").isLength({ min: 2 }).withMessage("Enter a valid name");
const passwordStrongValidation=body("password").isStrongPassword().withMessage("Enter a strong password");
const userTypeValidation = body("userType").isIn(["customer", "seller"]).withMessage("Enter a valid userType");
const isSamePassword = body("confirmPassword").custom((value, { req }) => {
  if (req.body.password !== value) {
    throw new Error("Passwords do not match");
  }
  return true;
});


const signup = [
  emailValidation,
  nameValidation,
  passwordStrongValidation,
  userTypeValidation,
  isSamePassword,
  async (req, res) => {
    const userExit=await User.findOne({email:req.body.email});
    if(userExit){
      return res.status(400).send({ success: false, errors: ["User already exists"] });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ success: false, errors: errors.array().map((error) => error.msg) });
    }
    let { name, email, password , userType } = req.body;
    try {
      password = await bcrypt.hash(password, 8);
      console.log(password);
      const user = await User.create({ name, email, password, userType });
      await user.save();
      res.status(201).send({ success: true, user });
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: error.message });
    }
  }
]

module.exports = {
  signup,
}  