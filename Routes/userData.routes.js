// 	height: String,
// 	weight: String,
// 	bmi: String
// });

const express = require("express");
const { DataModel } = require("../Model/DataModel.js");
// const { UserModel } = require("../Model/UserModel.js");

const dataController = express.Router();

dataController.get("/oldBmi", async (req, res) => {
	const data = await DataModel.find({ userEmail: req.body.userEmail });

	res.status(200).json(data);
});


dataController.post("/bmiCalcultate", async (req, res) => {
	const { userEmail, height, weight } = req.body;
	if (height && weight) {
		let cmHeight = Math.floor(+height * 30.48);
		let bmi = +weight / cmHeight / cmHeight * 10000;
		const data = new DataModel({
			userEmail: userEmail,
			bmi,
			height,
			weight
		});
		data.save();
		res.send({ bmi: bmi });
	} else {
		res.send({ message: "fill the details correctly" });
	}
});

module.exports = { dataController };
