const express = require('express');
const pool = require('../pool.js');

var router = express.Router();
router.post('/add', (req, res) => {
	var {
		wid,
		title,
		username,
		num,
		price,
		pic
	} = req.body;
	var sql = 'INSERT INTO cart_list VALUES(NULL,?,?,?,?,?,?)'
	pool.query(sql, [wid, title, username, num, price, pic], (err, result) => {
		if (err) {
			throw err;
		}
		if (result.affectedRows == 1) {
			res.send({
				ok: 1,
				msg: '添加成功！'
			})
		}
	})
})
router.get('/list', (req, res) => {
	var sql = 'SELECT * FROM cart_list'
	pool.query(sql, [], (err, result) => {
		if (err) {
			throw err
		}
		res.send(result);
	})

})
router.get('/del', (req, res) => {
	var cid = req.query.cid;
	var sql = 'DELETE FROM cart_list WHERE cid=?';
	pool.query(sql, [cid], (err, result) => {
		if (err) {
			throw err;
		}
		if (result.affectedRows == 1) {
			res.send({
				ok: 1,
				msg: '删除成功！'
			})
		}
	})
})
module.exports = router;