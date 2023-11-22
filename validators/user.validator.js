const { body, param, validationResult } = require("express-validator");

const userCreateValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage("Name must be 3 to 12 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isString()
    .trim()
    .isLength({ min: 0, max: 124 })
    .isEmail()
    .withMessage("Is not a valid email")
    ,
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .trim()
    .isLength({ min: 6, max: 12 })
    .withMessage("Password must be 6 to 12 characters")
    ,

  (req, res, next) => {
    const errors = validationResult(req);
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ status: "error", errors });
    }
    next();
  },
];

const userUpdateValidator = [
    param("id").notEmpty().withMessage("Id is required"),
    body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage("Name must be 3 to 12 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isString()
    .trim()
    .isLength({ min: 0, max: 124 })
    .isEmail()
    .withMessage("Is not a valid email")
    ,
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .trim()
    .isLength({ min: 6, max: 12 })
    .withMessage("Password must be 6 to 12 characters"),
    

    (req,res,next) => {
        const errors = validationResult(req);
        if (!validationResult(req).isEmpty()) {
          return res.status(400).json({ status: "error", errors });
        }

        next();
    }

    
]

module.exports = {
  userCreateValidator,
  userUpdateValidator
};
