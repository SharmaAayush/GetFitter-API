# GetFitter API - Docker Usage Instructions

## Overview
The GetFitter API is configured to run in Docker containers using a multi-stage build process. This ensures consistent environments across development, testing, and production.

## Docker Images
The API provides two ways to run with Docker:
1. Simple Docker build and run
2. Docker Compose for development with volume mounting

## Prerequisites
- Docker Engine (v20.10+)
- Docker Compose (v2.0+)

## Option 1: Simple Docker Build and Run

### 1. Build the Docker image
```bash
docker build -t getfitter-api .
```

### 2. Run the container
```bash
docker run -d \
  --name getfitter-api \
  -p 3000:3000 \
  -v $(pwd)/.env:/app/.env \
  getfitter-api
```

### 3. Verify the container is running
```bash
docker ps | getfitter-api
```

### 4. Access the API
- Health check: http://localhost:3000/health
- API documentation: http://localhost:3000/api-docs

### 5. Stop and remove the container
```bash
docker stop getfitter-api
docker rm getfitter-api
```

## Option 2: Docker Compose (Recommended for Development)

### 1. Start the services
```bash
docker-compose up -d
```

### 2. Verify the services are running
```bash
docker-compose ps
```

### 3. View logs
```bash
docker-compose logs -f
```

### 4. Stop the services
```bash
docker-compose down
```

### 5. Stop and remove containers, networks, and volumes
```bash
docker-compose down -v
```

## Configuration Files

### Dockerfile
The Dockerfile uses a multi-stage build:
1. **Builder stage**: Installs dependencies and compiles TypeScript
2. **Production stage**: Runs the compiled JavaScript in a lightweight Node.js image

### docker-compose.yml
Defines a single service for the API with:
- Volume mounting for live code development
- Environment variable loading from `.env` file
- Port mapping (3000:3000)
- Restart policy for resilience

## Environment Variables with Docker
When using Docker, environment variables can be provided in several ways:

1. **Through .env file** (automatically loaded by Docker Compose)
2. **Using --env-file flag** with `docker run`
3. **Setting individual variables** with `-e` flag

Example:
```bash
docker run -d \
  --name getfitter-api \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=80 \
  -e DB_TYPE=mssql \
  -e DB_HOST=sqlserver.getfitter.example.com \
  -e DB_USER=dbuser \
  -e DB_PASSWORD=securepassword \
  getfitter-api
```

## Development Workflow with Docker Compose
When using `docker-compose up`:
- Source code is mounted as a volume (`./src:/app/src`)
- Changes to TypeScript files trigger automatic restart via `ts-node-dev`
- No need to rebuild the image for code changes
- Database persistence is not configured in this basic setup (for development only)

## Production Considerations
For production deployments:
1. Use multi-stage Docker build to minimize image size
2. Consider using a process manager like PM2 in the container
3. Implement proper logging and monitoring
4. Use container orchestration platforms (Kubernetes, Docker Swarm)
5. Configure resource limits and health checks
6. Use secrets management for sensitive environment variables

## Troubleshooting

### Container fails to start
```bash
# Check container logs
docker logs getfitter-api

# Common issues:
# - Missing environment variables
# - Port already in use
# - Database connection failures
```

### Unable to connect to database
1. Verify database connection parameters in environment variables
2. Ensure database server is accessible from the container
3. Check network configuration and firewall rules
4. For SQL Server, verify TCP/IP is enabled and listening on the correct port

### Performance issues
1. Check container resource usage: `docker stats`
2. Consider increasing memory allocation if needed
3. Monitor application performance metrics
4. Review database query performance