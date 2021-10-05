const { Router } = require('express');
const {excel, generateExcel} = require('../Providers/ReportsProviders')
const router = Router();
const API = require('mygeotab-api-node');
require('../../Environments/config');

const server = process.env.GEOTAB_SERVER;
const sessionId = process.env.GEOTAB_SESSIONID;
const database = process.env.GEOTAB_DB;
const userName = process.env.GEOTAB_USERNAME;

router.get('/', (req, res) => {
    res.send('Hello, I am here');
})

router.get('/download', async (req, res) => {
    generateExcel();
    res.download('Excel.xlsx');
})

module.exports = router;