const RegIncorreta = require('./ReqIncorreta');

class ErroValidacao extends RegIncorreta {
    constructor(err) {
        const erros = {};
        Object.entries(err.errors).forEach(([campo, erro]) => {
            erros[campo] = erro.message;
        });
        super('Erro de validação');
        this.resposta = {
            msg: 'Os seguintes erros foram encontrados:',
            erros: erros,
            status: 400  // Incluindo o status
        };
    }

    enviarResposta(res) {
        res.status(400).json(this.resposta);  // Envia o objeto no formato desejado
    }

}

module.exports = ErroValidacao;