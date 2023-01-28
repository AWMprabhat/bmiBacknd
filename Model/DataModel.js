const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
	height: String,
	weight: String,
	bmi: String
});

const DataModel = mongoose.model("data", dataSchema);

module.exports = { DataModel };
