/**
 * LuxeHorizon Resort & Hotel - Indian Luxury Sanctuaries Edition
 * Core Application Logic & State Engine
 * Features:
 * - 100% Indian Rupee (₹ INR) & GST Tax Invoicing
 * - Complete Select-Based Booking (No Typing Required for Destinations, Rooms, Meal Plans, Preferences)
 * - 8 Iconic Indian Destinations & Luxury Resorts Showcase
 * - 8 Specialized Room Types Tailored for Indian Travelers
 * - Seamless Light & Dark Theme Mode with Instant Persistence
 * - 3-Day Free Cancellation / Modification Policy Engine
 * - Full Administrator Control Portal with CMS & Inventory Management
 */

function formatINR(amount) {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

const State = {
  rooms: [],
  resorts: [],
  bookings: [],
  currentUser: null,
  staticPages: {},
  reviews: [],
  currentRole: 'user', // 'user' or 'admin'
  isAdminLoggedIn: false,
  activeTheme: 'dark', // 'dark' or 'light'
  activeCategoryFilter: 'all',

  init() {
    this.initTheme();
    this.loadFromStorage();
    this.bindEvents();
    this.renderAll();
  },

  /* -------------------------------------------------------------
   * Theme Engine: Light & Dark Modes
   * ------------------------------------------------------------- */
  initTheme() {
    const savedTheme = localStorage.getItem('luxe_theme') || 'dark';
    this.setTheme(savedTheme);
  },

  setTheme(theme) {
    this.activeTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.activeTheme);
    localStorage.setItem('luxe_theme', this.activeTheme);

    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      if (this.activeTheme === 'light') {
        toggleBtn.innerHTML = '🌙 Dark Mode';
        toggleBtn.title = 'Switch to Obsidian Dark Luxury Theme';
      } else {
        toggleBtn.innerHTML = '☀️ Light Mode';
        toggleBtn.title = 'Switch to Royal Ivory Light Luxury Theme';
      }
    }
  },

  toggleTheme() {
    const nextTheme = this.activeTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'light' ? 'Royal Ivory Light' : 'Obsidian Dark'} Theme`, 'info');
  },

  /* -------------------------------------------------------------
   * Storage & Migration
   * ------------------------------------------------------------- */
  loadFromStorage() {
    const savedVersion = localStorage.getItem('luxe_version');

    // If version is older or not set, load the comprehensive Indian seed data
    if (savedVersion !== DATA_VERSION) {
      this.rooms = JSON.parse(JSON.stringify(DEFAULT_ROOMS));
      this.resorts = JSON.parse(JSON.stringify(DEFAULT_RESORTS));
      this.bookings = JSON.parse(JSON.stringify(DEFAULT_BOOKINGS));
      this.currentUser = JSON.parse(JSON.stringify(DEFAULT_USER));
      this.staticPages = JSON.parse(JSON.stringify(DEFAULT_STATIC_PAGES));
      this.reviews = JSON.parse(JSON.stringify(DEFAULT_REVIEWS));
      this.isAdminLoggedIn = false;
      this.saveToStorage();
      localStorage.setItem('luxe_version', DATA_VERSION);
      return;
    }

    const savedRooms = localStorage.getItem('luxe_rooms');
    this.rooms = savedRooms ? JSON.parse(savedRooms) : JSON.parse(JSON.stringify(DEFAULT_ROOMS));

    const savedResorts = localStorage.getItem('luxe_resorts');
    this.resorts = savedResorts ? JSON.parse(savedResorts) : JSON.parse(JSON.stringify(DEFAULT_RESORTS));

    const savedBookings = localStorage.getItem('luxe_bookings');
    this.bookings = savedBookings ? JSON.parse(savedBookings) : JSON.parse(JSON.stringify(DEFAULT_BOOKINGS));

    const savedUser = localStorage.getItem('luxe_user');
    this.currentUser = savedUser ? JSON.parse(savedUser) : JSON.parse(JSON.stringify(DEFAULT_USER));

    const savedStatic = localStorage.getItem('luxe_static');
    this.staticPages = savedStatic ? JSON.parse(savedStatic) : JSON.parse(JSON.stringify(DEFAULT_STATIC_PAGES));

    const savedReviews = localStorage.getItem('luxe_reviews');
    this.reviews = savedReviews ? JSON.parse(savedReviews) : JSON.parse(JSON.stringify(DEFAULT_REVIEWS));

    const adminAuth = localStorage.getItem('luxe_admin_auth');
    this.isAdminLoggedIn = adminAuth === 'true';
  },

  saveToStorage() {
    localStorage.setItem('luxe_rooms', JSON.stringify(this.rooms));
    localStorage.setItem('luxe_resorts', JSON.stringify(this.resorts));
    localStorage.setItem('luxe_bookings', JSON.stringify(this.bookings));
    localStorage.setItem('luxe_user', JSON.stringify(this.currentUser));
    localStorage.setItem('luxe_static', JSON.stringify(this.staticPages));
    localStorage.setItem('luxe_reviews', JSON.stringify(this.reviews));
    localStorage.setItem('luxe_admin_auth', this.isAdminLoggedIn ? 'true' : 'false');
    localStorage.setItem('luxe_version', DATA_VERSION);
  },

  resetDefaults() {
    localStorage.removeItem('luxe_rooms');
    localStorage.removeItem('luxe_resorts');
    localStorage.removeItem('luxe_bookings');
    localStorage.removeItem('luxe_user');
    localStorage.removeItem('luxe_static');
    localStorage.removeItem('luxe_reviews');
    localStorage.removeItem('luxe_version');
    this.loadFromStorage();
    this.renderAll();
    showToast('All Indian resorts, rooms, bookings and prices reset to default.', 'info');
  },

  /* -------------------------------------------------------------
   * Event Bindings
   * ------------------------------------------------------------- */
  bindEvents() {
    // Navigation items
    document.querySelectorAll('[data-nav-target]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const target = el.getAttribute('data-nav-target');
        this.navigateTo(target);
      });
    });

    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Modal background close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeModal(overlay.id);
        }
      });
    });

    // Close buttons inside modals
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) closeModal(modal.id);
      });
    });

    // Check Availability Search Bar
    const searchForm = document.getElementById('search-availability-form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAvailabilitySearch();
      });
    }

    // Role switcher
    const roleToggleBtn = document.getElementById('toggle-role-btn');
    if (roleToggleBtn) {
      roleToggleBtn.addEventListener('click', () => {
        this.toggleRole();
      });
    }

    // Dashboard tabs
    document.querySelectorAll('[data-dash-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-dash-tab');
        this.switchDashboardTab(tab);
      });
    });

    // Admin tabs
    document.querySelectorAll('[data-admin-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-admin-tab');
        this.switchAdminTab(tab);
      });
    });

    // Booking recalculation on date/room/meal change
    const bIn = document.getElementById('booking-checkin');
    const bOut = document.getElementById('booking-checkout');
    const bRoom = document.getElementById('booking-room-select');
    const bMeal = document.getElementById('booking-meal-plan');
    if (bIn) bIn.addEventListener('change', () => this.recalculateBookingSummary());
    if (bOut) bOut.addEventListener('change', () => this.recalculateBookingSummary());
    if (bRoom) bRoom.addEventListener('change', () => {
      const selectedId = bRoom.value;
      const room = this.rooms.find(r => r.id === selectedId);
      if (room) {
        document.getElementById('booking-modal-room-name').textContent = room.name;
        document.getElementById('booking-modal-room-price').textContent = `${formatINR(room.price)} / night`;
        document.getElementById('booking-modal-room-thumb').src = room.image;
        document.getElementById('booking-guests').max = room.capacity;
      }
      this.recalculateBookingSummary();
    });
    if (bMeal) bMeal.addEventListener('change', () => this.recalculateBookingSummary());
  },

  /* -------------------------------------------------------------
   * Role & Navigation
   * ------------------------------------------------------------- */
  toggleRole() {
    if (this.currentRole === 'user') {
      if (!this.isAdminLoggedIn) {
        openModal('admin-login-modal');
      } else {
        this.currentRole = 'admin';
        this.renderRoleUI();
        this.navigateTo('admin');
        showToast('Switched to Administrator Control Portal', 'info');
      }
    } else {
      this.currentRole = 'user';
      this.renderRoleUI();
      this.navigateTo('rooms');
      showToast('Switched to Guest Browsing Mode', 'info');
    }
  },

  loginAdmin(username, password) {
    if (username === 'admin' && password === 'admin123') {
      this.isAdminLoggedIn = true;
      this.currentRole = 'admin';
      this.saveToStorage();
      closeModal('admin-login-modal');
      this.renderRoleUI();
      this.navigateTo('admin');
      showToast('Welcome, Hotel Administrator. System controls activated.', 'success');
      return true;
    } else {
      showToast('Invalid administrator credentials. (Hint: admin / admin123)', 'error');
      return false;
    }
  },

  logoutAdmin() {
    this.isAdminLoggedIn = false;
    this.currentRole = 'user';
    this.saveToStorage();
    this.renderRoleUI();
    this.navigateTo('rooms');
    showToast('Administrator logged out successfully.', 'info');
  },

  renderRoleUI() {
    const roleBadge = document.getElementById('current-role-badge');
    const toggleBtn = document.getElementById('toggle-role-btn');
    const adminNavItem = document.getElementById('nav-item-admin');

    if (this.currentRole === 'admin') {
      if (roleBadge) {
        roleBadge.className = 'role-badge admin-role';
        roleBadge.innerHTML = '🛡️ Administrator Mode';
      }
      if (toggleBtn) toggleBtn.innerHTML = '👤 Switch to Guest Mode';
      if (adminNavItem) adminNavItem.style.display = 'inline-block';
    } else {
      if (roleBadge) {
        roleBadge.className = 'role-badge user-role';
        const firstName = this.currentUser ? this.currentUser.name.split(' ')[0] : 'Guest';
        roleBadge.innerHTML = `👑 Guest (${firstName})`;
      }
      if (toggleBtn) toggleBtn.innerHTML = '🛡️ Admin Portal';
      if (adminNavItem) adminNavItem.style.display = this.isAdminLoggedIn ? 'inline-block' : 'none';
    }
  },

  navigateTo(viewId) {
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.style.display = 'none';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-nav-target') === viewId) {
        link.classList.add('active');
      }
    });

    if (viewId === 'resorts') {
      // Show main view and scroll smoothly to resorts section
      document.querySelectorAll('.view-section').forEach(sec => sec.style.display = 'none');
      const viewRooms = document.getElementById('view-rooms');
      if (viewRooms) viewRooms.style.display = 'block';
      const resortsSec = document.getElementById('resorts-section');
      if (resortsSec) {
        window.scrollTo({ top: resortsSec.offsetTop - 90, behavior: 'smooth' });
      }
      return;
    }

    const targetSection = document.getElementById(`view-${viewId}`);
    if (targetSection) {
      targetSection.style.display = 'block';
      window.scrollTo({ top: targetSection.offsetTop - 90, behavior: 'smooth' });
    }

    if (viewId === 'dashboard') {
      this.renderUserDashboard();
    } else if (viewId === 'admin') {
      if (!this.isAdminLoggedIn) {
        openModal('admin-login-modal');
        return;
      }
      this.renderAdminPanel();
    } else if (['about', 'contact', 'faq', 'travel', 'privacy', 'room-intro'].includes(viewId)) {
      this.renderStaticPage(viewId);
    }
  },

  renderAll() {
    this.renderRoleUI();
    this.renderDestinationSelects();
    this.renderResorts();
    this.renderCategoryChips();
    this.renderRooms();
    this.renderUserDashboard();
    this.renderAdminPanel();
    this.initDefaultDates();
  },

  initDefaultDates() {
    const checkInInput = document.getElementById('search-checkin');
    const checkOutInput = document.getElementById('search-checkout');
    if (checkInInput && !checkInInput.value) {
      checkInInput.value = getRelativeDateStr(2);
    }
    if (checkOutInput && !checkOutInput.value) {
      checkOutInput.value = getRelativeDateStr(5);
    }
  },

  /* -------------------------------------------------------------
   * Populate Destination & Resort Select Dropdowns
   * ------------------------------------------------------------- */
  renderDestinationSelects() {
    const searchDest = document.getElementById('search-destination');
    if (searchDest) {
      searchDest.innerHTML = `
        <option value="all">🌟 All Indian Destinations & Resorts</option>
        ${this.resorts.map(r => `
          <option value="${r.id}">${r.name} (${r.destination})</option>
        `).join('')}
      `;
    }

    const bookingResortSelect = document.getElementById('booking-resort-select');
    if (bookingResortSelect) {
      bookingResortSelect.innerHTML = this.resorts.map(r => `
        <option value="${r.id}">${r.name} — ${r.destination}</option>
      `).join('');
    }
  },

  /* -------------------------------------------------------------
   * Render Indian Destinations & Resorts Showcase
   * ------------------------------------------------------------- */
  renderResorts() {
    const containers = [
      document.getElementById('resorts-grid-container'),
      document.getElementById('resorts-grid-container-view')
    ].filter(Boolean);

    if (containers.length === 0) return;

    const html = this.resorts.map(resort => `
      <article class="resort-card" id="resort-${resort.id}">
        <div class="resort-image-wrap">
          <img src="${resort.image}" alt="${resort.name}" class="resort-img" loading="lazy">
          <span class="resort-badge">${resort.tag}</span>
          <span class="resort-location-tag">📍 ${resort.destination}</span>
        </div>
        <div class="resort-card-body">
          <h3 class="resort-name">${resort.name}</h3>
          <p class="resort-desc">${resort.description}</p>
          <div class="resort-card-footer">
            <div>
              <span style="font-size:0.75rem; color:var(--text-muted); display:block;">Starting from</span>
              <strong style="color:var(--gold-400); font-size:1.15rem;">${formatINR(resort.priceFrom)}</strong> <span style="font-size:0.75rem; color:var(--text-muted);">/ night</span>
            </div>
            <button class="btn btn-primary btn-sm" onclick="App.selectResortAndBook('${resort.id}')">
              Select & Book
            </button>
          </div>
        </div>
      </article>
    `).join('');

    containers.forEach(c => c.innerHTML = html);
  },

  selectResortAndBook(resortId) {
    const searchDest = document.getElementById('search-destination');
    if (searchDest) searchDest.value = resortId;
    
    // Open booking modal with first room and preselected resort
    const firstRoom = this.rooms[0];
    this.openBookingModal(firstRoom ? firstRoom.id : 'royal-maharaja', '', '', 2, resortId);
  },

  /* -------------------------------------------------------------
   * Category Chips & Room Grid Filtering
   * ------------------------------------------------------------- */
  renderCategoryChips() {
    const container = document.getElementById('category-chips-container');
    if (!container) return;

    const categories = [
      { id: 'all', label: '✨ All Sanctuaries' },
      { id: 'Heritage', label: '👑 Royal Heritage' },
      { id: 'Family', label: '👨‍👩‍👧‍👦 Multi-Gen Family' },
      { id: 'Wellness', label: '🌿 Ayurvedic & Yoga' },
      { id: 'Romance', label: '💖 Plunge-Pool Romance' },
      { id: 'Business', label: '💼 Corporate Executive' },
      { id: 'Wedding', label: '💍 Destination Wedding' },
      { id: 'Presidential', label: '🏛️ Palace Penthouse' }
    ];

    container.innerHTML = categories.map(cat => `
      <button class="cat-chip-btn ${this.activeCategoryFilter === cat.id ? 'active' : ''}" 
        onclick="App.setCategoryFilter('${cat.id}')">
        ${cat.label}
      </button>
    `).join('');
  },

  setCategoryFilter(categoryId) {
    this.activeCategoryFilter = categoryId;
    this.renderCategoryChips();
    this.renderRooms();
  },

  /* -------------------------------------------------------------
   * Render All 8 Specialized Room Types in Indian Rupee (₹ INR)
   * ------------------------------------------------------------- */
  renderRooms() {
    const container = document.getElementById('rooms-grid-container');
    if (!container) return;

    const filteredRooms = this.activeCategoryFilter === 'all'
      ? this.rooms
      : this.rooms.filter(r => r.category === this.activeCategoryFilter);

    if (filteredRooms.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding:3rem; color:var(--text-secondary);">
          <p>No rooms found in this category.</p>
          <button class="btn btn-outline btn-sm" onclick="App.setCategoryFilter('all')">Show All Rooms</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredRooms.map(room => {
      return `
        <article class="room-card" id="room-${room.id}">
          <div class="room-image-wrap">
            <img src="${room.image}" alt="${room.name}" class="room-img" loading="lazy">
            <span class="room-badge">${room.tag}</span>
            <span class="room-quantity-badge" title="Total inventory managed by admin">
              ${room.quantity} Units Total
            </span>
          </div>

          <div class="room-card-body">
            <div class="room-header">
              <h3 class="room-title">${room.name}</h3>
              <div class="room-rating" title="${room.reviewsCount} verified reviews">
                ⭐ ${room.rating.toFixed(2)} <span style="font-size:0.75rem; color:var(--text-muted);">(${room.reviewsCount})</span>
              </div>
            </div>

            <div class="room-meta-chips">
              <span class="meta-chip">👥 Up to ${room.capacity} Guests</span>
              <span class="meta-chip">📐 ${room.size}</span>
              <span class="meta-chip">🛏️ ${room.bedType}</span>
              <span class="meta-chip">🌅 ${room.view}</span>
            </div>

            <div style="font-size:0.78rem; color:var(--gold-400); font-weight:600; margin-bottom:0.6rem;">
              🎯 Ideal For: ${room.suitableFor || 'Discerning Travelers'}
            </div>

            <p class="room-description">${room.description}</p>

            <ul class="room-amenities-list">
              ${room.amenities.slice(0, 4).map(am => `
                <li class="room-amenity-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>${am}</span>
                </li>
              `).join('')}
            </ul>

            <div class="room-card-footer">
              <div class="price-tag">
                <span class="price-original">${formatINR(room.originalPrice)}</span>
                <div class="price-amount">${formatINR(room.price)} <span>/ night</span></div>
              </div>

              <div style="display:flex; gap:0.5rem;">
                <button class="btn btn-outline btn-sm" onclick="App.openRoomDetailsModal('${room.id}')">
                  Details
                </button>
                <button class="btn btn-primary btn-sm" onclick="App.openBookingModal('${room.id}')">
                  Book Room
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  },

  /* -------------------------------------------------------------
   * Check Room Availability & Search Flow
   * ------------------------------------------------------------- */
  checkRoomAvailability(roomTypeId, checkInDate, checkOutDate) {
    const room = this.rooms.find(r => r.id === roomTypeId);
    if (!room) return { available: false, remaining: 0, total: 0 };

    const inTime = new Date(checkInDate).getTime();
    const outTime = new Date(checkOutDate).getTime();

    const overlappingBookings = this.bookings.filter(b => {
      if (b.roomTypeId !== roomTypeId) return false;
      if (b.status === 'Cancelled') return false;

      const bIn = new Date(b.checkIn).getTime();
      const bOut = new Date(b.checkOut).getTime();

      return inTime < bOut && outTime > bIn;
    });

    const bookedCount = overlappingBookings.length;
    const remaining = Math.max(0, room.quantity - bookedCount);

    return {
      available: remaining > 0,
      remaining: remaining,
      total: room.quantity,
      bookedCount: bookedCount
    };
  },

  handleAvailabilitySearch() {
    const checkIn = document.getElementById('search-checkin').value;
    const checkOut = document.getElementById('search-checkout').value;
    const guests = parseInt(document.getElementById('search-guests').value) || 2;
    const destinationId = document.getElementById('search-destination').value;
    const category = document.getElementById('search-category').value;

    if (!checkIn || !checkOut) {
      showToast('Please specify both arrival and departure dates.', 'error');
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      showToast('Departure date must be after arrival date.', 'error');
      return;
    }

    this.renderAvailabilityResults(checkIn, checkOut, guests, destinationId, category);
  },

  renderAvailabilityResults(checkIn, checkOut, guests, destinationId = 'all', category = 'all') {
    const resultContainer = document.getElementById('availability-results-container');
    if (!resultContainer) return;

    resultContainer.style.display = 'block';
    resultContainer.scrollIntoView({ behavior: 'smooth' });

    const nights = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
    
    let destName = "All LuxeHorizon Indian Resorts";
    if (destinationId !== 'all') {
      const res = this.resorts.find(r => r.id === destinationId);
      if (res) destName = `${res.name} (${res.destination})`;
    }

    let targetRooms = this.rooms;
    if (category !== 'all') {
      targetRooms = targetRooms.filter(r => r.category === category);
    }

    let html = `
      <div class="availability-checker-box">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; border-bottom:1px solid var(--border-subtle); padding-bottom:1rem;">
          <div>
            <div style="font-size:0.8rem; color:var(--gold-400); font-weight:700; text-transform:uppercase;">Selected Destination</div>
            <h3 style="font-family:var(--font-serif); font-size:1.45rem; color:var(--text-main);">${destName}</h3>
            <p style="color:var(--text-secondary); font-size:0.9rem;">
              Stay: <strong>${checkIn}</strong> to <strong>${checkOut}</strong> (${nights} Nights) • Guests: <strong>${guests}</strong>
            </p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="document.getElementById('availability-results-container').style.display='none'">
            ✕ Dismiss Results
          </button>
        </div>

        <div class="availability-status-grid">
    `;

    targetRooms.forEach(room => {
      const avail = this.checkRoomAvailability(room.id, checkIn, checkOut);
      const isCapacityEnough = room.capacity >= guests;
      const percentLeft = Math.round((avail.remaining / avail.total) * 100);

      html += `
        <div class="avail-card ${avail.available && isCapacityEnough ? 'available' : 'sold-out'}">
          <div class="avail-card-header">
            <span class="avail-title">${room.name}</span>
            <span class="avail-badge ${avail.available && isCapacityEnough ? 'in-stock' : 'out-stock'}">
              ${!isCapacityEnough ? 'Capacity Exceeded' : avail.available ? `${avail.remaining} Available` : 'Sold Out'}
            </span>
          </div>

          <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:0.25rem;">
            Allocation: <strong>${avail.total} rooms</strong> | Reserved: <strong>${avail.bookedCount}</strong>
          </div>

          <div class="avail-progress-bar">
            <div class="avail-progress-fill" style="width: ${percentLeft}%; background: ${avail.remaining > 2 ? 'var(--gold-gradient)' : '#f43f5e'};"></div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem;">
            <div>
              <span style="font-size:1.15rem; font-weight:700; color:var(--gold-400);">${formatINR(room.price * nights)}</span>
              <span style="font-size:0.75rem; color:var(--text-muted);"> (${nights} nights total)</span>
            </div>

            <button class="btn btn-sm ${avail.available && isCapacityEnough ? 'btn-primary' : 'btn-outline'}" 
              ${!avail.available || !isCapacityEnough ? 'disabled' : ''} 
              onclick="App.openBookingModal('${room.id}', '${checkIn}', '${checkOut}', ${guests}, '${destinationId}')">
              ${avail.available && isCapacityEnough ? 'Reserve Now' : 'Unavailable'}
            </button>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    resultContainer.innerHTML = html;
  },

  /* -------------------------------------------------------------
   * User Dashboard & Profile Details
   * ------------------------------------------------------------- */
  renderUserDashboard() {
    this.renderUserProfile();
    this.renderUserBookings();
  },

  renderUserProfile() {
    const user = this.currentUser;
    if (!user) return;

    const nameEl = document.getElementById('user-profile-display-name');
    const tierEl = document.getElementById('user-profile-tier');
    const emailEl = document.getElementById('user-profile-email');
    const phoneEl = document.getElementById('user-profile-phone');
    const addressEl = document.getElementById('user-profile-address');
    const pointsEl = document.getElementById('user-profile-points');
    const avatarEl = document.getElementById('user-profile-avatar');

    if (nameEl) nameEl.textContent = user.name;
    if (tierEl) tierEl.textContent = user.memberTier;
    if (emailEl) emailEl.textContent = user.email;
    if (phoneEl) phoneEl.textContent = user.phone;
    if (addressEl) addressEl.textContent = user.address;
    if (pointsEl) pointsEl.textContent = user.loyaltyPoints.toLocaleString('en-IN') + ' pts';
    if (avatarEl) avatarEl.src = user.avatar;

    const formName = document.getElementById('edit-profile-name');
    const formEmail = document.getElementById('edit-profile-email');
    const formPhone = document.getElementById('edit-profile-phone');
    const formAddress = document.getElementById('edit-profile-address');
    const formBed = document.getElementById('edit-profile-bed');
    const formDiet = document.getElementById('edit-profile-dietary');

    if (formName) formName.value = user.name;
    if (formEmail) formEmail.value = user.email;
    if (formPhone) formPhone.value = user.phone;
    if (formAddress) formAddress.value = user.address;
    if (formBed) formBed.value = user.preferredBed;
    if (formDiet) formDiet.value = user.dietaryPreferences;
  },

  openEditProfileModal() {
    this.renderUserProfile();
    openModal('edit-profile-modal');
  },

  openRegisterModal() {
    openModal('register-modal');
  },

  registerUser(name, email, phone, password, address) {
    if (!name || !email) {
      showToast('Please provide at least your full name and email address.', 'error');
      return false;
    }
    this.currentUser = {
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : '+91 98201 44521',
      address: address ? address.trim() : 'Bandra West, Mumbai, Maharashtra 400050',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      memberTier: 'Kohinoor Platinum Elite',
      loyaltyPoints: 2500,
      preferredBed: 'Royal Emperor King',
      dietaryPreferences: 'Pure Vegetarian / Jain Gourmet options',
      passportNumber: 'IN' + Math.floor(10000000 + Math.random() * 90000000),
      emergencyContact: 'Family Office (+91 98201 00000)'
    };
    this.saveToStorage();
    this.renderUserProfile();
    this.renderRoleUI();
    closeModal('register-modal');
    showToast(`Welcome to LuxeHorizon, ${this.currentUser.name}! Account registered.`, 'success');
    this.navigateTo('dashboard');
    return true;
  },

  updateUserProfile(updatedData) {
    this.currentUser = { ...this.currentUser, ...updatedData };
    this.saveToStorage();
    this.renderUserProfile();
    this.renderRoleUI();
    closeModal('edit-profile-modal');
    showToast('Your guest profile has been successfully updated.', 'success');
  },

  switchDashboardTab(tabName) {
    document.querySelectorAll('.dash-tab-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-dash-tab') === tabName) btn.classList.add('active');
    });
    document.querySelectorAll('.dash-tab-content').forEach(panel => {
      panel.style.display = 'none';
    });
    const target = document.getElementById(`dash-tab-${tabName}`);
    if (target) target.style.display = 'block';
  },

  switchAdminTab(tabName) {
    document.querySelectorAll('.admin-nav-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-admin-tab') === tabName) btn.classList.add('active');
    });
    document.querySelectorAll('.admin-tab-content').forEach(panel => {
      panel.style.display = 'none';
    });
    const target = document.getElementById(`admin-tab-${tabName}`);
    if (target) target.style.display = 'block';
  },

  /* -------------------------------------------------------------
   * 3-Day Rule for Modification and Cancellation
   * ------------------------------------------------------------- */
  getDaysUntilArrival(arrivalDateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const arrival = new Date(arrivalDateStr);
    arrival.setHours(0, 0, 0, 0);

    const diffTime = arrival.getTime() - today.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  },

  canUserModifyOrCancel(arrivalDateStr) {
    const daysLeft = this.getDaysUntilArrival(arrivalDateStr);
    return daysLeft >= 3;
  },

  renderUserBookings() {
    const container = document.getElementById('user-bookings-container');
    if (!container) return;

    if (this.bookings.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:3rem; color:var(--text-secondary);">
          <p style="font-size:1.1rem; margin-bottom:1rem;">You have no active or previous bookings.</p>
          <button class="btn btn-primary" onclick="App.navigateTo('rooms')">Browse Indian Sanctuaries</button>
        </div>
      `;
      return;
    }

    container.innerHTML = this.bookings.map(booking => {
      const room = this.rooms.find(r => r.id === booking.roomTypeId) || {
        image: 'assets/deluxe.jpg',
        name: booking.roomName
      };

      const daysLeft = this.getDaysUntilArrival(booking.checkIn);
      const isEligible = this.canUserModifyOrCancel(booking.checkIn);
      const isPast = daysLeft < 0;
      const isCancelled = booking.status === 'Cancelled';

      let statusBadgeClass = 'status-confirmed';
      if (isCancelled) statusBadgeClass = 'status-cancelled';
      else if (booking.status === 'Completed' || isPast) statusBadgeClass = 'status-completed';

      return `
        <div class="booking-history-item" id="booking-item-${booking.id}">
          <img src="${room.image}" alt="${booking.roomName}" class="booking-thumb">

          <div class="booking-main-details">
            <div class="booking-top-line">
              <span class="booking-id-tag">${booking.id}</span>
              <span class="booking-status-badge ${statusBadgeClass}">${booking.status}</span>
              <span style="font-size:0.8rem; color:var(--text-muted);">Booked on ${booking.bookedOn}</span>
              ${booking.resortName ? `<span style="font-size:0.8rem; color:var(--gold-400); font-weight:600;">📍 ${booking.resortName}</span>` : ''}
            </div>

            <h3 class="booking-room-name">${booking.roomName}</h3>

            <div class="booking-dates-line">
              <span>📅 Arrival: <strong>${booking.checkIn}</strong></span>
              <span>🛫 Departure: <strong>${booking.checkOut}</strong></span>
              <span>🌙 ${booking.nights} Nights (${booking.guests} Guests)</span>
              <span>💳 Total Paid: <strong style="color:var(--gold-400); font-weight:700;">${formatINR(booking.grandTotal)}</strong></span>
            </div>

            ${!isCancelled && !isPast ? `
              <div class="three-day-policy-note ${isEligible ? 'policy-allowed' : 'policy-restricted'}">
                ${isEligible ? `
                  <span>✅ <strong>Modifiable & Cancellable:</strong> Arrival is in ${daysLeft} days (eligible up to 3 days before arrival).</span>
                ` : `
                  <span>⚠️ <strong>Policy Notice:</strong> Arrival is in ${daysLeft} day(s). Locked within 3 days (72h) of check-in.</span>
                `}
              </div>
            ` : ''}

            ${booking.specialRequests ? `
              <p style="font-size:0.82rem; color:var(--text-secondary); margin-top:0.35rem;">
                <em>Preferences: "${booking.specialRequests}"</em>
              </p>
            ` : ''}
          </div>

          <div class="booking-action-buttons">
            <button class="btn btn-outline btn-sm" onclick="App.viewBookingVoucher('${booking.id}')" style="width:100%;">
              🧾 View GST Invoice
            </button>

            ${!isCancelled && !isPast ? `
              <button class="btn btn-outline btn-sm" 
                ${!isEligible ? 'disabled title="Cannot modify within 3 days of arrival"' : ''}
                onclick="App.openModifyBookingModal('${booking.id}')" style="width:100%;">
                ✏️ Change Booking
              </button>

              <button class="btn btn-danger btn-sm" 
                ${!isEligible ? 'disabled title="Cannot cancel within 3 days of arrival"' : ''}
                onclick="App.confirmUserCancellation('${booking.id}')" style="width:100%;">
                ✕ Cancel Booking
              </button>
            ` : ''}

            ${isPast || booking.status === 'Completed' ? `
              <button class="btn btn-gold-outline btn-sm" onclick="App.openReviewModal('${booking.roomTypeId}')" style="width:100%;">
                ⭐ Leave Review
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  },

  /* -------------------------------------------------------------
   * Booking Flow (Select-Based Dropdowns, No Typing Needed!)
   * ------------------------------------------------------------- */
  openBookingModal(roomTypeId, checkIn = '', checkOut = '', guests = 2, resortId = 'all') {
    const room = this.rooms.find(r => r.id === roomTypeId) || this.rooms[0];
    if (!room) return;

    const modal = document.getElementById('booking-modal');
    if (!modal) return;

    // Populate room select dropdown
    const roomSelect = document.getElementById('booking-room-select');
    if (roomSelect) {
      roomSelect.innerHTML = this.rooms.map(r => `
        <option value="${r.id}" ${r.id === room.id ? 'selected' : ''}>
          ${r.name} (${formatINR(r.price)} / night)
        </option>
      `).join('');
    }

    // Set resort select
    const resortSelect = document.getElementById('booking-resort-select');
    if (resortSelect) {
      if (resortId && resortId !== 'all') {
        resortSelect.value = resortId;
      }
    }

    // Prefill preview
    document.getElementById('booking-room-id').value = room.id;
    document.getElementById('booking-modal-room-name').textContent = room.name;
    document.getElementById('booking-modal-room-price').textContent = `${formatINR(room.price)} / night`;
    document.getElementById('booking-modal-room-thumb').src = room.image;

    const checkInInput = document.getElementById('booking-checkin');
    const checkOutInput = document.getElementById('booking-checkout');
    const guestsInput = document.getElementById('booking-guests');
    const nameInput = document.getElementById('booking-guest-name');
    const emailInput = document.getElementById('booking-guest-email');
    const phoneInput = document.getElementById('booking-guest-phone');

    checkInInput.value = checkIn || getRelativeDateStr(2);
    checkOutInput.value = checkOut || getRelativeDateStr(5);
    guestsInput.value = guests;
    guestsInput.max = room.capacity;

    if (this.currentUser) {
      nameInput.value = this.currentUser.name;
      emailInput.value = this.currentUser.email;
      phoneInput.value = this.currentUser.phone;
    }

    this.recalculateBookingSummary();
    openModal('booking-modal');
  },

  recalculateBookingSummary() {
    const roomSelect = document.getElementById('booking-room-select');
    const roomId = roomSelect ? roomSelect.value : document.getElementById('booking-room-id').value;
    const room = this.rooms.find(r => r.id === roomId);
    if (!room) return;

    const checkIn = document.getElementById('booking-checkin').value;
    const checkOut = document.getElementById('booking-checkout').value;

    if (!checkIn || !checkOut || new Date(checkOut) <= new Date(checkIn)) {
      document.getElementById('summary-nights').textContent = '0 Nights';
      document.getElementById('summary-room-total').textContent = '₹0';
      document.getElementById('summary-taxes').textContent = '₹0';
      document.getElementById('summary-grand-total').textContent = '₹0';
      return;
    }

    const nights = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
    
    // Meal plan adjustment
    const mealPlanSelect = document.getElementById('booking-meal-plan');
    let mealPlanCostPerNight = 0;
    if (mealPlanSelect && mealPlanSelect.value === 'map') {
      mealPlanCostPerNight = 1800; // MAP: Breakfast + Dinner Thali
    } else if (mealPlanSelect && mealPlanSelect.value === 'ap') {
      mealPlanCostPerNight = 3200; // AP: All-Inclusive Royal Dining
    }

    const roomSubtotal = (room.price + mealPlanCostPerNight) * nights;
    const taxes = roomSubtotal * 0.12; // 12% Hospitality GST in India
    const grandTotal = roomSubtotal + taxes;

    document.getElementById('summary-nights').textContent = `${nights} Night(s)`;
    document.getElementById('summary-room-total').textContent = formatINR(roomSubtotal);
    document.getElementById('summary-taxes').textContent = `${formatINR(taxes)} (12% GST)`;
    document.getElementById('summary-grand-total').textContent = formatINR(grandTotal);
  },

  processBookingSubmission() {
    const roomSelect = document.getElementById('booking-room-select');
    const roomId = roomSelect ? roomSelect.value : document.getElementById('booking-room-id').value;
    const room = this.rooms.find(r => r.id === roomId);

    const resortSelect = document.getElementById('booking-resort-select');
    const resortId = resortSelect ? resortSelect.value : 'udaipur-lake-palace';
    const resort = this.resorts.find(r => r.id === resortId) || this.resorts[0];

    const checkIn = document.getElementById('booking-checkin').value;
    const checkOut = document.getElementById('booking-checkout').value;
    const guests = parseInt(document.getElementById('booking-guests').value) || 2;
    const guestName = document.getElementById('booking-guest-name').value.trim();
    const guestEmail = document.getElementById('booking-guest-email').value.trim();
    const guestPhone = document.getElementById('booking-guest-phone').value.trim();

    // Select based requests
    const prefSelect = document.getElementById('booking-guest-preference');
    const customNotes = document.getElementById('booking-special-requests').value.trim();
    const combinedRequests = [prefSelect ? prefSelect.value : '', customNotes].filter(Boolean).join(' • ');

    const mealPlanSelect = document.getElementById('booking-meal-plan');
    const paymentMethodSelect = document.getElementById('booking-payment-method');

    if (!guestName || !guestEmail || !guestPhone) {
      showToast('Please provide your full guest contact details.', 'error');
      return;
    }

    if (!checkIn || !checkOut || new Date(checkOut) <= new Date(checkIn)) {
      showToast('Please select valid check-in and check-out dates.', 'error');
      return;
    }

    const avail = this.checkRoomAvailability(room.id, checkIn, checkOut);
    if (!avail.available) {
      showToast(`Sorry, ${room.name} is fully booked for the selected dates. Please choose another suite or dates.`, 'error');
      return;
    }

    const nights = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
    
    let mealPlanCostPerNight = 0;
    let mealPlanLabel = "Room with Royal Buffet Breakfast (CP)";
    if (mealPlanSelect && mealPlanSelect.value === 'map') {
      mealPlanCostPerNight = 1800;
      mealPlanLabel = "Modified American Plan (Breakfast + Dinner Thali - MAP)";
    } else if (mealPlanSelect && mealPlanSelect.value === 'ap') {
      mealPlanCostPerNight = 3200;
      mealPlanLabel = "All Inclusive Royal Gourmet Dining (AP)";
    }

    const roomSubtotal = (room.price + mealPlanCostPerNight) * nights;
    const taxes = roomSubtotal * 0.12;
    const grandTotal = roomSubtotal + taxes;

    const paymentLabel = paymentMethodSelect ? paymentMethodSelect.options[paymentMethodSelect.selectedIndex].text : 'Paid (UPI / Card)';

    const newBooking = {
      id: 'BK-' + Math.floor(10000 + Math.random() * 90000),
      guestName,
      guestEmail,
      guestPhone,
      resortId: resort.id,
      resortName: resort.name + ' (' + resort.destination + ')',
      roomTypeId: room.id,
      roomName: room.name,
      checkIn,
      checkOut,
      guests,
      nights,
      roomPrice: room.price + mealPlanCostPerNight,
      totalPrice: roomSubtotal,
      taxes,
      grandTotal,
      mealPlan: mealPlanLabel,
      paymentStatus: paymentLabel,
      status: 'Confirmed',
      specialRequests: combinedRequests || 'Standard Luxury Stay',
      bookedOn: new Date().toISOString().split('T')[0],
      cancellationDeadline: getRelativeDateStr(this.getDaysUntilArrival(checkIn) - 3)
    };

    this.bookings.unshift(newBooking);
    this.saveToStorage();

    closeModal('booking-modal');
    this.renderRooms();
    this.renderUserBookings();

    this.showBookingConfirmation(newBooking);
    showToast(`Reservation ${newBooking.id} successfully confirmed! Official GST voucher generated.`, 'success');
  },

  showBookingConfirmation(booking) {
    const modal = document.getElementById('confirmation-modal');
    if (!modal) return;

    document.getElementById('conf-booking-id').textContent = booking.id;
    document.getElementById('conf-guest-name').textContent = booking.guestName;
    document.getElementById('conf-guest-email').textContent = booking.guestEmail;
    document.getElementById('conf-room-name').textContent = booking.roomName;
    document.getElementById('conf-dates').textContent = `${booking.checkIn} to ${booking.checkOut} (${booking.nights} Nights)`;
    document.getElementById('conf-total-paid').textContent = formatINR(booking.grandTotal);

    openModal('confirmation-modal');
  },

  /* -------------------------------------------------------------
   * Modify Booking (>= 3 days before arrival)
   * ------------------------------------------------------------- */
  openModifyBookingModal(bookingId) {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) return;

    if (!this.canUserModifyOrCancel(booking.checkIn)) {
      showToast('Modifications are strictly prohibited within 3 days of arrival.', 'error');
      return;
    }

    document.getElementById('modify-booking-id').value = booking.id;
    document.getElementById('modify-display-id').textContent = booking.id;
    document.getElementById('modify-checkin').value = booking.checkIn;
    document.getElementById('modify-checkout').value = booking.checkOut;
    document.getElementById('modify-guests').value = booking.guests;
    document.getElementById('modify-requests').value = booking.specialRequests || '';

    const roomSelect = document.getElementById('modify-room-select');
    roomSelect.innerHTML = this.rooms.map(r => `
      <option value="${r.id}" ${r.id === booking.roomTypeId ? 'selected' : ''}>
        ${r.name} (${formatINR(r.price)} / night)
      </option>
    `).join('');

    openModal('modify-booking-modal');
  },

  saveModifiedBooking() {
    const bookingId = document.getElementById('modify-booking-id').value;
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const newCheckIn = document.getElementById('modify-checkin').value;
    const newCheckOut = document.getElementById('modify-checkout').value;
    const newGuests = parseInt(document.getElementById('modify-guests').value) || booking.guests;
    const newRoomId = document.getElementById('modify-room-select').value;
    const newRequests = document.getElementById('modify-requests').value.trim();

    if (!newCheckIn || !newCheckOut || new Date(newCheckOut) <= new Date(newCheckIn)) {
      showToast('Please provide valid arrival and departure dates.', 'error');
      return;
    }

    if (this.getDaysUntilArrival(newCheckIn) < 3) {
      showToast('New arrival date must be at least 3 days in the future according to hotel policy.', 'error');
      return;
    }

    const room = this.rooms.find(r => r.id === newRoomId);
    const nights = Math.max(1, Math.round((new Date(newCheckOut) - new Date(newCheckIn)) / (1000 * 60 * 60 * 24)));
    const roomSubtotal = room.price * nights;
    const taxes = roomSubtotal * 0.12;
    const grandTotal = roomSubtotal + taxes;

    booking.checkIn = newCheckIn;
    booking.checkOut = newCheckOut;
    booking.guests = newGuests;
    booking.roomTypeId = room.id;
    booking.roomName = room.name;
    booking.nights = nights;
    booking.roomPrice = room.price;
    booking.totalPrice = roomSubtotal;
    booking.taxes = taxes;
    booking.grandTotal = grandTotal;
    booking.specialRequests = newRequests;

    this.saveToStorage();
    closeModal('modify-booking-modal');
    this.renderUserBookings();
    this.renderRooms();
    showToast(`Booking ${booking.id} updated successfully! New total: ${formatINR(grandTotal)}`, 'success');
  },

  /* -------------------------------------------------------------
   * Cancel Booking (>= 3 days before arrival)
   * ------------------------------------------------------------- */
  confirmUserCancellation(bookingId) {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) return;

    if (!this.canUserModifyOrCancel(booking.checkIn)) {
      showToast('Cannot cancel reservation within 3 days of arrival according to hotel policy.', 'error');
      return;
    }

    if (confirm(`Are you sure you wish to cancel reservation ${booking.id} (${booking.roomName})? You will receive a 100% refund of ${formatINR(booking.grandTotal)} to your original payment method.`)) {
      booking.status = 'Cancelled';
      this.saveToStorage();
      this.renderUserBookings();
      this.renderRooms();
      showToast(`Reservation ${booking.id} cancelled. 100% refund of ${formatINR(booking.grandTotal)} initiated.`, 'info');
    }
  },

  /* -------------------------------------------------------------
   * Administrator Controls
   * ------------------------------------------------------------- */
  renderAdminPanel() {
    this.renderAdminRoomManager();
    this.renderAdminBookingsManager();
    this.renderAdminCMS();
  },

  renderAdminRoomManager() {
    const container = document.getElementById('admin-rooms-table-body');
    if (!container) return;

    container.innerHTML = this.rooms.map(room => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <img src="${room.image}" alt="${room.name}" style="width:52px; height:38px; border-radius:4px; object-fit:cover;">
            <div>
              <strong>${room.name}</strong>
              <div style="font-size:0.75rem; color:var(--text-muted);">${room.category} • Max ${room.capacity} guests • ${room.bedType}</div>
            </div>
          </div>
        </td>
        <td>
          <div style="display:flex; align-items:center; gap:0.3rem;">
            <span style="font-weight:700; color:var(--gold-400);">₹</span>
            <input type="number" id="admin-room-price-${room.id}" class="admin-input-sm" value="${room.price}" min="1000" max="250000" step="500">
          </div>
        </td>
        <td>
          <input type="number" id="admin-room-qty-${room.id}" class="admin-input-sm" value="${room.quantity}" min="1" max="100" step="1">
        </td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="App.saveAdminRoomSettings('${room.id}')">
            Update Room
          </button>
        </td>
      </tr>
    `).join('');
  },

  saveAdminRoomSettings(roomId) {
    const room = this.rooms.find(r => r.id === roomId);
    if (!room) return;

    const priceInput = document.getElementById(`admin-room-price-${room.id}`);
    const qtyInput = document.getElementById(`admin-room-qty-${room.id}`);

    const newPrice = parseFloat(priceInput.value);
    const newQty = parseInt(qtyInput.value);

    if (isNaN(newPrice) || newPrice <= 0 || isNaN(newQty) || newQty <= 0) {
      showToast('Please enter valid positive values for tariff and inventory.', 'error');
      return;
    }

    room.price = newPrice;
    room.quantity = newQty;

    this.saveToStorage();
    this.renderRooms();
    this.renderAdminRoomManager();
    showToast(`Updated ${room.name}: Tariff set to ${formatINR(newPrice)}/night, Inventory set to ${newQty} rooms.`, 'success');
  },

  saveAllAdminRooms() {
    this.rooms.forEach(room => {
      const priceInput = document.getElementById(`admin-room-price-${room.id}`);
      const qtyInput = document.getElementById(`admin-room-qty-${room.id}`);
      if (priceInput && qtyInput) {
        room.price = parseFloat(priceInput.value) || room.price;
        room.quantity = parseInt(qtyInput.value) || room.quantity;
      }
    });

    this.saveToStorage();
    this.renderRooms();
    this.renderAdminRoomManager();
    showToast('All Indian room categories updated with new ₹ tariffs and room inventories!', 'success');
  },

  renderAdminBookingsManager() {
    const container = document.getElementById('admin-bookings-table-body');
    if (!container) return;

    container.innerHTML = this.bookings.map(b => `
      <tr>
        <td><strong class="booking-id-tag">${b.id}</strong></td>
        <td>
          <div><strong>${b.guestName}</strong></div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${b.guestEmail} • ${b.guestPhone}</div>
        </td>
        <td>
          <div>${b.roomName}</div>
          <div style="font-size:0.72rem; color:var(--gold-400);">${b.resortName || 'LuxeHorizon Resort'}</div>
        </td>
        <td>
          <div style="font-size:0.85rem;">${b.checkIn} → ${b.checkOut}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${b.nights} nights (${b.guests} guests)</div>
        </td>
        <td><strong style="color:var(--gold-400);">${formatINR(b.grandTotal)}</strong></td>
        <td>
          <span class="booking-status-badge ${b.status === 'Confirmed' ? 'status-confirmed' : b.status === 'Cancelled' ? 'status-cancelled' : 'status-completed'}">
            ${b.status}
          </span>
        </td>
        <td>
          <div style="display:flex; gap:0.4rem;">
            <button class="btn btn-outline btn-sm" onclick="App.openAdminEditBookingModal('${b.id}')" title="Change booking details">
              Edit
            </button>
            ${b.status !== 'Cancelled' ? `
              <button class="btn btn-danger btn-sm" onclick="App.adminCancelBooking('${b.id}')" title="Administrator override cancellation">
                Cancel
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `).join('');
  },

  openAdminEditBookingModal(bookingId) {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) return;

    document.getElementById('admin-edit-booking-id').value = booking.id;
    document.getElementById('admin-edit-guest-name').value = booking.guestName;
    document.getElementById('admin-edit-guest-email').value = booking.guestEmail;
    document.getElementById('admin-edit-checkin').value = booking.checkIn;
    document.getElementById('admin-edit-checkout').value = booking.checkOut;
    document.getElementById('admin-edit-status').value = booking.status;
    document.getElementById('admin-edit-requests').value = booking.specialRequests || '';

    const roomSelect = document.getElementById('admin-edit-room');
    roomSelect.innerHTML = this.rooms.map(r => `
      <option value="${r.id}" ${r.id === booking.roomTypeId ? 'selected' : ''}>
        ${r.name} (${formatINR(r.price)}/night)
      </option>
    `).join('');

    openModal('admin-edit-booking-modal');
  },

  saveAdminBookingEdits() {
    const bookingId = document.getElementById('admin-edit-booking-id').value;
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const guestName = document.getElementById('admin-edit-guest-name').value.trim();
    const guestEmail = document.getElementById('admin-edit-guest-email').value.trim();
    const checkIn = document.getElementById('admin-edit-checkin').value;
    const checkOut = document.getElementById('admin-edit-checkout').value;
    const status = document.getElementById('admin-edit-status').value;
    const roomId = document.getElementById('admin-edit-room').value;
    const requests = document.getElementById('admin-edit-requests').value.trim();

    const room = this.rooms.find(r => r.id === roomId);
    const nights = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
    const roomSubtotal = room.price * nights;
    const taxes = roomSubtotal * 0.12;
    const grandTotal = roomSubtotal + taxes;

    booking.guestName = guestName;
    booking.guestEmail = guestEmail;
    booking.checkIn = checkIn;
    booking.checkOut = checkOut;
    booking.status = status;
    booking.roomTypeId = room.id;
    booking.roomName = room.name;
    booking.nights = nights;
    booking.roomPrice = room.price;
    booking.totalPrice = roomSubtotal;
    booking.taxes = taxes;
    booking.grandTotal = grandTotal;
    booking.specialRequests = requests;

    this.saveToStorage();
    closeModal('admin-edit-booking-modal');
    this.renderAdminBookingsManager();
    this.renderUserBookings();
    this.renderRooms();
    showToast(`Administrator updated booking ${booking.id} successfully.`, 'success');
  },

  adminCancelBooking(bookingId) {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) return;

    if (confirm(`ADMIN OVERRIDE: Confirm cancellation for booking ${booking.id} (${booking.guestName})? This overrides all restrictions.`)) {
      booking.status = 'Cancelled';
      this.saveToStorage();
      this.renderAdminBookingsManager();
      this.renderUserBookings();
      this.renderRooms();
      showToast(`Admin cancelled booking ${booking.id}. Full refund notification dispatched.`, 'info');
    }
  },

  renderAdminCMS() {
    const cms = this.staticPages;
    if (!cms) return;

    const cmsRoomTitle = document.getElementById('cms-room-title');
    const cmsRoomSubtitle = document.getElementById('cms-room-subtitle');
    const cmsRoomContent = document.getElementById('cms-room-content');
    if (cmsRoomTitle) cmsRoomTitle.value = cms.roomIntro.title;
    if (cmsRoomSubtitle) cmsRoomSubtitle.value = cms.roomIntro.subtitle;
    if (cmsRoomContent) cmsRoomContent.value = cms.roomIntro.content;

    const cmsAboutTitle = document.getElementById('cms-about-title');
    const cmsAboutTagline = document.getElementById('cms-about-tagline');
    const cmsAboutStory = document.getElementById('cms-about-story');
    const cmsAboutMission = document.getElementById('cms-about-mission');
    if (cmsAboutTitle) cmsAboutTitle.value = cms.about.title;
    if (cmsAboutTagline) cmsAboutTagline.value = cms.about.tagline;
    if (cmsAboutStory) cmsAboutStory.value = cms.about.story;
    if (cmsAboutMission) cmsAboutMission.value = cms.about.mission;

    const cmsContactPhone = document.getElementById('cms-contact-phone');
    const cmsContactEmail = document.getElementById('cms-contact-email');
    const cmsContactAddress = document.getElementById('cms-contact-address');
    const cmsContactHours = document.getElementById('cms-contact-hours');
    if (cmsContactPhone) cmsContactPhone.value = cms.contact.phone;
    if (cmsContactEmail) cmsContactEmail.value = cms.contact.email;
    if (cmsContactAddress) cmsContactAddress.value = cms.contact.address;
    if (cmsContactHours) cmsContactHours.value = cms.contact.receptionHours;

    const cmsTravelAirTitle = document.getElementById('cms-travel-air-title');
    const cmsTravelAirDesc = document.getElementById('cms-travel-air-desc');
    const cmsTravelShipDesc = document.getElementById('cms-travel-ship-desc');
    if (cmsTravelAirTitle) cmsTravelAirTitle.value = cms.travelShipping.airportTransfers.title;
    if (cmsTravelAirDesc) cmsTravelAirDesc.value = cms.travelShipping.airportTransfers.description;
    if (cmsTravelShipDesc) cmsTravelShipDesc.value = cms.travelShipping.luggageShipping.description;

    this.renderAdminFAQEditor();
  },

  renderAdminFAQEditor() {
    const container = document.getElementById('cms-faqs-editor-list');
    if (!container || !this.staticPages.faq) return;

    container.innerHTML = this.staticPages.faq.items.map((item, idx) => `
      <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:8px; padding:1rem; margin-bottom:0.75rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <strong style="color:var(--gold-400); font-size:0.85rem;">Q&A #${idx + 1}</strong>
          <button class="btn btn-danger btn-sm" onclick="App.deleteAdminFAQ(${idx})">Delete</button>
        </div>
        <input type="text" id="cms-faq-q-${idx}" value="${item.q}" style="width:100%; margin-bottom:0.5rem; font-weight:600;">
        <textarea id="cms-faq-a-${idx}" rows="2" style="width:100%;">${item.a}</textarea>
      </div>
    `).join('');
  },

  addAdminFAQ() {
    if (!this.staticPages.faq) return;
    this.staticPages.faq.items.push({
      q: "New Indian Guest Service Question?",
      a: "Customer service answer regarding hospitality or amenities."
    });
    this.renderAdminFAQEditor();
    showToast('Added new FAQ item. Click Save & Publish CMS Changes to apply.', 'info');
  },

  deleteAdminFAQ(index) {
    if (!this.staticPages.faq) return;
    this.staticPages.faq.items.splice(index, 1);
    this.renderAdminFAQEditor();
    showToast('FAQ removed.', 'info');
  },

  saveAdminCMS() {
    const cms = this.staticPages;

    cms.roomIntro.title = document.getElementById('cms-room-title').value;
    cms.roomIntro.subtitle = document.getElementById('cms-room-subtitle').value;
    cms.roomIntro.content = document.getElementById('cms-room-content').value;

    cms.about.title = document.getElementById('cms-about-title').value;
    cms.about.tagline = document.getElementById('cms-about-tagline').value;
    cms.about.story = document.getElementById('cms-about-story').value;
    cms.about.mission = document.getElementById('cms-about-mission').value;

    cms.contact.phone = document.getElementById('cms-contact-phone').value;
    cms.contact.email = document.getElementById('cms-contact-email').value;
    cms.contact.address = document.getElementById('cms-contact-address').value;
    cms.contact.receptionHours = document.getElementById('cms-contact-hours').value;

    cms.travelShipping.airportTransfers.title = document.getElementById('cms-travel-air-title').value;
    cms.travelShipping.airportTransfers.description = document.getElementById('cms-travel-air-desc').value;
    cms.travelShipping.luggageShipping.description = document.getElementById('cms-travel-ship-desc').value;

    cms.faq.items.forEach((item, idx) => {
      const qInput = document.getElementById(`cms-faq-q-${idx}`);
      const aInput = document.getElementById(`cms-faq-a-${idx}`);
      if (qInput && aInput) {
        item.q = qInput.value;
        item.a = aInput.value;
      }
    });

    this.saveToStorage();
    showToast('CMS changes published to live website!', 'success');
  },

  /* -------------------------------------------------------------
   * Display Static Pages
   * ------------------------------------------------------------- */
  renderStaticPage(pageKey) {
    const container = document.getElementById(`static-page-content-${pageKey}`);
    if (!container) return;

    const cms = this.staticPages;

    if (pageKey === 'room-intro') {
      container.innerHTML = `
        <div class="static-page-card">
          <span class="section-badge">Accommodation Guide</span>
          <h2 class="section-title">${cms.roomIntro.title}</h2>
          <p style="color:var(--gold-400); font-size:1.1rem; margin-bottom:1.5rem; font-weight:600;">${cms.roomIntro.subtitle}</p>
          <p style="color:var(--text-secondary); margin-bottom:2.5rem; line-height:1.7;">${cms.roomIntro.content}</p>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.5rem;">
            ${cms.roomIntro.types.map(t => `
              <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:12px; padding:1.5rem;">
                <h4 style="font-family:var(--font-serif); color:var(--text-main); font-size:1.2rem; margin-bottom:0.5rem;">${t.name}</h4>
                <div style="font-size:0.8rem; color:var(--gold-400); font-weight:700; margin-bottom:0.75rem;">Ideal For: ${t.idealFor}</div>
                <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.6;">${t.summary}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (pageKey === 'about') {
      container.innerHTML = `
        <div class="static-page-card">
          <span class="section-badge">Our Legacy</span>
          <h2 class="section-title">${cms.about.title}</h2>
          <p style="color:var(--gold-400); font-size:1.15rem; font-style:italic; margin-bottom:1.5rem;">"${cms.about.tagline}"</p>
          <p style="color:var(--text-secondary); font-size:1rem; margin-bottom:1.5rem; line-height:1.8;">${cms.about.story}</p>
          <p style="color:var(--text-main); font-size:1rem; margin-bottom:2.5rem; line-height:1.8;"><strong>Our Mission:</strong> ${cms.about.mission}</p>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1.5rem; margin-bottom:3rem;">
            ${cms.about.highlights.map(h => `
              <div style="background:var(--gold-subtle); border:1px solid var(--gold-border); border-radius:12px; padding:1.5rem; text-align:center;">
                <div style="font-family:var(--font-display); font-size:2.2rem; font-weight:700; color:var(--gold-400);">${h.stat}</div>
                <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.25rem;">${h.label}</div>
              </div>
            `).join('')}
          </div>

          <h3 style="font-family:var(--font-serif); font-size:1.4rem; color:var(--text-main); margin-bottom:1rem;">Core Pillars of Indian Hospitality</h3>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:0.75rem;">
            ${cms.about.values.map(v => `
              <li style="display:flex; align-items:flex-start; gap:0.6rem; color:var(--text-secondary); font-size:0.95rem;">
                <span style="color:var(--gold-400); font-weight:700;">✦</span> ${v}
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    } else if (pageKey === 'contact') {
      container.innerHTML = `
        <div class="static-page-card">
          <span class="section-badge">Concierge & Front Desk</span>
          <h2 class="section-title">${cms.contact.title}</h2>
          <p style="color:var(--text-secondary); margin-bottom:2.5rem;">${cms.contact.subtitle}</p>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:2rem;">
            <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:12px; padding:1.75rem;">
              <h4 style="font-family:var(--font-serif); font-size:1.2rem; color:var(--text-main); margin-bottom:1rem;">Direct Contacts (India)</h4>
              <p style="margin-bottom:0.75rem; color:var(--text-secondary);">📞 <strong>Phone:</strong> ${cms.contact.phone}</p>
              <p style="margin-bottom:0.75rem; color:var(--text-secondary);">✉️ <strong>General Concierge:</strong> ${cms.contact.email}</p>
              <p style="margin-bottom:0.75rem; color:var(--text-secondary);">📋 <strong>Reservations Desk:</strong> ${cms.contact.reservationsEmail}</p>
              <p style="color:var(--text-secondary);">🚨 <strong>Emergency helpline:</strong> ${cms.contact.emergencyLine}</p>
            </div>

            <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:12px; padding:1.75rem;">
              <h4 style="font-family:var(--font-serif); font-size:1.2rem; color:var(--text-main); margin-bottom:1rem;">Headquarters & Operations</h4>
              <p style="margin-bottom:0.75rem; color:var(--text-secondary);">📍 <strong>Address:</strong> ${cms.contact.address}</p>
              <p style="margin-bottom:0.75rem; color:var(--text-secondary);">🕒 <strong>Reception Hours:</strong> ${cms.contact.receptionHours}</p>
              <p style="color:var(--text-secondary);">🛎️ <strong>Concierge Desk:</strong> ${cms.contact.conciergeDesk}</p>
            </div>
          </div>
        </div>
      `;
    } else if (pageKey === 'faq') {
      container.innerHTML = `
        <div class="static-page-card">
          <span class="section-badge">Guest Help Center</span>
          <h2 class="section-title">${cms.faq.title}</h2>
          <p style="color:var(--text-secondary); margin-bottom:2.5rem;">${cms.faq.subtitle}</p>

          <div class="faq-accordion-list">
            ${cms.faq.items.map((item, idx) => `
              <div class="accordion-item ${idx === 0 ? 'active' : ''}">
                <button class="accordion-header" onclick="this.parentElement.classList.toggle('active')">
                  <span>${item.q}</span>
                  <span style="font-size:1.2rem;">▾</span>
                </button>
                <div class="accordion-body">
                  ${item.a}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (pageKey === 'travel') {
      container.innerHTML = `
        <div class="static-page-card">
          <span class="section-badge">Travel & Shipping Desk</span>
          <h2 class="section-title">${cms.travelShipping.title}</h2>
          <p style="color:var(--text-secondary); margin-bottom:2.5rem;">${cms.travelShipping.subtitle}</p>

          <div style="display:flex; flex-direction:column; gap:2.5rem;">
            <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:12px; padding:2rem;">
              <h3 style="font-family:var(--font-serif); color:var(--text-main); font-size:1.35rem; margin-bottom:0.75rem;">✈️ ${cms.travelShipping.airportTransfers.title}</h3>
              <p style="color:var(--text-secondary); margin-bottom:1.25rem;">${cms.travelShipping.airportTransfers.description}</p>
              <ul style="list-style:none; display:flex; flex-direction:column; gap:0.5rem;">
                ${cms.travelShipping.airportTransfers.options.map(opt => `
                  <li style="color:var(--text-main); font-size:0.9rem;">✦ ${opt}</li>
                `).join('')}
              </ul>
            </div>

            <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:12px; padding:2rem;">
              <h3 style="font-family:var(--font-serif); color:var(--text-main); font-size:1.35rem; margin-bottom:0.75rem;">🧳 ${cms.travelShipping.luggageShipping.title}</h3>
              <p style="color:var(--text-secondary); margin-bottom:1.25rem;">${cms.travelShipping.luggageShipping.description}</p>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem;">
                ${cms.travelShipping.luggageShipping.guidelines.map(g => `
                  <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; padding:1rem; font-size:0.85rem; color:var(--text-secondary);">
                    ${g}
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:12px; padding:2rem;">
              <h3 style="font-family:var(--font-serif); color:var(--text-main); font-size:1.35rem; margin-bottom:0.75rem;">⛵ ${cms.travelShipping.localAttractions.title}</h3>
              <p style="color:var(--text-secondary); margin-bottom:1.25rem;">${cms.travelShipping.localAttractions.description}</p>
              <ul style="list-style:none; display:flex; flex-direction:column; gap:0.5rem;">
                ${cms.travelShipping.localAttractions.places.map(p => `
                  <li style="color:var(--text-main); font-size:0.9rem;">📍 ${p}</li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
    } else if (pageKey === 'privacy') {
      container.innerHTML = `
        <div class="static-page-card">
          <span class="section-badge">Legal & Guest Security</span>
          <h2 class="section-title">${cms.privacy.title}</h2>
          <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:2rem;">Last Updated: ${cms.privacy.lastUpdated}</p>

          <div style="display:flex; flex-direction:column; gap:1.75rem;">
            ${cms.privacy.sections.map(sec => `
              <div>
                <h4 style="font-family:var(--font-serif); font-size:1.2rem; color:var(--gold-400); margin-bottom:0.5rem;">${sec.heading}</h4>
                <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.7;">${sec.body}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  },

  /* -------------------------------------------------------------
   * Reviews
   * ------------------------------------------------------------- */
  openReviewModal(roomTypeId) {
    const room = this.rooms.find(r => r.id === roomTypeId);
    if (!room) return;

    document.getElementById('review-room-id').value = room.id;
    document.getElementById('review-room-name').textContent = room.name;
    openModal('review-modal');
  },

  submitReview() {
    const roomId = document.getElementById('review-room-id').value;
    const room = this.rooms.find(r => r.id === roomId);
    if (!room) return;

    const rating = parseInt(document.getElementById('review-star-rating').value) || 5;
    const comment = document.getElementById('review-comment-text').value.trim();

    if (!comment) {
      showToast('Please write a brief comment describing your stay experience.', 'error');
      return;
    }

    const newRev = {
      id: 'rev-' + Date.now(),
      roomTypeId: room.id,
      guestName: this.currentUser ? this.currentUser.name : 'Verified Guest',
      rating,
      date: new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' }),
      comment
    };

    this.reviews.unshift(newRev);

    const roomReviews = this.reviews.filter(r => r.roomTypeId === room.id);
    const avgRating = roomReviews.reduce((sum, r) => sum + r.rating, 0) / roomReviews.length;
    room.rating = avgRating;
    room.reviewsCount = roomReviews.length;

    this.saveToStorage();
    closeModal('review-modal');
    this.renderRooms();
    showToast(`Thank you! Your ${rating}-star review for ${room.name} has been published.`, 'success');
  },

  /* -------------------------------------------------------------
   * Room Details Modal
   * ------------------------------------------------------------- */
  openRoomDetailsModal(roomId) {
    const room = this.rooms.find(r => r.id === roomId);
    if (!room) return;

    const roomReviews = this.reviews.filter(r => r.roomTypeId === room.id);

    document.getElementById('detail-modal-room-name').textContent = room.name;
    document.getElementById('detail-modal-img').src = room.image;
    document.getElementById('detail-modal-price').textContent = `${formatINR(room.price)} / night`;
    document.getElementById('detail-modal-desc').textContent = room.description;
    document.getElementById('detail-modal-bed').textContent = room.bedType;
    document.getElementById('detail-modal-capacity').textContent = `Up to ${room.capacity} Guests`;
    document.getElementById('detail-modal-size').textContent = room.size;
    document.getElementById('detail-modal-view').textContent = room.view;

    document.getElementById('detail-modal-amenities').innerHTML = room.amenities.map(a => `
      <li class="room-amenity-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${a}</span>
      </li>
    `).join('');

    document.getElementById('detail-modal-reviews').innerHTML = roomReviews.length > 0 ? roomReviews.map(r => `
      <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:8px; padding:0.85rem; margin-bottom:0.75rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
          <strong style="color:var(--text-main); font-size:0.9rem;">${r.guestName}</strong>
          <span style="color:var(--gold-400); font-size:0.8rem;">${'★'.repeat(r.rating)} (${r.date})</span>
        </div>
        <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.5;">"${r.comment}"</p>
      </div>
    `).join('') : '<p style="color:var(--text-muted); font-size:0.85rem;">No reviews yet. Be the first to review after your stay!</p>';

    document.getElementById('detail-modal-book-btn').onclick = () => {
      closeModal('room-detail-modal');
      this.openBookingModal(room.id);
    };

    openModal('room-detail-modal');
  },

  /* -------------------------------------------------------------
   * Official GST Tax Invoice / Guest Voucher Modal
   * ------------------------------------------------------------- */
  viewBookingVoucher(bookingId) {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const cgst = (booking.taxes || 0) / 2;
    const sgst = (booking.taxes || 0) / 2;

    const voucherHtml = `
      <div style="border:2px dashed var(--gold-border); border-radius:12px; padding:2rem; background:var(--bg-surface); font-family:var(--font-sans); color:var(--text-main);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid var(--border-subtle); padding-bottom:1.5rem; margin-bottom:1.5rem;">
          <div>
            <div style="font-family:var(--font-display); font-size:1.4rem; color:var(--gold-400); letter-spacing:0.08em; font-weight:700;">LUXEHORIZON RESORT & HOTEL</div>
            <div style="font-size:0.75rem; color:var(--text-muted); letter-spacing:0.1em; text-transform:uppercase;">Official Indian GST Hospitality Voucher</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">GSTIN: 08AAACL9921K1Z4 • SAC: 996311</div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:var(--font-mono); font-size:1.15rem; color:var(--gold-400); font-weight:700;">${booking.id}</div>
            <div style="font-size:0.75rem; color:var(--success); font-weight:600;">Status: ${booking.status}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${booking.paymentStatus}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:1.5rem; font-size:0.9rem;">
          <div>
            <span style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; display:block;">Guest Particulars</span>
            <strong style="color:var(--text-main); font-size:1.05rem;">${booking.guestName}</strong>
            <div style="color:var(--text-secondary); font-size:0.85rem;">${booking.guestEmail} • ${booking.guestPhone}</div>
          </div>
          <div>
            <span style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; display:block;">Property & Accommodation</span>
            <strong style="color:var(--gold-400); font-size:1.05rem;">${booking.roomName}</strong>
            <div style="color:var(--text-secondary); font-size:0.85rem;">${booking.resortName || 'LuxeHorizon Sanctuary'}</div>
            <div style="color:var(--text-muted); font-size:0.8rem;">${booking.guests} Guests • ${booking.nights} Nights</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:1.5rem; background:var(--gold-subtle); padding:1rem; border-radius:8px;">
          <div>
            <span style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; display:block;">Check-In (From 2:00 PM)</span>
            <strong style="color:var(--text-main); font-size:1rem;">${booking.checkIn}</strong>
          </div>
          <div>
            <span style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; display:block;">Check-Out (Until 12:00 Noon)</span>
            <strong style="color:var(--text-main); font-size:1rem;">${booking.checkOut}</strong>
          </div>
        </div>

        ${booking.mealPlan ? `
          <div style="margin-bottom:1.25rem; font-size:0.85rem; color:var(--text-secondary);">
            🍽️ <strong>Meal Plan:</strong> ${booking.mealPlan}
          </div>
        ` : ''}

        <div style="border-top:1px solid var(--border-subtle); padding-top:1rem; margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem; font-size:0.85rem; color:var(--text-secondary);">
            <span>Room Base Tariff (${booking.nights} nights @ ${formatINR(booking.roomPrice)})</span>
            <span>${formatINR(booking.totalPrice)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem; font-size:0.85rem; color:var(--text-secondary);">
            <span>CGST (6%)</span>
            <span>${formatINR(cgst)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem; font-size:0.85rem; color:var(--text-secondary);">
            <span>SGST (6%)</span>
            <span>${formatINR(sgst)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:1.25rem; font-weight:700; color:var(--text-main); border-top:1px dashed var(--border-subtle); padding-top:0.75rem;">
            <span>Total Amount Paid (INR)</span>
            <span style="color:var(--gold-400);">${formatINR(booking.grandTotal)}</span>
          </div>
        </div>

        <div style="background:var(--gold-subtle); border-left:3px solid var(--gold-500); padding:0.75rem; font-size:0.78rem; color:var(--text-secondary); border-radius:4px;">
          <strong>72-Hour Cancellation Rule:</strong> Full refund cancellation or modification allowed up to 3 days prior to check-in (${booking.cancellationDeadline}). Within 72 hours, allocations are locked.
        </div>
      </div>
    `;

    document.getElementById('voucher-content-body').innerHTML = voucherHtml;
    openModal('voucher-modal');
  }
};

// Global Helpers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '⚠️';

  toast.innerHTML = `
    <span style="font-size:1.2rem;">${icon}</span>
    <span style="font-size:0.88rem; color:var(--text-main); line-height:1.4;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

// Window Expose
window.App = State;

document.addEventListener('DOMContentLoaded', () => {
  State.init();
});
