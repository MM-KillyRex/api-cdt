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
    const groupsDict = _.keyBy(groups, e => e.id);

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
     "dRendEcmMax", // 38
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

    // tipo
    const group7 = groupsDict['b28C2'];
    group7.children = group7.children.map(e => groupsDict[e.id]);

    // marca - ultimo de los children 
    const group6 = groupsDict['b27C4'];
    group6.children = group6.children.map(e => groupsDict[e.id]);
    const marcas = group6.children;


    const modelos = marcas.map(e => e.children.map(e => groupsDict[e.id])).flat(); // recorrer array marcas

    const group4 = groupsDict['b2844'];
    
    fillChildren(group4, groupsDict, 4);
    
    const emplazamientos = flatten(group4, 3);

    const yearDevice = groupsDict['b27C5'];
    fillChildren(yearDevice, groupsDict, 2);

    const reportData = result.map(e => {
        

        const device = devicesDict[e.sId];
        const economico = device.name;

        const tipo = group7.children.find(e => device.groups.find(f => f.id === e.id ))?.name|| 'No asignado';
    
        const modeloDevice = modelos.find(e => device.groups.find(f => f.id === e.id));

        // Marca device 
        const marca = marcas.find(e => e.children.some(f => f.id === modeloDevice.id)).name;
        // Modelo device
        const modelo = modeloDevice.name;
        
        // Año
        const year = yearDevice.children.find(e => device.groups.find(f => f.id === e.id))?.name|| 'No asignado';

        // No Serie
        const noSerie = device.serialNumber;
        // Group 4 - Emplazamiento
        const emplazamiento = emplazamientos.find(e => device.groups.find(f => f.id === e.id))?.name|| 'No asignado';
        

        const date = dtFrom.substring(0,10);
        const week = moment(date).weeks()-3;

        const can = "";
        let datos = params.map(param => e[param]);

        // Variables arreglo 
        let KmInicial = datos[0];
        let KmRecorridos = datos[1];
        let LitrosConsumidos = datos[2];
        let MaximaTempDuracion = datos[5];
        let MinimaTempDuracion = datos[6];
        let tempProm = datos[7];
        let RendCalcMin = datos[8];
        let RendCalcTotal = datos[9];
        let RendCalcMax = datos[10];
        let TotCodigosFalla = datos[14];
        let RpmDurSobreRevolucion = datos[19];
        let RpmMaxRegistradas = datos[20];
        let iRalentiTiempo = datos[21];
        let iRalentiSumTiempo = datos[22];
        let iRalentiSumTotal = datos[23];
        let iRalentiMaximoTiempo = datos[24];
        let iRalentivsTiempoOperacion = datos[25];
        let iAceleracionDuracion = datos[28];
        let iVelocidadPromedio = datos[29];
        let iVelocidadMaxima = datos[30];
        let dCo2Generadokg = datos[31];
        let Co2GeneradoKgKm = datos[32];
        let KmFinal = datos[33];
        let iConsumoAcumuladoInicial = datos[34];
        let iConsumoAcumuladoFinal = datos[35];
        let dRendEcmMin = datos[36];
        let dRendEcmProm = datos[37];
        let dRendEcmMax = datos[38];
        let dRendEcmTotal = datos[39];
        let iPanicoEventos = datos[40];
        let iPanicoMaximaG = datos[41];
        let iGiroBruscoEventos = datos[42];
        let iGiroBruscoMaxiGIzq = datos[43];
        let iGiroBruscoMaxiGDer = datos[44];
        let iAceleracionEventos = datos[45];
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
        let valiRalentivsTiempoOperacion;
        let valTempProm;
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

        // Máxima duración de evento Celda 16
        num = validar(MaximaTempDuracion)
        const promTemp0 = Duration.fromMillis(valueProm).toFormat('hh:mm:ss.SSSS').toString();
        console.log("MaxDurEvent: "+ promTemp0)
        insert(datos, 5, promTemp0);

        // Operación debajo de temperatura mínima recomendada Celda 17
        valCalcMin = validar(MinimaTempDuracion);
        const rendCal = Duration.fromMillis(valCalcMin).toFormat('hh:mm:ss.SSSS').toString();
        insert(datos, 6, rendCal);
        console.log("Operacion por de Temp: "+rendCal);
        
        // Insersion valor Máxima duración de evento debajo de temperatura mínima de operación Celda 18
        valueProm = validar(TiempoTemperatura); 
        const promTemp = Duration.fromMillis(valueProm).toFormat('hh:mm:ss.SSSS').toString();
        insert(datos, 7, promTemp);
        console.log("Max dur event: "+promTemp);
        
        //Celda 19 Temp prom 
        valTempProm = validar(tempProm);
        insert (datos, 8, valTempProm); 

        // dRendCalcMin Celda 20
        distanceTrips = RendCalcMin;
        const round = Math.round(distanceTrips, 2);
        datos[9] = round;

        // dRendCalcTotal Celda 21
        RendCalcTotal = 0;
        const round2 = Math.round(RendCalcTotal, 2);
        datos[10] = round2;

        // dRendCalcTotal Celda 22
        distanceTrips = RendCalcMax;
        const round3 = Math.round(distanceTrips, 2);
        datos[11] = round3;
        
        //Total de códigos de falla activos Celda 26
        const valTotalCod = validar(TotCodigosFalla);
        insert(datos, 15, valTotalCod);
        console.log("Total Codigos de falla Activos" + valTotalCod);

        // Duración total de los eventos de sobre revolución  Celda 31
        valEvRev = validar(RpmDurSobreRevolucion);
        const eventosRev = Duration.fromMillis(valEvRev).toFormat('hh:mm:ss').toString();
        insert(datos, 20, eventosRev);

        // Máximas RPM´s registradas Celda 32
        valMAXRPM = validar(RpmMaxRegistradas)
        insert(datos, 21, valMAXRPM);

        // Cantidad de eventos Ralentí >5 min Celda 33
        const valRalentiTemp =validar(iRalentiTiempo);
        insert(datos, 22, valRalentiTemp);
        console.log(valRalentiTemp);

        // Tiempo en ralentí (excedentes a 5min/evento)  Celda 34
        valRalentiSum = validar(iRalentiSumTiempo)
        const realentiSumT = Duration.fromMillis(valRalentiSum).toFormat('hh:mm:ss').toString();
        insert(datos, 23, realentiSumT);


        // Tiempo total de ralentí  // Celda 35
        valRalentiSumTotal = validar(iRalentiSumTotal)
        const realentiSumTot = Duration.fromMillis(valRalentiSumTotal).toFormat('hh:mm:ss').toString();
        insert(datos, 24, realentiSumTot);
    

        // Tiempo Ralenti UO --> Celda 36
        distanceTrips = iRalentiMaximoTiempo;
        valRalentiMaxT = validar(iRalentiMaximoTiempo)
       
        //const ralentiMaxTime = Duration.fromMillis(valRalentiMaxT).toFormat('hh:mm:ss').toString();
        insert(datos, 25, realentiSumT);

        // Duración total de los eventos de sobre revolución  Celda 31
        valEvRev = validar(RpmDurSobreRevolucion);
        const eventosRev2 = Duration.fromMillis(valEvRev).toFormat('hh:mm:ss').toString();
        insert(datos, 26, eventosRev2);

        // Tiempo Ralenti Fuera UO  --> Celda 38
         const dExcepcionRal = Duration.fromMillis((dExcepcionRalentiUODuracion !== null || dExcepcionRalentiUODuracion !== undefined ? dExcepcionRalentiUODuracion : 0)).toFormat('hh:mm:ss');
         insert(datos, 27, dExcepcionRal);
    
         // Tiempo en ralenti vs Tiempo de Operación  --> Celda 39
        valiRalentivsTiempoOperacion = validar(iRalentivsTiempoOperacion);
        //const realentiVsTiempo = Math.round(valiRalentivsTiempoOperacion, 2);
        insert(datos, 28, valiRalentivsTiempoOperacion);
        console.log("ralenti vs Tiempo de Operación" + valiRalentivsTiempoOperacion)
        
        
         // Tiempo de Manejo --> Celda 40
         const obj = validar(TiempoManejo);
         const TimeDriving = Duration.fromMillis(obj).toFormat('hh:mm:ss').toString();
         insert(datos, 29, TimeDriving);
        
         // Tiempo de Operación -- Celda 41
         const valorSuma = iRalentiSumTotal + TiempoManejo;
         const top = Duration.fromMillis(valorSuma).toFormat('hh:mm:ss');
         insert(datos, 30, top);
        
         /*
         
         const tiempoOpMilis = tiempoOperacion * 1000 
         console.log("tiempoOpMilis dd" + tiempoOpMilis )
          = Duration.fromMillis(tiempoOpMilis).toFormat('hh:mm:ss').toString();
         insert(datos, 30,TiempoMili);
        */
         

         // datos[31]
         // datos[31]

         valAcelera = validar(iAceleracionDuracion);
         const aceleracionDur = Duration.fromMillis(valAcelera).toFormat('hh:mm:ss').toString();
         insert(datos, 33, aceleracionDur);

         insert(datos, 34, iVelocidadPromedio);
         insert(datos, 35, iVelocidadMaxima);

    
         valCo2Generadokg = validar(dCo2Generadokg);
         const co2Gen = Math.round(valCo2Generadokg, 2);
         insert(datos, 36, co2Gen);

         valCo2Generadokm = validar(Co2GeneradoKgKm);
         const co2GenKm = Math.round(valCo2Generadokm, 2);
         insert(datos, 37, co2GenKm);

         distanceTrips = Co2GeneradoKgKm;

         if(!(distanceTrips !== null && distanceTrips !== undefined)) {
             if(dCalificacion !== null && distanceTrips !== undefined) {
                 valCalificacion = dCalificacion;
                 stringVal = valCalificacion + "";
             } else if(bValida) {
                valCalificacion = stringVal;
                stringVal = valCalificacion + "";
             } else{
                 stringVal = "NA";
             }
             
            } else {
                stringVal = "82.00";
            }

        insert(datos, 38, stringVal);
        insert(datos, 39, KmFinal);
        insert(datos, 40, iConsumoAcumuladoInicial);
        insert(datos, 41, iConsumoAcumuladoFinal);

        //Rendimiento ECM mínimo [km/L]
        insert(datos, 42, dRendEcmMin);
        //Rendimiento ECM promedio
        insert(datos, 43, dRendEcmProm);
        //Rendimiento ECM máximo
        insert(datos, 44, dRendEcmMax);
        //Rendimiento ECM total
        insert(datos, 45, dRendEcmTotal);

        let valPanicEvents = validar(iPanicoEventos);
        insert(datos, 46, valPanicEvents);
        
        let valPanicoMax = validar(iPanicoMaximaG);
        //const panicoMaxG = Math.round(valPanicoMax,2);
        insert(datos, 47, valPanicoMax); 

        let valEventosGiroBrusco = validar(iGiroBruscoEventos);
        insert(datos, 48, valEventosGiroBrusco);

        let valGiroBruscoMaxiGIzq = validar(iGiroBruscoMaxiGIzq);
        //const giroBruscoIzq = Math.round(valGiroBruscoMaxiGIzq,2);
        insert(datos, 49, valGiroBruscoMaxiGIzq);
    
        let valGiroBruscoMaxiGDer = validar(iGiroBruscoMaxiGDer);
        //const giroBrusco = Math.round(valGiroBruscoMaxiGDer,2);
        insert(datos, 50, valGiroBruscoMaxiGDer);
        
        let valAceleracionEvents = validar(iAceleracionEventos);
        insert(datos, 51, valAceleracionEvents);
             
        let valAceleracionMaximaG = validar(iAceleracionMaximaG);
        //const aceleracionMax = Math.round(valAceleracionMaximaG,2);
        insert(datos, 52, valAceleracionMaximaG);
        
        let datosXD = 0;
        let comunicando = 1;
        insert(datos, 53, datosXD);
        let fechaNew = Duration.fromMillis(datosXD).toFormat('hh:mm:ss').toString();
        insert(datos, 54, fechaNew);
        insert(datos, 55, comunicando);   
        
       datos[56] = " ";
       datos[57] = " ";

        

        console.log(datos);
        return ([economico, tipo, marca, modelo, year, noSerie, emplazamiento,date, week, can,  ...datos]) // spread 
    });

    return reportData

};

const insert = (array, i, item) =>  array.splice(i, 1, item);


const fillChildren = (group, groupsDict, levels = 2) => {
    if(levels > 1) {
      group.children = group.children.map(e => groupsDict[e.id]);
      group.children.forEach(e => fillChildren(e, groupsDict, levels - 1));
    }
};

const flatten = (group, levels = 2) => {
    if(levels >= 1) {
      return group.children.reduce((acc, e) => {
        return acc.concat(flatten(e, levels - 1));
      }, group.children);
    }
    return group.children;
  };

const generateXLSX = async (Ids, dtTo, dtFrom) => {
    const wb = await xlsx.fromFileAsync('docs/template.xlsx');
    const sheet1 = wb.sheet(0);
    const report = await getStatusKof(Ids, dtTo, dtFrom);
    if(report.length)
    sheet1.cell("A2").value(report);
    return wb.outputAsync();
}

const validar = valor => valor || 0;

module.exports = {
    generateXLSX,
}