const cardContainer = document.getElementById("cardContainer");
const overlayContainer = document.getElementById("overlayCardContainer");
const cartOverlay = document.getElementById("cartOverlay");
let prices = document.getElementById("totalPrice");
let cartData = [];
let foodData = [
  {
    title: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomatoes, and basil.",
    price: 12.99,
    category: "Pizza",
    image:
      "https://img.freepik.com/premium-photo/fresh-guacamole-with-diced-onions-lime_1243330-10099.jpg?ga=GA1.1.1241278629.1725940971&semt=ais_hybrid",
  },
  {
    title: "Caesar Salad",
    description:
      "Crisp romaine lettuce with Caesar dressing, croutons, and Parmesan.",
    price: 9.99,
    category: "Salad",
    image:
      "https://img.freepik.com/free-photo/side-view-caesar-salad-with-chicken-parmesan-cheese-white-bowl-wooden-board_140725-11875.jpg?ga=GA1.1.1241278629.1725940971&semt=ais_hybrid",
  },
  {
    title: "Spaghetti Carbonara",
    description: "Traditional pasta with eggs, cheese, pancetta, and pepper.",
    price: 14.99,
    category: "Pasta",
    image:
      "https://img.freepik.com/free-photo/bowl-spaghetti-with-green-leaf-top_1340-26760.jpg?ga=GA1.1.1241278629.1725940971&semt=ais_hybrid",
  },
  {
    title: "Vegetable Stir Fry",
    description:
      "Mixed vegetables stir-fried in a savory sauce, served with rice.",
    price: 11.49,
    category: "Vegetarian",
    image:
      "https://img.freepik.com/premium-photo/pan-colorful-peppers-peppers-with-pot-peppers_1194832-27921.jpg?ga=GA1.1.1241278629.1725940971&semt=ais_hybrid",
  },
  {
    title: "Chocolate Cake",
    description: "Rich and moist chocolate cake layered with creamy frosting.",
    price: 6.99,
    category: "Dessert",
    image:
      "https://img.freepik.com/free-photo/close-up-chocolate-cake_23-2148604534.jpg?ga=GA1.1.1241278629.1725940971&semt=ais_hybrid",
  },
  {
    title: "Sushi Platter",
    description: "Assorted sushi rolls including tuna, salmon, and avocado.",
    price: 19.99,
    category: "Sushi",
    image:
      "https://img.freepik.com/free-photo/assorted-sushi-platter_1147-453.jpg?ga=GA1.1.1241278629.1725940971&semt=ais_hybrid",
  },
];

const openOverlay = () => {
  cartOverlay.style.display = "flex";
};

const closeOverlay = () => {
  cartOverlay.style.display = "none";
  updateCartCount();
};

foodData.forEach((item, index) => {
  cardContainer.innerHTML += `<div class="card">
          <img
            src=${item.image}
            alt="Product Image"
            class="product-image"
          />
          <div class="card-details">
           <div class="price-category-container"> 
           <p class="price">Category: <span class="prices">${item.category}</span> </p>
            <p class="price" id="productPrice">
              Price: <span class="prices">$${item.price}</span>
            </p>
            </div>
            <h2 class="product-title" id="productTitle">
              ${item.title}
            </h2>
            <p class="product-description" id="productDescription">
              ${item.description}
            </p>
            <button
              type="button"
              class="add-to-cart-btn"
              id="addToCartBtn"
              onclick="addToCart(${index})"
            >
              Add To Cart
            </button>
          </div>
        </div>`;
});

const addToCart = (index) => {
  let selectedItem = foodData[index];
  let existingItem = cartData.find((item) => item.title === selectedItem.title);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    selectedItem.quantity = 1;
    cartData.push(selectedItem);
  }
  updateCartCount();
  openOverlay();
  displayCartItem();
  addCartNotification();
};

const displayCartItem = () => {
  overlayContainer.innerHTML = "";
  let totalPrice = 0;
  if (cartData.length === 0) {
    checkItem();
  } else {
    cartData.forEach((item, index) => {
      totalPrice += item.price * item.quantity;
      overlayContainer.innerHTML += `<div class="cart-card">
                    <div class="cart-product-image">
                      <img
                        src=${item.image}
                        alt="Product Image"
                        class="cart-product-img"
                      />
                    </div>
                    <div class="cart-product-details">
                      <div class="cart-product-info">
                        <h3 class="cart-product-title">${item.title}</h3>
                        <p class="price">Price: <span class="prices">$${item.price}</span></p>
                      </div>
                     <div class="counter">
                        <button class="decrement" onclick="changeQuantity(${index}, -1)">-</button>
                        <span class="count">${item.quantity}</span>
                        <button class="increment" onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                      <div>
                        <button type="button" class="remove-btn" onclick="removeItemFromCart(${index})">
                          <img src="/img/trash.png" alt="trash" />
                        </button>
                      </div>
                    </div>
                  </div>`;
    });
  }
  prices.textContent = `$${totalPrice.toFixed(2)}`;
};

const addCartNotification = () => {
  const addNotificationToast = document.getElementById("addNotificationToast");
  addNotificationToast.innerHTML = `<h3>✅ Item Added Successfully</h3>`;
  addNotificationToast.classList.add("show");

  setTimeout(() => {
    addNotificationToast.classList.remove("show");
  }, 2000);
};

const removeCartNotification = () => {
  const removeNotificationToast = document.getElementById(
    "removeNotificationToast"
  );
  removeNotificationToast.innerHTML = `<h3>❎ Item Removed Successfully</h3>`;
  removeNotificationToast.classList.add("show");

  setTimeout(() => {
    removeNotificationToast.classList.remove("show");
  }, 2000);
};

const changeQuantity = (index, change) => {
  if (cartData[index].quantity + change <= 0) {
    quantity = 1;
  } else {
    cartData[index].quantity += change;
    displayCartItem();
    updateCartCount();
  }
};

const updateCartCount = () => {
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = cartData.reduce(
    (total, item) => total + item.quantity,
    0
  );
};
const removeItemFromCart = (index) => {
  cartData.splice(index, 1);
  displayCartItem();
  updateCartCount();
  removeCartNotification();
};

const clearAllBtn = () => {
  cartData = [];
  displayCartItem();
  updateCartCount();
  prices.textContent = "$0.00";
};

const checkItem = () => {
  overlayContainer.innerHTML = `<div class="empty-cart-message">No items in the cart!</div>`;
};

window.onload = checkItem;
