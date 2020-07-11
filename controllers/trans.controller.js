var db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
	res.render('trans/index', {
		transactions: db.get('transactions').value()
	});
};


module.exports.complete = (req, res) => {
	var id = req.params.id;
	var trans = db.get('transactions').find({ id: id }).value();
	//----------------
	var errors = [];
	var arrId = [];
	for (var tran of db.get('transactions').value()) {
		arrId.push(tran.id);
	}

	if ((arrId.some(el => el === id)) !== true) {
		errors.push('Id is not validation');
	}
	console.log(errors);

	if (errors.length) {
		res.render('trans/complete', {
			errors: errors
		});
		return;
	}

	//----------------
	res.render('trans/complete', {
		trans: trans
	});
};

module.exports.postComplete = (req, res) => {
	var id = req.params.id;

	var trans = db.get('transactions').find({ id: id }).value();

	db.get('transactions')
	.remove({ id: trans.id })
	.write();
	res.redirect('/transactions');
};

module.exports.create = (req, res) => {

	var arrBookId = [];
	var booksRent = db.get('transactions').value();
	for (var bookRent of booksRent) {
		arrBookId.push(bookRent.bookId);
	};

	var book = db.get('books').value().filter(function(book){
		return arrBookId.some(elment => elment === book.id) !== true;
	});

	res.render('trans/create', {
		users: db.get('users').value(),
		books: book
	});
};

module.exports.postCreate = (req, res) => {
	req.body.id = shortid.generate();
	db.get('transactions').push(req.body).write();
	res.redirect('/transactions');
};