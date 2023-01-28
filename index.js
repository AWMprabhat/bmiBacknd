var cors = require('cors')

const express = require("express");
const { connection } = require("./config/db.js");
const { authentication } = require("./Middleware/authentication.js");
const { AuthController } = require("./Routes/userAuth.routes.js");
const { dataController } = require("./Routes/userData.routes.js");

const app = express();
app.use(cors())

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to Homepage!");
});

app.use("/user", AuthController);
app.use("/data", authentication, dataController);

const port = process.env.PORT || 7000;

app.listen(port, async (req, res) => {
	try {
		await connection;
		console.log("connection is established " + port);
	} catch (e) {
		console.log(e);
	}
});
