// Состояние игры
const game = {
  credits: 0,
  droids: 0,
  ships: 0,
  jedi: 0,
  deathStars: 0,
  faction: null,
  lastPlayed: Date.now(),
  prices: {
    droid: { base: 10, growth: 1.15 },
    ship: { base: 50, growth: 1.2 },
    jedi: { base: 100, growth: 1.25 },
    deathStar: { base: 1000, growth: 1.3 }
  },
  bonuses: {
    republic: { droidIncome: 1.2, jediCost: 0.85 },
    empire: { clickIncome: 1.25, deathStarCost: 0.8 },
    hutt: { baseIncome: 1.3, shipCost: 0.8 }
  }
};

// Элементы DOM
const elements = {
  loadingScreen: document.getElementById('loading-screen'),
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
  tabContents: document.querySelectorAll('.tab-content'),
  passiveIncomeParticles: document.getElementById('passive-income-particles'),
  offlineNotification: document.getElementById('offline-notification'),
  offlineEarnings: document.getElementById('offline-earnings'),
  clickSound: document.getElementById('clickSound'),
  buySound: document.getElementById('buySound')
};

// Инициализация фракции
function initFaction(faction) {
  game.faction = faction;
  elements.factionLogo.src = `https://raw.githubusercontent.com/prokazin/Starclick/main/assets/images/${faction}.png`;
  elements.factionName.textContent = getFactionName(faction);
  localStorage.setItem('swFaction', faction);
  
  elements.factionScreen.style.display = 'none';
  elements.gameContainer.style.display = 'flex';
}

function getFactionName(faction) {
  const names = {
    republic: 'Галактическая Республика',
    empire: 'Галактическая Империя',
    hutt: 'Картель Хаттов'
  };
  return names[faction] || '';
}

// Расчет цен с учетом прогрессии и бонусов
function getPrice(type, count) {
  const basePrice = game.prices[type].base;
  const growth = game.prices[type].growth;
  let price = basePrice * Math.pow(growth, count);
  
  if (type === 'jedi' && game.faction === 'republic') price *= game.bonuses.republic.jediCost;
  if (type === 'deathStar' && game.faction === 'empire') price *= game.bonuses.empire.deathStarCost;
  if (type === 'ship' && game.faction === 'hutt') price *= game.bonuses.hutt.shipCost;
  
  return Math.floor(price);
}

// Расчет доходов
function calculateClickIncome() {
  let income = 1;
  income += game.ships * 0.5;
  income += game.jedi * 2;
  income += game.deathStars * 5;
  
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

// Создание частиц пассивного дохода
function createParticles(amount) {
  const container = elements.passiveIncomeParticles;
  const particleCount = Math.min(Math.floor(amount * 2), 20);
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.width = `${5 + Math.random() * 5}px`;
    particle.style.height = particle.style.width;
    particle.style.animationDuration = `${2 + Math.random() * 2}s`;
    container.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 3000);
  }
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

  elements.buyDroid.querySelector('.price').textContent = getPrice('droid', game.droids);
  elements.buyShip.querySelector('.price').textContent = getPrice('ship', game.ships);
  elements.buyJedi.querySelector('.price').textContent = getPrice('jedi', game.jedi);
  elements.buyDeathStar.querySelector('.price').textContent = getPrice('deathStar', game.deathStars);

  elements.buyDroid.disabled = game.credits < getPrice('droid', game.droids);
  elements.buyShip.disabled = game.credits < getPrice('ship', game.ships);
  elements.buyJedi.disabled = game.credits < getPrice('jedi', game.jedi);
  elements.buyDeathStar.disabled = game.credits < getPrice('deathStar', game.deathStars);
}

