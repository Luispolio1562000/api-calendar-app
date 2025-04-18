const moment = require("moment");

const validateIsDate = (value, { req, location, path }) => {
  console.log(`Validating ${path} with value: ${value}`);

  if (!value) {
    return false;
  }

  const date = moment(value);
  if (date.isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  validateIsDate,
};
