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
        // Continue without image if there's an error
      }
    }

    console.log('Showing notification with options:', JSON.stringify(notificationOptions));
    
    event.waitUntil(
      self.registration.showNotification(
        options.title || 'Ojass Notification',
        notificationOptions
      )
    );
  } catch (error) {
    console.error('Error in push event handler:', error);
    // Fallback notification
    event.waitUntil(
      self.registration.showNotification('Ojass Notification', {
        body: 'New notification from Ojass',
        icon: new URL('/ojasslogo.webp', self.registration.scope).href
      })
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked');
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || 'https://ojass.org/dashboard/notifications';

  event.waitUntil(
    clients.openWindow(urlToOpen)
      .then(() => console.log('Opened window successfully'))
      .catch(error => console.error('Error opening window:', error))
  );
}); 