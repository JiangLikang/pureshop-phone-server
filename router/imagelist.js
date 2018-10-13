const express = require('express');
const pool = require('../pool.js');

var router = express.Router();
router.get('/list', (req, res) => {
	var sql = 'SELECT * FROM pureshop_imagelist';
	pool.query(sql, [], (err, result) => {
		if (err) {
			console.log(err)
		}
		res.send(result);
	})
})
module.exports = router;