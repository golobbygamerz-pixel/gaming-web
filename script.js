/* =========================================
   NEXORA FUTURISTIC GAMING STORE
========================================= */


/* =========================================
   PRODUCT DATABASE
========================================= */

const products = [
  {
    id: 1,
    name: "NEO TITAN",
    category: "pc",
    categoryName: "GAMING PC",
    description: "Ultimate desktop performance with next-generation architecture.",
    price: 159999,
    oldPrice: 199999,
    rating: 4.9,
    discount: "20%",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: 2,
    name: "VOID X15",
    category: "laptop",
    categoryName: "GAMING LAPTOP",
    description: "Portable power engineered for competitive gaming.",
    price: 129999,
    oldPrice: 149999,
    rating: 4.8,
    discount: "13%",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: 3,
    name: "QUANTUM 24",
    category: "gpu",
    categoryName: "GRAPHICS CARD",
    description: "Massive graphical performance for extreme workloads.",
    price: 84999,
    oldPrice: 94999,
    rating: 4.9,
    discount: "10%",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: 4,
    name: "VISION 360",
    category: "monitor",
    categoryName: "GAMING MONITOR",
    description: "360Hz ultra-responsive display built for competition.",
    price: 49999,
    oldPrice: 59999,
    rating: 4.8,
    discount: "17%",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: 5,
    name: "CORE 75",
    category: "accessory",
    categoryName: "MECHANICAL KEYBOARD",
    description: "Precision mechanical keyboard with rapid response switches.",
    price: 12999,
    oldPrice: 15999,
    rating: 4.7,
    discount: "19%",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: 6,
    name: "PHANTOM",
    category: "accessory",
    categoryName: "GAMING MOUSE",
    description: "Ultra-light precision mouse engineered for speed.",
    price: 7999,
    oldPrice: 9999,
    rating: 4.9,
    discount: "20%",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: 7,
    name: "AURA PRO",
    category: "accessory",
    categoryName: "GAMING HEADSET",
    description: "Immersive spatial audio with ultra-low latency.",
    price: 9999,
    oldPrice: 12999,
    rating: 4.8,
    discount: "23%",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: 8,
    name: "VECTOR X",
    category: "accessory",
    categoryName: "GAMING CONTROLLER",
    description: "Precision control designed for next-generation gaming.",
    price: 6999,
    oldPrice: 8999,
    rating: 4.7,
    discount: "22%",
    image: "https://images.unsplash.com/photo-1592840496694-26c035b52b8b?auto=format&fit=crop&w=1000&q=85"
  }
];


/* =========================================
   STATE
========================================= */

let cart = [];
let activeFilter = "all";
let searchTerm = "";
let selectedProduct = null;


/* =========================================
   ELEMENTS
========================================= */

const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");


/* =========================================
   FORMAT CURRENCY
========================================= */

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}


