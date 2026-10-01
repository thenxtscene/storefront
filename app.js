const products = [
  {
    id: "karma-circle",
    name: "Karma Circle Oversized Tee",
    category: "oversized",
    edition: "Drop 01 / Oversized tee",
    tagline: "What goes around comes back around.",
    description: "A dual-tone Hindi-inspired statement graphic built around good energy and everyday accountability. Cut in a relaxed oversized silhouette for easy streetwear styling.",
    price: 999,
    images: {
      "Black": { src: "assets/karma-black.webp", position: "center" },
      "White": { src: "assets/karma-white.webp", position: "center" }
    },
    specs: ["100% premium cotton", "Oversized fit", "Unisex", "XS–2XL"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colours: [
      { name: "Black", hex: "#171719" },
      { name: "White", hex: "#f5f4ef" }
    ]
  },
  {
    id: "gymdari",
    name: "GYMDARI Oversized Tee",
    category: "oversized",
    edition: "Drop 02 / Oversized tee",
    tagline: "Strength, discipline and everyday dominance.",
    description: "Made for those who lift heavy and live harder. A power-packed graphic tee with a comfortable oversized shape that works inside and outside the gym.",
    price: 999,
    images: {
      "Black": { src: "assets/gymdari-black.webp", position: "center" },
      "White": { src: "assets/gymdari-white.webp", position: "center" }
    },
    specs: ["100% cotton", "Oversized fit", "Unisex", "XS–2XL"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colours: [
      { name: "Black", hex: "#171719" },
      { name: "White", hex: "#f5f4ef" }
    ]
  },
  {
    id: "queen-of-hearts",
    name: "Queen of Hearts Oversized Tee",
    category: "oversized",
    edition: "Drop 03 / Oversized tee",
    tagline: "Wear your attitude like a crown.",
    description: "A bold pop-art queen with heart-shaped shades and unapologetic confidence. The vibrant back print turns an easy oversized tee into a statement piece.",
    price: 999,
    images: {
      "White": { src: "assets/queen-white.webp", position: "center" },
      "Light Baby Pink": { src: "assets/queen-pink.webp", position: "center" }
    },
    specs: ["100% soft cotton", "Oversized fit", "Unisex", "XS–2XL"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colours: [
      { name: "White", hex: "#f5f4ef" },
      { name: "Light Baby Pink", hex: "#e8b7c5" }
    ]
  },
  {
    id: "stay-humble",
    name: "Stay Humble Hustle Hard Hoodie",
    category: "hoodie",
    edition: "Drop 04 / Hoodie",
    tagline: "Ambition balanced with gratitude.",
    description: "A warm everyday hoodie for people who keep their mindset sharp and their grind stronger. The clean motivational graphic keeps the statement focused.",
    price: 1299,
    images: {
      "White": { src: "assets/stay-white.webp", position: "center" },
      "Black": { src: "assets/stay-white.webp", position: "center" }
    },
    specs: ["Cotton-poly blend", "Soft fleece interior", "Relaxed unisex fit", "XS–3XL"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colours: [
      { name: "White", hex: "#f5f4ef" },
      { name: "Black", hex: "#171719" }
    ]
  },
  {
    id: "bohot-paise",
    name: "Bohot Paise Hoodie",
    category: "hoodie",
    edition: "Drop 05 / Hoodie",
    tagline: "Bags over butterflies.",
    description: "A cheeky rewrite of the classic love line, made for people who prefer paise—bohot saare paise. Warm, bold and full of attitude.",
    price: 1299,
    images: {
      "Red": { src: "assets/bohot-red.webp", position: "center" },
      "Black": { src: "assets/bohot-red.webp", position: "center" },
      "White": { src: "assets/bohot-red.webp", position: "center" }
    },
    specs: ["Premium cotton blend", "Soft inner lining", "Relaxed unisex fit", "XS–3XL"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colours: [
      { name: "Red", hex: "#9f232b" },
      { name: "Black", hex: "#171719" },
      { name: "White", hex: "#f5f4ef" }
    ]
  },
  {
    id: "holy-ingredients",
    name: "Holy Ingredients Oversized Tee",
    category: "oversized",
    edition: "Drop 06 / Oversized tee",
    tagline: "Faith, kindness, prayer and grace—inside.",
    description: "A playful product-label graphic celebrating the ingredients of Christian life: love, kindness, prayer and grace. Soft, spacious and designed for everyday faith-led streetwear.",
    price: 999,
    images: {
      "Black": { src: "assets/holy-black.webp", position: "center" },
      "White": { src: "assets/holy-white.webp", position: "center" }
    },
    specs: ["Premium cotton", "Oversized fit", "Unisex", "XS–2XL"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colours: [
      { name: "Black", hex: "#171719" },
      { name: "White", hex: "#f5f4ef" }
    ]
  }
];

const CART_KEY = "tns-prototype-cart-v2";
const LEGACY_ORDER_KEY = "tns-prototype-order";

const state = {
  activeProduct: null,
  colour: null,
  size: null,
  cart: loadCart()
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const formatPrice = value => `₹${value.toLocaleString("en-IN")}`;

function normaliseCart(candidate) {
  if (!Array.isArray(candidate)) return [];

  return candidate.reduce((validItems, item) => {
    const product = products.find(entry => entry.id === item.productId);
    if (!product) return validItems;

    const colour = product.colours.find(entry => entry.name === item.colour);
    const sizeIsValid = product.sizes.includes(item.size);
    const quantity = Math.max(1, Math.min(25, Number.parseInt(item.quantity, 10) || 1));
    if (!colour || !sizeIsValid) return validItems;

    const existing = validItems.find(entry =>
      entry.productId === product.id &&
      entry.colour === colour.name &&
      entry.size === item.size
    );

    if (existing) {
      existing.quantity = Math.min(25, existing.quantity + quantity);
    } else {
      validItems.push({
        productId: product.id,
        colour: colour.name,
        size: item.size,
        quantity
      });
    }
    return validItems;
  }, []);
}

function loadCart() {
  if (typeof localStorage === "undefined") return [];

  try {
    const savedCart = normaliseCart(JSON.parse(localStorage.getItem(CART_KEY)));
    if (savedCart.length) return savedCart;

    const legacyOrder = JSON.parse(localStorage.getItem(LEGACY_ORDER_KEY));
    const migrated = normaliseCart(legacyOrder ? [{ ...legacyOrder, quantity: 1 }] : []);
    if (migrated.length) {
      localStorage.setItem(CART_KEY, JSON.stringify(migrated));
      localStorage.removeItem(LEGACY_ORDER_KEY);
    }
    return migrated;
  } catch {
    return [];
  }
}

function saveCart() {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
  localStorage.removeItem(LEGACY_ORDER_KEY);
}

function cartDetails(cart = state.cart) {
  return normaliseCart(cart).map(item => {
    const product = products.find(entry => entry.id === item.productId);
    const image = product.images[item.colour] || Object.values(product.images)[0];
    return {
      ...item,
      product,
      image,
      unitPrice: product.price,
      lineTotal: product.price * item.quantity
    };
  });
}

function calculateCartTotals(cart = state.cart) {
  const subtotal = cartDetails(cart).reduce((total, item) => total + item.lineTotal, 0);
  return {
    subtotal,
    shipping: 0,
    total: subtotal
  };
}

function productImageMarkup(product, colourName = product.colours[0].name) {
  const image = product.images[colourName] || Object.values(product.images)[0];
  return `
    <div class="mockup-crop">
      <img class="direct-mockup" src="${image.src}" alt="${product.name} in ${colourName}" loading="lazy"
        style="object-position:${image.position || "center"}" />
    </div>`;
}

function renderProducts() {
  const grid = $("#productGrid");
  grid.innerHTML = products.map((product, index) => `
    <article class="product-card reveal" data-category="${product.category}" style="transition-delay:${index * 70}ms">
      <button class="product-visual" type="button" data-product="${product.id}" aria-label="Inspect ${product.name}">
        <span class="edition-mark">${product.edition}</span>
        ${productImageMarkup(product)}
      </button>
      <div class="product-meta">
        <h3>${product.name}</h3>
        <p>${product.tagline}</p>
        <div class="product-price-group">
          <span class="product-price">${formatPrice(product.price)}</span>
          <small>Shipping included</small>
        </div>
      </div>
    </article>
  `).join("");

  $$("[data-product]").forEach(button => {
    button.addEventListener("click", () => openProduct(button.dataset.product));
  });
  observeReveals();
}

function openProduct(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  state.activeProduct = product;
  state.colour = product.colours[0];
  state.size = null;

  $("#modalEdition").textContent = product.edition;
  $("#modalTitle").textContent = product.name;
  $("#modalDescription").textContent = product.description;
  $("#modalPrice").textContent = formatPrice(product.price);
  $("#modalSpecs").innerHTML = product.specs.map(spec => `<span>${spec}</span>`).join("");
  renderModalVisual();
  renderOptions();

  const modal = $("#productModal");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  $(".modal-close").focus();
}

function renderModalVisual() {
  const visual = $("#modalVisual");
  visual.className = "modal-visual";
  visual.innerHTML = productImageMarkup(state.activeProduct, state.colour.name);
}

function renderOptions() {
  $("#selectedColourLabel").textContent = state.colour.name;
  $("#colourOptions").innerHTML = state.activeProduct.colours.map(colour => `
    <button class="swatch ${colour.name === state.colour.name ? "is-active" : ""}" type="button"
      style="--swatch:${colour.hex}" data-colour="${colour.name}" aria-label="${colour.name}"
      aria-pressed="${colour.name === state.colour.name}">${colour.name}</button>
  `).join("");
  $("#sizeOptions").innerHTML = state.activeProduct.sizes.map(size => `
    <button class="size-button ${size === state.size ? "is-active" : ""}" type="button" data-size="${size}"
      aria-pressed="${size === state.size}">${size}</button>
  `).join("");

  $$("[data-colour]", $("#colourOptions")).forEach(button => {
    button.addEventListener("click", () => {
      state.colour = state.activeProduct.colours.find(item => item.name === button.dataset.colour);
      renderModalVisual();
      renderOptions();
    });
  });
  $$("[data-size]", $("#sizeOptions")).forEach(button => {
    button.addEventListener("click", () => {
      state.size = button.dataset.size;
      renderOptions();
    });
  });

  const addButton = $("#addToOrder");
  addButton.disabled = !state.size;
  addButton.textContent = state.size ? "Add to cart" : "Choose a size";
  $("#sizeHint").textContent = state.size ? `Selected ${state.size}` : "Select one";
}

function closeProduct() {
  const modal = $("#productModal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function addToCart() {
  if (!state.activeProduct || !state.size) return;

  const matchingItem = state.cart.find(item =>
    item.productId === state.activeProduct.id &&
    item.colour === state.colour.name &&
    item.size === state.size
  );

  if (matchingItem) {
    matchingItem.quantity = Math.min(25, matchingItem.quantity + 1);
  } else {
    state.cart.push({
      productId: state.activeProduct.id,
      colour: state.colour.name,
      size: state.size,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  closeProduct();
  openDrawer();
  showToast(`${state.activeProduct.name} added — ${state.colour.name}, size ${state.size}`);
}

function updateQuantity(index, change) {
  if (!state.cart[index]) return;
  const nextQuantity = state.cart[index].quantity + change;
  if (nextQuantity < 1) {
    removeCartItem(index);
    return;
  }
  state.cart[index].quantity = Math.min(25, nextQuantity);
  saveCart();
  renderCart();
}

function removeCartItem(index) {
  if (!state.cart[index]) return;
  const [removed] = state.cart.splice(index, 1);
  saveCart();
  renderCart();
  const product = products.find(item => item.id === removed.productId);
  showToast(`${product ? product.name : "Item"} removed`);
}

function cartItemMarkup(item, index, context) {
  return `
    <article class="${context === "drawer" ? "cart-line" : "checkout-line"}">
      <div class="${context === "drawer" ? "cart-thumb" : "checkout-thumb"}">
        ${productImageMarkup(item.product, item.colour)}
      </div>
      <div class="cart-line-copy">
        <p>${item.product.name}</p>
        <span>${item.colour} / ${item.size}</span>
        <span>${formatPrice(item.unitPrice)} each</span>
        ${context === "drawer" ? `
          <div class="quantity-row" aria-label="Quantity for ${item.product.name}">
            <button type="button" data-cart-action="decrease" data-index="${index}" aria-label="Decrease quantity">−</button>
            <strong>${item.quantity}</strong>
            <button type="button" data-cart-action="increase" data-index="${index}" aria-label="Increase quantity">+</button>
          </div>
        ` : `<strong class="summary-quantity">Qty ${item.quantity}</strong>`}
      </div>
      <div class="cart-line-end">
        <strong>${formatPrice(item.lineTotal)}</strong>
        ${context === "drawer" ? `<button class="remove-item" type="button" data-cart-action="remove" data-index="${index}">Remove</button>` : ""}
      </div>
    </article>
  `;
}

function renderCart() {
  state.cart = normaliseCart(state.cart);
  const details = cartDetails();
  const totals = calculateCartTotals();
  const itemCount = details.reduce((count, item) => count + item.quantity, 0);
  const hasItems = details.length > 0;

  $("#bagCount").textContent = itemCount;
  $("#drawerEmpty").hidden = hasItems;
  $("#drawerCart").hidden = !hasItems;
  $("#checkoutEmpty").hidden = hasItems;
  $("#checkoutWithItems").hidden = !hasItems;
  $("#paymentButton").disabled = !hasItems;

  $("#cartItems").innerHTML = details.map((item, index) => cartItemMarkup(item, index, "drawer")).join("");
  $("#checkoutItems").innerHTML = details.map((item, index) => cartItemMarkup(item, index, "checkout")).join("");
  $("#drawerSubtotal").textContent = formatPrice(totals.subtotal);
  $("#drawerTotal").textContent = formatPrice(totals.total);
  $("#checkoutSubtotal").textContent = formatPrice(totals.subtotal);
  $("#checkoutTotal").textContent = formatPrice(totals.total);
  $("#paymentButton").textContent = hasItems
    ? `Continue to secure Razorpay — ${formatPrice(totals.total)}`
    : "Continue to secure Razorpay";

  $("#backendNotice").hidden = true;
  $("#formStatus").textContent = "";
  $("#confirmation").hidden = true;

  $$("[data-cart-action]", $("#cartItems")).forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      if (button.dataset.cartAction === "increase") updateQuantity(index, 1);
      if (button.dataset.cartAction === "decrease") updateQuantity(index, -1);
      if (button.dataset.cartAction === "remove") removeCartItem(index);
    });
  });
}

function openDrawer() {
  $("#orderDrawer").classList.add("is-open");
  $("#orderDrawer").setAttribute("aria-hidden", "false");
  $("#drawerBackdrop").classList.add("is-open");
  document.body.classList.add("no-scroll");
  $("#closeDrawer").focus();
}

function closeDrawer() {
  $("#orderDrawer").classList.remove("is-open");
  $("#orderDrawer").setAttribute("aria-hidden", "true");
  $("#drawerBackdrop").classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

function clearCart() {
  state.cart = [];
  saveCart();
  renderCart();
  showToast("Cart cleared");
}

function goToCheckout() {
  closeDrawer();
  $("#checkout").scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => $("#customerName").focus(), 450);
}

function collectCheckoutPayload() {
  const formData = new FormData($("#checkoutForm"));
  const details = cartDetails();
  const totals = calculateCartTotals();

  return {
    customer: {
      fullName: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      mobile: String(formData.get("mobile") || "").trim(),
      address: String(formData.get("address") || "").trim(),
      landmark: String(formData.get("landmark") || "").trim(),
      city: String(formData.get("city") || "").trim(),
      state: String(formData.get("state") || "").trim(),
      pinCode: String(formData.get("pinCode") || "").trim()
    },
    items: details.map(item => ({
      productId: item.productId,
      name: item.product.name,
      colour: item.colour,
      size: item.size,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      lineTotal: item.lineTotal
    })),
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    total: totals.total,
    currency: "INR"
  };
}

function handleCheckout(event) {
  event.preventDefault();
  const form = $("#checkoutForm");

  if (!state.cart.length) {
    $("#formStatus").textContent = "Add at least one product before checkout.";
    $("#drops").scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (!form.checkValidity()) {
    form.reportValidity();
    $("#formStatus").textContent = "Please complete the required delivery details.";
    return;
  }

  const payload = collectCheckoutPayload();
  $("#formStatus").textContent = `Order details ready. Secure payment order required for ${formatPrice(payload.total)}.`;
  $("#backendNotice").hidden = false;
  $("#backendNotice").focus();

  /*
    Production handoff:
    1. POST this payload to a protected server.
    2. The server validates prices and creates a Razorpay Order for payload.total * 100 paise.
    3. The browser opens Razorpay Checkout with the returned public order_id.
    4. The server verifies the Razorpay payment signature.
    5. Only after verification, call showConfirmation with the real reference and amount.
    Razorpay secret keys must never be added to this client-side file.
  */
}

function showConfirmation({ reference, amount, email, items, isPreview = false }) {
  $("#confirmationEyebrow").textContent = isPreview ? "Prototype preview" : "Payment verified";
  $("#confirmationReference").textContent = reference;
  $("#confirmationAmount").textContent = formatPrice(amount);
  $("#confirmationEmail").textContent = email;
  $("#confirmationProducts").innerHTML = "";

  items.forEach(item => {
    const line = document.createElement("p");
    line.textContent = `${item.name} — ${item.colour} / ${item.size} — Qty ${item.quantity}`;
    $("#confirmationProducts").append(line);
  });

  $("#confirmationDemoLabel").hidden = !isPreview;
  $("#confirmation").hidden = false;
  $("#confirmation").scrollIntoView({ behavior: "smooth", block: "start" });
}

function previewConfirmation() {
  const form = $("#checkoutForm");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const payload = collectCheckoutPayload();
  showConfirmation({
    reference: `TNS-PREVIEW-${String(Date.now()).slice(-6)}`,
    amount: payload.total,
    email: payload.customer.email,
    items: payload.items,
    isPreview: true
  });
}

function continueShopping() {
  $("#confirmation").hidden = true;
  $("#drops").scrollIntoView({ behavior: "smooth", block: "start" });
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function setupFilters() {
  $$(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      $$(".filter-chip").forEach(item => {
        const active = item === chip;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", active);
      });
      $$(".product-card").forEach(card => {
        card.hidden = chip.dataset.filter !== "all" && card.dataset.category !== chip.dataset.filter;
      });
    });
  });
}

function observeReveals() {
  if (typeof IntersectionObserver === "undefined") {
    $$(".reveal").forEach(element => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  $$(".reveal:not(.is-visible)").forEach(element => observer.observe(element));
}

function initialiseStorefront() {
  renderProducts();
  setupFilters();
  renderCart();
  observeReveals();

  $("#addToOrder").addEventListener("click", addToCart);
  $$("[data-close-modal]").forEach(element => element.addEventListener("click", closeProduct));
  $("#bagButton").addEventListener("click", openDrawer);
  $("#closeDrawer").addEventListener("click", closeDrawer);
  $("#drawerBackdrop").addEventListener("click", closeDrawer);
  $("#browseFromDrawer").addEventListener("click", closeDrawer);
  $("#continueFromDrawer").addEventListener("click", closeDrawer);
  $("#clearOrder").addEventListener("click", clearCart);
  $("#goToCheckout").addEventListener("click", goToCheckout);
  $("#checkoutForm").addEventListener("submit", handleCheckout);
  $("#previewConfirmation").addEventListener("click", previewConfirmation);
  $("#continueShopping").addEventListener("click", continueShopping);

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if ($("#productModal").classList.contains("is-open")) closeProduct();
    if ($("#orderDrawer").classList.contains("is-open")) closeDrawer();
  });
}

if (typeof document !== "undefined") initialiseStorefront();

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    products,
    formatPrice,
    normaliseCart,
    cartDetails,
    calculateCartTotals
  };
}
