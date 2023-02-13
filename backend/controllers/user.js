const User = require("../models/users/user");
const jwt = require("jsonwebtoken");
const { SUCCESSFUL, SUCCESSFUL_CREATE, NOT_FOUND, FAILURE, AUTHENTICATION_FAILED } = require("../config/messages");
const { respond } = require("../helpers/responses");

const maxAge = 3 * 24 * 60 * 60;

// Create a new JTW token
const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: maxAge,
	});
};

// Check if user is logged in
module.exports.get = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		respond(res, SUCCESSFUL, user);
	} catch (e) {
		respond(res, NOT_FOUND);
	}
};

// Validate email address
const validateEmail = (email) => {
	return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

// Register a new user
module.exports.put = async (req, res) => {
	try {
		const { Name, Email, Password, Password_Confirmation } = req.body;

		// Ensure all fields are filled
		if (!Name || !Email || !Password || !Password_Confirmation) {
			respond(res, FAILURE);
			return;
		}

		// Ensure password has at least 12 characters
		if (Password.length < 12) {
			respond(res, FAILURE);
			return;
		}

		// Ensure password has one special character
		if (!Password.match(/[^a-zA-Z0-9]/)) {
			respond(res, FAILURE);
			return;
		}

		// Ensure password has one number
		if (!Password.match(/[0-9]/)) {
			respond(res, FAILURE);
			return;
		}

		// Ensure password has one uppercase letter
		if (!Password.match(/[A-Z]/)) {
			respond(res, FAILURE);
			return;
		}

		// Ensure email is valid
		if (!validateEmail(Email)) {
			respond(res, FAILURE);
			return;
		}

		// Ensure password and password confirmation match
		if (Password !== Password_Confirmation) {
			respond(res, FAILURE);
			return;
		}

		const user = await User.create({ Name, Email, Password });
		const token = createToken(user._id);

		res.cookie("jwt", token, {
			withCredentials: true,
			httpOnly: false,
			maxAge: maxAge * 1000,
		});
		respond(res, SUCCESSFUL_CREATE, user);
	} catch (e) {
		console.log(`Failure registering a new user!`, e);
		respond(res, FAILURE);
	}
};

// Login a user
module.exports.post = async (req, res) => {
	try {
		const { Email, Password } = req.body;
		const user = await User.login(Email, Password);
		const token = createToken(user._id);

		res.cookie("jwt", token, {
			withCredentials: true,
			httpOnly: false,
			maxAge: maxAge * 1000,
		});
		respond(res, SUCCESSFUL, user);
	} catch (e) {
		if (e.message === "incorrect_email_or_password") {
			respond(res, AUTHENTICATION_FAILED);
			return;
		}

		respond(res, FAILURE);
	}
};
