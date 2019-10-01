const config = {
  server: 'localhost',
  port: 27017,
  database: 'calendar',
};

config.url = () => {
  return `mongodb://${config.server}:${config.port}`;
};

module.exports = config;