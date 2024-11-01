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
  cartData.push(selectedItem);
  openOverlay();
  displayCartItem();
};

const displayCartItem = () => {
  overlayContainer.innerHTML = "";
  let totalPrice = 0;
  cartData.forEach((item, index) => {
    totalPrice += item.price;
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
                  <div>
                    <button type="button" class="remove-btn" onclick="removeItemFromCart(${index})">
                      <img src="/img/trash.png" alt="trash" />
                    </button>
                  </div>
                </div>
              </div>`;
  });

  prices.textContent = `$${totalPrice}`;
};

const removeItemFromCart = (index) => {
  cartData.splice(index, 1);
  displayCartItem();
};

const clearAllBtn = () => {
  cartData = [];
  displayCartItem();
  prices.textContent = "$0";
};
