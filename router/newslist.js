const express = require('express');
const pool = require('../pool.js');
const router = express.Router();

router.get('/list', (req, res) => {
	var pno = req.query.pno;
	var pageSize = req.query.pageSize;
	if (!pno) {
		pno = 1;
	}
	if (!pageSize) {
		pageSize = 10;
	}
	// var reg = /^[0-9]{1,}$/;
	// if (!reg.test(reg)) {
	// 	res.send({
	// 		code: -1,
	// 		msg: '页码格式不正确'
	// 	})
	// 	return;
	// }
	// if (!reg.test(pageSize)) {
	// 	res.send({
	// 		code: -1,
	// 		msg: '页大小格式不正确'
	// 	})
	// 	return;
	// }

	var obj = {
		pno,
		pageSize
	};
	var progress = 0;

	var sql = 'SELECT count(id) as c FROM pureshop_news';
	pool.query(sql, (err, result) => {
		if (err) {
			throw err;
		}
		var pageCount = Math.ceil(result[0].c / pageSize);
		obj.pageCount = pageCount;
		progress += 50;
		if (progress == 100) {
			res.send(obj);
		}
	})

	var sql = 'SELECT * FROM pureshop_news LIMIT ?,?';
	var offset = parseInt((pno - 1) * pageSize);
	pageSize = parseInt(pageSize);
	pool.query(sql, [offset, pageSize], (err, result) => {
		if (err) {
			throw err;
		}
		obj.data = result;
		progress += 50;
		if (progress == 100) {
			res.send(obj);
		}
	})
})

router.get('/find', (req, res) => {
	var id = req.query.id;
	var sql = 'SELECT * FROM `pureshop_news` WHERE id=?';
	pool.query(sql, [id], (err, result) => {
		if (err) {
			throw err;
		}
		res.send({
			code: 1,
			msg: result
		})
	})
})

router.get('/commentlist', (req, res) => {
	var pno = req.query.pno;
	var pageSize = req.query.pageSize;
	var nid = req.query.nid;
	if (!pno) {
		pno = 1;
	}
	if (!pageSize) {
		pageSize = 5;
	}
	var obj = {
		pno,
		pageSize
	};
	var progress = 0;

	var sql = 'SELECT count(id) as c FROM pureshop_comments WHERE nid=?';
	var offset = parseInt((pno - 1) * pageSize);
	pool.query(sql, [nid], (err, result) => {
		if (err) {
			throw err;
		}
		var pageCount = Math.ceil(result[0].c / pageSize);
		obj.pageCount = pageCount;
		progress += 50;
		if (progress == 100) {
			res.send(obj);
		}
	})
	var sql = 'SELECT * FROM pureshop_comments WHERE nid=?';
	pool.query(sql, [nid], (err, result) => {
		if (err) {
			throw err;
		}
		result.reverse();
		obj.data = result.slice(offset, offset + pageSize);
		progress += 50;
		if (progress == 100) {
			res.send(obj);
		}
	})

})

router.post('/add', (req, res) => {
	var nid = req.body.nid;
	var username = req.body.username;
	var content = req.body.content;
	if (content.length < 2) {
		res.send({
			code: -1,
			msg: "亲，评论的内容太少了"
		})
		return;
	}
	var sql = 'INSERT INTO `pureshop_comments`(`id`, `nid`, `ctime`, `content`, `username`, `isdel`) VALUES (NULL,?,now(),?,?,0)';
	pool.query(sql, [nid, content, username], (err, result) => {
		if (err) {
			throw err
		}
		if (result.affectedRows == 1) {
			res.send({
				code: 1,
				msg: '评论成功！'
			})
		} else {
			res.send({
				code: -1,
				msg: '添加失败了。。'
			})
		}

	})

})
module.exports = router;