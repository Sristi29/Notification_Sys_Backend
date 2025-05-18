
async function sendNotification(notification) {
  const { name, email, message, type } = notification;

  if (type === 'email') {
    console.log(`📧 Sent email to ${name} <${email}> with message: "${message}"`);
  } else {
    throw new Error("Unsupported notification type");
  }
}

async function sendNotificationWithRetry(notification, retries = 3, delay = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`📧 Attempt ${attempt} to send email to ${notification.email}`);
      
      if (attempt < 3) throw new Error("Temporary email service failure");

      await sendNotification(notification);
      console.log(`✅ Notification sent! Sent email to user ${notification.name}`);
      break;
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries) {
        console.error("❌ All retry attempts failed.");
      } else {
        await new Promise(res => setTimeout(res, delay));
      }
    }
  }
}

module.exports = { sendNotificationWithRetry };
