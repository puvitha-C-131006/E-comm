/* ==========================================================================
   NovaCart - Cart & Wishlist Micro-Interactions & State Sync
   Includes Slide-Out Cart Drawer, Free Delivery Meter, and Counter Sync
   ========================================================================== */

const CART_KEY = 'novacart_cart';
const WISHLIST_KEY = 'novacart_wishlist';

let cachedWishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];

// Get user data from Firestore or LocalStorage
async function getCartData() {
  if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser && typeof db !== 'undefined') {
    try {
      const user = firebase.auth().currentUser;
      const doc = await db.collection('users').doc(user.uid).get();
      return doc.data()?.cart || [];
    } catch (e) {
      console.warn("Could not fetch cart from Firestore:", e);
    }
  }
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

async function getWishlistData() {
  if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser && typeof db !== 'undefined') {
    try {
      const user = firebase.auth().currentUser;
      const doc = await db.collection('users').doc(user.uid).get();
      cachedWishlist = doc.data()?.wishlist || [];
      return cachedWishlist;
    } catch (e) {
      console.warn("Could not fetch wishlist from Firestore:", e);
    }
  }
  cachedWishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  return cachedWishlist;
}

// Save user data to Firestore or LocalStorage
async function saveCartData(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser && typeof db !== 'undefined') {
    try {
      const user = firebase.auth().currentUser;
      await db.collection('users').doc(user.uid).set({ cart: cart }, { merge: true });
    } catch (e) {
      console.warn("Could not save cart to Firestore:", e);
    }
  }
}

async function saveWishlistData(wishlist) {
  cachedWishlist = wishlist;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser && typeof db !== 'undefined') {
    try {
      const user = firebase.auth().currentUser;
      await db.collection('users').doc(user.uid).set({ wishlist: wishlist }, { merge: true });
    } catch (e) {
      console.warn("Could not save wishlist to Firestore:", e);
    }
  }
}

// Add to Cart with subtle feedback and optional drawer opening
async function addToCart(productId, quantity = 1, shouldOpenDrawer = true) {
  if (typeof products === 'undefined' || !products.length) return;
  const product = products.find(p => p.id == productId);
  if (!product) return;

  let cart = await getCartData();
  const existingItem = cart.find(item => item.id == productId);
  
  const currentQty = existingItem ? existingItem.quantity : 0;
  const maxStock = product.stock || 50;

  if (currentQty + quantity > maxStock) {
    showToast(`Only ${maxStock} items available in stock`, 'error');
    return;
  }

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: Number(productId), quantity: quantity });
  }

  await saveCartData(cart);
  updateCartCounters();
  
  // Cart badge animation pulse
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(b => {
    b.style.animation = 'none';
    setTimeout(() => b.style.animation = 'badgePop 0.3s ease', 10);
  });

  showToast(`${product.name} added to cart!`);

  if (shouldOpenDrawer) {
    openCartDrawer();
  }
}

// Remove from Cart
async function removeFromCart(productId) {
  let cart = await getCartData();
  cart = cart.filter(item => item.id != productId);
  await saveCartData(cart);
  updateCartCounters();
  renderCartDrawer();
  
  if (typeof renderCartPage === 'function') {
    renderCartPage();
  }
  showToast('Item removed from cart');
}

// Update Cart Quantity
async function updateCartQuantity(productId, quantity) {
  let cart = await getCartData();
  const item = cart.find(i => i.id == productId);
  const product = products.find(p => p.id == productId);
  
  if (item && product) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const maxStock = product.stock || 50;
    if (quantity > maxStock) {
      showToast(`Only ${maxStock} items left in stock`, 'error');
      quantity = maxStock;
    }
    item.quantity = quantity;
    await saveCartData(cart);
    updateCartCounters();
    renderCartDrawer();
    
    if (typeof renderCartPage === 'function') {
      renderCartPage();
    }
  }
}

// Slide-Out Cart Drawer & Promo Engine
let drawerAppliedCoupon = null;
try {
  const savedCoupon = sessionStorage.getItem('novacart_applied_coupon');
  if (savedCoupon) {
    drawerAppliedCoupon = JSON.parse(savedCoupon);
  }
} catch (e) {}

function ensureCartDrawerDOM() {
  if (document.getElementById('globalCartDrawerOverlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'globalCartDrawerOverlay';
  overlay.className = 'cart-drawer-overlay';
  overlay.innerHTML = `
    <div class="cart-drawer" id="globalCartDrawer">
      <div class="cart-drawer-header">
        <h3><i class="fas fa-shopping-bag" style="color:var(--color-primary)"></i> Shopping Cart (<span id="cartDrawerCount">0</span>)</h3>
        <button class="cart-drawer-close" onclick="closeCartDrawer()" title="Close Cart"><i class="fas fa-times"></i></button>
      </div>
      <div class="free-shipping-box" id="freeShippingMeter">
        <div class="free-shipping-text">
          <span id="freeShippingMsg">Add ₹999 for FREE Delivery</span>
          <span id="freeShippingPct">0%</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" id="freeShippingFill" style="width: 0%;"></div>
        </div>
      </div>
      <div class="cart-drawer-body" id="cartDrawerItems">
        <!-- Items rendered dynamically -->
      </div>
      <div class="drawer-coupon-box" id="drawerCouponBox">
        <!-- Coupon input or active badge -->
      </div>
      <div class="cart-drawer-footer" id="cartDrawerFooter">
        <div class="cart-drawer-summary" id="cartDrawerSummary">
          <!-- Subtotal, discount & total breakdown -->
        </div>
        <a href="checkout.html" class="btn btn-primary" style="width:100%; margin-bottom:0.6rem; padding:0.85rem; font-weight:700; display:flex; align-items:center; justify-content:center; gap:8px;">
          <i class="fas fa-lock"></i> Proceed to Checkout
        </a>
        <a href="cart.html" class="btn btn-outline" style="width:100%; padding:0.65rem; font-size:0.88rem; text-align:center;">
          View Full Cart Page
        </a>
      </div>
    </div>
  `;

  // Close when clicking overlay backdrop
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeCartDrawer();
    }
  });

  // ESC key closes drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeCartDrawer();
    }
  });

  document.body.appendChild(overlay);
}

