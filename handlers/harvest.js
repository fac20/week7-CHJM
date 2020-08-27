const harvestModel = require('../model/harvest');

function getAllHarvest(req, res, next) {
	harvestModel
		.getAllHarvest()
		.then(result => {
			return res.send(result);
		})
		.catch(next);
}

function getHarvest(req, res, next) {
	const type = req.params.type;
	harvestModel
		.getHarvest(type)
		.then(result => {
			!result
				?
				res.status(204).send('No such a harvest. Change harvest type') :
				res.status(200).send(result);
		})
		.catch(next);
}

function createHarvest(req, res, next) {
	const user = req.user;
	const harvestData = req.body;
	console.log(harvestData);
	harvestModel
		.createHarvest(user, harvestData)
		.then(() => {
			res.status(201).send({
				message: 'harvest created',
			});
		})
		.catch(next);
}

function adjustHarvest(req, res, next) {
	console.log(req.params)
	const id = req.params.id;
	const property = req.params.property;
	const newValue = req.body;
	console.log(req.body)
	harvestModel
		.adjustHarvest(id, property, newValue)
		.then(adjustedHarvest => {
			if (!adjustHarvest) {
				const error = new Error('Cannot update harvest. Wrong ID!');
				error.status = 204;
				next(error);
			} else {
				res.redirect(301, '/harvest');
				res.status(200).send(adjustedHarvest);
			}
		})
		.catch(next);
}

// harvest.food_type,
// harvest.taste,
// harvest.harvest_time,
// harvest.location,
// harvest.date,
// harvest.user_id,

// editHarvest

// deleteHarvest

module.exports = {
	createHarvest,
	getAllHarvest,
	getHarvest,
	adjustHarvest
	// editHarvest,
	// deleteHarvest
};