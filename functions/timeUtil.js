const moment = require('moment');
moment.locale('de');

const convertToUnix = async (date, time) => {
	return moment(date + ' ' + time, 'DD/MM/YYYY hh:mm').unix();
};

module.exports = { convertToUnix };
