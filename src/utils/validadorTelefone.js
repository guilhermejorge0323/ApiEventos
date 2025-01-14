const { parsePhoneNumberFromString } = require('libphonenumber-js');

module.exports = (telefone) => {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    console.log(telefoneLimpo);
    

    const telefoneComCodigo = telefoneLimpo.length === 11 ? `+55${telefoneLimpo}` : `+${telefoneLimpo}`;

    const telefoneValido = parsePhoneNumberFromString(telefoneComCodigo, 'BR');

    if(!telefoneValido || !telefoneValido.isValid()) {
        return false;
    }

    return telefoneValido.formatNational();
};