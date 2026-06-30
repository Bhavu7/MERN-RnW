// public/js/main.js
// Auto-dismiss flash messages after a few seconds
document.addEventListener('DOMContentLoaded', () => {
  const flashes = document.querySelectorAll('.slide-down');
  flashes.forEach((el) => {
    setTimeout(() => {
      el.style.transition = 'opacity 0.4s ease';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 400);
    }, 3000);
  });
});
