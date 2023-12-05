let productContent = document.querySelector('.main__product-tiles');
let productItems = document.querySelectorAll('.product-tile');

let heartIcons = document.querySelectorAll('[data-icon-type="icon-heart"]');
let scalesIcons = document.querySelectorAll('[data-icon-type="icon-scales"]');
let eyeIcons = document.querySelectorAll('[data-icon-type="icon-eye"]');

let products = [];
// let favBooks = [];
// let comparisonBooks = [];
// let shownBooks = [];
for (let i = 0; i < productItems.length; i++) {
  let product = {};
  product['id'] = i + 1;
  product['fav'] = heartIcons[i].classList.contains("product-tile__icon_active");
  product['comparison'] = scalesIcons[i].classList.contains("product-tile__icon_active");
  product['shown'] = eyeIcons[i].classList.contains("product-tile__icon_active");
  product['HTML'] = productItems[i];

  products.push(product);

  // if (heartIcons[i].classList.contains("product-tile__icon_active")) favBooks.push(i + 1);
  // if (scalesIsons[i].classList.contains("product-tile__icon_active")) comparisonBooks.push(i + 1);
  // if (eyeIcons[i].classList.contains("product-tile__icon_active")) shownBooks.push(i + 1);
}

// heartIcons.forEach(icon => icon.addEventListener('click', handleIconClick));
// scalesIcons.forEach(icon => icon.addEventListener('click', handleIconClick));
// eyeIcons.forEach(icon => icon.addEventListener('click', handleIconClick));

let checkbox = document.querySelector('.main__filter-sort-checkbox');
checkbox.addEventListener('change', handleCheckboxChange);

function handleCheckboxChange() {
  updateProducts();
}

let filterButtons = document.querySelectorAll('.main__filter-sort-button');
filterButtons.forEach(buttons => buttons.addEventListener('click', handleFilterButtonClick));

let newProducts = products;
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