// Сохранение игры
function saveGame() {
  game.lastPlayed = Date.now();
  localStorage.setItem('starWarsClicker', JSON.stringify(game));
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
    game.faction = data.faction || null;
    game.lastPlayed = data.lastPlayed || Date.now();
    
    if (data.lastPlayed) {
      const offlineTime = Date.now() - data.lastPlayed;
      const maxOfflineTime = 24 * 60 * 60 * 1000;
      const effectiveTime = Math.min(offlineTime, maxOfflineTime);
      
      if (effectiveTime > 5000) {
        const passiveIncome = calculatePassiveIncome();
        const offlineEarnings = passiveIncome * (effectiveTime / 1000);
        game.credits += offlineEarnings;
        
        elements.offlineEarnings.textContent = Math.floor(offlineEarnings);
        elements.offlineNotification.style.display = 'block';
        setTimeout(() => {
          elements.offlineNotification.style.display = 'none';
        }, 5000);
      }
    }
    
    if (game.faction) {
      initFaction(game.faction);
    }
    updateGame();
  }
}

// Анимация клика
function createClickEffect(x, y, amount) {
  const effect = document.createElement('div');
  effect.className = 'click-effect';
  effect.textContent = `+${amount.toFixed(1)}`;
  effect.style.left = `${x + (Math.random() * 80 - 40)}px`;
  effect.style.top = `${y + (Math.random() * 80 - 40)}px`;
  document.querySelector('.main-content').appendChild(effect);
  setTimeout(() => effect.remove(), 1000);
}

// Центрирование фракции Империи
function centerEmpireFaction() {
  const container = document.querySelector('.factions-container');
  const empire = document.querySelector('.faction[data-faction="empire"]');
  if (container && empire) {
    container.scrollLeft = empire.offsetLeft - (container.offsetWidth / 2) + (empire.offsetWidth / 2);
  }
}

// Инициализация игры
function initGame() {
  // Показываем экран загрузки
  elements.loadingScreen.style.display = 'flex';
  
  // Имитируем загрузку
  setTimeout(() => {
    elements.loadingScreen.style.display = 'none';
    
    const savedFaction = localStorage.getItem('swFaction');
    if (savedFaction) {
      loadGame();
    } else {
      elements.factionScreen.style.display = 'flex';
      centerEmpireFaction();
    }
  }, 1500);

  // Обработчики выбора фракции
  document.querySelectorAll('.select-faction').forEach(button => {
    button.addEventListener('click', (e) => {
      const faction = e.target.closest('.faction').dataset.faction;
      initFaction(faction);
      game.credits = 0;
      saveGame();
    });
  });

  // Обработчик клика по мечу
  elements.clickButton.addEventListener('click', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const income = calculateClickIncome();
    game.credits += income;
    updateGame();
    saveGame();
    
    const sword = document.querySelector('.sword-blade');
    sword.style.transform = 'scaleY(0.95)';
    setTimeout(() => sword.style.transform = 'scaleY(1)', 100);
    
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        createClickEffect(x, y, income / 3);
      }, i * 150);
    }
    
    elements.clickSound.currentTime = 0;
    elements.clickSound.play();
  });

  // Обработчики покупок
  elements.buyDroid.addEventListener('click', () => {
    const price = getPrice('droid', game.droids);
    if (game.credits >= price) {
      game.credits -= price;
      game.droids += 1;
      updateGame();
      saveGame();
      elements.buySound.currentTime = 0;
      elements.buySound.play();
    }
  });

  elements.buyShip.addEventListener('click', () => {
    const price = getPrice('ship', game.ships);
    if (game.credits >= price) {
      game.credits -= price;
      game.ships += 1;
      updateGame();
      saveGame();
      elements.buySound.currentTime = 0;
      elements.buySound.play();
    }
  });

  elements.buyJedi.addEventListener('click', () => {
    const price = getPrice('jedi', game.jedi);
    if (game.credits >= price) {
      game.credits -= price;
      game.jedi += 1;
      updateGame();
      saveGame();
      elements.buySound.currentTime = 0;
      elements.buySound.play();
    }
  });

  elements.buyDeathStar.addEventListener('click', () => {
    const price = getPrice('deathStar', game.deathStars);
    if (game.credits >= price) {
      game.credits -= price;
      game.deathStars += 1;
      updateGame();
      saveGame();
      elements.buySound.currentTime = 0;
      elements.buySound.play();
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
      createParticles(income);
    }
  }, 1000);
}

// Запуск игры
window.addEventListener('DOMContentLoaded', initGame);
