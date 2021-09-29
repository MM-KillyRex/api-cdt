const { Router } = require('express');
const {excel, generateExcel} = require('../providers/reportsProviders')
const router = Router();
const API = require('mygeotab-api-node');
require('../../environments/config');

const server = process.env.GEOTAB_SERVER;
const sessionId = process.env.GEOTAB_SESSIONID;
const database = process.env.GEOTAB_DB;
const userName = process.env.GEOTAB_USERNAME;

router.get('/', (req, res) => {
    res.send('Hello, I am here');
})

router.get('/download', (req, res) => {
    generateExcel();
    res.send('Excel generado');
})
router.get('/test', (req, res) => {
    const data = {
        "name": "Pedro Picapiedra",
        "job": "Driver",
        "Age": "30"
    }
    res.send(data);
})

router.get('/rules', async (req, res) => {
    try {
        const api = new API(userName, null, sessionId, database, server);
        let devices = await api.callAsync('Get', {
            typeName: 'Rule'
        });
        res.send(devices);

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;