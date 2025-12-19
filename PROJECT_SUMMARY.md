# 📊 Nile Bites - Project Summary

## 🎯 Overview

**Nile Bites** is a full-stack restaurant web application featuring online ordering, table reservations, and customer contact management. Built with a clean separation between frontend and backend.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │  HTML Pages (home, menu, cart, forms)            │  │
│  │  CSS (styling, animations)                        │  │
│  │  JavaScript (cart logic, API calls, validation)  │  │
│  └────────────────┬─────────────────────────────────┘  │
└───────────────────┼─────────────────────────────────────┘
                    │
                    │ HTTP/REST API
                    │
┌───────────────────▼─────────────────────────────────────┐
│              SERVER (Node.js/Express)                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Routes (orders, reservations, contacts)         │  │
│  │  Middleware (CORS, body-parser, error handling)  │  │
│  │  Database Connection (SQLite3)                    │  │
│  └────────────────┬─────────────────────────────────┘  │
└───────────────────┼─────────────────────────────────────┘
                    │
                    │ SQL Queries
                    │
┌───────────────────▼─────────────────────────────────────┐
│              DATABASE (SQLite)                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Tables: orders, reservations, contacts          │  │
│  │  Auto-incrementing IDs, timestamps                │  │
│  │  JSON storage for order items                     │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 Components Breakdown

### Frontend (Client-Side)

| File | Purpose |
|------|---------|
| `Html/*.html` | 10 HTML pages (home, categories, forms) |
| `css/style.css` | Global styling, navigation, forms |
| `css/food-style.css` | Food category pages, cart overlay |
| `java_script/script.js` | Shopping cart logic, localStorage |
| `java_script/api.js` | API client functions |
| `java_script/forms.js` | Form validation and submission |

### Backend (Server-Side)

| File | Purpose |
|------|---------|
| `backend/server.js` | Express app setup, middleware |
| `backend/config/database.js` | SQLite connection & schema |
| `backend/routes/orders.js` | Order CRUD operations |
| `backend/routes/reservations.js` | Reservation management |
| `backend/routes/contacts.js` | Contact form handling |

---

## 🗄️ Database Schema

### orders
```sql
id              INTEGER PRIMARY KEY
customer_name   TEXT NOT NULL
phone           TEXT NOT NULL
address         TEXT NOT NULL
items           TEXT NOT NULL (JSON array)
total_price     REAL NOT NULL
status          TEXT DEFAULT 'pending'
created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
```

### reservations
```sql
id                INTEGER PRIMARY KEY
customer_name     TEXT NOT NULL
phone             TEXT NOT NULL
number_of_people  INTEGER NOT NULL
reservation_date  DATETIME DEFAULT CURRENT_TIMESTAMP
status            TEXT DEFAULT 'pending'
created_at        DATETIME DEFAULT CURRENT_TIMESTAMP
```

### contacts
```sql
id          INTEGER PRIMARY KEY
name        TEXT NOT NULL
phone       TEXT NOT NULL
email       TEXT NOT NULL
message     TEXT NOT NULL
created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
```

---

## 🔌 API Endpoints

### 📋 Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get specific order |
| PATCH | `/api/orders/:id/status` | Update order status |

### 🪑 Reservations
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reservations` | Create reservation |
| GET | `/api/reservations` | Get all reservations |
| GET | `/api/reservations/:id` | Get specific reservation |
| PATCH | `/api/reservations/:id/status` | Update status |
| DELETE | `/api/reservations/:id` | Delete reservation |

### 📧 Contacts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contacts` | Send contact message |
| GET | `/api/contacts` | Get all messages |
| GET | `/api/contacts/:id` | Get specific message |
| DELETE | `/api/contacts/:id` | Delete message |

---

## 🔄 Data Flow Examples

### 1. Placing an Order

```
User Action                  Frontend                Backend              Database
───────────                  ────────                ───────              ────────
1. Add items to cart    →    Store in localStorage
2. Fill delivery form   →    Validate inputs
3. Click "Send"         →    api.createOrder()
                        →                        →   POST /api/orders
                                                 →                     →  INSERT order
                                                 ←   Return order ID  ←
                        ←    Show success notif  ←
4. Redirect to home     →    Clear cart
```

### 2. Booking a Table

```
User Action                  Frontend                Backend              Database
───────────                  ────────                ───────              ────────
1. Click "book table"   →    Open form
2. Fill form            →    Validate inputs
3. Click "Send"         →    api.createReservation()
                        →                        →   POST /api/reservations
                                                 →                     →  INSERT reservation
                                                 ←   Return reservation ID ←
                        ←    Show success notif  ←
```

---

## 🎨 Key Features

### ✅ Shopping Cart System
- Add/remove items dynamically
- Update quantities in real-time
- Calculate totals automatically
- Persist cart using localStorage
- Slide-in cart overlay UI
- Item counter badge

### ✅ Order Management
- Full delivery order form
- Customer info validation
- Order history stored in DB
- Order status tracking
- JSON storage for order items