function applyDrawerCoupon(code = null) {
  const input = document.getElementById('cartDrawerCouponInput');
  const couponCode = (code || (input ? input.value : '')).trim().toUpperCase();

  if (!couponCode) {
    if (typeof showToast === 'function') showToast('Please enter a coupon code', 'warning');
    return;
  }

  let discountType = 'pct';
  let discountVal = 0;
  let label = '';

  if (couponCode === 'WELCOME10' || couponCode === 'SAVE10' || couponCode === 'NOVACART10') {
    discountType = 'pct';
    discountVal = 0.10;
    label = '10% OFF';
  } else if (couponCode === 'NOVA20' || couponCode === 'DEAL20') {
    discountType = 'pct';
    discountVal = 0.20;
    label = '20% OFF';
  } else if (couponCode === 'SAVE500' || couponCode === 'FLAT500') {
    discountType = 'flat';
    discountVal = 500;
    label = '₹500 FLAT OFF';
  } else if (couponCode === 'WELCOME50') {
    discountType = 'pct_max';
    discountVal = 0.50;
    label = '50% OFF (up to ₹1000)';
  } else if (couponCode === 'FREESHIP') {
    discountType = 'freeship';
    discountVal = 0;
    label = 'FREE Express Delivery';
  } else {
    if (typeof showToast === 'function') showToast(`Invalid coupon code "${couponCode}"`, 'error');
    return;
  }

  drawerAppliedCoupon = {
    code: couponCode,
    type: discountType,
    value: discountVal,
    label: label
  };

  try {
    sessionStorage.setItem('novacart_applied_coupon', JSON.stringify(drawerAppliedCoupon));
  } catch (e) {}

  if (typeof showToast === 'function') {
    showToast(`🎉 Coupon "${couponCode}" applied successfully!`, 'success');
  }

  renderCartDrawer();
}

function removeDrawerCoupon() {
  const code = drawerAppliedCoupon ? drawerAppliedCoupon.code : 'Coupon';
  drawerAppliedCoupon = null;
  try {
    sessionStorage.removeItem('novacart_applied_coupon');
  } catch (e) {}
  if (typeof showToast === 'function') {
    showToast(`Coupon "${code}" removed`, 'info');
  }
  renderCartDrawer();
}

function setDrawerCouponCode(code) {
  const input = document.getElementById('cartDrawerCouponInput');
  if (input) input.value = code;
  applyDrawerCoupon(code);
}

