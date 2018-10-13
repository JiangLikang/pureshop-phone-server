const express = require('express');
const cors = require('cors')
const imagelist = require('./router/imagelist');
const newslist = require('./router/newslist');
const bodyParser = require('body-parser');
const products = require('./router/products');
const cartlist = require('./router/cartlist');

var app = express();
app.listen(3000);
app.use(cors({
	origin: ['http://127.0.0.1:3001'],
	credentails: true
}));
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(express.static(__dirname + '/public'));
app.use('/imagelist', imagelist);
app.use('/newslist', newslist);
app.use('/products', products);
app.use('/cartlist', cartlist);