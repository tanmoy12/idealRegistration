const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");
const fs = require("fs");

const ParticipantSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	userid: {
		type: Number
	},
	institution: {
		type: String,
		required: true
	},
	level: {
		type: String,
		required: true
	},
	contact: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	individualEvent: {
		type: Array
	},
	teamEvent: {
		type: Array
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

ParticipantSchema.statics.insertNewParticipant = (data, cb) => {
	// const { errors, isValid } = mugStockValidators.mugStockInput(data);

	Participant.findOne({ email: data.email }, (err, participant) => {
		if (err) {
			fs.appendFileSync('logs.txt', 'participant insert fail in func ' + JSON.stringify(err) + "\n");
		}
		if (participant) {
			if (participant.individualEvent.length || participant.teamEvent.length) {
				return cb(400, { msg: "Participant Already Exist" }, null);
			}
			else {
				participant.name = data.name;
				participant.contact = data.contact;
				participant.institution = data.institution;
				participant.level = data.level;

				participant
					.save()
					.then(participant => {
						return cb(200, null, participant);
					})
					.catch(err => {
						fs.appendFileSync('logs.txt', 'participant insert fail in func save ' + JSON.stringify(err) + "\n");
						return cb(500, { msg: "internal server error" }, null);
						// //console.log(err);
					});
			}
		}
		else {
			const newParticipant = new Participant({
				name: data.name,
				contact: data.contact,
				institution: data.institution,
				email: data.email,
				level: data.level
			});
			newParticipant
				.save()
				.then(participant => {
					return cb(200, null, participant);
				})
				.catch(err => {
					fs.appendFileSync('logs.txt', 'participant insert fail in func save ' + JSON.stringify(err) + "\n");
					return cb(500, { msg: "internal server error" }, null);
					// //console.log(err);
				});
		}
	});
};

ParticipantSchema.statics.updateEvents = (data, cb) => {
	var query = { _id: data.id };
	var options = { new: true };
	var update = {
		individualEvent: data.individualEvents,
		teamEvent: data.teamEvents
	};

	Participant.findOneAndUpdate(query, update, options, function (
		err,
		updateEvent
	) {
		if (err) {
			return cb(500, { msg: "Internal Server error" }, null);
		} else {
			////console.log(updatetag);
			return cb(200, null, updateEvent);
		}
	});
};

ParticipantSchema.statics.getParticipant = (page, cb) => {
	let perPage = 30;
	let date = new Date();
	Participant.find({ createdAt: { $lt: date } })
		.limit(perPage)
		.skip(perPage * page)
		.sort({ createdAt: "desc" })
		.exec(function (err, participants) {
			if (err) {
				return cb(500, { msg: "Internal server Error" }, null);
			} else {
				return cb(200, null, participants);
			}
		});
};
module.exports = Participant = mongoose.model("participant", ParticipantSchema);
