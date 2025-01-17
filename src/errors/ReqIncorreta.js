const ErroBase = require('./ErroBase');

class RegIncorreta extends ErroBase {
    constructor(mensagem = 'Um ou mais dados estao incorretos') {
        super(mensagem,400);
    }
}

module.exports = RegIncorreta;