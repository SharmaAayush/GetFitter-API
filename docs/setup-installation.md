# GetFitter API - Setup and Installation

## Prerequisites
- Node.js (v18+)
- npm or yarn
- Docker (optional, for containerization)
- Git

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/getfitter/getfitter-api.git
cd getfitter-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Copy the example environment file and modify it according to your needs:
```bash
cp .env.example .env
```

Edit the `.env` file to configure:
- `NODE_ENV` (development, production, test)
- `PORT` (default: 3000)
- Database configuration (see Environment Variables Guide)
- JWT secrets (for future phases)
- Other service configurations

### 4. Build the project
```bash
npm run build
```

### 5. Run the application

#### Development mode
```bash
npm run dev
```

#### Production mode
```bash
npm start
```

### 6. Verify the installation
Once the server is running, visit:
- Health check: http://localhost:3000/health
- API documentation: http://localhost:3000/api-docs

## Project Structure
```
getfitter-api/
├── src/
│   ├── config/         # Configuration files
│   ├── middleware/     # Custom middleware
│   ├── routes/         # API routes
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