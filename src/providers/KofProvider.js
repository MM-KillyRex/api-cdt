const {datos, generateTitles} = require('../Providers/reportsProviders')

const f = async () => { 
    await generateTitles();
    console.log(datos[0]);
}



module.exports = {
    f,
    datos
}