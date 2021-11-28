const GeotabHelper = require('../helpers/geotab.helper')
const GeotabConfig = require('../environments/geotab.config');
const _ = require('lodash')

class GeotabService extends GeotabHelper {
  constructor(username, password, database, server, sessionId) {
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

//module.exports = new GeotabService(GeotabConfig);

module.exports = new GeotabService('integration.kof-c5', 'zD3Y)nkp70ikiU', 'kof', 'https://my182.geotab.com/', 'wwqeqweqweqweqw');