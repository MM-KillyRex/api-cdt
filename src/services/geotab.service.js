
const geotabAPI = require('../helpers/geotab.helper');

const getGroups = async () => {
  return await geotabAPI.call('Get', {
    typeName: 'Group'
  });
};

const getDevices = async () => {
  return await geotabAPI.call('Get', {
    typeName: 'Device'
  });
};


const getRules = async () => {
  return await geotabAPI.call('Get', {
    typeName: 'Rule'
  });
};

module.exports = {
  getGroups,
  getDevices,
  getRules
};