const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const wishRoutes = require('./routes/wishRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/wishes', wishRoutes);
app.use('/api/feedback', feedbackRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected ✅');
  app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
})
.catch((err) => console.error('MongoDB connection error:', err));
