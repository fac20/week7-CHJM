const db = require('../database/connection');

function createHarvest(harvest) {
	return db
		.query(
			'INSERT INTO harvest(food_type, taste, harvest_time, location, date, user_id) VALUES ($1, $2, $3, $4, $5, $6)',
			[
				harvest.food_type,
				harvest.taste,
				harvest.harvest_time,
				harvest.location,
				harvest.date,
				harvest.user_id,
			]
		)
		.catch(error => error);
}

function getHarvest(type) {
	return db
		.query('SELECT * FROM harvest WHERE food_type = ($1)', [type])
		.then(result => result.rows)
		.catch(console.error);
}

function getAllHarvest() {
	return db
		.query('SELECT * FROM harvest')
		.then(result => result.rows)
		.catch(console.error);
}

module.exports = {
	createHarvest,
	getHarvest,
	getAllHarvest,
};
