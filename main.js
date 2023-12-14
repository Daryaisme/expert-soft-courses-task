const productsContainer = document.querySelector('.main__product-tiles');
let productItems = document.querySelectorAll('.product-tile');

const heartIcons = document.querySelectorAll('[data-icon-type="icon-heart"]');
const scalesIcons = document.querySelectorAll('[data-icon-type="icon-scales"]');
const eyeIcons = document.querySelectorAll('[data-icon-type="icon-eye"]');

const products = JSON.parse(localStorage.getItem('products')) 
  ?? Array.from(productItems).map(product => ({
  id: +product.dataset.productId,
  isFavourite: false,
  isComparison: false,
  isHidden: false,
}));
if(!localStorage.getItem('products')) localStorage.setItem('products', JSON.stringify(products));

window.addEventListener('load', updateProductTilesState);
function updateProductTilesState() {
  productItems.forEach(product => {
    const productIndex = product.dataset.productId - 1;

    if (products[productIndex].isFavourite) product.classList.add('product-tile_favourite');
    if (products[productIndex].isComparison) product.classList.add('product-tile_comparison');
    if (products[productIndex].isHidden) product.classList.add('product-tile_hidden');
  });
}

let currProducts = products;

const checkbox = document.querySelector('.filter-sort__checkbox');
checkbox.addEventListener('change', handleCheckboxChange);

function handleCheckboxChange() {
  updateProducts();
}

productItems.forEach(product => product.addEventListener('click', handleProductClick));

function handleProductClick (e) {
  const icon = e.target;
  const iconType = icon.dataset.iconType;
  const product = e.currentTarget;
  const productIndex = product.dataset.productId - 1;

  const activeFilterButtonType = document.querySelector('.button_active').dataset.buttonType;
  switch (iconType) {
    case 'icon-heart':
      products[productIndex].isFavourite = product.classList.toggle('product-tile_favourite');
      updateProductsInLocalStorage();
      
      if (activeFilterButtonType === 'favourites-button') updateProducts(activeFilterButtonType);
      break;
    case 'icon-scales':
      products[productIndex].isComparison = product.classList.toggle('product-tile_comparison');
      updateProductsInLocalStorage();

      if (activeFilterButtonType === 'comparison-button') updateProducts(activeFilterButtonType);
      break;
    case 'icon-eye':
    default:
      products[productIndex].isHidden = product.classList.toggle('product-tile_hidden');
      updateProductsInLocalStorage();

      if (!checkbox.checked) updateProducts();
  }

  function updateProductsInLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
  }
}

const filterButtons = document.querySelectorAll('.main__filter-sort-button');
filterButtons.forEach(buttons => buttons.addEventListener('click', handleFilterButtonClick));

function handleFilterButtonClick(e) {
  const button = e.target;
  const buttonType = button.dataset.buttonType;

  filterButtons.forEach(button => button.classList.remove('button_active'));
  button.classList.add('button_active');

  updateProducts(buttonType);
}

function updateProducts(filterButtonType) {
  if (filterButtonType) {
    let property;
    switch (filterButtonType) {
      case 'favourites-button':
        property = 'isFavourite';
        break;
      case 'comparison-button':
        property = 'isComparison';
        break;
      case 'all-button':
      default:
        property = 'all';
    }

    if (property === 'all') currProducts = products;
    else currProducts = Array.from(products).filter((product) => product[property]);
  }

  if (checkbox.checked) updateProductsListView(currProducts);
  else updateProductsListView(Array.from(currProducts).filter((product) => !product.isHidden));
}

function updateProductsListView(products) {
  productsContainer.innerHTML = '';
  for (let product of products) productsContainer.appendChild(productItems[product.id - 1]);
}