async function renderCartDrawer() {
  ensureCartDrawerDOM();
  const itemsContainer = document.getElementById('cartDrawerItems');
  const countSpan = document.getElementById('cartDrawerCount');
  const couponBox = document.getElementById('drawerCouponBox');
  const summaryBox = document.getElementById('cartDrawerSummary');
  const shippingMsg = document.getElementById('freeShippingMsg');
  const shippingPct = document.getElementById('freeShippingPct');
  const shippingFill = document.getElementById('freeShippingFill');
  const footer = document.getElementById('cartDrawerFooter');

  if (!itemsContainer) return;

  const cart = await getCartData();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (countSpan) countSpan.textContent = totalItems;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align:center; padding:3.5rem 1rem; color:var(--color-text-secondary);">
        <i class="fas fa-shopping-basket" style="font-size:3.5rem; color:var(--color-border); margin-bottom:1rem; display:block;"></i>
        <h4 style="font-size:1.15rem; color:var(--color-text-primary); margin-bottom:0.5rem; font-weight:700;">Your Cart is Empty</h4>
        <p style="font-size:0.88rem; margin-bottom:1.5rem; max-width:280px; margin-left:auto; margin-right:auto;">Explore our curated products and discover trending offers!</p>
        <a href="products.html" class="btn btn-primary btn-sm" onclick="closeCartDrawer()" style="padding:0.65rem 1.25rem;">Explore Catalog</a>
      </div>
    `;
    if (couponBox) couponBox.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (shippingFill) shippingFill.style.width = '0%';
    if (shippingMsg) shippingMsg.textContent = 'Add ₹999 for FREE Delivery';
    if (shippingPct) shippingPct.textContent = '0%';
    return;
  }

  if (couponBox) couponBox.style.display = 'block';
  if (footer) footer.style.display = 'block';

  let subtotal = 0;
  let itemsHtml = '';

  cart.forEach(item => {
    const product = (typeof products !== 'undefined') ? products.find(p => p.id == item.id) : null;
    if (!product) return;

    const unitPrice = typeof calculateDiscount === 'function' ? calculateDiscount(product.price, product.discount) : product.price;
    const itemTotal = unitPrice * item.quantity;
    subtotal += itemTotal;

    const rawImg = product.image || (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=75&fm=webp';
    const imgUrl = typeof getOptimizedImageUrl === 'function' ? getOptimizedImageUrl(rawImg, 100, 70) : rawImg;

    itemsHtml += `
      <div class="cart-drawer-item">
        <a href="product-details.html?id=${product.id}" onclick="closeCartDrawer()">
          <img src="${imgUrl}" class="cart-drawer-item-img" alt="${product.name}" loading="lazy" decoding="async">
        </a>
        <div class="cart-drawer-item-info">
          <a href="product-details.html?id=${product.id}" class="cart-drawer-item-title" onclick="closeCartDrawer()" style="text-decoration:none; display:block;">
            ${product.name}
          </a>
          <div class="cart-drawer-item-price">${formatPrice(unitPrice)}</div>
          <div class="qty-controls" style="display:inline-flex; align-items:center; gap:6px;">
            <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" style="width:26px; height:26px; border:1px solid var(--color-border); border-radius:4px; display:flex; align-items:center; justify-content:center; cursor:pointer; background:var(--color-card-bg); color:var(--color-text-primary);" title="Decrease Quantity"><i class="fas fa-minus" style="font-size:0.65rem;"></i></button>
            <span style="font-weight:700; font-size:0.88rem; min-width:22px; text-align:center;">${item.quantity}</span>
            <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" style="width:26px; height:26px; border:1px solid var(--color-border); border-radius:4px; display:flex; align-items:center; justify-content:center; cursor:pointer; background:var(--color-card-bg); color:var(--color-text-primary);" title="Increase Quantity"><i class="fas fa-plus" style="font-size:0.65rem;"></i></button>
          </div>
        </div>
        <button onclick="removeFromCart(${item.id})" title="Remove item" style="color:var(--color-text-secondary); background:transparent; border:none; padding:6px; cursor:pointer; font-size:0.95rem; transition:color 0.2s;" onmouseover="this.style.color='var(--color-danger)'" onmouseout="this.style.color='var(--color-text-secondary)'">
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    `;
  });

  itemsContainer.innerHTML = itemsHtml;

  // Coupon Section Render
  if (couponBox) {
    if (drawerAppliedCoupon) {
      couponBox.innerHTML = `
        <div class="drawer-coupon-applied">
          <div>
            <i class="fas fa-tag"></i> <b>${drawerAppliedCoupon.code}</b> (${drawerAppliedCoupon.label})
          </div>
          <button class="drawer-coupon-remove-btn" onclick="removeDrawerCoupon()">Remove</button>
        </div>
      `;
    } else {
      couponBox.innerHTML = `
        <div class="drawer-coupon-form">
          <input type="text" id="cartDrawerCouponInput" class="drawer-coupon-input" placeholder="Promo Code (SAVE10, NOVA20)" onkeydown="if(event.key==='Enter') applyDrawerCoupon()">
          <button class="drawer-coupon-btn" onclick="applyDrawerCoupon()">Apply</button>
        </div>
        <div class="drawer-coupon-chips">
          <span class="drawer-coupon-chip" onclick="setDrawerCouponCode('SAVE10')">SAVE10 (10%)</span>
          <span class="drawer-coupon-chip" onclick="setDrawerCouponCode('NOVA20')">NOVA20 (20%)</span>
          <span class="drawer-coupon-chip" onclick="setDrawerCouponCode('SAVE500')">SAVE500 (₹500)</span>
        </div>
      `;
    }
  }

  // Calculate Discount and Total Breakdown
  let discountAmount = 0;
  if (drawerAppliedCoupon) {
    if (drawerAppliedCoupon.type === 'pct') {
      discountAmount = Math.round(subtotal * drawerAppliedCoupon.value);
    } else if (drawerAppliedCoupon.type === 'flat') {
      discountAmount = Math.min(subtotal, drawerAppliedCoupon.value);
    } else if (drawerAppliedCoupon.type === 'pct_max') {
      discountAmount = Math.min(1000, Math.round(subtotal * drawerAppliedCoupon.value));
    }
  }

  const isFreeDelivery = subtotal >= 999 || (drawerAppliedCoupon && drawerAppliedCoupon.type === 'freeship');
  const deliveryCost = isFreeDelivery ? 0 : 99;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryCost);

  if (summaryBox) {
    summaryBox.innerHTML = `
      <div class="drawer-summary-row">
        <span>Subtotal</span>
        <span style="font-weight:600; color:var(--color-text-primary);">${formatPrice(subtotal)}</span>
      </div>
      ${discountAmount > 0 ? `
        <div class="drawer-summary-row drawer-discount-row">
          <span>Coupon Savings (${drawerAppliedCoupon.code})</span>
          <span>-${formatPrice(discountAmount)}</span>
        </div>
      ` : ''}
      <div class="drawer-summary-row">
        <span>Delivery Fee</span>
        <span style="color:${isFreeDelivery ? 'var(--color-success)' : 'var(--color-text-primary)'}; font-weight:600;">
          ${isFreeDelivery ? 'FREE' : formatPrice(deliveryCost)}
        </span>
      </div>
      <div class="drawer-summary-row drawer-total-row">
        <span>Total Payable</span>
        <span style="color:var(--color-primary);">${formatPrice(finalTotal)}</span>
      </div>
    `;
  }

  // Free shipping threshold = ₹999
  const threshold = 999;
  if (subtotal >= threshold) {
    if (shippingMsg) shippingMsg.innerHTML = '<i class="fas fa-check-circle" style="color:var(--color-success)"></i> 🎉 You unlocked <b>FREE Express Delivery!</b>';
    if (shippingPct) shippingPct.textContent = '100%';
    if (shippingFill) {
      shippingFill.style.width = '100%';
      shippingFill.style.background = 'var(--color-success)';
    }
  } else {
    const needed = threshold - subtotal;
    const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
    if (shippingMsg) shippingMsg.textContent = `Add ${formatPrice(needed)} more for FREE Delivery`;
    if (shippingPct) shippingPct.textContent = `${pct}%`;
    if (shippingFill) {
      shippingFill.style.width = `${pct}%`;
      shippingFill.style.background = 'var(--color-primary)';
    }
  }
}

function openCartDrawer() {
  ensureCartDrawerDOM();
  renderCartDrawer();
  const overlay = document.getElementById('globalCartDrawerOverlay');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const overlay = document.getElementById('globalCartDrawerOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function toggleCartDrawer() {
  const overlay = document.getElementById('globalCartDrawerOverlay');
  if (overlay && overlay.classList.contains('active')) {
    closeCartDrawer();
  } else {
    openCartDrawer();
  }
}

/* ==========================================================================
   Multi-Step Checkout Modal & Celebratory Confetti System
   ========================================================================== */
let currentCheckoutStep = 1;
let selectedCheckoutAddressIdx = 0;
let selectedCheckoutPayment = 'upi';

function ensureCheckoutModalDOM() {
  if (document.getElementById('globalCheckoutModal')) return;

  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'globalCheckoutModal';
  modalOverlay.className = 'checkout-modal-overlay';
  modalOverlay.innerHTML = `
    <div class="checkout-modal-card" id="checkoutModalCard">
      <button class="modal-close-btn" onclick="closeCheckoutModal()" title="Close">&times;</button>
      
      <!-- Stepper Header -->
      <div class="checkout-stepper-head">
        <div class="checkout-step-node active" id="chkStepNode1" onclick="setCheckoutStep(1)">
          <div class="checkout-step-circle">1</div>
          <span class="checkout-step-label">Address</span>
        </div>
        <div class="checkout-step-node" id="chkStepNode2" onclick="setCheckoutStep(2)">
          <div class="checkout-step-circle">2</div>
          <span class="checkout-step-label">Payment</span>
        </div>
        <div class="checkout-step-node" id="chkStepNode3" onclick="setCheckoutStep(3)">
          <div class="checkout-step-circle">3</div>
          <span class="checkout-step-label">Review</span>
        </div>
      </div>

      <!-- Step 1: Address Selection & Confirmation -->
      <div class="checkout-step-pane" id="chkStepPane1">
        <h3 style="font-size:1.15rem; font-weight:800; margin-bottom:1rem; display:flex; align-items:center; gap:8px;">
          <i class="fas fa-map-marker-alt" style="color:var(--color-primary)"></i> Select Delivery Address
        </h3>
        <div class="checkout-address-list" id="checkoutAddressList">
          <!-- Populated dynamically -->
        </div>

        <div style="margin-bottom:1rem;">
          <button class="btn btn-outline btn-sm" onclick="toggleNewAddressForm()" id="toggleNewAddrBtn" style="font-size:0.82rem;">
            <i class="fas fa-plus"></i> Add New Delivery Address
          </button>
        </div>

        <div id="newAddressFormContainer" style="display:none; background:rgba(30,41,59,0.6); padding:1rem; border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.1); margin-bottom:1.5rem;">
          <div class="checkout-form-row">
            <div>
              <label style="font-size:0.75rem; font-weight:700; color:#94a3b8; display:block; margin-bottom:4px;">Full Name</label>
              <input type="text" id="chkNewName" class="checkout-form-input" placeholder="Rahul Sharma" value="Rahul Sharma">
            </div>
            <div>
              <label style="font-size:0.75rem; font-weight:700; color:#94a3b8; display:block; margin-bottom:4px;">Mobile Number</label>
              <input type="text" id="chkNewPhone" class="checkout-form-input" placeholder="9876543210" maxlength="10" value="9876543210">
            </div>
          </div>
          <div style="margin-bottom:0.85rem;">
            <label style="font-size:0.75rem; font-weight:700; color:#94a3b8; display:block; margin-bottom:4px;">Flat, House No., Street Area</label>
            <input type="text" id="chkNewStreet" class="checkout-form-input" placeholder="Flat 402, Green Acres Apt, Indiranagar" value="Flat 402, Green Acres Apt, 100ft Road">
          </div>
          <div class="checkout-form-row">
            <div>
              <label style="font-size:0.75rem; font-weight:700; color:#94a3b8; display:block; margin-bottom:4px;">City</label>
              <input type="text" id="chkNewCity" class="checkout-form-input" placeholder="Bengaluru" value="Bengaluru">
            </div>
            <div>
              <label style="font-size:0.75rem; font-weight:700; color:#94a3b8; display:block; margin-bottom:4px;">Pincode</label>
              <input type="text" id="chkNewPincode" class="checkout-form-input" placeholder="560001" maxlength="6" value="560001">
            </div>
          </div>
        </div>

        <div class="checkout-modal-actions">
          <button class="btn btn-outline btn-sm" onclick="closeCheckoutModal()">Cancel</button>
          <button class="btn btn-primary" onclick="proceedFromAddressStep()">
            Proceed to Payment <i class="fas fa-arrow-right" style="margin-left:6px;"></i>
          </button>
        </div>
      </div>

      <!-- Step 2: Payment Method Selection -->
      <div class="checkout-step-pane" id="chkStepPane2" style="display:none;">
        <h3 style="font-size:1.15rem; font-weight:800; margin-bottom:1rem; display:flex; align-items:center; gap:8px;">
          <i class="fas fa-credit-card" style="color:var(--color-primary)"></i> Choose Payment Method
        </h3>

        <div class="checkout-payment-methods">
          <!-- UPI -->
          <div class="checkout-payment-card selected" id="chkPmUpi" onclick="selectCheckoutPayment('upi')">
            <div class="checkout-pm-header">
              <i class="fas fa-mobile-screen-button"></i>
              <div style="flex:1;">
                <div>UPI (Google Pay, PhonePe, Paytm, BHIM)</div>
                <span style="font-size:0.75rem; color:#34d399; font-weight:600;">Instant 100% Secure Checkout</span>
              </div>
              <input type="radio" name="checkoutPm" value="upi" checked>
            </div>
            <div class="checkout-pm-body">
              <div style="display:flex; align-items:center; gap:1.25rem; flex-wrap:wrap;">
                <div style="background:#ffffff; padding:6px; border-radius:8px; display:inline-block;">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=upi://pay?pa=novacart@okaxis&pn=NovaCart" alt="Scan UPI QR" style="width:90px; height:90px; display:block;">
                </div>
                <div style="flex:1; min-width:200px;">
                  <label style="font-size:0.75rem; font-weight:700; color:#94a3b8; display:block; margin-bottom:4px;">Or Enter UPI ID / VPA</label>
                  <div style="display:flex; gap:6px;">
                    <input type="text" id="chkUpiIdInput" class="checkout-form-input" placeholder="user@okhdfcbank" value="user@okaxis">
                    <button class="btn btn-outline btn-sm" onclick="showToast('UPI ID Verified!', 'success')" style="padding:0 0.85rem;">Verify</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cards -->
          <div class="checkout-payment-card" id="chkPmCard" onclick="selectCheckoutPayment('card')">
            <div class="checkout-pm-header">
              <i class="fas fa-credit-card"></i>
              <div style="flex:1;">
                <div>Credit / Debit Cards</div>
                <span style="font-size:0.75rem; color:#94a3b8;">Visa, MasterCard, RuPay, Amex</span>
              </div>
              <input type="radio" name="checkoutPm" value="card">
            </div>
            <div class="checkout-pm-body">
              <div style="margin-bottom:0.75rem;">
                <label style="font-size:0.75rem; font-weight:700; color:#94a3b8; display:block; margin-bottom:4px;">Card Number</label>
                <input type="text" id="chkCardNumber" class="checkout-form-input" placeholder="4532 •••• •••• 8920" maxlength="19" value="4532 8920 1284 8920">
              </div>
              <div class="checkout-form-row">
                <div>
                  <label style="font-size:0.75rem; font-weight:700; color:#94a3b8; display:block; margin-bottom:4px;">Valid Thru</label>
                  <input type="text" id="chkCardExpiry" class="checkout-form-input" placeholder="MM/YY" maxlength="5" value="08/28">
                </div>
                <div>
                  <label style="font-size:0.75rem; font-weight:700; color:#94a3b8; display:block; margin-bottom:4px;">CVV</label>
                  <input type="password" id="chkCardCvv" class="checkout-form-input" placeholder="•••" maxlength="4" value="892">
                </div>
              </div>
            </div>
          </div>

          <!-- NetBanking -->
          <div class="checkout-payment-card" id="chkPmNet" onclick="selectCheckoutPayment('net')">
            <div class="checkout-pm-header">
              <i class="fas fa-building-columns"></i>
              <div style="flex:1;">
                <div>Net Banking</div>
                <span style="font-size:0.75rem; color:#94a3b8;">All Major Indian Banks Supported</span>
              </div>
              <input type="radio" name="checkoutPm" value="net">
            </div>
            <div class="checkout-pm-body">
              <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                <button class="drawer-coupon-chip" onclick="showToast('HDFC Bank selected')">🏦 HDFC</button>
                <button class="drawer-coupon-chip" onclick="showToast('ICICI Bank selected')">🏦 ICICI</button>
                <button class="drawer-coupon-chip" onclick="showToast('SBI selected')">🏦 SBI</button>
                <button class="drawer-coupon-chip" onclick="showToast('Axis Bank selected')">🏦 Axis</button>
              </div>
            </div>
          </div>

          <!-- Cash on Delivery -->
          <div class="checkout-payment-card" id="chkPmCod" onclick="selectCheckoutPayment('cod')">
            <div class="checkout-pm-header">
              <i class="fas fa-money-bill-wave"></i>
              <div style="flex:1;">
                <div>Cash on Delivery (COD)</div>
                <span style="font-size:0.75rem; color:#34d399; font-weight:600;">Pay with Cash or UPI at your Doorstep</span>
              </div>
              <input type="radio" name="checkoutPm" value="cod">
            </div>
          </div>
        </div>

        <div class="checkout-modal-actions">
          <button class="btn btn-outline btn-sm" onclick="setCheckoutStep(1)"><i class="fas fa-arrow-left"></i> Back</button>
          <button class="btn btn-primary" onclick="proceedFromPaymentStep()">
            Review Order <i class="fas fa-arrow-right" style="margin-left:6px;"></i>
          </button>
        </div>
      </div>

      <!-- Step 3: Order Review & Confirmation -->
      <div class="checkout-step-pane" id="chkStepPane3" style="display:none;">
        <h3 style="font-size:1.15rem; font-weight:800; margin-bottom:1rem; display:flex; align-items:center; gap:8px;">
          <i class="fas fa-clipboard-check" style="color:var(--color-primary)"></i> Review Your Order
        </h3>

        <!-- Destination summary -->
        <div style="background:#1e293b; padding:0.85rem 1.1rem; border-radius:var(--radius-md); margin-bottom:1rem; border:1px solid rgba(255,255,255,0.06); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:0.75rem; font-weight:700; color:#94a3b8; text-transform:uppercase;">Delivering To</div>
            <div id="chkReviewDestName" style="font-weight:700; font-size:0.92rem; color:#f8fafc;">Rahul Sharma</div>
            <div id="chkReviewDestAddr" style="font-size:0.82rem; color:#cbd5e1;">Flat 402, Indiranagar, Bengaluru - 560001</div>
          </div>
          <button class="btn btn-outline btn-sm" onclick="setCheckoutStep(1)" style="font-size:0.75rem;">Change</button>
        </div>

        <!-- Items preview list -->
        <div class="checkout-review-items" id="chkReviewItemsList">
          <!-- Rendered dynamically -->
        </div>

        <!-- Pricing Breakdown -->
        <div style="background:#1e293b; padding:1rem 1.25rem; border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.08);">
          <div class="drawer-summary-row">
            <span>Items Subtotal</span>
            <span id="chkReviewSubtotal" style="font-weight:600; color:#f8fafc;">₹0</span>
          </div>
          <div class="drawer-summary-row drawer-discount-row" id="chkReviewDiscountRow" style="display:none;">
            <span id="chkReviewDiscountLabel">Coupon Discount</span>
            <span id="chkReviewDiscountVal">-₹0</span>
          </div>
          <div class="drawer-summary-row">
            <span>Express Delivery</span>
            <span id="chkReviewShipping" style="color:#34d399; font-weight:600;">FREE</span>
          </div>
          <div class="drawer-summary-row drawer-total-row" style="margin-top:0.4rem; padding-top:0.6rem;">
            <span>Total Payable Amount</span>
            <span id="chkReviewTotal" style="color:#38bdf8;">₹0</span>
          </div>
        </div>

        <div class="checkout-modal-actions">
          <button class="btn btn-outline btn-sm" onclick="setCheckoutStep(2)"><i class="fas fa-arrow-left"></i> Back</button>
          <button class="btn btn-primary" id="placeOrderBtn" onclick="placeOrderFromModal()" style="padding:0.75rem 1.5rem; font-size:0.95rem; font-weight:800; box-shadow:0 0 20px rgba(37,99,235,0.5);">
            <i class="fas fa-lock"></i> Place Order & Pay
          </button>
        </div>
      </div>

    </div>
  `;

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeCheckoutModal();
  });

  document.body.appendChild(modalOverlay);
}

function ensureOrderSuccessModalDOM() {
  if (document.getElementById('orderSuccessModal')) return;

  const successOverlay = document.createElement('div');
  successOverlay.id = 'orderSuccessModal';
  successOverlay.className = 'success-modal-overlay';
  successOverlay.innerHTML = `
    <canvas id="confettiCanvas" class="confetti-canvas"></canvas>
    <div class="success-modal-card" style="text-align:center; max-width:540px;">
      <div class="success-badge-bounce">
        <i class="fas fa-check"></i>
      </div>
      <h2 style="font-size:1.6rem; font-weight:800; color:#f8fafc; margin-bottom:0.4rem;">Order Placed Successfully!</h2>
      <p style="color:#94a3b8; font-size:0.9rem; margin-bottom:1.5rem;">Thank you for your purchase with NovaCart. Your package is being prepared at our fulfillment hub.</p>

      <div style="background:#1e293b; padding:1.25rem; border-radius:var(--radius-xl); border:1px solid rgba(255,255,255,0.08); margin-bottom:1.75rem; text-align:left;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.85rem;">
          <span style="color:#94a3b8;">Order ID:</span>
          <span id="succOrderId" style="font-weight:700; color:#38bdf8;">NC-94821</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.85rem;">
          <span style="color:#94a3b8;">Tracking AWB:</span>
          <span id="succTrackingAwb" style="font-weight:600; color:#cbd5e1;">BD-84920194 (BlueDart Express)</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.85rem;">
          <span style="color:#94a3b8;">Estimated Delivery:</span>
          <span id="succDeliveryEst" style="font-weight:700; color:#34d399;">Tomorrow by 9:00 PM</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:0.5rem;">
          <span style="color:#94a3b8;">Amount Paid:</span>
          <span id="succAmountPaid" style="font-weight:800; color:#f8fafc; font-size:1rem;">₹0</span>
        </div>
      </div>

      <div style="display:flex; gap:0.75rem; justify-content:center;">
        <a href="orders.html" class="btn btn-primary" style="flex:1; padding:0.75rem;">
          <i class="fas fa-truck-fast"></i> Track Order
        </a>
        <button class="btn btn-outline" onclick="closeOrderSuccessModal()" style="flex:1; padding:0.75rem;">
          Continue Shopping
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(successOverlay);
}

