let credits = 0;
let clickPower = 1;
let units = {
  stormtrooper: { price: 10, income: 0.2, owned: 0 }
};

// Загрузка сохранения
if (localStorage.getItem('swClickerSave')) {
  const save = JSON.parse(localStorage.getItem('swClickerSave'));
  credits = save.credits;
  units = save.units;
  updateUI();
}

// Клик
function click() {
  credits += clickPower;
  updateUI();
  saveGame();
}

// Покупка юнита
function buyUnit(unitType) {
  const unit = units[unitType];
  if (credits >= unit.price) {
    credits -= unit.price;
    unit.owned += 1;
    unit.price = Math.floor(unit.price * 1.15);
    updateUI();
    saveGame();
  } else {
    alert("Недостаточно CR!");
  }
}

// Автоматический доход
setInterval(() => {
  let income = 0;
  for (const unit of Object.values(units)) {
    income += unit.income * unit.owned;
  }
  credits += income;
  updateUI();
  saveGame();
}, 1000);

// Обновление интерфейса
function updateUI() {
  document.getElementById('credits').textContent = Math.floor(credits);
  document.getElementById('stormtrooper-count').textContent = 
    `Куплено: ${units.stormtrooper.owned} (+${units.stormtrooper.income * units.stormtrooper.owned}/сек)`;
}

// Сохранение
function saveGame() {
  localStorage.setItem('swClickerSave', JSON.stringify({ credits, units }));
}
