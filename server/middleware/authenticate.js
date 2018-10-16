var {User} = require('./../models/user');

// middleware function para autenticar a requisição (private route)
var authenticate = (req, res, next) => {
	
	// Pega o token que está no header
	var token = req.header('x-auth');

	// Busca um usuário através do token
	// Esta função é uma função do model user, e não de um user específico
	User.findByToken(token).then((user) => {
		// Por algum motivo a query não achou o token relacionado a um user
		if (!user) {
			// Retorna um reject, fazendo cair no catch abaixo
			return Promise.reject();
		}

		// Define req para ser utilizado na requisição get abaixo
		req.user = user;
		req.token = token;
		next();
	}).catch((err) => {
		res.status(401).send();
	});

};

module.exports = {authenticate};