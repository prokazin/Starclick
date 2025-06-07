// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

// Состояние игры
const game = {
  credits: 0,
  level: 1,
  clickPower: 1
};

// Элементы DOM
const elements = {
  credits: document.getElementById('credits'),
  level: document.getElementById('level'),
  clickButton: document.getElementById('clickButton'),
  tgUserId: document.getElementById('tg-user-id'),
  rewardButton: document.getElementById('reward-button')
};

// Инициализация игры
function initGame() {
  // Показываем данные пользователя Telegram
  if (tg.initDataUnsafe.user) {
    elements.tgUserId.textContent = tg.initDataUnsafe.user.id;
    tg.expand(); // Развернуть WebApp на весь экран
  }

  // Обработчик клика
  elements.clickButton.addEventListener('click', () => {
    game.credits += game.clickPower;
    updateGame();
    
    // Проверка уровня
    if (game.credits >= game.level * 100) {
      game.level++;
      updateGame();
      checkReward();
    }
  });

  // Кнопка получения награды
  elements.rewardButton.addEventListener('click', () => {
    sendReward(tg.initDataUnsafe.user.id, 50);
  });

  updateGame();
}

// Обновление интерфейса
function updateGame() {
  elements.credits.textContent = game.credits;
  elements.level.textContent = game.level;
}

// Проверка награды за уровень
function checkReward() {
  if (game.level % 5 === 0) {
    const reward = game.level * 10;
    sendReward(tg.initDataUnsafe.user.id, reward);
    alert(`Поздравляем! Вы получили ${reward} кредитов за достижение уровня ${game.level}`);
  }
}

// Отправка награды на сервер
function sendReward(userId, amount) {
  if (!userId) return;
  
  const url = `https://test.adsgram.ai/reward?userid=${userId}&amount=${amount}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Награда отправлена:', data);
      game.credits += amount;
      updateGame();
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}

// Запуск игры при загрузке
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').style.display = 'none';
    initGame();
  }, 1500);
});
