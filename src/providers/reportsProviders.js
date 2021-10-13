var xl = require('excel4node');
var objEx = require('read-excel-file/node')
var XLSX = require("xlsx");


async function generateExcel() {
    await generateTitles();
}
let titulos = [];
let datos = [];

objEx('docs/ctd5.xlsx').then((rows) => {
    titulos = rows[0];
    for (i in rows) {
        if(i > 0){
            let aux = [];
            for(var j = 0; j < titulos.length; j++){
                aux.push(`${rows[i][j]}`);
            }
            datos.push(aux);
        }
    }
})
/*
const excelAJSON = () => {
    const excel = XLSX.readFile("docs/ctd5.xlsx");
    var sheetName = excel.SheetNames;
    let datos = XLSX.utils.sheet_to_json(excel.Sheets[sheetName[0]]);
    var rowObj = XLSX.utils.sheet_to_
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
*/

function generateTitles() {

    

    //titulo color lista de objetos con 2 campos
    //rojo: #FF0000, azul: 92C5FC, gris claro: E3E4E5, blanco: #FFFFFF, azul marino: #000080, 
    //rosa claro: #FFB6C1, verde claro: 98FF98, rosa fuerte: FF0080, naranja fuerte: FF80000, 
    //morado claro: CCA9DD, azul: 3B83BD, verde pis: 70FF8B, azulr: 6571AC, ginda: 6D0C2E, 
    //gris: 9B9B9B, lila: E3B1D2
   
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Hoja 1');
    var ws2 = wb.addWorksheet('Hoja 2');

    let titles = [
        // Columna rojo 10
        { titulo:"Número Económico", color:"#FF0000" ,cf:"#FFFFFF", size:"16" },
        { titulo:"Tipo", color:"#FF0000" ,cf:"#FFFFFF" , size:"10"}, 
        { titulo:"Marca", color:"#FF0000",cf:"#FFFFFF" , size:"13"}, 
        { titulo:"Modelo", color:"#FF0000" ,cf:"#FFFFFF", size:"9"}, 
        { titulo:"Año", color:"#FF0000",cf:"#FFFFFF" , size:"7"}, 
        { titulo:"No Serie", color:"#FF0000",cf:"#FFFFFF" , size:"13"}, 
        { titulo:"Ce Emplazamiento", color:"#FF0000", cf:"#FFFFFF", size:"21"}, 
        { titulo:"Fecha", color:"#FF0000", cf:"#FFFFFF" , size:"18"}, 
        { titulo:"Semana", color:"#FF0000",cf:"#FFFFFF" , size:"11"}, 
        { titulo:"Can", color:"#FF0000" ,cf:"#FFFFFF", size:"16"}, 
        // Columna azul claro 3
        { titulo:"Kilometraje inicial ", color:"#92C5FC" , size:"15"}, 
        { titulo:"Kilometros recorridos en el período", color:"#92C5FC" , size:"15"}, 
        { titulo:"Litros consumidos en el período", color:"#92C5FC" , size:"15"},
        // Columna gris claro 4
        { titulo:"Eventos de calentamiento (>105°C)", color:"#E3E4E5", size:"15" }, 
        { titulo:"Máxima Temp reportada [°C]", color:"#E3E4E5" , size:"15"},
        { titulo:"Máxima duración de evento [hh:mm:ss]", color:"#E3E4E5", size:"20" },   
        { titulo:"Operación debajo de temperatura mínima recomendada [hh:mm:ss]", color:"#E3E4E5", size:"15" }, 
        // Columna blanco 1 
        { titulo:"Máxima duración de evento debajo de temperatura mínima de operación [min]", color:"#FFFFFF", size:"15" }, 
        // Columna gris claro 1
        { titulo:"Temperatura promedio de operación", color:"#E3E4E5" , size:"15"}, 
        // Columna gris obscuro 3
        { titulo:"Rendimiento calculado mínimo [km/L]", color:"#B5B5B5" , size:"15"}, 
        { titulo:"Rendimiento calculado total [km/L]", color:"#B5B5B5" , size:"15"}, 
        { titulo:"Rendimiento calculado máximo [km/L]", color:"#B5B5B5" , size:"15"},
        // Columna gris claro 2
        { titulo:"Total de eventos de combustible", color:"#E3E4E5" , size:"15"}, 
        { titulo:"Sumatoria de litros para eventos de combustible", color:"#E3E4E5" , size:"15"},
        // Columna azul marino 5
        { titulo:"Total de eventos de códigos de falla", color:"#000080" , cf:"#FFFFFF", size:"15"}, 
        { titulo:"Total de códigos de falla activos", color:"#000080" , cf:"#FFFFFF", size:"15"}, 
        { titulo:"Código activo de mayor incidencia", color:"#000080" , cf:"#FFFFFF", size:"15"}, 
        { titulo:"Total de códigos de falla inactivos", color:"#000080" , cf:"#FFFFFF", size:"15"},
        { titulo:"Código inactivo de mayor incidencia", color:"#000080" , cf:"#FFFFFF", size:"15"}, 
        // Columna rosa 3
        { titulo:"Cantidad de eventos de sobre revolución", color:"#FFB6C1" , size:"15"}, 
        { titulo:"Duración total de los eventos de sobre revolución", color:"#FFB6C1" , size:"15"}, 
        { titulo:"Máximas RPM´s registradas", color:"#FFB6C1" , size:"15"},
        // Columna verde claro 7
        { titulo:"Cantidad de eventos Ralentí >5 min", color:"#98FF98" , size:"15"},
        { titulo:"Tiempo en ralentí (excedentes a 5min/evento) [min]", color:"#98FF98" , size:"15"}, 
        { titulo:"Tiempo total de ralentí [min]", color:"#98FF98" , size:"15"}, 
        { titulo:"Tiempo Ralenti UO", color:"#98FF98" , size:"15"}, 
        { titulo:"Tiempo Ralenti Fuera UO", color:"#98FF98" , size:"15"}, 
        { titulo:"Máximo tiempo en ralentí (1 solo evento)", color:"#98FF98", size:"15" }, 
        { titulo:"Tiempo en ralenti vs Tiempo de Operación [%]", color:"#98FF98" , size:"15"}, 
        //Columna rosa fuerte 2
        { titulo:"Tiempo de Manejo", color:"#FF0080" , size:"15"}, 
        { titulo:"Tiempo de Operación", color:"#FF0080" , size:"15"},
        // Columna verde claro 1
        { titulo:"Litros de combustible consumidos en Ralentí [L]", color:"#98FF98" , size:"15"},
        // Columna naranja fuerte 2
        { titulo:"Cantidad de eventos acelerador > 90%", color:"#FF8000" , size:"15"}, 
        { titulo:"Duración de los eventos [min]", color:"#FF8000" , size:"15"},
        // Columna morado claro 2
        { titulo:"Eventos de Velocidad", color:"#CCA9DD" , size:"15"}, 
        { titulo:"Maximum Speed", color:"#CCA9DD", size:"15" },
        // Columna Azul 2
        { titulo:"Estimación de CO2 generado [kg]", color:"#3B83BD" ,cf:"#FFFFFF", size:"15"}, 
        { titulo:"Estimación de CO2 generado [kg/km]", color:"#3B83BD" ,cf:"#FFFFFF", size:"15"},
        // Columna verde pistache 1
        { titulo:"Calificación Conducción", color:"#70FF8B" ,cf:"#FFFFFF", size:"15"},
        // Columna azul claro 3
        { titulo:"Kilometraje final [km]", color:"#92C5FC"  ,cf:"#FF0000", size:"15"}, 
        { titulo:"Consumo total acumulado inicial [L]", color:"#92C5FC"  ,cf:"#FF0000", size:"15"}, 
        { titulo:"Consumo total acumulado final [L]", color:"#92C5FC"  ,cf:"#FF0000", size:"15"},
        // Columna azul chiclamino 2 
        { titulo:"Cantidad eventos Frenada de pánico [< -0.5 G]", color:"#6571AC"  ,cf:"#FF0000", size:"15"}, 
        { titulo:"Máxima G registrada", color:"#6571AC"  ,cf:"#FF0000", size:"15"},
        // Columna guinda 3
        { titulo:"Cantidad eventos Giro brusco", color:"#6D0C2E"  ,cf:"#FF0000", size:"15"}, 
        { titulo:"Máxima G registrada izquierda", color:"#6D0C2E"  ,cf:"#FF0000", size:"15"}, 
        { titulo:"Máxima G registrada derecha", color:"#6D0C2E"  ,cf:"#FF0000", size:"15"},
        // Columna gris normal 2
        { titulo:"Cantidad eventos Aceleración Brusca ", color:"#9B9B9B"  ,cf:"#FF0000", size:"15"}, 
        { titulo:"Máxima G registrada", color:"#9B9B9B"  ,cf:"#FF0000", size:"15"},
        // Columna lila 2
        { titulo:"Entradas a Taller (eventos)", color:"#E3B1D2"  ,cf:"#FF0000", size:"15"}, 
        { titulo:"Duración en taller (total)", color:"#E3B1D2"  ,cf:"#FF0000", size:"15"},
        // Columna verde claro 1
        { titulo:"Comunicando", color:"#98FF98" ,cf:"#FF0000", size:"15"}
        ];
  
        for(var i = 0; i < titles.length; i++){
            let valuesC = titles[i].color;
            let valuesT = titles[i].titulo;
            let valuesCF = titles[i].cf;
            let valuesW = titles[i].size;
            let width = parseInt(valuesW);
            ws.cell(1,i+1).string(valuesT).style({
                font:{
                    bold: false,
                    size: 8,
                    name: 'Arial',
                    color: valuesCF || "#000000",
                },
    
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    bgColor: valuesC,
                    fgColor: valuesC,
                },
                alignment: {
                    horizontal: ['center'],
                    vertical: ['center'],
                    justifyLastLine: true,
                    wrapText: true,
                    
                },
                border: {
                    left:   {style:"medium", color: "#FFFFFF"},
                    right:  {style:"medium", color: "#FFFFFF"},
                    top:    {style:"medium", color: "#FFFFFF"},
                    bottom: {style:"medium", color: "#FFFFFF"},
                }
        });
            
            ws.column(i+1).setWidth(width)
        }
        ws.row(1).setHeight(52).filter()
        ws.column(6).freeze(5)
        console.log("Excel Generado!");
        console.log(datos[0])
        let rowIndex = 2;
        
        datos.forEach(dato => {
            let columnIndex = 1;
            dato.forEach(value => {
                ws.cell(rowIndex,columnIndex).string(value);
                columnIndex++;
            })
            rowIndex++;
        })
    
        wb.write('Excel.xlsx');
}



module.exports = {
    generateExcel
}
