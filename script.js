// Состояние игры
const game = {
  credits: 0,
  droids: 0,
  ships: 0,
  jedi: 0,
  deathStars: 0,
  faction: null,
  bonuses: {
    republic: { droidIncome: 1.2, jediCost: 0.85 },
    empire: { clickIncome: 1.25, deathStarCost: 0.8 },
    hutt: { baseIncome: 1.3, shipCost: 0.8 }
  }
};

// Элементы DOM
const elements = {
  factionScreen: document.getElementById('faction-select'),
  gameContainer: document.getElementById('game-container'),
  factionLogo: document.getElementById('faction-logo'),
  factionName: document.getElementById('faction-name'),
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

// Инициализация фракции
function initFaction(faction) {
  game.faction = faction;
  elements.factionLogo.src = `https://raw.githubusercontent.com/prokazin/Starclick/main/assets/images/${faction}.png`;
  elements.factionName.textContent = getFactionName(faction);
  localStorage.setItem('swFaction', faction);
}

function getFactionName(faction) {
  const names = {
    republic: 'Галактическая Республика',
    empire: 'Галактическая Империя',
    hutt: 'Картель Хаттов'
  };
  return names[faction] || '';
}

// Логика доходов
function calculateClickIncome() {
  let income = 1;
  income += game.ships * 0.5;
  income += game.jedi * 2;
  income += game.deathStars * 10;
  
  if (game.faction === 'empire') income *= game.bonuses.empire.clickIncome;
  if (game.faction === 'hutt') income *= game.bonuses.hutt.baseIncome;
  
  return income;
}

function calculatePassiveIncome() {
  let income = game.droids * 0.1;
  if (game.faction === 'republic') income *= game.bonuses.republic.droidIncome;
  if (game.faction === 'hutt') income *= game.bonuses.hutt.baseIncome;
  return income;
}

// Цены с учетом бонусов
function getPrices() {
  const prices = {
    droid: 10,
    ship: 50,
    jedi: 100,
    deathStar: 1000
  };
  
  if (game.faction === 'republic') prices.jedi *= game.bonuses.republic.jediCost;
  if (game.faction === 'empire') prices.deathStar *= game.bonuses.empire.deathStarCost;
  if (game.faction === 'hutt') prices.ship *= game.bonuses.hutt.shipCost;
  
  return prices;
}

// Обновление интерфейса
function updateGame() {
  const prices = getPrices();
  
  elements.credits.textContent = Math.floor(game.credits);
  elements.droids.textContent = game.droids;
  elements.ships.textContent = game.ships;
  elements.droidCount.textContent = game.droids;
  elements.shipCount.textContent = game.ships;
  elements.jediCount.textContent = game.jedi;
  elements.deathStarCount.textContent = game.deathStars;

  elements.buyDroid.disabled = game.credits < prices.droid;
  elements.buyShip.disabled = game.credits < prices.ship;
  elements.buyJedi.disabled = game.credits < prices.jedi;
  elements.buyDeathStar.disabled = game.credits < prices.deathStar;

  elements.buyDroid.querySelector('.price').textContent = prices.droid;
  elements.buyShip.querySelector('.price').textContent = prices.ship;
  elements.buyJedi.querySelector('.price').textContent = Math.floor(prices.jedi);
  elements.buyDeathStar.querySelector('.price').textContent = Math.floor(prices.deathStar);
}

// Сохранение игры
function saveGame() {
  localStorage.setItem('starWarsClicker', JSON.stringify({
    credits: game.credits,
    droids: game.droids,
    ships: game.ships,
    jedi: game.jedi,
    deathStars: game.deathStars,
    faction: game.faction
  }));
}

// Загрузка игры
function loadGame() {
  const saved = localStorage.getItem('starWarsClicker');
  if (saved) {
    const data = JSON.parse(saved);
    game.credits = data.credits || 0;
    game.droids = data.droids || 0;
    game.ships = data.ships || 0;
    game.jedi = data.jedi || 0;
    game.deathStars = data.deathStars || 0;
    if (data.faction) initFaction(data.faction);
    updateGame();
  }
}

// Анимация клика
function createClickEffect(x, y, amount) {
  const effect = document.createElement('div');
  effect.className = 'click-effect';
  effect.textContent = `+${amount.toFixed(1)}`;
  effect.style.left = `${x + (Math.random() * 100 - 50)}px`;
  effect.style.top = `${y + (Math.random() * 100 - 50)}px`;
  document.querySelector('.main-content').appendChild(effect);
  setTimeout(() => effect.remove(), 1200);
}

// Обработчики выбора фракции
document.querySelectorAll('.select-faction').forEach(button => {
  button.addEventListener('click', (e) => {
    const faction = e.target.closest('.faction').dataset.faction;
    initFaction(faction);
    elements.factionScreen.classList.add('hidden');
    elements.gameContainer.classList.remove('hidden');
  });
});

// Обработчик клика по мечу
elements.clickButton.addEventListener('click', (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  game.credits += calculateClickIncome();
  updateGame();
  saveGame();
  
  // Анимация меча
  const sword = document.querySelector('.sword-blade');
  sword.style.transform = 'scaleY(0.95)';
  setTimeout(() => sword.style.transform = 'scaleY(1)', 100);
  
  // 3 эффекта клика
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      createClickEffect(x, y, calculateClickIncome() / 3);
    }, i * 150);
  }
});

// Обработчики покупок
elements.buyDroid.addEventListener('click', () => {
  const prices = getPrices();
  if (game.credits >= prices.droid) {
    game.credits -= prices.droid;
    game.droids += 1;
    updateGame();
    saveGame();
  }
});

elements.buyShip.addEventListener('click', () => {
  const prices = getPrices();
  if (game.credits >= prices.ship) {
    game.credits -= prices.ship;
    game.ships += 1;
    updateGame();
    saveGame();
  }
});

elements.buyJedi.addEventListener('click', () => {
  const prices = getPrices();
  if (game.credits >= prices.jedi) {
    game.credits -= prices.jedi;
    game.jedi += 1;
    updateGame();
    saveGame();
  }
});

elements.buyDeathStar.addEventListener('click', () => {
  const prices = getPrices();
  if (game.credits >= prices.deathStar) {
    game.credits -= prices.deathStar;
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
  const income = calculatePassiveIncome();
  if (income > 0) {
    game.credits += income;
    updateGame();
    saveGame();
  }
}, 1000);

// Загрузка при старте
window.addEventListener('DOMContentLoaded', () => {
  const savedFaction = localStorage.getItem('swFaction');
  if (savedFaction) {
    initFaction(savedFaction);
    elements.factionScreen.classList.add('hidden');
    elements.gameContainer.classList.remove('hidden');
  }
  loadGame();
});
