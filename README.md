# GetFitter API

A RESTful API for fitness tracking application built with Node.js, Express, and TypeScript.

## Overview
GetFitter API is a backend service designed to support fitness tracking functionality including exercise catalogs, workout management, routine planning, and user authentication.

## Features
- 🏥 Health check endpoint for monitoring
- 🗃️ Flexible database configuration (SQLite for development, SQL Server for production)
- 📚 Swagger/OpenAPI documentation
- 🐳 Docker support with multi-stage builds
- 🧪 Comprehensive test suite with Jest
- 🔐 JWT authentication foundation (Phase 3)
- 📦 Environment-based configuration
- 🛡️ Security middleware (helmet, cors)
- 📝 Request logging (morgan)

## Project Structure
```
getfitter-api/
├── src/
│   ├── config/         # Configuration files (database, environment)
│   ├── middleware/     # Custom middleware (error handling, not found)
│   ├── routes/         # API route handlers
│   ├── __tests__/      # Unit tests
│   ├── app.ts          # Express app configuration
│   └── server.ts       # Server entry point
├── docs/               # Documentation files
├── .env.example        # Environment variables template
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
├── jest.config.js      # Jest testing configuration
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Docker (optional, for containerization)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd getfitter-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file to configure your environment.

4. Build the project:
   ```bash
   npm run build
   ```

5. Run the application:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### API Documentation
Once the server is running, visit:
- Health check: http://localhost:3000/health
- API documentation: http://localhost:3000/api-docs

## Environment Variables
See [docs/env-variables.md](docs/env-variables.md) for complete configuration guide.

## Docker Usage
See [docs/docker-usage.md](docs/docker-usage.md) for Docker deployment instructions.

## Testing
Run the test suite:
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## API Endpoints (Phase 1)
- `GET /health` - Health check endpoint
- `GET /api-docs` - Swagger UI documentation

## License
This project is licensed under the MIT License.

## Contact
GetFitter Team - https://getfitter.example.com