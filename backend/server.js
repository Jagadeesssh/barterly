const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database');
const Product = require('./models/Product');
const Swap = require('./models/Swap');
const Conversation = require('./models/Conversation');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'ds95rtu22',
  api_key: '359627255351593',
  api_secret: 'yBAZuQSTWD64LI4sl6Gn_NRlZr0'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'barterly_uploads',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});
const upload = multer({ storage });

// Connect to Database
connectDB();

const app = express();

// Increase JSON limit because we are sending Base64 images directly
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Health Check
app.get('/api/health', (req, res) => res.json({ status: 'API is running' }));

// --- AUTH API ---
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecret_fallback_key', { expiresIn: '30d' });
};

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- UPLOAD API ---
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image provided" });
  }
  res.json({ imageUrl: req.file.path });
});

// --- PRODUCTS API ---

// 1. Get all products (Latest first)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Add a new product listing
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: req.params.id });
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- SWAPS API ---
app.get('/api/swaps', async (req, res) => {
  try {
    const swaps = await Swap.find().sort({ createdAt: -1 });
    res.json(swaps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/swaps', async (req, res) => {
  try {
    const newSwap = new Swap(req.body);
    const savedSwap = await newSwap.save();
    res.status(201).json(savedSwap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/swaps/:id', async (req, res) => {
  try {
    const deletedSwap = await Swap.findOneAndDelete({ id: req.params.id });
    if (!deletedSwap) return res.status(404).json({ message: "Swap not found" });
    res.json({ message: "Swap deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- MESSAGES API ---
app.get('/api/conversations', async (req, res) => {
  try {
    const convs = await Conversation.find().sort({ lastUpdated: -1 });
    res.json(convs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create OR Push to a conversation
app.post('/api/conversations', async (req, res) => {
  const { id, productId, owner, msg } = req.body;
  try {
    let conv = await Conversation.findOne({ id });

    if (conv) {
      conv.messages.push(msg);
      conv.lastUpdated = msg.timestamp;
      await conv.save();
      return res.status(200).json(conv);
    } else {
      const newConv = new Conversation({
        id,
        productId,
        owner,
        messages: [msg],
        lastUpdated: msg.timestamp
      });
      await newConv.save();
      return res.status(201).json(newConv);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
