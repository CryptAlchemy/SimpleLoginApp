const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	Name: {
		type: String,
		required: [true, "Please enter a name"],
	},
	Email: {
		type: String,
		required: [true, "Please enter an email"],
		unique: true,
	},
	Password: {
		type: String,
		required: [true, "Please enter a password"],
	},
});

userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.Password = await bcrypt.hash(this.Password, salt);
	next();
});

userSchema.statics.login = async function (Email, Password) {
	const user = await this.findOne({ Email });
	if (user) {
		const auth = await bcrypt.compare(Password, user.Password);
		if (auth) {
			return user;
		}
	}
	throw Error("incorrect_email_or_password");
};

module.exports = mongoose.model("User", userSchema);