async function openCheckoutModal() {
  const cart = await getCartData();
  if (!cart || cart.length === 0) {
    if (typeof showToast === 'function') showToast('Your cart is empty!', 'warning');
    return;
  }

  // Close cart drawer if open
  closeCartDrawer();

  ensureCheckoutModalDOM();
  ensureOrderSuccessModalDOM();

  // Populate saved addresses
  renderCheckoutAddresses();
  setCheckoutStep(1);

  const modal = document.getElementById('globalCheckoutModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('globalCheckoutModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function closeOrderSuccessModal() {
  const modal = document.getElementById('orderSuccessModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function renderCheckoutAddresses() {
  const list = document.getElementById('checkoutAddressList');
  if (!list) return;

  // Retrieve saved profile address or mock addresses
  let savedLoc = { city: "Bengaluru", pincode: "560001" };
  try {
    const loc = localStorage.getItem('novacart_user_location');
    if (loc) savedLoc = JSON.parse(loc);
  } catch (e) {}

  const addresses = [
    {
      name: "Rahul Sharma (Default)",
      phone: "+91 98765 43210",
      street: "Flat 402, Green Acres Apt, 100ft Road, Indiranagar",
      city: savedLoc.city || "Bengaluru",
      pincode: savedLoc.pincode || "560001",
      tag: "Home"
    },
    {
      name: "Rahul Sharma (Office)",
      phone: "+91 98765 43210",
      street: "Nova Tech Park, 4th Floor, Electronic City Phase 1",
      city: "Bengaluru",
      pincode: "560100",
      tag: "Work"
    }
  ];

  list.innerHTML = addresses.map((addr, idx) => `
    <div class="checkout-address-card ${idx === selectedCheckoutAddressIdx ? 'selected' : ''}" onclick="selectCheckoutAddress(${idx})">
      <input type="radio" name="chkSelectedAddress" class="checkout-address-radio" ${idx === selectedCheckoutAddressIdx ? 'checked' : ''}>
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
          <span style="font-weight:700; font-size:0.92rem; color:#f8fafc;">${addr.name}</span>
          <span class="drawer-coupon-chip" style="font-size:0.7rem; padding:1px 6px;">${addr.tag}</span>
        </div>
        <div style="font-size:0.82rem; color:#cbd5e1; line-height:1.35;">${addr.street}, ${addr.city} - <b>${addr.pincode}</b></div>
        <div style="font-size:0.78rem; color:#94a3b8; margin-top:2px;"><i class="fas fa-phone" style="font-size:0.7rem;"></i> ${addr.phone}</div>
      </div>
    </div>
  `).join('');
}

function selectCheckoutAddress(idx) {
  selectedCheckoutAddressIdx = idx;
  const cards = document.querySelectorAll('.checkout-address-card');
  cards.forEach((card, i) => {
    const radio = card.querySelector('input[type="radio"]');
    if (i === idx) {
      card.classList.add('selected');
      if (radio) radio.checked = true;
    } else {
      card.classList.remove('selected');
      if (radio) radio.checked = false;
    }
  });
}

function toggleNewAddressForm() {
  const form = document.getElementById('newAddressFormContainer');
  const btn = document.getElementById('toggleNewAddrBtn');
  if (form) {
    const isHidden = form.style.display === 'none';
    form.style.display = isHidden ? 'block' : 'none';
    if (btn) btn.innerHTML = isHidden ? '<i class="fas fa-minus"></i> Hide Address Form' : '<i class="fas fa-plus"></i> Add New Delivery Address';
  }
}

function proceedFromAddressStep() {
  setCheckoutStep(2);
}

function selectCheckoutPayment(pmKey) {
  selectedCheckoutPayment = pmKey;
  const cards = document.querySelectorAll('.checkout-payment-card');
  cards.forEach(card => card.classList.remove('selected'));

  const chosen = document.getElementById(`chkPm${pmKey.charAt(0).toUpperCase() + pmKey.slice(1)}`);
  if (chosen) {
    chosen.classList.add('selected');
    const radio = chosen.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  }
}

function proceedFromPaymentStep() {
  setCheckoutStep(3);
}

async function setCheckoutStep(step) {
  currentCheckoutStep = step;

  // Update Stepper circles
  for (let i = 1; i <= 3; i++) {
    const node = document.getElementById(`chkStepNode${i}`);
    const pane = document.getElementById(`chkStepPane${i}`);
    if (node) {
      node.classList.toggle('active', i === step);
      node.classList.toggle('completed', i < step);
    }
    if (pane) {
      pane.style.display = i === step ? 'block' : 'none';
    }
  }

  // If on Review Step, compute pricing and items
  if (step === 3) {
    const cart = await getCartData();
    const itemsList = document.getElementById('chkReviewItemsList');
    const subtotalEl = document.getElementById('chkReviewSubtotal');
    const discountRow = document.getElementById('chkReviewDiscountRow');
    const discountLabel = document.getElementById('chkReviewDiscountLabel');
    const discountVal = document.getElementById('chkReviewDiscountVal');
    const totalEl = document.getElementById('chkReviewTotal');

    let subtotal = 0;
    if (itemsList) {
      itemsList.innerHTML = cart.map(item => {
        const prod = (typeof products !== 'undefined') ? products.find(p => p.id == item.id) : null;
        if (!prod) return '';
        const unitPrice = typeof calculateDiscount === 'function' ? calculateDiscount(prod.price, prod.discount) : prod.price;
        const lineTotal = unitPrice * item.quantity;
        subtotal += lineTotal;
        const img = prod.image || prod.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80';

        return `
          <div class="checkout-review-item">
            <img src="${img}" class="checkout-review-img" alt="${prod.name}">
            <div style="flex:1; min-width:0;">
              <div style="font-weight:700; font-size:0.85rem; color:#f8fafc; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${prod.name}</div>
              <div style="font-size:0.78rem; color:#94a3b8;">Qty: <b>${item.quantity}</b> × ${formatPrice(unitPrice)}</div>
            </div>
            <div style="font-weight:700; font-size:0.9rem; color:#38bdf8;">${formatPrice(lineTotal)}</div>
          </div>
        `;
      }).join('');
    }

    // Coupon Calculations
    let discountAmount = 0;
    if (drawerAppliedCoupon) {
      if (drawerAppliedCoupon.type === 'pct') {
        discountAmount = Math.round(subtotal * drawerAppliedCoupon.value);
      } else if (drawerAppliedCoupon.type === 'flat') {
        discountAmount = Math.min(subtotal, drawerAppliedCoupon.value);
      } else if (drawerAppliedCoupon.type === 'pct_max') {
        discountAmount = Math.min(1000, Math.round(subtotal * drawerAppliedCoupon.value));
      }
    }

    const isFree = subtotal >= 999 || (drawerAppliedCoupon && drawerAppliedCoupon.type === 'freeship');
    const shipping = isFree ? 0 : 99;
    const finalTotal = Math.max(0, subtotal - discountAmount + shipping);

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (discountRow) {
      if (discountAmount > 0) {
        discountRow.style.display = 'flex';
        if (discountLabel) discountLabel.textContent = `Coupon Savings (${drawerAppliedCoupon.code})`;
        if (discountVal) discountVal.textContent = `-${formatPrice(discountAmount)}`;
      } else {
        discountRow.style.display = 'none';
      }
    }
    if (totalEl) totalEl.textContent = formatPrice(finalTotal);
  }
}

async function placeOrderFromModal() {
  const cart = await getCartData();
  if (!cart || cart.length === 0) return;

  const placeBtn = document.getElementById('placeOrderBtn');
  if (placeBtn) {
    placeBtn.disabled = true;
    placeBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Processing Secure Payment...`;
  }

  // Calculate order total
  let subtotal = 0;
  cart.forEach(item => {
    const prod = (typeof products !== 'undefined') ? products.find(p => p.id == item.id) : null;
    if (prod) {
      const unit = typeof calculateDiscount === 'function' ? calculateDiscount(prod.price, prod.discount) : prod.price;
      subtotal += unit * item.quantity;
    }
  });

  let discountAmount = 0;
  if (drawerAppliedCoupon) {
    if (drawerAppliedCoupon.type === 'pct') discountAmount = Math.round(subtotal * drawerAppliedCoupon.value);
    else if (drawerAppliedCoupon.type === 'flat') discountAmount = Math.min(subtotal, drawerAppliedCoupon.value);
    else if (drawerAppliedCoupon.type === 'pct_max') discountAmount = Math.min(1000, Math.round(subtotal * drawerAppliedCoupon.value));
  }
  const isFree = subtotal >= 999 || (drawerAppliedCoupon && drawerAppliedCoupon.type === 'freeship');
  const shipping = isFree ? 0 : 99;
  const orderTotal = Math.max(0, subtotal - discountAmount + shipping);

  // Generate unique order ID & tracking AWB
  const randomId = 'NC-' + Math.floor(10000 + Math.random() * 90000);
  const randomAwb = 'BD-' + Math.floor(10000000 + Math.random() * 90000000);

  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const deliveryEstStr = tomorrow.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) + ' by 9:00 PM';

  const newOrder = {
    id: randomId,
    trackingAwb: randomAwb,
    courier: "BlueDart Express",
    date: new Date().toISOString(),
    status: "Processing",
    total: orderTotal,
    paymentMethod: selectedCheckoutPayment.toUpperCase(),
    items: [...cart],
    shippingAddress: {
      name: "Rahul Sharma",
      street: "Flat 402, Green Acres Apt, Indiranagar",
      city: "Bengaluru",
      pincode: "560001"
    }
  };

  // Save order to localStorage
  let savedOrders = [];
  try {
    const raw = localStorage.getItem('novacart_mock_orders');
    if (raw) savedOrders = JSON.parse(raw);
  } catch (e) {}

  savedOrders.unshift(newOrder);
  localStorage.setItem('novacart_mock_orders', JSON.stringify(savedOrders));

  // If Firebase user exists, save to Firestore
  if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser && typeof db !== 'undefined') {
    try {
      const user = firebase.auth().currentUser;
      await db.collection('users').doc(user.uid).set({
        orders: savedOrders
      }, { merge: true });
    } catch (e) {}
  }

  // Clear Cart
  await saveCartData([]);
  updateCartCounters();

  // Populate Success Modal
  const succOrderEl = document.getElementById('succOrderId');
  const succAwbEl = document.getElementById('succTrackingAwb');
  const succDelEl = document.getElementById('succDeliveryEst');
  const succPaidEl = document.getElementById('succAmountPaid');

  if (succOrderEl) succOrderEl.textContent = randomId;
  if (succAwbEl) succAwbEl.textContent = `${randomAwb} (${newOrder.courier})`;
  if (succDelEl) succDelEl.textContent = deliveryEstStr;
  if (succPaidEl) succPaidEl.textContent = formatPrice(orderTotal);

  // Close Checkout Modal & Open Success Modal
  closeCheckoutModal();
  
  if (placeBtn) {
    placeBtn.disabled = false;
    placeBtn.innerHTML = `<i class="fas fa-lock"></i> Place Order & Pay`;
  }

  const succModal = document.getElementById('orderSuccessModal');
  if (succModal) {
    succModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    launchCelebrationConfetti();
  }

  if (typeof showToast === 'function') {
    showToast(`Order #${randomId} confirmed! Check email for receipt.`, 'success');
  }
}

function launchCelebrationConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#38BDF8', '#34D399', '#F59E0B', '#F43F5E', '#A855F7', '#60A5FA', '#EC4899'];

  for (let i = 0; i < 140; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 80,
      y: canvas.height / 2 + (Math.random() - 0.5) * 80,
      w: Math.random() * 9 + 4,
      h: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 22,
      vy: (Math.random() - 0.75) * 20 - 4,
      gravity: 0.38,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 14,
      opacity: 1
    });
  }

  let startTime = Date.now();
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const elapsed = Date.now() - startTime;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rot += p.rotSpeed;
      if (elapsed > 1800) p.opacity -= 0.02;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (elapsed < 3000) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  requestAnimationFrame(animate);
}

