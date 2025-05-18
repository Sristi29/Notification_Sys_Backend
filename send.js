const amqp = require('amqplib');

async function sendTestMessage() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'notificationsQueue';
  await channel.assertQueue(queue, { durable: true });

  const msg = JSON.stringify({
    userId: 'Sristi',
    type: 'email',
    message: 'Welcome Sristi!'
  });

  channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
  console.log("✅ Test message sent");

  await channel.close();
  await connection.close();
}

sendTestMessage().catch(console.error);
