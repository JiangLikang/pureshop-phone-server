const express = require('express');
const pool = require('../pool.js');

var router = express.Router();
router.get('/list', (req, res) => {
	var id = req.query.id;

	if (id == 1) {
		var sql = `SELECT * FROM pureshop_products WHERE type='spring'`;
		pool.query(sql, [], (err, result) => {
			if (err) {
				console.log(err)
			}
			res.send(result);
		})
	} else if (id == 2) {
		var sql = `SELECT * FROM pureshop_products WHERE type='summer'`;
		pool.query(sql, [], (err, result) => {
			if (err) {
				console.log(err)
			}
			res.send(result);
		})
	} else if (id == 3) {
		var sql = `SELECT * FROM pureshop_products WHERE type='autumn'`;
		pool.query(sql, [], (err, result) => {
			if (err) {
				console.log(err)
			}
			res.send(result);
		})
	} else if (id == 4) {
		var sql = `SELECT * FROM pureshop_products WHERE type='winter'`;
		pool.query(sql, [], (err, result) => {
			if (err) {
				console.log(err)
			}
			res.send(result);
		})
	} else {
		var sql = 'SELECT * FROM pureshop_products';
		pool.query(sql, [], (err, result) => {
			if (err) {
				console.log(err)
			}
			res.send(result);
		})
	}

})

router.get('/find', (req, res) => {
	var id = req.query.id;
	var sql = 'SELECT * FROM pureshop_products WHERE wid=?';
	pool.query(sql, [id], (err, result) => {
		if (err) {
			throw err
		}
		res.send(result);
	})
})
module.exports = router;