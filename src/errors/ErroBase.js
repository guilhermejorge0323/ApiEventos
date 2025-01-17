class ErroBase {
    constructor(msg = 'Erro interno', status = 500) {
        this.msg = msg;
        this.status = status;
    }

    enviarResposta(res) {
        // Envia o erro em formato JSON
        res.status(this.status).json({
            error: this.msg,
            status: this.status
        });
    }
}

module.exports = ErroBase;
