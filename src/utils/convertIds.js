module.exports = (objetoParams) => {
    for (let propiedade in objetoParams) {
        if (/Id|id/.test(propiedade)){
            objetoParams[propiedade] = Number(objetoParams[propiedade]);
        }
    }
    return objetoParams;
};