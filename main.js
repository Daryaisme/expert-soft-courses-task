let productContent = document.querySelector('.main__product-tiles');
let productItems = document.querySelectorAll('.product-tile');

let heartIcons = document.querySelectorAll('[data-icon-type="icon-heart"]');
let scalesIcons = document.querySelectorAll('[data-icon-type="icon-scales"]');
let eyeIcons = document.querySelectorAll('[data-icon-type="icon-eye"]');

let products = [];
for (let i = 0; i < productItems.length; i++) {
  let product = {};
  product['id'] = i + 1;
  product['fav'] = heartIcons[i].classList.contains('product-tile__icon_active');
  product['comparison'] = scalesIcons[i].classList.contains('product-tile__icon_active');
  product['shown'] = eyeIcons[i].classList.contains('product-tile__icon_active');
  product['HTML'] = productItems[i];

  products.push(product);
}
let newProducts = products;

productItems.forEach(icon => icon.addEventListener('click', function (event) {
  let icon = event.target;
  if (icon.classList.contains('product-tile__icon')) {
    let id = Array.from(productItems).indexOf(event.currentTarget) + 1;

    if (icon.classList.contains('product-tile__icon_active')) event.target.classList.remove('product-tile__icon_active');
    else event.target.classList.add('product-tile__icon_active');

    switch (event.target.dataset.iconType) {
      case 'icon-heart':
        products[id - 1].fav = icon.classList.contains('product-tile__icon_active');
        break;
      case 'icon-scales':
        products[id - 1].comparison = icon.classList.contains('product-tile__icon_active');
        break;
      case 'icon-eye':
        if (icon.classList.contains('product-tile__icon_active')) event.currentTarget.classList.add('product-tile_hidden');
        else event.currentTarget.classList.remove('product-tile_hidden');

        products[id - 1].shown = icon.classList.contains('product-tile__icon_active');
        break;
    }

    let activeFilterButton = document.querySelector('.main__filter-sort-button.button.button_active');
    switch (activeFilterButton.innerHTML) {
      case 'Favourites':
        updateProducts('fav');
        break;
      case 'Comparison':
        updateProducts('comparison');
        break;
      case 'All':
      default:
        updateProducts('all');
        break;
    }
  }
}));


let checkbox = document.querySelector('.main__filter-sort-checkbox');
checkbox.addEventListener('change', handleCheckboxChange);

function handleCheckboxChange() {
  updateProducts();
}

let filterButtons = document.querySelectorAll('.main__filter-sort-button');
filterButtons.forEach(buttons => buttons.addEventListener('click', handleFilterButtonClick));

function handleFilterButtonClick() {
  filterButtons.forEach(button => button.classList.remove('button_active'));
  this.classList.add('button_active');

  switch (this.innerHTML) {
    case 'Favourites':
      updateProducts('fav');
      break;
    case 'Comparison':
      updateProducts('comparison');
      break;
    case 'All':
    default:
      updateProducts('all');
      break;
  }
}

function updateProducts(property) {
  if (property) {
    if (property === 'all') newProducts = products;
    else newProducts = Array.from(products).filter((product) => product[property]);
  }

  if (checkbox.checked) setProducts(newProducts);
  else setProducts(Array.from(newProducts).filter((product) => !product.shown));
}

function setProducts(products) {
  productContent.innerHTML = '';
  for (let product of products) productContent.appendChild(product.HTML);
}