/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts() {

  const filteredProducts = products.filter(product => {

    const matchesCategory =
      activeFilter === "all" ||
      product.category === activeFilter;

    const searchable =
      `${product.name} ${product.categoryName} ${product.description}`
        .toLowerCase();

    const matchesSearch =
      searchable.includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });


  if (filteredProducts.length === 0) {

    productGrid.innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:80px 20px;
        text-align:center;
        color:#65707b;
      ">
        <div style="font-size:40px;margin-bottom:15px;">⌕</div>
        <strong style="display:block;color:#9ca5ae;">
          NO PRODUCTS FOUND
        </strong>
        <small>Try another search or category.</small>
      </div>
    `;

    return;
  }


  productGrid.innerHTML = filteredProducts.map(product => {

    return `
      <article class="product-card reveal">

        <div class="product-image">

          ${product.discount
            ? `<span class="discount">-${product.discount}</span>`
            : ""
          }

          <button
            class="wishlist"
            data-wishlist="${product.id}"
            aria-label="Add to wishlist">
            ♡
          </button>

          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy">
        </div>

        <div class="product-info">

          <span class="product-category">
            ${product.categoryName}
          </span>

          <h3 class="product-name">
            ${product.name}
          </h3>

          <p class="product-desc">
            ${product.description}
          </p>

          <div class="product-rating">
            <span class="stars">★★★★★</span>
            <span>${product.rating}</span>
          </div>

          <div class="product-bottom">

            <div class="price-wrap">

              <span class="old-price">
                ${formatPrice(product.oldPrice)}
              </span>

              <strong class="price">
                ${formatPrice(product.price)}
              </strong>

            </div>

            <div class="card-actions">

              <button
                class="quick-btn"
                data-quick="${product.id}"
                aria-label="Quick view">
                ⊙
              </button>

              <button
                class="add-btn"
                data-add="${product.id}"
                aria-label="Add to cart">
                +
              </button>

            </div>

          </div>

        </div>

      </article>
    `;

  }).join("");


  setupProductButtons();

  setTimeout(() => {

    document
      .querySelectorAll(".product-card")
      .forEach(card => card.classList.add("visible"));

  }, 30);
}


/* =========================================
   PRODUCT BUTTONS
========================================= */

function setupProductButtons() {

  document.querySelectorAll("[data-add]").forEach(button => {

    button.addEventListener("click", () => {

      const id = Number(button.dataset.add);

      addToCart(id);

    });

  });


  document.querySelectorAll("[data-quick]").forEach(button => {

    button.addEventListener("click", () => {

      const id = Number(button.dataset.quick);

      openQuickView(id);

    });

  });


  document.querySelectorAll("[data-wishlist]").forEach(button => {

    button.addEventListener("click", () => {

      button.classList.toggle("liked");

      button.textContent =
        button.classList.contains("liked")
          ? "♥"
          : "♡";

    });

  });

}


/* =========================================
   FILTER
========================================= */

document.querySelectorAll(".filter").forEach(button => {

  button.addEventListener("click", () => {

    document
      .querySelectorAll(".filter")
      .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    activeFilter = button.dataset.filter;

    renderProducts();

  });

});


/* =========================================
   SEARCH
========================================= */

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");
const closeSearch = document.getElementById("closeSearch");


searchBtn.addEventListener("click", () => {

  searchPanel.classList.toggle("open");

  if (searchPanel.classList.contains("open")) {
    searchInput.focus();
  }

});


closeSearch.addEventListener("click", () => {

  searchPanel.classList.remove("open");
  searchInput.value = "";
  searchTerm = "";

  renderProducts();

});


searchInput.addEventListener("input", event => {

  searchTerm = event.target.value;

  renderProducts();

});


/* =========================================
   CART
========================================= */

function addToCart(productId) {

  const product = products.find(p => p.id === productId);

  if (!product) return;


  const existing = cart.find(item => item.id === productId);

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }


  updateCart();

  showToast(`${product.name} added to your system.`);

}


function updateCart() {

  cartCount.textContent = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        <span>◌</span>
        <p>Your cart is empty.</p>
        <small>Start building your system.</small>
      </div>
    `;

    cartTotal.textContent = "₹0";

    return;
  }


  cartItems.innerHTML = cart.map(item => {

    return `
      <div class="cart-item">

        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>

        <div class="cart-item-info">

          <h4>${item.name}</h4>

          <p>${formatPrice(item.price)}</p>

          <div class="quantity">

            <button
              data-minus="${item.id}">
              −
            </button>

            <span>${item.quantity}</span>

            <button
              data-plus="${item.id}">
              +
            </button>

          </div>

        </div>

        <button
          class="remove-item"
          data-remove="${item.id}">
          ×
        </button>

      </div>
    `;

  }).join("");


  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartTotal.textContent = formatPrice(total);


  setupCartButtons();

}


function setupCartButtons() {

  document.querySelectorAll("[data-minus]").forEach(button => {

    button.addEventListener("click", () => {

      const id = Number(button.dataset.minus);

      const item = cart.find(item => item.id === id);

      if (!item) return;

      item.quantity--;

      if (item.quantity <= 0) {

        cart = cart.filter(item => item.id !== id);

      }

      updateCart();

    });

  });


  document.querySelectorAll("[data-plus]").forEach(button => {

    button.addEventListener("click", () => {

      const id = Number(button.dataset.plus);

      const item = cart.find(item => item.id === id);

      if (!item) return;

      item.quantity++;

      updateCart();

    });

  });


  document.querySelectorAll("[data-remove]").forEach(button => {

    button.addEventListener("click", () => {

      const id = Number(button.dataset.remove);

      cart = cart.filter(item => item.id !== id);

      updateCart();

    });

  });

}


/* =========================================
   CART OPEN / CLOSE
========================================= */

function openCart() {

  cartDrawer.classList.add("open");
  cartBackdrop.classList.add("open");

  document.body.classList.add("no-scroll");

}


function closeCart() {

  cartDrawer.classList.remove("open");
  cartBackdrop.classList.remove("open");

  document.body.classList.remove("no-scroll");

}


