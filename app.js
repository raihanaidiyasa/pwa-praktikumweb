// Registrasi Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
          .then(registration => {
              console.log('Service Worker registered successfully:', registration.scope);
          })
          .catch(error => {
              console.log('Service Worker registration failed:', error);
          });
  });
}

// Tombol Install PWA
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
          console.log('Pengguna menerima instalasi');
      } else {
          console.log('Pengguna menolak instalasi');
      }
      
      deferredPrompt = null;
      installBtn.style.display = 'none';
  }
});