var express = require("express"),
	app     = express(),
	bodyParser = require('body-parser'),
	todoRoutes = require('./routes/todo');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(__dirname + '/views'));
app.use("/api/todos", todoRoutes)


app.get("/", function (req,res) {
	res.sendFile("index.html");
})

app.get("*", function (req,res) {
	res.send("page no dey");
})

app.listen(10624, function(){
	console.log("server has started")
})