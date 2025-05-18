
const amqp = require('amqplib');
const { sendNotificationWithRetry } = require('./notificationService');

const users = {
  "Sristi": { name: "Sristi", email: "Sristi@example.com" },
  "Srijan": { name: "Srijan", email: "Srijan@example.com" },
};

async function startConsumer() {
  try {
    console.log("🔄 Connecting to RabbitMQ...");
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'notificationsQueue';
    await channel.assertQueue(queue, { durable: true });

    console.log(`✅ Connected and listening on queue: ${queue}`);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        console.log("🛎️ Message received:", data);

        const userInfo = users[data.userId];
        if (!userInfo) {
          console.error(`❌ User not found for userId: ${data.userId}`);
          return channel.ack(msg);
        }

        const notification = {
          name: userInfo.name,
          email: userInfo.email,
          message: data.message,
          type: data.type
        };

        console.log("🚀 Sending notification:", notification);
        await sendNotificationWithRetry(notification);
        channel.ack(msg);
      }
    });

  } catch (err) {
    console.error("❌ Failed to start consumer:", err.message);
  }
}

startConsumer();
