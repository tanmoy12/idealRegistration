const express = require("express");
const mainRouter = express.Router();
const fs = require("fs");
const Participant = require("../models/Participant");
const mongoose = require("mongoose");
const config = require("../settings/config");
const nodemailer = require("nodemailer");
var pdf = require('html-pdf');

mainRouter.post("/participant", function (req, res) {
	console.log(req.body);

	fs.appendFileSync('logs.txt', '/particiapant ' + JSON.stringify(req.body) + "\n");
	Participant.insertNewParticipant(req.body, (status, err, data) => {
		if (status === 200) {
			fs.appendFileSync('logs.txt', 'participant insert success' + "\n");
			return res.json(data);
		} else {
			fs.appendFileSync('logs.txt', 'participant insert fail in route' + JSON.stringify(err) + "\n");
			return res.status(status).json(err);
		}
	});
});

mainRouter.post("/event", function (req, res) {
	console.log(req.body);
	fs.appendFileSync('logs.txt', '/event ' + JSON.stringify(req.body) + "\n");

	//return res.json({ success: true });
	Participant.updateEvents(req.body, (status, err, data) => {
		if (status === 200) {

			let dataPath = "file://" + process.cwd() + "/data/";
			let dataFolder = process.cwd() + "/data/";
			var qr = require("qr-image");
			var qr_string = data._id + "\n" + data.email + "\n" + data.level + "\n";
			data.individualEvent.forEach(event => {
				qr_string = qr_string + "\n" + event;
			});
			data.teamEvent.forEach(event => {
				qr_string =
					qr_string + "\n" + event.name + " (" + event.value + ")";
			});
			var qr_png = qr.image(qr_string, { type: "png" });
			var qrName = dataFolder + data.email + "_qr.png";
			qr_png.pipe(require("fs").createWriteStream(qrName));


			let page =
				'<!DOCTYPE html>'
				+ '<html>'

				+ '<head>'
				+ '<meta charset="utf-8" />'
				+ '</head>'

				+ '<body style="background-image:url(' + dataPath + 'bg4.jpg); max-width: 800px; height: 825px">'
				+ '<div style="padding: 20px; padding-bottom: 0px; border-right: 3px solid black; top: 20px; left: 0px; position: absolute;">'
				+ '<img style="width: 100px; height: auto;" src="' + dataPath + 'ielc_logo.png" />'
				+ '</div>'
				+ '<div style="padding: 20px; position: absolute; left: 180px; top: 0px">'
				+ '<img style="width: 350px; height: auto;" src="' + dataPath + 'ielc.png" />'
				+ '<div></div>'
				+ '<h4 style="font-weight: bold; text-align: left">APRIL 11-13, 2019</h4>'
				+ '</div>'
				+ '<div style="position: absolute; left: 20px; top: 230px; padding: 20px; width: 220px; height: 140px; border-style: groove; border-radius: 25px; border-color: black; box-shadow: 5px 10px 18px #888888;">'
				+ '<h4 style="margin: 10px">' + data.name + '</h4>'
				+ '<h5 style="margin: 10px">' + data.institution + '</h5>'
				+ '<h5 style="margin: 10px">' + data.level + '</h5>'
				+ '<h6 style="margin: 10px">(' + data.email + ')</h6>'
				+ '</div>'
				+ '<div style="position: absolute; left: 310px; top: 220px; padding: 20px; height: 360px; width: 160px; border-style: groove; border-radius: 25px; border-color: black; box-shadow: 5px 10px 18px #888888;">'
				+ '<h3>Registered events</h3>'
				+ '<ul style="list-style-type:square; list-style-position: initial; font-size: 10px; padding-left: 15px;">';
			data.individualEvent.forEach(event => {
				page = page + "	<li>" + event + "</li>";
			});
			data.teamEvent.forEach(event => {
				page =
					page +
					"	<li>" +
					event.value +
					" (" +
					event.name +
					")" +
					"</li>";
			});
			page =
				page
				+ '</ul>'
				+ '</div>'

				+ '<div style="position: absolute; top: 430px; left: 20px; padding: 20px; height: 140px; width: 220px; border-style: groove; border-radius: 25px; border-color: black; box-shadow: 5px 10px 18px #888888;">'
				+ '<img style="width: 100px; height: auto; display: block; margin: 7% auto;" src="' + dataPath + data.email + '_qr.png" />'
				+ '</div>'


				+ '<div style="position: absolute; left: 0px; top: 600px; padding: 30px; max-width: 500px; text-align: justify">'
				+ '<p style="font-size: 12px;"># Gates open at 02:00PM on the first day and at 08:00AM on the next two'
				+ ' days. Please bring this ticket for payment and participation. Print or any electronic format is acceptable. Show'
				+ ' this ticket, complete your payment and get your coupons and ID card. </p>'
				+ '</div>'
				+ '<div style="position: absolute; top: 765px; left: 235px">'
				+ '<h6 style="text-align: center; margin: 10px">Powered by </h6>'
				+ '<img style="text-align: center; height: 30px;width: auto" src="' + dataPath + 'headlessLogo.png"/>'
				+ '</div>'
				+ '</body>'

				+ '</html>';



			let pdfName = dataFolder + data.email + '.pdf';
			let htmlName = dataFolder + data.email + '.html';
			console.log(pdfName);
			fs.appendFileSync('logs.txt', '/event pdfname ' + pdfName + "\n");

			fs.writeFile(htmlName, page, function (err) {
				if (err) {
					fs.appendFileSync('logs.txt', "html gen error " + JSON.stringify(err) + "\n");
					console.log(err);
					return res.status(500).json({ msg: "Server error. Try again later" });
				}

				let html = fs.readFileSync("./data/" + data.email + ".html", 'utf8');

				pdf.create(html, { format: 'A4' }).toFile(pdfName, function (err, result) {
					if (err) {
						fs.appendFileSync('logs.txt', "pdf gen error " + JSON.stringify(err) + "\n");
						return res.status(500).json({ msg: "Try again later" });
					}
					console.log('Woot! Success!');
					fs.appendFileSync('logs.txt', '/event pdf success' + JSON.stringify(result) + "\n");
					res.json(data);

					var transporter = nodemailer.createTransport({
						host: "mail.idealenglishlanguageclub.com",
						port: 465,
						secure: true,
						tls: { rejectUnauthorized: false },
						auth: {
							user: "carnival@idealenglishlanguageclub.com",
							pass: "ielccarnivalideal"
						}
					});

					var mailOptions = {
						from: "carnival@idealenglishlanguageclub.com",
						to: data.email,
						bcc: "",
						subject: "Registration for 3rd NELC",
						text:
							"Hello,\n\n" +
							"Thank you for registering for 3rd National English" + "Language Carnival 2019. Please bring the attached" + 
							"e-ticket with you to the venue in print or on your"+ "device. There will be no facility to print" 
							+"e-tickets at the venue.\n\n"+"See you there!",
						attachments: [
							{
								filename: "3rd_NELC_registration.pdf",
								path: pdfName,
								contentType: "application/pdf"
							}
						]
					};

					transporter.sendMail(mailOptions, function (err) {
						if (err) {
							//return cb(err, null);
							console.log(err);
							fs.appendFileSync('logs.txt', '/event email fail' + JSON.stringify(err) + "\n");
						}
						else {
							console.log("mail sent");
							fs.appendFileSync('logs.txt', '/event email success' + JSON.stringify(err) + "\n");
							// fs.unlinkSync(pdfName);
							// fs.unlinkSync(htmlName);
							// fs.unlinkSync(qrName);
						}
					});
				});
			});
		}
		else {
			return res.status(status).json(err);
		}
	});
});

mainRouter.post("/participants", function (req, res) {
	console.log(req.body);
	//return res.json({ success: true });
	Participant.getParticipant(req.body.page, (status, err, data) => {
		if (status === 200) {
			return res.json(data);
		} else {
			return res.status(status).json(err);
		}
	});
});

mainRouter.get("/mlabtest", function (req, res) {
	mongoose.Promise = require("bluebird");
	mongoose
		.connect(
			config.dbUrl,
			{ useNewUrlParser: true }
		)
		.then(() => {
			// if all is ok we will be here
			console.log("here");
			return res.json({ ok: "Db initialized" });
		})
		.catch(err => {
			// if error we will be here
			return res.json({ ok: false, err: err });
			//process.exit(1);
		});


});


module.exports = mainRouter;