document.getElementById("cartBtn")
  .addEventListener("click", openCart);


document.getElementById("closeCart")
  .addEventListener("click", closeCart);


cartBackdrop.addEventListener("click", closeCart);


/* =========================================
   QUICK VIEW
========================================= */

const quickModal = document.getElementById("quickModal");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");


function openQuickView(productId) {

  const product = products.find(p => p.id === productId);

  if (!product) return;

  selectedProduct = product;

  modalImage.src = product.image;
  modalImage.alt = product.name;

  modalName.textContent = product.name;

  modalCategory.textContent = product.categoryName;

  modalDescription.textContent = product.description;

  modalPrice.textContent = formatPrice(product.price);

  quickModal.classList.add("open");

  document.body.classList.add("no-scroll");

}


function closeQuickView() {

  quickModal.classList.remove("open");

  document.body.classList.remove("no-scroll");

}


document
  .getElementById("modalClose")
  .addEventListener("click", closeQuickView);


quickModal.addEventListener("click", event => {

  if (event.target === quickModal) {
    closeQuickView();
  }

});


document
  .getElementById("modalAdd")
  .addEventListener("click", () => {

    if (!selectedProduct) return;

    addToCart(selectedProduct.id);

    closeQuickView();

    openCart();

  });


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

  toastText.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 2800);

}


/* =========================================
   COUNTDOWN
========================================= */

const saleEnd = new Date();

saleEnd.setDate(saleEnd.getDate() + 5);


function updateCountdown() {

  const now = new Date();

  const difference = saleEnd - now;


  if (difference <= 0) {

    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    return;

  }


  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );


  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   PERFORMANCE COUNTERS
========================================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const counter = entry.target;

      const target = Number(counter.dataset.target);

      let current = 0;

      const increment = Math.max(
        1,
        Math.ceil(target / 70)
      );


      const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

          current = target;

          clearInterval(timer);

        }

        counter.textContent = current;

      }, 20);


      counterObserver.unobserve(counter);

    });

  },
  {
    threshold: .5
  }
);


counters.forEach(counter => {

  counterObserver.observe(counter);

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: .08
  }
);


document
  .querySelectorAll(".reveal")
  .forEach(element => {

    revealObserver.observe(element);

  });


/* =========================================
   NAVBAR SCROLL
========================================= */

const navbar = document.getElementById("navbar");


window.addEventListener("scroll", () => {

  if (window.scrollY > 80) {

    navbar.classList.add("scrolled");

  } else {

    navbar.classList.remove("scrolled");

  }

});


/* =========================================
   MOBILE MENU
========================================= */

const mobileToggle =
  document.getElementById("mobileToggle");

const mobileMenu =
  document.getElementById("mobileMenu");


mobileToggle.addEventListener("click", () => {

  mobileMenu.classList.toggle("open");

});


document
  .querySelectorAll(".mobile-menu a")
  .forEach(link => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("open");

    });

  });


/* =========================================
   SETUP BUTTON
========================================= */

document
  .getElementById("setupCart")
  .addEventListener("click", () => {

    const setupProducts = [1, 4, 5, 6];

    setupProducts.forEach(id => {

      const existing = cart.find(item => item.id === id);

      if (existing) {

        existing.quantity++;

      } else {

        const product =
          products.find(item => item.id === id);

        cart.push({
          ...product,
          quantity: 1
        });

      }

    });


    updateCart();

    showToast("Battlestation added to your system.");

    openCart();

  });


/* =========================================
   DEAL BUTTON
========================================= */

document
  .getElementById("dealCart")
  .addEventListener("click", () => {

    addToCart(1);

    openCart();

  });


/* =========================================
   CHECKOUT
========================================= */

document
  .getElementById("checkoutBtn")
  .addEventListener("click", () => {

    if (cart.length === 0) {

      showToast("Your system is empty.");

      return;

    }

    showToast("Checkout system is ready for integration.");

  });


/* =========================================
   NEWSLETTER
========================================= */

document
  .getElementById("newsletterForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    const email =
      event.target.querySelector("input").value;

    if (!email) return;

    showToast("You're now connected to NEXORA.");

    event.target.reset();

  });


/* =========================================
   KEYBOARD SHORTCUTS
========================================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeCart();
    closeQuickView();

  }

});


/* =========================================
   INITIALIZE
========================================= */

renderProducts();

updateCart();


/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    document
      .getElementById("loader")
      .classList.add("hidden");

  }, 800);

});