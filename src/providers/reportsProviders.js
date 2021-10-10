var xl = require('excel4node');

//hacer que una misma instancia use ese modulo


function generateExcel() {

    // creamos una nueva instancia de la clase workbook
    var wb = new xl.Workbook();

    // añadimos hojas de trabajo al libro de trabajo
    var ws = wb.addWorksheet('Hoja 1');
    var ws2 = wb.addWorksheet('Hoja 2');

    //titulo color lista de objetos con 2 campos
    //rojo: #FF0000, azul: 92C5FC, gris claro: E3E4E5, blanco: #FFFFFF, azul marino: #000080, 
    //rosa claro: #FFB6C1, verde claro: 98FF98, rosa fuerte: FF0080, naranja fuerte: FF80000, 
    //morado claro: CCA9DD, azul: 3B83BD, verde pis: 70FF8B, azulr: 6571AC, ginda: 6D0C2E, 
    //gris: 9B9B9B, lila: E3B1D2

    let titles = [
    // Columna rojo 10
    { titulo:"Número Económico", color:"#FF0000" ,cf:"#FFFFFF"},
    { titulo:"Tipo", color:"#FF0000" ,cf:"#FFFFFF"}, 
    { titulo:"Marca", color:"#FF0000",cf:"#FFFFFF" }, 
    { titulo:"Modelo", color:"#FF0000" ,cf:"#FFFFFF"}, 
    { titulo:"Año", color:"#FF0000",cf:"#FFFFFF" }, 
    { titulo:"No Serie", color:"#FF0000",cf:"#FFFFFF" }, 
    { titulo:"Ce Emplazamiento", color:"#FF0000", cf:"#FFFFFF"}, 
    { titulo:"Fecha", color:"#FF0000", cf:"#FFFFFF" }, 
    { titulo:"Semana", color:"#FF0000",cf:"#FFFFFF" }, 
    { titulo:"Can", color:"#FF0000" ,cf:"#FFFFFF"}, 
    // Columna azul claro 3
    { titulo:"Kilometraje inicial ", color:"#92C5FC" }, 
    { titulo:"Kilometros recorridos en el período", color:"#92C5FC" }, 
    { titulo:"Litros consumidos en el período", color:"#92C5FC" },
    // Columna gris claro 4
    { titulo:"Eventos de calentamiento (>105°C)", color:"#E3E4E5" }, 
    { titulo:"Máxima Temp reportada [°C]", color:"#E3E4E5" },
    { titulo:"Máxima duración de evento [hh:mm:ss]", color:"#E3E4E5" },   
    { titulo:"Operación debajo de temperatura mínima recomendada [hh:mm:ss]", color:"#E3E4E5" }, 
    // Columna blanco 1 
    { titulo:"Máxima duración de evento debajo de temperatura mínima de operación [min]", color:"#FFFFFF" }, 
    // Columna gris claro 1
    { titulo:"Temperatura promedio de operación", color:"#E3E4E5" }, 
    // Columna gris obscuro 3
    { titulo:"Rendimiento calculado mínimo [km/L]", color:"#B5B5B5" }, 
    { titulo:"Rendimiento calculado total [km/L]", color:"#B5B5B5" }, 
    { titulo:"Rendimiento calculado máximo [km/L]", color:"#B5B5B5" },
    // Columna gris claro 2
    { titulo:"Total de eventos de combustible", color:"#E3E4E5" }, 
    { titulo:"Sumatoria de litros para eventos de combustible", color:"#E3E4E5" },
    // Columna azul marino 5
    { titulo:"Total de eventos de códigos de falla", color:"#000080" , cf:"#FFFFFF"}, 
    { titulo:"Total de códigos de falla activos", color:"#000080" , cf:"#FFFFFF"}, 
    { titulo:"Código activo de mayor incidencia", color:"#000080" , cf:"#FFFFFF"}, 
    { titulo:"Total de códigos de falla inactivos", color:"#000080" , cf:"#FFFFFF"},
    { titulo:"Código inactivo de mayor incidencia", color:"#000080" , cf:"#FFFFFF"}, 
    // Columna rosa 3
    { titulo:"Cantidad de eventos de sobre revolución", color:"#FFB6C1" }, 
    { titulo:"Duración total de los eventos de sobre revolución", color:"#FFB6C1" }, 
    { titulo:"Máximas RPM´s registradas", color:"#FFB6C1" },
    // Columna verde claro 7
    { titulo:"Cantidad de eventos Ralentí >5 min", color:"#98FF98" },
    { titulo:"Tiempo en ralentí (excedentes a 5min/evento) [min]", color:"#98FF98" }, 
    { titulo:"Tiempo total de ralentí [min]", color:"#98FF98" }, 
    { titulo:"Tiempo Ralenti UO", color:"#98FF98" }, 
    { titulo:"Tiempo Ralenti Fuera UO", color:"#98FF98" }, 
    { titulo:"Máximo tiempo en ralentí (1 solo evento)", color:"#98FF98" }, 
    { titulo:"Tiempo en ralenti vs Tiempo de Operación [%]", color:"#98FF98" }, 
    //Columna rosa fuerte 2
    { titulo:"Tiempo de Manejo", color:"#FF0080" }, 
    { titulo:"Tiempo de Operación", color:"#FF0080" },
    // Columna verde claro 1
    { titulo:"Litros de combustible consumidos en Ralentí [L]", color:"#98FF98" },
    // Columna naranja fuerte 2
    { titulo:"Cantidad de eventos acelerador > 90%", color:"#FF8000" }, 
    { titulo:"Duración de los eventos [min]", color:"#FF8000" },
    // Columna morado claro 2
    { titulo:"Eventos de Velocidad", color:"#CCA9DD" }, 
    { titulo:"Maximum Speed", color:"#CCA9DD" },
    // Columna Azul 2
    { titulo:"Estimación de CO2 generado [kg]", color:"#3B83BD" ,cf:"#FFFFFF"}, 
    { titulo:"Estimación de CO2 generado [kg/km]", color:"#3B83BD" ,cf:"#FFFFFF"},
    // Columna verde pistache 1
    { titulo:"Calificación Conducción", color:"#70FF8B" ,cf:"#FFFFFF"},
    // Columna azul claro 3
    { titulo:"Kilometraje final [km]", color:"#92C5FC"  ,cf:"#FF0000"}, 
    { titulo:"Consumo total acumulado inicial [L]", color:"#92C5FC"  ,cf:"#FF0000"}, 
    { titulo:"Consumo total acumulado final [L]", color:"#92C5FC"  ,cf:"#FF0000"},
    // Columna azul chiclamino 2 
    { titulo:"Cantidad eventos Frenada de pánico [< -0.5 G]", color:"#6571AC"  ,cf:"#FF0000"}, 
    { titulo:"Máxima G registrada", color:"#6571AC"  ,cf:"#FF0000"},
    // Columna guinda 3
    { titulo:"Cantidad eventos Giro brusco", color:"#6D0C2E"  ,cf:"#FF0000"}, 
    { titulo:"Máxima G registrada izquierda", color:"#6D0C2E"  ,cf:"#FF0000"}, 
    { titulo:"Máxima G registrada derecha", color:"#6D0C2E"  ,cf:"#FF0000"},
    // Columna gris normal 2
    { titulo:"Cantidad eventos Aceleración Brusca ", color:"#9B9B9B"  ,cf:"#FF0000"}, 
    { titulo:"Máxima G registrada", color:"#9B9B9B"  ,cf:"#FF0000"},
    // Columna lila 2
    { titulo:"Entradas a Taller (eventos)", color:"#E3B1D2"  ,cf:"#FF0000"}, 
    { titulo:"Duración en taller (total)", color:"#E3B1D2"  ,cf:"#FF0000"},
    // Columna verde claro 1
    { titulo:"Comunicando", color:"#98FF98" ,cf:"#FF0000"}
    ];

    
    //insertar fila de titulos

    for(var i = 0; i < titles.length; i++){
        let valuesC = titles[i].color;
        let valuesT = titles[i].titulo;
        let valuesCF = titles[i].cf;
        ws.cell(1,i+1).string(valuesT).style({
            font:{
                bold: true,
                size: 10,
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
        
        ws.column(i+1).setWidth(20)
    }
    ws.row(1).setHeight(45).filter()
    ws.column(6).freeze(5)
    console.log("Excel Generado!");
    wb.write('Excel.xlsx');
}

module.exports = {
    generateExcel
}
