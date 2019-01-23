const fs = require("fs");
var pdf = require('html-pdf');
let html = fs.readFileSync("./data/" + "tanmoy3399@gmail.com" + ".html", 'utf8');

pdf.create(html, { format: 'A4' }).toFile("./data/trial.pdf", function (err, result) {


});