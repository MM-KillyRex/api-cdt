const queryGen = require('../utils/queryGenerator');

// Obtener el reporte de la base de datos
const getReportKof = async ({ sIds, dtFrom, dtTo }) => {
  const query = `EXEC SP_ReporteDiario_NA :sIds, :dtFrom, :dtTo`;
  const result = await queryGen(
    query,
    {
      sIds, 
      dtFrom, 
      dtTo
    },
    true
  );
  return result;
};

module.exports = {
  getReportKof,
};