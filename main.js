let books = [];
let content = document.querySelector('.main__product-tiles');
let bks = document.querySelectorAll('.product-tile');

let fav = document.querySelectorAll('[data-icon-type="icon-heart"]');
let favbool = Array.from(fav).map(el => el.classList.contains("product-tile__icon_active"));

let comp = document.querySelectorAll('[data-icon-type="icon-scales"]');
let compbool = Array.from(comp).map(el => el.classList.contains("product-tile__icon_active"));

let objs = document.querySelectorAll(".product-tile");
for (let i = 0; i < objs.length; i++) {
  let obj = {};
  obj['fav'] = favbool[i];
  obj['comp'] = compbool[i];

  books.push(obj);
}

let btns = document.querySelectorAll('.main__filter-sort-button');

function handleClick() {
  btns.forEach(el => el.classList.remove('button_active'));
  this.classList.add('button_active');

  content.innerHTML = "";

  let bks2 = bks;
  switch (this.innerHTML) {
    case "All":
      for (let node of bks) content.appendChild(node);
      break;
    case "Favourites":
      bks2 = Array.from(bks).filter((el, ind) => books[ind].fav);
      for (let node of bks2) content.appendChild(node);
      break;
    case "Comparison":
      bks2 = Array.from(bks).filter((el, ind) => books[ind].comp);
      for (let node of bks2) content.appendChild(node);
      break;
    default:
      console.log('Tresh');
  }
}

btns.forEach(btn => btn.addEventListener('click', handleClick));
