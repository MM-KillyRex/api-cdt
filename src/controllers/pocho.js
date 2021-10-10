private static HttpResponseMessage generarReporte(List<SpReporteDiarioNaReturnModel> lstData, DateTime dtInicio, DateTime dtFin, string sContacto, List<KofSabana> lstDatosDevices, List<UltimaComunicacion> lstUltCom)
{
    TimeSpan now;
    DateTime dateTime;
    decimal value;
    HttpResponseMessage httpResponseMessage;
    double num;
    double value1;
    double num1;
    double value2;
    double num2;
    double value3;
    double num3;
    double value4;
    object obj;
    double num4;
    double value5;
    object str;
    double num5;
    double value6;
    double num6;
    double value7;
    try
    {
        DateTime now1 = DateTime.Now;
        string str1 = string.Concat("Creacion del excel | Inicio :", now1.ToString("yyyy-MM-dd hh:mm:ss"), " | ");
        XLWorkbook xLWorkbook = new XLWorkbook(Assembly.GetExecutingAssembly().GetManifestResourceStream("APIKOF.Resources.fsabana.xlsx"));
        IXLWorksheet xLWorksheet = xLWorkbook.Worksheet("Hoja1");
        List<object[]> objArrays = new List<object[]>();
        foreach (SpReporteDiarioNaReturnModel lstDatum in lstData)
        {
            KofSabana kofSabana = (
                from x in lstDatosDevices
                where x.Id.ToString() == lstDatum.sId
                select x.FirstOrDefault<KofSabana>();
            UltimaComunicacion ultimaComunicacion = (
                from x in lstUltCom
                where x.IdUnidad == lstDatum.sId
            
                select x).FirstOrDefault<UltimaComunicacion>();
            int num7 = 1;
            TimeSpan timeSpan = TimeSpan.FromDays(2);
            if (ultimaComunicacion != null)
            {
                // checar si aun esta comunicando el device
                num7 = ((lstDatum.dtFecha - ultimaComunicacion.DtGps) >= timeSpan ? 0 : 1);
                if (num7 == 0)
                {
                    num7 = ((lstDatum.dtFecha - ultimaComunicacion.DtServer) >= timeSpan ? 0 : 1);
                }
            }
            double? distanciaTrips = lstDatum.iKilometrajeRecorridos;
            if ((distanciaTrips.GetValueOrDefault() <= 0 ? distanciaTrips.HasValue : false))
            {
                SpReporteDiarioNaReturnModel spReporteDiarioNaReturnModel = lstDatum;
                distanciaTrips = lstDatum.Distancia_Trips;
                spReporteDiarioNaReturnModel.Distancia_Trips = (!distanciaTrips.HasValue ? new double?(0) : lstDatum.Distancia_Trips);
                lstDatum.iKilometrajeInicial = new double?(0);
                lstDatum.iKilometrajeFinal = lstDatum.Distancia_Trips;
                lstDatum.iKilometrajeRecorridos = lstDatum.Distancia_Trips;
            }
            if ((!lstDatum.iHoras_Motor.HasValue || lstDatum.iHoras_Motor.Value <= (long)0) && lstDatum.iTiempo_Manejo.HasValue)
            {
                distanciaTrips = lstDatum.iRalentiSumTotal;
                if (distanciaTrips.HasValue)
                {
                    SpReporteDiarioNaReturnModel nullable = lstDatum;
                    double value8 = (double)lstDatum.iTiempo_Manejo.Value;
                    distanciaTrips = lstDatum.iRalentiSumTotal;
                    now = TimeSpan.FromMilliseconds(value8 + distanciaTrips.Value);
                    nullable.iHoras_Motor = new long?((long)now.TotalSeconds);
                }
            }
            distanciaTrips = lstDatum.iKilometrajeRecorridos;
            double num8 = (double)distanciaTrips.Value;
            distanciaTrips = lstDatum.iLitrosConsumidos;
            Math.Round(num8 / (double)distanciaTrips.Value, 2);
            if (kofSabana == null)
            {
                continue;
            }
            List<object[]> objArrays1 = objArrays;
            object[] sEconomico = new object[65];
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
            if (distanciaTrips.HasValue)
            {
                distanciaTrips = lstDatum.iMaximaTempDuracion;
                num = distanciaTrips.Value;
            }
            else
            {
                num = 0;
            }
            sEconomico[15] = TimeSpan.FromMilliseconds(num);
            distanciaTrips = lstDatum.iTiempo_Temperatura;
            if (distanciaTrips.HasValue)
            {
                distanciaTrips = lstDatum.iTiempo_Temperatura;
                value1 = distanciaTrips.Value;
            }
            else
            {
                value1 = 0;
            }
            sEconomico[16] = TimeSpan.FromMilliseconds(value1);
            distanciaTrips = lstDatum.iMinimaTempDuracion;
            if (distanciaTrips.HasValue)
            {
                distanciaTrips = lstDatum.iMinimaTempDuracion;
                num1 = distanciaTrips.Value;
            }
            else
            {
                num1 = 0;
            }
            sEconomico[17] = TimeSpan.FromMilliseconds(num1);
            distanciaTrips = lstDatum.iPromTemp;
            sEconomico[18] = (int)distanciaTrips.Value;
            distanciaTrips = lstDatum.dRendCalcMin;
            sEconomico[19] = Math.Round((double)distanciaTrips.Value, 2);
            distanciaTrips = lstDatum.dRednCalcTotal;
            sEconomico[20] = Math.Round((double)distanciaTrips.Value, 2);
            distanciaTrips = lstDatum.dRendCalcMax;
            sEconomico[21] = Math.Round((double)distanciaTrips.Value, 2);
            sEconomico[22] = lstDatum.iTotalEventosComb;
            sEconomico[23] = lstDatum.iSum_evt_Combustible;
            sEconomico[24] = lstDatum.iTotalCodFalla;
            sEconomico[25] = lstDatum.iTotalCodFallaActivos;
            sEconomico[26] = lstDatum.sCodigoInactivMayFrec;
            sEconomico[27] = lstDatum.iTotalCodFallaInactivos;
            sEconomico[28] = lstDatum.sCodigoInactivMayFrec;
            sEconomico[29] = lstDatum.iRpmSobreRevolucion;
            distanciaTrips = lstDatum.iRpmDurSobreRevolucion;
            if (distanciaTrips.HasValue)
            {
                distanciaTrips = lstDatum.iRpmDurSobreRevolucion;
                value2 = distanciaTrips.Value;
            }
            else
            {
                value2 = 0;
            }
            sEconomico[30] = TimeSpan.FromMilliseconds(value2);
            distanciaTrips = lstDatum.iRpmMAxRegistradas;
            sEconomico[31] = (int)distanciaTrips.Value;
            sEconomico[32] = lstDatum.iRalentiTiempo;
            distanciaTrips = lstDatum.iRalentiSumTiempo;
            if (distanciaTrips.HasValue)
            {
                distanciaTrips = lstDatum.iRalentiSumTiempo;
                num2 = distanciaTrips.Value;
            }
            else
            {
                num2 = 0;
            }
            sEconomico[33] = TimeSpan.FromMilliseconds(num2);
            distanciaTrips = lstDatum.iRalentiSumTotal;
            if (distanciaTrips.HasValue)
            {
                distanciaTrips = lstDatum.iRalentiSumTotal;
                value3 = distanciaTrips.Value;
            }
            else
            {
                value3 = 0;
            }
            sEconomico[34] = TimeSpan.FromMilliseconds(value3);
            distanciaTrips = lstDatum.iRalentiMaximoTiempo;
            if (distanciaTrips.HasValue)
            {
                distanciaTrips = lstDatum.iRalentiMaximoTiempo;
                num3 = distanciaTrips.Value;
            }
            else
            {
                num3 = 0;
            }
            sEconomico[35] = TimeSpan.FromMilliseconds(num3);
            sEconomico[36] = TimeSpan.FromMilliseconds((double)((lstDatum.dExcepcionRalentiUODuracion.HasValue ? lstDatum.dExcepcionRalentiUODuracion.Value : (long)0)));
            distanciaTrips = lstDatum.iRalentivsTiempoOperacion;
            if (distanciaTrips.HasValue)
            {
                distanciaTrips = lstDatum.iRalentivsTiempoOperacion;
                value4 = distanciaTrips.Value;
            }
            else
            {
                value4 = 0;
            }
            sEconomico[37] = Math.Round(value4, 2);
            if (lstDatum.iTiempo_Manejo.HasValue)
            {
                obj = lstDatum.iTiempo_Manejo.Value;
            }
            else
            {
                obj = null;
            }
            sEconomico[38] = TimeSpan.FromMilliseconds((double)obj);
            sEconomico[39] = TimeSpan.FromSeconds((double)((lstDatum.iHoras_Motor.HasValue ? lstDatum.iHoras_Motor.Value : (long)0)));
            sEconomico[40] = lstDatum.iRalentiLitrosConsumidos;
            sEconomico[41] = lstDatum.iAceleradorEventos;
            distanciaTrips = lstDatum.iAceleracionDuracion;
            sEconomico[42] = TimeSpan.FromMilliseconds((double)distanciaTrips.Value);
            distanciaTrips = lstDatum.iVelocidadPromedio;
            sEconomico[43] = (int)distanciaTrips.Value;
            sEconomico[44] = lstDatum.iVelocidadMaxima;
            distanciaTrips = lstDatum.dCo2Generadokg;
            if (distanciaTrips.HasValue)
            {
                distanciaTrips = lstDatum.dCo2Generadokg;
                num4 = distanciaTrips.Value;
            }
            else
            {
                num4 = 0;
            }
            sEconomico[45] = Math.Round(num4, 2);
            distanciaTrips = lstDatum.iCo2GeneradoKgKm;
            if (distanciaTrips.HasValue)
            {
                distanciaTrips = lstDatum.iCo2GeneradoKgKm;
                value5 = distanciaTrips.Value;
            }
            else
            {
                value5 = 0;
            }
            sEconomico[46] = Math.Round(value5, 2);
            if (!lstDatum.bValida.HasValue)
            {
                if (lstDatum.dCalificacion.HasValue)
                {
                    value = lstDatum.dCalificacion.Value;
                    str = value.ToString();
                }
                else
                {
                    str = "100";
                }
            }
            else if (lstDatum.bValida.Value)
            {
                value = lstDatum.dCalificacion.Value;
                str = value.ToString();
            }
            else
            {
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
            if (distanciaTrips.HasValue)
            {
                distanciaTrips = lstDatum.iPanicoMaximaG;
                num5 = distanciaTrips.Value;
            }
            else
            {
                num5 = 0;
            }
            sEconomico[56] = Math.Round(num5, 2);
            sEconomico[57] = lstDatum.iGiroBruscoEventos;
            distanciaTrips = lstDatum.iGiroBruscoMaxiGIzq;
            if (distanciaTrips.HasValue)
            {
                distanciaTrips = lstDatum.iGiroBruscoMaxiGIzq;
                value6 = distanciaTrips.Value;
            }
            else
            {
                value6 = 0;
            }
            sEconomico[58] = Math.Round(value6, 2);
            distanciaTrips = lstDatum.iGiroBruscoMaxGDer;
            if (distanciaTrips.HasValue)
            {
                distanciaTrips = lstDatum.iGiroBruscoMaxGDer;
                num6 = distanciaTrips.Value;
            }
            else
            {
                num6 = 0;
            }
            sEconomico[59] = Math.Round(num6, 2);
            sEconomico[60] = lstDatum.iAceleracionEventos;
            distanciaTrips = lstDatum.iAceleracionMaximaG;
            if (distanciaTrips.HasValue)
            {
                distanciaTrips = lstDatum.iAceleracionMaximaG;
                value7 = distanciaTrips.Value;
            }
            else
            {
                value7 = 0;
            }
            sEconomico[61] = Math.Round(value7, 2);
            sEconomico[62] = 0;
            sEconomico[63] = new TimeSpan((long)0);
            sEconomico[64] = num7;
            objArrays1.Add(sEconomico);
        }
        int num9 = 20000;
        int num10 = 0;
        int num11 = 0;
        while (num10 < objArrays.Count)
        {
            xLWorksheet.Cell(2 + num10, 1).InsertData(objArrays.Take<object[]>(num9).Skip<object[]>(num10));
            num10 += num9;
            num11++;
        }
        MemoryStream memoryStream = new MemoryStream();
        xLWorkbook.SaveAs(memoryStream);
        HttpResponseMessage streamContent = new HttpResponseMessage()
        {
            StatusCode = HttpStatusCode.OK
        };
        memoryStream.Position = (long)0;
        MemoryStream memoryStream1 = new MemoryStream();
        xLWorkbook.SaveAs(memoryStream1);
        memoryStream1.Position = (long)0;
        KOFController.sendEmail(sContacto, "Sabana", "Reporte Sabana", memoryStream, false);
        streamContent.Content = new StreamContent(memoryStream1);
        streamContent.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        streamContent.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
        {
            FileName = "Reporte.xlsx"
        };
        object[] totalSeconds = new object[] { str1, " | DtFin:", null, null, null };
        dateTime = DateTime.Now;
        totalSeconds[2] = dateTime.ToString("yyyy-MM-dd hh:mm:ss");
        totalSeconds[3] = " | Duracion Total (segundos) : ";
        now = DateTime.Now - now1;
        totalSeconds[4] = now.TotalSeconds;
        str1 = string.Concat(totalSeconds);
        KOFController.aLog.Add(str1);
        List<string> strs = KOFController.aLog;
        object[] objArray = new object[] { "******Inicio de la peticion : ", KOFController.dtInicioPrograma.ToString("yyyy-MM-dd hh:mm:ss"), " | Fin de la peticion : ", null, null, null, null };
        dateTime = DateTime.Now;
        objArray[3] = dateTime.ToString("yyyy-MM-dd hh:mm:ss");
        objArray[4] = " Duracion Total (segundos) : ";
        now = DateTime.Now - KOFController.dtInicioPrograma;
        objArray[5] = now.TotalSeconds;
        objArray[6] = "    **********";
        strs.Add(string.Concat(objArray));
        KOFController.aLog.Add("                                                                                                            ");
        httpResponseMessage = streamContent;
    }
    catch (Exception exception)
    {
        throw exception;
    }
    return httpResponseMessage;
}



const express = require('express');

const ReportsService = require('../../services/reportsService');

const validationHandler = require('../../utils/middleware/validationHandler');
const drivingMiddleware = require('../../utils/middleware/driving.middleware');

const keyHandler = require('../../utils/middleware/keyHandler');



module.exports = reportsApi;