/**
 * PALM PALACE RESTAURANTS AND COFFEE - Interactive Application Logic
 * Supports: Arabic & English, Google Maps Info, WhatsApp Menu Catalog Link,
 * Live Rating Summary (4.2 / 51 reviews), Dynamic Services & Reviews Showcase
 */

const PALME_LANG_KEY = 'palm_palace_current_lang';

const PalmeApp = {
  lang: localStorage.getItem(PALME_LANG_KEY) || 'fr',
  activeCategory: 'all',

  init: function() {
    this.applyLanguage(this.lang, false);
    this.setupEventListeners();
    this.renderAll();
    this.setupScrollEffects();
  },

  setLanguage: function(lang) {
    this.lang = lang;
    localStorage.setItem(PALME_LANG_KEY, lang);
    this.applyLanguage(lang, true);
    this.renderAll();
  },

  applyLanguage: function(lang, animate) {
    const isAr = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    if (isAr) {
      document.body.classList.add('lang-ar');
    } else {
      document.body.classList.remove('lang-ar');
    }

    const langSwitchers = document.querySelectorAll('.lang-switcher-text');
    langSwitchers.forEach(el => {
      el.textContent = isAr ? 'Français' : 'العربية';
    });
  },

  toggleLanguage: function() {
    const nextLang = this.lang === 'fr' ? 'ar' : 'fr';
    this.setLanguage(nextLang);
  },

  renderAll: function() {
    const restaurant = PalmeDB.getRestaurantInfo();
    const isAr = this.lang === 'ar';

    // Update Brand Name & Taglines - Restaurant Store Title is ALWAYS French
    document.querySelectorAll('.dyn-restaurant-name').forEach(el => {
      el.textContent = restaurant.name_fr || restaurant.name || "PALM PALACE RESTAURANTS ET CAFÉ";
    });

    document.querySelectorAll('.dyn-restaurant-tagline').forEach(el => {
      el.textContent = isAr && restaurant.tagline_ar ? restaurant.tagline_ar : (restaurant.tagline_fr || restaurant.tagline);
    });

    document.querySelectorAll('.dyn-restaurant-desc').forEach(el => {
      el.textContent = isAr && restaurant.short_desc_ar ? restaurant.short_desc_ar : restaurant.short_desc;
    });

    // Rating & Review summary in Hero / Badges
    document.querySelectorAll('.dyn-rating-val').forEach(el => {
      el.textContent = restaurant.rating || '4.2';
    });
    document.querySelectorAll('.dyn-reviews-count').forEach(el => {
      el.textContent = `(${restaurant.reviews_count || 51})`;
    });

    // About Details
    const aboutStoryEl = document.getElementById('about-story-text');
    if (aboutStoryEl) {
      aboutStoryEl.textContent = isAr && restaurant.about_story_ar ? restaurant.about_story_ar : restaurant.about_story;
    }

    const aboutPhilEl = document.getElementById('about-philosophy-text');
    if (aboutPhilEl) {
      aboutPhilEl.textContent = isAr && restaurant.about_philosophy_ar ? restaurant.about_philosophy_ar : restaurant.about_philosophy;
    }

    const chefNameEl = document.getElementById('about-chef-name');
    if (chefNameEl) chefNameEl.textContent = restaurant.chef_name;

    const chefTitleEl = document.getElementById('about-chef-title');
    if (chefTitleEl) {
      chefTitleEl.textContent = isAr && restaurant.chef_title_ar ? restaurant.chef_title_ar : restaurant.chef_title;
    }

    // Contact Details
    document.querySelectorAll('.dyn-phone').forEach(el => el.textContent = restaurant.phone);
    document.querySelectorAll('.dyn-phone-link').forEach(el => el.href = `tel:${restaurant.phone.replace(/\s+/g, '')}`);
    
    document.querySelectorAll('.dyn-whatsapp-link').forEach(el => {
      el.href = restaurant.whatsapp_url || `https://wa.me/${restaurant.whatsapp_number}`;
    });

    document.querySelectorAll('.dyn-email').forEach(el => el.textContent = restaurant.email);
    document.querySelectorAll('.dyn-email-link').forEach(el => el.href = `mailto:${restaurant.email}`);
    
    document.querySelectorAll('.dyn-address').forEach(el => {
      el.textContent = isAr && restaurant.address_ar ? restaurant.address_ar : restaurant.address;
    });

    document.querySelectorAll('.dyn-plus-code').forEach(el => {
      el.textContent = restaurant.plus_code || 'P8WM+6RC';
    });

    document.querySelectorAll('.dyn-hours').forEach(el => {
      el.textContent = isAr && restaurant.opening_hours_ar ? restaurant.opening_hours_ar : restaurant.opening_hours;
    });

    // Render Services Badges
    this.renderServicesBadges();

    // Render Dynamic Modules
    this.renderMenuCategories();
    this.renderMenuItems();
    this.renderOffers();
    this.renderGallery();
    this.renderReviewsSection();
  },

  renderServicesBadges: function() {
    const container = document.getElementById('services-badges-container');
    if (!container) return;
    const services = PalmeDB.getRestaurantInfo().services || [];
    const isAr = this.lang === 'ar';

    container.innerHTML = services.map(s => `
      <div class="service-pill">
        <i class="fas ${s.icon}"></i>
        <span>${isAr ? s.ar : s.en}</span>
      </div>
    `).join('');
  },

  renderMenuCategories: function() {
    const nav = document.getElementById('menu-categories-container');
    if (!nav) return;

    const categories = PalmeDB.getAll().categories || [];
    const isAr = this.lang === 'ar';

    nav.innerHTML = categories.map(cat => `
      <button class="menu-cat-btn ${cat.id === this.activeCategory ? 'active' : ''}" 
              data-category="${cat.id}">
        ${isAr && cat.name_ar ? cat.name_ar : cat.name}
      </button>
    `).join('');

    nav.querySelectorAll('.menu-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        nav.querySelectorAll('.menu-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategory = btn.dataset.category;
        this.renderMenuItems();
      });
    });
  },

  renderMenuItems: function() {
    const grid = document.getElementById('menu-grid-container');
    if (!grid) return;

    const menu = PalmeDB.getMenu();
    const isAr = this.lang === 'ar';
    const currency = PalmeDB.getRestaurantInfo().currency || 'DH';

    const filtered = menu.filter(item => {
      if (item.is_available === false) return false;
      if (this.activeCategory === 'all') return true;
      return item.category && item.category.toLowerCase() === this.activeCategory.toLowerCase();
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
          <i class="fas fa-utensils" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--gold-400);"></i>
          <p>${isAr ? 'لا توجد أطباق في هذا القسم حالياً' : 'No items currently in this section.'}</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(dish => {
      const name = isAr && dish.name_ar ? dish.name_ar : dish.name;
      const desc = isAr && dish.description_ar ? dish.description_ar : dish.description;
      const badge = dish.badge ? `<span class="menu-card-badge">${dish.badge}</span>` : '';
      const ingredients = dish.ingredients ? `<div class="menu-card-ingredients"><i class="fas fa-check-circle" style="font-size: 0.7rem; margin-right: 4px;"></i> ${dish.ingredients}</div>` : '';

      return `
        <div class="menu-card" data-dish-id="${dish.id}">
          <div class="menu-card-img-wrap">
            <img src="${dish.image}" alt="${name}" class="menu-card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'">
            ${badge}
          </div>
          <div class="menu-card-body">
            <div class="menu-card-header">
              <h3 class="menu-card-title">${name}</h3>
              <span class="menu-card-price">${dish.price} <small style="font-size: 0.75rem; color: var(--gold-300);">${currency}</small></span>
            </div>
            <p class="menu-card-desc">${desc}</p>
            ${ingredients}
            <div class="menu-card-footer">
              <button class="btn-outline-gold" style="padding: 0.45rem 1rem; font-size: 0.82rem;" onclick="PalmeApp.openDishDetail('${dish.id}')">
                <i class="fas fa-eye"></i> ${isAr ? 'التفاصيل' : 'Details'}
              </button>
              <button class="btn-gold" style="padding: 0.45rem 1.1rem; font-size: 0.82rem;" onclick="PalmeApp.orderViaWhatsapp('${dish.id}')">
                <i class="fab fa-whatsapp"></i> ${isAr ? 'طلب عبر واتساب' : 'Order WhatsApp'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  orderViaWhatsapp: function(dishId) {
    const dish = PalmeDB.getMenu().find(d => d.id === dishId);
    const rest = PalmeDB.getRestaurantInfo();
    const isAr = this.lang === 'ar';
    const dishName = isAr && dish.name_ar ? dish.name_ar : dish.name;
    const msg = isAr 
      ? `السلام عليكم ورحمة الله، أريد طلب: ${dishName} (السعر: ${dish.price} ${rest.currency}) من مطعم ومقهى PALM PALACE بالسمارة.`
      : `Hello, I would like to order: ${dishName} (${dish.price} ${rest.currency}) from PALM PALACE RESTAURANTS AND COFFEE in Smara.`;
    
    const waUrl = `https://wa.me/${rest.whatsapp_number}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  },

  renderReviewsSection: function() {
    const container = document.getElementById('reviews-list-container');
    if (!container) return;

    const reviews = PalmeDB.getReviews();
    const isAr = this.lang === 'ar';

    container.innerHTML = reviews.map(rev => {
      const text = isAr ? rev.text : (rev.text_en || rev.text);
      const relativeDate = isAr ? rev.date_relative : (rev.date_relative_en || rev.date_relative);
      const starsHtml = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);

      const ownerResponseHtml = rev.owner_response ? `
        <div class="owner-reply-box">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
            <i class="fas fa-reply" style="color: var(--gold-400);"></i>
            <strong style="color: var(--gold-300); font-size: 0.85rem;">${isAr ? 'رد من المالك' : 'Response from Owner'}</strong>
            <small style="color: var(--text-muted); font-size: 0.75rem;">(${rev.owner_response_date || ''})</small>
          </div>
          <p style="color: var(--text-secondary); font-size: 0.88rem; margin: 0; line-height: 1.5;">${rev.owner_response}</p>
        </div>
      ` : '';

      return `
        <div class="review-card">
          <div class="review-header">
            <div class="review-avatar">
              <i class="fas fa-user-circle"></i>
            </div>
            <div style="flex-grow: 1;">
              <h4 style="color: #ffffff; font-size: 1.05rem; margin-bottom: 0.2rem;">${rev.author}</h4>
              <span style="color: var(--text-muted); font-size: 0.78rem;">${rev.author_desc || ''} · ${relativeDate}</span>
            </div>
            <div class="review-stars">${starsHtml}</div>
          </div>
          <p class="review-text">${text}</p>
          ${ownerResponseHtml}
        </div>
      `;
    }).join('');
  },

  renderOffers: function() {
    const grid = document.getElementById('offers-grid-container');
    if (!grid) return;

    const offers = PalmeDB.getOffers().filter(o => o.is_active !== false);
    const isAr = this.lang === 'ar';

    if (offers.length === 0) {
      grid.innerHTML = `<p style="text-align: center; grid-column: 1/-1; color: var(--text-muted);">${isAr ? 'لا توجد عروض حالياً' : 'No seasonal offers right now.'}</p>`;
      return;
    }

    grid.innerHTML = offers.map(offer => {
      const title = isAr && offer.title_ar ? offer.title_ar : offer.title;
      const desc = isAr && offer.description_ar ? offer.description_ar : offer.description;
      const tag = isAr && offer.tag_ar ? offer.tag_ar : offer.tag;
      const discount = isAr && offer.discount_ar ? offer.discount_ar : offer.discount;

      return `
        <div class="offer-card">
          <img src="${offer.image}" alt="${title}" class="offer-card-bg" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'">
          <div class="offer-content">
            <span class="offer-tag">${tag}</span>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.75rem; color: #ffffff;">${title}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.25rem; font-size: 0.95rem; line-height: 1.5;">${desc}</p>
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
              <span style="font-family: 'Cinzel', serif; color: var(--gold-300); font-size: 1.15rem; font-weight: 700;">${discount}</span>
              <a href="#reservations" class="btn-gold" style="padding: 0.55rem 1.25rem; font-size: 0.85rem;">
                ${isAr ? 'حجز العرض' : 'Claim Offer'}
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  renderGallery: function() {
    const grid = document.getElementById('gallery-grid-container');
    if (!grid) return;

    const gallery = PalmeDB.getGallery();
    const isAr = this.lang === 'ar';

    grid.innerHTML = gallery.map(item => {
      const title = isAr && item.title_ar ? item.title_ar : item.title;
      return `
        <div class="gallery-item" onclick="PalmeApp.previewImage('${item.image}', '${title}')">
          <img src="${item.image}" alt="${title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'">
          <div class="gallery-overlay">
            <i class="fas fa-search-plus" style="font-size: 2rem; color: var(--gold-400); margin-bottom: 0.8rem;"></i>
            <h4 style="color: #ffffff; font-size: 1.05rem; font-weight: 600;">${title}</h4>
            <span style="color: var(--gold-300); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.25rem;">${item.category || 'Palm Palace'}</span>
          </div>
        </div>
      `;
    }).join('');
  },

  setupEventListeners: function() {
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => this.toggleLanguage());
    });

    // Reservation Form Submit
    const resForm = document.getElementById('reservation-form');
    if (resForm) {
      resForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleReservationSubmit(resForm);
      });
    }

    // Contact Form Submit
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactSubmit(contactForm);
      });
    }

    // New Review Form Submit
    const reviewForm = document.getElementById('new-review-form');
    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleReviewSubmit(reviewForm);
      });
    }

    window.addEventListener('palme_db_updated', () => {
      this.renderAll();
    });
  },

  handleReservationSubmit: function(form) {
    const isAr = this.lang === 'ar';
    const name = form.customer_name.value.trim();
    const phone = form.customer_phone.value.trim();
    const email = form.customer_email.value.trim();
    const guests = parseInt(form.guests.value) || 2;
    const date = form.date.value;
    const time = form.time.value;
    const notes = form.special_notes.value.trim();

    if (!name || !phone || !date || !time) {
      this.showToast(isAr ? 'يرجى ملء جميع الحقول الإلزامية' : 'Please complete all required fields.', 'error');
      return;
    }

    const res = PalmeDB.addReservation({
      customer_name: name,
      customer_phone: phone,
      customer_email: email,
      guests: guests,
      date: date,
      time: time,
      special_notes: notes
    });

    this.openReservationConfirmation(res);
    form.reset();
  },

  handleContactSubmit: function(form) {
    const isAr = this.lang === 'ar';
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone ? form.phone.value.trim() : '';
    const subject = form.subject ? form.subject.value.trim() : 'Guest Inquiry';
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      this.showToast(isAr ? 'يرجى كتابة الاسم والبريد الإلكتروني والرسالة' : 'Please enter your name, email and message.', 'error');
      return;
    }

    PalmeDB.addMessage({ name, email, phone, subject, message });
    this.showToast(
      isAr ? 'تم استلام رسالتكم بنجاح وسيتواصل معكم فريق PALM PALACE قريباً.' : 'Thank you. Your message has been received by Palm Palace.',
      'success'
    );
    form.reset();
  },

  handleReviewSubmit: function(form) {
    const isAr = this.lang === 'ar';
    const author = form.rev_author.value.trim();
    const rating = parseInt(form.rev_rating.value) || 5;
    const text = form.rev_text.value.trim();

    if (!author || !text) {
      this.showToast(isAr ? 'يرجى كتابة اسمك ورأيك' : 'Please write your name and review', 'error');
      return;
    }

    PalmeDB.addReview({
      author: author,
      author_desc: isAr ? 'مراجعة موثقة من زائر' : 'Verified Guest Review',
      rating: rating,
      text: text,
      text_en: text
    });

    this.showToast(isAr ? 'شكراً جزيلاً! تم نشر تقييمك بنجاح.' : 'Thank you! Your review has been submitted.', 'success');
    this.closeModal('add-review-modal');
    form.reset();
  },

  openReservationConfirmation: function(res) {
    const isAr = this.lang === 'ar';
    const modal = document.getElementById('confirmation-modal');
    if (!modal) {
      this.showToast(isAr ? `تم تسجيل حجزكم بنجاح برقم: ${res.id}` : `Reservation received! Code: ${res.id}`, 'success');
      return;
    }

    const modalBody = document.getElementById('confirmation-modal-content');
    modalBody.innerHTML = `
      <div style="text-align: center; padding: 1rem 0;">
        <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(201, 160, 80, 0.15); border: 2px solid var(--gold-400); margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; color: var(--gold-400); font-size: 2rem;">
          <i class="fas fa-check"></i>
        </div>
        <h3 class="font-cinzel" style="font-size: 1.8rem; margin-bottom: 0.5rem; color: #ffffff;">
          ${isAr ? 'تم تأكيد طلب الحجز في السمارة' : 'Reservation Request Confirmed'}
        </h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">
          ${isAr ? 'مرحباً بكم في PALM PALACE RESTAURANTS AND COFFEE. يسعدنا استقبالكم وخدمتكم بكل حفاوة.' : 'Welcome to PALM PALACE RESTAURANTS AND COFFEE. We look forward to welcoming you.'}
        </p>

        <div style="background: rgba(20, 28, 24, 0.6); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 1.25rem; text-align: ${isAr ? 'right' : 'left'}; margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.5rem;">
            <span style="color: var(--text-muted);">${isAr ? 'رقم الحجز المرجعي' : 'Ref Code'}:</span>
            <span style="color: var(--gold-400); font-weight: 700;">#${res.id}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="color: var(--text-muted);">${isAr ? 'اسم الزبون' : 'Guest Name'}:</span>
            <span style="color: #ffffff; font-weight: 600;">${res.customer_name}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="color: var(--text-muted);">${isAr ? 'التاريخ والوقت' : 'Date & Time'}:</span>
            <span style="color: #ffffff;">${res.date} @ ${res.time}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted);">${isAr ? 'عدد الأشخاص' : 'Guests'}:</span>
            <span style="color: #ffffff;">${res.guests} ${isAr ? 'أشخاص' : 'Guests'}</span>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: center;">
          <a href="https://wa.me/212626843967?text=${encodeURIComponent('السلام عليكم، بخصوص الحجز رقم #' + res.id)}" target="_blank" class="btn-gold" style="flex: 1;">
            <i class="fab fa-whatsapp"></i> ${isAr ? 'تأكيد فوري عبر واتساب' : 'Confirm via WhatsApp'}
          </a>
          <button class="btn-outline-gold" onclick="PalmeApp.closeModal('confirmation-modal')" style="flex: 1;">
            ${isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    `;
    modal.classList.add('active');
  },

  openDishDetail: function(id) {
    const dish = PalmeDB.getMenu().find(d => d.id === id);
    if (!dish) return;

    const isAr = this.lang === 'ar';
    const currency = PalmeDB.getRestaurantInfo().currency || 'DH';
    const modal = document.getElementById('dish-modal');
    if (!modal) return;

    const modalContent = document.getElementById('dish-modal-content');
    modalContent.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;">
        <div style="border-radius: var(--radius-md); overflow: hidden; height: 320px; border: 1px solid var(--border-gold);">
          <img src="${dish.image}" alt="${dish.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div>
          ${dish.badge ? `<span class="menu-card-badge" style="position: static; display: inline-block; margin-bottom: 0.75rem;">${dish.badge}</span>` : ''}
          <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: #ffffff;">${isAr && dish.name_ar ? dish.name_ar : dish.name}</h2>
          <div style="font-family: 'Cinzel', serif; font-size: 1.5rem; color: var(--gold-400); margin-bottom: 1rem; font-weight: 700;">${dish.price} ${currency}</div>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">${isAr && dish.description_ar ? dish.description_ar : dish.description}</p>
          <div style="background: rgba(8,11,10,0.5); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); margin-bottom: 1.5rem;">
            <strong style="color: var(--gold-300); font-size: 0.85rem; display: block; margin-bottom: 0.25rem;">${isAr ? 'المكونات وطريقة التحضير:' : 'Ingredients:'}</strong>
            <span style="color: var(--text-muted); font-size: 0.85rem;">${dish.ingredients || 'Fresh daily curation'}</span>
          </div>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn-gold" onclick="PalmeApp.orderViaWhatsapp('${dish.id}')">
              <i class="fab fa-whatsapp"></i> ${isAr ? 'طلب الآن عبر واتساب' : 'Order via WhatsApp'}
            </button>
            <button class="btn-outline-gold" onclick="PalmeApp.closeModal('dish-modal')">
              ${isAr ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    `;
    modal.classList.add('active');
  },

  openReviewModal: function() {
    const modal = document.getElementById('add-review-modal');
    if (modal) modal.classList.add('active');
  },

  previewImage: function(src, title) {
    const modal = document.getElementById('image-modal');
    if (!modal) return;
    const imgEl = document.getElementById('image-modal-img');
    const titleEl = document.getElementById('image-modal-title');
    if (imgEl) imgEl.src = src;
    if (titleEl) titleEl.textContent = title;
    modal.classList.add('active');
  },

  closeModal: function(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('active');
  },

  showToast: function(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    toast.innerHTML = `
      <i class="fas ${icon}" style="font-size: 1.2rem; color: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : 'var(--gold-400)'}"></i>
      <span style="font-size: 0.9rem;">${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  },

  setupScrollEffects: function() {
    const header = document.querySelector('header.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PalmeApp.init();
});
