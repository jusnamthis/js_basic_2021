'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});


// объект будет хранить информацию о том, какое количество раз каждый товар был добавлен в корзину
let objectsCounter = {};
objectsCounter['sumToTotal'] = 0;

// получаю все товары, т.е полный блок
let itemBlock = document.querySelectorAll('.featuredItem');
itemBlock.forEach((el) => {
    // на кнопку в каждом из блоков товара кладу обработчика событий
    el.querySelector('button').addEventListener('click', e => {
        const data = el.querySelector('.featuredData');
        itemToBasket(el, data);
});});


function itemToBasket(el, eData){
	const itemName = eData.querySelector('.featuredName').innerText;
	let price = eData.querySelector('.featuredPrice').innerText;
    if (price[0] === '$') {price = price.slice(1);}
    let itemId = el.dataset.id;
    // если товар уже был добавлен в корзину
    if (objectsCounter[itemName]){
        let dbc = document.querySelector(`.basketRow[data-id="${itemId}"]`);
        dbc.querySelector('span.productCount').innerText = ++objectsCounter[itemName];
        getTotalOfBasket(price);
        dbc.querySelector('span.productTotalRow').innerText = price* dbc.querySelector('span.productCount').innerText;
        return;
    }
    // если не был добвален
    ItemsInBasketCounter(itemName);
    getTotalOfBasket(price);
    
  const productRow = `
    <div class="basketRow" data-id="${itemId}">
      <div>${itemName}</div>
      <div>
        <span class="productCount">${objectsCounter[itemName]}</span> шт.
      </div>
      <div>$${price}</div>
      <div>
        $<span class="productTotalRow">150</span>
      </div>
    </div>
    `;
  const basketTotalEl = document.querySelector('.basketTotal');
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}

function ItemsInBasketCounter(item){
    if (objectsCounter[item]) {
        objectsCounter[item]++;
    }
    else {
        objectsCounter[item] = 1;
    }
}

let total = document.querySelector('.basketTotalValue');
function getTotalOfBasket(itemPrice){
    objectsCounter['sumToTotal'] = objectsCounter['sumToTotal'] + parseFloat(itemPrice);
    total.innerText = objectsCounter['sumToTotal'];
}


