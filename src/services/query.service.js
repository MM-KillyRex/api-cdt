const moment = require('moment-timezone');
const _ = require('lodash');
const { Duration } = require('luxon')
const xlsx = require('xlsx-populate');
const {getPath, readFile, writeFile} = require('../utils/file.utils');
const queryRepository = require('../repositories/query.repository');
const geotabService = require('../services/geotab.service');



const getStatusKof = async (sIds, dtFrom, dtTo) => {
    
    const result = await queryRepository.getReportKof({sIds, dtFrom, dtTo});
    if(!result)
        return
    // Disposotivos
    const devices = await geotabService.getDevices();
    const devicesDict = _.keyBy(devices, 'id');
    
    // Grupos
    const groups = await geotabService.getGroups();
    const groupsDict = _.keyBy(groups, e => e.id.toLowerCase());

    //56 bd
    const params = [
     "iKilometrajeInicial",            //11
     "iKilometrajeRecorridos",         //12
     "iLitrosConsumidos",              //13
     "iEventosCalentamiento",          //14
     "iMaximaTemp",                    //15
     "iMaximaTempDuracion", // 05      //16
     "iMinimaTempDuracion", // 06      //17
     "iPromTemp",                           
     "dRendCalcMin", 
     "dRednCalcTotal", 
     "dRendCalcMax", // 10
     "iTotalEventosComb",
     "iSum_evt_Combustible",
     "iTotalCodFalla",
     "iTotalCodFallaActivos",
     "sCodFallaActivos",
     "iTotalCodFallaInactivos",
     "sCodigoInactivMayFrec",
     "iRpmSobreRevolucion",
     "iRpmDurSobreRevolucion", //19
     "iRpmMAxRegistradas", // 20
     "iRalentiTiempo",
     "iRalentiSumTiempo", // 22
     "iRalentiSumTotal", // 23        
     "iRalentiMaximoTiempo", // 24       // 35
     "iRalentivsTiempoOperacion", //25   
     "iRalentiLitrosConsumidos", // 26      // 37 
     "iAceleradorEventos",                // 38
     "iAceleracionDuracion",
     "iVelocidadPromedio",
     "iVelocidadMaxima",
     "dCo2Generadokg",
     "iCo2GeneradoKgKm",
     "iKilometrajeFinal", // 33
     "iConsumoAcumuladoInicial",
     "iConsumoAcumuladoFinal",
     "dRendEcmMin",
     "dRendEcmProm",
     "dRendEcmMax",
     "dRendEcmTotal",
     "iPanicoEventos",
     "iPanicoMaximaG", 
     "iGiroBruscoEventos",
     "iGiroBruscoMaxiGIzq",
     "iGiroBruscoMaxGDer", 
     "iAceleracionEventos", // 45
     "iAceleracionMaximaG",
     "dExcepcionRalentiUODuracion",
     "dCalificacion",
     "bValida",
     "iTiempo_Temperatura",
     "iHoras_Motor", //51
     "iTiempo_Manejo", //52
     "Distancia_Trips", //53
    ]

    const reportData = result.map(e => {
        
 

        const device = devicesDict[e.sId];
        const economico = device.name;

        // tipo
        const group7 = groupsDict['b28c2'];
        group7.children = group7.children.map(e => groupsDict[e.id]);
        const tipo = device.groups.find(e => group7.children.find(f => f.id === e.id )).name;

        // marca - ultimo de los children 
        const group6 = groupsDict['b27C4'];
        group6.children = group6.children.map(e => groupsDict[e.id]);
        const marcas = group6.children;
        const modelos = marcas.map(e => e.children.map(e => groupsDict[e.id])).flat(); // recorrer array marcas

        const modeloDevice = device.groups.find(e => modelos.find(f => f.id === e.id));
        // Marca device 
        const marca = marcas.find(e => e.children.some(f => f.id === modeloDevice.id)).name;
        // Modelo device
        const modelo = modeloDevice.name;
        // Año
        const year = device.year;
        // No Serie
        const noSerie = device.serialNumber;
        // Group 4 - Emplazamiento
        const emplazamientos = [grupo4, ...grupo4.children]; // crear arreglo del gpo 4 y sus hijos al mismo level
        const emplazamiento = device.groups.find(e => emplazamientos.find(f => f.id === e.id)).name;
        // const group6 = groupsDict['b27C4'];
        // group6.children = group6.children.map(e => groupsDict[e.id]);
     

        const date = e.dtFecha;
        const week = moment(date).week();
        const can = "";
        let datos = params.map(param => e[param]);

        // Variables arreglo 
        let KmInicial = datos[0];
        let KmRecorridos = datos[1];
        let LitrosConsumidos = datos[2];
        let MaximaTempDuracion = datos[5];
        let MinimaTempDuracion = datos[6];
        let RendCalcMin = datos[8];
        let RendCalcTotal = datos[9];
        let RendCalcMax = datos[10];
        let RpmDurSobreRevolucion = datos[19];
        let RpmMaxRegistradas = datos[20];
        let iRalentiSumTiempo = datos[22];
        let iRalentiSumTotal = datos[23];
        let iRalentiMaximoTiempo = datos[24];
        let iRalentivsTiempoOperacion = [25];
        let iAceleracionDuracion = datos[28];
        let iVelocidadPromedio = datos[29];
        let dCo2Generadokg = datos[31];
        let Co2GeneradoKgKm = datos[32];
        let KmFinal = datos[33];
        let iPanicoMaximaG = datos[41];
        let iGiroBruscoMaxiGIzq = datos[43];
        let iGiroBruscoMaxiGDer = datos[44];
        let iAceleracionMaximaG = datos[46];
        let dExcepcionRalentiUODuracion = datos[47];
        let dCalificacion = datos[48];
        let bValida = datos[49];
        let TiempoTemperatura = datos[50];
        let HorasMotor =  datos[51];
        let TiempoManejo = datos[52];
        let Distancia_Trips = datos[53];
        
        // Variables Auxiliares
        let num;
        let valueProm;
        let valCalcMin;
        let valEvRev;
        let valMAXRPM;
        let valRalentiSum;
        let valRalentiSumTotal;
        let valRalentiMaxT;
        let valRalentivsTiempoOp;
        let valCo2Generadokg;
        let valAcelera;
        let valCo2Generadokm;
        let valCalificacion;
        let stringVal;

        //Pendiente // Máxima duración de evento [hh:mm:ss] [15]
        datos = [datos.slice(0,5), i, ...datos.slice(5)]; 


        //const datos2 = datos.slice(5); Obtener el arreglo de 5 elems


        let distanceTrips = KmRecorridos;

            if(distanceTrips <= 0) {
                const spReporteDiario = datos;
                distanceTrips = Distancia_Trips;
                spReporteDiario[53] = (distanceTrips == undefined ? 0 : Distancia_Trips);
                // Kilometraje inicial = 0
                KmInicial = 0;
                // Kilometraje final = Distancia_Trips
                KmFinal = Distancia_Trips;
                // Kilometraje recorrido = Distancia_Trips
                KmRecorridos = Distancia_Trips;
            }
        
        if(( HorasMotor != undefined ||  HorasMotor <= 0 ) && TiempoManejo != undefined ) {
            distanceTrips = iRalentiSumTotal;
            if( distanceTrips != undefined ) {
                const nullable = datos;
                const value8 = TiempoManejo;
                distanceTrips = iRalentiSumTotal;
                const sum = value8 + distanceTrips;
                const now = moment().add(sum, 'ms');
                nullable[51] = now.seconds();
            }
        }

        distanceTrips = KmRecorridos;
        const num8 = distanceTrips;
        distanceTrips = LitrosConsumidos;
        Math.round(num8 / distanceTrips, 2) // ?

        // Operación debajo de temperatura mínima recomendada Celda 17
        num = validar(MaximaTempDuracion)
        /*
        if(distanceTrips !== null || distanceTrips !== undefined) {
            distanceTrips = MaximaTempDuracion;
            num = distanceTrips;
        } else {
            num = 0;
        }
        */
        // Insercion valor
        insert(datos, 5, num); // ?
        
        // Insersion valor Máxima duración de evento debajo de temperatura mínima de operación Celda 18
        valueProm = validar(TiempoTemperatura); 
        /*
        if(distanceTrips !== null || distanceTrips !== undefined) {
            distanceTrips = TiempoTemperatura;
            valueProm = distanceTrips;
        } else {
            valueProm = 0;
        }
        */

        // Insercion valor 
        const promTemp = Duration.fromMillis(valueProm).toFormat('hh:mm:ss.SSS');
        //const iPromTemp =  insert(datos, 7, promTemp); // ?
        insert(datos, 7, promTemp);
        
        // Temperatura promedio de operación Celda 19
        ////// distanceTrips = MinimaTempDuracion;
        valCalcMin = validar(MinimaTempDuracion);
        const rendCal = Duration.fromMillis(valCalcMin).toFormat('hh:mm:ss.SSS');
        insert(datos, 6, rendCal);

        // dRendCalcMin Celda 20
        distanceTrips = RendCalcMin;
        const round = Math.round(distanceTrips, 2);
        datos[8] = round;

        // dRendCalcTotal Celda 21
        distanceTrips = RendCalcTotal;
        const round2 = Math.round(distanceTrips, 2);
        datos[9] = round2;

        // dRendCalcTotal Celda 22
        distanceTrips = RendCalcMax;
        const round3 = Math.round(distanceTrips, 2);
        datos[10] = round3;

        // Duración total de los eventos de sobre revolución 31
        valEvRev = validar(RpmDurSobreRevolucion);
        /* 
        if(distanceTrips !== null || distanceTrips !== undefined) {
            distanceTrips = RpmDurSobreRevolucion;
            valEvRev = distanceTrips;
        } else {
            valEvRev = 0;
        }
        */
        //insersion
        const eventosRev = Duration.fromMillis(valEvRev).toFormat('hh:mm:ss.SSS');
        insert(datos, 19, eventosRev);
        // datos[19] = eventosRev

        // Máximas RPM´s registradas
        valMAXRPM = validar(RpmMaxRegistradas)
        insert(datos, 20, valMAXRPM);
        //datos[20]  = distanceTrips;

        // Tiempo en ralentí (excedentes a 5min/evento) // Celda 34
        valRalentiSum = validar(iRalentiSumTiempo)
        /* 
        if(distanceTrips !== null || distanceTrips !== undefined) {
            distanceTrips = iRalentiSumTiempo;
            valRalentiSum = distanceTrips;
        } else {
            valRalentiSum = 0;
        }
        */
        const realentiSumT = Duration.fromMillis(valRalentiSum).toFormat('hh:mm:ss.SSS');
        insert(datos, 22, realentiSumT);
        // datos[22] = realentiSumT

        // Tiempo total de ralentí  // Celda 35
        valRalentiSumTotal = validar(iRalentiSumTotal)
        const realentiSumTot = Duration.fromMillis(valRalentiSumTotal).toFormat('hh:mm:ss.SSS');
        insert(datos, 23, realentiSumTot);
        // datos[23] = realentiSumTot

        // Tiempo Ralenti UO --> Celda 36
        distanceTrips = iRalentiMaximoTiempo;
        valRalentiMaxT = validar(iRalentiMaximoTiempo)
        const ralentiMaxTime = Duration.fromMillis(valRalentiMaxT).toFormat('hh:mm:ss.SSS');
        insert(datos, 24, ralentiMaxTime);
        // datos[24] = ralentiMaxTime
        // Tiempo Ralenti Fuera UO  --> Celda 37
         const dExcepcionRal = moment((dExcepcionRalentiUODuracion !== null || dExcepcionRalentiUODuracion !== undefined ? dExcepcionRalentiUODuracion : 0)).milliseconds;
         insert(datos, 25, dExcepcionRal);
         // Máximo tiempo en ralentí (1 solo evento) 38
         // Tiempo en ralenti vs Tiempo de Operación  --> Celda 39
        distanceTrips = iRalentivsTiempoOperacion;
        valRalentivsTiempoOp = validar(iRalentivsTiempoOperacion);
        const realentiVsTiempo = Math.round(valRalentivsTiempoOp, 2);
        insert(datos, 26, realentiVsTiempo);
         // datos[26] = realentiVsTiempo
        
         // Tiempo de Manejo --> 40
         const obj = validar(TiempoManejo);
         const TimeDriving = Duration.fromMillis(obj).toFormat('hh:mm:ss.SSS');
         insert(datos, 27, TimeDriving);
         // datos[27] = TimeDriving

         const  tiempoOp =  validar(HorasMotor);
         const TiempoMili = Duration.fromMillis(tiempoOp).toFormat('hh:mm:ss.SSS');
         insert(datos, 28,TiempoMili);

         // datos[29]
         // datos[30]

         valAcelera = validar(iAceleracionDuracion);
         const aceleracionDur = moment(valAcelera).milliseconds
         insert(datos, 31, aceleracionDur);

         insert(datos, 32, iVelocidadPromedio);
         // datos[32] = distanceTrips
         // 33 velocidad max
    
         valCo2Generadokg = validar(dCo2Generadokg);
         const co2Gen = Math.round(valCo2Generadokg, 2);
         insert(datos, 33, co2Gen);

         valCo2Generadokm = validar(Co2GeneradoKgKm);
         const co2GenKm = Math.round(valCo2Generadokm, 2);
         insert(datos, 34, co2GenKm);

         distanceTrips = Co2GeneradoKgKm;

         if(!(distanceTrips !== null && distanceTrips !== undefined)) {
             if(dCalificacion !== null && distanceTrips !== undefined) {
                 valCalificacion = dCalificacion;
                 stringVal = valCalificacion + "";
             } else if(bValida) {
                valCalificacion = stringVal ;
                stringVal = valCalificacion + "";
             } else{
                 stringVal = "NA";
             }
             
            }

        insert(datos, 35, stringVal);
             ///36 - 43

        let valPanicoMax = validar(iPanicoMaximaG);
        const panicoMaxG = Math.round(valPanicoMax,2);
        insert(datos, 44, panicoMaxG); 
        // 45 - giro brusco

        let valGiroBruscoMaxiGIzq = validar(iGiroBruscoMaxiGIzq);
        const giroBruscoIzq = Math.round(valGiroBruscoMaxiGIzq,2);
        insert(datos, 46, giroBruscoIzq);
    
        let valGiroBruscoMaxiGDer = validar(iGiroBruscoMaxiGDer);
        const giroBrusco = Math.round(valGiroBruscoMaxiGDer,2);
        insert(datos, 47, giroBrusco);
        
        // 48 iAceleracionEvento
             
        let valAceleracionMaximaG = validar(iAceleracionMaximaG);
        const aceleracionMax = Math.round(valAceleracionMaximaG,2);
        insert(datos, 49, aceleracionMax);
        
        let datosXD = 0;
        let comunicando = 1;
        insert(datos, 50, datosXD);
        let fechaNew = Duration.fromMillis(datosXD).toFormat('hh:mm:ss.SSS');;
        insert(datos, 51, fechaNew);
        insert(datos, 52, comunicando);     

        return ([economico, tipo, marca, modelo, year, noSerie, emplazamiento, week, can,  ...datos]) // spread 
    });

    return reportData

};

const insert = (array, i, item) => [...array.slice(0, i), item, ...array.slice(i)];


const generateXLSX = async (Ids, dtTo, dtFrom) => {
    const wb = await xlsx.fromFileAsync('docs/template.xlsx');
    const sheet1 = wb.sheet(0);
    const report = await getStatusKof(Ids, dtTo, dtFrom);
    if(report.length)
    sheet1.cell("A2").value(report);
    return wb.outputAsync();
}

/*
const generateXLSX = () => {
    xlsx.fromBlankAsync('docs/template.xlsx')
    .then(workbook => {
        const report = getStatusKof();
        const value = workbook.sheet("Sheet1").cell("A1").value(report);

        console.log(value);
    })
}
*/
const validar = valor => valor || 0;

module.exports = {
    generateXLSX,
}