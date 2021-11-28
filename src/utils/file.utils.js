const fs = require('fs').promises;
const path = require('path');

const getPath = filePath => path.join(__dirname, filePath);

const readFile = async path => {
    try {
        return await fs.readFile(getPath(path), 'utf8');
    }
    catch (err) {
        return null;
    }
};

const writeFile = async (path, data) => {
    await fs.writeFile(getPath(path), data, 'utf8');
};

module.exports = {
    getPath, readFile, writeFile
}