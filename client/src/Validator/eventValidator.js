const checker = require("./is-empty");

module.exports.eventInput = data => {
  let errors = {};
  if (data.lq && !checker.isStringAndNotEmpty(data.lqtm)) {
    errors.lq = "Lit Quiz must have a team name";
  }
  if (data.mq && !checker.isStringAndNotEmpty(data.mqtm)) {
    errors.mq = "Mega Quiz must have a team name";
  }
  if (data.gq && !checker.isStringAndNotEmpty(data.gqtm)) {
    errors.gq = "G.O.T Quiz must have a team name";
  }
  if (data.mp && !checker.isStringAndNotEmpty(data.mptm)) {
    errors.mp = "Multimedia Presentation must have a team name";
  }
  return {
    errors,
    isValid: checker.isEmpty(errors)
  };
};
