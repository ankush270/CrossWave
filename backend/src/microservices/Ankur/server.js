const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');
const chatRoutes = require('./Orders/routes/chat.routes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 