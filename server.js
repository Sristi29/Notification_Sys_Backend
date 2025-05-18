const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectRabbitMQ } = require('./rabbitmq'); 
dotenv.config();

const app = express();
app.use(express.json());

const notificationRoutes = require('./routes/notifications');
app.use('/notifications', notificationRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

app.get('/', (req, res) => {
  res.send('📢 Notification Service is running');
});

const PORT = process.env.PORT || 5000;

connectRabbitMQ()
  .then(() => {
    console.log('🐇 RabbitMQ connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to RabbitMQ:', err);
  });