// Toggle Wishlist
async function toggleWishlist(productId) {
  if (typeof products === 'undefined' || !products.length) return;
  const product = products.find(p => p.id == productId);
  if (!product) return;

  let wishlist = await getWishlistData();
  const numId = Number(productId);
  const index = wishlist.indexOf(numId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`${product.name} removed from wishlist`);
  } else {
    wishlist.push(numId);
    showToast(`${product.name} added to wishlist!`);
  }

  await saveWishlistData(wishlist);
  updateCartCounters();
  updateWishlistButtonsUI();
}

function isInWishlist(productId) {
  return cachedWishlist.includes(Number(productId));
}

async function updateWishlistButtonsUI() {
  const wishlist = await getWishlistData();
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    const icon = btn.querySelector('i');
    if (icon) {
      if (wishlist.includes(id)) {
        icon.className = 'fas fa-heart';
        icon.style.color = 'var(--color-danger)';
      } else {
        icon.className = 'far fa-heart';
        icon.style.color = '';
      }
    }
  });
}

// Initial Sync on Auth State
if (typeof firebase !== 'undefined' && firebase.auth) {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user && typeof db !== 'undefined') {
      let localCart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      let localWishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
      
      try {
        const doc = await db.collection('users').doc(user.uid).get();
        let firestoreCart = doc.data()?.cart || [];
        let firestoreWishlist = doc.data()?.wishlist || [];
        
        if (localCart.length > 0) {
          firestoreCart = [...firestoreCart, ...localCart].filter((v,i,a) => a.findIndex(t => (t.id === v.id)) === i);
        }
        if (localWishlist.length > 0) {
          firestoreWishlist = [...new Set([...firestoreWishlist, ...localWishlist])];
        }
        
        await db.collection('users').doc(user.uid).set({ 
          cart: firestoreCart, 
          wishlist: firestoreWishlist 
        }, { merge: true });
        
        cachedWishlist = firestoreWishlist;
      } catch (e) {
        console.warn("Auth sync error", e);
      }
    }
    updateCartCounters();
    updateWishlistButtonsUI();
  });
}
