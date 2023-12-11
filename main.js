const productsContainer = document.querySelector('.main__product-tiles');
const productItems = document.querySelectorAll('.product-tile');

const heartIcons = document.querySelectorAll('[data-icon-type="icon-heart"]');
const scalesIcons = document.querySelectorAll('[data-icon-type="icon-scales"]');
const eyeIcons = document.querySelectorAll('[data-icon-type="icon-eye"]');

const products = JSON.parse(localStorage.getItem('products')) 
  ?? Array.from(productItems).map((product, ind) => ({
  id: ind + 1,
  fav: false,
  comparison: false,
  shown: false,
}));

heartIcons.forEach((icon, ind) => {
  if (products[ind].fav) icon.classList.add('product-tile__icon_active');
});
scalesIcons.forEach((icon, ind) => {
  if (products[ind].comparison) icon.classList.add('product-tile__icon_active');
});
eyeIcons.forEach((icon, ind) => {
  if (products[ind].shown) {
    icon.classList.add('product-tile__icon_active');
    productItems[ind].classList.add('product-tile_hidden');
  }
});

let currProducts = products;

if(!localStorage.getItem('products')) localStorage.setItem('products', JSON.stringify(products));

const checkbox = document.querySelector('.filter-sort__checkbox');
checkbox.addEventListener('change', handleCheckboxChange);

function handleCheckboxChange() {
  updateProducts();
}

heartIcons.forEach(icon => icon.addEventListener('click', handleIconClick));
scalesIcons.forEach(icon => icon.addEventListener('click', handleIconClick));
eyeIcons.forEach(icon => icon.addEventListener('click', handleIconClick));

function handleIconClick (e) {
  const icon = e.target;

  icon.classList.contains('product-tile__icon_active') 
    ? icon.classList.remove('product-tile__icon_active') 
    : icon.classList.add('product-tile__icon_active');

  const activeFilterButton = document.querySelector('.main__filter-sort-button.button.button_active');
  switch (icon.dataset.iconType) {
    case 'icon-heart':
      toggleProductActive(heartIcons, 'fav');
      if (activeFilterButton.innerHTML === 'Favourites') updateProducts(activeFilterButton);
      break;
    case 'icon-scales':
      toggleProductActive(scalesIcons, 'comparison');
      if (activeFilterButton.innerHTML === 'Comparison') updateProducts(activeFilterButton);
      break;
    case 'icon-eye':
    default:
      let id = getProductId(eyeIcons);

      if (icon.classList.contains('product-tile__icon_active')) productItems[id - 1].classList.add('product-tile_hidden');
      else productItems[id - 1].classList.remove('product-tile_hidden');

      toggleProductActive(eyeIcons, 'shown');
      if (!checkbox.checked) updateProducts();
  }

  function toggleProductActive(icons, property) {
    let id = getProductId(icons);
    products[id - 1][property] = icon.classList.contains('product-tile__icon_active');
    localStorage.setItem('products', JSON.stringify(products));
  }

  function getProductId(icons) {
    return Array.from(icons).indexOf(e.target) + 1;
  }
};

const filterButtons = document.querySelectorAll('.main__filter-sort-button');
filterButtons.forEach(buttons => buttons.addEventListener('click', handleFilterButtonClick));

function handleFilterButtonClick(e) {
  const button = e.target;

  filterButtons.forEach(button => button.classList.remove('button_active'));
  button.classList.add('button_active');

  updateProducts(button);
}

function updateProducts(filterButton) {
  if (filterButton) {
    let property;
    switch (filterButton.innerHTML) {
      case 'Favourites':
        property = 'fav';
        break;
      case 'Comparison':
        property = 'comparison';
        break;
      case 'All':
      default:
        property = 'all';
    }

    if (property === 'all') currProducts = products;
    else currProducts = Array.from(products).filter((product) => product[property]);
  }

  if (checkbox.checked) setProducts(currProducts);
  else setProducts(Array.from(currProducts).filter((product) => !product.shown));
}

function setProducts(products) {
  productsContainer.innerHTML = '';
  for (let product of products) productsContainer.appendChild(productItems[product.id - 1]);
}
