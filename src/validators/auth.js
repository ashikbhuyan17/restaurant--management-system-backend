const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = [
    check('firstName')
        .notEmpty()
        .withMessage('firstName is required'),

    check('lastName')
        .notEmpty()
        .withMessage('lastName is required'),

    check('email')
        .isEmail()
        .withMessage('email is not valid'),

    check('password', 'The password must be 8+ chars long and contain a number')
        .not()
        .isIn(['12345678', 'password', 'passwordAs@12'])
        .withMessage('Do not use a common word as the password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "i")
        .withMessage('Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:'),
]

exports.validateSignInRequest = [
    check('email')
        .isEmail()
        .withMessage('Valid email is required'),
    check('password', 'The password must be 8+ chars long and contain a number')
        // .not()
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "i")
        .withMessage('Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:'),
]


exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0 && !validationResult(req).isEmpty()) {

        return res.status(400).json(
            {
                message: {
                    method: req.method,
                    status: res.statusCode,
                    error: errors.array()[0].msg
                }
            }
        )
    }
    next()
}