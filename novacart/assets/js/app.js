/* ==========================================================================
   NovaCart - Global App & UI/UX Micro-Interactions (Amazon/Flipkart Architecture)
   Location Indicator, Slide-Out Cart Drawer, Hero Carousel, Search & State Sync
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initActiveNav();
  initUnifiedSearch();
  initLocationSelector();
  initHeroCarousel();
  initMobileDrawer();
  initBottomNav();
  initNotifications();
  initCartTriggers();
  updateCartCounters();
  initTheme();
  initBackToTop();
  initKeyboardShortcuts();
});

// Navigation Active State Logic (Desktop & Mobile Bottom Nav)
function initActiveNav() {
  const currentPath = window.location.pathname;
  const currentSearch = window.location.search;
  
  // Desktop Nav Links
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.classList.remove('active');
    try {
      const linkUrl = new URL(link.href, window.location.origin);
      const isHomeLink = linkUrl.pathname.endsWith('index.html') || linkUrl.pathname.endsWith('/') || linkUrl.pathname === '';
      const isDealsLink = linkUrl.pathname.endsWith('products.html') && linkUrl.search.includes('deals=true');
      const isShopLink = linkUrl.pathname.endsWith('products.html') && !linkUrl.search.includes('deals=true');
      
      const isCurrentHome = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '';
      const isCurrentDeals = currentPath.endsWith('products.html') && currentSearch.includes('deals=true');
      const isCurrentShop = currentPath.endsWith('products.html') && !currentSearch.includes('deals=true');
      
      if (isHomeLink && isCurrentHome && !currentSearch.includes('deals=true')) {
        link.classList.add('active');
      } else if (isDealsLink && isCurrentDeals) {
        link.classList.add('active');
      } else if (isShopLink && isCurrentShop) {
        link.classList.add('active');
      } else if (!isHomeLink && !isDealsLink && !isShopLink && linkUrl.pathname === currentPath) {
        link.classList.add('active');
      }
    } catch (e) {
      console.error("Nav link active check error:", e);
    }
  });

  // Mobile Bottom Nav Items (Home, Categories, Deals, My Orders, Profile)
  const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
  bottomNavItems.forEach(item => {
    item.classList.remove('active');
    const isHome = (currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '') && !currentSearch.includes('deals=true');
    const isDeals = currentPath.endsWith('products.html') && currentSearch.includes('deals=true');
    const isCategories = currentPath.endsWith('products.html') && !currentSearch.includes('deals=true');
    const isOrders = currentPath.endsWith('orders.html');
    const isProfile = currentPath.endsWith('profile.html') || currentPath.endsWith('login.html') || currentPath.endsWith('register.html');

    if (item.id === 'bnav-home' && isHome) {
      item.classList.add('active');
    } else if (item.id === 'bnav-categories' && isCategories) {
      item.classList.add('active');
    } else if (item.id === 'bnav-deals' && isDeals) {
      item.classList.add('active');
    } else if (item.id === 'bnav-orders' && isOrders) {
      item.classList.add('active');
    } else if (item.id === 'bnav-profile' && isProfile) {
      item.classList.add('active');
    }
  });
}

// Sticky Glassmorphism Header Scroll Handler
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
}

// Global Cart Trigger Hooking
function initCartTriggers() {
  document.querySelectorAll('.cart-drawer-trigger, .nav-actions a[href="cart.html"], .action-icon[title="Cart"]').forEach(el => {
    el.addEventListener('click', (e) => {
      // If user is not specifically on the full cart page, open the drawer for fast seamless access
      if (!window.location.pathname.endsWith('cart.html')) {
        e.preventDefault();
        if (typeof openCartDrawer === 'function') {
          openCartDrawer();
        }
      }
    });
  });
}

// Amazon/Flipkart Location Selector Indicator & Modal Controller
function initLocationSelector() {
  let savedLocation = localStorage.getItem('novacart_user_location');
  if (!savedLocation) {
    savedLocation = JSON.stringify({ city: "Bengaluru", pincode: "560001", state: "Karnataka" });
    localStorage.setItem('novacart_user_location', savedLocation);
  }

  updateLocationUI(JSON.parse(savedLocation));

  // Build Location Picker Modal if not present
  if (!document.getElementById('locationModalOverlay')) {
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'locationModalOverlay';
    modalOverlay.className = 'location-modal-overlay';
    modalOverlay.innerHTML = `
      <div class="location-modal-card">
        <div class="location-modal-header">
          <h3><i class="fas fa-map-marker-alt" style="color:var(--color-primary)"></i> Choose Delivery Location</h3>
          <button class="btn-icon" onclick="closeLocationModal()" style="width:34px; height:34px;"><i class="fas fa-times"></i></button>
        </div>
        <p style="font-size:0.88rem; color:var(--color-text-secondary); margin-bottom:1.25rem;">
          Select your delivery destination to view accurate product availability and express shipping speeds.
        </p>
        <div style="display:flex; gap:0.6rem; margin-bottom:1.25rem;">
          <input type="text" id="locPincodeInput" placeholder="Enter 6-digit Pincode" maxlength="6" style="flex:1; padding:0.75rem 1rem; border:1px solid var(--color-border); border-radius:var(--radius-md); background:var(--color-card-subtle); color:var(--color-text-primary); font-weight:600;">
          <button class="btn btn-primary" onclick="applyPincodeLocation()">Apply</button>
        </div>
        <div style="border-top:1px solid var(--color-border); padding-top:1rem;">
          <div style="font-size:0.8rem; font-weight:700; color:var(--color-text-secondary); text-transform:uppercase; margin-bottom:0.75rem;">Quick Select Major Cities</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
            <button class="btn btn-outline btn-sm" onclick="setQuickLocation('Mumbai', '400001', 'Maharashtra')">📍 Mumbai (400001)</button>
            <button class="btn btn-outline btn-sm" onclick="setQuickLocation('Bengaluru', '560001', 'Karnataka')">📍 Bengaluru (560001)</button>
            <button class="btn btn-outline btn-sm" onclick="setQuickLocation('Delhi NCR', '110001', 'Delhi')">📍 Delhi NCR (110001)</button>
            <button class="btn btn-outline btn-sm" onclick="setQuickLocation('Hyderabad', '500001', 'Telangana')">📍 Hyderabad (500001)</button>
          </div>
        </div>
      </div>
    `;

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeLocationModal();
    });

    document.body.appendChild(modalOverlay);
  }
}

function updateLocationUI(loc) {
  const citySpans = document.querySelectorAll('.loc-city-name');
  const pincodeSpans = document.querySelectorAll('.loc-pincode');
  citySpans.forEach(span => span.textContent = loc.city || 'India');
  pincodeSpans.forEach(span => span.textContent = loc.pincode || '560001');
}

function openLocationModal() {
  const overlay = document.getElementById('locationModalOverlay');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLocationModal() {
  const overlay = document.getElementById('locationModalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function setQuickLocation(city, pincode, state) {
  const loc = { city, pincode, state };
  localStorage.setItem('novacart_user_location', JSON.stringify(loc));
  updateLocationUI(loc);
  closeLocationModal();
  showToast(`Delivery location updated to ${city} (${pincode})!`);
}

function applyPincodeLocation() {
  const input = document.getElementById('locPincodeInput');
  const pin = input ? input.value.trim() : '';
  if (!pin || pin.length < 6 || isNaN(pin)) {
    showToast('Please enter a valid 6-digit Pincode', 'error');
    return;
  }
  setQuickLocation(`Zone ${pin.slice(0, 3)}`, pin, 'India');
}

// Live Search & Keyboard Shortcut (Ctrl+K / ⌘K)
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('.search-bar input, .search-bar-unified input') || document.getElementById('globalSearchInput');
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
  });
}

function initUnifiedSearch() {
  // If we are on products.html, the dedicated live search with filtering logic handles search interactions
  if (window.location.pathname.endsWith('products.html') || window.location.pathname.endsWith('/products')) {
    return;
  }

  const searchInputs = document.querySelectorAll('.search-bar input, .search-bar-unified input');
  searchInputs.forEach(input => {
    const wrapper = input.closest('.search-wrapper') || input.parentElement;
    let dropdown = wrapper.querySelector('.search-suggestions-dropdown');
    
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'search-suggestions-dropdown';
      wrapper.appendChild(dropdown);
    }

    input.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (!query || query.length < 2) {
        dropdown.classList.remove('show');
        dropdown.innerHTML = '';
        return;
      }

      if (typeof products === 'undefined' || !products.length) return;

      const categorySelect = document.getElementById('searchCategorySelect');
      const selectedCat = categorySelect ? categorySelect.value : 'all';

      const matches = products.filter(p => {
        const matchesCategory = selectedCat === 'all' || (p.category && p.category.toLowerCase() === selectedCat.toLowerCase());
        const matchesQuery = (p.name && p.name.toLowerCase().includes(query)) ||
          (p.brand && p.brand.toLowerCase().includes(query)) ||
          (p.category && p.category.toLowerCase().includes(query));
        return matchesCategory && matchesQuery;
      }).slice(0, 5);

      if (matches.length === 0) {
        dropdown.innerHTML = `<div style="padding: 1rem; text-align: center; color: var(--color-text-secondary); font-size: 0.88rem;">No matching products found for "<b>${query}</b>"</div>`;
        dropdown.classList.add('show');
        return;
      }

      dropdown.innerHTML = matches.map(prod => {
        const title = prod.name;
        const discounted = typeof calculateDiscount === 'function' ? calculateDiscount(prod.price, prod.discount) : prod.price;
        const priceStr = typeof formatPrice === 'function' ? formatPrice(discounted) : '₹' + discounted;
        return `
          <div class="search-suggest-item" onclick="window.location.href='product-details.html?id=${prod.id}'">
            <img src="${prod.image || (prod.images && prod.images[0]) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80'}" class="search-suggest-img" alt="${title}">
            <div class="search-suggest-info">
              <div class="search-suggest-name">${title}</div>
              <div class="search-suggest-meta">
                <span>${prod.category || 'General'}</span> &bull; 
                <span style="color: var(--color-primary); font-weight: 700;">${priceStr}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');

      dropdown.classList.add('show');
    });

    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        const categorySelect = document.getElementById('searchCategorySelect');
        const catParam = categorySelect && categorySelect.value !== 'all' ? `&category=${encodeURIComponent(categorySelect.value)}` : '';
        window.location.href = `products.html?search=${encodeURIComponent(input.value.trim())}${catParam}`;
      }
    });
  });

  const searchBtns = document.querySelectorAll('.search-btn');
  searchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      if (input && input.value.trim()) {
        const categorySelect = document.getElementById('searchCategorySelect');
        const catParam = categorySelect && categorySelect.value !== 'all' ? `&category=${encodeURIComponent(categorySelect.value)}` : '';
        window.location.href = `products.html?search=${encodeURIComponent(input.value.trim())}${catParam}`;
      }
    });
  });
}

// Hero Carousel Slider Engine
let currentHeroSlide = 0;
let heroSlideTimer = null;

function initHeroCarousel() {
  const slidesWrapper = document.getElementById('heroSlidesWrapper');
  const dots = document.querySelectorAll('.hero-dot');
  const slides = document.querySelectorAll('.hero-slide-item');
  if (!slidesWrapper || slides.length === 0) return;

  const totalSlides = slides.length;

  window.goToHeroSlide = function(index) {
    currentHeroSlide = (index + totalSlides) % totalSlides;
    slidesWrapper.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentHeroSlide);
    });
  };

  window.nextHeroSlide = function() {
    goToHeroSlide(currentHeroSlide + 1);
  };

  window.prevHeroSlide = function() {
    goToHeroSlide(currentHeroSlide - 1);
  };

  // Start autoplay
  clearInterval(heroSlideTimer);
  heroSlideTimer = setInterval(() => {
    nextHeroSlide();
  }, 5500);

  // Pause on hover
  const container = document.querySelector('.hero-carousel-container');
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(heroSlideTimer));
    container.addEventListener('mouseleave', () => {
      clearInterval(heroSlideTimer);
      heroSlideTimer = setInterval(() => nextHeroSlide(), 5500);
    });
  }

  // Touch-Swipe Support for Mobile Devices
  let touchStartX = 0;
  let touchEndX = 0;
  slidesWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(heroSlideTimer);
  }, { passive: true });

  slidesWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextHeroSlide();
      else prevHeroSlide();
    }
    clearInterval(heroSlideTimer);
    heroSlideTimer = setInterval(() => nextHeroSlide(), 5500);
  }, { passive: true });
}

// Horizontal Scrollable Carousel Helper ("Today's Deals", "Best Sellers")
function scrollCarousel(trackId, direction) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const scrollAmount = track.clientWidth * 0.75;
  track.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  });
}

// Mobile Slide-Out Navigation Drawer
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  let drawer = document.querySelector('.mobile-drawer');
  let overlay = document.querySelector('.drawer-overlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay drawer-overlay';
    document.body.appendChild(overlay);
  }

  if (!drawer) {
    drawer = document.createElement('div');
    drawer.className = 'mobile-drawer';
    drawer.innerHTML = `
      <div class="drawer-header">
        <a href="index.html" class="logo">
          <div class="logo-badge"><i class="fas fa-shopping-bag"></i></div>
          Nova<span>Cart</span>
        </a>
        <button class="btn-icon drawer-close" style="width: 36px; height: 36px;" title="Close Menu">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="drawer-body">
        <div class="search-bar" style="margin-bottom: 0.75rem;">
          <i class="fas fa-search search-icon"></i>
          <input type="text" placeholder="Search products..." onkeydown="if(event.key==='Enter'&&this.value.trim()) window.location.href='products.html?search='+encodeURIComponent(this.value.trim());">
        </div>

        <div style="background:var(--color-card-subtle); padding:0.75rem; border-radius:var(--radius-md); margin-bottom:1rem; display:flex; align-items:center; justify-content:space-between;" onclick="openLocationModal();">
          <div style="display:flex; align-items:center; gap:8px;">
            <i class="fas fa-map-marker-alt" style="color:var(--color-primary)"></i>
            <span style="font-size:0.85rem; font-weight:600;">Deliver to <span class="loc-city-name">Bengaluru</span></span>
          </div>
          <span style="font-size:0.75rem; color:var(--color-primary); font-weight:700;">Change</span>
        </div>
        
        <div class="drawer-nav-list">
          <a href="index.html" class="drawer-nav-item"><i class="fas fa-home"></i> Home</a>
          <a href="products.html" class="drawer-nav-item"><i class="fas fa-store"></i> All Products Catalog</a>
          <a href="products.html?deals=true" class="drawer-nav-item"><i class="fas fa-bolt" style="color: var(--color-warning);"></i> Flash Deals & Discounts</a>
          <a href="wishlist.html" class="drawer-nav-item"><i class="far fa-heart"></i> Wishlist</a>
          <a href="javascript:void(0)" onclick="openCartDrawer()" class="drawer-nav-item"><i class="fas fa-shopping-cart"></i> Cart Drawer</a>
          <a href="orders.html" class="drawer-nav-item"><i class="fas fa-box"></i> My Orders</a>
          <a href="profile.html" class="drawer-nav-item"><i class="far fa-user"></i> My Profile</a>
        </div>

        <div style="border-top: 1px solid var(--color-border); padding-top: 1rem; margin-top: 0.5rem;">
          <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--color-text-secondary); margin-bottom: 0.75rem;">Shop By Department</div>
          <div style="display: flex; flex-direction: column; gap: 0.4rem;">
            <a href="products.html?category=Electronics" style="padding: 0.4rem 0.5rem; font-size: 0.9rem; color: var(--color-text-secondary);"><i class="fas fa-laptop" style="margin-right:8px;"></i> Electronics & Tech</a>
            <a href="products.html?category=Fashion" style="padding: 0.4rem 0.5rem; font-size: 0.9rem; color: var(--color-text-secondary);"><i class="fas fa-tshirt" style="margin-right:8px;"></i> Fashion & Apparel</a>
            <a href="products.html?category=Footwear" style="padding: 0.4rem 0.5rem; font-size: 0.9rem; color: var(--color-text-secondary);"><i class="fas fa-shoe-prints" style="margin-right:8px;"></i> Footwear</a>
            <a href="products.html?category=Gaming" style="padding: 0.4rem 0.5rem; font-size: 0.9rem; color: var(--color-text-secondary);"><i class="fas fa-gamepad" style="margin-right:8px;"></i> Gaming Gear</a>
            <a href="products.html?category=Home%20Appliances" style="padding: 0.4rem 0.5rem; font-size: 0.9rem; color: var(--color-text-secondary);"><i class="fas fa-blender" style="margin-right:8px;"></i> Home Appliances</a>
          </div>
        </div>
      </div>
      <div class="drawer-footer">
        <button class="btn btn-secondary" onclick="toggleTheme();" style="width: 100%;">
          <i class="fas fa-moon"></i> Toggle Dark / Light Theme
        </button>
      </div>
    `;
    document.body.appendChild(drawer);
  }

  const openDrawer = () => {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', openDrawer);
  }

  const closeBtn = drawer.querySelector('.drawer-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  overlay.addEventListener('click', closeDrawer);
}

// Mobile Bottom Navigation Injection & Sync (Home, Categories, Deals, My Orders, Profile)
function initBottomNav() {
  let bottomNav = document.querySelector('.bottom-nav');
  if (!bottomNav) {
    bottomNav = document.createElement('nav');
    bottomNav.className = 'bottom-nav';
    bottomNav.innerHTML = `
      <div class="bottom-nav-inner">
        <a href="index.html" class="bottom-nav-item" id="bnav-home">
          <i class="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a href="products.html" class="bottom-nav-item" id="bnav-categories">
          <i class="fas fa-th-large"></i>
          <span>Categories</span>
        </a>
        <a href="products.html?deals=true" class="bottom-nav-item" id="bnav-deals">
          <i class="fas fa-bolt"></i>
          <span>Deals</span>
        </a>
        <a href="orders.html" class="bottom-nav-item" id="bnav-orders">
          <i class="fas fa-box-open"></i>
          <span>My Orders</span>
        </a>
        <a href="profile.html" class="bottom-nav-item" id="bnav-profile">
          <i class="far fa-user"></i>
          <span>Profile</span>
        </a>
      </div>
    `;
    document.body.appendChild(bottomNav);
    initActiveNav();
  }
}

// Theme Logic (Dark/Light Mode)
function initTheme() {
  const currentTheme = localStorage.getItem('novacart_theme') || 'light';
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcons('dark');
  }
}

window.toggleTheme = function() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('novacart_theme', newTheme);
  updateThemeIcons(newTheme);
};

function updateThemeIcons(theme) {
  const icons = document.querySelectorAll('#theme-toggle i, .theme-icon');
  icons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  });
}

// Back to Top Logic
function initBackToTop() {
  let btn = document.getElementById('backToTop');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.className = 'btn-icon';
    btn.title = 'Back to Top';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.style.cssText = 'position: fixed; bottom: 5.5rem; right: 1.5rem; z-index: 99; display: none; background: var(--color-primary); color: white; box-shadow: var(--shadow-lg); border: none;';
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.style.display = 'inline-flex';
    } else {
      btn.style.display = 'none';
    }
  }, { passive: true });
}

// Toast Notifications System (Top-Right Floating Popups)
function showToast(message, type = 'success', title = null) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  // Auto-detect type from message if generic
  let toastType = type;
  if (type === 'success') {
    if (message.toLowerCase().includes('wishlist')) toastType = 'wishlist';
    else if (message.toLowerCase().includes('cart')) toastType = 'cart';
  }

  // Default titles based on type / message
  let displayTitle = title;
  if (!displayTitle) {
    switch (toastType) {
      case 'wishlist':
        displayTitle = message.toLowerCase().includes('removed') ? 'Wishlist Updated' : 'Added to Wishlist';
        break;
      case 'cart':
        displayTitle = message.toLowerCase().includes('removed') ? 'Cart Updated' : 'Added to Cart';
        break;
      case 'error':
        displayTitle = 'Action Failed';
        break;
      case 'warning':
        displayTitle = 'Notice';
        break;
      case 'info':
        displayTitle = 'Information';
        break;
      default:
        if (message.toLowerCase().includes('profile') || message.toLowerCase().includes('information') || message.toLowerCase().includes('address') || message.toLowerCase().includes('password')) {
          displayTitle = 'Profile Updated';
        } else if (message.toLowerCase().includes('coupon')) {
          displayTitle = 'Promo Coupon';
        } else if (message.toLowerCase().includes('location') || message.toLowerCase().includes('delivery') || message.toLowerCase().includes('pincode')) {
          displayTitle = 'Delivery Destination';
        } else {
          displayTitle = 'Success';
        }
        break;
    }
  }

  let iconClass = 'fa-circle-check';
  if (toastType === 'error') iconClass = 'fa-circle-exclamation';
  else if (toastType === 'warning') iconClass = 'fa-triangle-exclamation';
  else if (toastType === 'info') iconClass = 'fa-circle-info';
  else if (toastType === 'wishlist') iconClass = 'fa-heart';
  else if (toastType === 'cart') iconClass = 'fa-cart-shopping';

  const toast = document.createElement('div');
  toast.className = `toast toast-${toastType}`;
  
  toast.innerHTML = `
    <div class="toast-icon-wrap">
      <i class="fas ${iconClass}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${displayTitle}</div>
      <p class="toast-message">${message}</p>
    </div>
    <button class="toast-close" title="Dismiss">&times;</button>
    <div class="toast-progress">
      <div class="toast-progress-fill"></div>
    </div>
  `;

  // Manual dismiss
  const closeBtn = toast.querySelector('.toast-close');
  const dismissToast = () => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 350);
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', dismissToast);
  }

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto-dismiss after 3000ms
  let removeTimer = setTimeout(dismissToast, 3000);

  // Pause on hover
  toast.addEventListener('mouseenter', () => {
    clearTimeout(removeTimer);
    const progressFill = toast.querySelector('.toast-progress-fill');
    if (progressFill) progressFill.style.animationPlayState = 'paused';
  });

  toast.addEventListener('mouseleave', () => {
    const progressFill = toast.querySelector('.toast-progress-fill');
    if (progressFill) progressFill.style.animationPlayState = 'running';
    removeTimer = setTimeout(dismissToast, 1500);
  });
}

window.showToast = showToast;

// Global Cart & Wishlist Counters Update
async function updateCartCounters() {
  let cartItems = [];
  let wishlistItems = [];
  
  if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser && typeof db !== 'undefined') {
    try {
      const user = firebase.auth().currentUser;
      const doc = await db.collection('users').doc(user.uid).get();
      if (doc.exists) {
        cartItems = doc.data()?.cart || [];
        wishlistItems = doc.data()?.wishlist || [];
      }
    } catch (e) {
      console.warn("Could not sync counters with Firestore, falling back to localStorage", e);
      cartItems = JSON.parse(localStorage.getItem('novacart_cart')) || [];
      wishlistItems = JSON.parse(localStorage.getItem('novacart_wishlist')) || [];
    }
  } else {
    cartItems = JSON.parse(localStorage.getItem('novacart_cart')) || [];
    wishlistItems = JSON.parse(localStorage.getItem('novacart_wishlist')) || [];
  }
  
  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  
  const cartBadges = document.querySelectorAll('.cart-badge');
  const wishlistBadges = document.querySelectorAll('.wishlist-badge');
  
  cartBadges.forEach(badge => {
    badge.textContent = totalCartCount;
    badge.style.display = totalCartCount > 0 ? 'inline-flex' : 'none';
  });
  
  wishlistBadges.forEach(badge => {
    badge.textContent = wishlistItems.length;
    badge.style.display = wishlistItems.length > 0 ? 'inline-flex' : 'none';
  });
}

// Quick View Modal
function openQuickView(id) {
  if (typeof products === 'undefined' || !products.length) return;
  const product = products.find(p => p.id == id);
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
  const prodImg = product.image || (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80';
  
  modal.innerHTML = `
    <div class="quickview-content">
      <button class="quickview-close" onclick="closeQuickView()" title="Close"><i class="fas fa-times"></i></button>
      
      <div style="flex: 1; display: flex; align-items: center; justify-content: center; background: #FFFFFF; border-radius: var(--radius-lg); padding: 8px; box-sizing: border-box; min-height: 300px;">
        <img src="${prodImg}" style="width: 100%; height: 100%; max-height: 340px; object-fit: contain; border-radius: var(--radius-md);" alt="${escapeHtml ? escapeHtml(product.name) : product.name}">
      </div>
      
      <div style="flex: 1.2; display: flex; flex-direction: column; justify-content: center;">
        <div class="product-category" style="margin-bottom: 0.5rem; font-size:0.85rem; color:var(--color-primary); font-weight:700;">${product.category || 'Collection'} &bull; ${product.brand || 'NovaCart'}</div>
        <h2 style="font-size: 1.45rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--color-text-primary); line-height: 1.3;">${product.name}</h2>
        
        <div style="margin-bottom:1rem;">
          ${typeof renderStars === 'function' ? renderStars(product.rating || 4.5, true, product.reviewCount || 42) : ''}
        </div>
        
        <div class="product-price" style="font-size: 1.6rem; margin-bottom: 1.25rem; display:flex; align-items:baseline; gap:0.75rem;">
          <span class="current-price" style="color: var(--color-primary); font-weight:800; font-family:'Outfit',sans-serif;">${typeof formatPrice === 'function' ? formatPrice(discountedPrice) : '₹' + discountedPrice}</span>
          ${hasDiscount ? `<span class="old-price" style="text-decoration:line-through; color:var(--color-text-muted); font-size:1.1rem;">${typeof formatPrice === 'function' ? formatPrice(product.price) : '₹' + product.price}</span>` : ''}
          ${hasDiscount ? `<span class="badge-discount" style="background:#EF4444; color:#fff; font-size:0.75rem; font-weight:800; padding:0.2rem 0.5rem; border-radius:4px;">${product.discount}% OFF</span>` : ''}
        </div>
        
        <p style="color: var(--color-text-secondary); margin-bottom: 1.5rem; line-height: 1.6; font-size: 0.95rem;">${product.description || 'Premium design engineered for excellence, superior performance, and unmatched daily reliability.'}</p>
        
        <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 1.25rem;">
          <input type="number" id="qv-qty" value="1" min="1" max="${product.stock || 50}" style="width: 75px; height: 44px; padding: 0.5rem; border: 1.5px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-bg); color: var(--color-text-primary); font-weight: 600; text-align: center;">
          <button class="btn btn-primary" style="flex: 1;" onclick="addToCart(${product.id}, parseInt(document.getElementById('qv-qty').value)); closeQuickView();">
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
          <button class="btn-icon" onclick="toggleWishlist(${product.id});" title="Wishlist">
            <i class="${inWishlist ? 'fas' : 'far'} fa-heart" style="${inWishlist ? 'color: var(--color-danger);' : ''}"></i>
          </button>
        </div>
        
        <a href="product-details.html?id=${product.id}" style="color: var(--color-primary); font-weight: 600; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.4rem;">
          View Full Specifications & Reviews <i class="fas fa-arrow-right"></i>
        </a>
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
      const badge = dropdown.querySelector('.badge');
      if (badge && dropdown.classList.contains('active')) badge.style.display = 'none';
    } else if (!e.target.closest('.notification-panel')) {
      dropdown.classList.remove('active');
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.textContent && e.target.textContent.includes('Mark all as read')) {
      document.querySelectorAll('.notification-item.unread').forEach(item => item.classList.remove('unread'));
      const badge = document.querySelector('.notification-dropdown .badge');
      if (badge) badge.style.display = 'none';
      showToast('All notifications marked as read');
    }
  });
}

// Fallback Core Utility Functions
if (typeof window.calculateDiscount !== 'function') {
  window.calculateDiscount = function(price, discountPercentage) {
    if (!discountPercentage || discountPercentage <= 0) return price;
    return Math.round(price - (price * discountPercentage / 100));
  };
}

if (typeof window.formatPrice !== 'function') {
  window.formatPrice = function(price) {
    if (typeof price !== 'number') {
      price = Number(price) || 0;
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
}

if (typeof window.renderStars !== 'function') {
  window.renderStars = function(rating = 0, showCount = false, reviewCount = 0) {
    const numRating = Math.max(0, Math.min(5, Number(rating) || 0));
    const fullStars = Math.floor(numRating);
    const hasHalfStar = (numRating % 1) >= 0.3 && (numRating % 1) <= 0.8;
    const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0) - ((numRating % 1) > 0.8 ? 1 : 0));
    const effectiveFullStars = (numRating % 1) > 0.8 ? fullStars + 1 : fullStars;

    let starsHtml = '<span class="star-rating" style="color:#F59E0B; display:inline-flex; align-items:center; gap:2px; font-size:0.85rem;">';
    for (let i = 0; i < effectiveFullStars; i++) starsHtml += '<i class="fas fa-star"></i>';
    if (hasHalfStar) starsHtml += '<i class="fas fa-star-half-alt"></i>';
    for (let i = 0; i < emptyStars; i++) starsHtml += '<i class="far fa-star" style="opacity:0.4;"></i>';
    starsHtml += `<span style="font-weight:700; margin-left:4px; color:var(--color-text-primary, #F8FAFC); font-size:0.82rem;">${numRating.toFixed(1)}</span>`;
    if (showCount && reviewCount !== undefined && reviewCount !== null) {
      const formattedCount = typeof reviewCount === 'number' ? reviewCount.toLocaleString('en-IN') : reviewCount;
      starsHtml += `<span style="color:var(--color-text-muted, #94A3B8); font-size:0.78rem; margin-left:4px;">(${formattedCount})</span>`;
    }
    starsHtml += '</span>';
    return starsHtml;
  };
}

if (typeof window.escapeHtml !== 'function') {
  window.escapeHtml = function(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  };
}

if (typeof window.fetchProducts !== 'function') {
  window.fetchProducts = async function() {
    if (typeof db !== 'undefined' && db && typeof firebase !== 'undefined' && firebase.firestore) {
      try {
        const snapshot = await db.collection('products').get();
        if (!snapshot.empty) {
          const firestoreProducts = [];
          snapshot.forEach(doc => firestoreProducts.push(doc.data()));
          if (firestoreProducts.length > 0) {
            window.products = firestoreProducts;
            return firestoreProducts;
          }
        }
      } catch (e) {
        console.warn("Could not fetch products from Firestore:", e);
      }
    }
    return window.products || [];
  };
}

if (typeof window.isInWishlist !== 'function') {
  window.isInWishlist = function(productId) {
    try {
      const list = JSON.parse(localStorage.getItem('novacart_wishlist')) || [];
      return list.some(item => (typeof item === 'object' ? item.id == productId : item == productId));
    } catch (e) {
      return false;
    }
  };
}

if (typeof window.shareProduct !== 'function') {
  window.shareProduct = function(productId) {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        if (typeof showToast === 'function') showToast('Product link copied to clipboard!', 'success');
        else alert('Product link copied to clipboard!');
      }).catch(() => prompt('Copy this product link:', url));
    } else {
      prompt('Copy this product link:', url);
    }
  };
}
