import axios from "axios";

export function addParitcipant(name, institution, contact, email, level, cb) {
	axios
		.post("/main/participant", {
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
			// console.log('catch',err)
			let error = {
				msg: "Internal Server Error.Please check your internet connection."
			};
			cb(error, null);
		});
}

export function addEvents(individualEvents, teamEvents, id, participant, cb) {
	axios
		.post("/main/event", {
			teamEvents: teamEvents,
			individualEvents: individualEvents,
			id: id,
			participant: participant
		})
		.then(res => {
			cb(null, res.data);
		})
		.catch(err => {
			let error = {
				msg: "Internal Server Error"
			};
			cb(error, null);
		});
}

export function getParticpants(page, cb) {
	axios
		.post("/main/participants", {
			page: page
		})
		.then(res => {
			cb(null, res.data);
		})
		.catch(err => {
			let error = {
				msg: "Internal Server Error"
			};
			cb(error, null);
		});
}
