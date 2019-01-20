self.addEventListener('install', function(event) {
  self.skipWaiting();
});

// self.addEventListener('message', event => {
//   if (!event.data) {
//     return;
//   }

//   switch (event.data) {
//     case 'skipWaiting':
//       self.skipWaiting().then(() => {});
//       break;
//     default:
//       // NOOP
//       break;
//   }
// });
