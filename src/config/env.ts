import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Configuration class for environment variables
 */
class Config {
  public NODE_ENV: string;
  public PORT: number;
  public DB_TYPE: string;
  public DB_STORAGE: string | undefined;
  public DB_HOST: string | undefined;
  public DB_PORT: number | undefined;
  public DB_NAME: string | undefined;
  public DB_USER: string | undefined;
  public DB_PASSWORD: string | undefined;
  public JWT_SECRET: string;
  public JWT_EXPIRES_IN: string;
  public BCRYPT_SALT_ROUNDS: number;
  public STATIC_PATH: string;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || 'development';
    this.PORT = parseInt(process.env.PORT || '3000', 10);
    this.DB_TYPE = process.env.DB_TYPE || 'sqlite';
    this.DB_STORAGE = process.env.DB_STORAGE;
    this.DB_HOST = process.env.DB_HOST;
    this.DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined;
    this.DB_NAME = process.env.DB_NAME;
    this.DB_USER = process.env.DB_USER;
    this.DB_PASSWORD = process.env.DB_PASSWORD;
    this.JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_change_in_production';
    this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
    this.BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
    this.STATIC_PATH = process.env.STATIC_PATH || './static';
  }
}

export default new Config();