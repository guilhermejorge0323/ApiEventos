module.exports = (valor) => {
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return regex.test(valor);
};