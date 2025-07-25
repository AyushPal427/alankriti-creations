// ✅ script.js - Cart functionality with localStorage, Razorpay, WhatsApp link, toasts

const products = [
  { id: 1, name: "Floral Tote", price: 299, image: "images/bag1.jpg" },
  { id: 2, name: "Canvas Love", price: 299, image: "images/bag2.jpg" },
  { id: 3, name: "Elegant Print", price: 299, image: "images/bag3.jpg" },
  { id: 4, name: "Eco Chic", price: 299, image: "images/bag4.jpg" }
];

function loadCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  const cart = loadCart();
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }
  saveCart(cart);
  showToast("✅ Item added!");
  updateCartIcon();
}

function removeFromCart(id) {
  let cart = loadCart();
  cart = cart.filter(p => p.id !== id);
  saveCart(cart);
  displayCart();
  updateCartIcon();
}

function changeQty(id, delta) {
  const cart = loadCart();
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id);
      return;
    }
    saveCart(cart);
    displayCart();
    updateCartIcon();
  }
}

function displayCart() {
  const cart = loadCart();
  const cartItems = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      total += product.price * item.quantity;
      cartItems.innerHTML += `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}" />
          <div class="cart-details">
            <h3>${product.name}</h3>
            <p>₹${product.price} x ${item.quantity} = ₹${product.price * item.quantity}</p>
            <div class="qty-controls">
              <button onclick="changeQty(${item.id}, -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="changeQty(${item.id}, 1)">+</button>
              <button class="remove" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
          </div>
        </div>
      `;
    }
  });
  totalDisplay.innerText = total;
  document.getElementById("whatsapp-link").href = `https://wa.me/91XXXXXXXXXX?text=I want to order tote bags. Total amount: ₹${total}`;
}

function updateCartIcon() {
  const cart = loadCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const icon = document.getElementById("cart-count");
  if (icon) icon.innerText = count;
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

function checkoutRazorpay() {
  const total = document.getElementById("cart-total").innerText;
  window.location.href = `https://rzp.io/l/alankriti-bags?amount=${parseInt(total) * 100}`;
}

// Init
if (window.location.pathname.includes("cart.html")) {
  displayCart();
  updateCartIcon();
} else {
  updateCartIcon();
}
