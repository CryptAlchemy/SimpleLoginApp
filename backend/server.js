// Import necessary modules
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

// Create express app
const app = express();

// Connect to database
db.connect(app);

// Add global middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Add routes
require("./routes/user")(app);

// Start server
app.on("ready", () => {
	app.listen(3000, () => {
		console.log("Server is up on port", 3000);
	});
});

module.exports = app;
