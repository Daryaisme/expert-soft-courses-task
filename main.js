const productsContainer = document.querySelector('.main__product-tiles');
const productItems = document.querySelectorAll('.product-tile');

const heartIcons = document.querySelectorAll('[data-icon-type="icon-heart"]');
const scalesIcons = document.querySelectorAll('[data-icon-type="icon-scales"]');
const eyeIcons = document.querySelectorAll('[data-icon-type="icon-eye"]');

const products = Array.from(productItems).map((product, ind) => ({
  id: ind + 1,
  fav: heartIcons[ind].classList.contains('product-tile__icon_active'),
  comparison: scalesIcons[ind].classList.contains('product-tile__icon_active'),
  shown: eyeIcons[ind].classList.contains('product-tile__icon_active'),
  html: product,
}));
let newProducts = products;

heartIcons.forEach(icon => icon.addEventListener('click', handleIconClick));
scalesIcons.forEach(icon => icon.addEventListener('click', handleIconClick));
eyeIcons.forEach(icon => icon.addEventListener('click', handleIconClick));

function handleIconClick (e) {
  const icon = e.target;

  icon.classList.contains('product-tile__icon_active') 
    ? icon.classList.remove('product-tile__icon_active') 
    : icon.classList.add('product-tile__icon_active');

  let id;
  switch (icon.dataset.iconType) {
    case 'icon-heart':
      id = getProductId(heartIcons);
      products[id - 1].fav = icon.classList.contains('product-tile__icon_active');
      break;
    case 'icon-scales':
      id = getProductId(scalesIcons);
      products[id - 1].comparison = icon.classList.contains('product-tile__icon_active');
      break;
    case 'icon-eye':
    default:
      id = getProductId(eyeIcons);

      if (icon.classList.contains('product-tile__icon_active')) products[id - 1].html.classList.add('product-tile_hidden');
      else products[id - 1].html.classList.remove('product-tile_hidden');

      products[id - 1].shown = icon.classList.contains('product-tile__icon_active');
  }

  const activeFilterButton = document.querySelector('.main__filter-sort-button.button.button_active');
  updateProducts(activeFilterButton);

  function getProductId(icons) {
    return Array.from(icons).indexOf(e.target) + 1;
  }
};


const checkbox = document.querySelector('.main__filter-sort-checkbox');
checkbox.addEventListener('change', handleCheckboxChange);

function handleCheckboxChange() {
  updateProducts();
}

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

    if (property === 'all') newProducts = products;
    else newProducts = Array.from(products).filter((product) => product[property]);
  }

  if (checkbox.checked) setProducts(newProducts);
  else setProducts(Array.from(newProducts).filter((product) => !product.shown));
}

function setProducts(products) {
  productsContainer.innerHTML = '';
  for (let product of products) productsContainer.appendChild(product.html);
}
