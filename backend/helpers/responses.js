module.exports.respond = (res, message, data = null) => {
	res.status(message.code).json({ message: message.message, data: data });
};
