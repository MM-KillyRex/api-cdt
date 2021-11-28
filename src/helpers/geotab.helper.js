const GeotabApi = require('mygeotab-api-node');
const FileUtils = require('fs-extra');

const sessionFileURI = './session';
const dayInMs = 1000 * 60 * 60 * 24;

class GeotabHelper {
  constructor({ username, password, database, server, sessionId, userName, path }) {
    if (!username && !userName) {
      throw new Error(`'username' is required`);
    }
    if (!password && !sessionId) {
      throw new Error(`'password' or 'sessionId' is required`);
    }
    if (!database) {
      throw new Error(`'database' is required`);
    }
    if (!server && !path) {
      throw new Error(`'server' is required`);
    }
    this.username = username || userName;
    this.password = password;
    this.database = database;
    this.server = server || path;
    this.sessionId = sessionId || null;
    this.sessionFileURI = sessionFileURI + this.username;
  }

  async initApi() {
    try {
      if (this.checkValidCredentials()) return this.getApiFromCredentials();
      const fileResult = await FileUtils.readJSON(this.sessionFileURI);
      const { sessionId, date } = fileResult || {};
      if (sessionId && new Date() - dayInMs < new Date(date)) {
        this.sessionId = sessionId;
        return this.getApiFromCredentials();
      }
      return this.updateSessionId();
    } catch (error) {
      return this.updateSessionId();
    }
  }

  checkValidCredentials() {
    return this.username !== null && this.username !== '' && this.sessionId !== null && this.sessionId !== '';
  }

  getApiFromCredentials() {
    this.api = new GeotabApi(this.username, null, this.sessionId, this.database, this.server);

    return this.api;
  }

  async authenticateAsync() {
    if (!this.api || !this.api.authenticate) return null;

    return new Promise((resolve, reject) => {
      this.api.authenticate(
        (s) => {
          resolve(s);
        },
        (e) => {
          reject(e);
        }
      );
    });
  }

  async updateSessionId() {
    try {
      console.log(new Date(), 'Updating session id');
      this.api = new GeotabApi(this.username, this.password, null, this.database, this.server);

      const loginResult = await this.api.authenticateAsync();
      if (loginResult && loginResult.credentials) {
        this.sessionId = loginResult.credentials.sessionId;
        this.server = this.server || loginResult.path;
      }
      await FileUtils.writeJSON(this.sessionFileURI, {
        sessionId: this.sessionId,
        date: new Date()
      });
      this.getApiFromCredentials();
      return this.api;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * @returns {Promise<API>} An object with geotab api
   */
  async getApi() {
    return this.initApi();
  }
}

module.exports = GeotabHelper;