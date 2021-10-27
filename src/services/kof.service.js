const {datos, generateTitles} = require('./reports.service')

const getData = async () => { 
    await generateTitles();
    console.log(datos[0]);
}



module.exports = {
    getData,
    datos
}