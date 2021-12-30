const express = require('express');
const app = express();
const router = express.Router();
const { kofController } = require('../controllers/index.controller');

router.get('/download2', kofController.downloadExcel2);
router.get('/download', kofController.downloadExcel);
router.get('/data', kofController.getData);
router.post('/email', kofController.sendEmail);

app.use('/api/reports', router);

module.exports = app;

