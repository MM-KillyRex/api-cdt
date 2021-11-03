const { datos, generateTitles } = require('./reports.service')

const getData = async() => {
    await generateTitles();
    console.log(datos[0]);
}



module.exports = {
    getData,
    datos
}

function generarReporte(LstData, LstDatosDevice, LstUltCom) {
    Now;
    DateT;
    value;
    TimeSp = new TimeSpan.TimeSpan();
    UltimaComunicacion;
    ResponseMessage;
    Num;
    Num1;
    Num2;
    Num3;
    Num4;
    Num5;
    Num6;
    value1;
    value2;
    value3;
    value4;
    value5;
    value6;
    value7;
    Str;
    try {
        ObjArrays;
        lstData.foreach(lstDatum => {
            // KofSabana kofSabana = (
            //     from x in lstDatosDevices
            //     where x.Id.ToString() == lstDatum.sId
            //     select x.FirstOrDefault<KofSabana>();
            // UltimaComunicacion ultimaComunicacion = (
            //     from x in lstUltCom
            //     where x.IdUnidad == lstDatum.sId
            //     select x).FirstOrDefault<UltimaComunicacion>();
            Num7 = 1;
            TimeSp = timespan.FromDays(2);


            //checar la ultima comunicacion del device
            if (UltimaComunicacion != null) {

                //ultima comunicacion de GPS
                Num7 = ((lstDatum.dtFecha - UltimaComunicacion.DtGps) >= TimeSp ? 0 : 1);

                if (Num7 == 0) {

                    //ultima comunicacion de server
                    Num7 = ((lstDatum.dtFecha - UltimaComunicacion.DtServer) >= TimeSp ? 0 : 1);
                }
            }

            //llena los datos de kilometraje
            DistaciaTrips = lstDatum.iKilometrajeRecorrido;

            if (DistaciaTrips <= 0) {
                SpReporteDiario = lstDatum;
                DistaciaTrips = lstDatum.Distacia_Trips;
                SpReporteDiario.Distacia_Trips = (DistaciaTrips = undefined ? 0 : lstDatum.Distacia_Trips);
                lstDatum.iKilometrajeInicial = 0;
                lstDatum.iKilometrajeFinal = lstDatum.Distacia_Trips;
                lstDatum.iKilometrajeRecorrido = lstDatum.Distacia_Trips;
            }


            if ((lstDatum.iHoras_Motor != undefined || lstDatum.iHoras_Motor <= 0) && lstDatum.iTiempo_Manejo != undefined) {
                DistaciaTrips = lstDatum.iRalentiSumTotal;
                if (DistaciaTrips != undefined) {
                    Nullable = lstDatum;
                    value8 = lstDatum.iTiempo_Manejo;
                    DistaciaTrips = lstDatum.iRalentiSumTotal;
                    now = timespan.FromMilliseconds(value8 + DistaciaTrips);
                    Nullable.iHoras_Motor = now.TotalSeconds;
                }
            }
            distanciaTrips = lstDatum.iKilometrajeRecorridos;
            num8 = distanciaTrips.Value;
            distanciaTrips = lstDatum.iLitrosConsumidos;
            Math.round(num8 / distanciaTrips, 2);
            if (Kofsabana == null) {
                continue;
            }
            SEconomico;
            sEconomico[0] = kofSabana.SEconomico;
            sEconomico[1] = kofSabana.STipo;
            sEconomico[2] = kofSabana.SMarca;
            sEconomico[3] = kofSabana.SModelo;
            sEconomico[4] = kofSabana.SAño;
            sEconomico[5] = kofSabana.SNoSerial;
            sEconomico[6] = kofSabana.SEmplazamiento;
            dateTime = lstDatum.dtFecha;
            sEconomico[7] = dateTime.ToString("yyyy/MM/dd");
            sEconomico[8] = KOFController.SemanaDelMes(lstDatum.dtFecha);
            sEconomico[9] = "";
            sEconomico[10] = lstDatum.iKilometrajeInicial;
            sEconomico[11] = lstDatum.iKilometrajeRecorridos;
            sEconomico[12] = lstDatum.iLitrosConsumidos;
            sEconomico[13] = lstDatum.iEventosCalentamiento;
            sEconomico[14] = lstDatum.iMaximaTemp;
            distanciaTrips = lstDatum.iMaximaTempDuracion;

            if (distanciaTrips !== null || distanciaTrips !== undefined) {
                distanciaTrips = lstDatum.iMaximaTempDuracion;
                num = distanciaTrips;
            } else {
                num = 0;
            }
            sEconomico[15] = TimeSpan.FromMilliseconds(num);
            distanciaTrips = lstDatum.iTiempo_Temperatura;
            if (distanciaTrips !== null || distanciaTrips !== undefined) {
                distanciaTrips = lstDatum.iTiempo_Temperatura;
                value1 = distanciaTrips.Value;
            } else {
                value1 = 0;
            }
            sEconomico[16] = TimeSpan.FromMilliseconds(value1);
            distanciaTrips = lstDatum.iMinimaTempDuracion;
            if (distanciaTrips !== null || distanciaTrips !== undefined) {
                distanciaTrips = lstDatum.iMinimaTempDuracion;
                num1 = distanciaTrips.Value;
            } else {
                num1 = 0;
            }
            sEconomico[17] = TimeSpan.FromMilliseconds(num1);
            distanciaTrips = lstDatum.iPromTemp;
            sEconomico[18] = distanciaTrips.Value;
            distanciaTrips = lstDatum.dRendCalcMin;
            sEconomico[19] = Math.Round(distanciaTrips.Value, 2);
            distanciaTrips = lstDatum.dRednCalcTotal;
            sEconomico[20] = Math.Round(distanciaTrips.Value, 2);
            distanciaTrips = lstDatum.dRendCalcMax;
            sEconomico[21] = Math.Round(distanciaTrips.Value, 2);
            sEconomico[22] = lstDatum.iTotalEventosComb;
            sEconomico[23] = lstDatum.iSum_evt_Combustible;
            sEconomico[24] = lstDatum.iTotalCodFalla;
            sEconomico[25] = lstDatum.iTotalCodFallaActivos;
            sEconomico[26] = lstDatum.sCodigoInactivMayFrec;
            sEconomico[27] = lstDatum.iTotalCodFallaInactivos;
            sEconomico[28] = lstDatum.sCodigoInactivMayFrec;
            sEconomico[29] = lstDatum.iRpmSobreRevolucion;
            distanciaTrips = lstDatum.iRpmDurSobreRevolucion;
            if (distanciaTrips !== null || distanciaTrips !== undefined) {
                distanciaTrips = lstDatum.iRpmDurSobreRevolucion;
                value2 = distanciaTrips.Value;
            } else {
                value2 = 0;
            }
            sEconomico[30] = TimeSpan.FromMilliseconds(value2);
            distanciaTrips = lstDatum.iRpmMAxRegistradas;
            sEconomico[31] = distanciaTrips.Value;
            sEconomico[32] = lstDatum.iRalentiTiempo;
            distanciaTrips = lstDatum.iRalentiSumTiempo;
            if (distanciaTrips !== null || distanciaTrips !== undefined) {
                distanciaTrips = lstDatum.iRalentiSumTiempo;
                num2 = distanciaTrips.Value;
            } else {
                num2 = 0;
            }
            sEconomico[33] = TimeSpan.FromMilliseconds(num2);
            distanciaTrips = lstDatum.iRalentiSumTotal;
            if (distanciaTrips !== null || distanciaTrips !== undefined) {
                distanciaTrips = lstDatum.iRalentiSumTotal;
                value3 = distanciaTrips.Value;
            } else {
                value3 = 0;
            }
            sEconomico[34] = TimeSpan.FromMilliseconds(value3);
            distanciaTrips = lstDatum.iRalentiMaximoTiempo;
            if (distanciaTrips !== null || distanciaTrips !== undefined) {
                distanciaTrips = lstDatum.iRalentiMaximoTiempo;
                num3 = distanciaTrips.Value;
            } else {
                num3 = 0;
            }
            sEconomico[35] = TimeSpan.FromMilliseconds(num3);
            sEconomico[36] = TimeSpan.FromMilliseconds(((lstDatum.dExcepcionRalentiUODuracion !== null || lstDatum.dExcepcionRalentiUODuracion !== undefined) ? lstDatum.dExcepcionRalentiUODuracion.Value : 0));
            distanciaTrips = lstDatum.iRalentivsTiempoOperacion;
            if (distanciaTrips !== null || distanciaTrips !== undefined) {
                distanciaTrips = lstDatum.iRalentivsTiempoOperacion;
                value4 = distanciaTrips.Value;
            } else {
                value4 = 0;
            }
            sEconomico[37] = Math.Round(value4, 2);
            if (lstDatum.iTiempo_Manejo !== null || lstDatum.iTiempo_Manejo !== undefined) {
                obj = lstDatum.iTiempo_Manejo.Value;
            } else {
                obj = null;
            }
            sEconomico[38] = TimeSpan.FromMilliseconds(obj);
            sEconomico[39] = TimeSpan.FromSeconds(((lstDatum.iHoras_Motor !== null || lstDatum.iHoras_Motor !== undefined) ? lstDatum.iHoras_Motor.Value : 0));
            sEconomico[40] = lstDatum.iRalentiLitrosConsumidos;
            sEconomico[41] = lstDatum.iAceleradorEventos;
            distanciaTrips = lstDatum.iAceleracionDuracion;
            sEconomico[42] = TimeSpan.FromMilliseconds(distanciaTrips.Value);
            distanciaTrips = lstDatum.iVelocidadPromedio;
            sEconomico[43] = distanciaTrips.Value;
            sEconomico[44] = lstDatum.iVelocidadMaxima;
            distanciaTrips = lstDatum.dCo2Generadokg;
            if (distanciaTrips !== null || distanciaTrips !== undefined) {
                distanciaTrips = lstDatum.dCo2Generadokg;
                num4 = distanciaTrips.Value;
            } else {
                num4 = 0;
            }
            sEconomico[45] = Math.Round(num4, 2);
            distanciaTrips = lstDatum.iCo2GeneradoKgKm;
            if (distanciaTrips !== null || distanciaTrips !== undefined) {
                distanciaTrips = lstDatum.iCo2GeneradoKgKm;
                value5 = distanciaTrips.Value;
            } else {
                value5 = 0;
            }
            sEconomico[46] = Math.Round(value5, 2);
            if (!(distanciaTrips !== null || distanciaTrips !== undefined)) {
                if (lstDatum.dCalificacion !== null || lstDatum.dCalificacion !== undefined) {
                    value = lstDatum.dCalificacion.Value;
                    str = value.ToString();
                } else {
                    str = "100";
                }
            } else if (lstDatum.bValida.Value) {
                value = lstDatum.dCalificacion.Value;
                str = value.ToString();
            } else {
                str = "NA";
            }
            sEconomico[47] = str;
            sEconomico[48] = lstDatum.iKilometrajeFinal;
            sEconomico[49] = lstDatum.iConsumoAcumuladoInicial;
            sEconomico[50] = lstDatum.iConsumoAcumuladoFinal;
            sEconomico[51] = lstDatum.dRendEcmMin;
            sEconomico[52] = lstDatum.dRendEcmProm;
            sEconomico[53] = lstDatum.dRendEcmMax;
            sEconomico[54] = lstDatum.dRendEcmTotal;
            sEconomico[55] = lstDatum.iPanicoEventos;
            distanciaTrips = lstDatum.iPanicoMaximaG;
            if (distanciaTrips !== null || distanciaTrips !== undefined) {
                distanciaTrips = lstDatum.iPanicoMaximaG;
                num5 = distanciaTrips.Value;
            } else {
                num5 = 0;
            }
            sEconomico[56] = Math.Round(num5, 2);
            sEconomico[57] = lstDatum.iGiroBruscoEventos;
            distanciaTrips = lstDatum.iGiroBruscoMaxiGIzq;
            if (distanciaTrips !== null || distanciaTrips !== undefined) {
                distanciaTrips = lstDatum.iGiroBruscoMaxiGIzq;
                value6 = distanciaTrips.Value;
            } else {
                value6 = 0;
            }
            sEconomico[58] = Math.Round(value6, 2);
            distanciaTrips = lstDatum.iGiroBruscoMaxGDer;
            if (distanciaTrips !== null || distanciaTrips !== undefined) {
                distanciaTrips = lstDatum.iGiroBruscoMaxGDer;
                num6 = distanciaTrips.Value;
            } else {
                num6 = 0;
            }
            sEconomico[59] = Math.Round(num6, 2);
            sEconomico[60] = lstDatum.iAceleracionEventos;
            distanciaTrips = lstDatum.iAceleracionMaximaG;
            if (distanciaTrips !== null || distanciaTrips !== undefined) {
                distanciaTrips = lstDatum.iAceleracionMaximaG;
                value7 = distanciaTrips.Value;
            } else {
                value7 = 0;
            }
            sEconomico[61] = Math.Round(value7, 2);
            sEconomico[62] = 0;
            sEconomico[63] = new TimeSpan(0);
            sEconomico[64] = num7;
            objArrays.Add(sEconomico);
        })

        return objArrays;
    }
    //catch si falla 
    catch (exception) {
        throw exception;
    }
}