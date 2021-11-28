const { sequelize, Sequelize } = require('../helpers/db.helper')

module.exports = async function(query, replacements, oneRecord) {
    try {
        const result = await sequelize.query(query, {
            replacements,
            type: Sequelize.QueryTypes.SELECT,
            raw: true,
            plain: oneRecord,
        })

        return result
    } catch (ex) {
        throw ex
    }
}