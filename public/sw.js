self.addEventListener('push', function(event) {
  try {
    console.log('Push event received');
    const options = event.data.json();
    
    // Strip HTML tags using regex since DOM manipulation isn't available in Service Worker
    const plainText = options.body.replace(/<[^>]*>/g, '');
    
    // Get the absolute URL for the icon
    const baseUrl = self.registration.scope;
    const iconUrl = new URL('/ojasslogo.webp', baseUrl).href;
    
    // Ensure we have all required notification options
    const notificationOptions = {
      body: plainText,
      icon: iconUrl,
      badge: iconUrl,
      vibrate: [200, 100, 200],
      tag: 'ojass-notification',
      renotify: true,
      requireInteraction: true,
      data: {
        url: options.data.url || 'https://ojass.org/dashboard/notifications',
        timestamp: Date.now()
      }
    };

    // Handle image if it exists
    if (options.image) {
      try {
        // If image is a base64 string, use it directly
        if (options.image.startsWith('data:image')) {
          notificationOptions.image = options.image;
        } else {
          // Otherwise, convert to absolute URL
          notificationOptions.image = new URL(options.image, baseUrl).href;
        }
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }

    console.log('Showing notification with options:', JSON.stringify(notificationOptions));
    event.waitUntil(
      self.registration.showNotification(options.title || 'Ojass Notification', notificationOptions)
        .then(() => console.log('Notification shown successfully'))
        .catch(error => console.error('Error showing notification:', error))
    );
  } catch (error) {
    console.error('Error in push event handler:', error);
  }
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked');
  event.notification.close();
  
  const urlToOpen = event.notification.data.url || 'https://ojass.org/dashboard/notifications';

  event.waitUntil(
    clients.openWindow(urlToOpen)
      .then(() => console.log('Opened window successfully'))
      .catch(error => console.error('Error opening window:', error))
  );
}); 