### ✅ Table Reservation
- Simple booking form
- Validate party size (1-50)
- Status management system
- Timestamped reservations

### ✅ Contact System
- Email & phone validation
- Message storage in database
- Admin can view all messages
- Auto-timestamping

### ✅ Data Persistence
- Client: localStorage for cart
- Server: SQLite database
- No data loss on refresh

---

## 🛠️ Technology Stack Details

### Frontend Technologies
- **HTML5**: Semantic structure (10 pages)
- **CSS3**: Flexbox layout, animations, gradients
- **JavaScript ES6+**: Async/await, fetch API, DOM manipulation
- **LocalStorage API**: Client-side cart persistence
- **FontAwesome 4.7**: Icon library

### Backend Technologies
- **Node.js v14+**: JavaScript runtime
- **Express 4.x**: Web framework
- **SQLite3**: Embedded database
- **CORS**: Cross-origin resource sharing
- **body-parser**: Request body parsing
- **dotenv**: Environment configuration

### Development Tools
- **nodemon**: Auto-restart server
- **npm**: Package management
- **Git**: Version control (recommended)

---

## 📈 Application Flow

```
HOME PAGE
    ├── Browse Categories
    │   ├── Eastern Food (12 items)
    │   ├── Fried Chicken
    │   ├── Pasta & Pizza
    │   ├── Sandwiches
    │   ├── Juices
    │   └── Desserts
    │
    ├── Shopping Cart
    │   ├── View Items
    │   ├── Adjust Quantities
    │   └── Place Order
    │       ├── Delivery → Order Form → Database
    │       └── Book Table → Reservation Form → Database
    │
    └── Contact Form → Database
```

---

## 🔒 Security Features

✅ Input validation (phone, email formats)  
✅ SQL injection prevention (parameterized queries)  
✅ CORS configuration  
✅ Error handling middleware  
✅ Data type validation  
✅ Required field validation  

⚠️ **Note**: This is a demonstration project. For production:
- Add authentication/authorization
- Implement rate limiting
- Add HTTPS/SSL
- Sanitize user inputs
- Add CSRF protection
- Implement proper session management

---

## 📊 File Statistics

| Category | Count | Total Size |
|----------|-------|------------|
| HTML Pages | 10 | ~20 KB |
| CSS Files | 2 | ~15 KB |
| JavaScript Files | 3 | ~15 KB |
| Backend Routes | 3 | ~10 KB |
| Product Images | 80+ | ~15 MB |
| Documentation | 5 | ~50 KB |

---

## 🚀 Performance Considerations

### Current Implementation
- ✅ Lightweight SQLite database
- ✅ Minimal dependencies
- ✅ Client-side cart for speed
- ✅ Static file serving

### Possible Optimizations
- 🔄 Image optimization (WebP, compression)
- 🔄 Lazy loading for images
- 🔄 Minify CSS/JS for production
- 🔄 Add caching headers
- 🔄 Implement CDN for images
- 🔄 Database indexing for queries

---

## 🎯 Use Cases

1. **Customer Orders Food**
   - Browse menu → Add to cart → Checkout → Receive confirmation

2. **Customer Books Table**
   - Click book table → Fill form → Submit → Get reservation ID

3. **Customer Contacts Restaurant**
   - Go to contact page → Fill form → Send message → Confirmation

4. **Admin Views Orders** (API)
   - GET /api/orders → View all orders with details

5. **Admin Updates Order Status** (API)
   - PATCH /api/orders/:id/status → Change to 'preparing', 'delivered', etc.

---

## 📝 Environment Variables

Create `backend/.env`:
```env
PORT=3000
DB_PATH=./database/restaurant.db
NODE_ENV=development
```

---

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack web development
- RESTful API design
- Database design & SQL
- Client-server architecture
- Form validation
- Error handling
- Async JavaScript
- DOM manipulation
- CSS animations
- Responsive design concepts

---

## 📞 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* optional data */ },
  "orderId": 123  /* context-specific ID */
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🎉 Project Highlights

✨ **Fully Functional** - Complete order-to-database flow  
✨ **Clean Architecture** - Separation of concerns  
✨ **Modern Stack** - Current technologies  
✨ **Well Documented** - Comprehensive guides  
✨ **Easy Setup** - 3-minute installation  
✨ **Extensible** - Ready for new features  

---

## 📚 Documentation Files

1. **README.md** - Project overview
2. **INSTALLATION.md** - Detailed setup guide
3. **QUICK_START.md** - Fast 3-minute setup
4. **backend/README.md** - API documentation
5. **PROJECT_SUMMARY.md** - This file (architecture & details)

---

## 🔮 Future Enhancements

Possible additions:
- User authentication system
- Admin dashboard
- Payment integration
- Order tracking (real-time)
- Email notifications
- SMS confirmations
- Rating & review system
- Search & filter functionality
- Mobile app (React Native)
- Analytics dashboard

---

**Made with ❤️ by Mohamed Ashraf**

