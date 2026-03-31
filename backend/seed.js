const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./database');
const Product = require('./models/Product');

dotenv.config();

const SAMPLE_PRODUCTS = [
  {
    id: '1', title: 'Vintage Film Camera', description: 'Beautiful Canon AE-1 with a 50mm lens. Works perfectly.',
    category: 'Electronics', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    owner: 'Alex Rivers', lookingFor: 'Mechanical Keyboard or iPad', condition: 'Like New', price: '150'
  },
  {
    id: '2', title: 'Electric Guitar', description: 'Fender Squier Stratocaster. Great for beginners.',
    category: 'Music', image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&q=80&w=800',
    owner: 'Sam Smith', lookingFor: 'Acoustic Guitar', condition: 'Good', yearsOld: '3'
  },
  {
    id: '3', title: 'Smart Watch Series 7', description: '45mm Aluminum Case with Midnight Sport Band.',
    category: 'Electronics', image: 'https://images.unsplash.com/photo-1544117518-30df578096a4?auto=format&fit=crop&q=80&w=800',
    owner: 'Jordan Lee', lookingFor: 'AirPods Pro 2', condition: 'New'
  },
  {
    id: '4', title: 'Designer Leather Jacket', description: 'Genuine leather, size M. Barely worn.',
    category: 'Fashion', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
    owner: 'Taylor Swift', lookingFor: 'Designer Boots size 8', condition: 'Like New'
  },
  {
    id: '10', title: 'Digital Air Fryer', description: '6-quart air fryer, perfect for quick and healthy meals.',
    category: 'Kitchen', image: 'https://images.unsplash.com/photo-1626885901323-9ee821bb4632?auto=format&fit=crop&q=80&w=800',
    owner: 'Sara Connor', lookingFor: 'A good coffee grinder', condition: 'Good', price: '60'
  },
  {
    id: '11', title: 'iPhone 14 Pro - 256GB', description: 'Used for a year, 95% battery health. Midnight color.',
    category: 'Mobiles', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
    owner: 'Chris Lee', lookingFor: 'Samsung Galaxy S23 Ultra', condition: 'Like New'
  },
  {
    id: '12', title: 'M2 MacBook Air', description: '16GB RAM, 512GB SSD. Flawless condition with box.',
    category: 'Laptop', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    owner: 'Emma Watson', lookingFor: 'iPad Pro with Magic Keyboard', condition: 'New'
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // Clear existing products
    console.log('🗑️  Cleared existing products');
    
    await Product.insertMany(SAMPLE_PRODUCTS);
    console.log('✅ Seeded new sample products into MongoDB!');
    
    process.exit(0);
  } catch (error) {
    console.error(`❌ Setup Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
