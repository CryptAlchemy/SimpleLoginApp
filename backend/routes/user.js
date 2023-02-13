const express = require("express");
const { User } = require("../models/users/user");
const requireLogin = require("../middlewares/requireLogin");
const { get, put, post } = require("../controllers/user");

const routes = (app) => {
	const router = express.Router();

	router.get("/", requireLogin, get);
	router.put("/", put);
	router.post("/", requireLogin, post);

	app.use("/user", router);
};
module.exports = routes;
