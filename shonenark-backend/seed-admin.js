const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function createAdminUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shonenark', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected');

        // Check if admin already exists
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@shonenark.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists');
            process.exit(0);
        }

        // Hash password
        const adminPassword = process.env.ADMIN_PASSWORD || 'ShonenArkAdmin!2025';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        // Create admin user
        const admin = new User({
            username: 'Admin',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();
        console.log('✅ Admin user created successfully');
        console.log(`   Email: ${adminEmail}`);
        console.log(`   Password: ${adminPassword}`);

        // Create AI user for automated theories
        const aiEmail = 'ai@shonenark.com';
        const existingAI = await User.findOne({ email: aiEmail });

        if (!existingAI) {
            const aiUser = new User({
                username: 'AI Generator',
                email: aiEmail,
                password: hashedPassword,
                role: 'admin'
            });
            await aiUser.save();
            console.log('✅ AI user created successfully');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        process.exit(1);
    }
}

createAdminUser();
