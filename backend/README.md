# Nile Bites Backend API

Backend server for the Nile Bites Restaurant website with SQLite database.

## 🚀 Features

- RESTful API for orders, reservations, and contact messages
- SQLite database for data persistence
- CORS enabled for frontend integration
- Input validation and error handling
- Clean MVC-style architecture

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. The database will be created automatically on first run.

## ▶️ Running the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:3000`

## 📡 API Endpoints

### Health Check
- **GET** `/api/health` - Check if server is running

### Orders
- **POST** `/api/orders` - Create a new order
- **GET** `/api/orders` - Get all orders
- **GET** `/api/orders/:id` - Get specific order
- **PATCH** `/api/orders/:id/status` - Update order status

### Reservations
- **POST** `/api/reservations` - Create table reservation
- **GET** `/api/reservations` - Get all reservations
- **GET** `/api/reservations/:id` - Get specific reservation
- **PATCH** `/api/reservations/:id/status` - Update reservation status
- **DELETE** `/api/reservations/:id` - Delete reservation

### Contacts
- **POST** `/api/contacts` - Submit contact form
- **GET** `/api/contacts` - Get all contact messages
- **GET** `/api/contacts/:id` - Get specific message
- **DELETE** `/api/contacts/:id` - Delete message

## 📝 API Request Examples

### Create Order
```javascript
POST /api/orders
Content-Type: application/json

{
  "customer_name": "John Doe",
  "phone": "01234567890",
  "address": "123 Main St, Cairo",
  "items": [
    {"name": "Pizza", "price": 120, "quantity": 2},
    {"name": "Juice", "price": 55, "quantity": 1}
  ],
  "total_price": 295
}
```

### Create Reservation
```javascript
POST /api/reservations
Content-Type: application/json

{
  "customer_name": "Jane Smith",
  "phone": "01234567890",
  "number_of_people": 4
}
```

### Send Contact Message
```javascript
POST /api/contacts
Content-Type: application/json

{
  "name": "Ali Hassan",
  "phone": "01234567890",
  "email": "ali@example.com",
  "message": "Great food and service!"
}
```

## 🗄️ Database Schema

### orders
- id (INTEGER PRIMARY KEY)
- customer_name (TEXT)
- phone (TEXT)
- address (TEXT)
- items (TEXT - JSON)
- total_price (REAL)
- status (TEXT) - pending, confirmed, preparing, delivered, cancelled
- created_at (DATETIME)

### reservations
- id (INTEGER PRIMARY KEY)
- customer_name (TEXT)
- phone (TEXT)
- number_of_people (INTEGER)
- reservation_date (DATETIME)
- status (TEXT) - pending, confirmed, completed, cancelled
- created_at (DATETIME)

### contacts
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- phone (TEXT)
- email (TEXT)
- message (TEXT)
- created_at (DATETIME)

## 🔧 Configuration

Environment variables (`.env` file):
```
PORT=3000
DB_PATH=./database/restaurant.db
NODE_ENV=development
```

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js       # Database connection & initialization
├── routes/
│   ├── orders.js         # Order endpoints
│   ├── reservations.js   # Reservation endpoints
│   └── contacts.js       # Contact endpoints
├── database/
│   └── restaurant.db     # SQLite database (auto-generated)
├── server.js             # Express server setup
├── package.json
└── README.md
```

## 🛡️ Error Handling

All endpoints return consistent JSON responses:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🔒 Security Features

- Input validation on all endpoints
- SQL injection protection (parameterized queries)
- CORS configuration
- Error handling middleware
- Phone and email format validation

## 📊 Status Values

**Order Status:**
- `pending` - Order received
- `confirmed` - Order confirmed
- `preparing` - Being prepared
- `delivered` - Delivered to customer
- `cancelled` - Order cancelled

**Reservation Status:**
- `pending` - Awaiting confirmation
- `confirmed` - Reservation confirmed
- `completed` - Customer served
- `cancelled` - Reservation cancelled

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change PORT in .env file or kill the process
lsof -ti:3000 | xargs kill
```

**Database issues:**
```bash
# Delete and recreate database
rm database/restaurant.db
npm start
```

## 📝 License

ISC

test git 