const db = require('../database/connection');

function createHarvest(harvest, user) {
	return db
		.query(
			'INSERT INTO harvest(food_type, taste, harvest_time, location, date, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
			[
				harvest.food_type,
				harvest.taste,
				harvest.harvest_time,
				harvest.location,
				harvest.date,
				user
			]
		)
		.then(result => result.rows[0])
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

function deleteHarvest(id) {
	return db
		.query('DELETE FROM harvest WHERE id=($1), [id]')
		.catch(err => err);
}

function adjustHarvest(id, property, newValue) {

	return db.query(`UPDATE harvest SET ${property} = ($1) WHERE id = '${id}' RETURNING *`,
			[newValue]
		)
		.then(rows => rows[0])
		.catch(console.error)
}

module.exports = {
	createHarvest,
	getHarvest,
	getAllHarvest,
	deleteHarvest,
	adjustHarvest
};