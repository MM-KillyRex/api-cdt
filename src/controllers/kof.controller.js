
const { reportsService, kofService, emailService, queryService } = require('../services/index.service');

/*
const server = process.env.GEOTAB_SERVER;
const sessionId = process.env.GEOTAB_SESSIONID;
const database = process.env.GEOTAB_DB;
const userName = process.env.GEOTAB_USERNAME;

Función download para generar y descargar el Excel
----------------------------------------------------------------
Entrada: req y res

Salida: Excel generado y descargado con la funcion generateExcel() y download del res.
*/

const downloadExcel = (req, res, next) => {
    try{
        reportsService.generateExcel();
        res.status(200).download('Excel.xlsx')
    } catch(err){
        next(err);
    }
}

const downloadExcel2 = async (req, res, next) => {
    try{
        const {sIds,dtFrom, dtTo} = req.query
        const result = await queryService.generateXLSX(sIds, dtFrom, dtTo);
        res.attachment('uwu.xlsx');
        return res.status(200).send(result);
    } catch(err){
        next(err);
    }
}



/*
router.get('/download', async (req, res) => {
    let status =  await generateExcel();
    if(status === true) {
        res.download('Excel.xlsx');
    }else{
        setTimeout(function() {res.download('Excel.xlsx')}, 3000)
    }
})

Función download para generar y descargar el Excel
----------------------------------------------------------------
Entrada: req y res

Salida: Excel generado y descargado con la funcion generateExcel() y download del res.
*/
const getData = async (req, res, next) => {
    try {
        const result = await kofService.getData();
        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

/*
Función download para generar y descargar el Excel
----------------------------------------------------------------
Entrada: req y res

Salida: Excel generado y descargado con la funcion generateExcel() y download del res.
*/

const sendEmail = async (req, res, next) => {
    try{
        const result = await emailService.sendEmail();
        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}


module.exports = {
    downloadExcel,
    downloadExcel2,
    getData,
    sendEmail
  };
  