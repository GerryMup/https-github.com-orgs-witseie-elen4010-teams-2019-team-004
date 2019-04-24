let mssql = require('mssql')
// Make sure this is private to this module
let config = {
  server: 'kgmm.database.windows.net',
  database: 'kgmm',
  // Put login details in env. variables for security
  user: 'kgmm',
  password: 'SoftwareDev@12',
  port: 1433,
  // Required for Azure
  options: {
    encrypt: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
}
// Get a mssql connection instance
let isConnected = true
let connectionError = null
let pools = new mssql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to DB')
    return pool
  })
  .catch(err => {
    // Handle errors
    isConnected = false
    connectionError = err
    console.log(err)
  })
module.exports = {
  sql: mssql,
  pools: pools,
  isConnected: isConnected,
  connectionError: connectionError
}
