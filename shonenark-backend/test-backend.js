const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
let authToken = '';

async function testBackend() {
    console.log('🧪 Starting Backend Tests...\n');

    try {
        // Test 1: Health Check
        console.log('1️⃣ Testing Health Check...');
        const health = await axios.get('http://localhost:5000/');
        console.log('✅ Health Check:', health.data.message);
        console.log('');

        // Test 2: Register User
        console.log('2️⃣ Testing User Registration...');
        try {
            const registerRes = await axios.post(`${BASE_URL}/auth/register`, {
                username: 'testuser',
                email: 'test@shonenark.com',
                password: 'Test123!'
            });
            console.log('✅ User Registered:', registerRes.data.user.email);
            authToken = registerRes.data.token;
        } catch (err) {
            if (err.response?.data?.message === 'User already exists') {
                console.log('⚠️  User already exists, proceeding to login...');
            } else {
                throw err;
            }
        }
        console.log('');

        // Test 3: Login
        console.log('3️⃣ Testing Login...');
        const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'admin@shonenark.com',
            password: 'ShonenArkAdmin!2025'
        });
        console.log('✅ Login Successful');
        console.log('   User:', loginRes.data.user.email);
        console.log('   Role:', loginRes.data.user.role);
        authToken = loginRes.data.token;
        console.log('');

        // Test 4: Get Current User
        console.log('4️⃣ Testing Get Current User...');
        const meRes = await axios.get(`${BASE_URL}/auth/me`, {
            headers: { 'x-auth-token': authToken }
        });
        console.log('✅ Current User:', meRes.data.email);
        console.log('');

        // Test 5: Create Anime
        console.log('5️⃣ Testing Anime Sync...');
        const animeRes = await axios.post(`${BASE_URL}/anime/sync`, {
            title: 'Jujutsu Kaisen Season 3',
            description: 'The highly anticipated third season',
            status: 'NOT_YET_RELEASED',
            releaseDate: '2025-03-15'
        });
        console.log('✅ Anime Created:', animeRes.data.title);
        const animeId = animeRes.data._id;
        console.log('');

        // Test 6: Create Theory
        console.log('6️⃣ Testing Theory Creation...');
        const theoryRes = await axios.post(`${BASE_URL}/theories`, {
            title: 'Test Theory: Gojo\'s Return',
            theoryText: 'This is a test theory about Gojo potentially returning in Season 3.',
            animeId: animeId,
            category: 'Prediction',
            summary: 'A theory about Gojo\'s return'
        }, {
            headers: { 'x-auth-token': authToken }
        });
        console.log('✅ Theory Created:', theoryRes.data.title);
        console.log('');

        // Test 7: Get All Theories
        console.log('7️⃣ Testing Get All Theories...');
        const theoriesRes = await axios.get(`${BASE_URL}/theories`);
        console.log('✅ Theories Retrieved:', theoriesRes.data.length, 'theories');
        console.log('');

        // Test 8: Webhook Test (n8n simulation)
        console.log('8️⃣ Testing n8n Webhook...');
        const webhookRes = await axios.post(`${BASE_URL}/theories/webhook`, {
            title: 'AI Generated Theory: Attack on Titan Finale',
            theoryText: 'This is an AI-generated theory about the final season.',
            animeTitle: 'Attack on Titan',
            isAiGenerated: true
        });
        console.log('✅ Webhook Theory Created:', webhookRes.data.message);
        console.log('');

        console.log('🎉 All Tests Passed!\n');
        console.log('📊 Summary:');
        console.log('   ✅ Health Check');
        console.log('   ✅ User Registration');
        console.log('   ✅ User Login');
        console.log('   ✅ Get Current User');
        console.log('   ✅ Anime Sync');
        console.log('   ✅ Theory Creation');
        console.log('   ✅ Get Theories');
        console.log('   ✅ Webhook Integration');

    } catch (error) {
        console.error('❌ Test Failed:', error.response?.data || error.message);
        process.exit(1);
    }
}

// Run tests
testBackend();
