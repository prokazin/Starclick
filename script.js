// Конфигурация престижа
const PRESTIGE_CONFIG = {
  requirements: [
    0,      // Уровень 0 (нет престижа)
    1e6,    // 1M - Уровень 1
    2e6,    // 2M - Уровень 2
    5e6,    // 5M - Уровень 3
    1e7,    // 10M - Уровень 4
    2e7,    // 20M - Уровень 5
    5e7,    // 50M - Уровень 6
    1e8,    // 100M - Уровень 7
    2e8,    // 200M - Уровень 8
    5e8,    // 500M - Уровень 9
    1e9,    // 1B - Уровень 10
    2e9,    // 2B - Уровень 11
    5e9,    // 5B - Уровень 12
    1e10,   // 10B - Уровень 13
    2e10,   // 20B - Уровень 14
    5e10,   // 50B - Уровень 15
    1e11,   // 100B - Уровень 16
    2e11,   // 200B - Уровень 17
    5e11,   // 500B - Уровень 18
    1e12,   // 1T - Уровень 19
    2e12    // 2T - Уровень 20
  ],
  rewards: [
    null, // Уровень 0
    { name: "Новичок", icon: "fa-star", bonus: "Доход +10%", multiplier: 1.1, effect: null },
    { name: "Ученик", icon: "fa-jedi", bonus: "Дроиды +15%", multiplier: 1.15, effect: null },
    { name: "Падаван", icon: "fa-rocket", bonus: "Клики +20%", multiplier: 1.2, effect: null },
    { name: "Рыцарь", icon: "fa-medal", bonus: "Доход +25%", multiplier: 1.25, effect: null },
    { name: "Мастер", icon: "fa-crown", bonus: "Золотой меч", multiplier: 1.5, effect: "gold" },
    { name: "Ситх", icon: "fa-hand-fist", bonus: "Клики x2", multiplier: 2.0, effect: "red" },
    { name: "Мандалорец", icon: "fa-helmet-battle", bonus: "Корабли +30%", multiplier: 1.3, effect: null },
    { name: "Генерал", icon: "fa-flag", bonus: "Доход +40%", multiplier: 1.4, effect: null },
    { name: "Адмирал", icon: "fa-ship", bonus: "Звезды Смерти +50%", multiplier: 1.5, effect: null },
    { name: "Легенда", icon: "fa-trophy", bonus: "Красный меч", multiplier: 3.0, effect: "red" },
    { name: "Мифический", icon: "fa-dragon", bonus: "Доход x4", multiplier: 4.0, effect: "purple" },
    { name: "Божественный", icon: "fa-gem", bonus: "Все +50%", multiplier: 1.5, effect: "blue" },
    { name: "Создатель", icon: "fa-wand-magic", bonus: "Дроиды x2", multiplier: 2.0, effect: null },
    { name: "Повелитель", icon: "fa-crown", bonus: "Клики x5", multiplier: 5.0, effect: "gold" },
    { name: "Император", icon: "fa-empire", bonus: "Синий меч", multiplier: 5.0, effect: "blue" },
    { name: "Властелин", icon: "fa-ring", bonus: "Доход x10", multiplier: 10.0, effect: "purple" },
    { name: "Бессмертный", icon: "fa-infinity", bonus: "Все x3", multiplier: 3.0, effect: null },
    { name: "Вечный", icon: "fa-hourglass-end", bonus: "Меч тьмы", multiplier: 7.0, effect: "dark" },
    { name: "Абсолют", icon: "fa-atom", bonus: "Бесконечность", multiplier: 10.0, effect: "rainbow" },
    { name: "БОГ", icon: "fa-crown", bonus: "ВСЁ x20", multiplier: 20.0, effect: "god" }
  ]
};

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
  },
  prestige: {
    level: 0,
    points: 0,
    nextRequirement: 1e6
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
  prestigeLevelUI: document.getElementById('prestige-level-ui'),
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
  buySound: document.getElementById('buySound'),
  prestigeButton: document.getElementById('prestige-button'),
  prestigeLevel: document.getElementById('prestige-level'),
  prestigePoints: document.getElementById('prestige-points'),
  prestigeProgress: document.getElementById('prestige-progress'),
  prestigeRemaining: document.getElementById('prestige-remaining'),
  incomeMultiplier: document.getElementById('income-multiplier'),
  rewardsGrid: document.getElementById('rewards-grid'),
  prestigeEffects: document.getElementById('prestige-effects'),
  prestigeSound: document.getElementById('prestige-sound'),
  levelupSound: document.getElementById('levelup-sound'),
  multiplayerButton: document.getElementById('multiplayer-button'),
  multiplayerModal: document.getElementById('multiplayer-modal'),
  closeModal: document.querySelector('.close-modal'),
  leaderboard: document.getElementById('leaderboard'),
  leaderboardFilter: document.getElementById('leaderboard-filter'),
  leaderboardSort: document.getElementById('leaderboard-sort'),
  playerPosition: document.getElementById('player-position'),
  friendSearch: document.getElementById('friend-search'),
  searchFriend: document.getElementById('search-friend'),
  searchResults: document.getElementById('search-results'),
  foundPlayers: document.getElementById('found-players'),
  friendsContainer: document.getElementById('friends-container'),
  requestsContainer: document.getElementById('requests-container'),
  requestsCount: document.getElementById('requests-count')
};

