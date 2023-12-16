const FAVOURITE = 'favourite';
const COMPARISON = 'comparison';
const ALL = 'all';

const productsContainer = document.querySelector('.main__product-tiles');
const productItems = document.querySelectorAll('.product-tile');

const checkbox = document.querySelector('.filter-sort__checkbox');
checkbox.addEventListener('change', handleCheckboxChange);

let activeFilterButtonType = ALL;

const filterButtons = document.querySelectorAll('.main__filter-sort-button');
filterButtons.forEach(buttons => buttons.addEventListener('click', handleFilterButtonClick));

let products = JSON.parse(localStorage.getItem('products'));
if (!products) {
  products = Array.from(productItems).map(product => ({
    id: +product.dataset.productId,
    isFavourite: false,
    isComparison: false,
    isHidden: false,
  }));
  localStorage.setItem('products', JSON.stringify(products));
}

window.addEventListener('load', updateProductTilesState);

productItems.forEach(product => product.addEventListener('click', handleProductClick));

function updateProductTilesState() {
  productItems.forEach(product => {
    const productIndex = product.dataset.productId - 1;

    if (products[productIndex].isFavourite) product.classList.add('product-tile_favourite');
    if (products[productIndex].isComparison) product.classList.add('product-tile_comparison');
    if (products[productIndex].isHidden) product.classList.add('product-tile_hidden');
  });
}

function handleCheckboxChange() {
  updateProductList(activeFilterButtonType);
}

function handleProductClick (e) {
  const icon = e.target;
  const iconType = icon.dataset.iconType;
  const product = e.currentTarget;
  const productIndex = product.dataset.productId - 1;

  switch (iconType) {
    case 'icon-heart':
      products[productIndex].isFavourite = product.classList.toggle('product-tile_favourite');
      if (activeFilterButtonType === FAVOURITE) updateProductList(FAVOURITE);
      break;
    case 'icon-scales':
      products[productIndex].isComparison = product.classList.toggle('product-tile_comparison');
      if (activeFilterButtonType === COMPARISON) updateProductList(COMPARISON);
      break;
    case 'icon-eye':
      products[productIndex].isHidden = product.classList.toggle('product-tile_hidden');
      if (!checkbox.checked) updateProductList(activeFilterButtonType);
  }

  localStorage.setItem('products', JSON.stringify(products));
}

function handleFilterButtonClick(e) {
  const button = e.target;
  const buttonType = button.dataset.buttonType;

  filterButtons.forEach(button => button.classList.remove('button_active'));
  button.classList.add('button_active');

  activeFilterButtonType = buttonType;

  updateProductList(buttonType);
}

function updateProductList(filterButtonType) {
  let currProducts = products;

  const properties = {
    [FAVOURITE]: 'isFavourite',
    [COMPARISON]: 'isComparison',
    [ALL]: 'all',
  }
  const property = properties[filterButtonType];

  if (property !== 'all') currProducts = Array.from(products).filter(product => product[property]);
  if (!checkbox.checked) currProducts = Array.from(currProducts).filter((product) => !product.isHidden);

  updateProductListView(currProducts);
}

function updateProductListView(products) {
  productsContainer.innerHTML = '';
  for (let product of products) productsContainer.appendChild(productItems[product.id - 1]);
}
