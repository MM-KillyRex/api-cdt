const fs = require('fs');
const path = require('path');
const API = require('mg-api-js');
const {
  GEOTAB_USERNAME: userName,
  GEOTAB_PASSWORD: password,
  GEOTAB_DATABASE: database,
  GEOTAB_SERVER: server
} = process.env;

const filePath = path.resolve(__dirname, '../.session');

class GeotabAPI {
  constructor() {
    const authentication = {
      credentials: {
        database,
        userName,
        password
      },
      path: server
    };
    if (fs.existsSync(filePath)) {
      const sessionId = fs.readFileSync(filePath, { encoding: 'utf-8' });
      authentication.credentials.sessionId = sessionId;
      this.sessionId = sessionId;
    }
    this.api = new API(authentication);
  }

  authenticate = async () => {
    try {
      const resp = await this.api.authenticate();
      const { sessionId } = resp.credentials;
      fs.writeFileSync(filePath, sessionId, { encoding: 'utf-8' });
      this.sessionId = sessionId;
      this.api = new API({
        credentials: {
          database,
          userName,
          password,
          sessionId
        },
        path: server
      })
    }
    catch (ex) {
      throw ex;
    }
  }

  call = async (method, params) => {
    try {
      const result = await this.api.call(method, params);
      this.checkSession();
      return result;
    }
    catch (ex) {
      if (ex.message.includes('Incorrect login credentials')) {
        await this.authenticate();
        return await this.api.call(method, params);
      }
      else {
        throw ex;
      }
    }
  }

  multiCall = async (calls) => {
    try {
      const result = await this.api.multiCall(calls);
      this.checkSession();
      return result;
    }
    catch (ex) {
      if (ex.message.includes('Incorrect login credentials')) {
        await this.authenticate();
        return await this.api.multiCall(calls);
      }
      else {
        throw ex;
      }
    }
  }

  checkSession = () => {
    try {
      const { sessionId } = this.api._helper.cred;
      if (sessionId !== this.sessionId) {
        fs.writeFileSync(filePath, sessionId, { encoding: 'utf-8' });
        this.sessionId = sessionId;
      }
    }
    catch (ex) { }
  }
}

module.exports = new GeotabAPI();