# Environment Configuration

## Creating the .env File

Create a file named `.env` in the `backend/` directory with the following content:

```env
PORT=3000
DB_PATH=./database/restaurant.db
NODE_ENV=development
```

## Configuration Options

### PORT
- **Description**: The port number the server will listen on
- **Default**: 3000
- **Example**: `PORT=3000`
- **Note**: If port 3000 is in use, change to 3001, 8080, etc.

### DB_PATH
- **Description**: Path to the SQLite database file
- **Default**: `./database/restaurant.db`
- **Example**: `DB_PATH=./database/restaurant.db`
- **Note**: The directory will be created automatically if it doesn't exist

### NODE_ENV
- **Description**: Environment mode
- **Options**: `development`, `production`, `test`
- **Default**: `development`
- **Example**: `NODE_ENV=production`

## Quick Setup

```bash
# Option 1: Manual creation
cd backend
echo "PORT=3000" > .env
echo "DB_PATH=./database/restaurant.db" >> .env
echo "NODE_ENV=development" >> .env

# Option 2: Copy from example (if available)
cp .env.example .env
```

## Security Notes

⚠️ **Important**: 
- Never commit `.env` files to version control
- The `.env` file is already in `.gitignore`
- For production, use environment-specific values
- Keep sensitive data (API keys, secrets) in `.env`

## Verification

After creating `.env`, verify it's working:

```bash
node -e "require('dotenv').config(); console.log(process.env.PORT);"
# Should output: 3000
```

## Troubleshooting

**Problem**: Server won't start
```bash
# Check if .env exists
ls -la .env

# Check .env content
cat .env
```

**Problem**: Variables not loading
```bash
# Ensure dotenv is installed
npm install dotenv

# Check for typos in variable names
```

## Production Configuration

For production deployment, set:

```env
PORT=80
DB_PATH=/var/lib/nile-bites/restaurant.db
NODE_ENV=production
```

Or use your hosting provider's environment variable system (Heroku, Vercel, AWS, etc.)

