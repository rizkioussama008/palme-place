/**
 * PALME PLACE / PALM PALACE RESTAURANTS AND COFFEE
 * Core Data Storage & Management System
 * Updated with official Google Maps business profile & Smara location
 */

const PALME_STORAGE_KEY = 'palm_palace_smara_db_v3';
const PALME_AUTH_KEY = 'palme_place_admin_session';

const DEFAULT_STORE_DATA = {
  restaurant: {
    name: "PALM PALACE RESTAURANTS ET CAFÉ",
    name_fr: "PALM PALACE RESTAURANTS ET CAFÉ",
    name_ar: "PALM PALACE RESTAURANTS ET CAFÉ",
    tagline: "Restaurant Gastronomique & Café Spécialité à Smara",
    tagline_fr: "Restaurant Gastronomique & Café Spécialité à Smara",
    tagline_ar: "أرقى المأكولات والمشروبات والقهوة المختصة في السمارة",
    short_desc: "Une expérience culinaire et café d'exception à Smara. Savourez nos plats raffinés, grillades au feu de bois, cafés italiens et service chaleureux dans un cadre élégant.",
    short_desc_fr: "Une expérience culinaire et café d'exception à Smara. Savourez nos plats raffinés, grillades au feu de bois, cafés italiens et service chaleureux dans un cadre élégant.",
    short_desc_ar: "وجهتكم الأولى في السمارة لتناول أشهى الوجبات والمأكولات الراقية والقهوة المميزة. نجمع بين روعة المذاق، دفء الاستقبال، وأعلى معايير النظافة والجودة.",
    about_story: "Fondé au cœur de Smara, PALM PALACE RESTAURANTS ET CAFÉ réunit le plaisir d'une table gourmande et l'art du café de spécialité. Nous accueillons nos convives dans une ambiance raffinée et moderne avec une équipe dévouée et professionnelle.",
    about_story_fr: "Fondé au cœur de Smara, PALM PALACE RESTAURANTS ET CAFÉ réunit le plaisir d'une table gourmande et l'art du café de spécialité. Nous accueillons nos convives dans une ambiance raffinée et moderne avec une équipe dévouée et professionnelle.",
    about_story_ar: "تأسس 'بالم بالاس ريستورانت آند كوفي' في مدينة السمارة ليكون الوجهة المثالية لعشاق الأكل اللذيذ والقهوة الراقية. نوفر لضيوفنا أجواء عصرية مريحة مع طاقم عمل ودود ومهني، وقائمة طعام غنية تلبي كافة الأذواق من وجبات الإفطار والقهوة المختصة إلى أطباق الغداء والعشاء والمشاوي والحلويات.",
    about_philosophy: "Fraîcheur, propreté irréprochable et passion du goût sont au cœur de nos créations quotidiennes pour satisfaire les palais les plus exigeants.",
    about_philosophy_fr: "Fraîcheur, propreté irréprochable et passion du goût sont au cœur de nos créations quotidiennes pour satisfaire les palais les plus exigeants.",
    about_philosophy_ar: "الجودة، النظافة، وحسن الاستقبال هي مبادؤنا الأساسية. نحرص يومياً على اختيار أجود المكونات الطازجة لتقديم أطباق شهية ترقى لتطلعات زبنائنا الكرام مع خدمة سريعة ونظيفة.",
    phone: "05 28 89 98 36",
    mobile: "+212 626-843967",
    whatsapp_url: "https://wa.me/p/25362888006707310/212626843967",
    whatsapp_number: "212626843967",
    email: "contact@palmpalace.ma",
    address: "P8WM+6RC, Smara 72000, Maroc",
    address_fr: "P8WM+6RC, Smara 72000, Maroc",
    address_ar: "P8WM+6RC، السمارة 72000، المملكة المغربية",
    plus_code: "P8WM+6RC",
    city: "Smara / السمارة",
    postal_code: "72000",
    opening_hours: "Lundi – Dimanche : 07h00 – 00h30",
    opening_hours_fr: "Lundi – Dimanche : 07h00 – 00h30",
    opening_hours_ar: "طوال أيام الأسبوع: من 07:00 صباحاً حتى 00:30 بعد منتصف الليل",
    rating: 4.2,
    reviews_count: 51,
    services: [
      { id: "dine_in", fr: "Repas sur place", en: "Dine-in", ar: "الجلوس داخل المكان", icon: "fa-chair" },
      { id: "curbside", fr: "Vente à emporter / Voiture", en: "Curbside pickup", ar: "الإيصال إلى السيارة", icon: "fa-car" },
      { id: "contactless", fr: "Livraison sans contact", en: "Contactless delivery", ar: "التسليم بدون تلامس", icon: "fa-shield-virus" },
      { id: "takeaway", fr: "À emporter", en: "Takeaway", ar: "طلبات السفري", icon: "fa-shopping-bag" }
    ],
    hero_image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=85",
    about_image_1: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
    about_image_2: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    chef_name: "Équipe Palm Palace",
    chef_title: "Maîtres Cuisiniers & Baristas",
    chef_title_fr: "Maîtres Cuisiniers & Baristas",
    chef_title_ar: "فريق الطهاة والقهوة المختصة",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    google_maps_url: "https://maps.google.com/?q=P8WM%2B6RC,+Smara+72000",
    currency: "DH",
    default_lang: "fr",
    seo_title: "PALM PALACE RESTAURANTS ET CAFÉ | Smara 72000",
    seo_desc: "Restaurant & Café d'exception à Smara. Grillades, burgers gourmets, frites dorées, café de spécialité et service sur place ou à emporter."
  },

  reviews_summary: {
    average: 4.2,
    total: 51,
    breakdown: {
      star5: 32,
      star4: 11,
      star3: 4,
      star2: 2,
      star1: 2
    },
    highlights: ["النظافة", "بطاطس مقلية", "الاستقبال الراقي", "الأكل اللذيذ", "القهوة"]
  },

  reviews: [
    {
      id: "rev-1",
      author: "Le goût Parfait",
      author_desc: "مراجعة واحدة · صورتان (2)",
      rating: 5,
      date_relative: "قبل سنة",
      date_relative_en: "1 year ago",
      text: "أود أن أعبر عن إعجابي الكبير بالأكل اللذيذ والاستقبال الراقية في مطعمكم. رغم أنه افتتاحه حديث، إلا أن كل شيء كان في المستوى: الجودة، التنظيم، والنظافة. أتمنى من القلب أن تحافظوا على هذا المستوى الممتاز، وأن يكون مطعمكم أفضل في المدينة. بالتوفيق في هذا المشوار، ولكم كل الدعم!",
      text_en: "I would like to express my great admiration for the delicious food and upscale reception in your restaurant. Everything was top-notch: quality, organization, and cleanliness.",
      owner_response: "شكراً جزيلاً على تقييمك الإيجابي وكلماتك الطيبة 🌟 كنفتاخرو أن تجربتك كانت في المستوى، وهدفنا ديماً هو رضا الزبناء وتقديم أفضل ما يمكن.",
      owner_response_date: "قبل سنة"
    },
    {
      id: "rev-2",
      author: "abdeabde",
      author_desc: "مراجعة واحدة",
      rating: 5,
      date_relative: "قبل 7 أشهر",
      date_relative_en: "7 months ago",
      text: "النظافة و تعامل ديال لوليدات ماشاء الله . داكشي لي طلب بنين و زوين واخا كان شي شوية ديال تأخير . ولكن على العموم كيبقاو أحسن وحدين فهاد لمدينة.",
      text_en: "Cleanliness and staff manners are wonderful mashallah. Everything ordered was delicious and tasty. Overall they remain the best in this city.",
      owner_response: "شكراً لك أخي الكريم على ثقتك وملاحظتك القيمة، دائماً في خدمتكم ونسعى لتطوير السرعة والجودة باستمرار!",
      owner_response_date: "قبل 7 أشهر"
    },
    {
      id: "rev-3",
      author: "ismaail dalass",
      author_desc: "6 مراجعات",
      rating: 4,
      date_relative: "قبل 8 أشهر",
      date_relative_en: "8 months ago",
      text: "كل شيئ لا باس به فقط لم تعجبني بطاطس الفريت ليست بطاطة مخصصة للقلي وطريقة تقشير غير جيدة غير نضيفة من قشور وفقكم الله.",
      text_en: "Everything was good, only the French fries needed improvement. May Allah grant you success.",
      owner_response: "شكراً جزيلاً على الملاحظة الصريحة أخي إسماعيل. تم أخذ ملاحظتك بعين الاعتبار وتم تحسين نوعية البطاطس وطريقة تحضيرها لتكون مقرمشة ونظيفة 100%.",
      owner_response_date: "قبل 8 أشهر"
    },
    {
      id: "rev-4",
      author: "Yassine El Amrani",
      author_desc: "مرشد محلي · 18 مراجعة",
      rating: 5,
      date_relative: "قبل 3 أشهر",
      date_relative_en: "3 months ago",
      text: "أفضل كافيه ومطعم في السمارة، قهوة رائعة جداً وسندويتشات ومشاوي ولا أروع. المكان هادئ ومثالي للعائلات والأصدقاء.",
      text_en: "The best cafe and restaurant in Smara! Superb coffee, sandwiches and grills. Very quiet and ideal for families.",
      owner_response: null,
      owner_response_date: null
    }
  ],

  categories: [
    { id: "all", name: "All Menu", name_ar: "كل القائمة" },
    { id: "coffee", name: "Coffee & Drinks", name_ar: "القهوة والمشروبات" },
    { id: "breakfast", name: "Breakfast", name_ar: "الفطور والصباحيات" },
    { id: "grills", name: "Grills & Platters", name_ar: "المشاوي والأطباق" },
    { id: "burgers", name: "Burgers & Sandwiches", name_ar: "البرغر والسندويتش" },
    { id: "pizza", name: "Pizza & Tacos", name_ar: "البيتزا والتاكوس" },
    { id: "fries", name: "Sides & Fries", name_ar: "بطاطا مقلية والمقبلات" },
    { id: "desserts", name: "Desserts & Juices", name_ar: "الحلويات والعصائر" }
  ],

  menu: [
    {
      id: "dish-c1",
      name: "Palm Palace Espresso Supreme",
      name_ar: "إسبريسو بالم بالاس الخاص",
      category: "coffee",
      price: 18,
      description: "Rich Italian roast 100% Arabica espresso with golden velvety crema and intense aromatic notes.",
      description_ar: "قهوة إسبريسو غنية ومحضرة من حبوب أرابيكا 100% برغوة ذهبية حريرية ومذاق متوازن.",
      ingredients: "Premium Arabica Beans, Filtered Artesian Water",
      badge: "Signature Coffee",
      is_featured: true,
      is_available: true,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dish-c2",
      name: "Spanish Café Latte Gourmet",
      name_ar: "سبانش لاتيه غورميه مثلج أو ساخن",
      category: "coffee",
      price: 26,
      description: "Smooth steamed whole milk, layered rich espresso, sweet condensed milk, and light cinnamon dust.",
      description_ar: "مزيج ناعم من الحليب الطازج والإسبريسو المركز مع الحليب المكثف ولمسة قرفة ناعمة.",
      ingredients: "Fresh Milk, Condensed Milk, Double Shot Espresso",
      badge: "Best Seller",
      is_featured: true,
      is_available: true,
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dish-g1",
      name: "Royal Mixed Grill Platter",
      name_ar: "طبق المشاوي الملكي المشكل",
      category: "grills",
      price: 95,
      description: "Tender beef brochettes, seasoned minced kefta, and marinated chicken skewers served with saffron rice, grilled vegetables, and crispy golden fries.",
      description_ar: "تشكيلة فاخرة من قطبان اللحم الطري، كفتة متبلة على الجمر، وقطبان الدجاج مع الأرز والصلصات وبطاطس فريت مقرمشة.",
      ingredients: "Prime Beef, Kefta, Marinated Poultry, Charcoal Grill, Golden Fries",
      badge: "Chef's Choice",
      is_featured: true,
      is_available: true,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dish-b1",
      name: "Smara Gourmet Beef Burger",
      name_ar: "برغر السمارة البقري الفاخر",
      category: "burgers",
      price: 55,
      description: "100% pure Moroccan minced beef patty grilled to perfection, cheddar cheese, caramelized onions, crisp lettuce, house secret sauce, and signature homemade fries.",
      description_ar: "لحم بقري طازج 100% مشوي بعناية، جبنة شيدر ذائبة، بصل مكرمل، صوص بالم بالاس الخاص مع بطاطس مقلية ذهبية ونظيفة.",
      ingredients: "Pure Ground Beef, Brioche Bun, Cheddar, Special Sauce, Fresh Cut Fries",
      badge: "Popular",
      is_featured: true,
      is_available: true,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dish-f1",
      name: "Golden Hand-Cut Seasoned Fries",
      name_ar: "بطاطا مقلية (فريت) مقرمشة ومتبلة",
      category: "fries",
      price: 20,
      description: "Carefully selected premium frying potatoes, peeled fresh, double-fried to golden crispy perfection with special house herb seasoning.",
      description_ar: "بطاطس عالية الجودة مخصصة للقلي، مقشرة بعناية ونظيفة تماماً، مقلية على مرحلتين لقرمشة مثالية مع بهارات الأعشاب الخاصة.",
      ingredients: "Select Potatoes, Special Herb Salt, Organic Frying Oil, Dipping Sauces",
      badge: "Customer Favorite",
      is_featured: true,
      is_available: true,
      image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dish-t1",
      name: "Palm Palace Special French Tacos",
      name_ar: "تاكوس بالم بالاس المميز بالصلصة الجزائرية",
      category: "pizza",
      price: 45,
      description: "Tortilla wrapped and toasted with tender marinated chicken tenders, kefta, crispy fries inside, and our signature rich Gruyère cheese sauce.",
      description_ar: "خبز تورتيلا محمص محشو بقطع الدجاج المتبل، كفتة، بطاطس فريت، وصلصة الجبن الكريمية اللذيذة.",
      ingredients: "Chicken, Kefta, French Fries, Gruyère Cheese Sauce, Tortilla",
      badge: "Hot & Tasty",
      is_featured: true,
      is_available: true,
      image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dish-br1",
      name: "Traditional Fassi & Beldi Breakfast",
      name_ar: "فطور بالم بالاس البلدي الكامل",
      category: "breakfast",
      price: 40,
      description: "Fresh Moroccan mint tea or coffee, eggs with khlii or olive oil, fresh amlou, pure honey, Moroccan olives, fresh warm bread, and orange juice.",
      description_ar: "إفطار مغربي متكامل يضم براد أتاي أو قهوة، بيض بلدي، زيت زيتون بكر، أملو، عسل حر، زيتون، خبز طازج وعصير برتقال طبيعي.",
      ingredients: "Organic Olive Oil, Beldi Eggs, Fresh Mint Tea, Amlou, Honey, Bread",
      badge: "Morning Special",
      is_featured: true,
      is_available: true,
      image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dish-d1",
      name: "Fresh Tropical Avocado & Almond Juice",
      name_ar: "عصير أفوكادو بالمكسرات والتمر الملكي",
      category: "desserts",
      price: 28,
      description: "Pure rich creamy avocado blended with fresh milk, topped with crunchy crushed almonds, honey, and medjool dates.",
      description_ar: "عصير أفوكادو طبيعي طازج ممزوج بالحليب ومزين باللوز المقرمش والعسل الطبيعي وقطع التمر الفاخر.",
      ingredients: "Fresh Hass Avocado, Almonds, Pure Honey, Medjool Dates, Milk",
      badge: "Healthy & Rich",
      is_featured: false,
      is_available: true,
      image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80"
    }
  ],

  offers: [
    {
      id: "offer-1",
      title: "Family Lunch & Dinner Combo",
      title_ar: "عرض العائلة واللمة المميزة",
      description: "Mixed grill platter + 2 Burgers + 2 portions of seasoned crispy fries + 4 drinks at an exclusive discounted rate.",
      description_ar: "طبق مشاوي مشكل + 2 برغر لحم طازج + 2 بطاطس فريت مقرمشة + 4 مشروبات غازية أو قهوة بسعر خاص ومخفض.",
      discount: "185 DH instead of 230 DH",
      discount_ar: "فقط 185 درهم عوض 230 درهم",
      tag: "Family Combo",
      tag_ar: "عرض العائلة",
      start_date: "2026-10-01",
      end_date: "2026-12-31",
      is_active: true,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "offer-2",
      title: "Morning Coffee & Breakfast Delight",
      title_ar: "عرض إفطار الصباح والقهوة المختصة",
      description: "Enjoy our full Moroccan breakfast platter with any artisan coffee of your choice daily before 11:30 AM.",
      description_ar: "استمتع بإفطار بالم بالاس الكامل مع أي قهوة مختصة أو شاي مغربي يومياً حتى الساعة 11:30 صباحاً.",
      discount: "Complete Breakfast at 35 DH",
      discount_ar: "إفطار متكامل بـ 35 درهم فقط",
      tag: "Daily Breakfast",
      tag_ar: "فطور يومي",
      start_date: "2026-10-01",
      end_date: "2026-12-31",
      is_active: true,
      image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80"
    }
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Modern Welcoming Hall in Smara",
      title_ar: "صالة الاستقبال والجلسات الحديثة بالسمارة",
      category: "interior",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "gal-2",
      title: "Artisanal Coffee & Espresso Brewing",
      title_ar: "تحضير القهوة المختصة والإسبريسو",
      category: "coffee",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "gal-3",
      title: "Fresh Crispy French Fries",
      title_ar: "بطاطا مقلية ذهبية ونظيفة ومقرمشة",
      category: "dishes",
      image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "gal-4",
      title: "Sizzling Gourmet Charcoal Grills",
      title_ar: "مشاوي شهية على الفحم",
      category: "dishes",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "gal-5",
      title: "Cozy Family & Friend Atmosphere",
      title_ar: "أجواء عائلية ومريحة لجميع الزوار",
      category: "interior",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "gal-6",
      title: "Specialty Fresh Juices & Shakes",
      title_ar: "عصائر طبيعية ومشروبات منعشة",
      category: "drinks",
      image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=80"
    }
  ],

  reservations: [
    {
      id: "res-101",
      customer_name: "محمد الشاوي",
      customer_phone: "06 61 23 45 67",
      customer_email: "m.chaoui@gmail.com",
      guests: 4,
      date: "2026-10-14",
      time: "20:30",
      special_notes: "جلسة عائلية، يرجى تجهيز المشاوي والبطاطس المقرمشة.",
      status: "Confirmed",
      created_at: "2026-10-10 14:22"
    },
    {
      id: "res-102",
      customer_name: "فاطمة الزهراء",
      customer_phone: "06 72 88 99 10",
      customer_email: "fatima@smara.ma",
      guests: 2,
      date: "2026-10-15",
      time: "19:00",
      special_notes: "طاولة هادئة للقهوة والحلويات.",
      status: "Confirmed",
      created_at: "2026-10-11 09:15"
    }
  ],

  messages: [
    {
      id: "msg-1",
      name: "Le goût Parfait",
      email: "client@goutparfait.com",
      phone: "06 20 11 22 33",
      subject: "شكر وتقدير للنظافة والاستقبال",
      message: "أود أن أعبر عن إعجابي الكبير بالأكل اللذيذ والاستقبال الراقية في مطعمكم. كل شيء كان في المستوى.",
      date: "2026-10-10 18:30",
      status: "read"
    }
  ],

  customers: [
    {
      id: "cust-1",
      name: "محمد الشاوي",
      phone: "06 61 23 45 67",
      email: "m.chaoui@gmail.com",
      reservations_count: 3,
      last_reservation: "2026-10-14",
      total_spent: 420
    }
  ],

  orders: []
};

