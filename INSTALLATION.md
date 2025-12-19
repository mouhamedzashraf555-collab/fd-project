# 🚀 Installation & Setup Guide

Complete guide to set up the Nile Bites Restaurant project locally.

## 📋 Prerequisites

Before starting, ensure you have:
- **Node.js** (v14.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)
- A web browser (Chrome, Firefox, Edge)

## 🔧 Step-by-Step Installation

### 1. Download/Clone the Project

```bash
# If using git
git clone <repository-url>
cd fd-project

# Or download and extract the ZIP file
```

### 2. Install Backend Dependencies

```bash
# Navigate to backend folder
cd backend

# Install all required packages
npm install

# This will install:
# - express (web framework)
# - sqlite3 (database)
# - cors (cross-origin support)
# - body-parser (request parsing)
# - dotenv (environment variables)
```

### 3. Start the Backend Server

```bash
# From the backend directory
npm start

# Or for development with auto-reload:
npm run dev
```

You should see:
```
╔════════════════════════════════════════╗
║  🍴 Nile Bites Backend Server         ║
║  ✓ Server running on port 3000        ║
║  ✓ Database connected                 ║
║  ✓ API: http://localhost:3000/api     ║
╚════════════════════════════════════════╝
```

### 4. Open the Frontend

**Option A: Direct File Access**
- Navigate to the `Html` folder
- Open `home.html` in your browser
- ⚠️ **Note:** This may cause CORS issues

**Option B: Using the Server (Recommended)**
- Keep the backend server running
- Open your browser and go to:
  ```
  http://localhost:3000
  ```

**Option C: Using Live Server (VS Code)**
- Install "Live Server" extension in VS Code
- Right-click `Html/home.html`
- Select "Open with Live Server"
- Update `API_BASE_URL` in `java_script/api.js` if using different port

## ✅ Verify Installation

### Test Backend API

Open a new terminal and run:

```bash
# Test health endpoint
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Nile Bites API is running",
  "timestamp": "2024-12-19T..."
}
```

### Test Frontend

1. Open the website
2. Navigate to any food category
3. Add items to cart
4. Go to "Delivery" and fill the form
5. Submit - you should see a success notification

## 🗄️ Database Setup

The SQLite database is **automatically created** on first run. It will be located at:
```
backend/database/restaurant.db
```

### Database Tables Created:
- `orders` - Customer orders
- `reservations` - Table bookings
- `contacts` - Contact form submissions
- `cart_items` - Shopping cart data

## 🔍 Troubleshooting

### Problem: Port 3000 already in use

**Solution:**
```bash
# Option 1: Kill the process (Mac/Linux)
lsof -ti:3000 | xargs kill

# Option 2: Kill the process (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Option 3: Change the port
# Edit backend/.env and change PORT=3000 to PORT=3001
```

### Problem: npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and try again
rm -rf node_modules
npm install
```

### Problem: Cannot connect to API

**Solution:**
1. Ensure backend server is running
2. Check console for errors
3. Verify `API_BASE_URL` in `java_script/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:3000/api';
   ```
4. Check browser console for CORS errors

### Problem: Database errors

**Solution:**
```bash
# Delete and recreate database
cd backend
rm database/restaurant.db
npm start
```

### Problem: Forms not submitting

**Solution:**
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify all script files are loaded:
   - `api.js`
   - `forms.js`
   - `script.js`

## 🌐 Testing Different Features

### 1. Test Shopping Cart
- Browse food categories
- Click "Add to cart" on items
- Open cart (Cart button)
- Adjust quantities
- Cart should persist on page refresh

### 2. Test Order Placement
- Add items to cart
- Click "Delivery" in cart
- Fill form (Name, Phone, Address)
- Click "Send"
- Should see success notification

### 3. Test Table Reservation
- Click "book table" in cart
- Fill form (Name, Phone, Number of people)
- Click "Send"
- Should see success notification

### 4. Test Contact Form
- Go to Contact page
- Fill all fields
- Click "Send"
- Should see success notification

## 📊 View Database Records

### Option 1: Using SQLite CLI
```bash
cd backend/database
sqlite3 restaurant.db

# Inside SQLite shell:
.tables                    # List all tables
SELECT * FROM orders;      # View orders
SELECT * FROM reservations; # View reservations
SELECT * FROM contacts;    # View contacts
.exit                      # Exit
```

### Option 2: Using DB Browser (GUI)
- Download [DB Browser for SQLite](https://sqlitebrowser.org/)
- Open `backend/database/restaurant.db`
- Browse tables visually

## 🔒 Environment Configuration

Edit `backend/.env` file:

```env
PORT=3000                           # Server port
DB_PATH=./database/restaurant.db   # Database location
NODE_ENV=development                # Environment
```

## 📱 Mobile Testing

To test on mobile devices on the same network:

1. Find your computer's local IP:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. Update API URL in `java_script/api.js`:
   ```javascript
   const API_BASE_URL = 'http://192.168.1.XXX:3000/api';
   ```

3. Access from mobile:
   ```
   http://192.168.1.XXX:3000
   ```

## 🛑 Stopping the Server

```bash
# In the terminal running the server:
Press Ctrl + C

# Or kill process by port:
lsof -ti:3000 | xargs kill  # Mac/Linux
```

## 📝 Development Tips

1. **Auto-reload backend:**
   ```bash
   npm run dev  # Uses nodemon
   ```

2. **View logs:**
   - Backend logs appear in terminal
   - Frontend logs in browser console (F12)

3. **Test API with Postman:**
   - Import endpoints from `backend/README.md`
   - Test API independently

## ✨ Success Checklist

- [ ] Backend server starts without errors
- [ ] Can access http://localhost:3000
- [ ] Website loads properly
- [ ] Can add items to cart
- [ ] Cart persists on refresh
- [ ] Can submit delivery order
- [ ] Can make table reservation
- [ ] Can send contact message
- [ ] Database file created
- [ ] No errors in browser console

## 🆘 Need Help?

If you encounter issues:
1. Check the error message carefully
2. Review this guide
3. Check `backend/README.md` for API details
4. Ensure all dependencies are installed
5. Verify Node.js version: `node --version`

## 🎉 You're Ready!

Once everything works, you can start:
- Adding more menu items
- Customizing the design
- Adding new features
- Deploying to production

Happy coding! 🚀

