/**
 * PALME PLACE - Comprehensive Admin Dashboard Logic
 * Controls Dashboard Analytics, Restaurant Info Editor, Menu Manager (CRUD),
 * Reservations (Status updates, filters), Gallery (CRUD), Offers (CRUD),
 * Customer directory and Contact Messages.
 */

const PalmeAdmin = {
  currentTab: 'overview',
  lang: localStorage.getItem('palme_admin_lang') || 'en',

  init: function() {
    // Check Auth
    if (!PalmeAuth.isAuthenticated()) {
      window.location.href = 'login.html';
      return;
    }

    this.applyAdminLanguage(this.lang);
    this.setupNavigation();
    this.renderOverview();
  },

  applyAdminLanguage: function(lang) {
    this.lang = lang;
    localStorage.setItem('palme_admin_lang', lang);
    const isAr = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    if (isAr) {
      document.body.classList.add('lang-ar');
    } else {
      document.body.classList.remove('lang-ar');
    }

    const langToggleBtn = document.getElementById('admin-lang-btn');
    if (langToggleBtn) {
      langToggleBtn.innerHTML = `<i class="fas fa-globe"></i> ${isAr ? 'English' : 'العربية'}`;
    }
  },

  toggleLanguage: function() {
    this.applyAdminLanguage(this.lang === 'en' ? 'ar' : 'en');
    this.loadTab(this.currentTab);
  },

  setupNavigation: function() {
    document.querySelectorAll('.sidebar-item a[data-tab]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = item.getAttribute('data-tab');
        document.querySelectorAll('.sidebar-item').forEach(li => li.classList.remove('active'));
        item.parentElement.classList.add('active');
        this.loadTab(tab);
      });
    });

    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        PalmeAuth.logout();
      });
    }

    const langBtn = document.getElementById('admin-lang-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => this.toggleLanguage());
    }
  },

  loadTab: function(tab) {
    this.currentTab = tab;
    const content = document.getElementById('admin-main-view');
    if (!content) return;

    switch (tab) {
      case 'overview':
        this.renderOverview();
        break;
      case 'restaurant':
        this.renderRestaurantSettings();
        break;
      case 'menu':
        this.renderMenuManager();
        break;
      case 'reservations':
        this.renderReservationsManager();
        break;
      case 'offers':
        this.renderOffersManager();
        break;
      case 'gallery':
        this.renderGalleryManager();
        break;
      case 'customers':
        this.renderCustomersManager();
        break;
      case 'messages':
        this.renderMessagesManager();
        break;
      case 'reviews':
        this.renderReviewsManager();
        break;
      case 'settings':
        this.renderSystemSettings();
        break;
      default:
        this.renderOverview();
    }
  },

  // 1. Overview Dashboard
  renderOverview: function() {
    const isAr = this.lang === 'ar';
    const data = PalmeDB.getAll();
    const resCount = data.reservations.length;
    const dishesCount = data.menu.length;
    const custCount = data.customers.length;
    const msgCount = data.messages.length;

    // Filter today's reservations
    const todayStr = new Date().toISOString().substring(0, 10);
    const todayResCount = data.reservations.filter(r => r.date === todayStr).length;

    const view = document.getElementById('admin-main-view');
    view.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
          <h1 class="font-cinzel" style="font-size: 1.85rem; color: #ffffff; margin-bottom: 0.25rem;">
            ${isAr ? 'لوحة التحكم والتحليلات' : 'Executive Dashboard'}
          </h1>
          <p style="color: var(--admin-text-muted); font-size: 0.95rem;">
            ${isAr ? 'مرحباً بك في نظام إدارة مطعم PALME PLACE الفاخر' : 'Welcome to the PALME PLACE Luxury Management Suite.'}
          </p>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <a href="index.html" target="_blank" class="btn-outline-gold" style="padding: 0.55rem 1.25rem; font-size: 0.85rem;">
            <i class="fas fa-external-link-alt"></i> ${isAr ? 'زيارة الموقع الحي' : 'Live Website'}
          </a>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div>
            <span style="color: var(--admin-text-muted); font-size: 0.85rem;">${isAr ? 'إجمالي الحجوزات' : 'Total Reservations'}</span>
            <div class="stat-number">${resCount}</div>
            <span style="color: #2ecc71; font-size: 0.8rem;"><i class="fas fa-arrow-up"></i> ${todayResCount} ${isAr ? 'حجوزات اليوم' : 'booked for today'}</span>
          </div>
          <div class="stat-icon"><i class="fas fa-calendar-check"></i></div>
        </div>

        <div class="stat-card">
          <div>
            <span style="color: var(--admin-text-muted); font-size: 0.85rem;">${isAr ? 'أطباق القائمة' : 'Active Menu Dishes'}</span>
            <div class="stat-number">${dishesCount}</div>
            <span style="color: var(--admin-gold); font-size: 0.8rem;">${isAr ? 'موزعة على 8 تصنيفات' : 'Across 8 categories'}</span>
          </div>
          <div class="stat-icon"><i class="fas fa-utensils"></i></div>
        </div>

        <div class="stat-card">
          <div>
            <span style="color: var(--admin-text-muted); font-size: 0.85rem;">${isAr ? 'قاعدة العملاء المميزين' : 'VIP Guests & Clients'}</span>
            <div class="stat-number">${custCount}</div>
            <span style="color: #3498db; font-size: 0.8rem;">${isAr ? 'عملاء مسجلين' : 'Registered diners'}</span>
          </div>
          <div class="stat-icon"><i class="fas fa-users"></i></div>
        </div>

        <div class="stat-card">
          <div>
            <span style="color: var(--admin-text-muted); font-size: 0.85rem;">${isAr ? 'رسائل واستفسارات' : 'Inquiries & Messages'}</span>
            <div class="stat-number">${msgCount}</div>
            <span style="color: var(--admin-warning); font-size: 0.8rem;">${data.messages.filter(m => m.status === 'unread').length} ${isAr ? 'غير مقروءة' : 'pending unread'}</span>
          </div>
          <div class="stat-icon"><i class="fas fa-envelope-open-text"></i></div>
        </div>
      </div>

      <!-- Recent Reservations Quick Table -->
      <div class="admin-form-card" style="padding: 1.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h3 style="color: #ffffff; font-size: 1.2rem;"><i class="fas fa-clock" style="color: var(--admin-gold); margin-right: 0.5rem;"></i> ${isAr ? 'أحدث الحجوزات الواردة' : 'Latest Guest Reservations'}</h3>
          <button class="btn-outline-gold" style="padding: 0.4rem 1rem; font-size: 0.8rem;" onclick="PalmeAdmin.loadTab('reservations')">
            ${isAr ? 'عرض كل الحجوزات' : 'View All'}
          </button>
        </div>

        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>${isAr ? 'رقم الحجز' : 'Ref Code'}</th>
                <th>${isAr ? 'اسم الضيف' : 'Guest'}</th>
                <th>${isAr ? 'التاريخ والوقت' : 'Date & Time'}</th>
                <th>${isAr ? 'الضيوف' : 'Guests'}</th>
                <th>${isAr ? 'الحالة' : 'Status'}</th>
                <th>${isAr ? 'الإجراء' : 'Quick Actions'}</th>
              </tr>
            </thead>
            <tbody>
              ${data.reservations.slice(0, 5).map(r => `
                <tr>
                  <td style="color: var(--admin-gold); font-weight: 700;">#${r.id}</td>
                  <td><strong>${r.customer_name}</strong><br><small style="color: var(--admin-text-muted);">${r.customer_phone}</small></td>
                  <td>${r.date} @ ${r.time}</td>
                  <td>${r.guests}</td>
                  <td><span class="badge-status ${r.status.toLowerCase()}">${r.status}</span></td>
                  <td>
                    <button class="btn-action-icon" title="Confirm" onclick="PalmeAdmin.updateResStatusQuick('${r.id}', 'Confirmed')"><i class="fas fa-check" style="color: #2ecc71;"></i></button>
                    <button class="btn-action-icon" title="Cancel" onclick="PalmeAdmin.updateResStatusQuick('${r.id}', 'Cancelled')"><i class="fas fa-times" style="color: #e74c3c;"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 2. Restaurant Profile Editor
  renderRestaurantSettings: function() {
    const isAr = this.lang === 'ar';
    const rest = PalmeDB.getRestaurantInfo();
    const view = document.getElementById('admin-main-view');

    view.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 class="font-cinzel" style="font-size: 1.85rem; color: #ffffff;">${isAr ? 'إدارة هوية ومعلومات المطعم' : 'Restaurant Brand & Identity'}</h1>
        <p style="color: var(--admin-text-muted);">${isAr ? 'تعديل جميع نصوص المطعم، شعار، أوقات العمل والتواصل التي تظهر في الواجهة الرئيسية' : 'Customize public contact information, hero presentation, and story philosophy.'}</p>
      </div>

      <form id="restaurant-info-form" class="admin-form-card">
        <h3 style="color: var(--admin-gold); margin-bottom: 1.5rem; border-bottom: 1px solid var(--admin-border); padding-bottom: 0.75rem;">
          <i class="fas fa-crown"></i> ${isAr ? 'الهوية والعناوين الرئيسية' : 'Core Identity & Messaging'}
        </h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'اسم المتجر بالفرنسية (Nom officiel)' : 'Restaurant Name (French)'}</label>
            <input type="text" name="name" class="admin-input" value="${rest.name}">
          </div>
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'العنوان الثانوي (Sous-titre / Arabe)' : 'Alternate / Arabic Title'}</label>
            <input type="text" name="name_ar" class="admin-input" value="${rest.name_ar || ''}">
          </div>
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'الشعار التسويقي (الإنجليزية)' : 'Tagline / Slogan (EN)'}</label>
            <input type="text" name="tagline" class="admin-input" value="${rest.tagline}">
          </div>
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'الشعار التسويقي (العربية)' : 'Tagline / Slogan (AR)'}</label>
            <input type="text" name="tagline_ar" class="admin-input" value="${rest.tagline_ar || ''}">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'الوصف الترحيبي (الإنجليزية)' : 'Hero Subtitle (EN)'}</label>
            <textarea name="short_desc" class="admin-input" rows="3">${rest.short_desc}</textarea>
          </div>
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'الوصف الترحيبي (العربية)' : 'Hero Subtitle (AR)'}</label>
            <textarea name="short_desc_ar" class="admin-input" rows="3">${rest.short_desc_ar || ''}</textarea>
          </div>
        </div>

        <h3 style="color: var(--admin-gold); margin-bottom: 1.5rem; border-bottom: 1px solid var(--admin-border); padding-bottom: 0.75rem; margin-top: 2rem;">
          <i class="fas fa-book-open"></i> ${isAr ? 'قصة المطعم والفلسفة (قسم About)' : 'Our Story & Philosophy'}
        </h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'قصة المطعم (الإنجليزية)' : 'Story Narrative (EN)'}</label>
            <textarea name="about_story" class="admin-input" rows="4">${rest.about_story}</textarea>
          </div>
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'قصة المطعم (العربية)' : 'Story Narrative (AR)'}</label>
            <textarea name="about_story_ar" class="admin-input" rows="4">${rest.about_story_ar || ''}</textarea>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'فلسفة الطهي (الإنجليزية)' : 'Culinary Philosophy (EN)'}</label>
            <textarea name="about_philosophy" class="admin-input" rows="3">${rest.about_philosophy}</textarea>
          </div>
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'فلسفة الطهي (العربية)' : 'Culinary Philosophy (AR)'}</label>
            <textarea name="about_philosophy_ar" class="admin-input" rows="3">${rest.about_philosophy_ar || ''}</textarea>
          </div>
        </div>

        <h3 style="color: var(--admin-gold); margin-bottom: 1.5rem; border-bottom: 1px solid var(--admin-border); padding-bottom: 0.75rem; margin-top: 2rem;">
          <i class="fas fa-map-marked-alt"></i> ${isAr ? 'معلومات التواصل والموقع' : 'Concierge & Contact Details'}
        </h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'رقم الهاتف الثابت' : 'Fixed Telephone'}</label>
            <input type="text" name="phone" class="admin-input" value="${rest.phone}">
          </div>
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'رقم الواتساب (WhatsApp)' : 'WhatsApp Number'}</label>
            <input type="text" name="mobile" class="admin-input" value="${rest.mobile || ''}">
          </div>
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'رابط كتالوج قائمة واتساب' : 'WhatsApp Catalog Link'}</label>
            <input type="text" name="whatsapp_url" class="admin-input" value="${rest.whatsapp_url || ''}">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'البريد الإلكتروني' : 'Official Email'}</label>
            <input type="email" name="email" class="admin-input" value="${rest.email}">
          </div>
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'العملة المعروضة' : 'Currency Symbol'}</label>
            <input type="text" name="currency" class="admin-input" value="${rest.currency}">
          </div>
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'رمز بلس كود (Plus Code)' : 'Google Plus Code'}</label>
            <input type="text" name="plus_code" class="admin-input" value="${rest.plus_code || 'P8WM+6RC'}">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'العنوان الفعلي (EN)' : 'Physical Address (EN)'}</label>
            <input type="text" name="address" class="admin-input" value="${rest.address}">
          </div>
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'العنوان الفعلي (AR)' : 'Physical Address (AR)'}</label>
            <input type="text" name="address_ar" class="admin-input" value="${rest.address_ar || ''}">
          </div>
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'ساعات العمل (EN)' : 'Service Hours (EN)'}</label>
            <input type="text" name="opening_hours" class="admin-input" value="${rest.opening_hours}">
          </div>
          <div>
            <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">${isAr ? 'ساعات العمل (AR)' : 'Service Hours (AR)'}</label>
            <input type="text" name="opening_hours_ar" class="admin-input" value="${rest.opening_hours_ar || ''}">
          </div>
        </div>

        <div style="text-align: ${isAr ? 'left' : 'right'}; margin-top: 2rem;">
          <button type="submit" class="btn-gold" style="padding: 0.85rem 2.5rem;">
            <i class="fas fa-save"></i> ${isAr ? 'حفظ التعديلات والتحديث الفوري' : 'Save Changes & Sync'}
          </button>
        </div>
      </form>
    `;

    document.getElementById('restaurant-info-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const updated = {
        name: form.name.value,
        name_ar: form.name_ar.value,
        tagline: form.tagline.value,
        tagline_ar: form.tagline_ar.value,
        short_desc: form.short_desc.value,
        short_desc_ar: form.short_desc_ar.value,
        about_story: form.about_story.value,
        about_story_ar: form.about_story_ar.value,
        about_philosophy: form.about_philosophy.value,
        about_philosophy_ar: form.about_philosophy_ar.value,
        phone: form.phone.value,
        mobile: form.mobile ? form.mobile.value : '',
        whatsapp_url: form.whatsapp_url ? form.whatsapp_url.value : '',
        email: form.email.value,
        currency: form.currency.value,
        plus_code: form.plus_code ? form.plus_code.value : 'P8WM+6RC',
        address: form.address.value,
        address_ar: form.address_ar.value,
        opening_hours: form.opening_hours.value,
        opening_hours_ar: form.opening_hours_ar.value
      };
      PalmeDB.updateRestaurantInfo(updated);
      this.showAdminAlert(isAr ? 'تم تحديث معلومات المطعم والموقع بنجاح!' : 'Restaurant profile updated successfully!', 'success');
    });
  },

  // 3. Menu Manager
  renderMenuManager: function() {
    const isAr = this.lang === 'ar';
    const menu = PalmeDB.getMenu();
    const currency = PalmeDB.getRestaurantInfo().currency || '$';
    const view = document.getElementById('admin-main-view');

    view.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
          <h1 class="font-cinzel" style="font-size: 1.85rem; color: #ffffff;">${isAr ? 'إدارة قائمة الطعام (Menu)' : 'Culinary Menu Management'}</h1>
          <p style="color: var(--admin-text-muted);">${isAr ? 'إضافة أطباق جديدة، تعديل الأسعار، تغيير الصور وتحديد الأطباق المميزة' : 'Add dishes, update ingredients, change pricing, and toggle item visibility.'}</p>
        </div>
        <button class="btn-gold" onclick="PalmeAdmin.openDishModal()">
          <i class="fas fa-plus"></i> ${isAr ? 'إضافة طبق جديد' : 'Create New Dish'}
        </button>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>${isAr ? 'الطبق' : 'Dish'}</th>
              <th>${isAr ? 'التصنيف' : 'Category'}</th>
              <th>${isAr ? 'السعر' : 'Price'}</th>
              <th>${isAr ? 'الشارة' : 'Badge'}</th>
              <th>${isAr ? 'مميز' : 'Featured'}</th>
              <th>${isAr ? 'الحالة' : 'Status'}</th>
              <th>${isAr ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            ${menu.map(d => `
              <tr>
                <td>
                  <div style="display: flex; align-items: center; gap: 1rem;">
                    <img src="${d.image}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover; border: 1px solid var(--admin-border);" onerror="this.src='https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'">
                    <div>
                      <strong>${d.name}</strong><br>
                      <small style="color: var(--admin-text-muted);">${d.name_ar || ''}</small>
                    </div>
                  </div>
                </td>
                <td style="text-transform: capitalize;">${d.category}</td>
                <td style="color: var(--admin-gold); font-weight: 700;">${currency}${d.price}</td>
                <td><span style="background: rgba(201,160,80,0.15); color: var(--admin-gold); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem;">${d.badge || 'None'}</span></td>
                <td>${d.is_featured ? '<i class="fas fa-star" style="color: #f1c40f;"></i>' : '<i class="far fa-star" style="color: #555;"></i>'}</td>
                <td><span class="badge-status ${d.is_available !== false ? 'confirmed' : 'cancelled'}">${d.is_available !== false ? (isAr ? 'متاح' : 'Active') : (isAr ? 'مخفي' : 'Hidden')}</span></td>
                <td>
                  <button class="btn-action-icon" title="Edit" onclick="PalmeAdmin.openDishModal('${d.id}')"><i class="fas fa-edit"></i></button>
                  <button class="btn-action-icon delete" title="Delete" onclick="PalmeAdmin.deleteDish('${d.id}')"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Dish Add/Edit Modal -->
      <div id="admin-dish-modal" class="modal-overlay">
        <div class="modal-box" style="max-width: 750px;">
          <h2 id="dish-modal-title" class="font-cinzel" style="color: #ffffff; margin-bottom: 1.5rem;"></h2>
          <form id="dish-editor-form">
            <input type="hidden" name="dish_id">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'اسم الطبق (EN)' : 'Dish Name (EN)'}</label>
                <input type="text" name="dish_name" class="admin-input" required>
              </div>
              <div>
                <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'اسم الطبق (AR)' : 'Dish Name (AR)'}</label>
                <input type="text" name="dish_name_ar" class="admin-input">
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'التصنيف' : 'Category'}</label>
                <select name="dish_category" class="admin-input">
                  <option value="starters">Starters</option>
                  <option value="salads">Salads</option>
                  <option value="main courses">Main Courses</option>
                  <option value="pasta">Pasta</option>
                  <option value="seafood">Seafood</option>
                  <option value="grills">Grills</option>
                  <option value="desserts">Desserts</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>
              <div>
                <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'السعر' : 'Price'}</label>
                <input type="number" step="0.5" name="dish_price" class="admin-input" required>
              </div>
              <div>
                <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'الشارة' : 'Badge'}</label>
                <input type="text" name="dish_badge" class="admin-input" placeholder="Chef's Choice / Signature">
              </div>
            </div>

            <div style="margin-bottom: 1rem;">
              <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'رابط صورة الطبق' : 'Dish Image URL'}</label>
              <input type="url" name="dish_image" class="admin-input" required placeholder="https://...">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'الوصف (EN)' : 'Description (EN)'}</label>
                <textarea name="dish_desc" class="admin-input" rows="3" required></textarea>
              </div>
              <div>
                <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'الوصف (AR)' : 'Description (AR)'}</label>
                <textarea name="dish_desc_ar" class="admin-input" rows="3"></textarea>
              </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'المكونات' : 'Finest Ingredients'}</label>
              <input type="text" name="dish_ingredients" class="admin-input" placeholder="Caviar, Truffle, Wagyu...">
            </div>

            <div style="display: flex; gap: 2rem; margin-bottom: 1.5rem;">
              <label style="display: flex; align-items: center; gap: 0.5rem; color: #ffffff; cursor: pointer;">
                <input type="checkbox" name="dish_featured"> ${isAr ? 'طبق مميز (Featured)' : 'Featured on Landing'}
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; color: #ffffff; cursor: pointer;">
                <input type="checkbox" name="dish_available" checked> ${isAr ? 'متاح للطلب والعرض' : 'Available on Menu'}
              </label>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 1rem;">
              <button type="button" class="btn-dark" onclick="PalmeAdmin.closeDishModal()">${isAr ? 'إلغاء' : 'Cancel'}</button>
              <button type="submit" class="btn-gold">${isAr ? 'حفظ الطبق' : 'Save Dish'}</button>
            </div>
          </form>
        </div>
      </div>
    `;

    // Modal submit handler
    document.getElementById('dish-editor-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const dishObj = {
        id: form.dish_id.value || undefined,
        name: form.dish_name.value,
        name_ar: form.dish_name_ar.value,
        category: form.dish_category.value,
        price: parseFloat(form.dish_price.value) || 0,
        badge: form.dish_badge.value,
        image: form.dish_image.value,
        description: form.dish_desc.value,
        description_ar: form.dish_desc_ar.value,
        ingredients: form.dish_ingredients.value,
        is_featured: form.dish_featured.checked,
        is_available: form.dish_available.checked
      };

      PalmeDB.saveDish(dishObj);
      this.closeDishModal();
      this.renderMenuManager();
      this.showAdminAlert(isAr ? 'تم حفظ الطبق بنجاح!' : 'Dish saved successfully!', 'success');
    });
  },

  openDishModal: function(id) {
    const isAr = this.lang === 'ar';
    const modal = document.getElementById('admin-dish-modal');
    const title = document.getElementById('dish-modal-title');
    const form = document.getElementById('dish-editor-form');
    form.reset();

    if (id) {
      const dish = PalmeDB.getMenu().find(d => d.id === id);
      if (dish) {
        title.textContent = isAr ? 'تعديل طبق القائمة' : 'Modify Dish Details';
        form.dish_id.value = dish.id;
        form.dish_name.value = dish.name;
        form.dish_name_ar.value = dish.name_ar || '';
        form.dish_category.value = dish.category;
        form.dish_price.value = dish.price;
        form.dish_badge.value = dish.badge || '';
        form.dish_image.value = dish.image;
        form.dish_desc.value = dish.description;
        form.dish_desc_ar.value = dish.description_ar || '';
        form.dish_ingredients.value = dish.ingredients || '';
        form.dish_featured.checked = !!dish.is_featured;
        form.dish_available.checked = dish.is_available !== false;
      }
    } else {
      title.textContent = isAr ? 'إضافة طبق فاخر جديد' : 'Create New Luxury Dish';
      form.dish_id.value = '';
      form.dish_available.checked = true;
    }
    modal.classList.add('active');
  },

  closeDishModal: function() {
    const modal = document.getElementById('admin-dish-modal');
    if (modal) modal.classList.remove('active');
  },

  deleteDish: function(id) {
    const isAr = this.lang === 'ar';
    if (confirm(isAr ? 'هل أنت متأكد من حذف هذا الطبق؟' : 'Are you sure you want to delete this dish?')) {
      PalmeDB.deleteDish(id);
      this.renderMenuManager();
      this.showAdminAlert(isAr ? 'تم حذف الطبق بنجاح' : 'Dish removed from menu.', 'success');
    }
  },

  // 4. Reservations Manager
  renderReservationsManager: function() {
    const isAr = this.lang === 'ar';
    const reservations = PalmeDB.getReservations();
    const view = document.getElementById('admin-main-view');

    view.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
          <h1 class="font-cinzel" style="font-size: 1.85rem; color: #ffffff;">${isAr ? 'إدارة حجوزات الطاولات' : 'Table Reservations Concierge'}</h1>
          <p style="color: var(--admin-text-muted);">${isAr ? 'متابعة الحجوزات الواردة، تأكيد أو إلغاء الحجز، والبحث والفلترة' : 'Review reservation requests, manage seating status, and filter dates.'}</p>
        </div>
      </div>

      <!-- Filters Bar -->
      <div style="background: var(--admin-card); border: 1px solid var(--admin-border); border-radius: 12px; padding: 1rem 1.5rem; margin-bottom: 1.5rem; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="flex-grow: 1; min-width: 250px;">
          <input type="text" id="res-search-input" class="admin-input" placeholder="${isAr ? 'بحث بالاسم، الهاتف، أو رقم الحجز...' : 'Search by guest, phone, or ref code...'}" onkeyup="PalmeAdmin.filterReservations()">
        </div>
        <div>
          <select id="res-status-filter" class="admin-input" onchange="PalmeAdmin.filterReservations()">
            <option value="all">${isAr ? 'جميع الحالات' : 'All Statuses'}</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div class="admin-table-container">
        <table class="admin-table" id="res-table">
          <thead>
            <tr>
              <th>${isAr ? 'المرجع' : 'Code'}</th>
              <th>${isAr ? 'اسم الضيف' : 'Guest Details'}</th>
              <th>${isAr ? 'التاريخ والوقت' : 'Date & Time'}</th>
              <th>${isAr ? 'الأشخاص' : 'Party'}</th>
              <th>${isAr ? 'الملاحظات' : 'Special Notes'}</th>
              <th>${isAr ? 'الحالة' : 'Status'}</th>
              <th>${isAr ? 'تغيير الحالة' : 'Status Actions'}</th>
            </tr>
          </thead>
          <tbody id="res-table-body">
            ${this.buildReservationRows(reservations)}
          </tbody>
        </table>
      </div>
    `;
  },

  buildReservationRows: function(list) {
    const isAr = this.lang === 'ar';
    if (!list || list.length === 0) {
      return `<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--admin-text-muted);">${isAr ? 'لا توجد حجوزات مطابقة' : 'No reservations found.'}</td></tr>`;
    }

    return list.map(r => `
      <tr>
        <td style="color: var(--admin-gold); font-weight: 700;">#${r.id}</td>
        <td>
          <strong>${r.customer_name}</strong><br>
          <small style="color: var(--admin-text-muted);"><i class="fas fa-phone"></i> ${r.customer_phone}</small><br>
          <small style="color: var(--admin-text-muted);"><i class="fas fa-envelope"></i> ${r.customer_email || 'None'}</small>
        </td>
        <td>${r.date}<br><span style="color: var(--admin-gold); font-weight: 600;">${r.time}</span></td>
        <td><i class="fas fa-user-friends"></i> ${r.guests}</td>
        <td style="max-width: 250px; font-size: 0.85rem; color: var(--admin-text-muted);">${r.special_notes || '—'}</td>
        <td><span class="badge-status ${r.status.toLowerCase()}">${r.status}</span></td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <button class="btn-action-icon" title="Confirm" onclick="PalmeAdmin.updateResStatus('${r.id}', 'Confirmed')"><i class="fas fa-check" style="color: #2ecc71;"></i></button>
            <button class="btn-action-icon" title="Complete" onclick="PalmeAdmin.updateResStatus('${r.id}', 'Completed')"><i class="fas fa-flag-checkered" style="color: #3498db;"></i></button>
            <button class="btn-action-icon" title="Cancel" onclick="PalmeAdmin.updateResStatus('${r.id}', 'Cancelled')"><i class="fas fa-times" style="color: #e74c3c;"></i></button>
            <button class="btn-action-icon delete" title="Delete" onclick="PalmeAdmin.deleteRes('${r.id}')"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  filterReservations: function() {
    const query = document.getElementById('res-search-input').value.toLowerCase();
    const status = document.getElementById('res-status-filter').value;
    const all = PalmeDB.getReservations();

    const filtered = all.filter(r => {
      const matchQuery = r.customer_name.toLowerCase().includes(query) ||
                         r.customer_phone.toLowerCase().includes(query) ||
                         r.id.toLowerCase().includes(query);
      const matchStatus = status === 'all' || r.status === status;
      return matchQuery && matchStatus;
    });

    document.getElementById('res-table-body').innerHTML = this.buildReservationRows(filtered);
  },

  updateResStatus: function(id, status) {
    PalmeDB.updateReservationStatus(id, status);
    this.filterReservations();
    this.showAdminAlert(`Reservation #${id} changed to ${status}`, 'success');
  },

  updateResStatusQuick: function(id, status) {
    PalmeDB.updateReservationStatus(id, status);
    this.renderOverview();
  },

  deleteRes: function(id) {
    const isAr = this.lang === 'ar';
    if (confirm(isAr ? 'حذف هذا الحجز نهائياً؟' : 'Permanently remove this reservation?')) {
      PalmeDB.deleteReservation(id);
      this.filterReservations();
    }
  },

  // 5. Special Offers Manager
  renderOffersManager: function() {
    const isAr = this.lang === 'ar';
    const offers = PalmeDB.getOffers();
    const view = document.getElementById('admin-main-view');

    view.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
          <h1 class="font-cinzel" style="font-size: 1.85rem; color: #ffffff;">${isAr ? 'إدارة العروض الخاصة' : 'Bespoke Offers & Specials'}</h1>
          <p style="color: var(--admin-text-muted);">${isAr ? 'إنشاء عروض المواسم وعطلات نهاية الأسبوع وتفعيلها وإلغاؤها' : 'Curate promotions, tasting menus, and seasonal experiences.'}</p>
        </div>
        <button class="btn-gold" onclick="PalmeAdmin.openOfferModal()">
          <i class="fas fa-plus"></i> ${isAr ? 'إنشاء عرض جديد' : 'New Curated Offer'}
        </button>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>${isAr ? 'العرض' : 'Offer Title'}</th>
              <th>${isAr ? 'الوسم' : 'Tag'}</th>
              <th>${isAr ? 'الميزة/الخصم' : 'Benefit'}</th>
              <th>${isAr ? 'فترة الصلاحية' : 'Valid Until'}</th>
              <th>${isAr ? 'الحالة' : 'Status'}</th>
              <th>${isAr ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            ${offers.map(o => `
              <tr>
                <td><strong>${o.title}</strong><br><small style="color: var(--admin-text-muted);">${o.title_ar || ''}</small></td>
                <td><span style="color: var(--admin-gold); font-size: 0.8rem; background: rgba(201,160,80,0.1); padding: 0.2rem 0.5rem; border-radius: 4px;">${o.tag}</span></td>
                <td>${o.discount}</td>
                <td>${o.end_date || 'Ongoing'}</td>
                <td><span class="badge-status ${o.is_active !== false ? 'confirmed' : 'cancelled'}">${o.is_active !== false ? 'Active' : 'Disabled'}</span></td>
                <td>
                  <button class="btn-action-icon" title="Edit" onclick="PalmeAdmin.openOfferModal('${o.id}')"><i class="fas fa-edit"></i></button>
                  <button class="btn-action-icon delete" title="Delete" onclick="PalmeAdmin.deleteOffer('${o.id}')"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Offer Modal -->
      <div id="admin-offer-modal" class="modal-overlay">
        <div class="modal-box" style="max-width: 650px;">
          <h2 id="offer-modal-title" class="font-cinzel" style="color: #ffffff; margin-bottom: 1.5rem;"></h2>
          <form id="offer-form">
            <input type="hidden" name="offer_id">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'العنوان (EN)' : 'Title (EN)'}</label>
                <input type="text" name="offer_title" class="admin-input" required>
              </div>
              <div>
                <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'العنوان (AR)' : 'Title (AR)'}</label>
                <input type="text" name="offer_title_ar" class="admin-input">
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'الوسم (EN)' : 'Tag (EN)'}</label>
                <input type="text" name="offer_tag" class="admin-input" placeholder="Weekend Special">
              </div>
              <div>
                <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'الوسم (AR)' : 'Tag (AR)'}</label>
                <input type="text" name="offer_tag_ar" class="admin-input" placeholder="عرض نهاية الأسبوع">
              </div>
            </div>

            <div style="margin-bottom: 1rem;">
              <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'الميزة أو الخصم' : 'Discount / Degustation Detail'}</label>
              <input type="text" name="offer_discount" class="admin-input" required placeholder="Chef's 7-Course / 20% Off">
            </div>

            <div style="margin-bottom: 1rem;">
              <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'رابط الصورة' : 'Image URL'}</label>
              <input type="url" name="offer_image" class="admin-input" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'الوصف (EN)' : 'Description (EN)'}</label>
                <textarea name="offer_desc" class="admin-input" rows="3" required></textarea>
              </div>
              <div>
                <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'الوصف (AR)' : 'Description (AR)'}</label>
                <textarea name="offer_desc_ar" class="admin-input" rows="3"></textarea>
              </div>
            </div>

            <label style="display: flex; align-items: center; gap: 0.5rem; color: #ffffff; cursor: pointer; margin-bottom: 1.5rem;">
              <input type="checkbox" name="offer_active" checked> ${isAr ? 'العرض مفعل على الصفحة الرئيسية' : 'Active and published'}
            </label>

            <div style="display: flex; justify-content: flex-end; gap: 1rem;">
              <button type="button" class="btn-dark" onclick="PalmeAdmin.closeOfferModal()">${isAr ? 'إلغاء' : 'Cancel'}</button>
              <button type="submit" class="btn-gold">${isAr ? 'حفظ العرض' : 'Save Offer'}</button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.getElementById('offer-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      PalmeDB.saveOffer({
        id: form.offer_id.value || undefined,
        title: form.offer_title.value,
        title_ar: form.offer_title_ar.value,
        tag: form.offer_tag.value,
        tag_ar: form.offer_tag_ar.value,
        discount: form.offer_discount.value,
        discount_ar: form.offer_discount.value,
        image: form.offer_image.value,
        description: form.offer_desc.value,
        description_ar: form.offer_desc_ar.value,
        is_active: form.offer_active.checked
      });
      this.closeOfferModal();
      this.renderOffersManager();
    });
  },

  openOfferModal: function(id) {
    const isAr = this.lang === 'ar';
    const modal = document.getElementById('admin-offer-modal');
    const form = document.getElementById('offer-form');
    const title = document.getElementById('offer-modal-title');
    form.reset();

    if (id) {
      const o = PalmeDB.getOffers().find(item => item.id === id);
      if (o) {
        title.textContent = isAr ? 'تعديل العرض' : 'Edit Curated Offer';
        form.offer_id.value = o.id;
        form.offer_title.value = o.title;
        form.offer_title_ar.value = o.title_ar || '';
        form.offer_tag.value = o.tag;
        form.offer_tag_ar.value = o.tag_ar || '';
        form.offer_discount.value = o.discount;
        form.offer_image.value = o.image;
        form.offer_desc.value = o.description;
        form.offer_desc_ar.value = o.description_ar || '';
        form.offer_active.checked = o.is_active !== false;
      }
    } else {
      title.textContent = isAr ? 'إنشاء عرض راقٍ جديد' : 'Create Special Offer';
      form.offer_id.value = '';
      form.offer_active.checked = true;
    }
    modal.classList.add('active');
  },

  closeOfferModal: function() {
    const modal = document.getElementById('admin-offer-modal');
    if (modal) modal.classList.remove('active');
  },

  deleteOffer: function(id) {
    if (confirm('Delete this promotion?')) {
      PalmeDB.deleteOffer(id);
      this.renderOffersManager();
    }
  },

  // 6. Gallery Manager
  renderGalleryManager: function() {
    const isAr = this.lang === 'ar';
    const gallery = PalmeDB.getGallery();
    const view = document.getElementById('admin-main-view');

    view.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
          <h1 class="font-cinzel" style="font-size: 1.85rem; color: #ffffff;">${isAr ? 'إدارة معرض الصور' : 'Visual Gallery Curation'}</h1>
          <p style="color: var(--admin-text-muted);">${isAr ? 'إضافة صور المطعم، الأطباق، التراس، الطهاة وتعديل تصنيفاتها' : 'Manage high-resolution imagery of interior salons, dishes, and culinary team.'}</p>
        </div>
        <button class="btn-gold" onclick="PalmeAdmin.openGalleryModal()">
          <i class="fas fa-plus"></i> ${isAr ? 'إضافة صورة جديدة' : 'Add Photo to Gallery'}
        </button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
        ${gallery.map(g => `
          <div style="background: var(--admin-card); border: 1px solid var(--admin-border); border-radius: 12px; overflow: hidden; position: relative;">
            <div style="height: 180px; overflow: hidden;">
              <img src="${g.image}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="padding: 1.25rem;">
              <strong style="color: #ffffff; display: block; margin-bottom: 0.25rem;">${g.title}</strong>
              <span style="color: var(--admin-gold); font-size: 0.75rem; text-transform: uppercase;">${g.category}</span>
              <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem;">
                <button class="btn-action-icon delete" onclick="PalmeAdmin.deleteGalleryItem('${g.id}')"><i class="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Add Photo Modal -->
      <div id="admin-gallery-modal" class="modal-overlay">
        <div class="modal-box" style="max-width: 550px;">
          <h2 class="font-cinzel" style="color: #ffffff; margin-bottom: 1.5rem;">${isAr ? 'إضافة صورة إلى المعرض' : 'Add Gallery Photograph'}</h2>
          <form id="gallery-form">
            <div style="margin-bottom: 1rem;">
              <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'عنوان الصورة (EN)' : 'Title (EN)'}</label>
              <input type="text" name="gal_title" class="admin-input" required>
            </div>
            <div style="margin-bottom: 1rem;">
              <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'عنوان الصورة (AR)' : 'Title (AR)'}</label>
              <input type="text" name="gal_title_ar" class="admin-input">
            </div>
            <div style="margin-bottom: 1rem;">
              <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'التصنيف' : 'Category'}</label>
              <select name="gal_category" class="admin-input">
                <option value="interior">Interior & Salons</option>
                <option value="dishes">Haute Cuisine Dishes</option>
                <option value="chefs">Master Chefs</option>
                <option value="events">Private Events</option>
              </select>
            </div>
            <div style="margin-bottom: 1.5rem;">
              <label style="font-size: 0.8rem; color: var(--admin-text-muted);">${isAr ? 'رابط الصورة المباشر' : 'Direct Image URL'}</label>
              <input type="url" name="gal_image" class="admin-input" required placeholder="https://images.unsplash.com/...">
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 1rem;">
              <button type="button" class="btn-dark" onclick="PalmeAdmin.closeGalleryModal()">${isAr ? 'إلغاء' : 'Cancel'}</button>
              <button type="submit" class="btn-gold">${isAr ? 'إضافة الصورة' : 'Add Image'}</button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.getElementById('gallery-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      PalmeDB.saveGalleryItem({
        title: form.gal_title.value,
        title_ar: form.gal_title_ar.value,
        category: form.gal_category.value,
        image: form.gal_image.value
      });
      this.closeGalleryModal();
      this.renderGalleryManager();
    });
  },

  openGalleryModal: function() {
    const modal = document.getElementById('admin-gallery-modal');
    if (modal) modal.classList.add('active');
  },

  closeGalleryModal: function() {
    const modal = document.getElementById('admin-gallery-modal');
    if (modal) modal.classList.remove('active');
  },

  deleteGalleryItem: function(id) {
    if (confirm('Delete this photo from gallery?')) {
      PalmeDB.deleteGalleryItem(id);
      this.renderGalleryManager();
    }
  },

  // 7. Customers Manager
  renderCustomersManager: function() {
    const isAr = this.lang === 'ar';
    const customers = PalmeDB.getAll().customers || [];
    const view = document.getElementById('admin-main-view');

    view.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 class="font-cinzel" style="font-size: 1.85rem; color: #ffffff;">${isAr ? 'قاعدة بيانات الضيوف والعملاء' : 'VIP Guests Directory'}</h1>
        <p style="color: var(--admin-text-muted);">${isAr ? 'سجل تفاعل الضيوف، عدد الحجوزات وتاريخ آخر زيارة' : 'Track loyal diners, booking history and concierge preferences.'}</p>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>${isAr ? 'الضيف' : 'Guest Name'}</th>
              <th>${isAr ? 'الهاتف' : 'Telephone'}</th>
              <th>${isAr ? 'البريد الإلكتروني' : 'Email'}</th>
              <th>${isAr ? 'عدد الحجوزات' : 'Bookings'}</th>
              <th>${isAr ? 'آخر زيارة / حجز' : 'Last Visited'}</th>
              <th>${isAr ? 'تصنيف الضيف' : 'Tier'}</th>
            </tr>
          </thead>
          <tbody>
            ${customers.map(c => `
              <tr>
                <td><strong>${c.name}</strong></td>
                <td>${c.phone}</td>
                <td>${c.email}</td>
                <td style="color: var(--admin-gold); font-weight: 700;">${c.reservations_count}</td>
                <td>${c.last_reservation}</td>
                <td><span style="background: rgba(201,160,80,0.15); color: var(--admin-gold-light); padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: 700;">VIP GOLD</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // 8. Contact Inquiries & Messages
  renderMessagesManager: function() {
    const isAr = this.lang === 'ar';
    const messages = PalmeDB.getMessages();
    const view = document.getElementById('admin-main-view');

    view.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 class="font-cinzel" style="font-size: 1.85rem; color: #ffffff;">${isAr ? 'رسائل واستفسارات الضيوف' : 'Guest Inquiries & Messages'}</h1>
        <p style="color: var(--admin-text-muted);">${isAr ? 'الرسائل الواردة من نموذج تواصل معنا (Contact Us)' : 'Direct messages received through the official concierge contact form.'}</p>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>${isAr ? 'المرسل' : 'Sender'}</th>
              <th>${isAr ? 'الموضوع' : 'Subject'}</th>
              <th>${isAr ? 'الرسالة' : 'Message'}</th>
              <th>${isAr ? 'التاريخ' : 'Date'}</th>
              <th>${isAr ? 'الحالة' : 'Status'}</th>
              <th>${isAr ? 'الإجراء' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            ${messages.map(m => `
              <tr>
                <td><strong>${m.name}</strong><br><small style="color: var(--admin-text-muted);">${m.email}</small></td>
                <td style="font-weight: 600; color: var(--admin-gold);">${m.subject || 'Inquiry'}</td>
                <td style="max-width: 380px; font-size: 0.88rem; color: var(--admin-text-main);">${m.message}</td>
                <td><small style="color: var(--admin-text-muted);">${m.date}</small></td>
                <td><span class="badge-status ${m.status === 'read' ? 'confirmed' : 'pending'}">${m.status}</span></td>
                <td>
                  <button class="btn-action-icon" title="Mark Read" onclick="PalmeAdmin.markMessageRead('${m.id}')"><i class="fas fa-envelope-open"></i></button>
                  <button class="btn-action-icon delete" title="Delete" onclick="PalmeAdmin.deleteMessage('${m.id}')"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  markMessageRead: function(id) {
    PalmeDB.markMessageRead(id);
    this.renderMessagesManager();
  },

  deleteMessage: function(id) {
    if (confirm('Remove message?')) {
      PalmeDB.deleteMessage(id);
      this.renderMessagesManager();
    }
  },

  // 8.5 Google Reviews Manager
  renderReviewsManager: function() {
    const isAr = this.lang === 'ar';
    const reviews = PalmeDB.getReviews();
    const summary = PalmeDB.getReviewsSummary();
    const view = document.getElementById('admin-main-view');

    view.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 class="font-cinzel" style="font-size: 1.85rem; color: #ffffff;">${isAr ? 'إدارة مراجعات وتقييمات خرائط جوجل' : 'Google Reviews & Rating Management'}</h1>
        <p style="color: var(--admin-text-muted);">${isAr ? 'متابعة تقييمات الزوار (4.2 من 51 مراجعة)، والرد عليها باسم المالك' : 'Manage customer feedback from Google Maps, respond to reviews, and track satisfaction.'}</p>
      </div>

      <div class="stats-grid" style="margin-bottom: 2rem;">
        <div class="stat-card">
          <div>
            <span style="color: var(--admin-text-muted); font-size: 0.85rem;">${isAr ? 'التقييم العام' : 'Overall Rating'}</span>
            <div class="stat-number" style="color: var(--admin-gold);">${summary.average} ★</div>
            <span style="color: #2ecc71; font-size: 0.8rem;">${isAr ? 'معتمد على خرائط جوجل' : 'Verified Google Maps'}</span>
          </div>
          <div class="stat-icon"><i class="fas fa-star"></i></div>
        </div>
        <div class="stat-card">
          <div>
            <span style="color: var(--admin-text-muted); font-size: 0.85rem;">${isAr ? 'إجمالي المراجعات' : 'Total Reviews'}</span>
            <div class="stat-number">${summary.total}</div>
            <span style="color: #3498db; font-size: 0.8rem;">${isAr ? 'مراجعة موثقة' : 'Customer reviews'}</span>
          </div>
          <div class="stat-icon"><i class="fas fa-comments"></i></div>
        </div>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>${isAr ? 'الكاتب' : 'Reviewer'}</th>
              <th>${isAr ? 'التقييم' : 'Rating'}</th>
              <th>${isAr ? 'نص المراجعة' : 'Review Content'}</th>
              <th>${isAr ? 'التاريخ' : 'Date'}</th>
              <th>${isAr ? 'رد المالك' : 'Owner Reply'}</th>
              <th>${isAr ? 'الإجراء' : 'Action'}</th>
            </tr>
          </thead>
          <tbody>
            ${reviews.map(r => `
              <tr>
                <td><strong>${r.author}</strong><br><small style="color: var(--admin-text-muted);">${r.author_desc || ''}</small></td>
                <td><span style="color: #f1c40f; font-weight: 700;">${'★'.repeat(r.rating)}</span></td>
                <td style="max-width: 380px; font-size: 0.88rem; line-height: 1.5;">${r.text}</td>
                <td><small style="color: var(--admin-text-muted);">${r.date_relative || ''}</small></td>
                <td style="max-width: 250px; font-size: 0.82rem; color: ${r.owner_response ? 'var(--admin-gold-light)' : 'var(--admin-text-muted)'};">
                  ${r.owner_response ? `<i class="fas fa-check" style="color: #2ecc71;"></i> ${r.owner_response}` : (isAr ? 'لم يتم الرد بعد' : 'No reply yet')}
                </td>
                <td>
                  <button class="btn-action-icon" title="Reply as Owner" onclick="PalmeAdmin.replyToReview('${r.id}')"><i class="fas fa-reply"></i></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  replyToReview: function(id) {
    const isAr = this.lang === 'ar';
    const reviews = PalmeDB.getReviews();
    const rev = reviews.find(r => r.id === id);
    if (!rev) return;

    const reply = prompt(isAr ? `الرد باسم المالك على مراجعة ${rev.author}:` : `Reply as Owner to ${rev.author}:`, rev.owner_response || '');
    if (reply !== null) {
      rev.owner_response = reply;
      rev.owner_response_date = isAr ? 'الآن' : 'Just now';
      PalmeDB.saveAll(PalmeDB.getAll());
      this.renderReviewsManager();
      this.showAdminAlert(isAr ? 'تم حفظ رد المالك بنجاح!' : 'Owner response saved!', 'success');
    }
  },

  // 9. System Settings & SEO
  renderSystemSettings: function() {
    const isAr = this.lang === 'ar';
    const rest = PalmeDB.getRestaurantInfo();
    const view = document.getElementById('admin-main-view');

    view.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h1 class="font-cinzel" style="font-size: 1.85rem; color: #ffffff;">${isAr ? 'إعدادات النظام وSEO' : 'Global Settings & SEO'}</h1>
        <p style="color: var(--admin-text-muted);">${isAr ? 'التحكم في عنوان الصفحة، الكلمات الدلالية، والتهيئة الشاملة' : 'Configure meta descriptions, language defaults, and reset options.'}</p>
      </div>

      <div class="admin-form-card" style="max-width: 800px;">
        <h3 style="color: var(--admin-gold); margin-bottom: 1.5rem;"><i class="fas fa-search"></i> ${isAr ? 'محركات البحث (SEO)' : 'Search Engine Optimization'}</h3>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">SEO Title</label>
          <input type="text" id="seo-title-input" class="admin-input" value="${rest.seo_title || 'PALME PLACE | Ultra-Luxury Fine Dining Restaurant'}">
        </div>

        <div style="margin-bottom: 2rem;">
          <label style="font-size: 0.85rem; color: var(--admin-text-muted); display: block; margin-bottom: 0.4rem;">Meta Description</label>
          <textarea id="seo-desc-input" class="admin-input" rows="3">${rest.seo_desc || 'Discover refined haute cuisine at PALME PLACE.'}</textarea>
        </div>

        <button class="btn-gold" onclick="PalmeAdmin.saveSeoSettings()">
          <i class="fas fa-save"></i> ${isAr ? 'حفظ إعدادات SEO' : 'Save SEO Configurations'}
        </button>

        <hr style="border: 0; border-top: 1px solid var(--admin-border); margin: 3rem 0 2rem;">

        <h3 style="color: var(--admin-danger); margin-bottom: 1rem;"><i class="fas fa-exclamation-triangle"></i> ${isAr ? 'إعادة ضبط قاعدة البيانات' : 'System Reset & Defaults'}</h3>
        <p style="color: var(--admin-text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
          ${isAr ? 'إعادة تعيين كافة الأطباق، العروض والصور إلى الحالة الافتراضية الأولية' : 'Restores all demo dishes, high-res photos, and sample reservations back to initial state.'}
        </p>
        <button class="btn-dark" style="border-color: var(--admin-danger); color: var(--admin-danger);" onclick="PalmeAdmin.resetDatabase()">
          <i class="fas fa-redo"></i> ${isAr ? 'استعادة البيانات الافتراضية' : 'Restore Demo Database'}
        </button>
      </div>
    `;
  },

  saveSeoSettings: function() {
    const isAr = this.lang === 'ar';
    const title = document.getElementById('seo-title-input').value;
    const desc = document.getElementById('seo-desc-input').value;
    PalmeDB.updateRestaurantInfo({ seo_title: title, seo_desc: desc });
    this.showAdminAlert(isAr ? 'تم حفظ إعدادات SEO بنجاح!' : 'SEO settings updated!', 'success');
  },

  resetDatabase: function() {
    const isAr = this.lang === 'ar';
    if (confirm(isAr ? 'هل أنت متأكد من استعادة البيانات الافتراضية؟' : 'Are you sure you want to reset all data to default demo state?')) {
      PalmeDB.resetToDefaults();
      this.loadTab('overview');
      this.showAdminAlert(isAr ? 'تمت استعادة البيانات الافتراضية' : 'System reset to default state!', 'success');
    }
  },

  showAdminAlert: function(msg, type = 'info') {
    alert(msg);
  }
};

// Initialize Admin on load
document.addEventListener('DOMContentLoaded', () => {
  PalmeAdmin.init();
});
