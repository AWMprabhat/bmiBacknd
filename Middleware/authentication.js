var jwt = require("jsonwebtoken");
require("dotenv").config();


const authentication = (req, res, next) => {
  console.log(req.headers.authorization,"token")
	if (!req.headers?.authorization) {
		return res.send("please login again");
	}
	const token = req.headers?.authorization;
	jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
		if (err) {
			res.send("please login");
		} else {
			req.body.email = decoded.email;
			next();
		}
	});
};

module.exports = { authentication };