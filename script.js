// Product data
const products = [
  {
    name: 'Floral Tote',
    price: 299,
    image: 'images/january.jpg'
  },
  {
    name: 'Canvas Love',
    price: 299,
    image: 'images/march.jpg'
  },
  {
    name: 'Elegant Print',
    price: 299,
    image: 'images/april.jpg'
  },
  {
    name: 'Eco Chic',
    price: 299,
    image: 'images/may.jpg'
  },
  {
    name: 'Classic Tote',
    price: 299,
    image: 'images/june.jpg'
  }
];

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = totalItems;
}

// Add product to cart
function addToCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products[index];

  const existingIndex = cart.findIndex(item => item.name === product.name);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Load products (Optional: can be used to dynamically load on index.html if needed)
function loadProducts() {
  const container = document.getElementById('product-list');
  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateCartCount);
