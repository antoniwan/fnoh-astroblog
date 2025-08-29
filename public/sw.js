// Empty service worker to prevent 404 errors
// This file exists solely to prevent browser requests from failing
// No actual service worker functionality is implemented

// Version for cache busting
const VERSION = '1.0.0';

// Install event - do nothing
self.addEventListener('install', (event) => {
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event - do nothing
self.addEventListener('activate', (event) => {
  // Claim all clients
  event.waitUntil(self.clients.claim());
});

// Fetch event - do nothing, let browser handle normally
self.addEventListener('fetch', (event) => {
  // Do not intercept any requests
  // Let the browser handle all fetches normally
});
