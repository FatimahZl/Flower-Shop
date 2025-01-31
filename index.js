//Selects the cart icon element from the HTML using its ID//Allows interaction with the cart icon element
const cartIcon=document.querySelector("#cart-icon"); 

//Selects the entire cart container using its class
//Enables manipulation of the cart's visibility and content
const cart=document.querySelector(".cart");

//Finds the close button for the cart using its ID
//Allows closing the cart when clicked
const cartClose=document.querySelector("#cart-close");

//When clicked, adds the "active" class to the cart, typically making it visible
cartIcon.addEventListener("click",()=>cart.classList.add("active"));

//When clicked, removes the "active" class, hiding the cart
cartClose.addEventListener("click",()=>cart.classList.remove("active"));

//Selects all elements with the "add-cart" class (typically "add to cart" buttons)
//Creates an array of these buttons for event handling
const addCartButtons=document.querySelectorAll(".add-cart");
addCartButtons.forEach(button=>{ //Iterates through each "add to cart" button //Adds a click event listener to each button 
            //When a button is clicked, it finds the closest parent product box and calls addTocCart()
  button.addEventListener("click",event=>{
    const productBox=event.target.closest(".product-box");
    addToCart(productBox);
  });
});

//Selects the container where cart items will be displayed
const cartContent =document.querySelector(".cart-content");

//Handles adding a product to the cart
//Extracts product details (image, title, price) from the product box
//Checks if the item is already in the cart
//Creates a new cart item element with quantity controls
//Adds event listeners for removing the item and changing quantity
//Updates cart count and total price
const addToCart=productBox=>{
  const productImgSrc =productBox.querySelector("img").src;
  const productTitle =productBox.querySelector(".product-title").textContent;
  const productPrice =productBox.querySelector(".price").textContent;

  const cartItems = cartContent.querySelectorAll(".cart-product-title");
  for (let item of cartItems){
    if (item.textContent === productTitle){
      alert("This item is already in the cart.");
      return;
    }
  }

  const cartBox =document.createElement("div");
  cartBox.classList.add("cart-box");
  cartBox.innerHTML = `
      <img src="${productImgSrc}" class="cart-img">
      <div class="cart-detail">
        <h2 class="cart-product-title">${productTitle}</h2>
        <span class="cart-price">${productPrice}</span>
        <div class="cart-quantity">
          <button id="decrement">-</button>
          
          <span class="number">1</span>
          <button id="increment">+</button>
        </div>
      </div>
      <i class="ri-delete-bin-line cart-remove"></i>
   
  `;

  cartContent.appendChild(cartBox);

  cartBox.querySelector(".cart-remove").addEventListener("click", () => {
    cartBox.remove();
    updateCartCount(-1)
    updateTotalPrice();
  });
  cartBox.querySelector(".cart-quantity").addEventListener("click", event =>{
    const numberElement = cartBox.querySelector(".number");
    const decrementButton = cartBox.querySelector("#decrement");
    let quantity = numberElement.textContent;

    if(event.target.id === "decrement" && quantity > 1){
      quantity--;
      if (quantity === 1) {
        decrementButton.style.color="#999";
      }

    }else if(event.target.id === "increment"){
      quantity++;
      decrementButton.style.color="#333";
    }
    numberElement.textContent=quantity;
    updateTotalPrice();
  });
  updateCartCount(1)
  updateTotalPrice();
};

//Calculates the total price of items in the cart
//Iterates through cart boxes
//Multiplies each item's price by its quantity
//Updates the total price display
const updateTotalPrice=()=>{
  const totalPriceElement=document.querySelector(".total-price");
  const cartBoxes =cartContent.querySelectorAll(".cart-box");
  let total=0;
  cartBoxes.forEach(cartBox=>{
    const priceElement=cartBox.querySelector(".cart-price");
    const quantityElement=cartBox.querySelector(".number");
    const price =priceElement.textContent.replace("$","");
    const quantity=quantityElement.textContent;
    total+=price*quantity;
  })
  totalPriceElement.textContent=`$${total}`;

};

//Tracks the number of items in the cart
let cartItemCount=0;
//Updates the cart item count badge
//Makes the badge visible/invisible based on item count
//Increments or decrements the count
const updateCartCount=change=>{
  const cartItemCountBadge=document.querySelector(".cart-item-count");
  cartItemCount+=change;
  if(cartItemCount>0){
    cartItemCountBadge.style.visibility="visible";
    cartItemCountBadge.textContent=cartItemCount;

  }else{
    cartItemCountBadge.style.visibility="hidden";
    cartItemCountBadge.textContent="";
  }
}

//Selects the "Buy Now" button
const buyNowButton =document.querySelector(".btn-buy");

//Adds a click event listener to the "Buy Now" button
//Checks if the cart is empty
//If not empty, removes all cart items
//Resets the cart count
//Redirects to the checkout page
buyNowButton.addEventListener("click",()=>{
  const cartBoxes=cartContent.querySelectorAll(".cart-box");
  if (cartBoxes.length===0){
    alert("Your cart is empty. Please add items to your cart before buying.");
    return;
  }

  cartBoxes.forEach(cartBox => cartBox.remove());

  cartItemCount=0;
  updateCartCount(0);


  updateTotalPrice();

  
  window.location.href="Checkout.html";
});

