const configValues = require("./config.json")

module.exports = {

    getDbConnectionString() {
        return `mongodb://${configValues.username}:${configValues.password}@ds111788.mlab.com:11788/${configValues.dbName}`
    }

}