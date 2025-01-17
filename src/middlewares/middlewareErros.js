const ErroBase = require('../errors/ErroBase');
const ReqIncorreta = require('../errors/ReqIncorreta');
const ErroValidacao = require('../errors/ErroValidacao');
const Erro404 = require('../errors/Erro404');
const {  ValidationError, ForeignKeyConstraintError } = require('sequelize');

module.exports = (erro,req,res,next) => {
    if(erro instanceof ForeignKeyConstraintError ){
        new ReqIncorreta('Violacao de chave estrangeira').enviarResposta(res);
    }else if(erro instanceof ValidationError){
        new ErroValidacao(erro).enviarResposta(res);
    }else if(erro instanceof ErroBase){
        erro.enviarResposta(res);
    }else {
        new ErroBase().enviarResposta(res);
    }
};
