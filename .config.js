module.exports = {
    app: {
      debug: true, // turn debugging on/off
      host: 'localhost', // your server host, usually localhost
      port: 8010 // port the server runs on
    },
    logger: {
      name: 'local' // logger name
    },
    baseUrl: 'http://localhost:8010',
    path: {
  
    },
    jwtExpired: 38600,
    jwtSecret: 'express',
    env: 'development',
  };