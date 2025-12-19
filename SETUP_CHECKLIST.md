# ✅ Setup Checklist

Complete this checklist to ensure everything is working correctly.

## 📋 Pre-Installation

- [ ] Node.js installed (v14+)
  ```bash
  node --version
  ```
- [ ] npm installed
  ```bash
  npm --version
  ```
- [ ] Project files downloaded/cloned
- [ ] Terminal/Command Prompt open

## 🔧 Backend Setup

- [ ] Navigate to backend folder
  ```bash
  cd backend
  ```
- [ ] Install dependencies
  ```bash
  npm install
  ```
- [ ] Create .env file (see ENV_SETUP.md)
  ```bash
  # Content:
  # PORT=3000
  # DB_PATH=./database/restaurant.db
  # NODE_ENV=development
  ```
- [ ] Start the server
  ```bash
  npm start
  ```
- [ ] Server starts without errors
- [ ] See success message with port number
- [ ] Database folder created automatically
- [ ] `restaurant.db` file created

## 🌐 Frontend Verification

- [ ] Open browser
- [ ] Navigate to `http://localhost:3000`
- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] Images load properly
- [ ] No console errors (F12)

## 🛒 Shopping Cart Test

- [ ] Click on any food category
- [ ] Page loads with food items
- [ ] Click "Add to cart" on an item
- [ ] Cart button shows count (number badge)
- [ ] Click "Cart" button
- [ ] Cart overlay opens
- [ ] Item appears in cart
- [ ] Price shows correctly
- [ ] Can change quantity
- [ ] Total updates automatically
- [ ] Can remove item (X button)
- [ ] Cart persists after page refresh

## 📦 Order Placement Test

- [ ] Add items to cart
- [ ] Click "Delivery" button in cart
- [ ] Delivery form page opens
- [ ] Fill in:
  - [ ] Name field
  - [ ] Phone number
  - [ ] Address
- [ ] Click "Send" button
- [ ] Green notification appears
- [ ] Shows "Order placed successfully!"
- [ ] Shows order ID
- [ ] Cart clears automatically
- [ ] Redirects to home page

## 🪑 Table Reservation Test

- [ ] Click any food category
- [ ] Click "Cart" button
- [ ] Click "book table" button
- [ ] Reservation form opens
- [ ] Fill in:
  - [ ] Name
  - [ ] Phone
  - [ ] Number of people
- [ ] Click "Send" button
- [ ] Green notification appears
- [ ] Shows "Table reserved successfully!"
- [ ] Shows reservation ID
- [ ] Form clears
- [ ] Redirects to home page

## 📧 Contact Form Test

- [ ] Click "Contact" in navigation
- [ ] Contact page loads
- [ ] See contact information boxes
- [ ] Fill in contact form:
  - [ ] Name
  - [ ] Phone
  - [ ] Email
  - [ ] Message
- [ ] Click "Send" button
- [ ] Green notification appears
- [ ] Shows "Message sent successfully!"
- [ ] Form fields clear

## 🧪 API Testing

- [ ] Server running
- [ ] Test health endpoint:
  ```bash
  curl http://localhost:3000/api/health
  ```
- [ ] Returns success JSON
- [ ] Test GET orders:
  ```bash
  curl http://localhost:3000/api/orders
  ```
- [ ] Returns orders array
- [ ] Test GET reservations:
  ```bash
  curl http://localhost:3000/api/reservations
  ```
- [ ] Returns reservations array

## 🗄️ Database Verification

- [ ] Navigate to database folder
  ```bash
  cd backend/database
  ```
- [ ] Database file exists (`restaurant.db`)
- [ ] Open database:
  ```bash
  sqlite3 restaurant.db
  ```
- [ ] List tables:
  ```sql
  .tables
  ```
- [ ] Should see: `orders`, `reservations`, `contacts`, `cart_items`
- [ ] Check orders:
  ```sql
  SELECT * FROM orders;
  ```
- [ ] Your test order appears
- [ ] Check reservations:
  ```sql
  SELECT * FROM reservations;
  ```
- [ ] Your test reservation appears
- [ ] Check contacts:
  ```sql
  SELECT * FROM contacts;
  ```
- [ ] Your test message appears

## 🎨 UI/UX Verification

- [ ] Navigation bar visible on all pages
- [ ] Hover effects work on buttons
- [ ] Social media icons visible
- [ ] Page backgrounds load
- [ ] Text is readable
- [ ] Forms are styled properly
- [ ] Cart overlay slides in smoothly
- [ ] Animations work (fade in effects)
- [ ] Notifications appear/disappear correctly

## 🔍 Error Handling

- [ ] Try submitting empty form → See error notification
- [ ] Try invalid phone → See error notification
- [ ] Try invalid email → See error notification
- [ ] Try ordering with empty cart → See error notification
- [ ] All error messages are clear and helpful

## 📱 Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] All features work in each browser

## 🔧 Development Tools

- [ ] Install REST Client extension (VS Code) - optional
- [ ] Open `backend/api-examples.http` - optional
- [ ] Test API endpoints directly - optional
- [ ] Install DB Browser for SQLite - optional

## 📝 Documentation Review

- [ ] Read README.md
- [ ] Read QUICK_START.md
- [ ] Read INSTALLATION.md
- [ ] Read backend/README.md
- [ ] Read PROJECT_SUMMARY.md
- [ ] Understand project structure
- [ ] Know how to troubleshoot issues

## 🎯 Final Verification

- [ ] Can browse all food categories
- [ ] Can add multiple items to cart
- [ ] Can adjust quantities
- [ ] Can place an order
- [ ] Can book a table
- [ ] Can send a contact message
- [ ] All data saves to database
- [ ] No errors in terminal
- [ ] No errors in browser console
- [ ] Server runs stably

## 🚀 Production Readiness (Optional)

If deploying to production:
- [ ] Change NODE_ENV to `production`
- [ ] Set appropriate PORT
- [ ] Configure proper database path
- [ ] Add authentication
- [ ] Add rate limiting
- [ ] Enable HTTPS
- [ ] Optimize images
- [ ] Minify CSS/JS
- [ ] Add monitoring
- [ ] Set up backups

## ✅ All Done!

If all items are checked, your Nile Bites restaurant system is fully operational! 🎉

## 🆘 Troubleshooting

If any item fails, see:
- **INSTALLATION.md** - Detailed troubleshooting section
- **backend/README.md** - API-specific issues
- **ENV_SETUP.md** - Environment configuration help

## 📊 Success Criteria

✅ Backend server running  
✅ Frontend accessible  
✅ Database created  
✅ Orders work  
✅ Reservations work  
✅ Contact form works  
✅ Cart system functional  
✅ No critical errors  

---

**Congratulations! Your restaurant system is ready to serve customers! 🍴**

