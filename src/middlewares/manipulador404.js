const Erro404 = require('../errors/Erro404');

module.exports = (req,res,next) => {
    const erro404 = new Erro404();
    next(erro404);
};