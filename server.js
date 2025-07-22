const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas URI
const uri = "mongodb+srv://xiansim0096:WlolJKiEmlpl3wrU@path1.n0htlum.mongodb.net/?retryWrites=true&w=majority&appName=Path1";

// Connect to MongoDB Atlas
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Generate unique 8-digit ID
function generateUID() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

// API to generate UID and create user
app.post('/api/generate-uid', async (req, res) => {
  try {
    let uid;
    let exists = true;

    while (exists) {
      uid = generateUID();
      exists = await User.exists({ uid });
    }

    const newUser = new User({ uid });
    await newUser.save();

    res.json({ uid });
  } catch (error) {
    console.error('Error generating UID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
