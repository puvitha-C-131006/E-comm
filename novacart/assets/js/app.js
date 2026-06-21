/* ==========================================================================
   NovaCart - Global App Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initNotifications();
  initMobileMenu();
  updateCartCounters();
  initTheme();
  initBackToTop();
});

// Theme Logic
function initTheme() {
  const currentTheme = localStorage.getItem('novacart_theme') || 'light';
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    const icon = document.querySelector('#theme-toggle i');
    if(icon) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  }
}

window.toggleTheme = function() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('novacart_theme', newTheme);
  
  const icons = document.querySelectorAll('#theme-toggle i');
  icons.forEach(icon => {
    if (newTheme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });
};

// Back to Top Logic
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (btn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.style.display = 'flex';
      } else {
        btn.style.display = 'none';
      }
    });
  }
}

// Navbar Scroll Effect
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }
}

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const overlay = document.querySelector('.overlay') || createOverlay();

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    overlay.addEventListener('click', () => {
      navMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}

function createOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);
  return overlay;
}

// Toast Notifications
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
  const color = type === 'success' ? 'var(--color-success)' : 'var(--color-danger)';
  
  toast.innerHTML = `
    <i class="fas ${icon}" style="color: ${color}; font-size: 1.25rem;"></i>
    <div>
      <p style="font-weight: 500;">${message}</p>
    </div>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Global Cart & Wishlist Counters Update
async function updateCartCounters() {
  let cartItems = [];
  let wishlistItems = [];
  
  if (typeof firebase !== 'undefined' && firebase.auth().currentUser) {
      const user = firebase.auth().currentUser;
      const doc = await db.collection('users').doc(user.uid).get();
      cartItems = doc.data()?.cart || [];
      wishlistItems = doc.data()?.wishlist || [];
  } else {
      cartItems = JSON.parse(localStorage.getItem('novacart_cart')) || [];
      wishlistItems = JSON.parse(localStorage.getItem('novacart_wishlist')) || [];
  }
  
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const cartBadges = document.querySelectorAll('.cart-badge');
  const wishlistBadges = document.querySelectorAll('.wishlist-badge');
  
  cartBadges.forEach(badge => {
    badge.textContent = totalCartCount;
    badge.style.display = totalCartCount > 0 ? 'flex' : 'none';
  });
  
  wishlistBadges.forEach(badge => {
    badge.textContent = wishlistItems.length;
    badge.style.display = wishlistItems.length > 0 ? 'flex' : 'none';
  });
}


// Quick View Modal
function openQuickView(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    let modal = document.getElementById('quickViewModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'quickViewModal';
        modal.className = 'quickview-modal';
        document.body.appendChild(modal);
    }
    
    const discountedPrice = typeof calculateDiscount === 'function' ? calculateDiscount(product.price, product.discount) : product.price;
    const hasDiscount = product.discount > 0;
    const inWishlist = typeof isInWishlist === 'function' && isInWishlist(product.id);
    
    modal.innerHTML = `
        <div class="quickview-content">
            <button class="quickview-close" onclick="closeQuickView()"><i class="fas fa-times"></i></button>
            <div style="flex: 1;">
                <img src="${product.image}" style="width: 100%; border-radius: var(--radius-md);" alt="${product.name}" onerror="this.onerror=null; this.src='assets/images/product-default.png';">
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                <div class="product-category">${product.category} &bull; ${product.brand}</div>
                <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--color-text-primary);">${product.name}</h2>
                <div class="product-rating" style="margin-bottom: 1rem;">
                    <div class="stars">
                        ${Array(5).fill('').map((_, i) => `<i class="fas fa-star" style="opacity: ${i < Math.floor(product.rating) ? 1 : 0.3}"></i>`).join('')}
                    </div>
                    <span>(${product.reviewCount} Reviews)</span>
                </div>
                <div class="product-price" style="font-size: 1.5rem; margin-bottom: 1rem;">
                    <span class="current-price">${typeof formatPrice === 'function' ? formatPrice(discountedPrice) : discountedPrice}</span>
                    ${hasDiscount ? `<span class="old-price" style="font-size: 1rem;">${typeof formatPrice === 'function' ? formatPrice(product.price) : product.price}</span>` : ''}
                </div>
                <p style="color: var(--color-text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">Premium quality ${product.name} with cutting edge features, perfect for everyday use.</p>
                <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
                    <input type="number" id="qv-qty" value="1" min="1" max="${product.stock}" style="width: 80px; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-bg); color: var(--color-text-primary);">
                    <button class="btn btn-primary" style="flex: 1;" onclick="addToCart(${product.id}, parseInt(document.getElementById('qv-qty').value)); closeQuickView();">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="btn-icon" onclick="toggleWishlist(${product.id}); this.querySelector('i').className = isInWishlist(${product.id}) ? 'fas fa-heart' : 'far fa-heart'; this.querySelector('i').style.color = isInWishlist(${product.id}) ? 'var(--color-danger)' : '';" title="Wishlist">
                        <i class="${inWishlist ? 'fas' : 'far'} fa-heart" style="${inWishlist ? 'color: var(--color-danger);' : ''}"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 10);
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => modal.remove(), 300);
    }
}


// Notifications Logic
function initNotifications() {
  document.addEventListener('click', (e) => {
      const dropdown = document.querySelector('.notification-dropdown');
      if (!dropdown) return;

      const trigger = e.target.closest('.notification-dropdown > .action-icon');
      if (trigger) {
          e.preventDefault();
          dropdown.classList.toggle('active');
      } else if (!e.target.closest('.notification-panel')) {
          dropdown.classList.remove('active');
      }
  });

  // Mark all as read
  document.addEventListener('click', (e) => {
      if (e.target.textContent === 'Mark all as read') {
          document.querySelectorAll('.notification-item.unread').forEach(item => {
              item.classList.remove('unread');
          });
          const badge = document.querySelector('.notification-dropdown .badge');
          if(badge) badge.style.display = 'none';
      }
  });
}

// Share Product Logic
function shareProduct(id) {
    const url = window.location.origin + '/product-details.html?id=' + id;
    if (navigator.share) {
        navigator.share({
            title: 'Check out this product on NovaCart!',
            url: url
        }).catch(err => console.error('Share failed:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            showToast('Link copied to clipboard!');
        });
    }
}
