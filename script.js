document.querySelectorAll(".product-card").forEach((card) => {
  const name = card.querySelector(".product-name").innerText;
  const plus = card.querySelector(".plus");
  const minus = card.querySelector(".minus");
  const qty = card.querySelector(".qty");
  const addBtn = card.querySelector(".add-to-cart");

  qty.innerText = getQty(name);

  plus.onclick = () => {
    addItem(name, 1);
    qty.innerText = getQty(name);
  };

  minus.onclick = () => {
    removeItem(name, 1);
    qty.innerText = getQty(name);
  };

  addBtn.onclick = () => {
    addItem(name, 1);
    qty.innerText = getQty(name);
    showGreenToast(`${name} added successfully!`);
  };
});


function showGreenToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.innerText = msg;
  toast.style.backgroundColor = "#0a8f6a;";
  toast.style.color = "#fff";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "6px";
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.opacity = "1";
  toast.style.transition = "opacity 0.3s, transform 0.3s";
  toast.style.transform = "translateY(0)";
  toast.style.zIndex = "9999";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
  }, 2000);
}

// ---------------- PRICE FILTER ----------------
const priceRange = document.getElementById("price-range");
const rangeValue = document.getElementById("range-value");

priceRange.addEventListener("input", () => {
  const maxPrice = Number(priceRange.value);
  rangeValue.innerText = `₹${maxPrice}`;
  filterByPrice(maxPrice);
});

function filterByPrice(maxPrice) {
  document.querySelectorAll(".product-card").forEach((card) => {
    const price = Number(card.dataset.price);
    card.style.display = price <= maxPrice ? "block" : "none";
  });
}

// Initial filter on load
filterByPrice(priceRange.value);