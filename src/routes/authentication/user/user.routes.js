const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../../models/authentication/user/user.models')
const { signIn, signUp, getAllUser, } = require('../../../controller/authentication/user/user.controllers');
const { validateSignupRequest, validateSignInRequest, isRequestValidated } = require('../../../validators/auth')
const { requireSignIn } = require('../../../common-middleware/index')


router.post('/signUp', validateSignupRequest, isRequestValidated, signUp)
router.post('/signIn', validateSignInRequest, isRequestValidated, signIn)
router.get('/getAllUser', requireSignIn, getAllUser)

router.post('/profile', requireSignIn, (req, res) => {
    // console.log(req.user);
    let email = req.user.email
    // User.findOne({ email }, { hash_password: 0 })
    //     .exec((err, user) => {
    //         if (err) {
    //             res.send({ message: "not found" })
    //         } else if (user) {
    //             console.log(user);
    //             res.status(200).json({ message: user })

    //         }
    //     })
    User.findOne({ email }, { hash_password: 0 })
        .then(user => {
            if (user) {

                let userDetails = {
                    fullName: user.firstName + " " + user.lastName,
                    contactNumber: user.contactNumber,
                    email: user.email,
                    role: user.role,
                };

                res.json({
                    user: userDetails
                })

            } else {
                res.status(200).json({
                    message: 'User Not found'
                });
            }
        })
        .catch(err => {
            console.log(err)
            res.json({
                message: err
            });
        })
})


router.put('/updateProfile/:id', requireSignIn, (req, res) => {
    let contactNumber = req.body.contactNumber
    let role = req.body.role
    console.log(req.params.id);
    User.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            contactNumber: contactNumber,
            role: role,
        },
    }, {
        new: true,
        useFindAndModify: false,
    }, (err) => {
        if (err) {
            res.status(500).json({
                error: "there was a server side error"
            })
        } else {
            res.status(200).json({
                message: req.user

            })
        }
    })

})
// router.put('/updateProfile', requireSignIn, (req, res) => {
//     console.log(req.user);
//     let email = req.user.email
//     let contactNumber = req.body.contactNumber
//     let role = req.body.role
//     User.findByIdAndUpdate({ email }, {
//         $set: {
//             contactNumber: contactNumber,
//             role: role,
//         }
//     },

//         {
//             new: true,
//             useFindAndModify: false,
//         },
//         (err) => {
//             if (err) {
//                 res.status(500).json({
//                     error: "there was a server side error"
//                 })
//             } else {
//                 res.status(200).json({
//                     message: req.user

//                 })
//             }
//         })

// })

module.exports = router;