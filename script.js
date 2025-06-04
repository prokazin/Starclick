// Состояние игры
let gameState = {
  credits: 0,
  droids: 0,
  ships: 0,
  jedi: 0,
  deathStars: 0
};

// Элементы DOM
const creditsEl = document.getElementById('credits');
const droidsEl = document.getElementById('droids');
const shipsEl = document.getElementById('ships');
const clickButton = document.getElementById('clickButton');
const buyDroidButton = document.getElementById('buyDroid');
const buyShipButton = document.getElementById('buyShip');
const buyJediButton = document.getElementById('buyJedi');
const buyDeathStarButton = document.getElementById('buyDeathStar');
const closeButton = document.getElementById('closeButton');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Загрузка сохранения
function loadGame() {
  const saved = localStorage.getItem('starWarsClicker');
  if (saved) {
    gameState = JSON.parse(saved);
    updateUI();
  }
}

// Сохранение игры
function saveGame() {
  localStorage.setItem('starWarsClicker', JSON.stringify(gameState));
}

// Обновление интерфейса
function updateUI() {
  creditsEl.textContent = gameState.credits.toFixed(1);
  droidsEl.textContent = gameState.droids;
  shipsEl.textContent = gameState.ships;
  
  buyDroidButton.disabled = gameState.credits < 10;
  buyShipButton.disabled = gameState.credits < 50;
  buyJediButton.disabled = gameState.credits < 100;
  buyDeathStarButton.disabled = gameState.credits < 1000;
  
  buyDroidButton.textContent = `Купить дроида (10💰) (${gameState.droids})`;
  buyShipButton.textContent = `Купить корабль (50💰) (${gameState.ships})`;
  buyJediButton.textContent = `Нанять джедая (100💰) (${gameState.jedi})`;
  buyDeathStarButton.textContent = `Построить Звезду Смерти (1000💰) (${gameState.deathStars})`;
}

// Клик по мечу
clickButton.addEventListener('click', () => {
  gameState.credits += 1 + gameState.ships * 0.5 + gameState.jedi * 2 + gameState.deathStars * 10;
  updateUI();
  saveGame();
});

// Покупки
buyDroidButton.addEventListener('click', () => {
  if (gameState.credits >= 10) {
    gameState.credits -= 10;
    gameState.droids += 1;
    updateUI();
    saveGame();
  }
});

buyShipButton.addEventListener('click', () => {
  if (gameState.credits >= 50) {
    gameState.credits -= 50;
    gameState.ships += 1;
    updateUI();
    saveGame();
  }
});

buyJediButton.addEventListener('click', () => {
  if (gameState.credits >= 100) {
    gameState.credits -= 100;
    gameState.jedi += 1;
    updateUI();
    saveGame();
  }
});

buyDeathStarButton.addEventListener('click', () => {
  if (gameState.credits >= 1000) {
    gameState.credits -= 1000;
    gameState.deathStars += 1;
    updateUI();
    saveGame();
  }
});

// Переключение вкладок
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

// Проверка WebApp Telegram
if (window.Telegram?.WebApp) {
  closeButton.style.display = 'block';
  window.Telegram.WebApp.expand();
}

// Закрытие WebApp
closeButton.addEventListener('click', () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.close();
  }
});

// Пассивный доход
setInterval(() => {
  if (gameState.droids > 0) {
    gameState.credits += gameState.droids * 0.1;
    updateUI();
    saveGame();
  }
}, 1000);

// Инициализация
loadGame();