// Мультиплеер и рейтинговая таблица
const multiplayer = {
  players: [],
  friends: [],
  requests: [],
  playerId: null,
  lastUpdate: 0,
  updateInterval: 30000, // 30 секунд
  
  // Инициализация мультиплеера
  init() {
    // Генерируем уникальный ID игрока или получаем из localStorage
    this.playerId = localStorage.getItem('swPlayerId') || this.generateId();
    localStorage.setItem('swPlayerId', this.playerId);
    
    // Загружаем данные друзей и запросов
    this.loadFriends();
    this.loadRequests();
    
    // Обновляем данные игроков
    this.updateLeaderboard();
    
    // Устанавливаем периодическое обновление
    setInterval(() => this.updateLeaderboard(), this.updateInterval);
    
    // Обработчики для модального окна
    elements.multiplayerButton.addEventListener('click', () => {
      elements.multiplayerModal.style.display = 'flex';
      this.updateLeaderboard();
    });
    
    elements.closeModal.addEventListener('click', () => {
      elements.multiplayerModal.style.display = 'none';
    });
    
    // Обработчики вкладок
    document.querySelectorAll('.mp-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.mp-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.mp-tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab + '-content').classList.add('active');
      });
    });
    
    // Обработчики фильтров
    elements.leaderboardFilter.addEventListener('change', () => this.updateLeaderboardUI());
    elements.leaderboardSort.addEventListener('change', () => this.updateLeaderboardUI());
    
    // Обработчики друзей
    elements.searchFriend.addEventListener('click', () => this.searchPlayers());
    elements.friendSearch.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.searchPlayers();
    });
  },
  
  // Генерация ID игрока
  generateId() {
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () => 
      (Math.random() * 16 | 0).toString(16)
    );
  },
  
  // Обновление данных рейтинга
  async updateLeaderboard() {
    try {
      // Здесь должна быть реальная API-интеграция
      // Для демо используем mock-данные
      this.mockApiCall();
      
      // Обновляем UI
      this.updateLeaderboardUI();
      this.updatePlayerPosition();
      
      // Сохраняем время последнего обновления
      this.lastUpdate = Date.now();
    } catch (error) {
      console.error('Ошибка обновления рейтинга:', error);
    }
  },
  
  // Mock API для демонстрации
  mockApiCall() {
    // Если игроков нет, создаем демо-данные
    if (this.players.length === 0) {
      const factions = ['republic', 'empire', 'hutt'];
      const names = ['Skywalker', 'Vader', 'Solo', 'Kenobi', 'Fett', 'Organa', 'Windu', 'Maul', 'Dooku', 'Grievous'];
      
      for (let i = 0; i < 50; i++) {
        const faction = factions[Math.floor(Math.random() * factions.length)];
        this.players.push({
          id: this.generateId(),
          name: `${names[Math.floor(Math.random() * names.length)]}${Math.floor(Math.random() * 100)}`,
          faction: faction,
          credits: Math.floor(Math.random() * 1e10),
          prestige: Math.floor(Math.random() * 15),
          clickPower: Math.floor(Math.random() * 1000),
          lastActive: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
        });
      }
      
      // Добавляем текущего игрока
      const playerData = this.getPlayerData();
      this.players.push(playerData);
    } else {
      // Обновляем демо-данные
      this.players = this.players.map(player => {
        if (player.id === this.playerId) {
          return this.getPlayerData();
        }
        return {
          ...player,
          credits: player.credits + Math.floor(Math.random() * 1e6),
          lastActive: Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)
        };
      });
    }
  },
  
  // Получение данных текущего игрока
  getPlayerData() {
    return {
      id: this.playerId,
      name: `Игрок${this.playerId.substring(0, 4)}`,
      faction: game.faction,
      credits: game.credits,
      prestige: game.prestige.level,
      clickPower: calculateClickIncome(),
      lastActive: Date.now(),
      avatar: `https://i.pravatar.cc/150?u=${this.playerId}`
    };
  },
  
  // Обновление UI рейтинга
  updateLeaderboardUI() {
    const filter = elements.leaderboardFilter.value;
    const sortBy = elements.leaderboardSort.value;
    
    // Фильтрация
    let filteredPlayers = [...this.players];
    if (filter !== 'all') {
      filteredPlayers = filteredPlayers.filter(p => p.faction === filter);
    }
    
    // Сортировка
    filteredPlayers.sort((a, b) => b[sortBy] - a[sortBy]);
    
    // Ограничение до топ-20
    const topPlayers = filteredPlayers.slice(0, 20);
    
    // Обновление таблицы
    elements.leaderboard.innerHTML = '';
    
    topPlayers.forEach((player, index) => {
      const playerElement = document.createElement('div');
      playerElement.className = `leaderboard-item ${player.id === this.playerId ? 'me' : ''}`;
      playerElement.innerHTML = `
        <div class="leaderboard-position">${index + 1}</div>
        <img src="${player.avatar}" class="leaderboard-avatar" alt="${player.name}">
        <div class="leaderboard-info">
          <div class="leaderboard-name">${player.name}</div>
          <div class="leaderboard-faction">
            <i class="fas fa-${this.getFactionIcon(player.faction)}"></i>
            ${this.getFactionName(player.faction)}
          </div>
        </div>
        <div class="leaderboard-stats">
          <div class="leaderboard-credits">${formatNumber(player.credits)}</div>
          <div class="leaderboard-prestige">Ур. ${player.prestige}</div>
        </div>
      `;
      elements.leaderboard.appendChild(playerElement);
    });
  },
  
  // Обновление позиции игрока
  updatePlayerPosition() {
    const sortBy = elements.leaderboardSort.value;
    const allPlayers = [...this.players].sort((a, b) => b[sortBy] - a[sortBy]);
    const playerIndex = allPlayers.findIndex(p => p.id === this.playerId);
    
    if (playerIndex >= 0) {
      elements.playerPosition.textContent = `#${playerIndex + 1}`;
    } else {
      elements.playerPosition.textContent = 'Не в топе';
    }
  },
  
  // Поиск игроков
  searchPlayers() {
    const query = elements.friendSearch.value.trim().toLowerCase();
    if (!query) return;
    
    const results = this.players
      .filter(p => 
        p.id !== this.playerId && 
        !this.friends.some(f => f.id === p.id) &&
        p.name.toLowerCase().includes(query)
      )
      .slice(0, 5);
    
    elements.foundPlayers.innerHTML = '';
    
    if (results.length === 0) {
      elements.foundPlayers.innerHTML = '<p>Игроки не найдены</p>';
    } else {
      results.forEach(player => {
        const playerElement = document.createElement('div');
        playerElement.className = 'found-player';
        playerElement.innerHTML = `
          <div class="found-player-info">
            <img src="${player.avatar}" class="found-player-avatar" alt="${player.name}">
            <div>
              <div class="found-player-name">${player.name}</div>
              <div class="found-player-faction">${this.getFactionName(player.faction)}</div>
            </div>
          </div>
          <button class="add-friend" data-id="${player.id}">Добавить</button>
        `;
        elements.foundPlayers.appendChild(playerElement);
      });
      
      // Обработчики кнопок добавления
      document.querySelectorAll('.add-friend').forEach(button => {
        button.addEventListener('click', () => this.sendFriendRequest(button.dataset.id));
      });
    }
    
    elements.searchResults.style.display = 'block';
  },
  
  // Отправка запроса в друзья
  sendFriendRequest(playerId) {
    // Здесь должна быть реальная API-интеграция
    const targetPlayer = this.players.find(p => p.id === playerId);
    if (!targetPlayer) return;
    
    // Добавляем в локальные запросы (в реальном приложении это делается через API)
    this.requests.push({
      id: `req-${Date.now()}`,
      from: this.playerId,
      to: playerId,
      player: targetPlayer,
      status: 'pending',
      date: new Date()
    });
    
    this.updateRequestsUI();
    alert(`Запрос в друзья отправлен игроку ${targetPlayer.name}`);
  },
  
  // Загрузка списка друзей
  loadFriends() {
    // Здесь должна быть реальная API-интеграция
    // Для демо создаем mock-друзей
    if (this.friends.length === 0) {
      const potentialFriends = this.players
        .filter(p => p.id !== this.playerId)
        .slice(0, 5);
      
      this.friends = potentialFriends.map(p => ({
        id: p.id,
        player: p,
        status: 'accepted',
        date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000))
      }));
    }
    
    this.updateFriendsUI();
  },
  
  // Загрузка запросов в друзья
  loadRequests() {
    // Здесь должна быть реальная API-интеграция
    // Для демо создаем mock-запросы
    if (this.requests.length === 0) {
      const potentialRequests = this.players
        .filter(p => p.id !== this.playerId)
        .slice(5, 8);
      
      this.requests = potentialRequests.map(p => ({
        id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        from: p.id,
        to: this.playerId,
        player: p,
        status: 'pending',
        date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
      }));
    }
    
    this.updateRequestsUI();
  },
  
  // Обновление UI списка друзей
  updateFriendsUI() {
    elements.friendsContainer.innerHTML = '';
    
    if (this.friends.length === 0) {
      elements.friendsContainer.innerHTML = '<p>У вас пока нет друзей</p>';
      return;
    }
    
    // Сортируем по дате добавления (новые сверху)
    const sortedFriends = [...this.friends].sort((a, b) => b.date - a.date);
    
    sortedFriends.forEach(friend => {
      const friendElement = document.createElement('div');
      friendElement.className = 'friend-item';
      friendElement.innerHTML = `
        <div class="friend-info">
          <img src="${friend.player.avatar}" class="friend-avatar" alt="${friend.player.name}">
          <div>
            <div class="friend-name">${friend.player.name}</div>
            <div class="friend-status">Друзья с ${friend.date.toLocaleDateString()}</div>
          </div>
        </div>
        <div class="friend-actions">
          <button class="friend-action remove" data-id="${friend.id}">Удалить</button>
        </div>
      `;
      elements.friendsContainer.appendChild(friendElement);
    });
    
    // Обработчики кнопок
    document.querySelectorAll('.friend-action.remove').forEach(button => {
      button.addEventListener('click', () => this.removeFriend(button.dataset.id));
    });
  },
  
  // Обновление UI запросов в друзья
  updateRequestsUI() {
    const incomingRequests = this.requests.filter(r => r.to === this.playerId && r.status === 'pending');
    
    elements.requestsCount.textContent = incomingRequests.length;
    elements.requestsContainer.innerHTML = '';
    
    if (incomingRequests.length === 0) {
      elements.requestsContainer.innerHTML = '<p>Нет новых запросов</p>';
      return;
    }
    
    // Сортируем по дате (новые сверху)
    const sortedRequests = [...incomingRequests].sort((a, b) => b.date - a.date);
    
    sortedRequests.forEach(request => {
      const requestElement = document.createElement('div');
      requestElement.className = 'request-item';
      requestElement.innerHTML = `
        <div class="request-info">
          <img src="${request.player.avatar}" class="request-avatar" alt="${request.player.name}">
          <div>
            <div class="request-name">${request.player.name}</div>
            <div class="friend-status">${request.date.toLocaleDateString()}</div>
          </div>
        </div>
        <div class="request-actions">
          <button class="request-action accept" data-id="${request.id}">Принять</button>
          <button class="request-action decline" data-id="${request.id}">Отклонить</button>
        </div>
      `;
      elements.requestsContainer.appendChild(requestElement);
    });
    
    // Обработчики кнопок
    document.querySelectorAll('.request-action.accept').forEach(button => {
      button.addEventListener('click', () => this.processRequest(button.dataset.id, 'accept'));
    });
    
    document.querySelectorAll('.request-action.decline').forEach(button => {
      button.addEventListener('click', () => this.processRequest(button.dataset.id, 'decline'));
    });
  },
  
  // Удаление друга
  removeFriend(friendId) {
    this.friends = this.friends.filter(f => f.id !== friendId);
    this.updateFriendsUI();
    alert('Друг удален');
  },
  
  // Обработка запроса в друзья
  processRequest(requestId, action) {
    const request = this.requests.find(r => r.id === requestId);
    if (!request) return;
    
    if (action === 'accept') {
      // Добавляем в друзья
      this.friends.push({
        id: `fr-${Date.now()}`,
        player: request.player,
        status: 'accepted',
        date: new Date()
      });
      
      // Обновляем статус запроса
      request.status = 'accepted';
      
      alert(`Теперь вы друзья с ${request.player.name}`);
    } else {
      // Отклоняем запрос
      request.status = 'declined';
      alert(`Запрос от ${request.player.name} отклонен`);
    }
    
    this.updateFriendsUI();
    this.updateRequestsUI();
  },
  
  // Вспомогательные функции
  getFactionName(faction) {
    switch(faction) {
      case 'republic': return 'Республика';
      case 'empire': return 'Империя';
      case 'hutt': return 'Хатты';
      default: return 'Неизвестно';
    }
  },
  
  getFactionIcon(faction) {
    switch(faction) {
      case 'republic': return 'robot';
      case 'empire': return 'hand-fist';
      case 'hutt': return 'coins';
      default: return 'question';
    }
  }
};

