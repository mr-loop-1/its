const { query, body, validationResult } = require("express-validator");

exports.createProject = () => [
    body("name")
        .notEmpty()
        .withMessage("invalid email")
        .isAlphanumeric()
        .isLength({ min: 5, max: 10 }),
];
