import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import sequelize from './config/database';
import config from './config/env';
import { setupSwagger } from './swagger';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import healthRoutes from './routes/health';

// Load environment variables
dotenv.config();

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandling();
    this.connectDatabase();
  }

  private configureMiddlewares(): void {
    // Security middleware
    this.app.use(helmet());

    // CORS middleware
    this.app.use(cors());

    // Logging middleware
    this.app.use(morgan('dev'));

    // Body parsing middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private configureRoutes(): void {
    // Health check route
    this.app.use('/health', healthRoutes);

    // Swagger documentation
    setupSwagger(this.app);

    // 404 handler
    this.app.use(notFound);
  }

  private configureErrorHandling(): void {
    // Centralized error handling middleware
    this.app.use(errorHandler);
  }

  private async connectDatabase(): Promise<void> {
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');

      // Sync models (in development only - use migrations in production)
      if (config.NODE_ENV === 'development') {
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully.');
      }
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      process.exit(1);
    }
  }

  public start(): void {
    const port = config.PORT;
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Environment: ${config.NODE_ENV}`);
      console.log(`Database type: ${config.DB_TYPE}`);
    });
  }
}

// Export the Express app for use in server.ts and tests
export const app = new App().app;
// Export the App class as default if needed elsewhere
export default new App();