const currency = require('currency.js');

module.exports = (valor) => {
    valor = valor.toString().trim();
    valor = valor.replace(',','.');
    try {

        const preco = currency(valor, { separator: '.', symbol: 'R$ ', precision: 2 });
        if (preco.value <= 0 || isNaN(preco.value)) {
            return false;
        }

        return preco.format();
    } catch (error) {
        return false;
    }
};