// Автоматическая загрузка сохраненной игры
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('swGameState')) {
    const faction = JSON.parse(localStorage.getItem('swGameState')).faction;
    if (faction && window.location.pathname.endsWith('index.html')) {
      window.location.href = 'game.html';
    }
  }
});

// Кнопка "Продолжить"
document.getElementById('load-game')?.addEventListener('click', () => {
  window.location.href = 'game.html';
});
