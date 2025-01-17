const ErroBase = require('./ErroBase');

class Erro404 extends ErroBase {
    constructor(message = 'Rota invalida') {
        super(message,404);
    }
};

module.exports = Erro404;