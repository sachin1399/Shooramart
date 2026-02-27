let cart = {};

// Load cart from localStorage (SAFE)
try {
  const saved = JSON.parse(localStorage.getItem("cart"));
  if (saved && typeof saved === "object" && !Array.isArray(saved)) {
    cart = saved;
  }
} catch (e) {
  cart = {};
}

// Get quantity of a specific product
function getQty(name) {
  return cart[name] ? cart[name] : 0;
}

// Add item to cart
function addItem(name, qty = 1) {
  if (!name) return;
  cart[name] = (cart[name] || 0) + qty;
  saveCart();
}

// Remove item from cart
function removeItem(name, qty = 1) {
  if (!cart[name]) return;

  cart[name] -= qty;

  if (cart[name] <= 0) {
    delete cart[name];
  }

  saveCart();
}

// Total items in cart (NO [object Object])
function getCartCount() {
  return Object.values(cart).reduce((sum, value) => sum + Number(value), 0);
}

// Save cart and update UI
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

// Update cart count in navigation
function updateCartUI() {
  const el = document.getElementById("cart-count");
  if (el) {
    el.innerText = getCartCount(); // ✅ number only
  }
}

// DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();

  document.querySelectorAll(".product-card").forEach((card) => {
    const nameEl = card.querySelector(".product-name");
    const plus = card.querySelector(".plus");
    const minus = card.querySelector(".minus");
    const qty = card.querySelector(".qty");
    const addBtn = card.querySelector(".add-to-cart");

    if (!nameEl || !qty) return;

    const name = nameEl.innerText.trim();

    // Initial quantity
    qty.innerText = getQty(name);

    if (plus) {
      plus.onclick = () => {
        addItem(name, 1);
        qty.innerText = getQty(name);
      };
    }

    if (minus) {
      minus.onclick = () => {
        removeItem(name, 1);
        qty.innerText = getQty(name);
      };
    }

    if (addBtn) {
      addBtn.onclick = () => {
        addItem(name, 1);
        qty.innerText = getQty(name);
        showGreenToast(`${name} added successfully!`);
      };
    }
  });

  // PRICE FILTER
  const priceRange = document.getElementById("price-range");
  const rangeValue = document.getElementById("range-value");

  if (priceRange && rangeValue) {
    rangeValue.innerText = `₹${priceRange.value}`;

    priceRange.addEventListener("input", () => {
      const maxPrice = Number(priceRange.value);
      rangeValue.innerText = `₹${maxPrice}`;
      filterByPrice(maxPrice);
    });

    filterByPrice(Number(priceRange.value));
  }
});

// TOAST
function showGreenToast(msg) {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.innerText = msg;
  toast.style.cssText = `
    background:#0a8f6a;
    color:#fff;
    padding:12px 20px;
    border-radius:6px;
    position:fixed;
    bottom:20px;
    right:20px;
    opacity:1;
    transform:translateY(0);
    transition:0.3s;
    z-index:9999;
  `;

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
  }, 2000);
}

// PRICE FILTER
function filterByPrice(maxPrice) {
  document.querySelectorAll(".product-card").forEach((card) => {
    const price = Number(card.dataset.price || 0);
    card.style.display = price <= maxPrice ? "block" : "none";
  });
}