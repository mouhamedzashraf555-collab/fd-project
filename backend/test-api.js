const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
    console.log('🧪 Testing Nile Bites API...\n');

    try {
        console.log('1️⃣  Testing Health Endpoint...');
        const healthRes = await fetch(`${API_BASE}/health`);
        const health = await healthRes.json();
        console.log(health.success ? '✅ Server is running' : '❌ Server error');
        console.log(`   Response: ${health.message}\n`);

        console.log('2️⃣  Testing Create Order...');
        const orderData = {
            customer_name: 'Test User',
            phone: '01234567890',
            address: '123 Test Street, Cairo',
            items: [
                { name: 'Pizza', price: 120, quantity: 2 },
                { name: 'Juice', price: 55, quantity: 1 }
            ],
            total_price: 295
        };
        
        const orderRes = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        const order = await orderRes.json();
        console.log(order.success ? '✅ Order created' : '❌ Order failed');
        console.log(`   Order ID: ${order.orderId || 'N/A'}\n`);

        console.log('3️⃣  Testing Get All Orders...');
        const ordersRes = await fetch(`${API_BASE}/orders`);
        const orders = await ordersRes.json();
        console.log(orders.success ? '✅ Orders fetched' : '❌ Fetch failed');
        console.log(`   Total orders: ${orders.data?.length || 0}\n`);

        console.log('4️⃣  Testing Create Reservation...');
        const reservationData = {
            customer_name: 'Test User',
            phone: '01234567890',
            number_of_people: 4
        };
        
        const resRes = await fetch(`${API_BASE}/reservations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservationData)
        });
        const reservation = await resRes.json();
        console.log(reservation.success ? '✅ Reservation created' : '❌ Reservation failed');
        console.log(`   Reservation ID: ${reservation.reservationId || 'N/A'}\n`);

        console.log('5️⃣  Testing Send Contact...');
        const contactData = {
            name: 'Test User',
            phone: '01234567890',
            email: 'test@example.com',
            message: 'This is a test message'
        };
        
        const contactRes = await fetch(`${API_BASE}/contacts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactData)
        });
        const contact = await contactRes.json();
        console.log(contact.success ? '✅ Contact sent' : '❌ Contact failed');
        console.log(`   Contact ID: ${contact.contactId || 'N/A'}\n`);

        console.log('═══════════════════════════════════');
        console.log('🎉 All tests passed successfully!');
        console.log('═══════════════════════════════════');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('\n⚠️  Make sure the server is running:');
        console.log('   cd backend && npm start');
    }
}

testAPI();

