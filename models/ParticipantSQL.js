const mysql = require('mysql');

let con = mysql.createConnection({
	host: "localhost",
	user: "headaubg_ndc",
	password: "ndc1234",
	database: "headaubg_ndc"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});


module.exports.insertNewParticipant = (data, cb) => {
  // const { errors, isValid } = mugStockValidators.mugStockInput(data);

  Participant.findOne({ email: data.email }, (err, participant) => {
    if (!participant) {
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
          return cb(500, { msg: err }, null);
          // //console.log(err);
        });
    } else {
      return cb(400, { msg: "Participant Already Exist" }, null);
    }
  });
};

module.exports.updateEvents = (data, cb) => {
  var query = { _id: data.id };
  var options = { new: true };
  var update = {
    individualEvent: data.individualEvents,
    teamEvent: data.teamEvents
  };

  Participant.findOneAndUpdate(query, update, options, function(
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

module.exports.getParticipant = (page, cb) => {
  let perPage = 30;
  let date = new Date();
  Participant.find({ createdAt: { $lt: date } })
    .limit(perPage)
    .skip(perPage * page)
    .sort({ createdAt: "desc" })
    .exec(function(err, participants) {
      if (err) {
        return cb(500, { msg: "Internal server Error" }, null);
      } else {
        return cb(200, null, participants);
      }
    });
};