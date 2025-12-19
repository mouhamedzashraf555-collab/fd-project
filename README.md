# 🍴 Nile Bites Restaurant Website 

## Made by MOHAMED ASHRAF ##

A modern and responsive **Full-Stack** restaurant website with **Food Ordering, Table Reservation, Shopping Cart, and Contact System**.  
⚡ Features a complete **Frontend** (HTML, CSS, JavaScript) with **Backend API** (Node.js, Express, SQLite).  

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
cd backend
npm install

# 2. Start server
npm start

# 3. Open browser
http://localhost:3000
```

See [QUICK_START.md](QUICK_START.md) for detailed instructions.

---

## 🚀 Features
- 🛒 **Shopping Cart System**: add items, remove items, and update quantity.  
- 📦 **Order Summary**: shows total price and order details.  
- 📱 **Table Reservation** form with validation.  
- 🚚 **Delivery Request** form to place orders online.  
- ✉️ **Contact Form** with validation (phone, email).  
- 🎨 Responsive design with categories:  
  - Eastern Food 🍲  
  - Fried Chicken 🍗  
  - Pasta & Pizza 🍝🍕  
  - Sandwiches 🥪  
  - Juices 🍹  
  - Desserts 🍰  
- 💾 Data persistence using `localStorage` (cart & form data).  

---

## 🛠️ Technologies Used
### Frontend
- **HTML5, CSS3, JavaScript** (Vanilla)
- **FontAwesome 4.7.0** - Icons
- **LocalStorage** - Client-side cart persistence

### Backend
- **Node.js & Express** - Server framework
- **SQLite3** - Database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

---

## 📂 Project Structure
```
fd-project/
├── backend/                    # Backend server
│   ├── config/
│   │   └── database.js        # SQLite connection
│   ├── routes/
│   │   ├── orders.js          # Order API
│   │   ├── reservations.js    # Reservation API
│   │   └── contacts.js        # Contact API
│   ├── database/
│   │   └── restaurant.db      # SQLite database
│   ├── server.js              # Express server
│   ├── package.json
│   └── README.md
├── Html/                       # Frontend pages
│   ├── home.html
│   ├── eastern_food.html
│   ├── fried_chicken.html
│   ├── pasta&pizza.html
│   ├── sandwishes.html
│   ├── juice.html
│   ├── Dessert.html
│   ├── contact.html
│   ├── Delivery.html
│   └── table reservation.html
├── css/
│   ├── style.css              # Global styles
│   └── food-style.css         # Food category styles
├── java_script/
│   ├── script.js              # Cart logic
│   ├── api.js                 # API client
│   └── forms.js               # Form handlers
├── photos/                     # Product images
└── README.md
```