// Database Service Interface
const PalmeDB = {
  init: function() {
    try {
      const existing = localStorage.getItem(PALME_STORAGE_KEY);
      if (!existing) {
        localStorage.setItem(PALME_STORAGE_KEY, JSON.stringify(DEFAULT_STORE_DATA));
      } else {
        const parsed = JSON.parse(existing);
        let updated = false;
        for (let key in DEFAULT_STORE_DATA) {
          if (!parsed[key]) {
            parsed[key] = DEFAULT_STORE_DATA[key];
            updated = true;
          }
        }
        if (updated) {
          localStorage.setItem(PALME_STORAGE_KEY, JSON.stringify(parsed));
        }
      }
    } catch (e) {
      console.error("Storage initialization error:", e);
    }
  },

  getAll: function() {
    try {
      this.init();
      return JSON.parse(localStorage.getItem(PALME_STORAGE_KEY)) || DEFAULT_STORE_DATA;
    } catch (e) {
      return DEFAULT_STORE_DATA;
    }
  },

  saveAll: function(data) {
    try {
      localStorage.setItem(PALME_STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('palme_db_updated', { detail: data }));
      return true;
    } catch (e) {
      console.error("Storage save error:", e);
      return false;
    }
  },

  getRestaurantInfo: function() {
    return this.getAll().restaurant;
  },

  updateRestaurantInfo: function(info) {
    const data = this.getAll();
    data.restaurant = { ...data.restaurant, ...info };
    return this.saveAll(data);
  },

  // Menu Methods
  getMenu: function() {
    return this.getAll().menu || [];
  },

  saveDish: function(dish) {
    const data = this.getAll();
    if (!dish.id) {
      dish.id = 'dish-' + Date.now();
      data.menu.push(dish);
    } else {
      const idx = data.menu.findIndex(d => d.id === dish.id);
      if (idx !== -1) {
        data.menu[idx] = dish;
      } else {
        data.menu.push(dish);
      }
    }
    return this.saveAll(data);
  },

  deleteDish: function(dishId) {
    const data = this.getAll();
    data.menu = data.menu.filter(d => d.id !== dishId);
    return this.saveAll(data);
  },

  // Reviews
  getReviews: function() {
    return this.getAll().reviews || [];
  },

  getReviewsSummary: function() {
    return this.getAll().reviews_summary || { average: 4.2, total: 51 };
  },

  addReview: function(rev) {
    const data = this.getAll();
    rev.id = 'rev-' + Date.now();
    rev.date_relative = 'الآن';
    rev.date_relative_en = 'Just now';
    if (!data.reviews) data.reviews = [];
    data.reviews.unshift(rev);
    
    // Recalculate count
    data.reviews_summary.total += 1;
    this.saveAll(data);
    return rev;
  },

  // Reservations
  getReservations: function() {
    return this.getAll().reservations || [];
  },

  addReservation: function(reservation) {
    const data = this.getAll();
    reservation.id = 'res-' + Math.floor(100 + Math.random() * 900);
    reservation.status = 'Pending';
    reservation.created_at = new Date().toISOString().replace('T', ' ').substring(0, 16);
    data.reservations.unshift(reservation);

    // Sync Customer
    let cust = data.customers.find(c => c.phone === reservation.customer_phone || (c.email && c.email.toLowerCase() === reservation.customer_email.toLowerCase()));
    if (cust) {
      cust.reservations_count += 1;
      cust.last_reservation = reservation.date;
    } else {
      data.customers.push({
        id: 'cust-' + Date.now(),
        name: reservation.customer_name,
        phone: reservation.customer_phone,
        email: reservation.customer_email || '',
        reservations_count: 1,
        last_reservation: reservation.date,
        total_spent: 0
      });
    }

    this.saveAll(data);
    return reservation;
  },

  updateReservationStatus: function(id, status) {
    const data = this.getAll();
    const res = data.reservations.find(r => r.id === id);
    if (res) {
      res.status = status;
      return this.saveAll(data);
    }
    return false;
  },

  deleteReservation: function(id) {
    const data = this.getAll();
    data.reservations = data.reservations.filter(r => r.id !== id);
    return this.saveAll(data);
  },

  // Offers
  getOffers: function() {
    return this.getAll().offers || [];
  },

  saveOffer: function(offer) {
    const data = this.getAll();
    if (!offer.id) {
      offer.id = 'offer-' + Date.now();
      data.offers.push(offer);
    } else {
      const idx = data.offers.findIndex(o => o.id === offer.id);
      if (idx !== -1) data.offers[idx] = offer;
      else data.offers.push(offer);
    }
    return this.saveAll(data);
  },

  deleteOffer: function(id) {
    const data = this.getAll();
    data.offers = data.offers.filter(o => o.id !== id);
    return this.saveAll(data);
  },

  // Gallery
  getGallery: function() {
    return this.getAll().gallery || [];
  },

  saveGalleryItem: function(item) {
    const data = this.getAll();
    if (!item.id) {
      item.id = 'gal-' + Date.now();
      data.gallery.push(item);
    } else {
      const idx = data.gallery.findIndex(g => g.id === item.id);
      if (idx !== -1) data.gallery[idx] = item;
      else data.gallery.push(item);
    }
    return this.saveAll(data);
  },

  deleteGalleryItem: function(id) {
    const data = this.getAll();
    data.gallery = data.gallery.filter(g => g.id !== id);
    return this.saveAll(data);
  },

  // Messages
  getMessages: function() {
    return this.getAll().messages || [];
  },

  addMessage: function(msg) {
    const data = this.getAll();
    msg.id = 'msg-' + Date.now();
    msg.date = new Date().toISOString().replace('T', ' ').substring(0, 16);
    msg.status = 'unread';
    data.messages.unshift(msg);
    return this.saveAll(data);
  },

  markMessageRead: function(id) {
    const data = this.getAll();
    const msg = data.messages.find(m => m.id === id);
    if (msg) {
      msg.status = 'read';
      return this.saveAll(data);
    }
    return false;
  },

  deleteMessage: function(id) {
    const data = this.getAll();
    data.messages = data.messages.filter(m => m.id !== id);
    return this.saveAll(data);
  },

  resetToDefaults: function() {
    localStorage.setItem(PALME_STORAGE_KEY, JSON.stringify(DEFAULT_STORE_DATA));
    return true;
  }
};

// Admin Session & Authentication
const PalmeAuth = {
  login: function(username, password) {
    if ((username === 'admin' && (password === 'admin' || password === 'palme2026' || password === 'admin123')) ||
        (username === 'palme' && password === 'palme2026')) {
      const token = {
        user: username,
        role: 'Administrator',
        logged_at: Date.now()
      };
      sessionStorage.setItem(PALME_AUTH_KEY, JSON.stringify(token));
      return { success: true };
    }
    return { success: false, message: 'بيانات الدخول غير صحيحة / Invalid administrative credentials' };
  },

  logout: function() {
    sessionStorage.removeItem(PALME_AUTH_KEY);
    window.location.href = 'login.html';
  },

  isAuthenticated: function() {
    const session = sessionStorage.getItem(PALME_AUTH_KEY);
    if (!session) return false;
    try {
      const data = JSON.parse(session);
      return !!data.user;
    } catch (e) {
      return false;
    }
  },

  getCurrentUser: function() {
    try {
      return JSON.parse(sessionStorage.getItem(PALME_AUTH_KEY)) || null;
    } catch (e) {
      return null;
    }
  }
};

// Initialize DB immediately
PalmeDB.init();
