const API_BASE_URL = 'http://localhost:3000/api';

console.log('API.js loaded');
console.log('API Base URL:', API_BASE_URL);

const api = {
    async createOrder(orderData) {
        console.log('createOrder called with:', orderData);
        try {
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating order:', error);
            return { success: false, message: 'Network error' };
        }
    },

    async getOrders() {
        try {
            const response = await fetch(`${API_BASE_URL}/orders`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching orders:', error);
            return { success: false, message: 'Network error' };
        }
    },

    async createReservation(reservationData) {
        try {
            const response = await fetch(`${API_BASE_URL}/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating reservation:', error);
            return { success: false, message: 'Network error' };
        }
    },

    async getReservations() {
        try {
            const response = await fetch(`${API_BASE_URL}/reservations`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching reservations:', error);
            return { success: false, message: 'Network error' };
        }
    },

    async sendContact(contactData) {
        try {
            const response = await fetch(`${API_BASE_URL}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error sending contact:', error);
            return { success: false, message: 'Network error' };
        }
    },

    async checkHealth() {
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            return await response.json();
        } catch (error) {
            console.error('Error checking health:', error);
            return { success: false, message: 'Server is offline' };
        }
    }
};

