const moment = require('moment-timezone');
const geotabService = require('../services/geotab.service')

const { queryService } = require('../services/query.service') 

const listDevices = []; 
const listGroups = []; 
const listRules = []; 


class QueryClass {
 
 async getReportKof(req, res, next) {
    try {
      const result = await queryService.getReport();
      //const { sUser ,dtInicio, dtFin, lstVin, sNavegador} = req.body;
        
      //Obtener fecha real con utc format
      moment.locale('es');
      const realTime = moment.utc(dateTime || datetime);
      const date = realTime.tz('America/Mexico_City').format('LLLL z(Z)');
      const actYear = realTime.tz('America/Mexico_City').format('YYYY');
      // API aPI = clsMetrica.login("Kof");
      // api mygeotab keys 
      // Api multicall
      const  groups = await geotabService.getGroups();
      const  devices = await geotabService.getDevices();
      const  rules = await geotabService.getRules();
      
      listDevices.push(devices);
      listGroups.push(groups);  
      listRules.push(rules);  

      console.log(listDevices)

      //crear validator para el req
      const initialDate = new Date(req.dtInicio);
      const finishDate = new Date(req.dtFin);
        
      


      res.status(200).json(result);
    } catch (error){
        next(error);
    }

    }

}

/*
const query = (req.query) => () {
		
    public async Task<HttpResponseMessage> Consulta(dynamic Request)
    {
        HttpResponseMessage request;
        dynamic obj;
        dynamic request1;
        dynamic obj1;
        try
        {
            LogSabana logSabana = new LogSabana();
            LogSabana logSabana1 = logSabana;
            if (Request.sUser == (dynamic)null)
            {
                obj = "Sin Usuario";
            }
            else
            {
                obj = Request.sUser.ToString();
            }
            logSabana1.SUsuario = (string)obj;

            // log para obtener quien consulta que cosa
            // consultar la api de geotab
            string str = string.Concat("Usuario : ", logSabana.SUsuario);
            KOFController.aLog.Add(str);
            DateTime now = DateTime.Now;
            KOFController.dtInicioPrograma = DateTime.Now;
            str = string.Concat("Peticiones iniciales (reglas,dispostivos,grupos,excepciones) | Inicio : ", now.ToString("yyyy-MM-dd hh:mm:ss"));
            API aPI = clsMetrica.login("Kof");
            object[] objArray = new object[3];


            object[] objArray1 = new object[] { "Get", typeof(Group), typeof(List<Group>) };
            objArray[0] = objArray1;
            object[] objArray2 = new object[] { "Get", typeof(Device), typeof(List<Device>) };
            objArray[1] = objArray2;
            object[] objArray3 = new object[] { "Get", typeof(Rule), typeof(List<Rule>) };
            objArray[2] = objArray3;


            List<object> objs = aPI.MultiCall(objArray);
            List<Group> item = (List<Group>)objs[0];
            List<Device> devices = (List<Device>)objs[1];
            logSabana.DtFechaConsulta = DateTime.Now;
            DateTime dateTime = (DateTime)typeof(Convert).ToDateTime(Request.dtInicio);
            DateTime dateTime1 = (DateTime)typeof(Convert).ToDateTime(Request.dtFin).AddSeconds(59);
            logSabana.DtInicio = dateTime;
            logSabana.DtFin = dateTime1;
            List<string> strs = ((JArray)Request.lstVin).ToObject<List<string>>();
            logSabana.SConsulta = string.Join(",", strs);
            LogSabana logSabana2 = logSabana;
            if (Request.sUser == (dynamic)null)
            {
                request1 = "Sin Usuario";
            }
            else
            {
                request1 = Request.sUser.ToString();
            }
            logSabana2.SUsuario = (string)request1;
            LogSabana logSabana3 = logSabana;
            if (Request.sNavegador == (dynamic)null)
            {
                obj1 = "Sin Navegador";
            }
            else
            {
                obj1 = Request.sNavegador.ToString();
            }
            logSabana3.Navegador = (string)obj1;
            object[] totalSeconds = new object[] { str, " | DtFin:", null, null, null };
            DateTime now1 = DateTime.Now;
            totalSeconds[2] = now1.ToString("yyyy-MM-dd hh:mm:ss");
            totalSeconds[3] = " | Duracion Total (segundos) : ";
            TimeSpan timeSpan = DateTime.Now - now;
            totalSeconds[4] = timeSpan.TotalSeconds;
            str = string.Concat(totalSeconds);
            KOFController.aLog.Add(str);
            using (MyDbContext myDbContext = new MyDbContext())
            {
                now = DateTime.Now;
                str = string.Concat("Peticiones a Hostgator (Peridio Actual,Periodo Anterior) | Inicio :", now.ToString("yyyy-MM-dd hh:mm:ss"), " | ");
                DbSet<UltimaComunicacion> ultimaComunicacions = myDbContext.UltimaComunicacions;
                List<UltimaComunicacion> list = (
                    from x in ultimaComunicacions
                    where strs.Contains(x.IdUnidad) && (x.DtDia >= dateTime) && (x.DtDia <= dateTime1)
                    select x).ToList<UltimaComunicacion>();
                List<SpReporteDiarioNaReturnModel> spReporteDiarioNaReturnModels = myDbContext.SpReporteDiarioNa(string.Join(",", strs), new DateTime?(dateTime), new DateTime?(dateTime1));
                logSabana.IRegistros = spReporteDiarioNaReturnModels.Count;
                myDbContext.LogConsulta(logSabana.SUsuario, logSabana.SConsulta, new DateTime?(logSabana.DtInicio), new DateTime?(logSabana.DtFin), new DateTime?(DateTime.Now), logSabana.Navegador, logSabana.MensajeError, new int?(logSabana.IRegistros));
                object[] str1 = new object[] { str, " | DtFin:", null, null, null };
                now1 = DateTime.Now;
                str1[2] = now1.ToString("yyyy-MM-dd hh:mm:ss");
                str1[3] = " | Duracion Total (segundos) : ";
                timeSpan = DateTime.Now - now;
                str1[4] = timeSpan.TotalSeconds;
                str = string.Concat(str1);
                KOFController.aLog.Add(str);
                now = DateTime.Now;
                str = string.Concat("Procesamiento de datos y calculos | Inicio :", now.ToString("yyyy-MM-dd hh:mm:ss"), " | ");
                List<KofSabana> kofSabanas = new List<KofSabana>();
                foreach (Device device in devices)
                {
                    KofSabana kofSabana = new KofSabana()
                    {
                        Id = device.Id.ToString(),
                        SNoSerial = device.SerialNumber
                    };
                    kofSabanas.Add(this.grupos(item, device, kofSabana));
                }
                request = KOFController.generarReporte(spReporteDiarioNaReturnModels, dateTime, dateTime1, logSabana.SUsuario, kofSabanas, list);
            }
        }
        catch (Exception exception)
        {
            request = (HttpResponseMessage)Request.CreateResponse(400, exception.Message);
        }
        return request;
    }

}
*/

module.exports = new QueryClass();
