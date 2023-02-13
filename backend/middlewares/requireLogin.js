const User = require("../models/users/user");
const jwt = require("jsonwebtoken");
const { AUTHENTICATION_FAILED } = require("../config/messages");
const { respond } = require("../helpers/responses");

module.exports = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				respond(res, AUTHENTICATION_FAILED);
			} else {
				const user = User.findById(decodedToken.id);
				if (user) {
					next();
				} else {
					respond(res, AUTHENTICATION_FAILED);
				}
			}
		});
	} else {
		respond(res, AUTHENTICATION_FAILED);
	}
};
