import expo from '../config/expo.js';
import User from '../models/user.js';

// msg Config
// sound: 'default',
// title: notification.title,
// body: notification.body,
export default async function sendNotification(receiverId, messageConfig) {
  const user = await User.findById(receiverId);

  // console.log('user', user);

  const messages = user.pushTokens.map((pushToken) => ({
    to: pushToken,
    ...messageConfig,
  }));

  // console.log('messages', messages);

  const chunks = expo.chunkPushNotifications(messages);

  const tickets = [];

  await (async () => {
    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log('ticketChunk', ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error('messageNotification', error);
        // throw error;
      }
    }
  })();

  const receiptIds = [];
  for (let ticket of tickets) {
    // NOTE: Not all tickets have IDs; for example, tickets for notifications
    // that could not be enqueued will have error information and no receipt ID.
    if (ticket.status === 'ok') {
      console.log('ticket.status === ok', ticket);
      receiptIds.push(ticket.id);
    } else {
      await handleDeviceNotRegisteredError(...ticket);
    }
  }

  // check receipt
  setTimeout(() => {
    // console.log('checkReceiptTask');
    checkReceiptTask(receiptIds);
    // }, 5 * 1000);
  }, 30 * 60 * 1000);
}

function checkReceiptTask(receiptIds) {
  console.log('inside checkReceiptTask');
  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    for (let chunk of receiptIdChunks) {
      try {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        console.log('receipts', receipts);

        for (let receiptId in receipts) {
          const { status, message, details } = receipts[receiptId];
          await handleDeviceNotRegisteredError(status, message, details);
        }
      } catch (error) {
        console.error('checkReceiptTask', error);
        // throw error;
      }
    }
  })();
}

async function handleDeviceNotRegisteredError(status, message, details) {
  if (status === 'error' && details?.error === 'DeviceNotRegistered') {
    const token = extractErrorPushToken(message);
    await User.updateMany(
      { pushTokens: { $in: [token] } },
      { $pull: { pushTokens: token } }
    );
  }
}

function extractErrorPushToken(message) {
  const tokenStartIndex = message.indexOf('"');
  const tokenEndIndex = message.lastIndexOf('"');
  const token = message.substring(tokenStartIndex + 1, tokenEndIndex);
  return token;
}
