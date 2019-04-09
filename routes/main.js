const express = require("express");
const mainRouter = express.Router();
const fs = require("fs");
const Participant = require("../models/Participant");
const mongoose = require("mongoose");
const config = require("../settings/config");
//const nodemailer = require("nodemailer");
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
      var hashed = data._id.toString(36);
			var qr_string = hashed.substr(hashed.length-9, hashed.length-1) + "\n" + data.email + "\n" + data.level + "\n";
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
				+ '<h4 style="margin: 5px">' + data.name + '</h4>'
				+ '<h5 style="margin: 5px">' + data.institution + '</h5>'
				+ '<h5 style="margin: 5px">' + data.level + '</h5>'
        + '<h6 style="margin: 5px">(' + data.email + ')</h6>'
        + '<h6 style="margin: 5px">(' + hashed.substr(hashed.length-9, hashed.length-1)  + ')</h6>'
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
        + '<p style="font-size: 12px;"># Please bring this ticket for participating in the registered events. '
        + 'For more information please call : <br>'
        + 'President : 01631787333 <br>'
        + 'General Secretary : 01787282960<br>'
        + 'Vice President of P&P : 01511326254<br>'
        + 'Vice President of ICT : 01779770359<br>'
        + 'NB : The validity of this ticket is till April 13,2019 </p>'
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

					const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
     "301795750581-l2i3pu83rjiqd6os5qb1vvp51l51ivba.apps.googleusercontent.com", // ClientID
     "VUHE1_3L4icqRU6E-JsQRRCL", // Client Secret
     "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
     refresh_token: "1/pn4-dXWvg4-E0R9V6VmwFlH83Nr5VIDRMYj-fTbu1PyY9FX_pgD6exTsIMAX0lFE"
});

async function f(){
const tokens = await oauth2Client.refreshAccessToken()
const accessToken = tokens.credentials.access_token

const smtpTransport = nodemailer.createTransport({
     service: "gmail",
     auth: {
          type: "OAuth2",
          user: "3rd.ielc.nelc@gmail.com", 
          clientId: "301795750581-l2i3pu83rjiqd6os5qb1vvp51l51ivba.apps.googleusercontent.com",
          clientSecret: "VUHE1_3L4icqRU6E-JsQRRCL",
          refreshToken: "1/pn4-dXWvg4-E0R9V6VmwFlH83Nr5VIDRMYj-fTbu1PyY9FX_pgD6exTsIMAX0lFE",
          accessToken: accessToken
     }
});


					var mailOptions = {
						from: "3rd.ielc.nelc@gmail.com",
						to: data.email,
						//bcc: "",
						subject: "Registration for 3rd NELC",
						text:
							"Hello,\n\n" +
							"Thank you for registering for 3rd National English" + "Language Carnival 2019. Please bring the attached " + 
							"e-ticket with you to the venue in print or on your "+ "device. There will be no facility to print " 
							+"e-tickets at the venue.\n\n"+"See you there!",
						attachments: [
							{
								filename: "3rd_NELC_registration.pdf",
								path: pdfName,
								contentType: "application/pdf"
							}
						]
					};

					smtpTransport.sendMail(mailOptions, function (err) {
						if (err) {
							//return cb(err, null);
							console.log(err);
							fs.appendFileSync('logs.txt', '/event email fail' + JSON.stringify(err) + "\n");
						}
						else {
							console.log("mail sent");
							fs.appendFileSync('logs.txt', '/event email success' + JSON.stringify(err) + "\n");
							fs.unlinkSync(pdfName);
							fs.unlinkSync(htmlName);
							fs.unlinkSync(qrName);
						}
					});
					}
                    f();

					

					
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
