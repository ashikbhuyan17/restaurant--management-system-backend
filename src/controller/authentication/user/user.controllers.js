const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../../models/authentication/user/user.models')


const signIn = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) {
                return res.status(400).json({ message: "user not  found" });
            }
            if (user) {
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({ email: user.email, _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' })
                    const { _id, firstName, lastName, email, role, fullName } = user
                    return res.status(200).json({
                        token,
                        user: {
                            _id, email, role, fullName
                        }
                    });

                } else {
                    return res.status(400).json({ message: "password does not match" });
                }

            } else {
                return res.status(400).json({ message: "something went wrong" });
            }

        })
}


const signUp = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) {
                return res.status(400).json({ message: 'user already exists' });
            }
            // console.log(req.body);
            const { firstName, lastName, userName, contactNumber, email, password } = req.body;
            const _user = new User({
                firstName,
                lastName,
                userName: userName + Math.floor(Math.random() * 10),
                contactNumber,
                email,
                password,

            })
            _user.save((error, data) => {
                // console.log("DATA", data);
                if (error) {
                    return res.status(400).json({ error: "something went wrong" })
                }
                if (data) {
                    // return res.status(201).json({ user: data })
                    return res.status(201).json({ message: "user created successfully" })
                }
            })
        })
}

const getAllUser = (req, res) => {
    User.find()
        .exec((err, user) => {
            // console.log(user);
            if (err) {
                res.status(400).json({ message: "not found" })
            }
            if (user) {
                res.status(200).json({ user: user })
            }
        })
}


const requireSignIn = (req, res, next) => {
    // console.log("header", req.headers, req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(400).json({ message: "Authenticate Required header" });
    } else {

        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        if (token) {
            const user = jwt.verify(token, process.env.JWT_SECRET)
            // console.log("user", req.user);
            // console.log(
            //     user
            // );
            req.user = user;
        } else {
            return res.status(400).json({ message: "Authenticate Required" });

        }




    }
    next()
}

module.exports = {
    signIn,
    signUp,
    getAllUser, requireSignIn
}