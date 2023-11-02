const mongoose = require('mongoose');

/**
 * @param {string} URI
 */
async function connectDatabase(URI) {
	await mongoose.connect(URI).then(
		() => {
			console.log('Erfolgreich mit der Datenbank verbunden!');
		},
		(err) => {
			console.log(err);
		},
	);

	mongoose.connection.on('error', (err) => {
		console.log(err);
	});
	mongoose.connection.on('disconnected', () => {
		console.log('Verbindugnsabbruch zur Datenbank');
	});
}

module.exports = { connectDatabase };
