const amqp = require('amqplib');

let connection;
let channel;

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertQueue('notifications', { durable: true });
    console.log("✅ RabbitMQ connected and queue asserted");
  } catch (error) {
    console.error("❌ Failed to connect to RabbitMQ:", error);
    process.exit(1); 
  }
}

function getChannel() {
  if (!channel) throw new Error("RabbitMQ channel not initialized.");
  return channel;
}

module.exports = { connectRabbitMQ, getChannel };
