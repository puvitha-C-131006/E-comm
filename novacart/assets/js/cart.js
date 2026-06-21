/* ==========================================================================
   NovaCart - Cart & Wishlist Logic
   ========================================================================== */

const CART_KEY = 'novacart_cart';
const WISHLIST_KEY = 'novacart_wishlist';

// Get user data from Firestore or LocalStorage
async function getCartData() {
  const user = firebase.auth().currentUser;
  if (user) {
    const doc = await db.collection('users').doc(user.uid).get();
    return doc.data()?.cart || [];
  }
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

async function getWishlistData() {
  const user = firebase.auth().currentUser;
  if (user) {
    const doc = await db.collection('users').doc(user.uid).get();
    return doc.data()?.wishlist || [];
  }
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
}

// Save user data to Firestore or LocalStorage
async function saveCartData(cart) {
  const user = firebase.auth().currentUser;
  if (user) {
    await db.collection('users').doc(user.uid).set({ cart: cart }, { merge: true });
  } else {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
}

async function saveWishlistData(wishlist) {
  const user = firebase.auth().currentUser;
  if (user) {
    await db.collection('users').doc(user.uid).set({ wishlist: wishlist }, { merge: true });
  } else {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }
}

// Add to Cart
async function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = await getCartData();
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
      showToast('Cannot add more than available stock', 'error');
      return;
    }
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity: quantity });
  }

  await saveCartData(cart);
  updateCartCounters();
  showToast(`${product.name} added to cart!`);
}

// Remove from Cart
async function removeFromCart(productId) {
  let cart = await getCartData();
  cart = cart.filter(item => item.id !== productId);
  await saveCartData(cart);
  updateCartCounters();
  
  // If we are on the cart page, re-render
  if (typeof renderCartPage === 'function') {
    renderCartPage();
  }
}

// Update Cart Quantity
async function updateCartQuantity(productId, quantity) {
  let cart = await getCartData();
  const item = cart.find(i => i.id === productId);
  const product = products.find(p => p.id === productId);
  
  if (item && product) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    if (quantity > product.stock) {
      showToast(`Only ${product.stock} items left in stock`, 'error');
      quantity = product.stock;
    }
    item.quantity = quantity;
    await saveCartData(cart);
    updateCartCounters();
    
    if (typeof renderCartPage === 'function') {
      renderCartPage();
    }
  }
}

// Toggle Wishlist
async function toggleWishlist(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let wishlist = await getWishlistData();
  const index = wishlist.indexOf(productId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`${product.name} removed from wishlist`);
  } else {
    wishlist.push(productId);
    showToast(`${product.name} added to wishlist!`);
  }

  await saveWishlistData(wishlist);
  updateCartCounters();
  updateWishlistButtonsUI();
}

function isInWishlist(productId) {
  // Synchronous check relies on local storage for UI state to avoid flickering, 
  // but let's make it robust by checking auth user memory state if possible,
  // For simplicity in UI, we'll keep it sync and fetch from local storage or memory.
  // Actually, we must make it async, or preload it.
  const user = firebase.auth().currentUser;
  if (!user) {
      const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
      return wishlist.includes(productId);
  }
  // If logged in, we assume updateWishlistButtonsUI is called after data is fetched
  // This is a bit tricky, so we'll adjust the UI update logic below.
  return false; 
}

async function updateWishlistButtonsUI() {
  let wishlist = await getWishlistData();
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    const icon = btn.querySelector('i');
    if (icon) {
      if (wishlist.includes(id)) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = 'var(--color-danger)';
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
      }
    }
  });
}

// Sync local data to Firestore when user logs in
firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        // Logged in: Sync local cart to Firestore if there are items
        let localCart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
        let localWishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
        
        const doc = await db.collection('users').doc(user.uid).get();
        let firestoreCart = doc.data()?.cart || [];
        let firestoreWishlist = doc.data()?.wishlist || [];
        
        if (localCart.length > 0) {
            // Simple merge: just prefer local or merge them
            firestoreCart = [...firestoreCart, ...localCart].filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
            localStorage.removeItem(CART_KEY);
        }
        if (localWishlist.length > 0) {
            firestoreWishlist = [...new Set([...firestoreWishlist, ...localWishlist])];
            localStorage.removeItem(WISHLIST_KEY);
        }
        
        await db.collection('users').doc(user.uid).set({ 
            cart: firestoreCart, 
            wishlist: firestoreWishlist 
        }, { merge: true });
        
        updateCartCounters();
        updateWishlistButtonsUI();
    } else {
        // Logged out: just update UI
        updateCartCounters();
        updateWishlistButtonsUI();
    }
});
