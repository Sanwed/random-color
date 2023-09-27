const body = document.body;
const getColorBtn = body.querySelector('#get-color');
const toggleSystemBtn = body.querySelector('#toggle-system');
const colorText = body.querySelector('#color');
const symbols = '0123456789abcdef';
const historyArray = [];
const sysName = body.querySelector('#name');
const historyList = body.querySelector('#history-list');

const hexToRGB = (hex) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const renderHistory = (hex = true) => {
  if (historyArray.length > 10) {
    historyArray.shift();
  }
  historyList.innerHTML = '';
  historyArray.forEach((elem) => {
    const item = document.createElement('li');
    if (hex) {
      item.innerText = elem.hex;
      item.style.background = elem.hex;
    } else {
      item.innerText = elem.rgb;
      item.style.background = elem.rgb;
    }
    historyList.append(item);
  });
};

const getRandomElem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateHexColor = () => {
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += getRandomElem(Array.from(symbols));
  }
  return color;
};

let hexColorMemory = '';
getColorBtn.addEventListener('click', () => {
  colorText.innerText = `#${generateHexColor()}`;
  body.style.backgroundColor = colorText.innerText;
  historyArray.push({
    hex: colorText.innerText,
    rgb: hexToRGB(colorText.innerText),
  });
  renderHistory();
  hexColorMemory = colorText.innerText;
});

toggleSystemBtn.addEventListener('click', () => {
  toggleSystemBtn.classList.toggle('is-active');
  if (toggleSystemBtn.classList.contains('is-active')) {
    renderHistory(false);
    sysName.innerText = 'rgb';
    colorText.innerText = hexToRGB(colorText.innerText);
  } else {
    renderHistory();
    sysName.innerText = 'hex';
    colorText.innerText = hexColorMemory;
  }
});