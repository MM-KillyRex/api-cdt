/*const _ = require('lodash');
const camelize = require('camelize');
const xl = require('excel4node');
const objEx = require('read-excel-file/node')


const generateExcel = async () => {
    const result = await generateTitles();
    return camelize(result);
}

let status = false;
let titulos = [];
let datos = [];


objEx('docs/ctd.xlsx').then((rows) => {
    titulos = rows[0];
    for (i in rows) {
        if(i > 0){
            let aux = [];
            for(var j = 0; j < titulos.length-4; j++){
                aux.push(`${rows[i][j]}`);
            }
        datos.push(aux);
      }
    }
})

async function generateTitles() {

    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Hoja 1');
    var ws2 = wb.addWorksheet('Hoja 2');

    //titulo color lista de objetos con 2 campos
    //rojo: #c00000, azul: 8db1db, gris claro: f1f1f1, blanco: #FFFFFF, azul marino: #1c4876, 
    //rosa claro: #f2dcdb, verde claro: #c5d39a, rosa fuerte: #f205e9, naranja fuerte: #ef92420, 
    //morado claro: #b1a0c7, azul: #538dd5, verde pis: #92d050, azulr: #34839a, ginda: #953332, 
    //gris: #808080, lila: #E3B1D2
   

    let titles = [
        // Columna rojo 10
        { titulo:"Número Económico", color:"#c00000" ,cf:"#FFFFFF", size:"16" },
        { titulo:"Tipo", color:"#c00000" ,cf:"#FFFFFF" , size:"10"}, 
        { titulo:"Marca", color:"#c00000",cf:"#FFFFFF" , size:"13"}, 
        { titulo:"Modelo", color:"#c00000" ,cf:"#FFFFFF", size:"9"}, 
        { titulo:"Año", color:"#c00000",cf:"#FFFFFF" , size:"7"}, 
        { titulo:"No Serie", color:"#c00000",cf:"#FFFFFF" , size:"13"}, 
        { titulo:"Ce Emplazamiento", color:"#c00000", cf:"#FFFFFF", size:"21"}, 
        { titulo:"Fecha", color:"#c00000", cf:"#FFFFFF" , size:"18"}, 
        { titulo:"Semana", color:"#c00000",cf:"#FFFFFF" , size:"11"}, 
        { titulo:"Can", color:"#c00000" ,cf:"#FFFFFF", size:"16"}, 
        // Columna azul claro 3
        { titulo:"Kilometraje inicial ", color:"#8db1db" , size:"15"}, 
        { titulo:"Kilometros recorridos en el período", color:"#8db1db" , size:"15"}, 
        { titulo:"Litros consumidos en el período", color:"#8db1db" , size:"15"},
        // Columna gris claro 4
        { titulo:"Eventos de calentamiento (>105°C)", color:"#f1f1f1", size:"15" }, 
        { titulo:"Máxima Temp reportada [°C]", color:"#f1f1f1" , size:"15"},
        { titulo:"Máxima duración de evento [hh:mm:ss]", color:"#f1f1f1", size:"20" },   
        { titulo:"Operación debajo de temperatura mínima recomendada [hh:mm:ss]", color:"#f1f1f1", size:"15" }, 
        // Columna blanco 1 
        { titulo:"Máxima duración de evento debajo de temperatura mínima de operación [min]", color:"#FFFFFF", size:"15" }, 
        // Columna gris claro 1
        { titulo:"Temperatura promedio de operación", color:"#f1f1f1" , size:"15"}, 
        // Columna gris obscuro 3
        { titulo:"Rendimiento calculado mínimo [km/L]", color:"#ddd9c4" , size:"15"}, 
        { titulo:"Rendimiento calculado total [km/L]", color:"#ddd9c4" , size:"15"}, 
        { titulo:"Rendimiento calculado máximo [km/L]", color:"#ddd9c4" , size:"15"},
        // Columna gris claro 2
        { titulo:"Total de eventos de combustible", color:"#f1f1f1" , size:"15"}, 
        { titulo:"Sumatoria de litros para eventos de combustible", color:"#f1f1f1" , size:"15"},
        // Columna azul marino 5
        { titulo:"Total de eventos de códigos de falla", color:"#1c4876" , cf:"#FFFFFF", size:"15"}, 
        { titulo:"Total de códigos de falla activos", color:"#1c4876" , cf:"#FFFFFF", size:"15"}, 
        { titulo:"Código activo de mayor incidencia", color:"#1c4876" , cf:"#FFFFFF", size:"15"}, 
        { titulo:"Total de códigos de falla inactivos", color:"#1c4876" , cf:"#FFFFFF", size:"15"},
        { titulo:"Código inactivo de mayor incidencia", color:"#1c4876" , cf:"#FFFFFF", size:"15"}, 
        // Columna rosa 3
        { titulo:"Cantidad de eventos de sobre revolución", color:"#f2dcdb" , size:"15"}, 
        { titulo:"Duración total de los eventos de sobre revolución", color:"#f2dcdb" , size:"15"}, 
        { titulo:"Máximas RPM´s registradas", color:"#f2dcdb" , size:"15"},
        // Columna verde claro 7
        { titulo:"Cantidad de eventos Ralentí >5 min", color:"#c5d39a" , size:"15"},
        { titulo:"Tiempo en ralentí (excedentes a 5min/evento) [min]", color:"#c5d39a" , size:"15"}, 
        { titulo:"Tiempo total de ralentí [min]", color:"#c5d39a" , size:"15"}, 
        { titulo:"Tiempo Ralenti UO", color:"#c5d39a" , size:"15"}, 
        { titulo:"Tiempo Ralenti Fuera UO", color:"#c5d39a" , size:"15"}, 
        { titulo:"Máximo tiempo en ralentí (1 solo evento)", color:"#c5d39a", size:"15" }, 
        { titulo:"Tiempo en ralenti vs Tiempo de Operación [%]", color:"#c5d39a" , size:"15"}, 
        //Columna rosa fuerte 2
        { titulo:"Tiempo de Manejo", color:"#f205e9" , size:"15"}, 
        { titulo:"Tiempo de Operación", color:"#f205e9" , size:"15"},
        // Columna verde claro 1
        { titulo:"Litros de combustible consumidos en Ralentí [L]", color:"#c5d39a" , size:"15"},
        // Columna naranja fuerte 2
        { titulo:"Cantidad de eventos acelerador > 90%", color:"#ef9242" , size:"15"}, 
        { titulo:"Duración de los eventos [min]", color:"#ef9242" , size:"15"},
        // Columna morado claro 2
        { titulo:"Eventos de Velocidad", color:"#b1a0c7" , size:"15"}, 
        { titulo:"Maximum Speed", color:"#b1a0c7", size:"15" },
        // Columna Azul 2
        { titulo:"Estimación de CO2 generado [kg]", color:"#538dd5" ,cf:"#FFFFFF", size:"15"}, 
        { titulo:"Estimación de CO2 generado [kg/km]", color:"#538dd5" ,cf:"#FFFFFF", size:"15"},
        // Columna verde pistache 1
        { titulo:"Calificación Conducción", color:"#92d050" ,cf:"#FFFFFF", size:"15"},
        // Columna azul claro 3
        { titulo:"Kilometraje final [km]", color:"#8db1db"  ,cf:"#f31f45", size:"15"}, 
        { titulo:"Consumo total acumulado inicial [L]", color:"#8db1db"  ,cf:"#f31f45", size:"15"}, 
        { titulo:"Consumo total acumulado final [L]", color:"#8db1db"  ,cf:"#f31f45", size:"15"},
        // Columna azul chiclamino 2 
        { titulo:"Cantidad eventos Frenada de pánico [< -0.5 G]", color:"#34839a"  ,cf:"#f31f45", size:"15"}, 
        { titulo:"Máxima G registrada", color:"#34839a"  ,cf:"#f31f45", size:"15"},
        // Columna guinda 3
        { titulo:"Cantidad eventos Giro brusco", color:"#953332"  ,cf:"#f31f45", size:"15"}, 
        { titulo:"Máxima G registrada izquierda", color:"#953332"  ,cf:"#f31f45", size:"15"}, 
        { titulo:"Máxima G registrada derecha", color:"#953332"  ,cf:"#f31f45", size:"15"},
        // Columna gris normal 2
        { titulo:"Cantidad eventos Aceleración Brusca ", color:"#808080"  ,cf:"#f31f45", size:"15"}, 
        { titulo:"Máxima G registrada", color:"#808080"  ,cf:"#f31f45", size:"15"},
        // Columna lila 2
        { titulo:"Entradas a Taller (eventos)", color:"#ccc3db"  ,cf:"#f31f45", size:"15"}, 
        { titulo:"Duración en taller (total)", color:"#ccc3db"  ,cf:"#f31f45", size:"15"},
        // Columna verde claro 1
        { titulo:"Comunicando", color:"#c5d39a" ,cf:"#f31f45", size:"15"}
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
        ws.column(5).freeze(5)
        console.log("Excel Generado!");

        // Insertar datos 
        let rowIndex = 2;        
        datos.forEach(dato => {
            let columnIndex = 1;
            dato.forEach(value => {
                ws.cell(rowIndex,columnIndex).string(value);
                columnIndex++;
            })
            rowIndex++;
        })
        // module.exports = datos;   
        wb.write('Excel.xlsx');
        return status = true;
}



module.exports = {
    generateExcel, 
    generateTitles,
    datos
}
*/