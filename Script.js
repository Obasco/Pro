function updateTime() {
  const el = document.querySelector('[data-testid="test-user-time"]');
  if (el) {
    el.textContent = Date.now().toString();
  }
}

// Run immediately
updateTime();

// Update every 1 second (1000 ms)
setInterval(updateTime, 1000);
