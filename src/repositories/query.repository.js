const queryGen = require('../utils/queryGenerator');

// Obtener el reporte de la base de datos
const getReportKof = async ({ sIds, dtFrom, dtTo }) => {
  const query = `select public.SP_ReporteDiario_NA(:sIds, :dtFrom, :dtTo);`;
  const result = await queryGen(
    query,
    {
      sIds, 
      dtFrom, 
      dtTo
    },
    true
  );
  return Object.values(result)[0];
};

// Consultar  los reportes
const insertReportKof = async () => {
  const query = `select public.exceptionEvent_select_fn();`;

  const result = await queryGen(query, {}, true);
  return Object.values(result)[0];
};



module.exports = {
  getReportKof,
  insertReportKof,
};