const express = require("express");
const { UserModel } = require("../Model/UserModel.js");
const AuthController = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

AuthController.post("/login", async (req, res) => {
	let { email, password } = req.body;
	console.log("req.body: ", req.body);
	let user = await UserModel.findOne({ email });
	let hash = user.password;
	bcrypt.compare(password, hash, (err, result) => {
		if (result) {
			var token = jwt.sign({ email: email }, process.env.SECRET_KEY);
			res.send({ token, message: "successfully login" });
		} else {
			res.send("Invalid password");
		}
	});
});

AuthController.post("/signup", async (req, res) => {
	const { name, email, password } = req.body;
	bcrypt
		.hash(password, 6)
		.then(async hash => {
			const user = new UserModel({ name, email, password: hash });
			await user.save();
			res.send(user);
			// res.send("Successfully signupController");
		})
		.catch(error => {
			console.log("error: ", error);
			res.send(error);
		});
});

module.exports = { AuthController };
