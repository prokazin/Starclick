let credits = 0;
let droids = 0;
let ships = 0;
let isWebApp = false;

const creditsEl = document.getElementById('credits');
const droidsEl = document.getElementById('droids');
const shipsEl = document.getElementById('ships');
const clickButton = document.getElementById('clickButton');
const buyDroidButton = document.getElementById('buyDroid');
const buyShipButton = document.getElementById('buyShip');
const closeButton = document.getElementById('closeButton');

// Проверка WebApp Telegram
if (window.Telegram?.WebApp) {
  isWebApp = true;
  closeButton.style.display = 'block';
  window.Telegram.WebApp.expand();
}

// Обновление интерфейса
function updateUI() {
  creditsEl.textContent = credits.toFixed(1);
  droidsEl.textContent = droids;
  shipsEl.textContent = ships;
  buyDroidButton.disabled = credits < 10;
  buyShipButton.disabled = credits < 50;
}

// Клик по мечу
clickButton.addEventListener('click', () => {
  credits += 1 + ships * 0.5;
  updateUI();
});

// Покупка дроида
buyDroidButton.addEventListener('click', () => {
  if (credits >= 10) {
    credits -= 10;
    droids += 1;
    updateUI();
  }
});

// Покупка корабля
buyShipButton.addEventListener('click', () => {
  if (credits >= 50) {
    credits -= 50;
    ships += 1;
    updateUI();
  }
});

// Закрытие WebApp
closeButton.addEventListener('click', () => {
  if (isWebApp) {
    window.Telegram.WebApp.close();
  }
});

// Пассивный доход
setInterval(() => {
  if (droids > 0) {
    credits += droids * 0.1;
    updateUI();
  }
}, 1000);

updateUI();
