'use strict';
var XLSX = require("xlsx");

const ExcelAJSON = () => {
    const excel = XLSX.readFile("C:\\Users\\DEVELOP01\\Desktop\\excel2node\\ctd.xlsx");
    var sheetName = excel.SheetNames;
    let datos = XLSX.utils.sheet_to_json(excel.Sheets[sheetName[0]]);

    const jData = [];
    for(let i=0; i<datos.length; i++){
        const  dato = datos[i];
        jData.push({
            ...dato,
            Fecha: new Date((dato.Fecha - (25567 + 2)) * 86400 * 1000)
        });
    }
    return datos;
};


module.exports = {
    ExcelAJSON
}