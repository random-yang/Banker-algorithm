const moment = require('moment');

/**
 * @description
 * print some inf to the console
 * just like 
 * URL PATH PORT TIME
 */
const logger = (req, res, next) => {
  console.log('\033[42;30m REQPATH \033[0m',
    `${req.protocol}://${req.get('host')}${
    req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

module.exports = logger;
