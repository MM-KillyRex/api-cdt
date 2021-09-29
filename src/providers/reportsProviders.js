var xl = require('excel4node');


function generateExcel() {

    // creamos una nueva instancia de la clase workbook
    var wb = new xl.Workbook();

    // añadimos hojas de trabajo al libro de trabajo
    var ws = wb.addWorksheet('Hoja 1');
    var ws2 = wb.addWorksheet('Hoja 2');

    // creamos un estilo reusable
    var style = wb.createStyle({
        font: {
            color: '#FF0800',
            size: 12,
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -',
    });

    // asignamos el valor de la celda A! de 100 como numero y el estilo asignado
    ws.cell(1,1)
    .number(100)
    .style(style);

    // Set value of cell B1 to 200 as a number type styled with paramaters of style
    ws.cell(1, 2)
    .number(200)
    .style(style);

    // Set value of cell C1 to a formula styled with paramaters of style
    ws.cell(1, 3)
    .formula('A1 + B1')
    .style(style);

    // Set value of cell A2 to 'string' styled with paramaters of style
    ws.cell(2, 1)
    .string('string')
    .style(style);

    // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
    ws.cell(3, 1)
    .bool(true)
    .style(style)
    .style({font: {size: 14}});

    wb.write('Excel.xlsx');
    
}

module.exports = {
    generateExcel
}
