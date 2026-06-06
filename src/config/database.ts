import { Sequelize } from 'sequelize';
import config from './env';

/**
 * Database connection configuration
 * Supports both SQLite (development) and SQL Server (production)
 */
let sequelize: Sequelize;

if (config.DB_TYPE === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.DB_STORAGE || './database.sqlite',
    logging: config.NODE_ENV === 'development' ? console.log : false,
  });
} else if (config.DB_TYPE === 'mssql') {
  sequelize = new Sequelize(
    config.DB_NAME || 'getfitter',
    config.DB_USER || 'sa',
    config.DB_PASSWORD || 'YourStrong!Passw0rd',
    {
      host: config.DB_HOST || 'localhost',
      port: config.DB_PORT || 1433,
      dialect: 'mssql',
      logging: config.NODE_ENV === 'development' ? console.log : false,
      dialectOptions: {
        options: {
          encrypt: config.NODE_ENV === 'production' ? true : false,
          trustServerCertificate: true,
        },
      },
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );
} else {
  throw new Error(`Unsupported database type: ${config.DB_TYPE}`);
}

export default sequelize;