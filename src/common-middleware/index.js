
const jwt = require('jsonwebtoken');
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
    requireSignIn
}