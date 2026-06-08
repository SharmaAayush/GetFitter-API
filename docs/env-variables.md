# GetFitter API - Environment Variables Guide

## Overview
The GetFitter API uses environment variables for configuration. This approach allows for easy deployment across different environments (development, testing, production) without changing the code.

## Required Variables

### Server Configuration
| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `NODE_ENV` | Environment mode | `development` | `development`, `production`, `test` |
| `PORT` | Server port | `3000` | `3000`, `8080` |

### Database Configuration
The API supports both SQLite (development) and SQL Server (production) through the `DB_TYPE` variable.

#### Common Database Variables
| Variable | Description |
|----------|-------------|
| `DB_TYPE` | Database type (`sqlite` or `mssql`) |

#### SQLite Configuration (Development)
| Variable | Description | Default |
|----------|-------------|---------|
| `DB_NAME` | Database filename | `getfitter_dev.sqlite` |

#### SQL Server Configuration (Production)
| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | Database server hostname | `sqlserver.getfitter.example.com` |
| `DB_PORT` | Database server port | `1433` |
| `DB_NAME` | Database name | `getfitter_prod` |
| `DB_USER` | Database username | `dbuser` |
| `DB_PASSWORD` | Database password | `securepassword` |

### Security Configuration
| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | Secret for signing JWT tokens | `your-super-secret-jwt-key-change-in-production` |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d`, `24h` |
| `BCRYPT_SALT_ROUNDS` | Bcrypt salt rounds for password hashing | `12` |

### File Storage
| Variable | Description | Example |
|----------|-------------|---------|
| `STATIC_PATH` | Path for serving static files (exercise images, etc.) | `./static` |

## Usage Examples

### Development Environment (.env)
```env
NODE_ENV=development
PORT=3000
DB_TYPE=sqlite
DB_NAME=getfitter_dev.sqlite
JWT_SECRET=dev-secret-key-change-in-production
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
STATIC_PATH=./static
```

### Production Environment (.env)
```env
NODE_ENV=production
PORT=80
DB_TYPE=mssql
DB_HOST=sqlserver.getfitter.example.com
DB_PORT=1433
DB_NAME=getfitter_prod
DB_USER=dbuser
DB_PASSWORD=securepassword
JWT_SECRET=production-secret-key-change-this
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
STATIC_PATH=./static
```

### Testing Environment (.env.test)
```env
NODE_ENV=test
PORT=3001
DB_TYPE=sqlite
DB_NAME=getfitter_test.sqlite
JWT_SECRET=test-secret-key
JWT_EXPIRES_IN=1h
BCRYPT_SALT_ROUNDS=12
STATIC_PATH=./static
```

## Loading Environment Variables
The API uses the `dotenv` package to load environment variables from a `.env` file. The `src/config/env.ts` file handles validation and provides typed access to these variables.

### Important Notes
1. Never commit your `.env` file to version control
2. Use environment-specific files (`.env.development`, `.env.production`, etc.) for different deployments
3. In production, consider using secrets management tools or platform-specific environment variable configuration
4. Always use strong, randomly generated secrets for `JWT_SECRET` in production