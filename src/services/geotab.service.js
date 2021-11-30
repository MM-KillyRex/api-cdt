const GeotabHelper = require('../helpers/geotab.helper')
const {username, password, database, server, sessionId} = require('../environments/geotab.config');
const _ = require('lodash')

class GeotabService extends GeotabHelper {
  constructor() {
    super({username, password, database, server, sessionId})
  }


              // Groups Request
            async getGroups() {
                try {
                  const api = await super.getApi()
                  const groups = await api.callAsync('Get', {
                    typeName: 'Group'
                  })
                  return groups
                } catch (err) {
                  throw err
                }
              }

              // Devices Request
            async getDevices() {
                try {
                  const api = await super.getApi()
                  const devices = await api.callAsync('Get', {
                    typeName: 'Device'
                  })
                  return devices
                } catch (err) {
                  throw err
                }
              }
              
              // Rules Request
            async getRules() {
                try {
                  const api = await super.getApi()
                  const devices = await api.callAsync('Get', {
                    typeName: 'Rule'
                  })
                  return devices
                } catch (err) {
                  throw err
                }
              }
}

//module.exports = new GeotabService(username, password, database, server, sessionId);

module.exports = new GeotabService();