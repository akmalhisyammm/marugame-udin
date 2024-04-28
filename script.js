const menus = [
  {
    id: 'M001',
    name: 'Siku Udin',
    type: 'food',
    image: 'https://marugameudon.co.id/webroot/files/MenuDetails/picture/Niku-Udon-1.jpg',
    price: 60_000,
    stock: 10,
  },
  {
    id: 'M002',
    name: 'Kake Udin',
    type: 'food',
    image: 'https://marugameudon.co.id/webroot/files/MenuDetails/picture/Kake-Udon-1.jpg',
    price: 55_000,
    stock: 8,
  },
  {
    id: 'M003',
    name: 'Tori Bata Udin',
    image:
      'https://marugameudon.co.id/webroot/files/MenuDetails/picture/Chiken-Katsu-curry-udon-1.jpg',
    type: 'food',
    price: 70_000,
    stock: 15,
  },
  {
    id: 'M004',
    name: 'Icha',
    type: 'beverage',
    image: 'https://marugameudon.co.id/webroot/files/MenuDetails/picture/ocha.jpg',
    price: 10_000,
    stock: 30,
  },
  {
    id: 'M005',
    name: 'Watermolen Juice',
    image:
      'https://marugameudon.co.id/webroot/files/MenuDetails/picture/Image%20Web_Double%20Wall_Fresh%20Watermelon%20Juice.jpg',
    type: 'beverage',
    price: 20_000,
    stock: 25,
  },
  {
    id: 'M006',
    name: 'Long Black Coffee',
    type: 'beverage',
    image: 'https://marugameudon.co.id/webroot/files/MenuDetails/picture/long-black-caffe-01.jpg',
    price: 15_000,
    stock: 40,
  },
];
const carts = [];

function addToCart(e) {
  const menuEl = e.currentTarget.parentElement.parentElement;

  const menuId = menuEl.id;
  const cartId = 'C' + menuId.slice(1);

  const menu = menus.find((menu) => menu.id === menuId);
  const cart = carts.find((cart) => cart.id === cartId);

  if (!cart) {
    const newCart = {
      id: cartId,
      menuId: menu.id,
      name: menu.name,
      image: menu.image,
      price: menu.price,
      quantity: 1,
    };

    carts.push(newCart);

    let content = `
      <div id="${newCart.id}" class="cart flex justify-between shadow-lg rounded-lg gap-4 p-4">
        <div class="flex gap-4">
          <img src="${newCart.image}" alt="${newCart.name}" width="50">
          <div>
            <h1 id="name-${newCart.id}">${newCart.name} <span id="qty-${newCart.id}">(${
      newCart.quantity
    })</span></h1>
            <p id="price-${newCart.id}" class="font-bold">${new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(newCart.price)}</p>
          </div>
        </div>
        <button id="deleteBtn-${
          newCart.id
        }" class="h-fit text-white bg-red-700 hover:bg-red-800 rounded-lg p-2" onclick="${deleteCart}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    `;

    document.querySelector('#carts p').classList.add('hidden');
    document.getElementById('carts').nextElementSibling.classList.remove('hidden');
    document.getElementById('carts').innerHTML += content;
  } else {
    carts.forEach((cart, idx) => {
      if (cart.id === cartId) {
        carts.splice(idx, 1, {
          ...cart,
          price: cart.price + menu.price,
          quantity: cart.quantity + 1,
        });
      }
    });

    const updatedCart = carts.find((cart) => cart.id === cartId);

    document.getElementById(`qty-${updatedCart.id}`).innerText = `(${updatedCart.quantity})`;
    document.getElementById(`price-${updatedCart.id}`).innerText = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(updatedCart.price);
  }

  menus.forEach((menu, idx) => {
    if (menu.id === menuId) {
      menus.splice(idx, 1, { ...menu, stock: menu.stock - 1 });
    }
  });

  const updatedMenu = menus.find((menu) => menu.id === menuId);

  if (!updatedMenu.stock) {
    document.getElementById(`addBtn-${updatedMenu.id}`).disabled = true;
    document.getElementById(`addBtn-${updatedMenu.id}`).style.backgroundColor = 'gray';
  }

  document.getElementById(`stock-${updatedMenu.id}`).innerText = `Stock: ${updatedMenu.stock}`;
  document.querySelectorAll('.cart button').forEach((button) => (button.onclick = deleteCart));
}

function deleteCart(e) {
  const cartEl = e.currentTarget.parentElement;

  const cartId = cartEl.id;
  const menuId = 'M' + cartId.slice(1);

  const cart = carts.find((cart) => cart.id === cartId);

  menus.forEach((menu, idx) => {
    if (menu.id === menuId) {
      menus.splice(idx, 1, { ...menu, stock: menu.stock + cart.quantity });
    }
  });
  carts.forEach((cart, idx) => {
    if (cart.id === cartId) {
      carts.splice(idx, 1);
    }
  });

  const updatedMenu = menus.find((menu) => menu.id === menuId);

  document.getElementById(`stock-${menuId}`).innerText = `Stock: ${updatedMenu.stock}`;
  document.getElementById(`addBtn-${updatedMenu.id}`).disabled = false;
  document.getElementById(`addBtn-${updatedMenu.id}`).style.backgroundColor = '';

  if (!carts.length) {
    document.querySelector('#carts p').classList.remove('hidden');
    document.getElementById('carts').nextElementSibling.classList.add('hidden');
  }

  cartEl.remove();
}

function render() {
  let content = '';

  menus.forEach((menu) => {
    content += `
      <div id="${
        menu.id
      }" class="menu flex flex-col justify-between shadow-lg rounded-lg gap-2 p-4">
        <img src="${menu.image}" alt=${menu.name}>
        <div class="flex flex-col gap-2">
          <h3 id="name-${menu.id}">${menu.name}</h3>
          <p id="price-${menu.id}" class="font-bold">${new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(menu.price)}</p>
          <p id="stock-${menu.id}">Stock: ${menu.stock}</p>
          <button id="addBtn-${
            menu.id
          }" class="flex justify-center items-center text-white bg-green-700 hover:bg-green-800 w-full rounded-lg gap-1 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            <span class="pb-px">Cart</span>
          </button>
        </div>
      </div>
    `;
  });

  document.getElementById('menus').innerHTML = content;
  document.querySelectorAll('.menu div button').forEach((button) => (button.onclick = addToCart));
}

render();
