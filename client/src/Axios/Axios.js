import axios from "axios";

const API_URL = "https://afternoon-sierra-90302.herokuapp.com";

export function addParitcipant(name, institution, contact, email, level, cb) {
	axios
		.post(API_URL + "/main/participant", {
			name: name,
			institution: institution,
			contact: contact,
			email: email,
			level: level
		})
		.then(res => {
			// console.log('then',res.data)
			cb(null, res.data);
		})
		.catch(err => {
			if (err.response && err.response.status) {
				if (err.response.status === 500)
					return cb({ msg: "Server Error" }, null);
				return cb(err.response.data, null);
			} else {
				console.log(err);
				cb({ msg: "Unknown Error" }, null);
			}
		});
}

export function addEvents(individualEvents, teamEvents, id, participant, cb) {
	axios
		.post(API_URL + "/main/event", {
			teamEvents: teamEvents,
			individualEvents: individualEvents,
			id: id,
			participant: participant
		})
		.then(res => {
			cb(null, res.data);
		})
		.catch(err => {
			if (err.response && err.response.status) {
				if (err.response.status === 500)
					return cb({ msg: "Server Error" }, null);
				return cb(err.response.data, null);
			} else {
				console.log(err);
				cb({ msg: "Unknown Error" }, null);
			}
		});
}

export function getParticpants(page, cb) {
	axios
		.post(API_URL + "/main/participants", {
			page: page
		})
		.then(res => {
			cb(null, res.data);
		})
		.catch(err => {
			if (err.response && err.response.status) {
				if (err.response.status === 500)
					return cb({ msg: "Server Error" }, null);
				return cb(err.response.data, null);
			} else {
				console.log(err);
				cb({ msg: "Unknown Error" }, null);
			}
		});
}
