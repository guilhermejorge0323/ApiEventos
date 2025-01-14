const { cpf } = require('cpf-cnpj-validator');

module.exports = (CPF) => {
    const cpfLimpo = CPF.replace(/\D/g, '');

    const isvalid = cpf.isValid(cpfLimpo);

    if(isvalid) {
        return cpf.format(cpfLimpo);
    }else {
        return false;
    }
};