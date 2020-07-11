module.exports.postCreate = (req, res, next) => {
	var errors = [];

	if (req.body.name.length > 30) {
		errors.push('Name is too long');
	}

	if (errors.length) {
		res.render('users/create', {
			errors: errors
		});
		return;
	}
	next();
};