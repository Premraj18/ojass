self.addEventListener('push', function(event) {
  try {
    console.log('Push event received');
    const options = event.data.json();
    console.log('Received push data:', options);
    
    // Strip HTML tags using regex since DOM manipulation isn't available in Service Worker
    const plainText = options.body.replace(/<[^>]*>/g, '');
    
    // Get the absolute URL for the icon
    const baseUrl = self.registration.scope;
    const iconUrl = new URL('/ojasslogo.webp', baseUrl).href;
    
    // Basic notification options without image
    const notificationOptions = {
      body: plainText,
      icon: iconUrl,
      badge: iconUrl,
      vibrate: [200, 100, 200],
      tag: 'ojass-notification',
      renotify: true,
      requireInteraction: true,
      data: {
        url: options.data?.url || 'https://ojass.org/dashboard/notifications',
        timestamp: Date.now()
      }
    };

    // Only add image if it's a valid HTTPS URL
    if (options.image && typeof options.image === 'string') {
      try {
        console.log('Processing image:', options.image);
        
        // Only accept HTTPS URLs
        if (options.image.startsWith('https://')) {
          notificationOptions.image = options.image;
          console.log('Added image to notification:', options.image);
        } else {
          console.log('Skipping non-HTTPS image URL');
        }
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }

    // Create a promise for showing the notification
    const showNotificationPromise = self.registration.showNotification(
      options.title || 'Ojass Notification',
      notificationOptions
    ).catch(error => {
      console.error('Error showing notification:', error);
      // Fallback to basic notification without image
      delete notificationOptions.image;
      return self.registration.showNotification(
        options.title || 'Ojass Notification',
        notificationOptions
      );
    });

    // Ensure the event.waitUntil gets a promise
    event.waitUntil(showNotificationPromise);

  } catch (error) {
    console.error('Error in push event handler:', error);
    // Ensure we still return a promise even if there's an error
    event.waitUntil(
      self.registration.showNotification('Ojass Notification', {
        body: 'New notification from Ojass',
        icon: new URL('/ojasslogo.webp', self.registration.scope).href
      })
    );
  }
});

// Keep message port open for click events
self.addEventListener('notificationclick', function(event) {
  const clickPromise = new Promise(async (resolve) => {
    try {
      console.log('Notification clicked');
      event.notification.close();
      
      const urlToOpen = event.notification.data?.url || 'https://ojass.org/dashboard/notifications';
      
      // Focus on existing window if available
      const windowClients = await clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      });
      
      for (let client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          await client.focus();
          resolve();
          return;
        }
      }
      
      // If no existing window, open new one
      await clients.openWindow(urlToOpen);
      resolve();
    } catch (error) {
      console.error('Error handling notification click:', error);
      resolve(); // Resolve anyway to ensure the promise completes
    }
  });

  event.waitUntil(clickPromise);
});

// Handle installation and activation
self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
}); 