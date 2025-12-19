function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayCartSummary() {
    const orderItemsDiv = document.getElementById('order-items');
    const orderTotalSpan = document.getElementById('order-total');
    
    if (!orderItemsDiv || !orderTotalSpan) return;
    
    const storedCartData = localStorage.getItem('cartData');
    
    if (!storedCartData) {
        orderItemsDiv.innerHTML = '<p style="text-align: center; color: #ff6b6b;">No items in cart. Please add items first.</p>';
        orderTotalSpan.textContent = '0 EGP';
        return;
    }
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = storedCartData;
    const cartBoxes = tempDiv.querySelectorAll('.cart-box');
    
    if (cartBoxes.length === 0) {
        orderItemsDiv.innerHTML = '<p style="text-align: center; color: #ff6b6b;">No items in cart. Please add items first.</p>';
        orderTotalSpan.textContent = '0 EGP';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cartBoxes.forEach((item, index) => {
        const title = item.querySelector('.cart-food-title')?.innerText || '';
        const priceText = item.querySelector('.cart-price')?.innerText || '0';
        const qty = parseInt(item.querySelector('.cart-quantity')?.value || 1);
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        
        const itemTotal = price * qty;
        total += itemTotal;
        
        html += `
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(205, 164, 94, 0.3);">
                <span style="flex: 2;">${title}</span>
                <span style="flex: 1; text-align: center;">x${qty}</span>
                <span style="flex: 1; text-align: right; color: #CDA45E;">${itemTotal.toFixed(2)} EGP</span>
            </div>
        `;
    });
    
    orderItemsDiv.innerHTML = html;
    orderTotalSpan.textContent = total.toFixed(2) + ' EGP';
}

function showNotification(message, type = 'success') {
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }

    const notif = document.createElement('div');
    notif.className = `notification notification-${type}`;
    notif.textContent = message;
    
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 4000);
    }, 8000);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Forms.js loaded successfully');
    console.log('API available?', typeof api !== 'undefined');
    console.log('Current URL:', window.location.href);
    
    const deliveryForm = document.querySelector('.del');
    if (deliveryForm && window.location.href.includes('Delivery.html')) {
        console.log('Delivery form found');
        
        // Display cart summary
        displayCartSummary();
        
        const sendBtn = deliveryForm.querySelector('.btn-send');
        if (sendBtn) {
            console.log('Send button found, attaching handler');
            sendBtn.onclick = async function(e) {
                console.log('Send button clicked!');
                e.preventDefault();
                
                const name = document.getElementById('txtName')?.value.trim();
                const phone = document.getElementById('numphone')?.value.trim();
                const address = document.getElementById('txtMail')?.value.trim();

                if (!name || !phone || !address) {
                    showNotification('Please fill all fields', 'error');
                    return;
                }

                if (!validatePhone(phone)) {
                    showNotification('Please enter a valid phone number', 'error');
                    return;
                }

                // Get cart data from localStorage or DOM
                let items = [];
                let total = 0;

                // Try to get from localStorage first
                const storedCartData = localStorage.getItem('cartData');
                
                if (storedCartData) {
                    // Parse cart data from localStorage HTML
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = storedCartData;
                    const cartBoxes = tempDiv.querySelectorAll('.cart-box');
                    
                    if (cartBoxes.length === 0) {
                        showNotification('Your cart is empty!', 'error');
                        return;
                    }
                    
                    cartBoxes.forEach(item => {
                        const title = item.querySelector('.cart-food-title')?.innerText || '';
                        const priceText = item.querySelector('.cart-price')?.innerText || '0';
                        const qty = parseInt(item.querySelector('.cart-quantity')?.value || 1);
                        
                        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                        
                        items.push({ name: title, price, quantity: qty });
                        total += price * qty;
                    });
                } else {
                    // Fallback: try to read from DOM (if on a page with cart)
                    const cartItems = document.querySelectorAll('.cart-box');
                    
                    if (cartItems.length === 0) {
                        showNotification('Your cart is empty! Please add items first.', 'error');
                        return;
                    }
                    
                    cartItems.forEach(item => {
                        const title = item.querySelector('.cart-food-title')?.innerText || '';
                        const priceText = item.querySelector('.cart-price')?.innerText || '0';
                        const qty = parseInt(item.querySelector('.cart-quantity')?.value || 1);
                        
                        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                        
                        items.push({ name: title, price, quantity: qty });
                        total += price * qty;
                    });
                }

                const orderData = {
                    customer_name: name,
                    phone: phone,
                    address: address,
                    items: items,
                    total_price: total
                };

                console.log('Sending order data:', orderData);
                
                if (typeof api === 'undefined') {
                    console.error('API not loaded!');
                    showNotification('Error: API not loaded. Please refresh the page.', 'error');
                    return;
                }

                sendBtn.disabled = true;
                sendBtn.textContent = 'Sending...';

                const result = await api.createOrder(orderData);
                console.log('Order result:', result);

                if (result.success) {
                    showNotification('Order placed successfully! Order ID: ' + result.orderId, 'success');
                    document.getElementById('txtName').value = '';
                    document.getElementById('numphone').value = '';
                    document.getElementById('txtMail').value = '';
                    
                    localStorage.removeItem('cartData');
                    const cartContent = document.querySelector('.cart-content');
                    if (cartContent) cartContent.innerHTML = '';
                    
                    setTimeout(() => {
                        window.location.href = '/Html/home.html';
                    }, 2000);
                } else {
                    showNotification(result.message || 'Failed to place order', 'error');
                }

                sendBtn.disabled = false;
                sendBtn.textContent = 'Send';
            };
        }
    }

    const reservationForm = document.querySelector('.del');
    if (reservationForm && window.location.href.includes('table reservation.html')) {
        console.log('Reservation form found');
        
        const sendBtn = reservationForm.querySelector('.btn-send');
        if (sendBtn) {
            console.log('Reservation send button found');
            sendBtn.onclick = async function(e) {
                e.preventDefault();
                
                const name = document.getElementById('Name')?.value.trim();
                const phone = document.getElementById('phone')?.value.trim();
                const people = document.getElementById('txtPeople')?.value;

                if (!name || !phone || !people) {
                    showNotification('Please fill all fields', 'error');
                    return;
                }

                if (!validatePhone(phone)) {
                    showNotification('Please enter a valid phone number', 'error');
                    return;
                }

                const numPeople = parseInt(people);
                if (numPeople < 1 || numPeople > 50) {
                    showNotification('Number of people must be between 1 and 50', 'error');
                    return;
                }

                const reservationData = {
                    customer_name: name,
                    phone: phone,
                    number_of_people: numPeople
                };

                sendBtn.disabled = true;
                sendBtn.textContent = 'Sending...';

                const result = await api.createReservation(reservationData);

                if (result.success) {
                    showNotification('Table reserved successfully! Reservation ID: ' + result.reservationId, 'success');
                    document.getElementById('Name').value = '';
                    document.getElementById('phone').value = '';
                    document.getElementById('txtPeople').value = '';
                    
                    setTimeout(() => {
                        window.location.href = '/Html/home.html';
                    }, 2000);
                } else {
                    showNotification(result.message || 'Failed to reserve table', 'error');
                }

                sendBtn.disabled = false;
                sendBtn.textContent = 'Send';
            };
        }
    }

    const contactForm = document.querySelector('.contact');
    if (contactForm && window.location.href.includes('contact.html')) {
        const sendBtn = contactForm.querySelector('.btn-send');
        if (sendBtn) {
            sendBtn.onclick = async function(e) {
                e.preventDefault();
                
                const name = document.getElementById('txtName')?.value.trim();
                const phone = document.getElementById('numphone')?.value.trim();
                const email = document.getElementById('txtMail')?.value.trim();
                const message = document.getElementById('txtMsg')?.value.trim();

                if (!name || !phone || !email || !message) {
                    showNotification('Please fill all fields', 'error');
                    return;
                }

                if (!validatePhone(phone)) {
                    showNotification('Please enter a valid phone number', 'error');
                    return;
                }

                if (!validateEmail(email)) {
                    showNotification('Please enter a valid email address', 'error');
                    return;
                }

                const contactData = {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                };

                sendBtn.disabled = true;
                sendBtn.textContent = 'Sending...';

                const result = await api.sendContact(contactData);

                if (result.success) {
                    showNotification('Message sent successfully!', 'success');
                    document.getElementById('txtName').value = '';
                    document.getElementById('numphone').value = '';
                    document.getElementById('txtMail').value = '';
                    document.getElementById('txtMsg').value = '';
                } else {
                    showNotification(result.message || 'Failed to send message', 'error');
                }

                sendBtn.disabled = false;
                sendBtn.textContent = 'Send';
            };
        }
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

