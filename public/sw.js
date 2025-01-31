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
      tag: Date.now().toString(),
      renotify: true,
      requireInteraction: true,
      data: {
        url: options.data?.url || `https://ojass.org/dashboard/notifications?t=${Date.now()}`,
        timestamp: Date.now()
      }
    };

    // Only add image if it's a valid HTTPS URL
    if (options.image && typeof options.image === 'string') {
      try {
        console.log('Processing image:', options.image);
        
        // Only accept HTTPS URLs
        if (options.image.startsWith('https://')) {
          // Add cache buster to image URL
          const imageCacheBuster = options.image.includes('?') ? '&' : '?';
          notificationOptions.image = `${options.image}${imageCacheBuster}t=${Date.now()}`;
          console.log('Added image to notification:', notificationOptions.image);
        } else {
          console.log('Skipping non-HTTPS image URL');
        }
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }

    const showNotificationPromise = self.registration.showNotification(
      options.title || 'Ojass Notification',
      notificationOptions
    ).catch(error => {
      console.error('Error showing notification:', error);
      delete notificationOptions.image;
      return self.registration.showNotification(
        options.title || 'Ojass Notification',
        notificationOptions
      );
    });

    event.waitUntil(showNotificationPromise);

  } catch (error) {
    console.error('Error in push event handler:', error);
    event.waitUntil(
      self.registration.showNotification('Ojass Notification', {
        body: 'New notification from Ojass',
        icon: new URL('/ojasslogo.webp', self.registration.scope).href,
        data: {
          url: `https://ojass.org/dashboard/notifications?t=${Date.now()}`
        }
      })
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  const clickPromise = new Promise(async (resolve) => {
    try {
      console.log('Notification clicked');
      event.notification.close();
      
      // Add timestamp to URL to prevent caching
      const baseUrl = event.notification.data?.url || 'https://ojass.org/dashboard/notifications';
      const urlToOpen = baseUrl.includes('?') 
        ? `${baseUrl}&t=${Date.now()}` 
        : `${baseUrl}?t=${Date.now()}`;
      
      // Clear any existing cache for the notifications page
      if ('caches' in self) {
        try {
          await caches.delete('notification-cache');
        } catch (err) {
          console.error('Error clearing cache:', err);
        }
      }

      // Focus on existing window if available
      const windowClients = await clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      });
      
      for (let client of windowClients) {
        if (client.url.includes(baseUrl) && 'focus' in client) {
          await client.focus();
          // Reload the page to get fresh data
          await client.navigate(urlToOpen);
          resolve();
          return;
        }
      }
      
      // If no existing window, open new one
      await clients.openWindow(urlToOpen);
      resolve();
    } catch (error) {
      console.error('Error handling notification click:', error);
      resolve();
    }
  });

  event.waitUntil(clickPromise);
});

self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
  // Clear any existing caches
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      })
    ])
  );
}); 