// Инициализация фракции
function initFaction(faction) {
  game.faction = faction;
  elements.factionLogo.src = `https://raw.githubusercontent.com/prokazin/Starclick/main/assets/images/${faction}.png`;
  elements.factionName.textContent = getFactionName(faction);
  localStorage.setItem('swFaction', faction);
  
  elements.factionScreen.style.display = 'none';
  elements.gameContainer.style.display = 'flex';
  
  // Инициализация мультиплеера после выбора фракции
  multiplayer.init();
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

// Расчет доходов с учетом престижа
function calculateClickIncome() {
  let income = 1;
  income += game.ships * 0.5;
  income += game.jedi * 2;
  income += game.deathStars * 5;
  
  // Бонусы фракций
  if (game.faction === 'empire') income *= game.bonuses.empire.clickIncome;
  if (game.faction === 'hutt') income *= game.bonuses.hutt.baseIncome;
  
  // Бонус престижа
  if (game.prestige.level > 0) {
    income *= PRESTIGE_CONFIG.rewards[game.prestige.level].multiplier;
  }
  
  return income;
}

function calculatePassiveIncome() {
  let income = game.droids * 0.1;
  
  // Бонусы фракций
  if (game.faction === 'republic') income *= game.bonuses.republic.droidIncome;
  if (game.faction === 'hutt') income *= game.bonuses.hutt.baseIncome;
  
  // Бонус престижа
  if (game.prestige.level > 0) {
    income *= PRESTIGE_CONFIG.rewards[game.prestige.level].multiplier;
  }
  
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
  elements.prestigeLevelUI.textContent = game.prestige.level;
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
  
  // Обновляем UI престижа
  updatePrestigeUI();
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
    game.prestige = data.prestige || { level: 0, points: 0, nextRequirement: 1e6 };
    
    // Рассчитываем оффлайн-доход
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
    createRewardsGrid();
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

// Престиж система
function updatePrestigeUI() {
  const nextReq = PRESTIGE_CONFIG.requirements[game.prestige.level + 1] || PRESTIGE_CONFIG.requirements[20];
  game.prestige.nextRequirement = nextReq;
  
  elements.prestigeLevel.textContent = game.prestige.level;
  elements.prestigePoints.textContent = game.prestige.points;
  elements.incomeMultiplier.textContent = `${getCurrentMultiplier().toFixed(1)}x`;
  
  if (game.prestige.level < 20) {
    const remaining = nextReq - game.credits;
    elements.prestigeRemaining.textContent = formatNumber(nextReq);
    const progress = Math.min((game.credits / nextReq) * 100, 100);
    elements.prestigeProgress.style.width = `${progress}%`;
    elements.prestigeButton.disabled = game.credits < nextReq;
  } else {
    elements.prestigeRemaining.textContent = "МАКСИМУМ";
    elements.prestigeProgress.style.width = `100%`;
    elements.prestigeButton.disabled = true;
  }
}

function createRewardsGrid() {
  elements.rewardsGrid.innerHTML = '';
  
  for (let level = 1; level <= 20; level++) {
    const reward = PRESTIGE_CONFIG.rewards[level];
    const isUnlocked = game.prestige.level >= level;
    
    const card = document.createElement('div');
    card.className = `reward-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    card.innerHTML = `
      <div class="reward-level">${level}</div>
      <div class="reward-icon"><i class="fas ${reward.icon}"></i></div>
      <div class="reward-name">${reward.name}</div>
      <div class="reward-desc">${reward.bonus}</div>
    `;
    
    if (isUnlocked) {
      card.style.borderColor = getEffectColor(reward.effect);
      card.style.boxShadow = `0 0 15px ${getEffectColor(reward.effect)}`;
    }
    
    elements.rewardsGrid.appendChild(card);
  }
}

function performPrestige() {
  if (game.prestige.level >= 20) return;
  
  const nextLevel = game.prestige.level + 1;
  const requirement = PRESTIGE_CONFIG.requirements[nextLevel];
  
  if (game.credits >= requirement) {
    // Рассчитываем очки престижа
    const excess = game.credits - requirement;
    const pointsEarned = Math.max(1, Math.floor(excess / (requirement * 0.1)));
    
    // Обновляем состояние
    game.prestige.level = nextLevel;
    game.prestige.points += pointsEarned;
    game.prestige.nextRequirement = PRESTIGE_CONFIG.requirements[nextLevel + 1] || 0;
    
    // Сбрасываем прогресс с бонусами
    resetAfterPrestige();
    
    // Визуальные эффекты
    showPrestigeEffect(nextLevel);
    elements.prestigeSound.play();
    elements.levelupSound.play();
    
    // Уведомление
    showUnlockNotification(`Достигнут уровень престижа ${nextLevel}!`);
    
    // Сохраняем и обновляем
    saveGame();
    updateGame();
    createRewardsGrid();
  }
}

function resetAfterPrestige() {
  const bonusCredits = PRESTIGE_CONFIG.requirements[game.prestige.level] * 0.01;
  
  game.credits = bonusCredits;
  game.droids = 0;
  game.ships = 0;
  game.jedi = 0;
  game.deathStars = 0;
}

function getCurrentMultiplier() {
  let multiplier = 1;
  for (let level = 1; level <= game.prestige.level; level++) {
    multiplier *= PRESTIGE_CONFIG.rewards[level].multiplier;
  }
  return multiplier;
}

function showPrestigeEffect(level) {
  const effect = document.createElement('div');
  effect.className = `prestige-effect level-${Math.min(level, 20)}`;
  elements.prestigeEffects.appendChild(effect);
  
  setTimeout(() => {
    effect.remove();
  }, 3000);
}

function getEffectColor(effect) {
  switch(effect) {
    case 'gold': return '#FFD700';
    case 'red': return '#FF0000';
    case 'blue': return '#00B4FF';
    case 'purple': return '#8A2BE2';
    case 'dark': return '#4B0082';
    case 'rainbow': return 'var(--yellow)';
    case 'god': return 'var(--yellow)';
    default: return 'var(--yellow)';
  }
}

function showUnlockNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'prestige-unlock';
  notification.innerHTML = `
    <div class="unlock-content">
      <i class="fas fa-trophy"></i>
      <h3>Новая разблокировка!</h3>
      <p>${message}</p>
    </div>
  `;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
}

function formatNumber(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toString();
}

// Инициализация игры
function initGame() {
  // Загрузка ресурсов
  setTimeout(() => {
    elements.loadingScreen.style.display = 'none';
    const savedFaction = localStorage.getItem('swFaction');
    
    if (savedFaction) {
      loadGame();
    } else {
      elements.factionScreen.style.display = 'flex';
      // Центрируем скролл на Империи
      const container = document.querySelector('.factions-container');
      const empire = document.querySelector('.faction[data-faction="empire"]');
      if (container && empire) {
        container.scrollLeft = empire.offsetLeft - (container.offsetWidth / 2) + (empire.offsetWidth / 2);
      }
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
    
    // Анимация меча
    const sword = document.querySelector('.sword-blade');
    sword.style.transform = 'scaleY(0.95)';
    setTimeout(() => sword.style.transform = 'scaleY(1)', 100);
    
    // Эффекты кликов
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        createClickEffect(x, y, income / 3);
      }, i * 150);
    }
    
    // Звук клика
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

  // Престиж система
  elements.prestigeButton.addEventListener('click', performPrestige);

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
