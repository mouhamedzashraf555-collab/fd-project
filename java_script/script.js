    const btnCart = document.querySelector('.btn-cart');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

// =======================
// Load / Save Cart
// =======================
function saveCartToStorage() {
    if (!cart) return;
    try {
        localStorage.setItem("cartData", cart.innerHTML);
    } catch (e) {
        console.error("Save failed:", e);
    }
}

function loadCartFromStorage() {
    if (!cart) return;
    let storedCart = localStorage.getItem("cartData");
    if (storedCart) {
        cart.innerHTML = storedCart;
        loadContent(); // re-bind listeners
        updateTotal();
        updateCartCount();
    }
}

// =======================
// Cart Overlay Toggle
// =======================
if (btnCart && cart) {
    btnCart.addEventListener('click', () => {
        cart.classList.add('cart-active');
    });
}

// Delegated close button (works even if HTML is reloaded)
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === "cart-close") {
        cart.classList.remove('cart-active');
    }
});

// =======================
document.addEventListener('DOMContentLoaded', () => {
    loadFood();
    loadCartFromStorage();

    // Clear Cart button
    let clearBtn = document.getElementById("clear-cart");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            let cartContent = document.querySelector(".cart-content");
            if (cartContent) cartContent.innerHTML = "";
            updateTotal();
            updateCartCount();
            saveCartToStorage();
        });
    }
});

function loadFood() {
    loadContent();
}

function loadContent() {
    // Remove buttons
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn) => {
        btn.onclick = removeItem;
    });

    // Quantity inputs
    let qtyInputs = document.querySelectorAll('.cart-quantity');
    qtyInputs.forEach((input) => {
        input.onchange = changeQty;
    });

    // Add to cart buttons
    let addBtns = document.querySelectorAll('.add-cart');
    addBtns.forEach((btn) => {
        btn.onclick = addCart;
    });

    updateTotal();
    updateCartCount();
}

// =======================
// Cart Actions
// =======================
function removeItem() {
    const cartBox = this.closest('.cart-box');
    if (cartBox) cartBox.remove();
    updateTotal();
    updateCartCount();
    saveCartToStorage();
}

function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    updateTotal();
    updateCartCount();
    saveCartToStorage();
}

function addCart() {
    let food = this.parentElement;
    let titleEl = food.querySelector('.food-title');
    let priceEl = food.querySelector('.food-price');
    let imgEl = food.querySelector('.food-img');

    if (!titleEl || !priceEl) return;

    let title = titleEl.innerText.trim();
    let price = parseFloat(priceEl.innerText.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
    let imgSrc = imgEl ? imgEl.src : '';

    // check if item exists
    let cartItems = document.querySelectorAll('.cart-box');
    for (let item of cartItems) {
        let itemTitle = item.querySelector('.cart-food-title');
        if (itemTitle && itemTitle.innerText.trim() === title) {
            let qty = item.querySelector('.cart-quantity');
            qty.value = parseInt(qty.value) + 1;
            updateTotal();
            updateCartCount();
            saveCartToStorage();
            return;
        }
    }

    // create new item
    let newProduct = document.createElement('div');
    newProduct.className = 'cart-box';
    newProduct.innerHTML = `
        <img src="${imgSrc}" class="cart-img">
        <div class="detail-box">
            <div class="cart-food-title">${title}</div>
            <div class="cart-price">${price} EGP</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="cart-remove">X</i>
    `;

    let cartContent = document.querySelector('.cart-content');
    if (cartContent) {
        cartContent.appendChild(newProduct);
    } else {
        cart.appendChild(newProduct);
    }

    loadContent();
    saveCartToStorage();
}

// =======================
// Totals & Counters
// =======================
function updateTotal() {
    let cartItems = document.querySelectorAll('.cart-box');
    let total = 0;

    cartItems.forEach(product => {
        let priceEl = product.querySelector('.cart-price');
        let qtyEl = product.querySelector('.cart-quantity');

        let price = 0;
        if (priceEl) {
            let cleaned = priceEl.innerText.replace(/[^0-9.,]/g, '').replace(',', '.');
            price = parseFloat(cleaned) || 0;
        }

        let qty = qtyEl ? parseInt(qtyEl.value) : 1;
        if (isNaN(qty) || qty < 1) qty = 1;

        total += price * qty;
    });

    let totalEl = document.querySelector('.total-price');
    if (totalEl) {
        totalEl.textContent = total.toFixed(2) + " EGP";
    }
}

function updateCartCount() {
    let cartItems = document.querySelectorAll('.cart-box');
    let count = 0;

    cartItems.forEach(product => {
        let qtyEl = product.querySelector('.cart-quantity');
        let qty = qtyEl ? parseInt(qtyEl.value) : 1;
        count += isNaN(qty) ? 0 : qty;
    });

    // ID
    let countId = document.getElementById('cart-count');
    if (countId) countId.textContent = count;

    // Class
    let countEls = document.querySelectorAll('.cart-count');
    countEls.forEach(el => el.textContent = count);
}
function saveOrder(items, totalPrice) {

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
        id: orders.length + 1,
        items: items,
        total: totalPrice,
        date: new Date().toLocaleString()
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
}
