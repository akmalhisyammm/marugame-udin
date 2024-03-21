let menus = [
  {
    id: 1,
    name: 'Siku Udin',
    price: 60_000,
    type: 'food',
    image: 'https://marugameudon.co.id/webroot/files/MenuDetails/picture/Niku-Udon-1.jpg',
    stock: 10,
  },
  {
    id: 2,
    name: 'Kake Udin',
    price: 55_000,
    type: 'food',
    image: 'https://marugameudon.co.id/webroot/files/MenuDetails/picture/Kake-Udon-1.jpg',
    stock: 8,
  },
  {
    id: 3,
    name: 'Tori Bata Udin',
    price: 70_000,
    type: 'food',
    image:
      'https://marugameudon.co.id/webroot/files/MenuDetails/picture/Chiken-Katsu-curry-udon-1.jpg',
    stock: 15,
  },
  {
    id: 4,
    name: 'Icha',
    price: 10_000,
    type: 'beverage',
    image: 'https://marugameudon.co.id/webroot/files/MenuDetails/picture/ocha.jpg',
    stock: 30,
  },
  {
    id: 5,
    name: 'Watermolen Juice',
    price: 20_000,
    type: 'beverage',
    image:
      'https://marugameudon.co.id/webroot/files/MenuDetails/picture/Image%20Web_Double%20Wall_Fresh%20Watermelon%20Juice.jpg',
    stock: 25,
  },
  {
    id: 6,
    name: 'Long Black Coffee',
    price: 15_000,
    type: 'beverage',
    image: 'https://marugameudon.co.id/webroot/files/MenuDetails/picture/long-black-caffe-01.jpg',
    stock: 40,
  },
];
let carts = [];

function addToCart(e) {
  const { id } = e.target;
  const menu = menus.find((menu) => menu.id === +id);
  const cart = carts.find((cart) => cart.id === +id);

  if (!cart) {
    carts.push({
      id: menu.id,
      name: menu.name,
      price: menu.price,
      image: menu.image,
      quantity: 1,
    });

    const newCart = carts.find((cart) => cart.id === +id);

    let content = `
      <div id="cart-${newCart.id}" class="flex justify-between shadow-lg gap-4 p-4">
        <div class="flex gap-4">
          <img src="${newCart.image}" alt="${newCart.name}" width="50">
          <div>
            <h1>${newCart.name}</h1>
            <p id="price-cart-${newCart.id}" class="font-bold">${newCart.price}</p>
          </div>
        </div>
        <div class="flex gap-2 h-fit">
          <p id="qty-cart-${newCart.id}">${newCart.quantity}</p>
          <button id="delete-cart-${newCart.id}" class="delete-menu p-2 text-white bg-red-700 rounded-lg">Delete</button>
        </div>
      </div>
    `;

    document.getElementById('carts').innerHTML += content;
  } else {
    const newMenus = menus.map((menu) => {
      if (menu.id === +id) {
        return { ...menu, stock: menu.stock - 1 };
      }
      return menu;
    });
    const newCarts = carts.map((cart) => {
      if (cart.id === +id) {
        return { ...cart, quantity: cart.quantity + 1, price: cart.price + menu.price };
      }
      return cart;
    });

    menus = newMenus;
    carts = newCarts;

    const newCart = carts.find((cart) => cart.id === +id);
    document.getElementById(`qty-cart-${newCart.id}`).innerText = newCart.quantity;
    document.getElementById(`price-cart-${newCart.id}`).innerText = newCart.price;
  }

  document.getElementById(`delete-cart-${menu.id}`).onclick = deleteCart;
}

function deleteCart(e) {
  e.target.parentElement.parentElement.remove();
}

function render() {
  let content = '';

  for (const menu of menus) {
    content += `
      <div id="menu-${menu.id}" class="shadow-lg p-4">
        <img src="${menu.image}" alt=${menu.name}>
        <div class="flex flex-col gap-2">
          <h3>${menu.name}</h3>
          <p class="font-bold">${menu.price}</p>
          <button id="${menu.id}" class="add-cart p-2 text-white bg-green-700 w-full rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mx-auto">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  document.getElementById('cards').innerHTML = content;
  document.querySelectorAll('button.add-cart').forEach((button) => (button.onclick = addToCart));
}

render();
