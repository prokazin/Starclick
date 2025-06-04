<!DOCTYPE html>
<html>
<head>
  <title>Star Wars Clicker</title>
  <link rel="stylesheet" href="styles.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <div id="game-container">
    <h1>⚔️ Star Wars Clicker</h1>
    
    <!-- Блок фракций -->
    <div id="faction-choice" class="faction-choice">
      <h3>Выберите фракцию:</h3>
      <button onclick="joinFaction('light')">☀️ Светлая сторона</button>
      <button onclick="joinFaction('dark')">☠️ Тёмная сторона</button>
      <p id="faction-bonus"></p>
    </div>

    <!-- Основной игровой интерфейс -->
    <div id="main-game" style="display:none;">
      <div class="resource-panel">
        <p>CR: <span id="credits">0</span></p>
        <p id="offline-notification" style="display:none;">
          За время отсутствия: +<span id="offline-reward">0</span> CR
        </p>
      </div>

      <button class="click-btn" onclick="handleClick()">Атаковать!</button>

      <!-- Магазин юнитов -->
      <div class="shop">
        <h3>Армия</h3>
        <div id="units-container"></div>
      </div>

      <!-- Боссы -->
      <div id="boss-ui" class="boss-ui" style="display:none;">
        <h3>Босс: <span id="boss-name"></span> (<span id="boss-hp"></span>❤️)</h3>
        <button onclick="attackBoss()">Атаковать!</button>
      </div>
    </div>

    <!-- Глобальный топ -->
    <div id="leaderboard" class="leaderboard">
      <h3>🏆 Топ игроков</h3>
      <div id="leaderboard-content"></div>
    </div>

    <!-- Ввод имени -->
    <div id="name-input" class="name-input">
      <input type="text" id="player-name" placeholder="Ваше имя">
      <button onclick="setPlayerName()">Сохранить</button>
    </div>
  </div>

  <!-- Firebase и игровой код -->
  <script type="module" src="game.js"></script>
</body>
</html>
