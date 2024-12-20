const admin = require("firebase-admin");





const sendNotification = async (token, title, body) => {
  const message = {
    notification: { title, body },
    token
  };

  try {
    await admin.messaging().send(message);
    console.log("Notification sent successfully");
  } catch (error) {
    console.log("Error sending notification: ", error);
  }
}

module.exports = sendNotification;