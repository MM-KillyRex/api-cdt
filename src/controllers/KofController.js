const { Router } = require('express');
const nodemailer = require('nodemailer');
const { transporter } = require('../providers/EmailProvider');
const {excel, generateExcel} = require('../Providers/ReportsProviders')
const { f } = require('../Providers/KofProvider')
const { datos } = require('../Providers/KofProvider')
const router = Router();
const API = require('mygeotab-api-node');
require('../environments/config');

const server = process.env.GEOTAB_SERVER;
const sessionId = process.env.GEOTAB_SESSIONID;
const database = process.env.GEOTAB_DB;
const userName = process.env.GEOTAB_USERNAME;

router.get('/', (req, res) => {
    res.send('Hello, I am here');
})

/*
Función download para generar y descargar el Excel
----------------------------------------------------------------
Entrada: req y res

Salida: Excel generado y descargado con la funcion generateExcel() y download del res.
*/

router.get('/download', async (req, res) => {
    let status =  await generateExcel();
    if(status === true) {
        res.download('Excel.xlsx');
    }else{
        setTimeout(function() {res.download('Excel.xlsx')}, 3000)
    }
})

/*
Función download para generar y descargar el Excel
----------------------------------------------------------------
Entrada: req y res

Salida: Excel generado y descargado con la funcion generateExcel() y download del res.
*/

router.get('/excel', async (req, res) => {
    f();
    res.send(datos[0]);
})

/*
Función download para generar y descargar el Excel
----------------------------------------------------------------
Entrada: req y res

Salida: Excel generado y descargado con la funcion generateExcel() y download del res.
*/

router.post("/send-email", (req, res) => {
    
    const trasporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        post: 465,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMIL_FROM,
        to: process.env.EMAIL_TO,
        cc: process.env.EMAIL_CC,
        subject: process.env.EMAIL_SUBJECT,
        text: "Archivo de Excel",

        attachments: [
            {   // utf-8 string as an attachment
                filename: 'Excel.xlsx',
                path: 'Excel.xlsx',
            },
        ]

    };

    trasporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            res.status(500).send(error.message);
        } else {
            console.log("Email Enviado!");
            res.status(200).jsonp(req.body);
        }
    });
});



module.exports = router;