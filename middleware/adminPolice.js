const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
    if (req.method == "OPTIONS") {
        next();
    }
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.send(403).json({ message: "Admin is not registered" });
        }
        const bearer = authorization.split(" ")[0];
        const token = authorization.split(" ")[1];

        if (bearer != "Bearer" || !token) {
            return res.status(403).json({
                message: "Admin is not registered,(token berilmagan) ",
            });
        }
        const decodedToken = jwt.verify(token, config.get("secret"));
        next();
    } catch (error) {
        console.log(error);
        return res
            .status(403)
            .json({ message: "Admin is not registered, (token noto'g'ri) " });
    }
};
