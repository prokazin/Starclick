// Состояние игры
const game = {
  credits: 0,
  droids: 0,
  ships: 0,
  jedi: 0,
  deathStars: 0,
  perClick: 1,
  perSecond: 0
};

// Элементы DOM
const elements = {
  credits: document.getElementById('credits'),
  droids: document.getElementById('droids'),
  ships: document.getElementById('ships'),
  droidCount: document.getElementById('droidCount'),
  shipCount: document.getElementById('shipCount'),
  jediCount: document.getElementById('jediCount'),
  deathStarCount: document.getElementById('deathStarCount'),
  clickButton: document.getElementById('clickButton'),
  buyDroid: document.getElementById('buyDroid'),
  buyShip: document.getElementById('buyShip'),
  buyJedi: document.getElementById('buyJedi'),
  buyDeathStar: document.getElementById('buyDeathStar'),
  tabButtons: document.querySelectorAll('.tab-button'),
  tabContents: document.querySelectorAll('.tab-content')
};

// Загрузка игры
function loadGame() {
  const saved = localStorage.getItem('starWarsClicker');
  if (saved) {
    const data = JSON.parse(saved);
    Object.assign(game, data);
    updateGame();
  }
}

// Сохранение игры
function saveGame() {
  localStorage.setItem('starWarsClicker', JSON.stringify(game));
}

// Обновление интерфейса
function updateGame() {
  elements.credits.textContent = Math.floor(game.credits);
  elements.droids.textContent = game.droids;
  elements.ships.textContent = game.ships;
  elements.droidCount.textContent = game.droids;
  elements.shipCount.textContent = game.ships;
  elements.jediCount.textContent = game.jedi;
  elements.deathStarCount.textContent = game.deathStars;

  elements.buyDroid.disabled = game.credits < 10;
  elements.buyShip.disabled = game.credits < 50;
  elements.buyJedi.disabled = game.credits < 100;
  elements.buyDeathStar.disabled = game.credits < 1000;

  game.perClick = 1 + game.ships * 0.5 + game.jedi * 2 + game.deathStars * 10;
  game.perSecond = game.droids * 0.1;
}

// Анимация клика
function createClickEffect(x, y, amount) {
  const effect = document.createElement('div');
  effect.className = 'click-effect';
  effect.textContent = `+${amount.toFixed(1)}`;
  effect.style.left = `${x}px`;
  effect.style.top = `${y}px`;
  
  // Случайное смещение
  const offsetX = (Math.random() - 0.5) * 50;
  effect.style.setProperty('--offset-x', `${offsetX}px`);
  
  document.querySelector('.main-content').appendChild(effect);
  
  setTimeout(() => {
    effect.remove();
  }, 1000);
}

// Клик по мечу
elements.clickButton.addEventListener('click', (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  game.credits += game.perClick;
  updateGame();
  saveGame();
  
  createClickEffect(
    e.clientX - rect.left + (Math.random() * 40 - 20),
    e.clientY - rect.top + (Math.random() * 40 - 20),
    game.perClick
  );
});

// Покупки
elements.buyDroid.addEventListener('click', () => {
  if (game.credits >= 10) {
    game.credits -= 10;
    game.droids += 1;
    updateGame();
    saveGame();
  }
});

elements.buyShip.addEventListener('click', () => {
  if (game.credits >= 50) {
    game.credits -= 50;
    game.ships += 1;
    updateGame();
    saveGame();
  }
});

elements.buyJedi.addEventListener('click', () => {
  if (game.credits >= 100) {
    game.credits -= 100;
    game.jedi += 1;
    updateGame();
    saveGame();
  }
});

elements.buyDeathStar.addEventListener('click', () => {
  if (game.credits >= 1000) {
    game.credits -= 1000;
    game.deathStars += 1;
    updateGame();
    saveGame();
  }
});

// Переключение вкладок
elements.tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    elements.tabButtons.forEach(btn => btn.classList.remove('active'));
    elements.tabContents.forEach(content => content.classList.remove('active'));
    
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

// Пассивный доход
setInterval(() => {
  if (game.perSecond > 0) {
    game.credits += game.perSecond;
    updateGame();
    saveGame();
  }
}, 1000);

// Инициализация
loadGame();
updateGame();
