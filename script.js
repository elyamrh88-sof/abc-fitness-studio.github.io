// ==========================================
// SUBSCRIBE FEATURE — ALL PAGES
// ==========================================

function subscribeUser() {
  alert("Thank you for subscribing.");
}


// ==========================================
// SHOPPING CART — SESSION STORAGE
// ==========================================

// Retrieve the cart from sessionStorage.
// If there is no cart, return an empty array.
function getCart() {
  const storedCart = sessionStorage.getItem("abcFitnessCart");

  if (storedCart) {
    return JSON.parse(storedCart);
  }

  return [];
}


// Save the cart in sessionStorage.
function saveCart(cart) {
  sessionStorage.setItem("abcFitnessCart", JSON.stringify(cart));
}


// Add an item to the shopping cart.
function addToCart(itemName, itemPrice) {
  const cart = getCart();

  const item = {
    name: itemName,
    price: Number(itemPrice)
  };

  cart.push(item);
  saveCart(cart);

  alert("Item added to the cart.");
}


// Display the cart modal and retrieve its information
// from sessionStorage.
function viewCart() {
  const cart = getCart();
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartModal = document.getElementById("cart-modal");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "Total: $0.00";
  } else {
    let total = 0;
    const itemList = document.createElement("ul");

    cart.forEach(function(item) {
      const listItem = document.createElement("li");

      listItem.textContent =
        item.name + " — $" + item.price.toFixed(2);

      itemList.appendChild(listItem);
      total += item.price;
    });

    cartItems.appendChild(itemList);
    cartTotal.textContent = "Total: $" + total.toFixed(2);
  }

  cartModal.style.display = "block";
}


// Close the cart modal.
function closeCart() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.style.display = "none";
}


// Clear all cart information from sessionStorage.
function clearCart() {
  sessionStorage.removeItem("abcFitnessCart");

  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (cartItems) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  }

  if (cartTotal) {
    cartTotal.textContent = "Total: $0.00";
  }

  alert("Cart cleared.");
}


// Process the order and clear sessionStorage.
function processOrder() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  sessionStorage.removeItem("abcFitnessCart");

  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (cartItems) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  }

  if (cartTotal) {
    cartTotal.textContent = "Total: $0.00";
  }

  alert("Thank you for your order.");
  closeCart();
}


// Close the modal when the user clicks outside of it.
window.addEventListener("click", function(event) {
  const cartModal = document.getElementById("cart-modal");

  if (cartModal && event.target === cartModal) {
    closeCart();
  }
});


// ==========================================
// CONTACT/CUSTOM ORDER — LOCAL STORAGE
// ==========================================

function saveCustomOrder(event) {
    event.preventDefault();

    const customerName =
        document.getElementById("name").value.trim();

    const customerEmail =
        document.getElementById("email").value.trim();

    const serviceType =
        document.getElementById("class-interest").value;

    const customerMessage =
        document.getElementById("message").value.trim();

    const customOrder = {
        name: customerName,
        email: customerEmail,
        service: serviceType,
        message: customerMessage,
        submittedAt: new Date().toLocaleString()
    };

    localStorage.setItem(
        "abcFitnessCustomOrder",
        JSON.stringify(customOrder)
    );

    alert("Thank you for your message.");

    document.getElementById("contact-form").reset();
}

// Display previously saved localStorage information.
function viewSavedOrder() {
  const storedOrder = localStorage.getItem("abcFitnessCustomOrder");
  const savedOrderDisplay = document.getElementById("saved-order");

  if (!storedOrder) {
    savedOrderDisplay.innerHTML =
      "<p>No saved customer or custom order information was found.</p>";

    return;
  }

  const order = JSON.parse(storedOrder);

  savedOrderDisplay.innerHTML = `
    <h3>Saved Custom Order</h3>
    <p><strong>Name:</strong> ${order.name}</p>
    <p><strong>Email:</strong> ${order.email}</p>
    <p><strong>Phone:</strong> ${order.phone || "Not provided"}</p>
    <p><strong>Service:</strong> ${order.service}</p>
    <p><strong>Message:</strong> ${order.message}</p>
    <p><strong>Submitted:</strong> ${order.submittedAt}</p>
  `;
}


// Remove saved custom order information.
function clearSavedOrder() {
  localStorage.removeItem("abcFitnessCustomOrder");

  const savedOrderDisplay = document.getElementById("saved-order");

  savedOrderDisplay.innerHTML =
    "<p>No saved customer or custom order information was found.</p>";

  alert("Saved information cleared.");
}
