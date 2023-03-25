module.exports = {
  config: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'sports_program_management',
    },
    migrations: {
      directory: './src/migrations',
    },
  },
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'sports_program_management',
    },
    migrations: {
      directory: './src/migrations',
    },
  },
};
