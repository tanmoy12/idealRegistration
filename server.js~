const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5002;
const config = require("./settings/config");
const app = express();
// connect database

mongoose.Promise = require("bluebird");
mongoose
	.connect(
		config.dbUrl2,
		{ useNewUrlParser: true }
	)
	.then(() => {
		// if all is ok we will be here
		console.log("Db initialized");
	})
	.catch(err => {
		// if error we will be here
		console.error("DB starting error");
		//process.exit(1);
	});
// parse request bodies



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// allow cross origin requests

app.use(
	cors({
		exposedHeaders: "*"
	})
);
// Serve static files from the React app after npm run build

app.use(express.static(path.join(__dirname, "client/build")));
app.use("/public", express.static(__dirname + "/public"));

app.use(express.static(process.cwd() + "/public"));
// serving routes
const mainRouter = require("./routes/main");
app.use("/main", mainRouter);
/*app.get('/', (req, res) => {
    res.send('express server running');
});*/

app.get("*", function(req, res) {
	res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// run server
app.listen(port);
console.log(`NDC English Carnival listening on ${port}`);
