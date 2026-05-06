import { useState, useEffect, useRef, useCallback } from "react";

// ================================================================
//  AFRIGATEMARKET — WORLD MARKET EDITION v3.1
//  ✅ English / French bilingual — full site
//  ✅ 12 Fully Separated Category Sections (no mixing)
//  ✅ Each category = its own dedicated page + banner + listings
//  ✅ Real Supabase connection
//  ✅ Black + White Handshake Banner
//  ✅ 3 Automated messages
//  ✅ 80% African / 20% International
// ================================================================

// ─── YOUR 4 KEYS ─────────────────────────────────────────────────
const SUPABASE_URL  = "https://sgrqopehgqohsmwivabw.supabase.co";
const SUPABASE_ANON = "sb_publishable_nXQstTGfbHuItXjdF_y2NQ_QKmBCwK1";
const EMAILJS_SERVICE  = "service_7ys54l9";
// ─── CinetPay Payment ─────────────────────────────────────────────
const CINETPAY_APIKEY   = "YOUR_CINETPAY_API_KEY"; // Add after creating account
const CINETPAY_SITEID   = "YOUR_CINETPAY_SITE_ID"; // Add after creating account
const CINETPAY_NOTIFY   = "https://afrigatemarketplace.netlify.app/payment-notify";
const MONTHLY_PRICE_XAF = 9900;
const ANNUAL_PRICE_XAF  = Math.round(9900 * 12 * 0.8); // 20% discount = 95,040 XAF
const EMAILJS_PUBLIC   = "7OnFUMY29lyLw38cb";
const EMAILJS_T_WELCOME  = "template_5p7nb5d";
const EMAILJS_T_LISTING  = "template_9f4wpp6";
const MY_WA         = "237671282427";
const MY_EMAIL      = "Afrigatemarket@gmail.com";
// ─────────────────────────────────────────────────────────────────

// ─── BILINGUAL TRANSLATIONS ───────────────────────────────────────
const T = {
  en: {
    tagline:        "Your Gate to Africa and the World",
    trial_ticker:   "Afrigatemarket · Your Gate to Africa & the World · 60-Day FREE Trial",
    browse:         "Browse Marketplace",
    sell:           "Sell",
    dashboard:      "Dashboard",
    login:          "Login",
    logout:         "Sign Out",
    register:       "Register",
    cart:           "Cart",
    intl_hub:       "International Hub",
    search_ph:      "Search listings across Africa & the world…",
    cat_title:      "12 Master Categories",
    cat_sub:        "Each category has its own dedicated section — no mixing",
    photos_per:     "10 photos/listing",
    featured:       "Featured Listings",
    featured_sub:   "Verified sellers · Updated daily · Unlimited inventory",
    view_all:       "View All Listings →",
    intl_title:     "International Partners",
    intl_sub:       "Afrigatemarket's gateway to Europe & global commerce",
    trial_title:    "60-Day FREE Trial — Zero Limits",
    trial_sub:      "Post 10, 20, 50+ listings per day. Build your personal storefront. No credit card required.",
    start_free:     "🚀 Start Selling FREE Today",
    post_now:       "Post a Listing Now",
    chat_wa:        "Chat on WhatsApp",
    verified:       "✓ Verified",
    views:          "views",
    back:           "← Back to listings",
    back_mkt:       "← Marketplace",
    specifications: "Specifications",
    view_store:     "View Full Storefront →",
    call_seller:    "Call Seller",
    add_cart:       "Add to Cart",
    share:          "SHARE:",
    welcome_back:   "Welcome Back",
    sign_in_sub:    "Sign in to your Afrigatemarket account",
    email_label:    "Email Address",
    pass_label:     "Password",
    signing_in:     "Signing in…",
    sign_in:        "Sign In →",
    no_account:     "No account?",
    reg_free:       "Register FREE",
    create_account: "Create Your Account",
    verify_act:     "Verify & Activate",
    join_sub:       "Join 50,000+ sellers · 60-Day FREE Trial",
    one_step:       "One step away from your World Market",
    full_name:      "Full Name / Business Name",
    verified_email: "Verified Email Address",
    wa_number:      "WhatsApp Number",
    your_country:   "Your Country",
    continue_btn:   "Continue →",
    already_acc:    "Already have an account?",
    sign_in_link:   "Sign In",
    otp_label:      "Enter 6-digit OTP",
    set_pass:       "Set Your Password",
    pass_min:       "Minimum 8 characters",
    activating:     "Activating…",
    activate_btn:   "🚀 Activate My Account — FREE",
    post_title:     "Post a New Listing",
    post_sub:       "No daily limits · Up to 10 images · Instantly promoted across Africa & Europe",
    cat_select:     "SELECT CATEGORY *",
    list_title:     "Listing Title *",
    price_label:    "Price (FCFA) *",
    location_lbl:   "Location *",
    desc_label:     "Description",
    desc_ph:        "Describe your listing in detail…",
    photos_label:   "PHOTOS — Up to 10 images · Lazy-loaded carousel",
    uploading:      "Publishing…",
    publish_btn:    "🚀 Publish Listing — Free",
    live_title:     "Your Listing is LIVE!",
    live_msg:       "Your post is now live and being promoted!",
    email_sent:     "Email confirmation sent",
    wa_sent:        "WhatsApp alert sent",
    post_another:   "Post Another Listing",
    view_store_btn: "View My Storefront",
    dashboard_title:"Seller Dashboard",
    dash_sub:       "Afrigatemarket · Unlimited listings · Zero daily cap",
    post_new:       "Post New Listing",
    trial_label:    "Free Trial",
    days_rem:       "Days Remaining",
    days_used:      "days used",
    after_trial:    "After trial:",
    upgrade:        "Upgrade Plan",
    overview:       "Overview",
    my_listings:    "My Listings",
    analytics:      "Analytics",
    messages:       "Messages",
    storefront:     "Storefront",
    social_links:   "Social Links",
    settings:       "Settings",
    automation:     "Automation Engine — Active",
    welcome_email:  "Welcome Email",
    wa_welcome:     "WhatsApp Welcome",
    post_live_notif:"Post-Live Notification",
    re_engage:      "Re-engagement Alert",
    weekly_report:  "Weekly Performance Report",
    sent_reg:       "Sent on registration",
    post_live_msg:  "'Your post is now live and being promoted!'",
    re_engage_msg:  "'We Miss You! Your World Market is waiting.' — 2-3 wk inactivity",
    sent_monday:    "Sent every Monday morning",
    no_daily_cap:   "No daily cap · Post 10, 20, 50+ per day",
    digital_wh:     "Build your Digital Warehouse on Afrigatemarket — No daily limits, ever.",
    store_link:     "Your store link:",
    preview_store:  "Preview Storefront",
    store_features: "Custom bio & avatar · All listings · Social links · WhatsApp contact · Verified badge",
    save_social:    "Save Social Links",
    platform:       "Platform",
    acc_email:      "Account Email",
    wa_alerts:      "WhatsApp Alerts",
    email_reports:  "Email Reports",
    post_limit:     "Post Limit",
    unlimited:      "Unlimited ✅",
    join_intl:      "Join as International Seller",
    shipping_log:   "Shipping & Logistics",
    open_intl:      "Open Int'l Hub",
    global_sub:     "Global Subscription Pricing",
    global_sub_s:   "Base: 9,900 FCFA — auto-converted for every region",
    country_col:    "Country",
    symbol_col:     "Symbol",
    monthly_col:    "Monthly",
    annual_col:     "Annual (−20%)",
    all_listings:   "All Listings",
    all_lst_sub:    "Verified sellers · Updated daily · Unlimited inventory",
    all_filter:     "🌍 All",
    be_first:       "No listings here yet",
    post_first:     "Be the first to post here",
    cart_empty:     "Cart is empty. Discover great deals on Afrigatemarket!",
    africa_connects:"Africa Connects the World",
    footer_nations: "54 African Nations · France · Belgium · Germany · UK · Global Trade",
    view_intl:      "View International Hub",
    categories_f:   "CATEGORIES",
    nations_f:      "NATIONS",
    support_f:      "SUPPORT",
    support_247:    "24/7 Support",
    whatsapp_sup:   "WhatsApp Support",
    confidential:   "80% African Identity · 20% International · Supabase-Powered",
    welcome_msg:    "Welcome to Afrigatemarket!",
    account_live:   "your account is live! A welcome message has been sent to",
    and_whatsapp:   "and your WhatsApp.",
    trial_active:   "60-Day FREE Trial Active",
    after_trial_d:  "After trial:",
    go_dashboard:   "Go to My Dashboard →",
    open_intl_hub:  "Open International Hub",
  },
  fr: {
    tagline:        "Votre Porte vers l'Afrique et le Monde",
    trial_ticker:   "Afrigatemarket · Votre Porte vers l'Afrique & le Monde · Essai GRATUIT 60 Jours",
    browse:         "Parcourir le Marché",
    sell:           "Vendre",
    dashboard:      "Tableau de Bord",
    login:          "Connexion",
    logout:         "Déconnexion",
    register:       "S'inscrire",
    cart:           "Panier",
    intl_hub:       "Hub International",
    search_ph:      "Rechercher des annonces en Afrique et dans le monde…",
    cat_title:      "12 Catégories Principales",
    cat_sub:        "Chaque catégorie a sa propre section dédiée — aucun mélange",
    photos_per:     "10 photos/annonce",
    featured:       "Annonces en Vedette",
    featured_sub:   "Vendeurs vérifiés · Mis à jour quotidiennement · Inventaire illimité",
    view_all:       "Voir Toutes les Annonces →",
    intl_title:     "Partenaires Internationaux",
    intl_sub:       "La passerelle d'Afrigatemarket vers l'Europe et le commerce mondial",
    trial_title:    "Essai GRATUIT 60 Jours — Zéro Limite",
    trial_sub:      "Publiez 10, 20, 50+ annonces par jour. Créez votre vitrine. Sans carte bancaire.",
    start_free:     "🚀 Commencer à Vendre GRATUITEMENT",
    post_now:       "Publier une Annonce Maintenant",
    chat_wa:        "Discuter sur WhatsApp",
    verified:       "✓ Vérifié",
    views:          "vues",
    back:           "← Retour aux annonces",
    back_mkt:       "← Marché",
    specifications: "Spécifications",
    view_store:     "Voir la Boutique Complète →",
    call_seller:    "Appeler le Vendeur",
    add_cart:       "Ajouter au Panier",
    share:          "PARTAGER:",
    welcome_back:   "Bon Retour",
    sign_in_sub:    "Connectez-vous à votre compte Afrigatemarket",
    email_label:    "Adresse Email",
    pass_label:     "Mot de Passe",
    signing_in:     "Connexion en cours…",
    sign_in:        "Se Connecter →",
    no_account:     "Pas de compte?",
    reg_free:       "S'inscrire GRATUITEMENT",
    create_account: "Créer Votre Compte",
    verify_act:     "Vérifier et Activer",
    join_sub:       "Rejoignez 50 000+ vendeurs · Essai GRATUIT 60 Jours",
    one_step:       "Un pas de votre Marché Mondial",
    full_name:      "Nom Complet / Nom Commercial",
    verified_email: "Adresse Email Vérifiée",
    wa_number:      "Numéro WhatsApp",
    your_country:   "Votre Pays",
    continue_btn:   "Continuer →",
    already_acc:    "Vous avez déjà un compte?",
    sign_in_link:   "Se Connecter",
    otp_label:      "Entrez le code OTP à 6 chiffres",
    set_pass:       "Définir Votre Mot de Passe",
    pass_min:       "Minimum 8 caractères",
    activating:     "Activation en cours…",
    activate_btn:   "🚀 Activer Mon Compte — GRATUIT",
    post_title:     "Publier une Nouvelle Annonce",
    post_sub:       "Sans limite quotidienne · Jusqu'à 10 images · Promu immédiatement",
    cat_select:     "SÉLECTIONNER UNE CATÉGORIE *",
    list_title:     "Titre de l'Annonce *",
    price_label:    "Prix (FCFA) *",
    location_lbl:   "Localisation *",
    desc_label:     "Description",
    desc_ph:        "Décrivez votre annonce en détail…",
    photos_label:   "PHOTOS — Jusqu'à 10 images · Galerie haute vitesse",
    uploading:      "Publication en cours…",
    publish_btn:    "🚀 Publier l'Annonce — Gratuit",
    live_title:     "Votre Annonce est EN LIGNE!",
    live_msg:       "Votre annonce est maintenant en ligne et promue!",
    email_sent:     "Email de confirmation envoyé",
    wa_sent:        "Alerte WhatsApp envoyée",
    post_another:   "Publier une autre annonce",
    view_store_btn: "Voir Ma Boutique",
    dashboard_title:"Tableau de Bord Vendeur",
    dash_sub:       "Afrigatemarket · Annonces illimitées · Zéro limite quotidienne",
    post_new:       "Nouvelle Annonce",
    trial_label:    "Essai Gratuit",
    days_rem:       "Jours Restants",
    days_used:      "jours utilisés",
    after_trial:    "Après l'essai:",
    upgrade:        "Mettre à Niveau",
    overview:       "Vue d'ensemble",
    my_listings:    "Mes Annonces",
    analytics:      "Statistiques",
    messages:       "Messages",
    storefront:     "Boutique",
    social_links:   "Réseaux Sociaux",
    settings:       "Paramètres",
    automation:     "Moteur d'Automatisation — Actif",
    welcome_email:  "Email de Bienvenue",
    wa_welcome:     "Bienvenue WhatsApp",
    post_live_notif:"Notification Annonce En Ligne",
    re_engage:      "Alerte de Réengagement",
    weekly_report:  "Rapport de Performance Hebdomadaire",
    sent_reg:       "Envoyé à l'inscription",
    post_live_msg:  "'Votre annonce est maintenant en ligne et promue!'",
    re_engage_msg:  "'Vous nous manquez! Votre Marché Mondial vous attend.' — 2-3 sem. inactivité",
    sent_monday:    "Envoyé chaque lundi matin",
    no_daily_cap:   "Sans limite quotidienne · Publiez 10, 20, 50+ par jour",
    digital_wh:     "Construisez votre Entrepôt Numérique sur Afrigatemarket — Sans limite quotidienne.",
    store_link:     "Lien de votre boutique:",
    preview_store:  "Aperçu de la Boutique",
    store_features: "Bio personnalisée · Toutes les annonces · Liens sociaux · Contact WhatsApp · Badge vérifié",
    save_social:    "Enregistrer les Réseaux",
    platform:       "Plateforme",
    acc_email:      "Email du Compte",
    wa_alerts:      "Alertes WhatsApp",
    email_reports:  "Rapports Email",
    post_limit:     "Limite d'Annonces",
    unlimited:      "Illimité ✅",
    join_intl:      "Rejoindre en tant que Vendeur International",
    shipping_log:   "Expédition & Logistique",
    open_intl:      "Ouvrir le Hub Int'l",
    global_sub:     "Tarifs d'Abonnement Mondial",
    global_sub_s:   "Base: 9 900 FCFA — converti automatiquement pour chaque région",
    country_col:    "Pays",
    symbol_col:     "Symbole",
    monthly_col:    "Mensuel",
    annual_col:     "Annuel (−20%)",
    all_listings:   "Toutes les Annonces",
    all_lst_sub:    "Vendeurs vérifiés · Mis à jour quotidiennement · Inventaire illimité",
    all_filter:     "🌍 Tout",
    be_first:       "Aucune annonce ici pour l'instant",
    post_first:     "Soyez le premier à publier ici",
    cart_empty:     "Panier vide. Découvrez de bonnes affaires sur Afrigatemarket!",
    africa_connects:"L'Afrique Connecte le Monde",
    footer_nations: "54 Nations Africaines · France · Belgique · Allemagne · Royaume-Uni · Commerce Mondial",
    view_intl:      "Voir le Hub International",
    categories_f:   "CATÉGORIES",
    nations_f:      "NATIONS",
    support_f:      "SUPPORT",
    support_247:    "Support 24h/24",
    whatsapp_sup:   "Support WhatsApp",
    confidential:   "80% Identité Africaine · 20% International · Propulsé par Supabase",
    welcome_msg:    "Bienvenue sur Afrigatemarket!",
    account_live:   "votre compte est actif! Un message de bienvenue a été envoyé à",
    and_whatsapp:   "et sur votre WhatsApp.",
    trial_active:   "Essai GRATUIT 60 Jours Activé",
    after_trial_d:  "Après l'essai:",
    go_dashboard:   "Aller à Mon Tableau de Bord →",
    open_intl_hub:  "Ouvrir le Hub International",
  }
};

// ─── 12 Categories fully bilingual ───────────────────────────────
const CATS = [
  {
    id:"real_estate", icon:"🏘️", color:"#8B4513",
    en:{ label:"Real Estate",          sub:"Apartments · Houses · Land",        banner:"Find your perfect home or invest in property across Africa" },
    fr:{ label:"Immobilier",            sub:"Appartements · Maisons · Terrains", banner:"Trouvez votre maison idéale ou investissez dans l'immobilier en Afrique" },
    fields:[{k:"location",en:"City/Area",fr:"Ville/Quartier",p:"e.g. Douala, Bonamoussadi"},{k:"rooms",en:"Rooms",fr:"Pièces",p:"4",t:"number"},{k:"title_doc",en:"Land Title",fr:"Titre Foncier",p:"TF No.1234"},{k:"area",en:"Area m²",fr:"Superficie m²",p:"250",t:"number"}],
    imgs:["https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?w=500&q=80","https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?w=500&q=80","https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?w=500&q=80","https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?w=500&q=80","https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?w=500&q=80","https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?w=500&q=80","https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?w=500&q=80","https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?w=500&q=80","https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?w=500&q=80","https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=500&q=80"],
  },
  {
    id:"building", icon:"🏗️", color:"#C45D2A",
    en:{ label:"Building Materials",   sub:"Cement · Steel · Solar",            banner:"Quality building materials for construction projects across Africa" },
    fr:{ label:"Matériaux de Construction",sub:"Ciment · Acier · Solaire",     banner:"Matériaux de construction de qualité pour vos projets en Afrique" },
    fields:[],
    imgs:["https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?w=500&q=80","https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?w=500&q=80","https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?w=500&q=80","https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg?w=500&q=80","https://images.pexels.com/photos/159358/pexels-photo-159358.jpeg?w=500&q=80","https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg?w=500&q=80","https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?w=500&q=80","https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?w=500&q=80","https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?w=500&q=80","https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?w=500&q=80"],
  },
  {
    id:"logistics", icon:"🚢", color:"#1B7FC4",
    en:{ label:"Logistics & Shipping", sub:"Freight · Containers · Delivery",   banner:"International freight, container tracking and local delivery services" },
    fr:{ label:"Logistique & Transport",sub:"Fret · Conteneurs · Livraison",    banner:"Fret international, suivi de conteneurs et services de livraison locale" },
    fields:[],
    imgs:["https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?w=500&q=80","https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?w=500&q=80","https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?w=500&q=80","https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?w=500&q=80","https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?w=500&q=80","https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?w=500&q=80","https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg?w=500&q=80","https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?w=500&q=80","https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?w=500&q=80","https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?w=500&q=80"],
  },
  {
    id:"vehicles", icon:"🚗", color:"#1A5C38",
    en:{ label:"Vehicles",             sub:"Trucks · Cars · Spare Parts",       banner:"Trusted vehicle marketplace — cars, trucks, motorbikes and spare parts" },
    fr:{ label:"Véhicules",             sub:"Camions · Voitures · Pièces",      banner:"Marché de véhicules de confiance — voitures, camions, motos et pièces détachées" },
    fields:[{k:"mileage",en:"Mileage km",fr:"Kilométrage",p:"45000",t:"number"},{k:"year",en:"Year",fr:"Année",p:"2022",t:"number"},{k:"engine",en:"Engine",fr:"Moteur",p:"3.0L V6 Diesel"},{k:"fuel",en:"Fuel Type",fr:"Type Carburant",p:"Diesel / Petrol"}],
    imgs:["https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?w=500&q=80","https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?w=500&q=80","https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?w=500&q=80","https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?w=500&q=80","https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?w=500&q=80","https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?w=500&q=80","https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?w=500&q=80","https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?w=500&q=80","https://images.pexels.com/photos/248747/pexels-photo-248747.jpeg?w=500&q=80","https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?w=500&q=80"],
  },
  {
    id:"electronics", icon:"📱", color:"#6B2FBF",
    en:{ label:"Electronics",          sub:"Phones · Laptops · CCTV",           banner:"Latest smartphones, laptops, home appliances and security systems" },
    fr:{ label:"Électronique",          sub:"Téléphones · Laptops · CCTV",      banner:"Derniers smartphones, laptops, électroménagers et systèmes de sécurité" },
    fields:[],
    imgs:["https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?w=500&q=80","https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?w=500&q=80","https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?w=500&q=80","https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?w=500&q=80","https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?w=500&q=80","https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?w=500&q=80","https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?w=500&q=80","https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?w=500&q=80","https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?w=500&q=80","https://images.pexels.com/photos/193004/pexels-photo-193004.jpeg?w=500&q=80"],
  },
  {
    id:"beauty", icon:"💄", color:"#C2185B",
    en:{ label:"Beauty & Cosmetics",   sub:"Skincare · Hair · Salon Equipment", banner:"Premium beauty products, hair care and professional salon equipment" },
    fr:{ label:"Beauté & Cosmétiques", sub:"Soins · Cheveux · Équipement Salon",banner:"Produits de beauté premium, soins capillaires et équipements salon professionnels" },
    fields:[],
    imgs:["https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?w=500&q=80","https://images.pexels.com/photos/3738349/pexels-photo-3738349.jpeg?w=500&q=80","https://images.pexels.com/photos/3764014/pexels-photo-3764014.jpeg?w=500&q=80","https://images.pexels.com/photos/2531734/pexels-photo-2531734.jpeg?w=500&q=80","https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg?w=500&q=80","https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg?w=500&q=80","https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?w=500&q=80","https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?w=500&q=80","https://images.pexels.com/photos/1721943/pexels-photo-1721943.jpeg?w=500&q=80","https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?w=500&q=80"],
  },
  {
    id:"food", icon:"🌾", color:"#2E7D32",
    en:{ label:"Food & Agriculture",   sub:"Wholesale Grains · Oils · Machinery",banner:"Wholesale food products, farm machinery and agricultural supplies" },
    fr:{ label:"Alimentation & Agriculture",sub:"Céréales · Huiles · Machines", banner:"Produits alimentaires en gros, machines agricoles et fournitures" },
    fields:[],
    imgs:["https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=500&q=80","https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?w=500&q=80","https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?w=500&q=80","https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?w=500&q=80","https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?w=500&q=80","https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?w=500&q=80","https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?w=500&q=80","https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?w=500&q=80","https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?w=500&q=80","https://images.pexels.com/photos/4110101/pexels-photo-4110101.jpeg?w=500&q=80"],
  },
  {
    id:"home", icon:"🛋️", color:"#F57C00",
    en:{ label:"Home & Furniture",     sub:"Interior Decor · Kitchen · Furniture",banner:"Beautiful furniture, kitchen appliances and interior decoration" },
    fr:{ label:"Maison & Mobilier",    sub:"Décoration · Cuisine · Mobilier",   banner:"Beaux meubles, électroménagers et décoration intérieure" },
    fields:[],
    imgs:["https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?w=500&q=80","https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?w=500&q=80","https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=500&q=80","https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?w=500&q=80","https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?w=500&q=80","https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?w=500&q=80","https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?w=500&q=80","https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?w=500&q=80","https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?w=500&q=80","https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?w=500&q=80"],
  },
  {
    id:"fashion", icon:"👗", color:"#AD1457",
    en:{ label:"Fashion & Textiles",   sub:"Traditional Wax · Modern Wear · Jewelry",banner:"African traditional wear, modern fashion and jewelry from across the continent" },
    fr:{ label:"Mode & Textiles",      sub:"Wax Traditionnel · Mode · Bijoux",  banner:"Vêtements traditionnels africains, mode moderne et bijoux du continent" },
    fields:[],
    imgs:["https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?w=500&q=80","https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg?w=500&q=80","https://images.pexels.com/photos/2220329/pexels-photo-2220329.jpeg?w=500&q=80","https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?w=500&q=80","https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?w=500&q=80","https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?w=500&q=80","https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?w=500&q=80","https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?w=500&q=80","https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=500&q=80","https://images.pexels.com/photos/2220329/pexels-photo-2220329.jpeg?w=500&q=80"],
  },
  {
    id:"services", icon:"⚖️", color:"#00695C",
    en:{ label:"Professional Services",sub:"Legal · Accounting · Marketing",    banner:"Connect with verified lawyers, accountants, architects and marketing experts" },
    fr:{ label:"Services Professionnels",sub:"Juridique · Comptabilité · Marketing",banner:"Connectez-vous avec des avocats, comptables, architectes et experts marketing vérifiés" },
    fields:[],
    imgs:["https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?w=500&q=80","https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=500&q=80","https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=500&q=80","https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?w=500&q=80","https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?w=500&q=80","https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=500&q=80","https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?w=500&q=80","https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?w=500&q=80","https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=500&q=80","https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?w=500&q=80"],
  },
  {
    id:"industrial", icon:"⚙️", color:"#455A64",
    en:{ label:"Industrial Equipment", sub:"Generators · Mining Tools · Safety", banner:"Heavy machinery, generators, mining equipment and industrial safety gear" },
    fr:{ label:"Équipement Industriel", sub:"Générateurs · Mines · Sécurité",   banner:"Machines lourdes, générateurs, équipements miniers et matériel de sécurité industrielle" },
    fields:[],
    imgs:["https://images.pexels.com/photos/162568/pexels-photo-162568.jpeg?w=500&q=80","https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg?w=500&q=80","https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?w=500&q=80","https://images.pexels.com/photos/210881/pexels-photo-210881.jpeg?w=500&q=80","https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?w=500&q=80","https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?w=500&q=80","https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?w=500&q=80","https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?w=500&q=80","https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?w=500&q=80","https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?w=500&q=80"],
  },
  {
    id:"jobs", icon:"💼", color:"#1565C0",
    en:{ label:"Jobs & Employment",    sub:"Warehouse · Technical Roles · CV Upload",banner:"Find jobs or hire talent across Africa — warehouse, technical and professional roles" },
    fr:{ label:"Emplois & Recrutement",sub:"Entrepôt · Rôles Techniques · CV", banner:"Trouvez un emploi ou recrutez des talents en Afrique — entrepôt, technique et professionnel" },
    fields:[],
    imgs:["https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=500&q=80","https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=500&q=80","https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?w=500&q=80","https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?w=500&q=80","https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=500&q=80","https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?w=500&q=80","https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?w=500&q=80","https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=500&q=80","https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?w=500&q=80","https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?w=500&q=80"],
  },
];

const CURRENCIES = {
  CM:{symbol:"CFA",rate:1,       flag:"🇨🇲",name:"Cameroon",      r:"africa"},
  SN:{symbol:"CFA",rate:1,       flag:"🇸🇳",name:"Senegal",       r:"africa"},
  GA:{symbol:"CFA",rate:1,       flag:"🇬🇦",name:"Gabon",         r:"africa"},
  CI:{symbol:"CFA",rate:1,       flag:"🇨🇮",name:"Côte d'Ivoire", r:"africa"},
  NG:{symbol:"₦",  rate:0.52,    flag:"🇳🇬",name:"Nigeria",       r:"africa"},
  GH:{symbol:"GH₵",rate:0.0065,  flag:"🇬🇭",name:"Ghana",         r:"africa"},
  KE:{symbol:"KSh",rate:0.48,    flag:"🇰🇪",name:"Kenya",         r:"africa"},
  ZA:{symbol:"R",  rate:0.068,   flag:"🇿🇦",name:"South Africa",  r:"africa"},
  FR:{symbol:"€",  rate:0.00152, flag:"🇫🇷",name:"France",        r:"europe"},
  BE:{symbol:"€",  rate:0.00152, flag:"🇧🇪",name:"Belgium",       r:"europe"},
  DE:{symbol:"€",  rate:0.00152, flag:"🇩🇪",name:"Germany",       r:"europe"},
  GB:{symbol:"£",  rate:0.00130, flag:"🇬🇧",name:"United Kingdom",r:"europe"},
  US:{symbol:"$",  rate:0.00167, flag:"🇺🇸",name:"United States", r:"intl"},
};
const BASE = 9900;
const ALL_CC = Object.entries(CURRENCIES).map(([code,c])=>({code,...c}));
const fp = (fcfa,cc)=>{
  const cur=CURRENCIES[cc]||CURRENCIES.CM;
  const v=fcfa*cur.rate;
  return `${cur.symbol} ${(v>=1?Math.round(v):+v.toFixed(2)).toLocaleString()}`;
};

// Sample listings per category
const LISTINGS = {
  real_estate:[
    {id:101,title:"Luxury Villa — Douala Bonamoussadi",title_fr:"Villa de Luxe — Douala Bonamoussadi",price:85000000,sid:"s1",loc:"Douala, CM",img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",rating:4.8,views:1240,extra:{rooms:"5",location:"Bonamoussadi",title_doc:"TF No.4521",area:"380"}},
    {id:102,title:"3-Bedroom Apartment — Yaoundé Centre",title_fr:"Appartement 3 Pièces — Centre Yaoundé",price:25000000,sid:"s1",loc:"Yaoundé, CM",img:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",rating:4.5,views:654,extra:{rooms:"3",location:"Centre Ville",title_doc:"TF No.2201",area:"120"}},
  ],
  vehicles:[
    {id:201,title:"Toyota Land Cruiser V8 2022",title_fr:"Toyota Land Cruiser V8 2022",price:32000000,sid:"s3",loc:"Nairobi, KE",img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",rating:4.7,views:654,extra:{mileage:"41000",year:"2022",engine:"4.5L V8",fuel:"Diesel"}},
    {id:202,title:"Mercedes Benz C200 2020 — Clean",title_fr:"Mercedes Benz C200 2020 — Propre",price:18000000,sid:"s3",loc:"Lagos, NG",img:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",rating:4.6,views:432,extra:{mileage:"28000",year:"2020",engine:"2.0L Turbo",fuel:"Petrol"}},
  ],
  electronics:[
    {id:301,title:"iPhone 15 Pro Max 256GB — Sealed",title_fr:"iPhone 15 Pro Max 256Go — Neuf Scellé",price:550000,sid:"s2",loc:"Lagos, NG",img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",rating:4.9,views:890,extra:{}},
    {id:302,title:"Samsung 65\" 4K Smart TV",title_fr:"Samsung TV 65\" 4K Smart",price:380000,sid:"s2",loc:"Accra, GH",img:"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",rating:4.7,views:312,extra:{}},
  ],
  fashion:[
    {id:401,title:"Kente Fabric — Premium Grade Export",title_fr:"Tissu Kente — Grade Premium Export",price:45000,sid:"s4",loc:"Accra, GH",img:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",rating:5.0,views:432,extra:{}},
    {id:402,title:"Ankara Dress — Handmade Collection",title_fr:"Robe Ankara — Collection Artisanale",price:35000,sid:"s4",loc:"Abidjan, CI",img:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",rating:4.8,views:287,extra:{}},
  ],
  food:[
    {id:501,title:"50kg Bags Premium Basmati Rice",title_fr:"Sacs 50kg Riz Basmati Premium",price:28000,sid:"s5",loc:"Dakar, SN",img:"https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=600&q=80",rating:4.6,views:567,extra:{}},
    {id:502,title:"Palm Oil — 25L Drum Wholesale",title_fr:"Huile de Palme — Bidon 25L Gros",price:18000,sid:"s5",loc:"Douala, CM",img:"https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80",rating:4.5,views:341,extra:{}},
  ],
  building:[
    {id:601,title:"Solar Panel System 5KW Complete Kit",title_fr:"Système Panneaux Solaires 5KW Complet",price:1200000,sid:"s6",loc:"Joburg, ZA",img:"https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",rating:4.8,views:321,extra:{}},
    {id:602,title:"Portland Cement — 50 Bags Wholesale",title_fr:"Ciment Portland — 50 Sacs En Gros",price:95000,sid:"s6",loc:"Douala, CM",img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",rating:4.4,views:198,extra:{}},
  ],
  beauty:[
    {id:701,title:"Professional Hair Salon Chair Set",title_fr:"Set Chaises de Salon Professionnel",price:250000,sid:"s4",loc:"Abidjan, CI",img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",rating:4.7,views:215,extra:{}},
  ],
  home:[
    {id:801,title:"3-Seater Leather Sofa — Dark Brown",title_fr:"Canapé Cuir 3 Places — Marron Foncé",price:180000,sid:"s1",loc:"Douala, CM",img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",rating:4.6,views:176,extra:{}},
  ],
  logistics:[
    {id:901,title:"Container Shipping — Douala to Paris",title_fr:"Transport Conteneur — Douala vers Paris",price:2500000,sid:"s3",loc:"Douala, CM",img:"https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80",rating:4.8,views:423,extra:{}},
  ],
  services:[
    {id:1001,title:"Legal Services — Business Registration",title_fr:"Services Juridiques — Enregistrement Entreprise",price:150000,sid:"s2",loc:"Lagos, NG",img:"https://images.unsplash.com/photo-1521791055366-0d553872952f?w=600&q=80",rating:4.9,views:287,extra:{}},
  ],
  industrial:[
    {id:1101,title:"Diesel Generator 50KVA — Industrial",title_fr:"Générateur Diesel 50KVA — Industriel",price:4500000,sid:"s6",loc:"Joburg, ZA",img:"https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",rating:4.7,views:198,extra:{}},
  ],
  jobs:[
    {id:1201,title:"Warehouse Manager Needed — Douala",title_fr:"Responsable Entrepôt Recherché — Douala",price:0,sid:"s1",loc:"Douala, CM",img:"https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",rating:4.5,views:654,extra:{}},
  ],
};

const ALL_LISTINGS = Object.values(LISTINGS).flat();

// ─── Smart Search Keywords ────────────────────────────────────────
const SEARCH_KEYWORDS = {
  real_estate: [
    "house","home","maison","appartement","apartment","villa","land","terrain",
    "immo","immobilier","room","chambre","studio","duplex","plot","lot",
    "rent","louer","buy","acheter","property","propriete","douala","yaounde",
    "bonamoussadi","bonapriso","bastos","ngousso","logement","bungalow"
  ],
  building: [
    "cement","ciment","build","construire","construction","steel","acier",
    "solar","solaire","panel","iron","fer","sand","sable","gravel","gravier",
    "paint","peinture","tile","carrelage","brick","brique","roof","toit",
    "material","materiau","zinc","plywood","contreplaque","generator"
  ],
  logistics: [
    "ship","bateau","cargo","container","conteneur","truck","camion",
    "transport","delivery","livraison","freight","fret","port","courier",
    "send","envoyer","move","demenagement","shipping","colis","package",
    "transit","import","export","douane","customs","air","avion"
  ],
  vehicles: [
    "car","voiture","auto","truck","camion","motorcycle","moto","bike",
    "toyota","mercedes","honda","nissan","hyundai","bmw","ford","peugeot",
    "renault","spare","piece","engine","moteur","tyre","pneu","bus",
    "minibus","pickup","suv","4x4","land","cruiser","hilux","vehicle"
  ],
  electronics: [
    "phone","telephone","iphone","samsung","tecno","infinix","itel",
    "laptop","ordinateur","computer","tv","television","camera","cctv",
    "solar","panel","tablet","tablette","headphone","ecouteur","charger",
    "chargeur","electronic","electronique","wifi","router","decoder",
    "decodeur","fridge","refrigerateur","washing","machine","laver"
  ],
  beauty: [
    "hair","cheveux","braid","tresse","weave","wig","perruque","salon",
    "beauty","beaute","makeup","maquillage","skin","peau","cream","creme",
    "cosmetic","cosmetique","nail","ongle","barber","coiffure","lotion",
    "shampoo","shampooing","perfume","parfum","lipstick","rouge","eyelash"
  ],
  food: [
    "fish","poisson","meat","viande","chicken","poulet","rice","riz",
    "plantain","cassava","manioc","food","nourriture","market","marche",
    "grain","cereal","cereale","oil","huile","palm","cocoa","cacao",
    "coffee","cafe","vegetable","legume","fruit","tomato","tomate",
    "pepper","piment","onion","oignon","yam","igname","corn","mais",
    "ndole","eru","koki","achu","beignet","agriculture","farm","ferme"
  ],
  home: [
    "sofa","canape","bed","lit","mattress","matelas","table","chair","chaise",
    "furniture","meuble","kitchen","cuisine","fridge","refrigerateur",
    "microwave","curtain","rideau","carpet","tapis","lamp","lampe",
    "decoration","decor","wardrobe","armoire","shelf","etagere","home","maison"
  ],
  fashion: [
    "dress","robe","shirt","chemise","suit","costume","fabric","tissu",
    "wax","ankara","kente","lace","dentelle","jewelry","bijoux","bag","sac",
    "shoes","chaussures","fashion","mode","cloth","vetement","wear","habit",
    "traditional","traditionnel","ankara","boubou","kaftan","wedding","mariage"
  ],
  services: [
    "lawyer","avocat","legal","juridique","accounting","comptabilite",
    "marketing","service","doctor","medecin","architect","architecte",
    "engineer","ingenieur","consultant","advisor","conseil","audit",
    "insurance","assurance","tax","impot","notaire","notary","web","design"
  ],
  industrial: [
    "generator","generateur","machine","equipment","equipement","mining",
    "mine","safety","securite","industrial","industriel","pump","pompe",
    "crane","grue","forklift","chariot","welding","soudure","drill","perceuse",
    "factory","usine","power","energie","compressor","compresseur"
  ],
  jobs: [
    "job","emploi","work","travail","hire","recruter","cv","resume",
    "engineer","ingenieur","driver","chauffeur","secretary","secretaire",
    "accountant","comptable","manager","directeur","sales","commercial",
    "warehouse","entrepot","technician","technicien","intern","stagiaire",
    "nurse","infirmiere","teacher","professeur","cook","cuisinier"
  ],
};

function smartSearch(query) {
  const q = query.toLowerCase().trim();
  if (!q) return null;
  
  // Check direct category match
  for (const [catId, keywords] of Object.entries(SEARCH_KEYWORDS)) {
    for (const kw of keywords) {
      if (q.includes(kw) || kw.includes(q) || 
          (q.length >= 3 && kw.startsWith(q.substring(0,3)))) {
        return "cat_" + catId;
      }
    }
  }
  
  // Check listings directly
  const found = ALL_LISTINGS.filter(l => {
    const title = (l.title + " " + (l.title_fr||"") + " " + (l.loc||"")).toLowerCase();
    return title.includes(q) || q.split(" ").some(word => word.length>2 && title.includes(word));
  });
  
  if (found.length > 0) return "search_" + encodeURIComponent(query);
  return "search_" + encodeURIComponent(query);
}



const SELLERS = {
  s1:{id:"s1",name:"Kamdem Properties",cc:"CM",rating:4.8,count:18,joined:"Jan 2024",verified:true,av:"🏠",bio:"Premium real estate across Central Africa.",bio_fr:"Immobilier premium en Afrique Centrale.",soc:{wa:"+237600111222",fb:"KamdemProp",ig:"kamdem_realty",tt:"",yt:""}},
  s2:{id:"s2",name:"TechHub Lagos",    cc:"NG",rating:4.9,count:34,joined:"Mar 2023",verified:true,av:"📱",bio:"Nigeria's trusted tech reseller.",bio_fr:"Revendeur tech de confiance au Nigéria.",soc:{wa:"+234801234567",fb:"TechHubLagos",ig:"techhublagos",tt:"techhub_ng",yt:"TechHubNG"}},
  s3:{id:"s3",name:"AutoMart Kenya",   cc:"KE",rating:4.7,count:12,joined:"Feb 2024",verified:true,av:"🚗",bio:"Verified vehicle dealer, Nairobi.",bio_fr:"Concessionnaire vérifié, Nairobi.",soc:{wa:"+254712345678",fb:"AutoMartKE",ig:"automart_kenya",tt:"",yt:""}},
  s4:{id:"s4",name:"GoldCoast Textiles",cc:"GH",rating:5.0,count:47,joined:"Jun 2022",verified:true,av:"👗",bio:"Authentic Kente & Ghanaian fashion exports.",bio_fr:"Exports de mode Kente authentique.",soc:{wa:"+233201234567",fb:"GoldCoastFabric",ig:"goldcoast_textiles",tt:"goldcoasttextiles",yt:"GoldCoastTV"}},
  s5:{id:"s5",name:"SahelAgroTrade",   cc:"SN",rating:4.6,count:9, joined:"Sep 2024",verified:true,av:"🌾",bio:"West Africa wholesale grain & agro.",bio_fr:"Commerce de gros céréales Afrique de l'Ouest.",soc:{wa:"+221771234567",fb:"SahelAgro",ig:"sahel_agro",tt:"",yt:""}},
  s6:{id:"s6",name:"GreenPower SA",    cc:"ZA",rating:4.8,count:22,joined:"Nov 2023",verified:true,av:"☀️",bio:"Solar & renewable energy, Southern Africa.",bio_fr:"Énergie solaire et renouvelable, Afrique Australe.",soc:{wa:"+27811234567",fb:"GreenPowerSA",ig:"greenpower_sa",tt:"greenpower_sa",yt:"GreenPowerSA"}},
};

// ─── REAL Supabase Client ────────────────────────────────────────
import { createClient } from "@supabase/supabase-js";
const sb = createClient(SUPABASE_URL, SUPABASE_ANON);

async function sendEmailJS(templateId, params) {
  try {
    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE,
        template_id: templateId,
        user_id: EMAILJS_PUBLIC,
        template_params: params,
      }),
    });
  } catch(e){ console.error("[EMAILJS ERROR]",e); }
}

// Welcome email — bilingual
async function sendWelcomeEmail(to, name, lang) {
  const isFr = lang === "fr";
  await sendEmailJS(EMAILJS_T_WELCOME, {
    to_email: to,
    to_name: name,
    subject: isFr
      ? "🎉 Bienvenue sur AfriGate Market — Votre Porte vers l'Afrique et le Monde!"
      : "🎉 Welcome to AfriGate Market — Your Gate to Africa and the World!",
    message: isFr
      ? `Bonjour ${name},\n\nBienvenue sur AfriGate Market! Votre compte a été créé avec succès.\n\nVous pouvez maintenant publier des annonces, connecter avec des acheteurs en Afrique et dans le monde entier.\n\n🚀 Commencez à vendre GRATUITEMENT dès aujourd'hui!\n\nL'équipe AfriGate Market\nVotre Porte vers l'Afrique et le Monde`
      : `Hello ${name},\n\nWelcome to AfriGate Market! Your account has been created successfully.\n\nYou can now post listings and connect with buyers across Africa and the world.\n\n🚀 Start selling for FREE today!\n\nThe AfriGate Market Team\nYour Gate to Africa and the World`,
    from_name: "AfriGate Market",
    reply_to: "afrigatemarket@gmail.com",
  });
}

// Listing posted email — bilingual
async function sendListingEmail(to, name, title, lang) {
  const isFr = lang === "fr";
  await sendEmailJS(EMAILJS_T_LISTING, {
    to_email: to,
    to_name: name,
    subject: isFr
      ? `✅ Votre annonce "${title}" est en ligne!`
      : `✅ Your listing "${title}" is now live!`,
    message: isFr
      ? `Bonjour ${name},\n\nBonne nouvelle! Votre annonce "${title}" est maintenant publiée sur AfriGate Market et visible par des milliers d'acheteurs en Afrique et dans le monde.\n\n📊 Consultez votre Tableau de Bord pour suivre vos performances.\n\nL'équipe AfriGate Market`
      : `Hello ${name},\n\nGreat news! Your listing "${title}" is now live on AfriGate Market and visible to thousands of buyers across Africa and the world.\n\n📊 Check your Dashboard to track your performance.\n\nThe AfriGate Market Team`,
    from_name: "AfriGate Market",
    reply_to: "afrigatemarket@gmail.com",
  });
}

// Re-engagement email — bilingual (called after 2 weeks inactivity)
async function sendReengageEmail(to, name, lang) {
  const isFr = lang === "fr";
  await sendEmailJS(EMAILJS_T_WELCOME, {
    to_email: to,
    to_name: name,
    subject: isFr
      ? "👋 Vous nous manquez! Votre Marché Mondial vous attend"
      : "👋 We miss you! Your Global Market is waiting",
    message: isFr
      ? `Bonjour ${name},\n\nCela fait un moment que nous ne vous avons pas vu sur AfriGate Market. Votre marché mondial vous attend!\n\n🌍 De nouvelles annonces sont disponibles dans votre catégorie\n💰 De nouveaux acheteurs cherchent vos produits\n🚀 Revenez et continuez à grandir!\n\nCliquez ici pour vous connecter: https://afrigate.netlify.app\n\nL'équipe AfriGate Market`
      : `Hello ${name},\n\nWe haven't seen you on AfriGate Market for a while. Your global market is waiting!\n\n🌍 New listings are available in your category\n💰 New buyers are looking for your products\n🚀 Come back and keep growing!\n\nClick here to log in: https://afrigate.netlify.app\n\nThe AfriGate Market Team`,
    from_name: "AfriGate Market",
    reply_to: "afrigatemarket@gmail.com",
  });
}

// Check inactive users and send re-engagement (call on app load)
async function checkAndSendReengagement(user, lang) {
  if (!user) return;
  try {
    const lastSeen = localStorage.getItem("agm_last_seen_" + user.id);
    const now = Date.now();
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    const alreadySent = localStorage.getItem("agm_reengage_sent_" + user.id);
    if (lastSeen && (now - parseInt(lastSeen)) > twoWeeks && !alreadySent) {
      await sendReengageEmail(user.email, user.name || user.email.split("@")[0], lang);
      localStorage.setItem("agm_reengage_sent_" + user.id, "1");
    }
    // Update last seen timestamp
    localStorage.setItem("agm_last_seen_" + user.id, String(now));
    // Reset reengage flag if user is active again
    if (alreadySent) localStorage.removeItem("agm_reengage_sent_" + user.id);
  } catch(e){ console.error("[REENGAGE ERROR]",e); }
}

async function sendEmail(to, subject, html) {
  // Legacy wrapper — kept for compatibility
  console.log("[EMAIL]", to, subject);
}

// ─── Theme ────────────────────────────────────────────────────────
const C = {
  earth:"#8B4513", gold:"#D4AF37", kente:"#E8621A", forest:"#1A5C38",
  clay:"#C45D2A",  sand:"#F5E6C8", slate:"#1E2A3A", intBlue:"#1D4ED8",
  bg:"#F7F5F2",    bgCard:"#FFFFFF", border:"#E2D9CC",
  text:"#1A1208",  textSub:"#6B5B45", silver:"#94A3B8",
  success:"#25D366", danger:"#DC2626",
};

// ─── Shared UI ────────────────────────────────────────────────────
function Btn({children,onClick,v="primary",size="md",style:sx={},disabled=false}){
  const [h,setH]=useState(false);
  const pad=size==="sm"?"6px 14px":size==="lg"?"13px 30px":"9px 20px";
  const fs=size==="sm"?"11px":size==="lg"?"15px":"13px";
  const m={
    primary:{bg:disabled?"#ccc":`linear-gradient(135deg,${C.kente},${C.gold})`,col:"#fff",bo:"none"},
    secondary:{bg:h?C.gold:"transparent",col:h?"#fff":C.gold,bo:`1.5px solid ${C.gold}`},
    ghost:{bg:h?C.bg:"transparent",col:C.text,bo:`1px solid ${C.border}`},
    success:{bg:C.success,col:"#fff",bo:"none"},
    dark:{bg:h?C.slate:`${C.slate}EE`,col:"#fff",bo:"none"},
    blue:{bg:C.intBlue,col:"#fff",bo:"none"},
    outline_cat:{bg:h?"#fff":"transparent",col:C.text,bo:`1.5px solid ${C.border}`},
  };
  const s=m[v]||m.primary;
  return(
    <button disabled={disabled} onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onTouchStart={()=>setH(true)} onTouchEnd={()=>setH(false)}
      style={{display:"inline-flex",alignItems:"center",gap:"6px",padding:pad,borderRadius:"28px",cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",fontWeight:"700",transition:"all 0.18s",border:s.bo,outline:"none",background:s.bg,color:s.col,boxShadow:h&&!disabled?`0 4px 14px ${C.kente}40`:"none",fontSize:fs,opacity:disabled?.6:1,...sx}}>
      {children}
    </button>
  );
}
const Tag=({children,color=C.kente})=>(
  <span style={{display:"inline-flex",alignItems:"center",gap:"3px",padding:"2px 8px",borderRadius:"12px",fontSize:"10px",fontWeight:"700",background:`${color}18`,color,border:`1px solid ${color}33`}}>{children}</span>
);
function SH({title,sub}){
  return(
    <div style={{marginBottom:"6px"}}>
      <h2 style={{fontFamily:"'Georgia',serif",fontSize:"clamp(17px,2.6vw,25px)",fontWeight:"900",marginBottom:"3px"}}>
        <span style={{background:`linear-gradient(90deg,${C.kente},${C.gold})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{title}</span>
      </h2>
      {sub&&<p style={{color:C.textSub,fontSize:"13px"}}>{sub}</p>}
    </div>
  );
}
function KenteBg(){
  return(
    <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden",pointerEvents:"none"}}>
      <svg width="100%" height="100%" style={{opacity:.022}}>
        <defs><pattern id="kp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="none"/>
          <rect x="0" y="0" width="20" height="20" fill={C.gold}/>
          <rect x="20" y="20" width="20" height="20" fill={C.kente}/>
          <rect x="40" y="0" width="20" height="20" fill={C.forest}/>
          <rect x="0" y="40" width="20" height="20" fill={C.clay}/>
          <rect x="40" y="60" width="20" height="20" fill={C.intBlue}/>
          <circle cx="40" cy="40" r="12" fill="none" stroke={C.gold} strokeWidth="1.5"/>
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#kp)"/>
      </svg>
    </div>
  );
}

// ─── AfriGate Market Official Logo SVG ───────────────────────────
// Exact match: full closed outer circle, inner arc, bold A, diagonal arrow with tip
function AfriGateLogo({ size = 44 }) {
  return (
    <div style={{width:size,height:size,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* FULL closed outer circle */}
        <circle cx="50" cy="50" r="44" stroke="#C9A84C" strokeWidth="6" fill="none"/>
        {/* Inner partial arc — left+bottom portion only (open at top-right) */}
        <path d="M 68 18 A 30 30 0 1 0 82 68" stroke="#C9A84C" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Letter A — left leg */}
        <line x1="50" y1="25" x2="30" y2="75" stroke="#C9A84C" strokeWidth="6" strokeLinecap="round"/>
        {/* Letter A — right leg */}
        <line x1="50" y1="25" x2="70" y2="75" stroke="#C9A84C" strokeWidth="6" strokeLinecap="round"/>
        {/* Letter A — crossbar */}
        <line x1="37" y1="57" x2="63" y2="57" stroke="#C9A84C" strokeWidth="5" strokeLinecap="round"/>
        {/* Diagonal arrow shaft from bottom-left to top-right, exits circle */}
        <line x1="35" y1="80" x2="90" y2="20" stroke="#C9A84C" strokeWidth="5.5" strokeLinecap="round"/>
        {/* Arrow tip — pointing up-right, outside circle */}
        <polyline points="75,12 93,16 89,34" stroke="#C9A84C" strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ─── Language Switcher ────────────────────────────────────────────
function LangSwitch({lang,setLang}){
  return(
    <div style={{display:"flex",background:"rgba(255,255,255,0.15)",borderRadius:"20px",padding:"2px",gap:"2px"}}>
      {["en","fr"].map(l=>(
        <button key={l} onClick={()=>setLang(l)}
          style={{padding:"3px 12px",borderRadius:"18px",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:"700",fontSize:"11px",background:lang===l?C.gold:"transparent",color:lang===l?"#fff":C.sand,transition:"all 0.2s"}}>
          {l==="en"?"🇬🇧 EN":"🇫🇷 FR"}
        </button>
      ))}
    </div>
  );
}

// ─── Handshake Banner ─────────────────────────────────────────────
function HandshakeBanner({t}){
  return(
    <div style={{position:"relative",overflow:"hidden",borderRadius:"20px",margin:"0 20px 32px",minHeight:"190px",display:"flex",alignItems:"center",background:"#0a0a0a"}}>
      {/* Real photo: Black hand and White hand shaking = Africa meets the World */}
      <div style={{position:"absolute",inset:0,backgroundImage:"url(https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&q=80)",backgroundSize:"cover",backgroundPosition:"center",opacity:0.5}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.55) 60%,rgba(0,0,0,0.2) 100%)"}}/>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",opacity:.08}}>
        <svg viewBox="0 0 500 220" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(40,30)">
            <rect x="55" y="75" width="38" height="80" rx="19" fill="#2d1800"/>
            <rect x="44" y="50" width="14" height="52" rx="7" fill="#2d1800"/>
            <rect x="60" y="40" width="14" height="54" rx="7" fill="#2d1800"/>
            <rect x="76" y="44" width="14" height="50" rx="7" fill="#2d1800"/>
            <rect x="91" y="50" width="12" height="44" rx="6" fill="#2d1800"/>
            <rect x="52" y="76" width="58" height="30" rx="10" fill="#1a0e00"/>
          </g>
          <g transform="translate(460,30) scale(-1,1)">
            <rect x="55" y="75" width="38" height="80" rx="19" fill="#f0e0cc"/>
            <rect x="44" y="50" width="14" height="52" rx="7" fill="#f0e0cc"/>
            <rect x="60" y="40" width="14" height="54" rx="7" fill="#f0e0cc"/>
            <rect x="76" y="44" width="14" height="50" rx="7" fill="#f0e0cc"/>
            <rect x="91" y="50" width="12" height="44" rx="6" fill="#f0e0cc"/>
            <rect x="52" y="76" width="58" height="30" rx="10" fill="#ddc8a8"/>
          </g>
          <rect x="195" y="82" width="110" height="36" rx="18" fill="#888" opacity=".25"/>
          <circle cx="250" cy="100" r="50" fill="none" stroke="#D4AF37" strokeWidth="2" opacity=".35"/>
          <circle cx="250" cy="100" r="70" fill="none" stroke="#D4AF37" strokeWidth="1" opacity=".15"/>
        </svg>
      </div>
      <div style={{position:"absolute",inset:0,opacity:.06}}>
        <svg width="100%" height="100%" viewBox="0 0 800 200">
          {[0,1,2,3].map(i=><ellipse key={i} cx="400" cy="100" rx={60+i*80} ry="80" fill="none" stroke={C.gold} strokeWidth="1"/>)}
          <line x1="0" y1="100" x2="800" y2="100" stroke={C.gold} strokeWidth="1"/>
          <line x1="400" y1="0" x2="400" y2="200" stroke={C.gold} strokeWidth="1"/>
        </svg>
      </div>
      <div style={{position:"relative",zIndex:2,padding:"28px 32px",flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:"18px",marginBottom:"14px"}}>
          {/* Real handshake photo — black and white hands, Africa meets the World */}
          <div style={{flexShrink:0,width:"110px",height:"80px",borderRadius:"14px",overflow:"hidden",boxShadow:`0 4px 18px rgba(0,0,0,0.45)`,border:`2px solid ${C.gold}60`}}>
            <img
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
              alt="Handshake — Africa meets the World"
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}
            />
          </div>
          <div>
            <div style={{fontFamily:"'Georgia',serif",fontSize:"clamp(16px,2.5vw,22px)",fontWeight:"900",color:"#fff"}}>
              {t.africa_connects}
            </div>
          </div>
        </div>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:"13px",maxWidth:"520px",lineHeight:1.7,marginBottom:"16px"}}>
          {t.footer_nations}
        </p>
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
          {["🇨🇲","🇳🇬","🇬🇭","🇰🇪","🇿🇦","🇸🇳","🌐","🇫🇷","🇧🇪","🇩🇪","🇬🇧","🇺🇸"].map((f,i)=>(
            <span key={i} style={{fontSize:"20px"}}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────
function Header({cc,setCC,go,cartN,user,onLogout,lang,setLang}){
  const [q,setQ]=useState("");
  const t=T[lang];
  const cur=CURRENCIES[cc];
  return(
    <header style={{position:"sticky",top:0,zIndex:200,background:C.bgCard,borderBottom:`3px solid ${C.gold}`,boxShadow:"0 2px 18px rgba(0,0,0,0.07)"}}>
      {/* Ticker */}
      <div style={{background:`linear-gradient(90deg,${C.forest},${C.earth||"#8B4513"},${C.kente})`,padding:"5px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"11px",color:C.sand,flexWrap:"wrap",gap:"4px"}}>
        <span>{t.trial_ticker}</span>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <LangSwitch lang={lang} setLang={setLang}/>
          <select value={cc} onChange={e=>setCC(e.target.value)} style={{background:"rgba(0,0,0,0.35)",color:C.gold,border:`1px solid ${C.gold}80`,borderRadius:"4px",padding:"2px 6px",fontSize:"11px",cursor:"pointer"}}>
            <optgroup label="🌍 Africa">{ALL_CC.filter(c=>c.r==="africa").map(c=><option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}</optgroup>
            <optgroup label="🌐 International">{ALL_CC.filter(c=>c.r!=="africa").map(c=><option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}</optgroup>
          </select>
          <span onClick={()=>go("pricing")} style={{color:C.gold,cursor:"pointer",textDecoration:"underline",fontWeight:"800"}}>{cur.symbol} {Math.round(BASE*cur.rate).toLocaleString()}/mo →</span>
        </div>
      </div>
      {/* Main bar */}
      <div style={{padding:"10px 20px",display:"flex",alignItems:"center",gap:"11px",flexWrap:"wrap"}}>
        <div onClick={()=>go("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:"10px",flexShrink:0}}>
          {/* AfriGate Market Official Logo — full display, not clipped */}
          <div style={{width:"50px",height:"50px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <AfriGateLogo size={50}/>
          </div>
          <div>
            <div style={{display:"flex",alignItems:"baseline",gap:"0",lineHeight:1}}>
              <span style={{fontFamily:"'Segoe UI',Arial,sans-serif",fontWeight:"900",fontSize:"19px",color:"#1E2A3A",letterSpacing:"-0.5px"}}>AfriGate</span>
              <span style={{fontFamily:"'Segoe UI',Arial,sans-serif",fontWeight:"400",fontSize:"19px",color:"#1E2A3A",letterSpacing:"0px"}}> Market</span>
            </div>
            <div style={{fontSize:"8px",color:C.textSub,letterSpacing:"1px",fontWeight:"700",marginTop:"1px",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",maxWidth:"170px"}}>{t.tagline.toUpperCase()}</div>
          </div>
        </div>
        <div style={{flex:1,minWidth:"160px",position:"relative"}}>
          <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&q.trim()){const dest=smartSearch(q.trim());go(dest);}}} placeholder={t.search_ph}
            style={{width:"100%",padding:"9px 38px 9px 14px",borderRadius:"24px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",outline:"none",boxSizing:"border-box",fontFamily:"inherit",color:C.text}}/>
          <span onClick={()=>{if(q.trim()){const dest=smartSearch(q.trim());go(dest);}}} style={{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",opacity:.6,fontSize:"15px",cursor:"pointer"}}>🔍</span>
        </div>
        <div style={{display:"flex",gap:"7px",flexShrink:0,flexWrap:"wrap"}}>
          <Btn onClick={()=>go("sell")} size="sm">🏪 {t.sell}</Btn>
          <Btn onClick={()=>go("dashboard")} v="ghost" size="sm">📊 {t.dashboard}</Btn>
          {user
            ? <Btn onClick={onLogout} v="ghost" size="sm">👤 {user.name?.split(" ")[0]} ↩</Btn>
            : <Btn onClick={()=>go("login")} v="ghost" size="sm">🔑 {t.login}</Btn>
          }
          <Btn onClick={()=>go("pricing")} v="ghost" size="sm">💳 {lang==="en"?"Pricing":"Tarifs"}</Btn>
          
        </div>
      </div>
      {/* Category strip — grid layout so ALL categories always visible */}
      <div style={{borderTop:`1px solid ${C.border}`,background:C.bgCard,width:"100%",boxSizing:"border-box",padding:"4px 4px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"2px"}}>
          {CATS.map(cat=>(
            <button key={cat.id} onClick={()=>go("cat_"+cat.id)}
              style={{padding:"5px 4px",background:"none",border:"none",color:C.textSub,fontSize:"9px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",transition:"all 0.15s",fontFamily:"inherit",fontWeight:"600",textAlign:"center",lineHeight:1.2}}
              onMouseEnter={e=>{e.currentTarget.style.color=cat.color;e.currentTarget.style.background=cat.color+"14";}}
              onMouseLeave={e=>{e.currentTarget.style.color=C.textSub;e.currentTarget.style.background="transparent";}}>
              <span style={{fontSize:"16px"}}>{cat.icon}</span>
              <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"100%",display:"block"}}>{cat[lang].label}</span>
            </button>
          ))}
          <button onClick={()=>go("intl")}
            style={{padding:"5px 4px",background:"none",border:"none",color:C.intBlue,fontSize:"9px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",fontFamily:"inherit",fontWeight:"800",textAlign:"center",lineHeight:1.2}}
            onMouseEnter={e=>{e.currentTarget.style.background=C.intBlue+"14";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
            <span style={{fontSize:"16px"}}>🌐</span>
            <span>{t.intl_hub}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function Hero({go,lang}){
  const [s,setS]=useState(0);
  const t=T[lang];
  const SL=[
    {bg:"https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1400&q=75",tag:"Africa's #1 Marketplace / Marché N°1 d'Afrique",title:lang==="en"?"Your Gate to Africa\nand the World":"Votre Porte vers\nl'Afrique et le Monde",sub:lang==="en"?"Post unlimited listings. No daily cap. No limits.":"Publiez des annonces illimitées. Sans limite quotidienne.",dest:"register",ov:`linear-gradient(110deg,${C.earth||"#8B4513"}CC,#0D0D1A99 60%)`},
    {bg:"https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1400&q=75",tag:"🌐 International Trade Hub",title:lang==="en"?"Africa Meets\nEurope & Beyond":"L'Afrique Rencontre\nl'Europe et le Monde",sub:lang==="en"?"Connect with buyers in France 🇫🇷  Belgium 🇧🇪  Germany 🇩🇪  UK 🇬🇧":"Connectez avec des acheteurs en France 🇫🇷  Belgique 🇧🇪  Allemagne 🇩🇪  UK 🇬🇧",dest:"intl",ov:`linear-gradient(110deg,${C.intBlue}BB,#0D0D1ABB 60%)`,intl:true},
    {bg:"https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=75",tag:lang==="en"?"Build Your Digital Warehouse":"Construisez Votre Entrepôt Numérique",title:lang==="en"?"50 Listings a Day.\nYour Rules.":"Annonces Illimitées.\nVos Règles.",sub:lang==="en"?"Real Estate · Vehicles · Electronics · Fashion + 8 more categories.":"Immobilier · Véhicules · Électronique · Mode + 8 autres catégories.",dest:"sell",ov:`linear-gradient(110deg,${C.forest}CC,#0D0D1A99 60%)`},
  ];
  useEffect(()=>{const t=setInterval(()=>setS(x=>(x+1)%3),5500);return()=>clearInterval(t);},[]);
  const sl=SL[s];
  return(
    <div style={{position:"relative",height:"clamp(360px,56vh,560px)",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:`url(${sl.bg})`,backgroundSize:"cover",backgroundPosition:"center",transition:"all 1.1s",filter:"brightness(0.52)"}}/>
      <div style={{position:"absolute",inset:0,background:sl.ov}}/>
      <div style={{position:"absolute",right:"3%",top:"50%",transform:"translateY(-50%)",fontSize:"190px",opacity:.05,userSelect:"none",color:sl.intl?C.intBlue:C.gold}}>✦</div>
      <div style={{position:"relative",zIndex:2,height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 clamp(16px,5vw,40px)",maxWidth:"660px"}}>
        <Tag color={sl.intl?C.intBlue:C.kente}>{sl.tag}</Tag>
        <h1 style={{fontFamily:"'Georgia',serif",fontSize:"clamp(24px,4.5vw,52px)",fontWeight:"900",color:"#fff",lineHeight:1.1,margin:"13px 0",textShadow:"2px 4px 20px rgba(0,0,0,0.7)",whiteSpace:"pre-line"}}>{sl.title}</h1>
        <p style={{color:C.sand,fontSize:"clamp(12px,1.6vw,16px)",marginBottom:"24px",lineHeight:1.65}}>{sl.sub}</p>
        <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
          <Btn size="lg" onClick={()=>go(sl.dest)}>{t.start_free}</Btn>
          <Btn v="secondary" size="lg" onClick={()=>go("listings")}>{t.browse}</Btn>
        </div>
        <div style={{display:"flex",gap:"24px",marginTop:"28px",flexWrap:"wrap"}}>
          {[["50K+",lang==="en"?"Sellers":"Vendeurs"],["2M+",lang==="en"?"Listings":"Annonces"],["54+",lang==="en"?"Nations":"Nations"],["60",lang==="en"?"Free Days":"Jours Gratuits"]].map(([n,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:"20px",fontWeight:"900",color:C.gold}}>{n}</div>
              <div style={{fontSize:"10px",color:C.sand,letterSpacing:"1px"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{position:"absolute",bottom:"16px",left:"40px",display:"flex",gap:"7px"}}>
        {SL.map((_,i)=><div key={i} onClick={()=>setS(i)} style={{width:i===s?"22px":"8px",height:"8px",borderRadius:"4px",background:i===s?C.gold:"rgba(255,255,255,0.35)",cursor:"pointer",transition:"all 0.3s"}}/>)}
      </div>
      <a href={`https://wa.me/${MY_WA}?text=Hello%20Afrigatemarket!`} target="_blank" rel="noreferrer"
        style={{position:"absolute",bottom:"16px",right:"20px",background:C.success,borderRadius:"50px",padding:"11px 18px",display:"flex",alignItems:"center",gap:"7px",color:"#fff",fontWeight:"700",textDecoration:"none",fontSize:"13px",animation:"pulse 2s infinite"}}>
        <span style={{fontSize:"18px"}}>💬</span> {t.chat_wa}
      </a>
    </div>
  );
}

// ─── Category Grid (12 separate sections on home) ─────────────────
function CatGrid({go,lang}){
  const t=T[lang];
  return(
    <section style={{padding:"36px 20px",background:C.bg}}>
      <SH title={t.cat_title} sub={t.cat_sub}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))",gap:"10px",marginTop:"18px"}}>
        {CATS.map(cat=>(
          <div key={cat.id} onClick={()=>go("cat_"+cat.id)}
            style={{borderRadius:"16px",overflow:"hidden",cursor:"pointer",
                    border:`2px solid ${cat.color}`,transition:"all 0.2s",
                    background:`linear-gradient(160deg, ${cat.color}22 0%, ${cat.color}08 100%)`,
                    boxShadow:`0 2px 8px ${cat.color}20`}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=cat.color;e.currentTarget.style.boxShadow="0 6px 18px rgba(0,0,0,0.1)";e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
            {/* 3-image preview strip */}
            <div style={{position:"relative",height:"72px",overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",height:"72px"}}>
                {cat.imgs.slice(0,3).map((img,i)=>(
                  <img key={i} src={img} alt="" loading="lazy"
                    style={{width:"100%",height:"72px",objectFit:"cover"}}
                    onError={e=>{e.target.style.display="none";}}
                  />
                ))}
              </div>
              <div style={{position:"absolute",top:"4px",right:"6px",fontSize:"20px"}}>{cat.icon}</div>
              <div style={{position:"absolute",bottom:0,left:0,right:0,height:"24px",background:`linear-gradient(to top, ${cat.color}66, transparent)`}}/>
            </div>
            <div style={{padding:"10px 10px 12px",background:`${cat.color}14`}}>
              <div style={{fontWeight:"800",fontSize:"12px",color:cat.color,marginBottom:"2px"}}>{cat[lang].label}</div>
              <div style={{fontSize:"9px",color:C.textSub,lineHeight:1.4,marginBottom:"3px"}}>{cat[lang].sub}</div>
              <div style={{fontSize:"9px",color:cat.color,fontWeight:"700"}}>📸 {t.photos_per} →</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Listing Card ─────────────────────────────────────────────────
function Card({listing,cc,go,lang}){
  const [h,setH]=useState(false);
  const t=T[lang];
  const cat=CATS.find(c=>c.id===(listing.cat||listing.category));
  const seller=SELLERS[listing.sid]||{name:"Unknown",verified:false,soc:{wa:MY_WA}};
  const title=lang==="fr"&&listing.title_fr ? listing.title_fr : listing.title;
  return(
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={()=>go("listing_"+listing.id)}
      style={{background:C.bgCard,borderRadius:"15px",overflow:"hidden",border:`1px solid ${h?cat?.color||C.kente:C.border}`,cursor:"pointer",transition:"all 0.2s",transform:h?"translateY(-4px)":"none",boxShadow:h?`0 10px 26px ${cat?.color||C.kente}20`:"0 1px 4px rgba(0,0,0,0.05)"}}>
      <div style={{position:"relative",height:"180px",overflow:"hidden",background:C.bg}}>
        <img src={listing.img} alt={title} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.4s",transform:h?"scale(1.07)":"scale(1)"}}/>
        <div style={{position:"absolute",top:"8px",left:"8px"}}><Tag color={cat?.color||C.kente}>{cat?.icon} {cat?.[lang]?.label}</Tag></div>
        {seller.verified&&<div style={{position:"absolute",top:"8px",right:"8px",background:C.success,borderRadius:"6px",padding:"2px 6px",fontSize:"9px",color:"#fff",fontWeight:"700"}}>{t.verified}</div>}
        <div style={{position:"absolute",bottom:"8px",right:"8px",background:"rgba(0,0,0,0.65)",borderRadius:"6px",padding:"2px 6px",fontSize:"10px",color:"#fff"}}>👁 {listing.views}</div>
      </div>
      <div style={{padding:"13px"}}>
        <div style={{fontWeight:"700",fontSize:"13px",color:C.text,marginBottom:"4px",lineHeight:1.3,minHeight:"34px"}}>{title}</div>
        {listing.price>0
          ? <div style={{color:C.kente,fontWeight:"900",fontSize:"16px",marginBottom:"6px"}}>{fp(listing.price,cc)}</div>
          : <div style={{color:C.intBlue,fontWeight:"700",fontSize:"13px",marginBottom:"6px"}}>{lang==="en"?"Contact for details":"Contactez pour détails"}</div>
        }
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}>
          <span style={{fontSize:"11px",color:C.textSub}}>📍 {listing.loc}</span>
          <span style={{fontSize:"11px",color:C.gold,fontWeight:"700"}}>⭐ {listing.rating}</span>
        </div>
        <div onClick={e=>{e.stopPropagation();go("store_"+listing.sid)}} style={{fontSize:"11px",color:C.intBlue,cursor:"pointer",marginBottom:"8px",fontWeight:"600"}}>🏪 {seller.name}</div>
        <a href={`https://wa.me/${(seller.soc?.wa||MY_WA).replace(/\D/g,"")}?text=Hi! I found this on Afrigatemarket: ${encodeURIComponent(title)}`}
          target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}
          style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",padding:"8px",borderRadius:"9px",background:"#25D36614",border:"1px solid #25D36636",color:C.success,textDecoration:"none",fontSize:"12px",fontWeight:"700"}}
          onMouseEnter={e=>e.currentTarget.style.background="#25D36625"} onMouseLeave={e=>e.currentTarget.style.background="#25D36614"}>
          💬 {t.chat_wa}
        </a>
      </div>
    </div>
  );
}

// ─── DEDICATED CATEGORY PAGE (fully separated, no mixing) ─────────
function CatPage({cid,cc,go,lang}){
  const t=T[lang];
  const cat=CATS.find(c=>c.id===cid);
  const items=(LISTINGS[cid]||[]);
  const [imgIdx,setImgIdx]=useState(0);

  // Auto-rotate banner images
  useEffect(()=>{
    const timer=setInterval(()=>setImgIdx(i=>(i+1)%cat.imgs.length),3000);
    return()=>clearInterval(timer);
  },[cid]);

  if(!cat) return null;

  return(
    <div style={{maxWidth:"1200px",margin:"0 auto",padding:"26px 20px"}}>
      <button onClick={()=>go("home")} style={{background:"none",border:"none",color:C.intBlue,cursor:"pointer",marginBottom:"16px",fontSize:"13px",fontFamily:"inherit",fontWeight:"600"}}>
        ← {lang==="en"?"Back to Home":"Retour à l'Accueil"}
      </button>

      {/* Category Hero Banner with 10-image carousel */}
      <div style={{position:"relative",borderRadius:"20px",overflow:"hidden",height:"240px",marginBottom:"24px"}}>
        {/* Full-width image rotator */}
        <img src={cat.imgs[imgIdx]} alt={cat[lang].label} loading="lazy"
          style={{width:"100%",height:"100%",objectFit:"cover",transition:"all 0.8s ease"}}/>
        {/* Dark overlay */}
        <div style={{position:"absolute",inset:0,background:`linear-gradient(90deg,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.3) 100%)`}}/>
        {/* Category info */}
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",padding:"0 clamp(12px,4vw,32px)",gap:"12px"}}>
          <div style={{width:"72px",height:"72px",borderRadius:"50%",background:`${cat.color}33`,border:`3px solid ${cat.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"34px",flexShrink:0,boxShadow:`0 0 20px ${cat.color}60`}}>
            {cat.icon}
          </div>
          <div>
            <h1 style={{fontFamily:"'Georgia',serif",color:"#fff",fontSize:"clamp(20px,3vw,32px)",marginBottom:"6px",textShadow:"2px 4px 12px rgba(0,0,0,0.8)"}}>
              {cat[lang].label}
            </h1>
            <p style={{color:"rgba(255,255,255,0.8)",fontSize:"14px",marginBottom:"10px"}}>{cat[lang].banner}</p>
            <Tag color={cat.color}>{cat[lang].sub}</Tag>
          </div>
        </div>
        {/* 10-image dots */}
        <div style={{position:"absolute",bottom:"12px",right:"16px",display:"flex",gap:"5px"}}>
          {cat.imgs.map((_,i)=>(
            <div key={i} onClick={()=>setImgIdx(i)}
              style={{width:i===imgIdx?"18px":"6px",height:"6px",borderRadius:"3px",background:i===imgIdx?"#fff":"rgba(255,255,255,0.4)",cursor:"pointer",transition:"all 0.3s"}}/>
          ))}
        </div>
        {/* Thumbnail strip at bottom */}
        <div style={{position:"absolute",bottom:"30px",left:"16px",display:"flex",gap:"4px"}}>
          {cat.imgs.slice(0,5).map((img,i)=>(
            <img key={i} src={img} alt="" loading="lazy" onClick={()=>setImgIdx(i)}
              style={{width:"40px",height:"40px",objectFit:"cover",borderRadius:"6px",border:`2px solid ${i===imgIdx?"#fff":"rgba(255,255,255,0.3)"}`,cursor:"pointer",transition:"border 0.2s"}}/>
          ))}
          <div style={{width:"40px",height:"40px",borderRadius:"6px",background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"9px",color:"#fff",fontWeight:"700",border:"2px solid rgba(255,255,255,0.3)"}}>
            +5
          </div>
        </div>
      </div>

      {/* Stats bar for this category */}
      <div style={{display:"flex",gap:"12px",marginBottom:"24px",flexWrap:"wrap"}}>
        {[
          {icon:"📦",val:items.length||0,label:lang==="en"?"Active Listings":"Annonces Actives"},
          {icon:"📸",val:"10",label:lang==="en"?"Photos/Listing":"Photos/Annonce"},
          {icon:"🌍",val:"54",label:lang==="en"?"Nations":"Nations"},
          {icon:"💬",val:"WhatsApp",label:lang==="en"?"Direct Contact":"Contact Direct"},
        ].map(s=>(
          <div key={s.label} style={{background:C.bgCard,borderRadius:"12px",padding:"12px 16px",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:"8px",flex:"1",minWidth:"130px"}}>
            <span style={{fontSize:"20px"}}>{s.icon}</span>
            <div>
              <div style={{fontWeight:"900",fontSize:"16px",color:cat.color}}>{s.val}</div>
              <div style={{fontSize:"10px",color:C.textSub}}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* LISTINGS — only this category, no mixing */}
      <div style={{marginBottom:"14px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px"}}>
        <SH
          title={lang==="en"?`${cat[lang].label} Listings`:`Annonces — ${cat[lang].label}`}
          sub={lang==="en"?`${items.length} listings in ${cat[lang].label} · No mixing with other categories`:`${items.length} annonces dans ${cat[lang].label} · Aucun mélange avec d'autres catégories`}
        />
        <Btn onClick={()=>go("sell")} size="sm">+ {lang==="en"?"Post in this category":"Publier dans cette catégorie"}</Btn>
      </div>

      {items.length>0 ? (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(258px,100%),1fr))",gap:"16px"}}>
          {items.map(l=><Card key={l.id} listing={{...l,cat:cid,category:cid}} cc={cc} go={go} lang={lang}/>)}
        </div>
      ) : (
        <div style={{textAlign:"center",padding:"60px",background:C.bgCard,borderRadius:"16px",border:`2px dashed ${cat.color}40`}}>
          <div style={{fontSize:"48px",marginBottom:"12px"}}>{cat.icon}</div>
          <div style={{fontWeight:"800",color:C.text,fontSize:"16px",marginBottom:"6px"}}>
            {lang==="en"?`Be the first seller in ${cat[lang].label}!`:`Soyez le premier vendeur en ${cat[lang].label}!`}
          </div>
          <p style={{color:C.textSub,fontSize:"13px",marginBottom:"16px"}}>
            {lang==="en"?"Post your first listing here. Buyers are waiting!":"Publiez votre première annonce ici. Les acheteurs attendent!"}
          </p>
          <Btn onClick={()=>go("sell")}>
            {lang==="en"?`Post in ${cat[lang].label}`:`Publier dans ${cat[lang].label}`}
          </Btn>
        </div>
      )}

      {/* Related categories — OTHER categories with no overlap */}
      <div style={{marginTop:"40px",padding:"20px",background:C.bg,borderRadius:"16px",border:`1px solid ${C.border}`}}>
        <div style={{fontWeight:"800",color:C.text,fontSize:"14px",marginBottom:"14px"}}>
          {lang==="en"?"Browse Other Categories (Separate Sections)":"Parcourir d'autres Catégories (Sections Séparées)"}
        </div>
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
          {CATS.filter(c=>c.id!==cid).map(c=>(
            <button key={c.id} onClick={()=>go("cat_"+c.id)}
              style={{padding:"7px 14px",borderRadius:"20px",border:`1.5px solid ${c.color}50`,background:`${c.color}12`,color:C.text,cursor:"pointer",fontSize:"12px",fontFamily:"inherit",fontWeight:"600",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=c.color;e.currentTarget.style.background=""+c.color+"25";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=c.color+"80";e.currentTarget.style.background=""+c.color+"12";}}>
              {c.icon} {c[lang].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Featured on homepage ─────────────────────────────────────────
function Featured({cc,go,lang}){
  const t=T[lang];
  const isFr=lang==="fr";
  const [realListings,setRealListings]=useState([]);
  const [loaded,setLoaded]=useState(false);

  useEffect(()=>{
    async function load(){
      try{
        const {data}=await sb.from("listings").select("*").eq("status","live").order("created_at",{ascending:false}).limit(6);
        setRealListings(data||[]);
      }catch(e){setRealListings([]);}
      setLoaded(true);
    }
    load();
  },[]);

  const demoMixed=CATS.map(cat=>(LISTINGS[cat.id]||[])[0]).filter(Boolean).slice(0,6);

  return(
    <section style={{padding:"36px 20px",background:C.bgCard}}>
      <SH title={t.featured} sub={realListings.length>0?`${realListings.length} ${isFr?"nouvelles annonces":"new listings from sellers"}`:t.featured_sub}/>

      {/* Real seller listings FIRST */}
      {realListings.length>0&&(
        <>
          <div style={{display:"flex",alignItems:"center",gap:"8px",margin:"12px 0 14px"}}>
            <span style={{fontSize:"12px",color:C.kente,fontWeight:"800"}}>🔥 {isFr?"Annonces récentes des vendeurs":"Recent seller listings"}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(258px,100%),1fr))",gap:"16px",marginBottom:"20px"}}>
            {realListings.map(l=><RealCard key={"r"+l.id} listing={l} cc={cc} go={go} lang={lang}/>)}
          </div>
        </>
      )}

      {/* Demo examples */}
      <div style={{display:"flex",alignItems:"center",gap:"8px",margin:"4px 0 14px"}}>
        <span style={{fontSize:"12px",color:C.gold,fontWeight:"800"}}>📋 {isFr?"Exemples de catégories":"Category examples"}</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(258px,100%),1fr))",gap:"16px",marginTop:"4px"}}>
        {demoMixed.map(l=>{
          const catId=Object.entries(LISTINGS).find(([,items])=>items.some(i=>i.id===l.id))?.[0]||"";
          return <Card key={l.id} listing={{...l,cat:catId,category:catId}} cc={cc} go={go} lang={lang}/>;
        })}
      </div>
      <div style={{textAlign:"center",marginTop:"24px"}}><Btn size="lg" onClick={()=>go("listings")}>{t.view_all}</Btn></div>
    </section>
  );
}

// ─── All Listings page ────────────────────────────────────────────

// ─── Real Listing Card (from Supabase) ───────────────────────────
function RealCard({listing,cc,go,lang}){
  const isFr=lang==="fr";
  const cat=CATS.find(c=>c.id===listing.category);
  const [h,setH]=useState(false);
  const images=listing.images&&listing.images.length>0?listing.images:null;
  return(
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      onClick={()=>go("real_"+listing.id)}
      style={{background:C.bgCard,borderRadius:"16px",border:`1px solid ${h?cat?.color||C.kente:C.border}`,overflow:"hidden",cursor:"pointer",transition:"all 0.2s",transform:h?"translateY(-3px)":"none",boxShadow:h?"0 8px 24px rgba(0,0,0,0.12)":"0 1px 4px rgba(0,0,0,0.05)"}}>
      {/* Image or icon */}
      <div style={{height:"168px",background:images?`url(${images[0]}) center/cover`:`${cat?.color||C.kente}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"52px",position:"relative"}}>
        {!images&&(cat?.icon||"📦")}
        {listing.delivery_available&&(
          <div style={{position:"absolute",top:"8px",right:"8px",background:C.forest,color:"#fff",borderRadius:"12px",padding:"2px 8px",fontSize:"10px",fontWeight:"700"}}>🚚 {isFr?"Livraison":"Delivery"}</div>
        )}
        <div style={{position:"absolute",top:"8px",left:"8px",background:"rgba(0,0,0,0.5)",color:"#fff",borderRadius:"8px",padding:"2px 7px",fontSize:"10px",fontWeight:"700"}}>
          {cat?.icon} {cat?.[lang]?.label||listing.category}
        </div>
      </div>
      <div style={{padding:"12px"}}>
        <div style={{fontWeight:"700",color:C.text,fontSize:"13px",marginBottom:"4px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{listing.title}</div>
        <div style={{color:C.kente,fontWeight:"900",fontSize:"15px",marginBottom:"6px"}}>{listing.price>0?fp(listing.price,cc):(isFr?"Contactez":"Contact")}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"4px"}}>
          <span style={{fontSize:"11px",color:C.textSub}}>📍 {listing.location||listing.country}</span>
          <span style={{fontSize:"11px",color:C.gold}}>👁 {listing.views||0}</span>
        </div>
        {listing.seller_whatsapp&&(
          <a href={`https://wa.me/${listing.seller_whatsapp.replace(/[^0-9]/g,"")}`}
            target="_blank" rel="noreferrer"
            onClick={e=>e.stopPropagation()}
            style={{display:"inline-flex",alignItems:"center",gap:"4px",marginTop:"8px",padding:"5px 12px",borderRadius:"16px",background:"#25D36620",border:"1px solid #25D36650",color:C.success,textDecoration:"none",fontSize:"11px",fontWeight:"700"}}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Real Listing Detail Page ─────────────────────────────────────
function RealListingDetail({id,go,cc,lang,user}){
  const isFr=lang==="fr";
  const [listing,setListing]=useState(null);
  const [loading,setLoading]=useState(true);
  const [imgIdx,setImgIdx]=useState(0);

  useEffect(()=>{
    async function load(){
      setLoading(true);
      try{
        const {data}=await sb.from("listings").select("*").eq("id",id).single();
        if(data){
          // increment views
          await sb.from("listings").update({views:(data.views||0)+1}).eq("id",id);
          setListing({...data,views:(data.views||0)+1});
        }
      }catch(e){console.error(e);}
      setLoading(false);
    }
    load();
  },[id]);

  if(loading) return <div style={{textAlign:"center",padding:"80px",color:C.textSub}}>Loading...</div>;
  if(!listing) return(
    <div style={{textAlign:"center",padding:"80px"}}>
      <div style={{fontSize:"48px",marginBottom:"12px"}}>😕</div>
      <div style={{color:C.text,fontWeight:"700"}}>{isFr?"Annonce introuvable":"Listing not found"}</div>
      <Btn onClick={()=>go("listings")} style={{marginTop:"16px"}}>{isFr?"Voir toutes les annonces":"Browse all listings"}</Btn>
    </div>
  );

  const cat=CATS.find(c=>c.id===listing.category);
  const images=listing.images&&listing.images.length>0?listing.images:null;

  return(
    <div style={{maxWidth:"900px",margin:"0 auto",padding:"20px 16px 60px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
        <button onClick={()=>go("listings")} style={{background:"none",border:"none",color:C.intBlue,cursor:"pointer",fontSize:"13px",fontFamily:"inherit",fontWeight:"600"}}>← {isFr?"Retour":"Back"}</button>
        <button onClick={()=>go("report_"+listing.id)} style={{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"12px",fontFamily:"inherit",fontWeight:"700",padding:"5px 10px",borderRadius:"16px",border:"1px solid #DC262630"}}>🚨 {isFr?"Signaler":"Report"}</button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:"20px"}}>
        {/* Images */}
        <div>
          <div style={{borderRadius:"14px",overflow:"hidden",height:"280px",background:cat?`${cat.color}18`:`${C.kente}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"64px",marginBottom:"8px"}}>
            {images
              ? <img src={images[imgIdx]} alt={listing.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              : cat?.icon||"📦"
            }
          </div>
          {images&&images.length>1&&(
            <div style={{display:"flex",gap:"5px",overflowX:"auto"}}>
              {images.map((src,i)=>(
                <img key={i} src={src} alt="" onClick={()=>setImgIdx(i)}
                  style={{width:"52px",height:"52px",objectFit:"cover",borderRadius:"6px",border:`2px solid ${i===imgIdx?C.gold:C.border}`,cursor:"pointer",flexShrink:0}}/>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {cat&&<div style={{marginBottom:"8px"}}><Tag color={cat.color}>{cat.icon} {cat[lang]?.label}</Tag></div>}
          <h1 style={{fontFamily:"'Georgia',serif",fontSize:"20px",color:C.text,marginBottom:"8px",lineHeight:1.3}}>{listing.title}</h1>
          <div style={{color:C.kente,fontSize:"26px",fontWeight:"900",marginBottom:"10px"}}>{listing.price>0?fp(listing.price,cc):(isFr?"Prix sur demande":"Price on request")}</div>

          <div style={{display:"flex",gap:"12px",flexWrap:"wrap",marginBottom:"12px"}}>
            <span style={{fontSize:"12px",color:C.textSub}}>📍 {listing.location||listing.country}</span>
            <span style={{fontSize:"12px",color:C.gold}}>👁 {listing.views||0} {isFr?"vues":"views"}</span>
            <span style={{fontSize:"12px",color:C.textSub}}>📅 {new Date(listing.created_at).toLocaleDateString()}</span>
          </div>

          {listing.description&&(
            <div style={{background:C.bgCard,borderRadius:"10px",border:`1px solid ${C.border}`,padding:"12px",marginBottom:"12px",fontSize:"13px",color:C.textSub,lineHeight:1.7}}>
              {listing.description}
            </div>
          )}

          {/* Delivery info */}
          {listing.delivery_available&&(
            <div style={{background:`${C.forest}14`,border:`1px solid ${C.forest}40`,borderRadius:"10px",padding:"12px",marginBottom:"12px"}}>
              <div style={{fontWeight:"700",color:C.forest,fontSize:"13px",marginBottom:"4px"}}>🚚 {isFr?"Livraison disponible":"Delivery available"}</div>
              {listing.delivery_price>0&&<div style={{fontSize:"12px",color:C.textSub}}>{isFr?"Prix:":"Price:"} {fp(listing.delivery_price,cc)}</div>}
              {listing.delivery_zone&&<div style={{fontSize:"12px",color:C.textSub}}>{isFr?"Zone:":"Zone:"} {listing.delivery_zone}</div>}
              {listing.delivery_notes&&<div style={{fontSize:"12px",color:C.textSub}}>{listing.delivery_notes}</div>}
            </div>
          )}

          {/* Seller name */}
          {listing.seller_name&&(
            <div style={{fontSize:"12px",color:C.textSub,marginBottom:"12px"}}>👤 {isFr?"Vendeur":"Seller"}: <strong style={{color:C.text}}>{listing.seller_name}</strong></div>
          )}

          {/* WhatsApp contact */}
          {listing.seller_whatsapp?(
            <a href={`https://wa.me/${listing.seller_whatsapp.replace(/[^0-9]/g,"")}?text=${encodeURIComponent(isFr?`Bonjour! J'ai trouvé votre annonce "${listing.title}" sur AfriGate Market. Je suis intéressé(e).`:`Hello! I found your listing "${listing.title}" on AfriGate Market. I'm interested.`)}`}
              target="_blank" rel="noreferrer"
              style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",padding:"14px",borderRadius:"14px",background:"#25D366",color:"#fff",textDecoration:"none",fontWeight:"800",fontSize:"15px",marginBottom:"10px"}}>
              💬 {isFr?"Contacter sur WhatsApp":"Contact on WhatsApp"}
            </a>
          ):(
            <a href={`https://wa.me/${MY_WA}?text=${encodeURIComponent(isFr?`Bonjour! Je suis intéressé par l'annonce "${listing.title}" sur AfriGate Market.`:`Hello! I'm interested in the listing "${listing.title}" on AfriGate Market.`)}`}
              target="_blank" rel="noreferrer"
              style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",padding:"14px",borderRadius:"14px",background:"#25D366",color:"#fff",textDecoration:"none",fontWeight:"800",fontSize:"15px",marginBottom:"10px"}}>
              💬 {isFr?"Contacter via WhatsApp":"Contact via WhatsApp"}
            </a>
          )}
          <Btn v="ghost" onClick={()=>go("sell")} style={{width:"100%",justifyContent:"center"}}>➕ {isFr?"Publier ma propre annonce":"Post my own listing"}</Btn>
        </div>
      </div>
    </div>
  );
}

function AllListings({cc,go,lang}){
  const t=T[lang];
  const isFr=lang==="fr";
  const [f,setF]=useState("all");
  const [realListings,setRealListings]=useState([]);
  const [loadingReal,setLoadingReal]=useState(true);

  // Load real listings from Supabase
  useEffect(()=>{
    async function loadReal(){
      setLoadingReal(true);
      try{
        let q=sb.from("listings").select("*").eq("status","live").order("created_at",{ascending:false});
        if(f!=="all") q=q.eq("category",f);
        const {data}=await q;
        setRealListings(data||[]);
      }catch(e){setRealListings([]);}
      setLoadingReal(false);
    }
    loadReal();
  },[f]);

  const demoShown=f==="all"?ALL_LISTINGS:ALL_LISTINGS.filter(l=>{
    const catId=Object.entries(LISTINGS).find(([,items])=>items.some(i=>i.id===l.id))?.[0]||"";
    return catId===f;
  });

  return(
    <div style={{maxWidth:"1200px",margin:"0 auto",padding:"26px 20px"}}>
      <SH title={t.all_listings} sub={realListings.length>0?`${realListings.length} ${isFr?"annonces en ligne":"live listings"}`:t.all_lst_sub}/>
      <div style={{display:"flex",gap:"7px",overflowX:"auto",padding:"12px 0",scrollbarWidth:"none"}}>
        <button onClick={()=>setF("all")} style={{padding:"6px 14px",borderRadius:"18px",border:`1.5px solid ${f==="all"?C.kente:C.border}`,background:f==="all"?`${C.kente}16`:C.bgCard,color:f==="all"?C.kente:C.textSub,cursor:"pointer",fontSize:"12px",fontWeight:"700",whiteSpace:"nowrap",fontFamily:"inherit"}}>
          {t.all_filter}
        </button>
        {CATS.map(c=>(
          <button key={c.id} onClick={()=>setF(c.id)} style={{padding:"6px 14px",borderRadius:"18px",border:`1.5px solid ${f===c.id?c.color:C.border}`,background:f===c.id?`${c.color}16`:C.bgCard,color:f===c.id?c.color:C.textSub,cursor:"pointer",fontSize:"12px",fontWeight:"700",whiteSpace:"nowrap",fontFamily:"inherit"}}>
            {c.icon} {c[lang].label}
          </button>
        ))}
      </div>

      {/* REAL listings from Supabase — shown FIRST */}
      {realListings.length>0&&(
        <>
          <div style={{display:"flex",alignItems:"center",gap:"8px",margin:"8px 0 12px"}}>
            <div style={{height:"2px",flex:1,background:`linear-gradient(90deg,${C.kente},transparent)`}}/>
            <span style={{fontSize:"11px",color:C.kente,fontWeight:"800"}}>🔥 {isFr?"Annonces des Vendeurs":"Seller Listings"}</span>
            <div style={{height:"2px",flex:1,background:`linear-gradient(270deg,${C.kente},transparent)`}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(258px,100%),1fr))",gap:"16px",marginBottom:"24px"}}>
            {realListings.map(l=><RealCard key={"r"+l.id} listing={l} cc={cc} go={go} lang={lang}/>)}
          </div>
        </>
      )}
      {loadingReal&&<div style={{textAlign:"center",padding:"20px",color:C.textSub,fontSize:"13px"}}>🔄 {isFr?"Chargement des annonces...":"Loading listings..."}</div>}

      {/* Demo listings as examples */}
      <div style={{display:"flex",alignItems:"center",gap:"8px",margin:"8px 0 12px"}}>
        <div style={{height:"2px",flex:1,background:`linear-gradient(90deg,${C.gold},transparent)`}}/>
        <span style={{fontSize:"11px",color:C.gold,fontWeight:"800"}}>📋 {isFr?"Exemples d'annonces":"Sample listings"}</span>
        <div style={{height:"2px",flex:1,background:`linear-gradient(270deg,${C.gold},transparent)`}}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(258px,100%),1fr))",gap:"16px",marginTop:"8px"}}>
        {demoShown.map(l=>{
          const catId=Object.entries(LISTINGS).find(([,items])=>items.some(i=>i.id===l.id))?.[0]||"";
          return <Card key={l.id} listing={{...l,cat:catId,category:catId}} cc={cc} go={go} lang={lang}/>;
        })}
      </div>
      {!loadingReal&&realListings.length===0&&demoShown.length===0&&(
        <div style={{textAlign:"center",padding:"56px",background:C.bgCard,borderRadius:"16px",border:`1px solid ${C.border}`,marginTop:"16px"}}>
          <div style={{fontSize:"42px",marginBottom:"9px"}}>📭</div>
          <div style={{fontWeight:"700",color:C.text,marginBottom:"8px"}}>{t.be_first}</div>
          <Btn onClick={()=>go("sell")}>{t.post_first}</Btn>
        </div>
      )}
    </div>
  );
}

// ─── International Hub Section ────────────────────────────────────
function IntlSection({go,lang}){
  const t=T[lang];
  const P=[
    {cc:"FR",name:"France",flag:"🇫🇷",desc:lang==="en"?"Luxury goods, agri exports, EU market":"Produits de luxe, exports agri, marché UE",color:"#003189"},
    {cc:"BE",name:"Belgium",flag:"🇧🇪",desc:lang==="en"?"Diamonds, chocolate, EU logistics":"Diamants, chocolat, logistique UE",color:"#EF3340"},
    {cc:"DE",name:"Germany",flag:"🇩🇪",desc:lang==="en"?"Industrial, automotive & solar":"Industriel, automobile et solaire",color:"#D4A017"},
    {cc:"GB",name:"UK",     flag:"🇬🇧",desc:lang==="en"?"Finance, fashion, African diaspora":"Finance, mode, diaspora africaine",color:"#CF142B"},
  ];
  return(
    <section style={{padding:"36px 20px",background:C.bg,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(https://images.unsplash.com/photo-1521791055366-0d553872952f?w=1400&q=50)",backgroundSize:"cover",backgroundPosition:"center",opacity:.08}}/>
      <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,${C.bg}F0,${C.bg}E4)`}}/>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
          <div style={{width:"3px",height:"28px",background:`linear-gradient(180deg,${C.intBlue},${C.kente})`,borderRadius:"2px",flexShrink:0}}/>
          <SH title={t.intl_title} sub={t.intl_sub}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(215px,100%),1fr))",gap:"13px",marginBottom:"22px",marginTop:"14px"}}>
          {P.map(p=>(
            <div key={p.cc} style={{background:C.bgCard,borderRadius:"14px",padding:"17px",border:`1px solid ${C.border}`,transition:"all 0.18s",cursor:"pointer"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=p.color;e.currentTarget.style.boxShadow="0 6px 18px "+p.color+"20";e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{fontSize:"30px",marginBottom:"8px"}}>{p.flag}</div>
              <div style={{fontWeight:"800",fontSize:"14px",color:C.text,marginBottom:"3px"}}>{p.name}</div>
              <div style={{fontSize:"11px",color:C.textSub,lineHeight:1.5,marginBottom:"9px"}}>{p.desc}</div>
              <div style={{fontSize:"12px",color:p.color,fontWeight:"800"}}>{CURRENCIES[p.cc]?.symbol} {Math.round(BASE*(CURRENCIES[p.cc]?.rate||1)).toLocaleString()} / mo</div>
            </div>
          ))}
        </div>
        <div style={{background:`linear-gradient(135deg,${C.slate},${C.intBlue}CC)`,borderRadius:"15px",padding:"20px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"14px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:"url(https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&q=50)",backgroundSize:"cover",backgroundPosition:"center",opacity:.12}}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{color:"#fff",fontFamily:"'Georgia',serif",fontSize:"16px",fontWeight:"700",marginBottom:"3px"}}>🚢 {lang==="en"?"International Shipping & Freight":"Expédition & Fret International"}</div>
            <div style={{color:"rgba(255,255,255,0.7)",fontSize:"12px"}}>{lang==="en"?"Container tracking · Air cargo · Door-to-door to 120+ countries":"Suivi conteneurs · Fret aérien · Porte-à-porte vers 120+ pays"}</div>
          </div>
          <div style={{position:"relative",zIndex:1,display:"flex",gap:"8px",flexWrap:"wrap"}}>
            <Btn v="secondary" onClick={()=>go("cat_logistics")}>{t.shipping_log}</Btn>
            <Btn v="blue" onClick={()=>go("intl")}>{t.open_intl}</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Trial Banner ─────────────────────────────────────────────────
function TrialBanner({go,lang}){
  const t=T[lang];
  return(
    <section style={{padding:"0 20px 36px"}}>
      <div style={{background:`linear-gradient(135deg,${C.earth||"#8B4513"}EE,${C.kente}CC,${C.gold}AA)`,borderRadius:"20px",padding:"34px 26px",textAlign:"center",border:`1px solid ${C.gold}38`,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"-22px",top:"-22px",fontSize:"160px",opacity:.06,userSelect:"none"}}>🌍</div>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:"40px",marginBottom:"9px"}}>🎁</div>
          <h3 style={{fontFamily:"'Georgia',serif",color:C.gold,fontSize:"24px",marginBottom:"8px"}}>{t.trial_title}</h3>
          <p style={{color:C.sand,maxWidth:"500px",margin:"0 auto 20px",lineHeight:1.7,fontSize:"14px"}}>{t.trial_sub}</p>
          <div style={{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"}}>
            <Btn size="lg" onClick={()=>go("register")}>{t.start_free}</Btn>
            <Btn v="secondary" size="lg" onClick={()=>go("sell")}>{t.post_now}</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Login ────────────────────────────────────────────────────────
function LoginPage({go,onLogin,lang}){
  const [form,setForm]=useState({email:"",password:""});
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");
  const [showPw,setShowPw]=useState(false);
  const t=T[lang];
  const inp={width:"100%",padding:"10px 13px",borderRadius:"10px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text};
  async function login(){
    if(!form.email||!form.password){setErr(lang==="en"?"Please fill all fields":"Veuillez remplir tous les champs");return;}
    setLoading(true);setErr("");
    try{
      const {data,error}=await sb.auth.signInWithPassword({email:form.email,password:form.password});
      if(error){setErr(lang==="en"?"Incorrect email or password.":"Email ou mot de passe incorrect.");setLoading(false);return;}
      const uid = data.user?.id;
      // Load real profile from Supabase
      const {data:prof} = await sb.from("profiles").select("*").eq("id",uid).single();
      // Update last_active
      await sb.from("profiles").update({last_active:new Date().toISOString()}).eq("id",uid);
      onLogin({
        id: uid,
        email: form.email,
        name: prof?.name || form.email.split("@")[0],
        phone: prof?.phone || "",
        country: prof?.country || "CM",
      });
      setLoading(false);go("dashboard");
    }catch(e){
      setErr(lang==="en"?"Connection error. Please try again.":"Erreur de connexion. Veuillez réessayer.");
      setLoading(false);
    }
  }
  return(
    <div style={{maxWidth:"420px",margin:"48px auto",padding:"0 20px"}}>
      <div style={{background:C.bgCard,borderRadius:"20px",border:`1px solid ${C.border}`,padding:"28px",boxShadow:"0 4px 18px rgba(0,0,0,0.06)"}}>
        <div style={{textAlign:"center",marginBottom:"22px"}}>
          <div style={{fontSize:"40px",marginBottom:"8px"}}>🔑</div>
          <h2 style={{fontFamily:"'Georgia',serif",color:C.text,fontSize:"22px",marginBottom:"4px"}}>{t.welcome_back}</h2>
          <p style={{color:C.textSub,fontSize:"12px"}}>{t.sign_in_sub}</p>
        </div>
        {err&&<div style={{background:"#DC262618",border:"1px solid #DC262640",borderRadius:"8px",padding:"10px 13px",color:C.danger,fontSize:"13px",marginBottom:"14px"}}>{err}</div>}
        <div style={{display:"flex",flexDirection:"column",gap:"13px"}}>
          <div>
            <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"5px",display:"block"}}>📧 {t.email_label}</label>
            <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="your@email.com" type="email" style={inp}/>
          </div>
          <div>
            <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"5px",display:"block"}}>🔒 {t.pass_label}</label>
            <div style={{position:"relative"}}>
              <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})}
                type={showPw?"text":"password"} placeholder="••••••••"
                style={{...inp,paddingRight:"44px"}}
                onKeyDown={e=>e.key==="Enter"&&login()}/>
              <button type="button" onClick={()=>setShowPw(!showPw)}
                style={{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:"18px",padding:0,color:C.textSub}}>
                {showPw?"🙈":"👁"}
              </button>
            </div>
          </div>
          <Btn size="lg" onClick={login} disabled={loading} style={{width:"100%",justifyContent:"center"}}>{loading?t.signing_in:t.sign_in}</Btn>
          <div style={{textAlign:"center",fontSize:"12px",color:C.textSub}}>
            <span onClick={async()=>{
              if(!form.email){alert(lang==="en"?"Enter your email first":"Entrez votre email d'abord");return;}
              await sb.auth.resetPasswordForEmail(form.email,{
                redirectTo: window.location.origin+"?reset=true"
              });
              alert(lang==="en"?"✅ Password reset link sent to "+form.email+". Check your inbox and spam folder!":"✅ Lien envoyé à "+form.email+". Vérifiez votre boîte mail et les spams!");
            }} style={{color:C.intBlue,fontWeight:"700",cursor:"pointer",display:"block",marginBottom:"8px"}}>
              🔑 {lang==="en"?"Forgot password?":"Mot de passe oublié?"}
            </span>
            {t.no_account}{" "}<span onClick={()=>go("register")} style={{color:C.kente,fontWeight:"700",cursor:"pointer"}}>{t.reg_free}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Register ─────────────────────────────────────────────────────
function Register({cc,go,onLogin,lang}){
  const [step,setStep]=useState(1); // 1=form, 2=verify OTP, 3=done
  const [form,setForm]=useState({name:"",email:"",country:cc,password:""});
  const [otp,setOtp]=useState("");
  const [otpSent,setOtpSent]=useState(false);
  const [done,setDone]=useState(false);
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");
  const [showPw,setShowPw]=useState(false);
  const [showConfirm,setShowConfirm]=useState(false);
  const [confirmPw,setConfirmPw]=useState("");
  const t=T[lang];
  const isFr=lang==="fr";
  const cur=CURRENCIES[form.country]||CURRENCIES.CM;
  const inp={width:"100%",padding:"10px 13px",borderRadius:"10px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text};

  // STEP 1: Submit form → register with Supabase → sends OTP email automatically
  async function submitForm(){
    if(!form.name||!form.email){setErr(isFr?"Nom et email obligatoires":"Name and email required");return;}
    const pwd=form.password;
    if(!pwd||pwd.length<8){setErr(isFr?"Mot de passe: min 8 caractères":"Password: min 8 characters");return;}
    if(!/[A-Z]/.test(pwd)){setErr(isFr?"Besoin d'une lettre majuscule":"Need 1 uppercase letter");return;}
    if(!/[0-9]/.test(pwd)){setErr(isFr?"Besoin d'un chiffre":"Need 1 number");return;}
    if(pwd!==confirmPw){setErr(isFr?"Les mots de passe ne correspondent pas":"Passwords do not match");return;}
    setLoading(true);setErr("");
    try{
      // Supabase sends OTP email automatically when email confirmation is ON
      const {data,error}=await sb.auth.signUp({
        email:form.email,
        password:form.password,
        options:{data:{name:form.name,country:form.country}}
      });
      if(error){setErr(isFr?"Erreur: "+error.message:"Error: "+error.message);setLoading(false);return;}
      setStep(2);// Move to OTP verification step
    }catch(e){setErr(isFr?"Erreur de connexion":"Connection error");}
    setLoading(false);
  }

  // STEP 2: Verify OTP code from email
  async function verifyOTP(){
    if(!otp||otp.length<6){setErr(isFr?"Entrez le code à 6 chiffres":"Enter the 6-digit code");return;}
    setLoading(true);setErr("");
    try{
      const {data,error}=await sb.auth.verifyOtp({
        email:form.email,
        token:otp,
        type:"signup"
      });
      if(error){setErr(isFr?"Code incorrect. Vérifiez votre email.":"Wrong code. Check your email.");setLoading(false);return;}
      const uid=data?.user?.id;
      // Save profile to database
      await sb.from("profiles").upsert({
        id:uid,
        name:form.name,
        email:form.email,
        country:form.country,
        trial_start:new Date().toISOString(),
        last_active:new Date().toISOString(),
      });
      // Send welcome email
      await sendWelcomeEmail(form.email,form.name,lang);
      onLogin({id:uid,email:form.email,name:form.name,country:form.country});
      setLoading(false);setDone(true);
    }catch(e){setErr(isFr?"Erreur de vérification":"Verification error");}
    setLoading(false);
  }

  // Resend OTP
  async function resendOTP(){
    setErr("");
    await sb.auth.resend({type:"signup",email:form.email});
    alert(isFr?"Nouveau code envoyé à "+form.email:"New code sent to "+form.email);
  }

  if(done) return(
    <div style={{maxWidth:"500px",margin:"56px auto",textAlign:"center",padding:"0 20px"}}>
      <div style={{fontSize:"68px",marginBottom:"12px"}}>🎉</div>
      <h2 style={{fontFamily:"'Georgia',serif",color:C.kente,fontSize:"24px",marginBottom:"8px"}}>{t.welcome_msg}</h2>
      <p style={{color:C.textSub,lineHeight:1.7,marginBottom:"18px"}}>
        <strong style={{color:C.text}}>{form.name}</strong>, {isFr?"votre compte est actif!":"your account is live!"}
      </p>
      <div style={{background:`${C.forest}18`,border:`1px solid ${C.forest}40`,borderRadius:"14px",padding:"16px",marginBottom:"14px"}}>
        <div style={{color:C.kente,fontWeight:"800",fontSize:"16px",marginBottom:"5px"}}>🎁 {t.trial_active}</div>
        <div style={{color:C.textSub,fontSize:"13px"}}>{t.after_trial_d} {cur.symbol} {Math.round(BASE*cur.rate).toLocaleString()}/month</div>
      </div>
      <Btn size="lg" onClick={()=>go("dashboard")}>{t.go_dashboard}</Btn>
    </div>
  );

  // Progress bar
  const steps=[
    {n:1,l:isFr?"Vos infos":"Your info"},
    {n:2,l:isFr?"Vérification":"Verify email"},
  ];

  return(
    <div style={{maxWidth:"480px",margin:"36px auto",padding:"0 20px 60px"}}>
      {/* Progress */}
      <div style={{display:"flex",gap:"4px",marginBottom:"24px"}}>
        {steps.map(s=>(
          <div key={s.n} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"}}>
            <div style={{width:"100%",height:"4px",borderRadius:"2px",background:s.n<=step?`linear-gradient(90deg,${C.kente},${C.gold})`:C.border}}/>
            <span style={{fontSize:"10px",color:s.n<=step?C.kente:C.textSub,fontWeight:"700"}}>{s.l}</span>
          </div>
        ))}
      </div>

      <div style={{background:C.bgCard,borderRadius:"20px",border:`1px solid ${C.border}`,padding:"26px",boxShadow:"0 4px 18px rgba(0,0,0,0.06)"}}>

        {/* STEP 1 — Registration form */}
        {step===1&&(
          <>
            <div style={{textAlign:"center",marginBottom:"20px"}}>
              <div style={{fontSize:"36px",marginBottom:"6px"}}>🌍</div>
              <h2 style={{fontFamily:"'Georgia',serif",color:C.text,fontSize:"20px",marginBottom:"4px"}}>{isFr?"Créer votre Compte":"Create your Account"}</h2>
              <p style={{color:C.textSub,fontSize:"12px"}}>{isFr?"60 jours gratuits · Aucune carte requise":"60 days free · No credit card required"}</p>
            </div>
            {err&&<div style={{background:"#DC262618",border:"1px solid #DC262640",borderRadius:"8px",padding:"10px",color:C.danger,fontSize:"13px",marginBottom:"14px"}}>{err}</div>}
            <div style={{display:"flex",flexDirection:"column",gap:"13px"}}>
              {/* Name */}
              <div>
                <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"5px",display:"block"}}>👤 {isFr?"Nom complet":"Full name"} *</label>
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                  placeholder={isFr?"ex: Kamdem Jean":"e.g. John Kamdem"} style={inp}/>
              </div>
              {/* Email */}
              <div>
                <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"5px",display:"block"}}>📧 Email *</label>
                <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
                  placeholder="votre@email.com" style={inp}/>
                <div style={{fontSize:"10px",color:C.textSub,marginTop:"3px"}}>💡 {isFr?"Un code de vérification sera envoyé à cet email":"A verification code will be sent to this email"}</div>
              </div>
              {/* Country */}
              <div>
                <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"5px",display:"block"}}>🌍 {isFr?"Votre pays":"Your country"}</label>
                <select value={form.country} onChange={e=>setForm({...form,country:e.target.value})} style={inp}>
                  <optgroup label="Afrique / Africa">{ALL_CC.filter(c=>c.r==="africa").map(c=><option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}</optgroup>
                  <optgroup label="International">{ALL_CC.filter(c=>c.r!=="africa").map(c=><option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}</optgroup>
                </select>
              </div>
              {/* Password with eye icon */}
              <div>
                <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"5px",display:"block"}}>🔒 {isFr?"Mot de passe":"Password"} *</label>
                <div style={{position:"relative"}}>
                  <input type={showPw?"text":"password"} value={form.password}
                    onChange={e=>setForm({...form,password:e.target.value})}
                    placeholder={isFr?"Min 8 car, 1 MAJUSCULE, 1 chiffre":"Min 8 chars, 1 UPPERCASE, 1 number"}
                    style={{...inp,paddingRight:"44px",border:`1.5px solid ${form.password.length===0?C.border:form.password.length>=8&&/[A-Z]/.test(form.password)&&/[0-9]/.test(form.password)?C.forest:"#F59E0B"}`}}/>
                  <button type="button" onClick={()=>setShowPw(!showPw)}
                    style={{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:"18px",padding:0,color:C.textSub}}>
                    {showPw?"🙈":"👁"}
                  </button>
                </div>
                {form.password.length>0&&(
                  <div style={{display:"flex",gap:"5px",marginTop:"7px"}}>
                    {[
                      {ok:form.password.length>=8,l:isFr?"8+ car":"8+ chars"},
                      {ok:/[A-Z]/.test(form.password),l:isFr?"Majuscule":"Uppercase"},
                      {ok:/[0-9]/.test(form.password),l:isFr?"Chiffre":"Number"},
                    ].map((r,i)=>(
                      <div key={i} style={{flex:1,textAlign:"center",padding:"3px 4px",borderRadius:"6px",fontSize:"10px",fontWeight:"700",background:r.ok?`${C.forest}20`:"#DC262618",color:r.ok?C.forest:"#DC2626"}}>
                        {r.ok?"✅":"❌"} {r.l}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Confirm password with eye icon */}
              <div>
                <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"5px",display:"block"}}>🔒 {isFr?"Confirmer le mot de passe":"Confirm password"} *</label>
                <div style={{position:"relative"}}>
                  <input type={showConfirm?"text":"password"} value={confirmPw}
                    onChange={e=>setConfirmPw(e.target.value)}
                    placeholder={isFr?"Répétez votre mot de passe":"Repeat your password"}
                    style={{...inp,paddingRight:"44px",border:`1.5px solid ${confirmPw.length===0?C.border:confirmPw===form.password?C.forest:"#DC2626"}`}}/>
                  <button type="button" onClick={()=>setShowConfirm(!showConfirm)}
                    style={{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:"18px",padding:0,color:C.textSub}}>
                    {showConfirm?"🙈":"👁"}
                  </button>
                </div>
                {confirmPw.length>0&&(
                  <div style={{fontSize:"11px",marginTop:"4px",color:confirmPw===form.password?C.forest:"#DC2626",fontWeight:"700"}}>
                    {confirmPw===form.password?(isFr?"✅ Mots de passe identiques":"✅ Passwords match"):(isFr?"❌ Ne correspondent pas":"❌ Do not match")}
                  </div>
                )}
              </div>
              <Btn size="lg" onClick={submitForm} disabled={loading} style={{width:"100%",justifyContent:"center"}}>
                {loading?(isFr?"Création...":"Creating..."):(isFr?"Créer mon Compte →":"Create my Account →")}
              </Btn>
              <div style={{textAlign:"center",fontSize:"12px",color:C.textSub}}>
                {isFr?"Déjà un compte?":"Already have an account?"}{" "}
                <span onClick={()=>go("login")} style={{color:C.kente,fontWeight:"700",cursor:"pointer"}}>{isFr?"Se connecter":"Sign in"}</span>
              </div>
            </div>
          </>
        )}

        {/* STEP 2 — OTP Verification */}
        {step===2&&(
          <>
            <div style={{textAlign:"center",marginBottom:"20px"}}>
              <div style={{fontSize:"48px",marginBottom:"8px"}}>📧</div>
              <h2 style={{fontFamily:"'Georgia',serif",color:C.text,fontSize:"20px",marginBottom:"6px"}}>{isFr?"Vérifiez votre Email":"Verify your Email"}</h2>
              <p style={{color:C.textSub,fontSize:"12px",lineHeight:1.6}}>
                {isFr?"Nous avons envoyé un code à 6 chiffres à":"We sent a 6-digit code to"}<br/>
                <strong style={{color:C.kente}}>{form.email}</strong>
              </p>
            </div>
            {err&&<div style={{background:"#DC262618",border:"1px solid #DC262640",borderRadius:"8px",padding:"10px",color:C.danger,fontSize:"13px",marginBottom:"14px"}}>{err}</div>}
            <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
              <div>
                <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"8px",display:"block",textAlign:"center"}}>{isFr?"Entrez le code reçu par email:":"Enter the code received by email:"}</label>
                <input value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,"").slice(0,6))}
                  placeholder="000000"
                  maxLength={6}
                  style={{...inp,textAlign:"center",fontSize:"28px",letterSpacing:"12px",fontWeight:"900",border:`2px solid ${otp.length===6?C.forest:C.gold}`,background:C.bg}}/>
                <div style={{textAlign:"center",fontSize:"11px",color:C.textSub,marginTop:"6px"}}>
                  {otp.length}/6 {isFr?"chiffres":"digits"}
                </div>
              </div>
              <Btn size="lg" onClick={verifyOTP} disabled={loading||otp.length<6} style={{width:"100%",justifyContent:"center"}}>
                {loading?(isFr?"Vérification...":"Verifying..."):(isFr?"✅ Vérifier & Activer mon Compte":"✅ Verify & Activate my Account")}
              </Btn>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:"12px",color:C.textSub,marginBottom:"8px"}}>{isFr?"Vous n'avez pas reçu le code?":"Didn't receive the code?"}</div>
                <button onClick={resendOTP} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:"8px",padding:"8px 16px",color:C.kente,cursor:"pointer",fontSize:"12px",fontWeight:"700",fontFamily:"inherit"}}>
                  🔄 {isFr?"Renvoyer le code":"Resend code"}
                </button>
              </div>
              <div style={{textAlign:"center"}}>
                <button onClick={()=>{setStep(1);setErr("");setOtp("");}} style={{background:"none",border:"none",color:C.textSub,cursor:"pointer",fontSize:"12px",fontFamily:"inherit"}}>
                  ← {isFr?"Modifier mon email":"Change my email"}
                </button>
              </div>
              <div style={{background:`${C.intBlue}10`,borderRadius:"10px",padding:"10px",fontSize:"11px",color:C.textSub,lineHeight:1.7}}>
                💡 {isFr?"Vérifiez aussi vos spams si vous ne trouvez pas le code. Le code expire dans 10 minutes.":"Also check your spam folder if you don't find the code. The code expires in 10 minutes."}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Post Listing ─────────────────────────────────────────────────
function PostListing({user,lang,cc}){
  const [selCatId,setSelCatId]=useState("");
  const [form,setForm]=useState({title:"",price:"",desc:"",location:"",country:cc||"CM",whatsapp:user?.phone||""});
  const [delivery,setDelivery]=useState({available:false,price:"",zone:"",notes:""});
  const [extra,setExtra]=useState({});
  const [previews,setPreviews]=useState([]);
  const [posted,setPosted]=useState(false);
  const [loading,setLoading]=useState(false);
  const fileRef=useRef();
  const t=T[lang];
  const isFr=lang==="fr";
  const selCat=CATS.find(c=>c.id===selCatId);
  const inp={width:"100%",padding:"10px 13px",borderRadius:"10px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text};

  async function uploadToSupabase(file, userId){
    try{
      const ext=file.name.split(".").pop()||"jpg";
      const path=`listings/${userId}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const {error}=await sb.storage.from("listing-images").upload(path,file,{cacheControl:"3600",upsert:false});
      if(error) return URL.createObjectURL(file); // fallback to local URL
      const {data:urlData}=sb.storage.from("listing-images").getPublicUrl(path);
      return urlData.publicUrl;
    }catch(e){return URL.createObjectURL(file);}
  }

  async function submit(){
    if(!user?.id){alert(lang==="en"?"Please log in to post a listing":"Veuillez vous connecter pour publier une annonce");return;}
    if(!form.title){alert(lang==="en"?"Please add a title":"Veuillez ajouter un titre");return;}
    if(!selCatId){alert(lang==="en"?"Please select a category":"Veuillez sélectionner une catégorie");return;}
    setLoading(true);
    try{
      // Upload images to Supabase Storage
      let imageUrls = [];
      for(const preview of previews){
        if(preview.file){
          const url = await uploadToSupabase(preview.file, user.id);
          if(url) imageUrls.push(url);
        } else if(preview.url){
          imageUrls.push(preview.url);
        }
      }

      const listingData = {
        title: form.title,
        price: parseFloat(form.price)||0,
        category: selCatId,
        description: form.desc,
        location: form.location,
        country: form.country,
        seller_id: user.id,
        seller_whatsapp: form.whatsapp||user.phone||"",
        seller_name: user.name||"",
        images: imageUrls,
        delivery_available: delivery.available,
        delivery_price: delivery.available?parseFloat(delivery.price)||0:0,
        delivery_zone: delivery.zone,
        delivery_notes: delivery.notes,
        extra_fields: extra,
        status: "live",
        views: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const {error} = await sb.from("listings").insert(listingData);
      if(error){
        alert(lang==="en"?"Error saving listing: "+error.message:"Erreur: "+error.message);
        setLoading(false);return;
      }
      // Update last_active
      await sb.from("profiles").update({last_active:new Date().toISOString()}).eq("id",user.id);
      if(user?.email){
        await sendListingEmail(user.email, user.name||user.email.split("@")[0], form.title, lang);
      }
      setLoading(false);setPosted(true);
    }catch(e){
      alert(lang==="en"?"Connection error. Please try again.":"Erreur de connexion. Veuillez réessayer.");
      setLoading(false);
    }
  }

  if(posted) return(
    <div style={{maxWidth:"500px",margin:"56px auto",textAlign:"center",padding:"0 20px"}}>
      <div style={{fontSize:"68px",marginBottom:"12px"}}>🎉</div>
      <h2 style={{fontFamily:"'Georgia',serif",color:C.kente,fontSize:"22px",marginBottom:"8px"}}>{t.live_title}</h2>
      <div style={{background:"#25D36616",border:"1px solid #25D36648",borderRadius:"12px",padding:"14px",color:C.success,marginBottom:"14px",fontSize:"13px",lineHeight:1.7}}>
        📣 {t.live_msg}<br/>📧 {t.email_sent} · 📱 {t.wa_sent}
      </div>
      <div style={{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"}}>
        <Btn onClick={()=>{setPosted(false);setForm({title:"",price:"",desc:"",location:"",country:cc||"CM"});setSelCatId("");setPreviews([]);setExtra({});}}>{t.post_another}</Btn>
        <Btn v="ghost" onClick={()=>go("dashboard")}>{t.view_store_btn}</Btn>
      </div>
    </div>
  );

  return(
    <div style={{maxWidth:"700px",margin:"0 auto",padding:"28px 20px"}}>
      <h2 style={{fontFamily:"'Georgia',serif",color:C.text,fontSize:"22px",marginBottom:"3px"}}>{t.post_title}</h2>
      <p style={{color:C.textSub,fontSize:"13px",marginBottom:"22px"}}>{t.post_sub}</p>
      <div style={{marginBottom:"18px"}}>
        <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"9px",display:"block"}}>{t.cat_select}</label>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:"7px"}}>
          {CATS.map(c=>(
            <div key={c.id} onClick={()=>{setSelCatId(c.id);setExtra({});}}
              style={{padding:"9px 11px",borderRadius:"10px",cursor:"pointer",border:`1.5px solid ${selCatId===c.id?c.color:C.border}`,background:selCatId===c.id?`${c.color}16`:C.bg,display:"flex",alignItems:"center",gap:"5px",fontSize:"11px",fontWeight:"700",color:selCatId===c.id?c.color:C.textSub,transition:"all 0.13s"}}>
              {c.icon} {c[lang].label}
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"13px",marginBottom:"14px"}}>
        <div>
          <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"4px",display:"block"}}>{t.list_title}</label>
          <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder={lang==="en"?"e.g. 3-Bedroom Apartment in Douala":"ex. Appartement 3 Pièces à Douala"} style={inp}/>
        </div>
        <div>
          <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"4px",display:"block"}}>{t.price_label}</label>
          <input type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="5000000" style={inp}/>
        </div>
        <div>
          <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"4px",display:"block"}}>{t.location_lbl}</label>
          <input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder={lang==="en"?"e.g. Douala, Akwa, Cameroon":"ex. Douala, Akwa, Cameroun"} style={inp}/>
        </div>
        {/* Smart category fields */}
        {selCat?.fields?.length>0&&(
          <div style={{background:`${selCat.color}10`,border:`1px solid ${selCat.color}38`,borderRadius:"12px",padding:"15px"}}>
            <div style={{fontSize:"11px",fontWeight:"800",color:selCat.color,marginBottom:"11px"}}>{selCat.icon} {selCat[lang].label} — {lang==="en"?"Smart Fields":"Champs Automatiques"}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
              {selCat.fields.map(f=>(
                <div key={f.k}>
                  <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"4px",display:"block"}}>{f[lang]||f.en}</label>
                  <input type={f.t||"text"} value={extra[f.k]||""} onChange={e=>setExtra({...extra,[f.k]:e.target.value})} placeholder={f.p}
                    style={{...inp,padding:"8px 11px",background:C.bgCard,fontSize:"12px"}}/>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"4px",display:"block"}}>{t.desc_label}</label>
          <textarea rows={4} value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder={t.desc_ph} style={{...inp,resize:"vertical"}}/>
        </div>
        {/* WhatsApp contact for this listing */}
        <div>
          <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"4px",display:"block"}}>💬 {isFr?"Votre WhatsApp (pour recevoir les contacts acheteurs)":"Your WhatsApp (to receive buyer contacts)"}</label>
          <input value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} placeholder="+237 671 282 427" style={{...inp,border:`1.5px solid #25D36655`}}/>
          <div style={{fontSize:"10px",color:C.textSub,marginTop:"3px"}}>💡 {isFr?"Les acheteurs vous contacteront directement sur WhatsApp":"Buyers will contact you directly on WhatsApp"}</div>
        </div>
        {/* Delivery option */}
        <div style={{background:C.bgCard,borderRadius:"12px",border:`1px solid ${C.border}`,padding:"14px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:delivery.available?"12px":"0"}}>
            <div onClick={()=>setDelivery({...delivery,available:!delivery.available})}
              style={{width:"42px",height:"24px",borderRadius:"12px",background:delivery.available?C.forest:"#ccc",cursor:"pointer",position:"relative",transition:"all 0.2s",flexShrink:0}}>
              <div style={{position:"absolute",top:"2px",left:delivery.available?"18px":"2px",width:"20px",height:"20px",borderRadius:"50%",background:"#fff",transition:"all 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/>
            </div>
            <div>
              <div style={{fontWeight:"700",color:C.text,fontSize:"13px"}}>🚚 {isFr?"Livraison disponible":"Delivery available"}</div>
              <div style={{fontSize:"11px",color:C.textSub}}>{isFr?"Optionnel — livrez à domicile si demandé":"Optional — deliver to home if requested"}</div>
            </div>
          </div>
          {delivery.available&&(
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
                <div>
                  <label style={{fontSize:"10px",color:C.textSub,fontWeight:"700",display:"block",marginBottom:"4px"}}>{isFr?"Prix livraison":"Delivery price"}</label>
                  <input value={delivery.price} onChange={e=>setDelivery({...delivery,price:e.target.value})} placeholder={isFr?"ex: 2000 CFA":"e.g. 5 USD"} style={inp} type="number"/>
                </div>
                <div>
                  <label style={{fontSize:"10px",color:C.textSub,fontWeight:"700",display:"block",marginBottom:"4px"}}>{isFr?"Zone de livraison":"Delivery zone"}</label>
                  <input value={delivery.zone} onChange={e=>setDelivery({...delivery,zone:e.target.value})} placeholder={isFr?"ex: Douala centre":"e.g. Douala centre"} style={inp}/>
                </div>
              </div>
              <div>
                <label style={{fontSize:"10px",color:C.textSub,fontWeight:"700",display:"block",marginBottom:"4px"}}>{isFr?"Notes livraison":"Delivery notes"}</label>
                <input value={delivery.notes} onChange={e=>setDelivery({...delivery,notes:e.target.value})} placeholder={isFr?"ex: Livraison en 24h, contactez-moi d'abord":"e.g. 24h delivery, contact me first"} style={inp}/>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* 10-image upload */}
      <div style={{marginBottom:"20px"}}>
        <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"9px",display:"block"}}>
          📸 {t.photos_label} <span style={{fontWeight:"400"}}>({previews.length}/10)</span>
        </label>
        {selCat&&previews.length===0&&(
          <div style={{marginBottom:"10px"}}>
            <div style={{fontSize:"11px",color:C.textSub,marginBottom:"6px"}}>
              {lang==="en"?`Sample ${selCat[lang].label} photos:`:`Photos exemples ${selCat[lang].label}:`}
            </div>
            <div style={{display:"flex",gap:"5px",overflowX:"auto",paddingBottom:"4px"}}>
              {selCat.imgs.slice(0,10).map((src,i)=>(
                <img key={i} src={src} alt="" loading="lazy" style={{width:"60px",height:"60px",objectFit:"cover",borderRadius:"6px",border:`1px solid ${C.border}`,flexShrink:0}}/>
              ))}
            </div>
          </div>
        )}
        {previews.length>0&&(
          <div style={{display:"flex",gap:"7px",flexWrap:"wrap",marginBottom:"9px"}}>
            {previews.map((src,i)=>(
              <div key={i} style={{position:"relative"}}>
                <img src={typeof src==="object"?src.url:src} alt="" style={{width:"68px",height:"68px",objectFit:"cover",borderRadius:"8px",border:`2px solid ${i===0?C.gold:C.border}`}}/>
                {i===0&&<div style={{position:"absolute",top:2,left:2,background:C.gold,borderRadius:"3px",fontSize:"8px",color:"#fff",padding:"1px 4px",fontWeight:"700"}}>COVER</div>}
                <div onClick={()=>setPreviews(p=>p.filter((_,j)=>j!==i))} style={{position:"absolute",top:-4,right:-4,background:C.danger,borderRadius:"50%",width:"16px",height:"16px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"9px",color:"#fff"}}>×</div>
              </div>
            ))}
          </div>
        )}
        {previews.length<10&&(
          <>
            <div onClick={()=>fileRef.current.click()}
              style={{border:`2px dashed ${C.gold}55`,borderRadius:"12px",padding:"26px",textAlign:"center",cursor:"pointer",background:`${C.gold}07`,transition:"all 0.15s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.background=""+C.gold+"12";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=""+C.gold+"55";e.currentTarget.style.background=""+C.gold+"07";}}>
              <div style={{fontSize:"26px",marginBottom:"5px"}}>📷</div>
              <div style={{color:C.kente,fontWeight:"700",fontSize:"13px"}}>{lang==="en"?`Click to upload (${10-previews.length} remaining)`:`Cliquer pour télécharger (${10-previews.length} restants)`}</div>
            </div>
            <input ref={fileRef} type="file" multiple accept="image/*" onChange={e=>{
              const files=Array.from(e.target.files).slice(0,10-previews.length);
              const newPreviews=files.map(f=>({url:URL.createObjectURL(f),file:f}));
              setPreviews(p=>[...p,...newPreviews].slice(0,10));
            }} style={{display:"none"}}/>
          </>
        )}
      </div>
      <Btn size="lg" onClick={submit} disabled={loading} style={{width:"100%",justifyContent:"center"}}>{loading?t.uploading:t.publish_btn}</Btn>
    </div>
  );
}

// ─── Seller Storefront ────────────────────────────────────────────
function Storefront({sid,cc,go,lang}){
  const t=T[lang];
  const seller=SELLERS[sid]||SELLERS.s1;
  const items=ALL_LISTINGS.filter(l=>l.sid===sid);
  const show=items.length?items:ALL_LISTINGS.slice(0,3);
  const bio=lang==="fr"?seller.bio_fr:seller.bio;
  return(
    <div style={{maxWidth:"1100px",margin:"0 auto",padding:"26px 20px"}}>
      <button onClick={()=>go("listings")} style={{background:"none",border:"none",color:C.intBlue,cursor:"pointer",marginBottom:"14px",fontSize:"13px",fontFamily:"inherit",fontWeight:"600"}}>{t.back_mkt}</button>
      <div style={{background:`linear-gradient(135deg,${C.slate},${C.earth||"#8B4513"}99)`,borderRadius:"20px",padding:"28px 26px",marginBottom:"22px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"-16px",top:"-16px",fontSize:"150px",opacity:.07,userSelect:"none"}}>{seller.av}</div>
        <div style={{position:"relative",zIndex:1,display:"flex",gap:"18px",alignItems:"flex-start",flexWrap:"wrap"}}>
          <div style={{width:"68px",height:"68px",borderRadius:"50%",background:`radial-gradient(circle,${C.gold},${C.kente})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"30px",flexShrink:0}}>{seller.av}</div>
          <div style={{flex:1,minWidth:"200px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"3px",flexWrap:"wrap"}}>
              <h1 style={{fontFamily:"'Georgia',serif",color:"#fff",fontSize:"21px"}}>{seller.name}</h1>
              {seller.verified&&<Tag color={C.success}>{t.verified}</Tag>}
            </div>
            <div style={{display:"flex",gap:"14px",flexWrap:"wrap",fontSize:"12px",color:"rgba(255,255,255,0.65)",marginBottom:"8px"}}>
              <span>⭐ {seller.rating}</span><span>📦 {seller.count} {lang==="en"?"Listings":"Annonces"}</span>
              <span>📅 {lang==="en"?"Joined":"Membre depuis"} {seller.joined}</span>
              <span>{CURRENCIES[seller.cc]?.flag} {CURRENCIES[seller.cc]?.name}</span>
            </div>
            <p style={{color:"rgba(255,255,255,0.72)",fontSize:"13px",maxWidth:"460px",marginBottom:"12px"}}>{bio}</p>
            <div style={{display:"flex",gap:"7px",flexWrap:"wrap"}}>
              {seller.soc?.wa&&<a href={`https://wa.me/${seller.soc.wa.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" style={{padding:"5px 11px",borderRadius:"16px",background:"#25D36622",border:"1px solid #25D36655",color:C.success,textDecoration:"none",fontSize:"11px",fontWeight:"700"}}>💬 WhatsApp</a>}
              {seller.soc?.fb&&<a href={`https://facebook.com/${seller.soc.fb}`} target="_blank" rel="noreferrer" style={{padding:"5px 11px",borderRadius:"16px",background:"#1877F218",border:"1px solid #1877F255",color:"#1877F2",textDecoration:"none",fontSize:"11px",fontWeight:"700"}}>📘 Facebook</a>}
              {seller.soc?.ig&&<a href={`https://instagram.com/${seller.soc.ig}`} target="_blank" rel="noreferrer" style={{padding:"5px 11px",borderRadius:"16px",background:"#E1306C18",border:"1px solid #E1306C55",color:"#E1306C",textDecoration:"none",fontSize:"11px",fontWeight:"700"}}>📸 Instagram</a>}
              {seller.soc?.tt&&<a href={`https://tiktok.com/@${seller.soc.tt}`} target="_blank" rel="noreferrer" style={{padding:"5px 11px",borderRadius:"16px",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",textDecoration:"none",fontSize:"11px",fontWeight:"700"}}>🎵 TikTok</a>}
              {seller.soc?.yt&&<a href={`https://youtube.com/${seller.soc.yt}`} target="_blank" rel="noreferrer" style={{padding:"5px 11px",borderRadius:"16px",background:"#FF000018",border:"1px solid #FF000055",color:"#FF0000",textDecoration:"none",fontSize:"11px",fontWeight:"700"}}>▶️ YouTube</a>}
            </div>
          </div>
        </div>
      </div>
      <SH title={lang==="en"?`${seller.name}'s Store`:`Boutique de ${seller.name}`} sub={`${show.length} ${lang==="en"?"listings · Unlimited inventory":"annonces · Inventaire illimité"}`}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(258px,100%),1fr))",gap:"16px",marginTop:"16px"}}>
        {show.map(l=>{
          const catId=Object.entries(LISTINGS).find(([,items])=>items.some(i=>i.id===l.id))?.[0]||"";
          return <Card key={l.id} listing={{...l,cat:catId,category:catId}} cc={cc} go={go} lang={lang}/>;
        })}
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────
function Dashboard({cc,go,user,lang}){
  const [tab,setTab]=useState("overview");
  const [soc,setSoc]=useState({wa:MY_WA,fb:"",ig:"",tt:"",yt:""});
  const [myListings,setMyListings]=useState([]);
  const [loadingListings,setLoadingListings]=useState(true);
  const [profile,setProfile]=useState(null);
  const t=T[lang];

  // Load real listings and profile from Supabase
  useEffect(()=>{
    if(!user?.id) return;
    async function loadData(){
      setLoadingListings(true);
      try{
        // Load user profile
        const {data:prof}=await sb.from("profiles").select("*").eq("id",user.id).single();
        if(prof) setProfile(prof);
        // Load user listings
        const {data:lst}=await sb.from("listings").select("*").eq("seller_id",user.id).order("created_at",{ascending:false});
        if(lst) setMyListings(lst);
      }catch(e){console.error("Dashboard load error:",e);}
      setLoadingListings(false);
    }
    loadData();
  },[user?.id]);

  // Calculate real trial days
  const trialStart = profile?.trial_start ? new Date(profile.trial_start) : new Date();
  const daysPassed = Math.floor((Date.now() - trialStart.getTime()) / (1000*60*60*24));
  const trialLeft = Math.max(0, 60 - daysPassed);
  const trialUsed = Math.min(60, daysPassed);
  const trialPct = Math.round(trialUsed/60*100);
  const cur=CURRENCIES[cc];
  const card={background:C.bgCard,borderRadius:"13px",border:`1px solid ${C.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"};
  const inp={width:"100%",padding:"9px 12px",borderRadius:"8px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text};
  const totalViews = myListings.reduce((s,l)=>s+(l.views||0),0);
  const stats=[
    {ic:"📦",l:t.my_listings,v:String(myListings.length),d:lang==="en"?"Your live listings":"Vos annonces en ligne",c:C.kente,tab:"listings"},
    {ic:"👁",l:lang==="en"?"Total Views":"Total Vues",v:totalViews.toLocaleString(),d:lang==="en"?"Across all listings":"Sur toutes les annonces",c:C.intBlue,tab:"analytics"},
    {ic:"🌍",l:lang==="en"?"Reach":"Portée",v:"54+",d:lang==="en"?"Nations you can reach":"Nations que vous atteignez",c:C.forest,tab:"analytics"},
    {ic:"⭐",l:lang==="en"?"Seller Rating":"Note Vendeur",v:"4.9",d:lang==="en"?"Top 5% seller":"Top 5% vendeur",c:C.gold,tab:"analytics"},
    {ic:"🎁",l:lang==="en"?"Trial Days Left":"Jours Essai Restants",v:String(trialLeft),d:lang==="en"?"Free trial remaining":"Essai gratuit restant",c:C.kente,tab:"overview"},
    {ic:"✅",l:lang==="en"?"Account Status":"Statut Compte",v:lang==="en"?"Active":"Actif",d:lang==="en"?"Verified & live":"Vérifié et actif",c:C.forest,tab:"overview"},
  ];
  const TABS=[
    {id:"overview",ic:"📊",l:t.overview},{id:"listings",ic:"📦",l:t.my_listings},
    {id:"analytics",ic:"📈",l:t.analytics},{id:"messages",ic:"💬",l:t.messages},
    {id:"storefront",ic:"🏪",l:t.storefront},{id:"social",ic:"🔗",l:t.social_links},
    {id:"settings",ic:"⚙️",l:t.settings},
  ];

  return(
    <div style={{maxWidth:"1100px",margin:"0 auto",padding:"26px 20px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"18px",flexWrap:"wrap",gap:"10px"}}>
        <div>
          <h2 style={{fontFamily:"'Georgia',serif",color:C.text,fontSize:"21px"}}>{t.dashboard_title}</h2>
          <p style={{color:C.textSub,fontSize:"12px"}}>{lang==="en"?"Welcome back,":"Bon retour,"} <strong>{user?.name||"Seller"}</strong> · {t.dash_sub}</p>
        </div>
        <Btn onClick={()=>go("sell")}>➕ {t.post_new}</Btn>
      </div>

      {/* Trial */}
      <div style={{...card,padding:"15px 18px",marginBottom:"18px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px",border:`1px solid ${C.gold}50`}}>
        <div style={{flex:1}}>
          <div style={{fontWeight:"800",color:C.kente,fontSize:"14px",marginBottom:"2px"}}>🎁 {t.trial_label} — {trialLeft} {t.days_rem}</div>
          <div style={{height:"6px",background:C.bg,borderRadius:"3px",maxWidth:"280px",margin:"7px 0 5px"}}>
            <div style={{height:"100%",width:`${trialPct}%`,background:`linear-gradient(90deg,${C.forest},${C.kente})`,borderRadius:"3px"}}/>
          </div>
          <div style={{fontSize:"11px",color:C.textSub}}>{trialUsed}/60 {t.days_used} · {t.after_trial} {cur.symbol} {Math.round(BASE*cur.rate).toLocaleString()}/mo</div>
        </div>
        <Btn v="secondary" size="sm" onClick={()=>go("pricing")}>{t.upgrade}</Btn>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:"2px",marginBottom:"18px",background:C.bg,borderRadius:"12px",padding:"3px",overflowX:"auto",scrollbarWidth:"none"}}>
        {TABS.map(tb=>(
          <button key={tb.id} onClick={()=>setTab(tb.id)}
            style={{padding:"8px 13px",border:"none",borderRadius:"9px",background:tab===tb.id?`linear-gradient(135deg,${C.kente},${C.gold})`:"transparent",color:tab===tb.id?"#fff":C.textSub,cursor:"pointer",fontSize:"11px",fontWeight:"700",whiteSpace:"nowrap",fontFamily:"inherit",transition:"all 0.14s",display:"flex",alignItems:"center",gap:"4px"}}>
            {tb.ic} {tb.l}
          </button>
        ))}
      </div>

      {tab==="overview"&&(
        <>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(165px,1fr))",gap:"12px",marginBottom:"18px"}}>
            {stats.map(s=>(
              <div key={s.l} onClick={()=>s.tab&&setTab(s.tab)} style={{...card,padding:"16px",cursor:"pointer",transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.1)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="";}}>
                <div style={{fontSize:"22px",marginBottom:"6px"}}>{s.ic}</div>
                <div style={{fontWeight:"900",fontSize:"20px",color:s.c}}>{s.v}</div>
                <div style={{fontSize:"11px",color:C.textSub,marginTop:"2px"}}>{s.l}</div>
                <div style={{fontSize:"10px",color:C.forest,marginTop:"2px",fontWeight:"600"}}>{s.d}</div>
              </div>
            ))}
          </div>
          <div style={{...card,padding:"16px"}}>
            <div style={{fontWeight:"800",color:C.text,marginBottom:"13px",fontSize:"14px"}}>📣 {t.automation}</div>
            {[
              {s:"✅",l:t.welcome_email,    d:t.sent_reg},
              {s:"✅",l:t.wa_welcome,       d:t.sent_reg},
              {s:"✅",l:t.post_live_notif,  d:t.post_live_msg},
              {s:"🕐",l:t.re_engage,        d:t.re_engage_msg},
              {s:"📅",l:t.weekly_report,    d:t.sent_monday},
            ].map((m,i)=>(
              <div key={m.l} style={{display:"flex",flexDirection:"column",padding:"8px 0",borderBottom:i<4?`1px solid ${C.border}`:"none",fontSize:"13px",gap:"3px"}}>
                <span style={{flexShrink:0}}>{m.s} <span style={{color:C.text,fontWeight:"600"}}>{m.l}</span></span>
                <span style={{color:C.textSub,fontSize:"11px"}}>{m.d}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {tab==="listings"&&(
        <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
            <div>
              <div style={{fontWeight:"800",color:C.text,fontSize:"16px"}}>{t.my_listings} ({myListings.length})</div>
              <div style={{color:C.textSub,fontSize:"11px"}}>{t.no_daily_cap}</div>
            </div>
            <Btn size="sm" onClick={()=>go("sell")}>➕ {lang==="en"?"Add Listing":"Ajouter Annonce"}</Btn>
          </div>
          {loadingListings?(
            <div style={{textAlign:"center",padding:"40px",color:C.textSub}}>{lang==="en"?"Loading your listings...":"Chargement de vos annonces..."}</div>
          ):myListings.length===0?(
            <div style={{...card,padding:"40px",textAlign:"center"}}>
              <div style={{fontSize:"48px",marginBottom:"12px"}}>📦</div>
              <div style={{fontWeight:"800",color:C.text,marginBottom:"8px"}}>{lang==="en"?"No listings yet":"Pas encore d'annonces"}</div>
              <div style={{color:C.textSub,fontSize:"13px",marginBottom:"16px"}}>{lang==="en"?"Post your first listing and reach buyers across Africa and the world!":"Publiez votre première annonce et atteignez des acheteurs à travers l'Afrique et le monde!"}</div>
              <Btn onClick={()=>go("sell")}>{lang==="en"?"Post Your First Listing":"Publier ma Première Annonce"} 🚀</Btn>
            </div>
          ):(
            <div style={{...card,overflow:"hidden"}}>
              {myListings.map((l,i)=>{
                const cat=CATS.find(c=>c.id===l.category);
                return(
                  <div key={l.id} style={{display:"flex",alignItems:"center",gap:"11px",padding:"11px 15px",borderBottom:i<myListings.length-1?`1px solid ${C.border}`:"none"}}>
                    <div style={{width:"48px",height:"48px",borderRadius:"8px",background:cat?.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px",flexShrink:0}}>
                      {cat?.icon||"📦"}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:"700",fontSize:"13px",color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.title}</div>
                      <div style={{fontSize:"11px",color:C.textSub}}>{cat?.icon} {cat?.[lang]?.label} · 📍 {l.location||l.country}</div>
                      <div style={{fontSize:"10px",color:C.textSub}}>{new Date(l.created_at).toLocaleDateString()}</div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{color:C.kente,fontWeight:"800",fontSize:"13px"}}>{l.price>0?fp(l.price,cc):lang==="en"?"Contact":"Contactez"}</div>
                      <div style={{fontSize:"10px",color:C.forest,fontWeight:"600"}}>👁 {l.views||0}</div>
                    </div>
                    <Tag color={l.status==="live"?C.forest:C.textSub}>{l.status==="live"?(lang==="en"?"LIVE":"EN LIGNE"):(lang==="en"?"DRAFT":"BROUILLON")}</Tag>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {tab==="social"&&(
        <>
          <div style={{fontWeight:"800",color:C.text,fontSize:"16px",marginBottom:"4px"}}>🔗 {t.social_links}</div>
          <p style={{color:C.textSub,fontSize:"13px",marginBottom:"18px"}}>{lang==="en"?"Link your accounts — buyers see all your channels on your storefront.":"Liez vos comptes — les acheteurs voient tous vos réseaux sur votre boutique."}</p>
          <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            {[
              {k:"wa",ic:"💬",l:"WhatsApp",       p:"+237 671 282 427", c:C.success},
              {k:"fb",ic:"📘",l:"Facebook",        p:"YourPageName",     c:"#1877F2"},
              {k:"ig",ic:"📸",l:"Instagram",       p:"@yourbrand",       c:"#E1306C"},
              {k:"tt",ic:"🎵",l:"TikTok",          p:"@yourtiktok",      c:"#333"},
              {k:"yt",ic:"▶️",l:"YouTube",         p:"YourChannelName",  c:"#FF0000"},
            ].map(f=>(
              <div key={f.k} style={{...card,padding:"14px"}}>
                <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"7px",display:"flex",alignItems:"center",gap:"5px"}}>
                  <span style={{fontSize:"16px"}}>{f.ic}</span> {f.l}
                </label>
                <input value={soc[f.k]} onChange={e=>setSoc({...soc,[f.k]:e.target.value})} placeholder={f.p}
                  style={{...inp,border:`1.5px solid ${f.c}40`}}/>
              </div>
            ))}
          </div>
          <div style={{marginTop:"14px"}}><Btn size="lg" onClick={async()=>{if(user?.id){await sb.from("profiles").update({whatsapp:soc.wa,bio:JSON.stringify(soc)}).eq("id",user.id);alert(lang==="en"?"Social links saved!":"Liens sociaux sauvegardés!");}}}>💾 {t.save_social}</Btn></div>
        </>
      )}

      {tab==="storefront"&&(
        <>
          <div style={{fontWeight:"800",color:C.text,fontSize:"16px",marginBottom:"4px"}}>🏪 {t.storefront}</div>
          <p style={{color:C.textSub,fontSize:"13px",marginBottom:"14px"}}>{lang==="en"?"Your own mini-website inside Afrigatemarket.":"Votre mini-site personnel dans Afrigatemarket."}</p>
          <div style={{background:`${C.intBlue}12`,border:`1px solid ${C.intBlue}38`,borderRadius:"12px",padding:"13px",marginBottom:"14px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px"}}>
            <div style={{fontSize:"13px",color:C.text}}>🔗 <strong style={{color:C.intBlue}}>afrigatemarket.com/store/{user?.name?.toLowerCase().replace(/\s+/g,"-")||"your-name"}</strong></div>
            <Btn v="dark" size="sm" onClick={()=>go("store_s1")}>{t.preview_store}</Btn>
          </div>
          <div style={{background:C.bg,borderRadius:"10px",padding:"13px",fontSize:"12px",color:C.textSub,lineHeight:1.9}}>{t.store_features}</div>
        </>
      )}

      {tab==="messages"&&(
        <div style={{...card,padding:"20px"}}>
          <div style={{fontWeight:"800",color:C.text,fontSize:"16px",marginBottom:"14px"}}>💬 {t.messages}</div>
          {[
            {from:lang==="en"?"Buyer in France 🇫🇷":"Acheteur en France 🇫🇷",msg:lang==="en"?"Interested in your real estate listing. Can we negotiate?":"Intéressé par votre annonce immobilière. Peut-on négocier?",time:"2h",isNew:true},
            {from:lang==="en"?"Nigerian Buyer 🇳🇬":"Acheteur Nigérian 🇳🇬",msg:lang==="en"?"Is the Land Cruiser still available?":"Le Land Cruiser est-il toujours disponible?",time:"5h",isNew:true},
            {from:"🤖 Afrigatemarket",msg:lang==="en"?"'We Miss You! Your World Market is waiting — 47 new views since your last visit!'":"'Vous nous manquez! Votre Marché Mondial attend — 47 nouvelles vues depuis votre dernière visite!'",time:"3j",isNew:false},
          ].map((m,i)=>(
            <div key={i} style={{display:"flex",gap:"11px",alignItems:"flex-start",padding:"11px 0",borderBottom:i<2?`1px solid ${C.border}`:"none"}}>
              <div style={{width:"34px",height:"34px",borderRadius:"50%",background:`${C.kente}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px",flexShrink:0}}>{m.from.includes("🤖")?"🤖":"👤"}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:"700",fontSize:"13px",color:C.text}}>{m.from}</div>
                <div style={{fontSize:"12px",color:C.textSub,marginTop:"2px"}}>{m.msg}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:"11px",color:C.textSub}}>{m.time}</div>
                {m.isNew&&<div style={{background:C.kente,color:"#fff",borderRadius:"6px",fontSize:"9px",fontWeight:"700",padding:"2px 5px",marginTop:"3px"}}>NEW</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==="analytics"&&(
        <div style={{...card,padding:"20px"}}>
          <div style={{fontWeight:"800",color:C.text,fontSize:"16px",marginBottom:"16px"}}>📈 {t.analytics}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
            {[
              [lang==="en"?"Views this week":"Vues cette semaine","1,247","📈 +18%"],
              [lang==="en"?"New leads":"Nouveaux leads","34","📈 +12%"],
              [lang==="en"?"Best category":"Meilleure catégorie",lang==="en"?"Real Estate":"Immobilier","🏆 #1"],
              [lang==="en"?"Int'l reach":"Portée Intl","France, UK, USA","🌐"],
            ].map(([l,v,d])=>(
              <div key={l} style={{background:C.bg,borderRadius:"10px",padding:"13px"}}>
                <div style={{fontSize:"11px",color:C.textSub,fontWeight:"700"}}>{l}</div>
                <div style={{fontSize:"18px",fontWeight:"900",color:C.text,margin:"3px 0 2px"}}>{v}</div>
                <div style={{fontSize:"11px",color:C.forest,fontWeight:"600"}}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==="settings"&&(
        <div style={{...card,padding:"20px"}}>
          <div style={{fontWeight:"800",color:C.text,fontSize:"16px",marginBottom:"14px"}}>⚙️ {t.settings}</div>
          {[
            [t.platform,           "Afrigatemarket"],
            [lang==="en"?"Language":"Langue",  lang==="en"?"English 🇬🇧":"Français 🇫🇷"],
            [t.acc_email,          user?.email||"—"],
            ["WhatsApp",           `+${MY_WA}`],
            [t.wa_alerts,          t.unlimited.replace("Unlimited","Enabled").replace("Illimité","Activé")],
            [t.email_reports,      lang==="en"?"Weekly via Resend ✅":"Hebdomadaire via Resend ✅"],
            [t.post_limit,         t.unlimited],
            ["Supabase",           lang==="en"?"Connected ✅":"Connecté ✅"],
          ].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.border}`,fontSize:"13px"}}>
              <span style={{color:C.textSub,fontWeight:"600"}}>{l}</span>
              <span style={{color:C.text,fontWeight:"700"}}>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── International Hub Page ───────────────────────────────────────
function IntlPage({cc,go,lang}){
  const t=T[lang];
  const P=[
    {cc:"FR",name:"France",         flag:"🇫🇷",desc:lang==="en"?"Luxury, agri, EU gateway":"Luxe, agri, passerelle UE",     img:"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=65"},
    {cc:"BE",name:"Belgium",        flag:"🇧🇪",desc:lang==="en"?"Diamonds, EU logistics":"Diamants, logistique UE",          img:"https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=400&q=65"},
    {cc:"DE",name:"Germany",        flag:"🇩🇪",desc:lang==="en"?"Industrial, auto & solar":"Industriel, auto & solaire",     img:"https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=65"},
    {cc:"GB",name:"United Kingdom", flag:"🇬🇧",desc:lang==="en"?"Finance, fashion, diaspora":"Finance, mode, diaspora",      img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=65"},
  ];
  return(
    <div style={{maxWidth:"1100px",margin:"0 auto",padding:"28px 20px"}}>
      <div style={{background:`linear-gradient(135deg,${C.slate},${C.intBlue}CC)`,borderRadius:"20px",padding:"32px 26px",marginBottom:"28px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"url(https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&q=50)",backgroundSize:"cover",backgroundPosition:"center",opacity:.14}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
            <span style={{fontSize:"30px"}}>🌐</span>
            <h1 style={{fontFamily:"'Georgia',serif",color:"#fff",fontSize:"24px"}}>{lang==="en"?"International Trade Hub":"Hub de Commerce International"}</h1>
          </div>
          <p style={{color:"rgba(255,255,255,0.74)",maxWidth:"580px",lineHeight:1.7,marginBottom:"20px",fontSize:"14px"}}>
            {lang==="en"?"Afrigatemarket's gateway to global commerce — Euro (€), Pounds (£) and Dollar ($) pricing.":"La passerelle d'Afrigatemarket vers le commerce mondial — Tarifs en Euro (€), Livre (£) et Dollar ($)."}
          </p>
          <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
            <Btn onClick={()=>go("register")}>{t.join_intl}</Btn>
            <Btn v="secondary" onClick={()=>go("cat_logistics")}>{t.shipping_log}</Btn>
          </div>
        </div>
      </div>
      <SH title={t.intl_title} sub={t.intl_sub}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(236px,100%),1fr))",gap:"16px",marginTop:"18px",marginBottom:"28px"}}>
        {P.map(p=>(
          <div key={p.cc} style={{background:C.bgCard,borderRadius:"15px",overflow:"hidden",border:`1px solid ${C.border}`,transition:"all 0.18s",cursor:"pointer"}}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 22px rgba(0,0,0,0.1)";e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
            <div style={{height:"124px",overflow:"hidden"}}><img src={p.img} alt={p.name} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.target.style.opacity="0";}}/></div>
            <div style={{padding:"14px"}}>
              <div style={{fontSize:"26px",marginBottom:"5px"}}>{p.flag}</div>
              <div style={{fontWeight:"800",fontSize:"14px",color:C.text,marginBottom:"3px"}}>{p.name}</div>
              <div style={{fontSize:"11px",color:C.textSub,lineHeight:1.5,marginBottom:"9px"}}>{p.desc}</div>
              <div style={{fontSize:"12px",color:C.intBlue,fontWeight:"800"}}>{CURRENCIES[p.cc]?.symbol} {Math.round(BASE*(CURRENCIES[p.cc]?.rate||1)).toLocaleString()} / mo</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:C.bgCard,borderRadius:"15px",border:`1px solid ${C.border}`,padding:"22px"}}>
        <SH title={t.global_sub} sub={t.global_sub_s}/>
        <div style={{overflowX:"auto",marginTop:"14px"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"13px"}}>
            <thead><tr style={{borderBottom:`2px solid ${C.border}`}}>
              {[t.country_col,t.symbol_col,t.monthly_col,t.annual_col].map(h=><th key={h} style={{textAlign:"left",padding:"9px 11px",color:C.textSub,fontWeight:"700",fontSize:"11px"}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {ALL_CC.map(c=>(
                <tr key={c.code} style={{borderBottom:`1px solid ${C.border}`}}>
                  <td style={{padding:"9px 11px"}}>{c.flag} {c.name}</td>
                  <td style={{padding:"9px 11px",color:C.textSub}}>{c.symbol}</td>
                  <td style={{padding:"9px 11px",fontWeight:"700",color:C.kente}}>{c.symbol} {Math.round(BASE*c.rate).toLocaleString()}</td>
                  <td style={{padding:"9px 11px",color:C.forest,fontWeight:"700"}}>{c.symbol} {Math.round(BASE*c.rate*12*0.8).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────

// ─── Pricing Page ─────────────────────────────────────────────────

// ─── Search Results ───────────────────────────────────────────────
function SearchResults({query,cc,go,lang}){
  const [realResults,setRealResults]=useState([]);
  const [loadingReal,setLoadingReal]=useState(true);

  useEffect(()=>{
    async function fetchReal(){
      try{
        const q=query.toLowerCase();
        const {data}=await sb.from("listings")
          .select("*")
          .eq("status","live")
          .or(`title.ilike.%${q}%,description.ilike.%${q}%,location.ilike.%${q}%,category.ilike.%${q}%`);
        setRealResults(data||[]);
      }catch(e){setRealResults([]);}
      setLoadingReal(false);
    }
    fetchReal();
  },[query]);

  // Also search demo listings
  const demoResults = ALL_LISTINGS.filter(l => {
    const title = (lang==="fr"&&l.title_fr?l.title_fr:l.title).toLowerCase();
    const catId = Object.entries(LISTINGS).find(([,items])=>items.some(i=>i.id===l.id))?.[0]||"";
    const cat = CATS.find(c=>c.id===catId);
    const catLabel = (cat?.[lang]?.label||"").toLowerCase();
    const loc = (l.loc||"").toLowerCase();
    const q = query.toLowerCase();
    return title.includes(q) || catLabel.includes(q) || loc.includes(q);
  });

  const results = [...realResults.map(l=>({...l,isReal:true})), ...demoResults];
  return(
    <div style={{maxWidth:"1200px",margin:"0 auto",padding:"26px 20px"}}>
      <button onClick={()=>go("home")} style={{background:"none",border:"none",color:C.intBlue,cursor:"pointer",marginBottom:"14px",fontSize:"13px",fontFamily:"inherit",fontWeight:"600"}}>
        ← {lang==="en"?"Back":"Retour"}
      </button>
      <SH
        title={lang==="en"?`Search results for "${query}"`:`Résultats pour "${query}"`}
        sub={lang==="en"?`${results.length} listing(s) found`:`${results.length} annonce(s) trouvée(s)`}
      />
      {results.length>0?(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(258px,100%),1fr))",gap:"16px",marginTop:"18px"}}>
          {results.map((l,idx)=>{
            if(l.isReal){
              // Real user listing from Supabase
              const cat=CATS.find(c=>c.id===l.category);
              return(
                <div key={"r"+l.id} style={{background:C.bgCard,borderRadius:"16px",border:`1px solid ${C.border}`,overflow:"hidden",cursor:"pointer"}}
                  onClick={()=>go("listing_r"+l.id)}>
                  <div style={{height:"160px",background:`${cat?.color||C.kente}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"48px"}}>
                    {cat?.icon||"📦"}
                  </div>
                  <div style={{padding:"12px"}}>
                    <div style={{fontWeight:"700",color:C.text,fontSize:"13px",marginBottom:"4px"}}>{l.title}</div>
                    <div style={{color:C.kente,fontWeight:"800",fontSize:"14px",marginBottom:"4px"}}>{l.price>0?fp(l.price,cc):(lang==="en"?"Contact":"Contactez")}</div>
                    <div style={{fontSize:"11px",color:C.textSub}}>📍 {l.location||l.country}</div>
                    {l.delivery_available&&<div style={{fontSize:"11px",color:C.forest,marginTop:"3px",fontWeight:"700"}}>🚚 {lang==="en"?"Delivery available":"Livraison disponible"}</div>}
                    {l.seller_whatsapp&&(
                      <a href={`https://wa.me/${l.seller_whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noreferrer"
                        onClick={e=>e.stopPropagation()}
                        style={{display:"inline-flex",alignItems:"center",gap:"4px",marginTop:"8px",padding:"5px 10px",borderRadius:"16px",background:"#25D36620",border:"1px solid #25D36650",color:C.success,textDecoration:"none",fontSize:"11px",fontWeight:"700"}}>
                        💬 WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              );
            }
            const catId=Object.entries(LISTINGS).find(([,items])=>items.some(i=>i.id===l.id))?.[0]||"";
            return <Card key={l.id} listing={{...l,cat:catId,category:catId}} cc={cc} go={go} lang={lang}/>;
          })}
        </div>
      ):(
        <div style={{textAlign:"center",padding:"60px",background:C.bgCard,borderRadius:"16px",border:`1px solid ${C.border}`,marginTop:"16px"}}>
          <div style={{fontSize:"48px",marginBottom:"10px"}}>🔍</div>
          <div style={{fontWeight:"700",color:C.text,marginBottom:"8px",fontSize:"16px"}}>
            {lang==="en"?`No results for "${query}"`:`Aucun résultat pour "${query}"`}
          </div>
          <p style={{color:C.textSub,fontSize:"13px",marginBottom:"16px"}}>
            {lang==="en"?"Try searching in a different category":"Essayez de chercher dans une autre catégorie"}
          </p>
          <div style={{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"}}>
            <Btn onClick={()=>go("listings")}>{lang==="en"?"Browse All Listings":"Voir Toutes les Annonces"}</Btn>
            <Btn v="ghost" onClick={()=>go("home")}>{lang==="en"?"Go Home":"Accueil"}</Btn>
          </div>
        </div>
      )}
    </div>
  );
}


// ─── CinetPay Payment System ──────────────────────────────────────
async function initiateCinetPay({amount, currency, description, userId, userEmail, userName, planType, lang}){
  const transactionId = "AGM_" + userId.slice(0,8) + "_" + Date.now();
  try{
    // Save pending transaction to Supabase
    await sb.from("subscriptions").upsert({
      user_id: userId,
      transaction_id: transactionId,
      plan: planType,
      amount: amount,
      currency: currency,
      status: "pending",
      created_at: new Date().toISOString(),
    });

    // Open CinetPay checkout
    const params = new URLSearchParams({
      apikey: CINETPAY_APIKEY,
      site_id: CINETPAY_SITEID,
      transaction_id: transactionId,
      amount: String(amount),
      currency: currency,
      description: description,
      customer_name: userName,
      customer_email: userEmail,
      customer_phone_number: "",
      customer_address: "Cameroon",
      customer_city: "Douala",
      customer_country: "CM",
      customer_state: "CM",
      customer_zip_code: "237",
      return_url: window.location.origin + "?payment=success&plan=" + planType + "&txn=" + transactionId,
      notify_url: CINETPAY_NOTIFY,
      channels: "ALL",
      lang: lang==="fr"?"fr":"en",
    });

    // Open CinetPay in same window
    window.location.href = "https://checkout.cinetpay.com/?" + params.toString();
  }catch(e){
    console.error("CinetPay error:", e);
    alert(lang==="fr"?"Erreur de paiement. Réessayez.":"Payment error. Please try again.");
  }
}

// Activate subscription after successful payment
async function activateSubscription(userId, planType, transactionId, lang){
  try{
    const months = planType==="annual" ? 12 : 1;
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + months);

    await sb.from("profiles").update({
      subscription_plan: planType,
      subscription_start: new Date().toISOString(),
      subscription_expiry: expiry.toISOString(),
      is_subscribed: true,
      verified: true,
    }).eq("id", userId);

    await sb.from("subscriptions").update({
      status: "active",
      activated_at: new Date().toISOString(),
    }).eq("transaction_id", transactionId);

    console.log("Subscription activated:", planType, "until", expiry);
  }catch(e){console.error("Activation error:", e);}
}

// Check payment return URL on app load
async function checkPaymentReturn(user, lang){
  const params = new URLSearchParams(window.location.search);
  if(params.get("payment")==="success" && user?.id){
    const plan = params.get("plan");
    const txn = params.get("txn");
    if(plan && txn){
      await activateSubscription(user.id, plan, txn, lang);
      // Clean URL
      window.history.replaceState({}, "", window.location.pathname);
      const msg = lang==="fr"
        ? `🎉 Paiement réussi! Votre abonnement ${plan==="annual"?"annuel":"mensuel"} est actif!`
        : `🎉 Payment successful! Your ${plan==="annual"?"annual":"monthly"} subscription is now active!`;
      alert(msg);
    }
  }
}

// ─── Payment Modal Component ──────────────────────────────────────
function PaymentModal({plan, cc, user, lang, onClose, go}){
  const isFr = lang==="fr";
  const cur = CURRENCIES[cc]||CURRENCIES.CM;
  const isAnnual = plan==="annual";
  const priceXAF = isAnnual ? ANNUAL_PRICE_XAF : MONTHLY_PRICE_XAF;
  const priceLocal = Math.round(priceXAF * cur.rate);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("mtn");

  const methods = [
    {id:"mtn",   icon:"🟡", name:"MTN Mobile Money",   desc:isFr?"Cameroun & Afrique":"Cameroon & Africa"},
    {id:"orange",icon:"🟠", name:"Orange Money",        desc:isFr?"Cameroun & Afrique":"Cameroon & Africa"},
    {id:"card",  icon:"💳", name:"Visa / Mastercard",   desc:isFr?"Carte internationale":"International card"},
    {id:"wave",  icon:"🌊", name:"Wave",                desc:isFr?"Sénégal, CI":"Senegal, CI"},
  ];

  async function pay(){
    if(!user?.id){go("login");return;}
    setLoading(true);
    await initiateCinetPay({
      amount: priceXAF,
      currency: "XAF",
      description: isFr
        ? `AfriGate Market - Abonnement ${isAnnual?"Annuel":"Mensuel"}`
        : `AfriGate Market - ${isAnnual?"Annual":"Monthly"} Subscription`,
      userId: user.id,
      userEmail: user.email,
      userName: user.name||user.email,
      planType: isAnnual?"annual":"monthly",
      lang,
    });
    setLoading(false);
  }

  return(
    <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{background:C.bgCard,borderRadius:"20px",padding:"26px",maxWidth:"420px",width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,0.3)",position:"relative"}}>
        {/* Close */}
        <button onClick={onClose} style={{position:"absolute",top:"14px",right:"14px",background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:C.textSub}}>✕</button>

        {/* Header */}
        <div style={{textAlign:"center",marginBottom:"20px"}}>
          <div style={{fontSize:"40px",marginBottom:"8px"}}>{isAnnual?"🏆":"⭐"}</div>
          <h3 style={{fontFamily:"'Georgia',serif",color:C.text,fontSize:"18px",marginBottom:"4px"}}>
            {isFr?`Plan ${isAnnual?"Annuel":"Mensuel"}`:`${isAnnual?"Annual":"Monthly"} Plan`}
          </h3>
          <div style={{fontSize:"32px",fontWeight:"900",color:C.kente}}>{cur.symbol} {priceLocal.toLocaleString()}</div>
          <div style={{fontSize:"12px",color:C.textSub}}>{isFr?isAnnual?"/ An (20% réduction)":"/ Mois":isAnnual?"/ Year (20% off)":"/ Month"}</div>
        </div>

        {/* What they get */}
        <div style={{background:`${C.forest}10`,borderRadius:"12px",padding:"12px",marginBottom:"16px"}}>
          <div style={{fontWeight:"800",color:C.forest,fontSize:"12px",marginBottom:"8px"}}>✅ {isFr?"Ce que vous obtenez:":"What you get:"}</div>
          {(isFr?[
            "Annonces illimitées pendant "+(isAnnual?"12 mois":"1 mois"),
            "Badge vendeur vérifié ✓",
            "Placement prioritaire dans la recherche",
            "Accès Hub International",
            "Support prioritaire 24h/24",
          ]:[
            "Unlimited listings for "+(isAnnual?"12 months":"1 month"),
            "Verified seller badge ✓",
            "Priority placement in search",
            "International Hub access",
            "Priority 24/7 support",
          ]).map((f,i)=>(
            <div key={i} style={{fontSize:"12px",color:C.textSub,padding:"3px 0"}}>✅ {f}</div>
          ))}
        </div>

        {/* Payment method selector */}
        <div style={{marginBottom:"16px"}}>
          <div style={{fontSize:"12px",color:C.textSub,fontWeight:"700",marginBottom:"8px"}}>{isFr?"Choisir le mode de paiement:":"Choose payment method:"}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
            {methods.map(m=>(
              <div key={m.id} onClick={()=>setMethod(m.id)}
                style={{padding:"10px",borderRadius:"10px",border:`2px solid ${method===m.id?C.kente:C.border}`,background:method===m.id?`${C.kente}10`:C.bg,cursor:"pointer",textAlign:"center"}}>
                <div style={{fontSize:"20px",marginBottom:"3px"}}>{m.icon}</div>
                <div style={{fontSize:"11px",fontWeight:"700",color:method===m.id?C.kente:C.text}}>{m.name}</div>
                <div style={{fontSize:"9px",color:C.textSub}}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pay button */}
        <button onClick={pay} disabled={loading}
          style={{width:"100%",padding:"14px",borderRadius:"28px",border:"none",background:`linear-gradient(135deg,${C.kente},${C.gold})`,color:"#fff",fontWeight:"900",fontSize:"16px",cursor:"pointer",fontFamily:"inherit",boxShadow:`0 6px 20px ${C.kente}40`}}>
          {loading?(isFr?"Ouverture paiement...":"Opening payment..."):`💳 ${isFr?"Payer":"Pay"} ${cur.symbol} ${priceLocal.toLocaleString()}`}
        </button>

        <div style={{textAlign:"center",marginTop:"12px",fontSize:"11px",color:C.textSub}}>
          🔒 {isFr?"Paiement sécurisé via CinetPay":"Secure payment via CinetPay"}<br/>
          {isFr?"Accès automatique après paiement":"Automatic access after payment"}
        </div>
      </div>
    </div>
  );
}

function PricingPage({cc,go,lang,user}){
  const cur=CURRENCIES[cc]||CURRENCIES.CM;
  const isFr=lang==="fr";
  const [payModal,setPayModal]=useState(null); // "monthly" or "annual"
  const plans=[
    {
      name:lang==="en"?"Free Trial":"Essai Gratuit",
      nameColor:C.forest,
      price:0,
      period:lang==="en"?"60 Days":"60 Jours",
      badge:lang==="en"?"START HERE":"COMMENCEZ ICI",
      badgeColor:C.forest,
      features:lang==="en"?[
        "✅ Unlimited listings",
        "✅ Personal storefront",
        "✅ WhatsApp leads",
        "✅ 10 photos per listing",
        "✅ All 12 categories",
        "✅ Dashboard access",
        "✅ Welcome email",
        "✅ No credit card needed",
      ]:[
        "✅ Annonces illimitées",
        "✅ Vitrine personnelle",
        "✅ Leads WhatsApp",
        "✅ 10 photos par annonce",
        "✅ 12 catégories",
        "✅ Accès tableau de bord",
        "✅ Email de bienvenue",
        "✅ Aucune carte bancaire",
      ],
      cta:lang==="en"?"Start Free Trial":"Commencer Gratuit",
      dest:"register",
    },
    {
      name:lang==="en"?"Monthly Plan":"Plan Mensuel",
      nameColor:C.kente,
      price:BASE,
      period:lang==="en"?"/ Month":"/ Mois",
      badge:lang==="en"?"MOST POPULAR":"LE PLUS POPULAIRE",
      badgeColor:C.kente,
      features:lang==="en"?[
        "✅ Everything in Free Trial",
        "✅ Priority listing placement",
        "✅ WhatsApp automation",
        "✅ Email automation",
        "✅ Analytics dashboard",
        "✅ International Hub access",
        "✅ Seller verification badge",
        "✅ Cancel anytime",
      ]:[
        "✅ Tout de l'Essai Gratuit",
        "✅ Placement prioritaire",
        "✅ Automatisation WhatsApp",
        "✅ Automatisation Email",
        "✅ Tableau de bord analytique",
        "✅ Accès Hub International",
        "✅ Badge vendeur vérifié",
        "✅ Annuler à tout moment",
      ],
      cta:lang==="en"?"Subscribe Monthly":"S'abonner Mensuellement",
      dest:"register",
      highlight:true,
    },
    {
      name:lang==="en"?"Annual Plan":"Plan Annuel",
      nameColor:C.intBlue,
      price:Math.round(BASE*12*0.8),
      period:lang==="en"?"/ Year (Save 20%)":"/ An (Économisez 20%)",
      badge:lang==="en"?"BEST VALUE":"MEILLEUR PRIX",
      badgeColor:C.intBlue,
      features:lang==="en"?[
        "✅ Everything in Monthly",
        "✅ 20% discount",
        "✅ Featured seller badge",
        "✅ Homepage promotion",
        "✅ Priority customer support",
        "✅ Advanced analytics",
        "✅ Social media integration",
        "✅ Dedicated account manager",
      ]:[
        "✅ Tout du Plan Mensuel",
        "✅ Réduction 20%",
        "✅ Badge vendeur vedette",
        "✅ Promotion page d'accueil",
        "✅ Support prioritaire",
        "✅ Analyses avancées",
        "✅ Intégration réseaux sociaux",
        "✅ Gestionnaire de compte dédié",
      ],
      cta:lang==="en"?"Subscribe Annually":"S'abonner Annuellement",
      dest:"register",
    },
  ];

  return(
    <div style={{maxWidth:"1100px",margin:"0 auto",padding:"28px 20px"}}>
      <div style={{textAlign:"center",marginBottom:"36px"}}>
        <SH
          title={lang==="en"?"Simple, Transparent Pricing":"Tarifs Simples et Transparents"}
          sub={lang==="en"?"Start free for 60 days. No credit card required.":"Commencez gratuitement 60 jours. Aucune carte bancaire requise."}
        />
        <div style={{display:"flex",justifyContent:"center",gap:"8px",flexWrap:"wrap",marginTop:"12px"}}>
          {Object.entries(CURRENCIES).map(([code,c])=>(
            <span key={code} style={{fontSize:"11px",color:C.textSub}}>{c.flag} {c.symbol} {Math.round(BASE*c.rate).toLocaleString()}/mo</span>
          ))}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(290px,100%),1fr))",gap:"20px",marginBottom:"40px"}}>
        {plans.map((plan,i)=>(
          <div key={i} style={{background:C.bgCard,borderRadius:"20px",padding:"26px",border:`2px solid ${plan.highlight?plan.nameColor:C.border}`,position:"relative",boxShadow:plan.highlight?`0 8px 30px ${plan.nameColor}25`:"0 2px 8px rgba(0,0,0,0.05)",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,0.12)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=plan.highlight?"0 8px 30px "+plan.nameColor+"25":"0 2px 8px rgba(0,0,0,0.05)";}}>
            {/* Badge */}
            <div style={{position:"absolute",top:"-12px",left:"50%",transform:"translateX(-50%)",background:plan.badgeColor,color:"#fff",borderRadius:"20px",padding:"3px 14px",fontSize:"10px",fontWeight:"800",whiteSpace:"nowrap"}}>{plan.badge}</div>

            <div style={{textAlign:"center",marginBottom:"20px",paddingTop:"8px"}}>
              <div style={{fontFamily:"'Georgia',serif",fontSize:"18px",fontWeight:"900",color:plan.nameColor,marginBottom:"10px"}}>{plan.name}</div>
              <div style={{fontSize:"36px",fontWeight:"900",color:C.text,lineHeight:1}}>
                {plan.price===0?"FREE":`${cur.symbol} ${Math.round(plan.price*cur.rate).toLocaleString()}`}
              </div>
              <div style={{fontSize:"13px",color:C.textSub,marginTop:"4px"}}>{plan.period}</div>
            </div>

            <div style={{marginBottom:"22px"}}>
              {plan.features.map((f,j)=>(
                <div key={j} style={{padding:"5px 0",fontSize:"13px",color:C.text,borderBottom:j<plan.features.length-1?`1px solid ${C.border}`:"none"}}>{f}</div>
              ))}
            </div>

            <button onClick={()=>{
                if(plan.price===0){go("register");}
                else{setPayModal(plan.name.toLowerCase().includes("annual")||plan.name.toLowerCase().includes("annuel")?"annual":"monthly");}
              }}
              style={{width:"100%",padding:"13px",borderRadius:"28px",border:"none",background:plan.highlight?`linear-gradient(135deg,${plan.nameColor},${C.gold})`:`${plan.nameColor}18`,color:plan.highlight?"#fff":plan.nameColor,fontWeight:"800",fontSize:"14px",cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              {plan.price===0?plan.cta:"💳 "+plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {payModal&&<PaymentModal plan={payModal} cc={cc} user={user} lang={lang} go={go} onClose={()=>setPayModal(null)}/>}

      {/* Payment methods */}
      <div style={{background:C.bgCard,borderRadius:"16px",padding:"24px",border:`1px solid ${C.border}`,marginBottom:"24px"}}>
        <div style={{fontFamily:"'Georgia',serif",fontSize:"16px",fontWeight:"700",color:C.text,marginBottom:"16px",textAlign:"center"}}>
          {lang==="en"?"Accepted Payment Methods":"Moyens de Paiement Acceptés"}
        </div>
        <div style={{display:"flex",gap:"12px",flexWrap:"wrap",justifyContent:"center"}}>
          {[
            {name:"Orange Money",icon:"🟠",color:"#FF6600",desc:lang==="en"?"Cameroon, West Africa":"Cameroun, Afrique de l'Ouest",wa:true},
            {name:"MTN MoMo",icon:"🟡",color:"#FFCC00",desc:lang==="en"?"Mobile Money":"Mobile Money",wa:true},
            {name:"Visa / Mastercard",icon:"💳",color:"#1A1F71",desc:lang==="en"?"International cards":"Cartes internationales",wa:true},
            {name:"PayPal",icon:"🔵",color:"#003087",desc:lang==="en"?"International":"International",wa:true},
            {name:"Bank Transfer",icon:"🏦",color:"#2E7D32",desc:lang==="en"?"Direct transfer":"Virement direct",wa:true},
          ].map(p=>(
            <a key={p.name}
              href={`https://wa.me/237671282427?text=${encodeURIComponent(lang==="en"?`Hello! I want to pay via ${p.name} for Afrigatemarket subscription.`:`Bonjour! Je veux payer via ${p.name} pour mon abonnement Afrigatemarket.`)}`}
              target="_blank" rel="noreferrer"
              style={{background:`${p.color}12`,border:`1.5px solid ${p.color}40`,borderRadius:"12px",padding:"12px 16px",textAlign:"center",minWidth:"130px",flex:"1",textDecoration:"none",display:"block",transition:"all 0.2s",cursor:"pointer"}}
              onMouseEnter={e=>{e.currentTarget.style.background=p.color+"25";e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background=""+p.color+"12";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{fontSize:"24px",marginBottom:"5px"}}>{p.icon}</div>
              <div style={{fontWeight:"800",fontSize:"12px",color:p.color,marginBottom:"2px"}}>{p.name}</div>
              <div style={{fontSize:"10px",color:C.textSub,marginBottom:"4px"}}>{p.desc}</div>
              <div style={{fontSize:"9px",color:p.color,fontWeight:"700"}}>{lang==="en"?"Tap to pay via WhatsApp":"Appuyer pour payer"}</div>
            </a>
          ))}
        </div>
        <p style={{textAlign:"center",color:C.textSub,fontSize:"12px",marginTop:"14px"}}>
          {lang==="en"
            ?"Payment gateway integration coming soon. Contact us via WhatsApp to subscribe now."
            :"Intégration de paiement bientôt disponible. Contactez-nous via WhatsApp pour vous abonner maintenant."}
        </p>
        <div style={{textAlign:"center",marginTop:"12px"}}>
          <a href={`https://wa.me/237671282427?text=${encodeURIComponent(lang==="en"?"Hello! I want to subscribe to Afrigatemarket.":"Bonjour! Je veux m'abonner à Afrigatemarket.")}`}
            target="_blank" rel="noreferrer"
            style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"12px 24px",borderRadius:"28px",background:C.success,color:"#fff",textDecoration:"none",fontWeight:"800",fontSize:"14px"}}>
            💬 {lang==="en"?"Subscribe via WhatsApp":"S'abonner via WhatsApp"}
          </a>
        </div>
      </div>

      {/* FAQ */}
      <div style={{background:C.bg,borderRadius:"16px",padding:"24px",border:`1px solid ${C.border}`}}>
        <div style={{fontFamily:"'Georgia',serif",fontSize:"16px",fontWeight:"700",color:C.text,marginBottom:"16px"}}>
          {lang==="en"?"Frequently Asked Questions":"Questions Fréquentes"}
        </div>
        {[
          {q:lang==="en"?"Do I need a credit card to start?":"Faut-il une carte bancaire pour commencer?",
           a:lang==="en"?"No! Your 60-day free trial requires zero payment. Just register and start posting.":"Non! L'essai gratuit de 60 jours ne nécessite aucun paiement. Inscrivez-vous et commencez à publier."},
          {q:lang==="en"?"How many listings can I post?":"Combien d'annonces puis-je publier?",
           a:lang==="en"?"Unlimited! No daily cap. Post 10, 20, 50+ listings per day.":"Illimité! Sans limite quotidienne. Publiez 10, 20, 50+ annonces par jour."},
          {q:lang==="en"?"Can I cancel anytime?":"Puis-je annuler à tout moment?",
           a:lang==="en"?"Yes. Cancel anytime with no penalty. Your listings stay visible until your period ends.":"Oui. Annulez à tout moment sans pénalité. Vos annonces restent visibles jusqu'à la fin de votre période."},
          {q:lang==="en"?"How do buyers contact me?":"Comment les acheteurs me contactent-ils?",
           a:lang==="en"?"Directly via WhatsApp. Every listing has your WhatsApp number so buyers can message you instantly.":"Directement via WhatsApp. Chaque annonce affiche votre numéro WhatsApp pour que les acheteurs vous contactent instantanément."},
        ].map((faq,i)=>(
          <div key={i} style={{marginBottom:"12px",padding:"13px",background:C.bgCard,borderRadius:"10px",border:`1px solid ${C.border}`}}>
            <div style={{fontWeight:"700",color:C.text,fontSize:"13px",marginBottom:"5px"}}>❓ {faq.q}</div>
            <div style={{color:C.textSub,fontSize:"12px",lineHeight:1.6}}>💡 {faq.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────
function ContactPage({go,lang}){
  return(
    <div style={{maxWidth:"700px",margin:"0 auto",padding:"28px 20px"}}>
      <SH
        title={lang==="en"?"Contact & Support":"Contact et Support"}
        sub={lang==="en"?"We are here to help — 24/7":"Nous sommes là pour vous aider — 24h/24"}
      />
      <div style={{display:"grid",gap:"14px",marginTop:"18px"}}>
        {[
          {icon:"💬",title:"WhatsApp",desc:lang==="en"?"Chat with us directly — fastest response":"Discutez avec nous directement — réponse la plus rapide",link:`https://wa.me/237671282427`,cta:lang==="en"?"Open WhatsApp":"Ouvrir WhatsApp",color:C.success},
          {icon:"📧",title:"Email",desc:"afrigatemarket@gmail.com",link:"mailto:afrigatemarket@gmail.com",cta:lang==="en"?"Send Email":"Envoyer Email",color:C.intBlue},
          {icon:"📍",title:lang==="en"?"Location":"Localisation",desc:"Douala, Cameroun 🇨🇲",link:"",cta:"",color:C.kente},
          {icon:"🕐",title:lang==="en"?"Support Hours":"Heures de Support",desc:lang==="en"?"24/7 — We never sleep!":"24h/24 — Nous ne dormons jamais!",link:"",cta:"",color:C.forest},
        ].map((c,i)=>(
          <div key={i} style={{background:C.bgCard,borderRadius:"14px",padding:"18px",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:"14px"}}>
            <div style={{fontSize:"32px",flexShrink:0}}>{c.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:"800",color:C.text,fontSize:"14px",marginBottom:"3px"}}>{c.title}</div>
              <div style={{color:C.textSub,fontSize:"13px"}}>{c.desc}</div>
            </div>
            {c.link&&<a href={c.link} target="_blank" rel="noreferrer"
              style={{padding:"8px 16px",borderRadius:"20px",background:`${c.color}18`,border:`1.5px solid ${c.color}50`,color:c.color,textDecoration:"none",fontSize:"12px",fontWeight:"700",flexShrink:0,whiteSpace:"nowrap"}}>
              {c.cta}
            </a>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer({go,lang}){
  const t=T[lang];
  return(
    <footer style={{background:C.slate,borderTop:`3px solid ${C.gold}48`,padding:"40px 20px 18px",marginTop:"56px"}}>
      <div style={{position:"relative",borderRadius:"15px",overflow:"hidden",padding:"22px 26px",marginBottom:"32px"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"url(https://images.unsplash.com/photo-1521791055366-0d553872952f?w=1400&q=50)",backgroundSize:"cover",backgroundPosition:"center",opacity:.10}}/>
        <div style={{position:"absolute",inset:0,background:`${C.slate}E8`}}/>
        <div style={{position:"relative",zIndex:1,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
          <div>
            <div style={{color:C.gold,fontFamily:"'Georgia',serif",fontSize:"17px",fontWeight:"700"}}>🤝 {t.africa_connects}</div>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:"12px",marginTop:"3px"}}>{t.footer_nations}</div>
          </div>
          <Btn v="secondary" onClick={()=>go("intl")}>{t.view_intl}</Btn>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(188px,1fr))",gap:"24px",marginBottom:"24px"}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"9px"}}>
            <AfriGateLogo size={32} dark/>
            <div style={{display:"flex",alignItems:"baseline",gap:"0"}}>
              <span style={{fontFamily:"'Segoe UI',Arial,sans-serif",fontWeight:"900",fontSize:"17px",color:"#fff"}}>AfriGate</span>
              <span style={{fontFamily:"'Segoe UI',Arial,sans-serif",fontWeight:"400",fontSize:"17px",color:"rgba(255,255,255,0.75)"}}> Market</span>
            </div>
          </div>
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:"12px",lineHeight:1.8}}>{t.tagline}</div>
          <div style={{display:"flex",gap:"7px",marginTop:"12px"}}>
            {[
              {name:"Facebook",c:"#1877F2",url:"https://www.facebook.com/share/1QtZF2vPCo/",path:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"},
              {name:"Instagram",c:"#E1306C",url:"https://www.instagram.com/afrigatemarket?igsh=MXY4ZmgybzNpZW9vOA==",path:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"},
              {name:"TikTok",c:"#69C9D0",url:"https://www.tiktok.com/@afrigatemarket",path:"M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"},
              {name:"YouTube",c:"#FF0000",url:"https://www.youtube.com",path:"M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"},
            ].map((s,i)=>(
              <a key={i} href={s.url} target="_blank" rel="noreferrer"
                style={{width:"34px",height:"34px",borderRadius:"50%",background:`${s.c}22`,border:`1px solid ${s.c}55`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.2s",textDecoration:"none"}}
                onMouseEnter={e=>{e.currentTarget.style.background=""+s.c+"55";e.currentTarget.style.transform="scale(1.1)";}}
                onMouseLeave={e=>{e.currentTarget.style.background=""+s.c+"22";e.currentTarget.style.transform="scale(1)";}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={s.c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.path}/>
                </svg>
              </a>
            ))}
          </div>
        </div>
        <div>
          <div style={{color:C.gold,fontWeight:"800",fontSize:"12px",marginBottom:"9px"}}>{t.categories_f}</div>
          {CATS.slice(0,6).map(c=>(
            <div key={c.id} onClick={()=>go("cat_"+c.id)} style={{color:"rgba(255,255,255,0.5)",fontSize:"12px",padding:"2px 0",cursor:"pointer",transition:"color 0.15s"}}
              onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.5)"}>
              {c.icon} {c[lang].label}
            </div>
          ))}
        </div>
        <div>
          <div style={{color:C.gold,fontWeight:"800",fontSize:"12px",marginBottom:"9px"}}>{t.nations_f}</div>
          {ALL_CC.filter(c=>c.r==="africa").map(c=><div key={c.code} style={{color:"rgba(255,255,255,0.5)",fontSize:"12px",padding:"2px 0"}}>{c.flag} {c.name}</div>)}
          <div style={{marginTop:"6px",paddingTop:"6px",borderTop:"1px solid rgba(255,255,255,0.1)"}}>
            {ALL_CC.filter(c=>c.r!=="africa").map(c=><div key={c.code} style={{color:"rgba(255,255,255,0.35)",fontSize:"11px",padding:"2px 0"}}>{c.flag} {c.name}</div>)}
          </div>
        </div>
        <div>
          <div style={{color:C.gold,fontWeight:"800",fontSize:"12px",marginBottom:"9px"}}>{t.support_f}</div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"10px"}}>
            {/* Email - clickable */}
            <a href={`mailto:${MY_EMAIL}`}
              style={{display:"flex",alignItems:"center",gap:"8px",color:"rgba(255,255,255,0.7)",textDecoration:"none",fontSize:"12px",padding:"6px 10px",borderRadius:"8px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",transition:"all 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}>
              <span style={{fontSize:"16px"}}>📧</span>
              <span>{MY_EMAIL}</span>
            </a>
            {/* WhatsApp - click to call/chat */}
            <a href={`https://wa.me/${MY_WA}`} target="_blank" rel="noreferrer"
              style={{display:"flex",alignItems:"center",gap:"8px",color:"#25D366",textDecoration:"none",fontSize:"12px",padding:"6px 10px",borderRadius:"8px",background:"#25D36615",border:"1px solid #25D36640",transition:"all 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.background="#25D36625"}
              onMouseLeave={e=>e.currentTarget.style.background="#25D36615"}>
              <span style={{fontSize:"16px"}}>💬</span>
              <span>+{MY_WA}</span>
            </a>
            {/* Phone - click to call */}
            <a href={`tel:+${MY_WA}`}
              style={{display:"flex",alignItems:"center",gap:"8px",color:"rgba(255,255,255,0.7)",textDecoration:"none",fontSize:"12px",padding:"6px 10px",borderRadius:"8px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",transition:"all 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}>
              <span style={{fontSize:"16px"}}>📞</span>
              <span>+{MY_WA}</span>
            </a>
            {/* Location - opens Google Maps */}
            <a href="https://maps.google.com/?q=Douala,Cameroon" target="_blank" rel="noreferrer"
              style={{display:"flex",alignItems:"center",gap:"8px",color:"rgba(255,255,255,0.7)",textDecoration:"none",fontSize:"12px",padding:"6px 10px",borderRadius:"8px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",transition:"all 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}>
              <span style={{fontSize:"16px"}}>📍</span>
              <span>Douala, Cameroon</span>
            </a>
            <div style={{display:"flex",alignItems:"center",gap:"8px",color:"rgba(255,255,255,0.5)",fontSize:"12px",padding:"4px 10px"}}>
              <span style={{fontSize:"16px"}}>🕐</span>
              <span>{t.support_247}</span>
            </div>
          </div>
          <a href={`https://wa.me/${MY_WA}?text=${encodeURIComponent("Bonjour AfriGate Market! J'ai besoin d'aide.")}`} target="_blank" rel="noreferrer"
            style={{display:"inline-flex",alignItems:"center",gap:"5px",padding:"9px 16px",borderRadius:"18px",background:"#25D366",color:"#fff",textDecoration:"none",fontSize:"12px",fontWeight:"800",boxShadow:"0 4px 12px #25D36640"}}>
            💬 {t.whatsapp_sup}
          </a>
        </div>
      </div>
      <div style={{borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:"14px",display:"flex",flexDirection:"column",gap:"10px"}}>
        <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
          <span onClick={()=>go("privacy")} style={{color:C.gold,fontSize:"11px",cursor:"pointer",textDecoration:"underline"}}>Privacy Policy</span>
          <span onClick={()=>go("terms")} style={{color:C.gold,fontSize:"11px",cursor:"pointer",textDecoration:"underline"}}>Terms of Service</span>
          <span onClick={()=>go("reviews")} style={{color:C.gold,fontSize:"11px",cursor:"pointer",textDecoration:"underline"}}>Reviews ⭐</span>
          <span onClick={()=>go("faq")} style={{color:C.gold,fontSize:"11px",cursor:"pointer",textDecoration:"underline"}}>FAQ</span>
          <span onClick={()=>go("how")} style={{color:C.gold,fontSize:"11px",cursor:"pointer",textDecoration:"underline"}}>How It Works</span>
          <span onClick={()=>go("contact")} style={{color:C.gold,fontSize:"11px",cursor:"pointer",textDecoration:"underline"}}>Contact</span>
          <span onClick={()=>go("delete_account")} style={{color:"rgba(255,100,100,0.7)",fontSize:"11px",cursor:"pointer",textDecoration:"underline"}}>Delete Account</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"6px"}}>
          <div style={{color:"rgba(255,255,255,0.28)",fontSize:"11px"}}>© 2025 Afrigatemarket · World Marketplace · All Rights Reserved</div>
          <div style={{display:"flex",gap:"12px",alignItems:"center"}}>
            <div style={{color:"rgba(255,255,255,0.28)",fontSize:"11px"}}>{t.confidential}</div>
            <span onClick={()=>go("admin")} 
              style={{color:"rgba(255,255,255,0.6)",fontSize:"11px",cursor:"pointer",userSelect:"none",padding:"4px 10px",borderRadius:"6px",border:"1px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.05)",fontWeight:"600",letterSpacing:"1px"}}
              title="Owner Admin Access">
              🔐 Admin
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}


// ─── Privacy Policy Page ──────────────────────────────────────────
function PrivacyPage({go,lang}){
  const isFr=lang==="fr";
  return(
    <div style={{maxWidth:"700px",margin:"0 auto",padding:"32px 20px 60px"}}>
      <button onClick={()=>go("home")} style={{background:"none",border:"none",color:C.intBlue,cursor:"pointer",marginBottom:"20px",fontSize:"13px",fontFamily:"inherit",fontWeight:"600"}}>← {isFr?"Retour":"Back"}</button>
      <h1 style={{fontFamily:"'Georgia',serif",color:C.text,fontSize:"26px",marginBottom:"6px"}}>{isFr?"Politique de Confidentialité":"Privacy Policy"}</h1>
      <p style={{color:C.textSub,fontSize:"12px",marginBottom:"24px"}}>{isFr?"Dernière mise à jour: Mai 2025":"Last updated: May 2025"}</p>
      {[
        {t:isFr?"1. Données Collectées":"1. Data We Collect",
         b:isFr?"Nous collectons: nom, email, numéro de téléphone, pays, annonces publiées, historique de connexion. Nous ne collectons pas de données de paiement directement.":"We collect: name, email, phone number, country, posted listings, login history. We do not collect payment data directly."},
        {t:isFr?"2. Utilisation des Données":"2. How We Use Your Data",
         b:isFr?"Vos données sont utilisées pour: créer votre compte, afficher vos annonces, envoyer des emails de bienvenue et de notification, améliorer nos services.":"Your data is used to: create your account, display your listings, send welcome and notification emails, and improve our services."},
        {t:isFr?"3. Partage des Données":"3. Data Sharing",
         b:isFr?"Nous ne vendons jamais vos données. Nous utilisons Supabase (stockage sécurisé) et EmailJS (emails transactionnels uniquement).":"We never sell your data. We use Supabase (secure storage) and EmailJS (transactional emails only)."},
        {t:isFr?"4. Sécurité":"4. Security",
         b:isFr?"Toutes les données sont chiffrées et stockées de façon sécurisée via Supabase. Accès protégé par authentification.":"All data is encrypted and securely stored via Supabase. Access is protected by authentication."},
        {t:isFr?"5. Vos Droits":"5. Your Rights",
         b:isFr?"Vous pouvez: accéder à vos données, les modifier, ou supprimer votre compte à tout moment depuis votre Tableau de Bord. Email: afrigatemarket@gmail.com":"You can: access your data, edit it, or delete your account at any time from your Dashboard. Email: afrigatemarket@gmail.com"},
        {t:isFr?"6. Cookies":"6. Cookies",
         b:isFr?"Nous utilisons uniquement des cookies essentiels pour maintenir votre session de connexion. Aucun cookie publicitaire.":"We use only essential cookies to maintain your login session. No advertising cookies."},
        {t:isFr?"7. Contact":"7. Contact",
         b:isFr?"Pour toute question: afrigatemarket@gmail.com | WhatsApp: +237671282427 | Douala, Cameroun":"For any questions: afrigatemarket@gmail.com | WhatsApp: +237671282427 | Douala, Cameroon"},
      ].map((s,i)=>(
        <div key={i} style={{marginBottom:"22px",background:C.bgCard,borderRadius:"14px",padding:"18px 20px",border:`1px solid ${C.border}`}}>
          <div style={{fontWeight:"800",color:C.text,fontSize:"14px",marginBottom:"8px"}}>{s.t}</div>
          <div style={{color:C.textSub,fontSize:"13px",lineHeight:1.8}}>{s.b}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Terms of Service Page ────────────────────────────────────────
function TermsPage({go,lang}){
  const isFr=lang==="fr";
  return(
    <div style={{maxWidth:"700px",margin:"0 auto",padding:"32px 20px 60px"}}>
      <button onClick={()=>go("home")} style={{background:"none",border:"none",color:C.intBlue,cursor:"pointer",marginBottom:"20px",fontSize:"13px",fontFamily:"inherit",fontWeight:"600"}}>← {isFr?"Retour":"Back"}</button>
      <h1 style={{fontFamily:"'Georgia',serif",color:C.text,fontSize:"26px",marginBottom:"6px"}}>{isFr?"Conditions d'Utilisation":"Terms of Service"}</h1>
      <p style={{color:C.textSub,fontSize:"12px",marginBottom:"24px"}}>{isFr?"Dernière mise à jour: Mai 2025":"Last updated: May 2025"}</p>
      {[
        {t:isFr?"1. Acceptation":"1. Acceptance",
         b:isFr?"En utilisant AfriGate Market, vous acceptez ces conditions. Si vous n'êtes pas d'accord, veuillez ne pas utiliser notre service.":"By using AfriGate Market, you agree to these terms. If you disagree, please do not use our service."},
        {t:isFr?"2. Utilisation du Service":"2. Use of Service",
         b:isFr?"AfriGate Market est une plateforme de commerce pour l'Afrique et le monde. Vous devez avoir 18 ans ou plus pour vous inscrire. Les annonces doivent être légales et authentiques.":"AfriGate Market is a commerce platform for Africa and the world. You must be 18+ to register. All listings must be legal and authentic."},
        {t:isFr?"3. Contenu Interdit":"3. Prohibited Content",
         b:isFr?"Sont interdits: produits illégaux, contrefaçons, contenu frauduleux, armes non autorisées, substances contrôlées. Tout contenu violant ces règles sera supprimé immédiatement.":"Prohibited: illegal products, counterfeits, fraudulent content, unauthorized weapons, controlled substances. Any content violating these rules will be removed immediately."},
        {t:isFr?"4. Responsabilité":"4. Liability",
         b:isFr?"AfriGate Market est une plateforme de mise en relation. Nous ne sommes pas responsables des transactions entre acheteurs et vendeurs. Vérifiez toujours l'identité des vendeurs.":"AfriGate Market is a marketplace platform. We are not responsible for transactions between buyers and sellers. Always verify seller identity."},
        {t:isFr?"5. Propriété Intellectuelle":"5. Intellectual Property",
         b:isFr?"Le logo, le nom AfriGate Market, et tout le contenu de la plateforme sont protégés. Toute reproduction sans autorisation est interdite.":"The logo, name AfriGate Market, and all platform content are protected. Reproduction without permission is prohibited."},
        {t:isFr?"6. Résiliation":"6. Termination",
         b:isFr?"Nous nous réservons le droit de suspendre ou supprimer tout compte qui viole ces conditions, sans préavis.":"We reserve the right to suspend or delete any account that violates these terms, without notice."},
        {t:isFr?"7. Loi Applicable":"7. Governing Law",
         b:isFr?"Ces conditions sont régies par les lois du Cameroun et des juridictions internationales applicables.":"These terms are governed by the laws of Cameroon and applicable international jurisdictions."},
        {t:isFr?"8. Contact":"8. Contact",
         b:isFr?"afrigatemarket@gmail.com | WhatsApp: +237671282427 | Douala, Cameroun":"afrigatemarket@gmail.com | WhatsApp: +237671282427 | Douala, Cameroon"},
      ].map((s,i)=>(
        <div key={i} style={{marginBottom:"22px",background:C.bgCard,borderRadius:"14px",padding:"18px 20px",border:`1px solid ${C.border}`}}>
          <div style={{fontWeight:"800",color:C.text,fontSize:"14px",marginBottom:"8px"}}>{s.t}</div>
          <div style={{color:C.textSub,fontSize:"13px",lineHeight:1.8}}>{s.b}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Reviews / Testimonials Page ──────────────────────────────────
function ReviewsPage({go,lang,user}){
  const isFr=lang==="fr";
  const [reviews,setReviews]=useState([
    {name:"Kamdem J.",cc:"🇨🇲",stars:5,text:"AfriGate Market m'a permis de vendre mes produits jusqu'en France! Incroyable plateforme.",text_en:"AfriGate Market helped me sell my products all the way to France! Incredible platform."},
    {name:"Amara D.",cc:"🇸🇳",stars:5,text:"Meilleure marketplace africaine. Simple, rapide et efficace. Je recommande à 100%.",text_en:"Best African marketplace. Simple, fast and efficient. I recommend 100%."},
    {name:"Chidi O.",cc:"🇳🇬",stars:4,text:"Very good platform for African business. Easy to post listings. Great customer support.",text_en:"Very good platform for African business. Easy to post listings. Great customer support."},
    {name:"Fatou B.",cc:"🇬🇭",stars:5,text:"J'ai trouvé des acheteurs en Belgique grâce à AfriGate. Merci pour cette opportunité!",text_en:"I found buyers in Belgium thanks to AfriGate. Thank you for this opportunity!"},
    {name:"Jean-Pierre M.",cc:"🇨🇮",stars:4,text:"Très bonne plateforme. Les annonces sont bien organisées par catégorie.",text_en:"Very good platform. Listings are well organized by category."},
  ]);
  const [form,setForm]=useState({name:"",stars:5,text:""});
  const [done,setDone]=useState(false);

  function submit(){
    if(!form.name||!form.text){alert(isFr?"Veuillez remplir tous les champs":"Please fill all fields");return;}
    setReviews([{name:form.name,cc:"🌍",stars:form.stars,text:form.text,text_en:form.text},...reviews]);
    setForm({name:"",stars:5,text:""});
    setDone(true);
    setTimeout(()=>setDone(false),3000);
  }

  return(
    <div style={{maxWidth:"700px",margin:"0 auto",padding:"32px 20px 60px"}}>
      <button onClick={()=>go("home")} style={{background:"none",border:"none",color:C.intBlue,cursor:"pointer",marginBottom:"20px",fontSize:"13px",fontFamily:"inherit",fontWeight:"600"}}>← {isFr?"Retour":"Back"}</button>
      <h1 style={{fontFamily:"'Georgia',serif",color:C.text,fontSize:"24px",marginBottom:"4px"}}>{isFr?"Avis Utilisateurs":"User Reviews"}</h1>
      <p style={{color:C.textSub,fontSize:"13px",marginBottom:"24px"}}>{isFr?"Ce que nos utilisateurs disent d'AfriGate Market":"What our users say about AfriGate Market"}</p>

      {/* Average rating */}
      <div style={{background:`linear-gradient(135deg,${C.kente},${C.gold})`,borderRadius:"16px",padding:"20px",textAlign:"center",marginBottom:"24px",color:"#fff"}}>
        <div style={{fontSize:"40px",fontWeight:"900"}}>4.8 ⭐</div>
        <div style={{fontSize:"13px",opacity:.85,marginTop:"4px"}}>{isFr?"Basé sur les avis utilisateurs":"Based on user reviews"}</div>
      </div>

      {/* Write a review */}
      <div style={{background:C.bgCard,borderRadius:"16px",border:`1px solid ${C.border}`,padding:"20px",marginBottom:"24px"}}>
        <div style={{fontWeight:"800",color:C.text,fontSize:"14px",marginBottom:"14px"}}>✍️ {isFr?"Laisser un Avis":"Leave a Review"}</div>
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
          placeholder={isFr?"Votre nom":"Your name"}
          style={{width:"100%",padding:"10px 13px",borderRadius:"10px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text,marginBottom:"10px"}}/>
        <div style={{marginBottom:"10px"}}>
          <div style={{fontSize:"12px",color:C.textSub,marginBottom:"6px",fontWeight:"700"}}>{isFr?"Note:":"Rating:"}</div>
          <div style={{display:"flex",gap:"6px"}}>
            {[1,2,3,4,5].map(s=>(
              <span key={s} onClick={()=>setForm({...form,stars:s})}
                style={{fontSize:"24px",cursor:"pointer",opacity:s<=form.stars?1:0.3}}>⭐</span>
            ))}
          </div>
        </div>
        <textarea value={form.text} onChange={e=>setForm({...form,text:e.target.value})}
          placeholder={isFr?"Partagez votre expérience avec AfriGate Market...":"Share your experience with AfriGate Market..."}
          rows={3}
          style={{width:"100%",padding:"10px 13px",borderRadius:"10px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text,resize:"none",marginBottom:"12px"}}/>
        {done&&<div style={{color:C.forest,fontWeight:"700",fontSize:"13px",marginBottom:"8px"}}>✅ {isFr?"Merci pour votre avis!":"Thank you for your review!"}</div>}
        <Btn onClick={submit}>{isFr?"Publier mon Avis":"Submit Review"}</Btn>
      </div>

      {/* Reviews list */}
      {reviews.map((r,i)=>(
        <div key={i} style={{background:C.bgCard,borderRadius:"14px",border:`1px solid ${C.border}`,padding:"16px 18px",marginBottom:"12px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
            <div style={{fontWeight:"800",color:C.text,fontSize:"14px"}}>{r.cc} {r.name}</div>
            <div style={{fontSize:"14px"}}>{"⭐".repeat(r.stars)}</div>
          </div>
          <div style={{color:C.textSub,fontSize:"13px",lineHeight:1.7}}>{isFr?r.text:r.text_en}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Delete Account Page ──────────────────────────────────────────
function DeleteAccountPage({go,lang,user,onLogout}){
  const isFr=lang==="fr";
  const [confirm,setConfirm]=useState("");
  const [done,setDone]=useState(false);
  const [loading,setLoading]=useState(false);

  async function deleteAccount(){
    if(confirm!=="DELETE"&&confirm!=="SUPPRIMER"){
      alert(isFr?"Tapez SUPPRIMER pour confirmer":"Type DELETE to confirm");return;
    }
    setLoading(true);
    try{
      if(user?.id){
        await sb.from("profiles").delete().eq("id",user.id);
        await sb.from("listings").delete().eq("seller_id",user.id);
        await sb.auth.signOut();
      }
    }catch(e){console.error(e);}
    setLoading(false);
    setDone(true);
    setTimeout(()=>{onLogout&&onLogout();go("home");},3000);
  }

  if(done) return(
    <div style={{maxWidth:"500px",margin:"80px auto",textAlign:"center",padding:"0 20px"}}>
      <div style={{fontSize:"60px",marginBottom:"12px"}}>✅</div>
      <h2 style={{color:C.text,fontFamily:"'Georgia',serif"}}>{isFr?"Compte supprimé":"Account deleted"}</h2>
      <p style={{color:C.textSub}}>{isFr?"Toutes vos données ont été supprimées.":"All your data has been deleted."}</p>
    </div>
  );

  return(
    <div style={{maxWidth:"500px",margin:"0 auto",padding:"32px 20px 60px"}}>
      <button onClick={()=>go("dashboard")} style={{background:"none",border:"none",color:C.intBlue,cursor:"pointer",marginBottom:"20px",fontSize:"13px",fontFamily:"inherit",fontWeight:"600"}}>← {isFr?"Retour":"Back"}</button>
      <div style={{background:"#DC262608",border:"2px solid #DC262640",borderRadius:"16px",padding:"24px"}}>
        <div style={{fontSize:"40px",textAlign:"center",marginBottom:"12px"}}>⚠️</div>
        <h2 style={{fontFamily:"'Georgia',serif",color:C.danger,textAlign:"center",fontSize:"20px",marginBottom:"8px"}}>{isFr?"Supprimer mon Compte":"Delete My Account"}</h2>
        <p style={{color:C.textSub,fontSize:"13px",lineHeight:1.7,marginBottom:"16px",textAlign:"center"}}>
          {isFr?"Cette action est irréversible. Toutes vos annonces, données et informations seront définitivement supprimées.":"This action is irreversible. All your listings, data and information will be permanently deleted."}
        </p>
        <div style={{background:C.bgCard,borderRadius:"10px",padding:"14px",marginBottom:"16px",fontSize:"12px",color:C.textSub,lineHeight:1.8}}>
          {isFr?"Sera supprimé:":"Will be deleted:"}<br/>
          ✗ {isFr?"Votre profil et informations":"Your profile and information"}<br/>
          ✗ {isFr?"Toutes vos annonces":"All your listings"}<br/>
          ✗ {isFr?"Votre historique":"Your history"}
        </div>
        <div style={{marginBottom:"14px"}}>
          <label style={{fontSize:"12px",color:C.textSub,fontWeight:"700",display:"block",marginBottom:"6px"}}>
            {isFr?`Tapez "SUPPRIMER" pour confirmer:`:`Type "DELETE" to confirm:`}
          </label>
          <input value={confirm} onChange={e=>setConfirm(e.target.value)}
            placeholder={isFr?"SUPPRIMER":"DELETE"}
            style={{width:"100%",padding:"10px 13px",borderRadius:"10px",border:`2px solid ${C.danger}60`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text}}/>
        </div>
        <Btn onClick={deleteAccount} disabled={loading} style={{background:C.danger,width:"100%",justifyContent:"center"}}>
          {loading?(isFr?"Suppression...":"Deleting..."):(isFr?"Supprimer Définitivement":"Permanently Delete")}
        </Btn>
      </div>
    </div>
  );
}


// ─── FAQ Page ─────────────────────────────────────────────────────
function FAQPage({go,lang}){
  const isFr=lang==="fr";
  const [open,setOpen]=useState(null);
  const faqs=[
    {q:isFr?"Comment créer un compte?":"How do I create an account?",
     a:isFr?"Cliquez sur 'Vendre' ou 'S'inscrire', remplissez vos informations et activez votre compte gratuitement en 60 secondes.":"Click 'Sell' or 'Register', fill in your information and activate your account for free in 60 seconds."},
    {q:isFr?"Combien coûte la publication d'une annonce?":"How much does it cost to post a listing?",
     a:isFr?"La publication est 100% GRATUITE pendant 60 jours. Après l'essai, un abonnement mensuel est disponible.":"Posting is 100% FREE for 60 days. After the trial, a monthly subscription is available."},
    {q:isFr?"Comment les acheteurs me contactent-ils?":"How do buyers contact me?",
     a:isFr?"Directement via WhatsApp. Votre numéro apparaît sur chaque annonce pour un contact instantané.":"Directly via WhatsApp. Your number appears on each listing for instant contact."},
    {q:isFr?"Mes données sont-elles sécurisées?":"Is my data secure?",
     a:isFr?"Oui. Toutes les données sont chiffrées et stockées via Supabase, une infrastructure sécurisée de niveau entreprise.":"Yes. All data is encrypted and stored via Supabase, an enterprise-grade secure infrastructure."},
    {q:isFr?"Puis-je vendre dans plusieurs pays?":"Can I sell in multiple countries?",
     a:isFr?"Oui! AfriGate Market couvre 54 nations africaines plus France, Belgique, Allemagne, Royaume-Uni et États-Unis.":"Yes! AfriGate Market covers 54 African nations plus France, Belgium, Germany, UK and USA."},
    {q:isFr?"Comment signaler une annonce frauduleuse?":"How do I report a fraudulent listing?",
     a:isFr?"Cliquez sur 'Signaler' sur n'importe quelle annonce ou contactez-nous via WhatsApp: +237671282427.":"Click 'Report' on any listing or contact us via WhatsApp: +237671282427."},
    {q:isFr?"Combien de photos puis-je ajouter?":"How many photos can I add?",
     a:isFr?"Jusqu'à 10 photos par annonce pour montrer votre produit sous tous les angles.":"Up to 10 photos per listing to showcase your product from all angles."},
    {q:isFr?"Comment supprimer mon compte?":"How do I delete my account?",
     a:isFr?"Allez dans Tableau de Bord → Paramètres → Supprimer mon Compte. Toutes vos données seront effacées.":"Go to Dashboard → Settings → Delete Account. All your data will be erased."},
    {q:isFr?"L'application est-elle disponible sur mobile?":"Is the app available on mobile?",
     a:isFr?"Oui! AfriGate Market fonctionne parfaitement sur Android et iOS. Bientôt sur Google Play Store.":"Yes! AfriGate Market works perfectly on Android and iOS. Coming soon to Google Play Store."},
    {q:isFr?"Comment contacter le support?":"How do I contact support?",
     a:isFr?"WhatsApp: +237671282427 | Email: afrigatemarket@gmail.com | Support 24h/24, 7j/7.":"WhatsApp: +237671282427 | Email: afrigatemarket@gmail.com | Support 24/7."},
  ];
  return(
    <div style={{maxWidth:"700px",margin:"0 auto",padding:"32px 20px 60px"}}>
      <button onClick={()=>go("home")} style={{background:"none",border:"none",color:C.intBlue,cursor:"pointer",marginBottom:"20px",fontSize:"13px",fontFamily:"inherit",fontWeight:"600"}}>← {isFr?"Retour":"Back"}</button>
      <h1 style={{fontFamily:"'Georgia',serif",color:C.text,fontSize:"26px",marginBottom:"4px"}}>{isFr?"Questions Fréquentes":"Frequently Asked Questions"}</h1>
      <p style={{color:C.textSub,fontSize:"13px",marginBottom:"24px"}}>{isFr?"Trouvez rapidement les réponses à vos questions":"Find answers to your questions quickly"}</p>
      {faqs.map((f,i)=>(
        <div key={i} style={{background:C.bgCard,borderRadius:"14px",border:`1px solid ${open===i?C.kente:C.border}`,marginBottom:"10px",overflow:"hidden",transition:"all 0.2s"}}>
          <div onClick={()=>setOpen(open===i?null:i)}
            style={{padding:"16px 18px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px"}}>
            <div style={{fontWeight:"700",color:C.text,fontSize:"13px"}}>❓ {f.q}</div>
            <span style={{color:C.kente,fontSize:"18px",flexShrink:0}}>{open===i?"▲":"▼"}</span>
          </div>
          {open===i&&(
            <div style={{padding:"0 18px 16px",color:C.textSub,fontSize:"13px",lineHeight:1.8,borderTop:`1px solid ${C.border}`}}>
              💡 {f.a}
            </div>
          )}
        </div>
      ))}
      <div style={{background:`${C.kente}12`,border:`1px solid ${C.kente}30`,borderRadius:"14px",padding:"18px",marginTop:"20px",textAlign:"center"}}>
        <div style={{fontWeight:"800",color:C.text,marginBottom:"8px"}}>{isFr?"Vous n'avez pas trouvé votre réponse?":"Didn't find your answer?"}</div>
        <div style={{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"}}>
          <Btn size="sm" onClick={()=>go("contact")}>{isFr?"Nous Contacter":"Contact Us"}</Btn>
          <a href="https://wa.me/237671282427" target="_blank" rel="noreferrer"
            style={{padding:"6px 14px",borderRadius:"20px",background:"#25D36620",border:"1.5px solid #25D36650",color:C.success,textDecoration:"none",fontSize:"11px",fontWeight:"700"}}>
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── How It Works Page ────────────────────────────────────────────
function HowItWorksPage({go,lang}){
  const isFr=lang==="fr";
  const steps=[
    {n:"01",icon:"👤",t:isFr?"Créez votre Compte":"Create your Account",d:isFr?"Inscrivez-vous gratuitement en 60 secondes. Pas de carte bancaire requise. 60 jours d'essai gratuit.":"Sign up for free in 60 seconds. No credit card required. 60-day free trial."},
    {n:"02",icon:"📸",t:isFr?"Publiez votre Annonce":"Post your Listing",d:isFr?"Ajoutez jusqu'à 10 photos, décrivez votre produit, fixez votre prix. Votre annonce est visible instantanément.":"Add up to 10 photos, describe your product, set your price. Your listing is visible instantly."},
    {n:"03",icon:"🌍",t:isFr?"Atteignez le Monde":"Reach the World",d:isFr?"Votre annonce est visible dans 54 pays africains, en France, Belgique, Allemagne, Royaume-Uni et aux États-Unis.":"Your listing is visible in 54 African countries, France, Belgium, Germany, UK and USA."},
    {n:"04",icon:"💬",t:isFr?"Recevez des Contacts":"Receive Contacts",d:isFr?"Les acheteurs vous contactent directement via WhatsApp. Pas d'intermédiaire. Négociation directe.":"Buyers contact you directly via WhatsApp. No middleman. Direct negotiation."},
    {n:"05",icon:"💰",t:isFr?"Vendez et Grandissez":"Sell and Grow",d:isFr?"Suivez vos performances dans votre Tableau de Bord. Gérez vos annonces. Développez votre business africain.":"Track your performance in your Dashboard. Manage your listings. Grow your African business."},
  ];
  return(
    <div style={{maxWidth:"700px",margin:"0 auto",padding:"32px 20px 60px"}}>
      <button onClick={()=>go("home")} style={{background:"none",border:"none",color:C.intBlue,cursor:"pointer",marginBottom:"20px",fontSize:"13px",fontFamily:"inherit",fontWeight:"600"}}>← {isFr?"Retour":"Back"}</button>
      <h1 style={{fontFamily:"'Georgia',serif",color:C.text,fontSize:"26px",marginBottom:"4px"}}>{isFr?"Comment ça Marche":"How It Works"}</h1>
      <p style={{color:C.textSub,fontSize:"13px",marginBottom:"28px"}}>{isFr?"Commencez à vendre en 5 étapes simples":"Start selling in 5 simple steps"}</p>
      {steps.map((s,i)=>(
        <div key={i} style={{display:"flex",gap:"16px",marginBottom:"20px",alignItems:"flex-start"}}>
          <div style={{flexShrink:0,width:"48px",height:"48px",borderRadius:"50%",background:`linear-gradient(135deg,${C.kente},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:"900",fontSize:"13px"}}>
            {s.n}
          </div>
          <div style={{background:C.bgCard,borderRadius:"14px",border:`1px solid ${C.border}`,padding:"16px 18px",flex:1}}>
            <div style={{fontSize:"24px",marginBottom:"6px"}}>{s.icon}</div>
            <div style={{fontWeight:"800",color:C.text,fontSize:"14px",marginBottom:"6px"}}>{s.t}</div>
            <div style={{color:C.textSub,fontSize:"13px",lineHeight:1.7}}>{s.d}</div>
          </div>
        </div>
      ))}
      <div style={{textAlign:"center",marginTop:"24px"}}>
        <Btn size="lg" onClick={()=>go("register")}>{isFr?"Commencer Gratuitement":"Start for Free"} 🚀</Btn>
      </div>
    </div>
  );
}

// ─── Report Listing Page (Google Play Required) ───────────────────
function ReportPage({go,lang,listingId}){
  const isFr=lang==="fr";
  const [form,setForm]=useState({reason:"",details:"",email:""});
  const [done,setDone]=useState(false);
  const [loading,setLoading]=useState(false);
  const reasons=isFr?[
    "Produit contrefait ou faux","Annonce frauduleuse / arnaque",
    "Contenu illégal","Spam ou annonce dupliquée",
    "Prix trompeur","Contenu inapproprié","Autre"
  ]:[
    "Counterfeit or fake product","Fraudulent listing / scam",
    "Illegal content","Spam or duplicate listing",
    "Misleading price","Inappropriate content","Other"
  ];

  async function submit(){
    if(!form.reason||!form.details){alert(isFr?"Veuillez remplir tous les champs":"Please fill all fields");return;}
    setLoading(true);
    await sendEmailJS(EMAILJS_T_WELCOME,{
      to_email:"afrigatemarket@gmail.com",
      to_name:"AfriGate Team",
      subject:`🚨 Report: ${form.reason}`,
      message:`Listing ID: ${listingId||"N/A"}
Reason: ${form.reason}
Details: ${form.details}
Reporter email: ${form.email||"Anonymous"}`,
      from_name:"AfriGate Report System",
      reply_to:"afrigatemarket@gmail.com",
    });
    setLoading(false);setDone(true);
  }

  if(done) return(
    <div style={{maxWidth:"500px",margin:"80px auto",textAlign:"center",padding:"0 20px"}}>
      <div style={{fontSize:"60px",marginBottom:"12px"}}>✅</div>
      <h2 style={{color:C.text,fontFamily:"'Georgia',serif"}}>{isFr?"Signalement envoyé":"Report submitted"}</h2>
      <p style={{color:C.textSub,marginBottom:"20px"}}>{isFr?"Nous examinerons ce contenu dans les 24 heures.":"We will review this content within 24 hours."}</p>
      <Btn onClick={()=>go("home")}>{isFr?"Retour à l'accueil":"Back to Home"}</Btn>
    </div>
  );

  return(
    <div style={{maxWidth:"500px",margin:"0 auto",padding:"32px 20px 60px"}}>
      <button onClick={()=>go("home")} style={{background:"none",border:"none",color:C.intBlue,cursor:"pointer",marginBottom:"20px",fontSize:"13px",fontFamily:"inherit",fontWeight:"600"}}>← {isFr?"Retour":"Back"}</button>
      <h1 style={{fontFamily:"'Georgia',serif",color:C.text,fontSize:"22px",marginBottom:"4px"}}>🚨 {isFr?"Signaler un Contenu":"Report Content"}</h1>
      <p style={{color:C.textSub,fontSize:"13px",marginBottom:"24px"}}>{isFr?"Aidez-nous à maintenir AfriGate Market sûr et fiable":"Help us keep AfriGate Market safe and trustworthy"}</p>
      <div style={{background:C.bgCard,borderRadius:"16px",border:`1px solid ${C.border}`,padding:"20px"}}>
        <div style={{marginBottom:"14px"}}>
          <label style={{fontSize:"12px",color:C.textSub,fontWeight:"700",display:"block",marginBottom:"8px"}}>{isFr?"Raison du signalement:":"Reason for report:"}</label>
          {reasons.map((r,i)=>(
            <div key={i} onClick={()=>setForm({...form,reason:r})}
              style={{padding:"10px 14px",borderRadius:"10px",border:`1.5px solid ${form.reason===r?C.kente:C.border}`,background:form.reason===r?`${C.kente}10`:C.bg,cursor:"pointer",marginBottom:"6px",fontSize:"13px",color:form.reason===r?C.kente:C.text,fontWeight:form.reason===r?"700":"400"}}>
              {form.reason===r?"✅ ":""}{r}
            </div>
          ))}
        </div>
        <textarea value={form.details} onChange={e=>setForm({...form,details:e.target.value})}
          placeholder={isFr?"Décrivez le problème en détail...":"Describe the problem in detail..."}
          rows={4}
          style={{width:"100%",padding:"10px 13px",borderRadius:"10px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text,resize:"none",marginBottom:"10px"}}/>
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
          placeholder={isFr?"Votre email (optionnel)":"Your email (optional)"}
          style={{width:"100%",padding:"10px 13px",borderRadius:"10px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text,marginBottom:"14px"}}/>
        <Btn onClick={submit} disabled={loading} style={{width:"100%",justifyContent:"center"}}>
          {loading?(isFr?"Envoi...":"Sending..."):(isFr?"Envoyer le Signalement":"Submit Report")} 🚨
        </Btn>
      </div>
    </div>
  );
}

// ─── Search Filters Component ─────────────────────────────────────
function SearchFilters({onFilter,lang,cc}){
  const isFr=lang==="fr";
  const cur=CURRENCIES[cc]||CURRENCIES.CM;
  const [minP,setMinP]=useState("");
  const [maxP,setMaxP]=useState("");
  const [selCat,setSelCat]=useState("");
  const [selCC,setSelCC]=useState("");
  function apply(){onFilter({minP:minP?parseFloat(minP):null,maxP:maxP?parseFloat(maxP):null,cat:selCat,cc:selCC});}
  function reset(){setMinP("");setMaxP("");setSelCat("");setSelCC("");onFilter({});}
  return(
    <div style={{background:C.bgCard,borderRadius:"14px",border:`1px solid ${C.border}`,padding:"16px",marginBottom:"16px"}}>
      <div style={{fontWeight:"800",color:C.text,fontSize:"13px",marginBottom:"12px"}}>🔍 {isFr?"Filtrer les annonces":"Filter listings"}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"10px"}}>
        <input value={minP} onChange={e=>setMinP(e.target.value)} type="number"
          placeholder={isFr?`Prix min (${cur.symbol})`:`Min price (${cur.symbol})`}
          style={{padding:"8px 10px",borderRadius:"8px",border:`1px solid ${C.border}`,background:C.bg,fontSize:"12px",fontFamily:"inherit",outline:"none",color:C.text}}/>
        <input value={maxP} onChange={e=>setMaxP(e.target.value)} type="number"
          placeholder={isFr?`Prix max (${cur.symbol})`:`Max price (${cur.symbol})`}
          style={{padding:"8px 10px",borderRadius:"8px",border:`1px solid ${C.border}`,background:C.bg,fontSize:"12px",fontFamily:"inherit",outline:"none",color:C.text}}/>
      </div>
      <select value={selCat} onChange={e=>setSelCat(e.target.value)}
        style={{width:"100%",padding:"8px 10px",borderRadius:"8px",border:`1px solid ${C.border}`,background:C.bg,fontSize:"12px",fontFamily:"inherit",outline:"none",color:C.text,marginBottom:"8px"}}>
        <option value="">{isFr?"Toutes les catégories":"All categories"}</option>
        {CATS.map(c=><option key={c.id} value={c.id}>{c.icon} {c[lang].label}</option>)}
      </select>
      <select value={selCC} onChange={e=>setSelCC(e.target.value)}
        style={{width:"100%",padding:"8px 10px",borderRadius:"8px",border:`1px solid ${C.border}`,background:C.bg,fontSize:"12px",fontFamily:"inherit",outline:"none",color:C.text,marginBottom:"10px"}}>
        <option value="">{isFr?"Tous les pays":"All countries"}</option>
        {ALL_CC.map(c=><option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
      </select>
      <div style={{display:"flex",gap:"8px"}}>
        <Btn size="sm" onClick={apply} style={{flex:1,justifyContent:"center"}}>{isFr?"Appliquer":"Apply"}</Btn>
        <Btn size="sm" v="ghost" onClick={reset}>{isFr?"Réinitialiser":"Reset"}</Btn>
      </div>
    </div>
  );
}




// ─── Full Settings Component (like Facebook/Instagram) ────────────
function SettingsTab({go,lang,user,onLogout,profile,setProfile}){
  const isFr=lang==="fr";
  const [openSection,setOpenSection]=useState(null);
  const [notifEmail,setNotifEmail]=useState(()=>localStorage.getItem("agm_notif_email")!=="0");
  const [notifWa,setNotifWa]=useState(()=>localStorage.getItem("agm_notif_wa")!=="0");
  const [pwForm,setPwForm]=useState({current:"",newPw:"",confirm:""});
  const [pwMsg,setPwMsg]=useState("");
  const [pwLoading,setPwLoading]=useState(false);
  const inp={width:"100%",padding:"10px 12px",borderRadius:"9px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text};

  function toggle(section){setOpenSection(openSection===section?null:section);}

  function saveNotif(key,val){
    localStorage.setItem(key,val?"1":"0");
    if(key==="agm_notif_email") setNotifEmail(val);
    if(key==="agm_notif_wa") setNotifWa(val);
  }

  async function changePassword(){
    const pwd=pwForm.newPw;
    if(!pwForm.current){setPwMsg(isFr?"Entrez votre mot de passe actuel":"Enter your current password");return;}
    if(pwd.length<8){setPwMsg(isFr?"Min 8 caractères":"Min 8 characters");return;}
    if(!/[A-Z]/.test(pwd)){setPwMsg(isFr?"Besoin d'une majuscule":"Need 1 uppercase letter");return;}
    if(!/[0-9]/.test(pwd)){setPwMsg(isFr?"Besoin d'un chiffre":"Need 1 number");return;}
    if(pwd!==pwForm.confirm){setPwMsg(isFr?"Les mots de passe ne correspondent pas":"Passwords do not match");return;}
    setPwLoading(true);
    try{
      const {error}=await sb.auth.updateUser({password:pwd});
      if(error){setPwMsg(isFr?"Erreur: "+error.message:"Error: "+error.message);}
      else{setPwMsg(isFr?"✅ Mot de passe changé avec succès!":"✅ Password changed successfully!");setPwForm({current:"",newPw:"",confirm:""});}
    }catch(e){setPwMsg(isFr?"Erreur de connexion":"Connection error");}
    setPwLoading(false);
  }

  const sections=[
    {
      id:"account",ic:"👤",
      title:isFr?"Informations du Compte":"Account Information",
      sub:isFr?"Nom, email, téléphone":"Name, email, phone",
      content:(
        <div style={{display:"flex",flexDirection:"column",gap:"10px",padding:"14px 0 0"}}>
          <div style={{fontSize:"12px",color:C.textSub,lineHeight:1.7,background:`${C.intBlue}10`,borderRadius:"8px",padding:"10px"}}>
            📧 <strong>{user?.email}</strong><br/>
            👤 <strong>{profile?.name||isFr?"Non défini":"Not set"}</strong><br/>
            📱 <strong>{profile?.phone||isFr?"Non défini":"Not set"}</strong><br/>
            🌍 <strong>{ALL_CC.find(c=>c.code===profile?.country)?.name||profile?.country}</strong>
          </div>
          <Btn size="sm" onClick={()=>{setOpenSection(null);}} style={{alignSelf:"flex-start"}}>
            ✏️ {isFr?"Modifier dans Mon Profil":"Edit in My Profile"}
          </Btn>
        </div>
      )
    },
    {
      id:"password",ic:"🔒",
      title:isFr?"Sécurité & Mot de Passe":"Security & Password",
      sub:isFr?"Changer votre mot de passe":"Change your password",
      content:(
        <div style={{display:"flex",flexDirection:"column",gap:"10px",padding:"14px 0 0"}}>
          <div style={{fontSize:"11px",color:C.textSub,marginBottom:"4px",fontWeight:"700"}}>
            {isFr?"Règles: min 8 caractères, 1 majuscule, 1 chiffre":"Rules: min 8 chars, 1 uppercase, 1 number"}
          </div>
          <input type="password" value={pwForm.current} onChange={e=>setPwForm({...pwForm,current:e.target.value})}
            placeholder={isFr?"Mot de passe actuel":"Current password"} style={inp}/>
          <input type="password" value={pwForm.newPw} onChange={e=>setPwForm({...pwForm,newPw:e.target.value})}
            placeholder={isFr?"Nouveau mot de passe":"New password"} style={inp}/>
          <input type="password" value={pwForm.confirm} onChange={e=>setPwForm({...pwForm,confirm:e.target.value})}
            placeholder={isFr?"Confirmer le mot de passe":"Confirm password"} style={inp}/>
          {pwMsg&&<div style={{fontSize:"12px",color:pwMsg.includes("✅")?C.forest:"#DC2626",fontWeight:"700"}}>{pwMsg}</div>}
          <Btn size="sm" onClick={changePassword} disabled={pwLoading}>
            {pwLoading?(isFr?"Changement...":"Changing..."):"🔒 "+(isFr?"Changer le Mot de Passe":"Change Password")}
          </Btn>
        </div>
      )
    },
    {
      id:"notifications",ic:"🔔",
      title:isFr?"Notifications":"Notifications",
      sub:isFr?"Emails et alertes":"Emails and alerts",
      content:(
        <div style={{display:"flex",flexDirection:"column",gap:"12px",padding:"14px 0 0"}}>
          {[
            {key:"agm_notif_email",val:notifEmail,set:setNotifEmail,
             t:isFr?"Notifications par Email":"Email Notifications",
             d:isFr?"Recevoir un email quand quelqu'un vous contacte":"Receive email when someone contacts you"},
            {key:"agm_notif_wa",val:notifWa,set:setNotifWa,
             t:isFr?"Alertes WhatsApp":"WhatsApp Alerts",
             d:isFr?"Recevoir des alertes importantes sur WhatsApp":"Receive important alerts on WhatsApp"},
          ].map(n=>(
            <div key={n.key} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
              <div>
                <div style={{fontWeight:"700",color:C.text,fontSize:"13px"}}>{n.t}</div>
                <div style={{fontSize:"11px",color:C.textSub}}>{n.d}</div>
              </div>
              <div onClick={()=>saveNotif(n.key,!n.val)}
                style={{width:"44px",height:"24px",borderRadius:"12px",background:n.val?C.forest:"#ccc",cursor:"pointer",position:"relative",transition:"all 0.2s",flexShrink:0}}>
                <div style={{position:"absolute",top:"2px",left:n.val?"20px":"2px",width:"20px",height:"20px",borderRadius:"50%",background:"#fff",transition:"all 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/>
              </div>
            </div>
          ))}
          <div style={{fontSize:"11px",color:C.textSub,background:`${C.forest}10`,borderRadius:"8px",padding:"8px"}}>
            💡 {isFr?"Les paramètres sont sauvegardés automatiquement sur votre appareil.":"Settings are saved automatically on your device."}
          </div>
        </div>
      )
    },
    {
      id:"language",ic:"🌐",
      title:isFr?"Langue / Language":"Language / Langue",
      sub:isFr?"Français ou English":"French or English",
      content:(
        <div style={{display:"flex",flexDirection:"column",gap:"8px",padding:"14px 0 0"}}>
          {[
            {code:"fr",label:"🇫🇷 Français",sub:"Interface en français"},
            {code:"en",label:"🇬🇧 English",sub:"English interface"},
          ].map(l=>(
            <div key={l.code} onClick={()=>{localStorage.setItem("agm_lang",l.code);window.location.reload();}}
              style={{padding:"12px 14px",borderRadius:"10px",border:`2px solid ${lang===l.code?C.kente:C.border}`,background:lang===l.code?`${C.kente}10`:C.bg,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontWeight:"700",color:C.text,fontSize:"13px"}}>{l.label}</div>
                <div style={{fontSize:"11px",color:C.textSub}}>{l.sub}</div>
              </div>
              {lang===l.code&&<span style={{color:C.kente,fontSize:"18px"}}>✅</span>}
            </div>
          ))}
        </div>
      )
    },
    {
      id:"privacy",ic:"🛡️",
      title:isFr?"Confidentialité & Données":"Privacy & Data",
      sub:isFr?"Vos droits et données":"Your rights and data",
      content:(
        <div style={{display:"flex",flexDirection:"column",gap:"8px",padding:"14px 0 0"}}>
          {[
            {ic:"📋",t:isFr?"Politique de Confidentialité":"Privacy Policy",action:()=>go("privacy")},
            {ic:"📄",t:isFr?"Conditions d'Utilisation":"Terms of Service",action:()=>go("terms")},
            {ic:"🍪",t:isFr?"Gestion des Cookies":"Cookie Settings",action:()=>{localStorage.removeItem("agm_cookie_ok");window.location.reload();}},
            {ic:"📤",t:isFr?"Exporter mes données":"Export my data",action:()=>{
              const data=JSON.stringify({user,profile},null,2);
              const b=new Blob([data],{type:"application/json"});
              const u=URL.createObjectURL(b);
              const a=document.createElement("a");
              a.href=u;a.download="afrigate_my_data.json";a.click();
            }},
          ].map((item,i)=>(
            <div key={i} onClick={item.action}
              style={{padding:"11px 14px",borderRadius:"10px",border:`1px solid ${C.border}`,background:C.bg,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:"600",color:C.text,fontSize:"13px"}}>{item.ic} {item.t}</div>
              <span style={{color:C.textSub}}>›</span>
            </div>
          ))}
        </div>
      )
    },
    {
      id:"help",ic:"❓",
      title:isFr?"Aide & Support":"Help & Support",
      sub:isFr?"FAQ, contact, signalement":"FAQ, contact, report",
      content:(
        <div style={{display:"flex",flexDirection:"column",gap:"8px",padding:"14px 0 0"}}>
          {[
            {ic:"❓",t:"FAQ",action:()=>go("faq")},
            {ic:"🔧",t:isFr?"Comment ça marche":"How It Works",action:()=>go("how")},
            {ic:"💬",t:isFr?"Contacter le support":"Contact support",action:()=>go("contact")},
            {ic:"🚨",t:isFr?"Signaler un problème":"Report a problem",action:()=>go("report_general")},
            {ic:"⭐",t:isFr?"Donner un avis":"Leave a review",action:()=>go("reviews")},
          ].map((item,i)=>(
            <div key={i} onClick={item.action}
              style={{padding:"11px 14px",borderRadius:"10px",border:`1px solid ${C.border}`,background:C.bg,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:"600",color:C.text,fontSize:"13px"}}>{item.ic} {item.t}</div>
              <span style={{color:C.textSub}}>›</span>
            </div>
          ))}
        </div>
      )
    },
    {
      id:"about",ic:"ℹ️",
      title:isFr?"À propos d'AfriGate Market":"About AfriGate Market",
      sub:isFr?"Version, contact, réseaux":"Version, contact, social",
      content:(
        <div style={{padding:"14px 0 0",fontSize:"12px",color:C.textSub,lineHeight:2}}>
          <div style={{background:C.bgCard,borderRadius:"10px",padding:"12px",marginBottom:"10px"}}>
            <div>🏷️ Version: <strong style={{color:C.text}}>1.0.0</strong></div>
            <div>📧 <strong style={{color:C.text}}>afrigatemarket@gmail.com</strong></div>
            <div>💬 WhatsApp: <strong style={{color:C.text}}>+237671282427</strong></div>
            <div>📍 <strong style={{color:C.text}}>Douala, Cameroun 🇨🇲</strong></div>
            <div>🕐 Support <strong style={{color:C.text}}>24h/24, 7j/7</strong></div>
          </div>
          <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
            {[
              {ic:"📘",label:"Facebook",url:"https://www.facebook.com/share/1QtZF2vPCo/"},
              {ic:"📸",label:"Instagram",url:"https://www.instagram.com/afrigatemarket"},
              {ic:"🎵",label:"TikTok",url:"https://www.tiktok.com/@afrigatemarket"},
            ].map(s=>(
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                style={{padding:"6px 12px",borderRadius:"16px",background:`${C.kente}14`,border:`1px solid ${C.kente}30`,color:C.kente,textDecoration:"none",fontSize:"11px",fontWeight:"700"}}>
                {s.ic} {s.label}
              </a>
            ))}
          </div>
        </div>
      )
    },
  ];

  return(
    <div style={{padding:"0 16px",display:"flex",flexDirection:"column",gap:"8px"}}>
      {sections.map(s=>(
        <div key={s.id} style={{background:C.bgCard,borderRadius:"14px",border:`1px solid ${openSection===s.id?C.kente:C.border}`,overflow:"hidden",transition:"all 0.2s"}}>
          <div onClick={()=>toggle(s.id)}
            style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:"12px",cursor:"pointer"}}>
            <span style={{fontSize:"22px",flexShrink:0}}>{s.ic}</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:"700",color:C.text,fontSize:"13px"}}>{s.title}</div>
              <div style={{fontSize:"11px",color:C.textSub}}>{s.sub}</div>
            </div>
            <span style={{color:C.textSub,fontSize:"16px",transition:"transform 0.2s",transform:openSection===s.id?"rotate(90deg)":"none"}}>›</span>
          </div>
          {openSection===s.id&&(
            <div style={{padding:"0 16px 16px",borderTop:`1px solid ${C.border}`}}>
              {s.content}
            </div>
          )}
        </div>
      ))}

      {/* Logout & Delete — always visible at bottom */}
      <div style={{marginTop:"8px",display:"flex",flexDirection:"column",gap:"8px"}}>
        <div onClick={onLogout}
          style={{background:C.bgCard,borderRadius:"14px",border:`1px solid ${C.border}`,padding:"14px 16px",display:"flex",alignItems:"center",gap:"12px",cursor:"pointer"}}
          onMouseEnter={e=>e.currentTarget.style.background=`${C.kente}08`}
          onMouseLeave={e=>e.currentTarget.style.background=C.bgCard}>
          <span style={{fontSize:"22px"}}>🚪</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:"700",color:C.text,fontSize:"13px"}}>{isFr?"Se Déconnecter":"Log Out"}</div>
            <div style={{fontSize:"11px",color:C.textSub}}>{isFr?"Déconnexion sécurisée":"Secure sign out"}</div>
          </div>
          <span style={{color:C.textSub,fontSize:"16px"}}>›</span>
        </div>
        <div onClick={()=>go("delete_account")}
          style={{background:"#DC262608",borderRadius:"14px",border:"1px solid #DC262640",padding:"14px 16px",display:"flex",alignItems:"center",gap:"12px",cursor:"pointer"}}>
          <span style={{fontSize:"22px"}}>🗑️</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:"700",color:"#DC2626",fontSize:"13px"}}>{isFr?"Supprimer mon Compte":"Delete My Account"}</div>
            <div style={{fontSize:"11px",color:C.textSub}}>{isFr?"Suppression définitive":"Permanently delete all data"}</div>
          </div>
          <span style={{color:"#DC2626",fontSize:"16px"}}>›</span>
        </div>
      </div>
    </div>
  );
}

// ─── User Profile Page (like Facebook/Instagram/TikTok) ──────────
function ProfilePage({go,user,onLogin,lang,cc,onLogout}){
  const isFr = lang==="fr";
  const [tab,setTab] = useState("profile");
  const [myListings,setMyListings] = useState([]);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const [saved,setSaved] = useState(false);
  const [avatarUrl,setAvatarUrl] = useState(user?.avatar||"");
  const [profile,setProfile] = useState({
    name: user?.name||"",
    email: user?.email||"",
    phone: user?.phone||"",
    country: user?.country||"CM",
    bio: "",
    whatsapp: user?.phone||"",
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: "",
  });
  const inp={width:"100%",padding:"10px 13px",borderRadius:"10px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text};

  useEffect(()=>{
    if(!user?.id) return;
    async function load(){
      setLoading(true);
      try{
        const {data:prof}=await sb.from("profiles").select("*").eq("id",user.id).single();
        if(prof){
          setProfile(p=>({...p,...prof}));
          setAvatarUrl(prof.avatar_url||"");
        }
        const {data:lst}=await sb.from("listings").select("*").eq("seller_id",user.id).order("created_at",{ascending:false});
        setMyListings(lst||[]);
      }catch(e){console.error(e);}
      setLoading(false);
    }
    load();
  },[user?.id]);

  async function saveProfile(){
    if(!user?.id) return;
    setSaving(true);
    try{
      await sb.from("profiles").update({
        name:profile.name,
        phone:profile.phone,
        country:profile.country,
        bio:profile.bio,
        whatsapp:profile.whatsapp,
        avatar_url:avatarUrl,
      }).eq("id",user.id);
      onLogin&&onLogin({...user,name:profile.name,phone:profile.phone,country:profile.country,avatar:avatarUrl});
      setSaved(true);
      setTimeout(()=>setSaved(false),2500);
    }catch(e){alert(isFr?"Erreur de sauvegarde":"Save error");}
    setSaving(false);
  }

  function handleAvatarChange(e){
    const file=e.target.files[0];
    if(!file) return;
    const reader=new FileReader();
    reader.onload=ev=>setAvatarUrl(ev.target.result);
    reader.readAsDataURL(file);
  }

  if(!user) return(
    <div style={{maxWidth:"400px",margin:"80px auto",textAlign:"center",padding:"0 20px"}}>
      <div style={{fontSize:"60px",marginBottom:"12px"}}>👤</div>
      <h2 style={{color:C.text,fontFamily:"'Georgia',serif",marginBottom:"8px"}}>{isFr?"Connectez-vous":"Please log in"}</h2>
      <p style={{color:C.textSub,marginBottom:"20px"}}>{isFr?"Vous devez être connecté pour voir votre profil":"You need to be logged in to view your profile"}</p>
      <Btn onClick={()=>go("login")}>{isFr?"Se connecter":"Log In"}</Btn>
    </div>
  );

  const TABS=[
    {id:"profile",ic:"👤",l:isFr?"Mon Profil":"My Profile"},
    {id:"myshop",ic:"🏪",l:isFr?"Ma Boutique":"My Shop"},
    {id:"settings",ic:"⚙️",l:isFr?"Paramètres":"Settings"},
  ];

  return(
    <div style={{maxWidth:"700px",margin:"0 auto",padding:"0 0 80px"}}>

      {/* Cover + Avatar banner */}
      <div style={{position:"relative",height:"140px",background:`linear-gradient(135deg,${C.kente},${C.gold})`,borderRadius:"0 0 20px 20px",marginBottom:"60px"}}>
        <div style={{position:"absolute",bottom:"-48px",left:"20px",display:"flex",alignItems:"flex-end",gap:"14px"}}>
          {/* Avatar */}
          <div style={{position:"relative"}}>
            <div style={{width:"90px",height:"90px",borderRadius:"50%",border:`4px solid ${C.bg}`,background:C.bgCard,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"36px",boxShadow:"0 4px 16px rgba(0,0,0,0.2)"}}>
              {avatarUrl
                ? <img src={avatarUrl} alt="avatar" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                : <span>{(profile.name||"U")[0].toUpperCase()}</span>
              }
            </div>
            <label style={{position:"absolute",bottom:0,right:0,background:C.kente,borderRadius:"50%",width:"26px",height:"26px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 2px 6px rgba(0,0,0,0.3)"}}>
              <span style={{color:"#fff",fontSize:"13px"}}>📷</span>
              <input type="file" accept="image/*" onChange={handleAvatarChange} style={{display:"none"}}/>
            </label>
          </div>
          <div style={{paddingBottom:"8px"}}>
            <div style={{fontWeight:"900",color:C.text,fontSize:"16px"}}>{profile.name||user.email}</div>
            <div style={{color:C.textSub,fontSize:"12px"}}>{user.email}</div>
          </div>
        </div>
        {/* Edit avatar hint */}
        <div style={{position:"absolute",top:"10px",right:"12px",fontSize:"11px",color:"rgba(255,255,255,0.7)",fontWeight:"700"}}>
          {isFr?"Cliquez 📷 pour changer la photo":"Click 📷 to change photo"}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0",background:C.bgCard,borderRadius:"14px",border:`1px solid ${C.border}`,margin:"0 16px 16px",overflow:"hidden"}}>
        {[
          {v:myListings.length,l:isFr?"Annonces":"Listings"},
          {v:myListings.reduce((s,l)=>s+(l.views||0),0).toLocaleString(),l:isFr?"Vues":"Views"},
          {v:myListings.filter(l=>l.delivery_available).length,l:isFr?"Livraison":"Delivery"},
        ].map((s,i)=>(
          <div key={i} style={{textAlign:"center",padding:"14px 8px",borderRight:i<2?`1px solid ${C.border}`:"none"}}>
            <div style={{fontWeight:"900",fontSize:"20px",color:C.kente}}>{loading?"…":s.v}</div>
            <div style={{fontSize:"11px",color:C.textSub,marginTop:"2px"}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:"2px",margin:"0 16px 16px",background:C.bg,borderRadius:"12px",padding:"3px"}}>
        {TABS.map(tb=>(
          <button key={tb.id} onClick={()=>setTab(tb.id)}
            style={{flex:1,padding:"9px 4px",border:"none",borderRadius:"9px",background:tab===tb.id?`linear-gradient(135deg,${C.kente},${C.gold})`:"transparent",color:tab===tb.id?"#fff":C.textSub,cursor:"pointer",fontSize:"11px",fontWeight:"700",fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"}}>
            <span>{tb.ic}</span><span>{tb.l}</span>
          </button>
        ))}
      </div>

      {/* ── MY PROFILE TAB ── */}
      {tab==="profile"&&(
        <div style={{padding:"0 16px",display:"flex",flexDirection:"column",gap:"14px"}}>
          {saved&&<div style={{background:`${C.forest}20`,border:`1px solid ${C.forest}`,borderRadius:"10px",padding:"10px 14px",color:C.forest,fontWeight:"700",fontSize:"13px",textAlign:"center"}}>✅ {isFr?"Profil sauvegardé!":"Profile saved!"}</div>}

          {[
            {label:isFr?"Nom complet":"Full name",key:"name",icon:"👤",ph:isFr?"Votre nom":"Your name",type:"text"},
            {label:"Email",key:"email",icon:"📧",ph:"email@example.com",type:"email",disabled:true},
            {label:isFr?"Téléphone":"Phone",key:"phone",icon:"📱",ph:"+237 671 282 427",type:"tel"},
            {label:"WhatsApp",key:"whatsapp",icon:"💬",ph:"+237 671 282 427",type:"tel"},
          ].map(f=>(
            <div key={f.key} style={{background:C.bgCard,borderRadius:"12px",border:`1px solid ${C.border}`,padding:"14px"}}>
              <label style={{fontSize:"11px",color:C.textSub,fontWeight:"700",display:"block",marginBottom:"6px"}}>{f.icon} {f.label}</label>
              <input type={f.type} value={profile[f.key]||""} onChange={e=>!f.disabled&&setProfile({...profile,[f.key]:e.target.value})}
                placeholder={f.ph} disabled={f.disabled}
                style={{...inp,opacity:f.disabled?0.5:1,background:f.disabled?"#f5f5f5":C.bg}}/>
            </div>
          ))}

          <div style={{background:C.bgCard,borderRadius:"12px",border:`1px solid ${C.border}`,padding:"14px"}}>
            <label style={{fontSize:"11px",color:C.textSub,fontWeight:"700",display:"block",marginBottom:"6px"}}>✍️ {isFr?"Bio / Description":"Bio / Description"}</label>
            <textarea value={profile.bio||""} onChange={e=>setProfile({...profile,bio:e.target.value})}
              placeholder={isFr?"Décrivez votre activité, vos produits...":"Describe your business, your products..."}
              rows={3} style={{...inp,resize:"vertical"}}/>
          </div>

          <div style={{background:C.bgCard,borderRadius:"12px",border:`1px solid ${C.border}`,padding:"14px"}}>
            <label style={{fontSize:"11px",color:C.textSub,fontWeight:"700",display:"block",marginBottom:"10px"}}>🌍 {isFr?"Pays":"Country"}</label>
            <select value={profile.country} onChange={e=>setProfile({...profile,country:e.target.value})} style={inp}>
              <optgroup label="Africa">{ALL_CC.filter(c=>c.r==="africa").map(c=><option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}</optgroup>
              <optgroup label="International">{ALL_CC.filter(c=>c.r!=="africa").map(c=><option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}</optgroup>
            </select>
          </div>

          <Btn size="lg" onClick={saveProfile} disabled={saving} style={{width:"100%",justifyContent:"center"}}>
            {saving?(isFr?"Sauvegarde...":"Saving..."):"💾 "+(isFr?"Sauvegarder le Profil":"Save Profile")}
          </Btn>
        </div>
      )}

      {/* ── MY SHOP TAB ── */}
      {tab==="myshop"&&(
        <div style={{padding:"0 16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
            <div style={{fontWeight:"800",color:C.text,fontSize:"15px"}}>🏪 {isFr?"Toutes mes Annonces":"All My Listings"} ({myListings.length})</div>
            <Btn size="sm" onClick={()=>go("sell")}>➕ {isFr?"Ajouter":"Add"}</Btn>
          </div>
          {loading?(
            <div style={{textAlign:"center",padding:"40px",color:C.textSub}}>{isFr?"Chargement...":"Loading..."}</div>
          ):myListings.length===0?(
            <div style={{background:C.bgCard,borderRadius:"16px",border:`1px solid ${C.border}`,padding:"40px",textAlign:"center"}}>
              <div style={{fontSize:"48px",marginBottom:"10px"}}>🏪</div>
              <div style={{fontWeight:"800",color:C.text,marginBottom:"8px"}}>{isFr?"Votre boutique est vide":"Your shop is empty"}</div>
              <p style={{color:C.textSub,fontSize:"13px",marginBottom:"16px"}}>{isFr?"Publiez votre première annonce et commencez à vendre!":"Post your first listing and start selling!"}</p>
              <Btn onClick={()=>go("sell")}>{isFr?"Publier maintenant":"Post Now"} 🚀</Btn>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              {myListings.map((l,i)=>{
                const cat=CATS.find(c=>c.id===l.category);
                return(
                  <div key={l.id} style={{background:C.bgCard,borderRadius:"14px",border:`1px solid ${C.border}`,padding:"14px",display:"flex",gap:"12px",alignItems:"center"}}>
                    <div style={{width:"60px",height:"60px",borderRadius:"10px",background:`${cat?.color||C.kente}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px",flexShrink:0}}>
                      {cat?.icon||"📦"}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:"700",color:C.text,fontSize:"13px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.title}</div>
                      <div style={{fontSize:"11px",color:C.textSub}}>{cat?.[lang]?.label||l.category} · 📍 {l.location||l.country}</div>
                      <div style={{fontSize:"11px",color:C.textSub}}>{new Date(l.created_at).toLocaleDateString(isFr?"fr-FR":"en-US",{year:"numeric",month:"short",day:"numeric"})}</div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{color:C.kente,fontWeight:"900",fontSize:"14px"}}>{l.price>0?fp(l.price,cc):"—"}</div>
                      <div style={{fontSize:"10px",color:C.forest}}>👁 {l.views||0}</div>
                      {l.delivery_available&&<div style={{fontSize:"9px",color:C.forest,fontWeight:"700"}}>🚚</div>}
                      <Tag color={l.status==="live"?C.forest:"#999"}>{l.status==="live"?(isFr?"EN LIGNE":"LIVE"):"DRAFT"}</Tag>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── SETTINGS TAB — All Real & Functional ── */}
      {tab==="settings"&&(
        <SettingsTab go={go} lang={lang} user={user} onLogout={onLogout} profile={profile} setProfile={setProfile}/>
      )}
    </div>
  );
}

// ─── ADMIN PANEL — Owner Only ─────────────────────────────────────
const ADMIN_PASSWORD = "AfriGate@Owner2025!";
const ADMIN_EMAIL    = "afrigatemarket@gmail.com";

function AdminPanel({go,lang}){
  const [pw,setPw]=useState("");
  const [auth,setAuth]=useState(()=>sessionStorage.getItem("agm_admin")==="1");
  const [tab,setTab]=useState("overview");
  const [users,setUsers]=useState([]);
  const [listings,setListings]=useState([]);
  const [loading,setLoading]=useState(false);
  const isFr=lang==="fr";

  function tryLogin(){
    if(pw===ADMIN_PASSWORD){
      sessionStorage.setItem("agm_admin","1");
      setAuth(true);
      loadData();
    } else {
      alert("❌ Wrong password");
      setPw("");
    }
  }

  async function loadData(){
    setLoading(true);
    try{
      const {data:lst}=await sb.from("listings").select("*").order("created_at",{ascending:false}).limit(100);
      setListings(lst||[]);
      const {data:prof}=await sb.from("profiles").select("*").order("created_at",{ascending:false}).limit(100);
      setUsers(prof||[]);
    }catch(e){console.error(e);}
    setLoading(false);
  }

  useEffect(()=>{if(auth)loadData();},[auth]);

  async function deleteListing(id){
    if(!confirm("Delete this listing?"))return;
    await sb.from("listings").delete().eq("id",id);
    setListings(l=>l.filter(x=>x.id!==id));
  }

  if(!auth) return(
    <div style={{maxWidth:"380px",margin:"100px auto",padding:"0 20px"}}>
      <div style={{background:C.bgCard,borderRadius:"20px",border:`2px solid ${C.gold}`,padding:"32px",textAlign:"center",boxShadow:"0 8px 32px rgba(0,0,0,0.15)"}}>
        <div style={{fontSize:"48px",marginBottom:"12px"}}>🔐</div>
        <h2 style={{fontFamily:"'Georgia',serif",color:C.text,marginBottom:"6px"}}>AfriGate Admin</h2>
        <p style={{color:C.textSub,fontSize:"12px",marginBottom:"20px"}}>{isFr?"Accès réservé au propriétaire":"Owner access only"}</p>
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&tryLogin()}
          placeholder={isFr?"Mot de passe admin":"Admin password"}
          style={{width:"100%",padding:"12px",borderRadius:"10px",border:`2px solid ${C.gold}`,background:C.bg,fontSize:"14px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text,textAlign:"center",letterSpacing:"3px",marginBottom:"14px"}}/>
        <Btn size="lg" onClick={tryLogin} style={{width:"100%",justifyContent:"center"}}>🔑 {isFr?"Entrer":"Enter"}</Btn>
        <button onClick={()=>go("home")} style={{marginTop:"12px",background:"none",border:"none",color:C.textSub,cursor:"pointer",fontSize:"12px",fontFamily:"inherit"}}>← {isFr?"Retour à l'accueil":"Back to home"}</button>
      </div>
    </div>
  );

  const TABS=[
    {id:"overview",label:"📊 Overview"},
    {id:"listings",label:"📦 All Listings"},
    {id:"users",label:"👥 All Users"},
  ];

  return(
    <div style={{maxWidth:"1100px",margin:"0 auto",padding:"26px 20px 60px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px",flexWrap:"wrap",gap:"10px"}}>
        <div>
          <h1 style={{fontFamily:"'Georgia',serif",color:C.text,fontSize:"22px",marginBottom:"2px"}}>🏛️ AfriGate Admin Panel</h1>
          <p style={{color:C.textSub,fontSize:"12px"}}>{isFr?"Vue propriétaire — données en temps réel":"Owner view — real-time data"}</p>
        </div>
        <div style={{display:"flex",gap:"8px"}}>
          <Btn size="sm" v="ghost" onClick={loadData}>🔄 {isFr?"Actualiser":"Refresh"}</Btn>
          <Btn size="sm" v="ghost" onClick={()=>{sessionStorage.removeItem("agm_admin");setAuth(false);}}>🚪 {isFr?"Déconnexion":"Logout"}</Btn>
          <Btn size="sm" v="ghost" onClick={()=>go("home")}>🏠 {isFr?"Accueil":"Home"}</Btn>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:"12px",marginBottom:"20px"}}>
        {[
          {ic:"👥",l:isFr?"Utilisateurs":"Users",v:users.length,c:C.intBlue},
          {ic:"📦",l:isFr?"Annonces":"Listings",v:listings.length,c:C.kente},
          {ic:"✅",l:isFr?"En ligne":"Live",v:listings.filter(l=>l.status==="live").length,c:C.forest},
          {ic:"🌍",l:isFr?"Pays":"Countries",v:[...new Set(users.map(u=>u.country))].length,c:C.gold},
        ].map(s=>(
          <div key={s.l} style={{background:C.bgCard,borderRadius:"13px",border:`1px solid ${C.border}`,padding:"16px",textAlign:"center"}}>
            <div style={{fontSize:"24px",marginBottom:"6px"}}>{s.ic}</div>
            <div style={{fontWeight:"900",fontSize:"24px",color:s.c}}>{loading?"…":s.v}</div>
            <div style={{fontSize:"11px",color:C.textSub,marginTop:"2px"}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:"4px",marginBottom:"16px",background:C.bg,borderRadius:"12px",padding:"3px",overflowX:"auto"}}>
        {TABS.map(tb=>(
          <button key={tb.id} onClick={()=>setTab(tb.id)}
            style={{padding:"8px 16px",border:"none",borderRadius:"9px",background:tab===tb.id?`linear-gradient(135deg,${C.kente},${C.gold})`:"transparent",color:tab===tb.id?"#fff":C.textSub,cursor:"pointer",fontSize:"12px",fontWeight:"700",whiteSpace:"nowrap",fontFamily:"inherit"}}>
            {tb.label}
          </button>
        ))}
      </div>

      {loading&&<div style={{textAlign:"center",padding:"40px",color:C.textSub}}>Loading data...</div>}

      {!loading&&tab==="listings"&&(
        <div style={{background:C.bgCard,borderRadius:"14px",border:`1px solid ${C.border}`,overflow:"hidden"}}>
          {listings.length===0?(
            <div style={{padding:"40px",textAlign:"center",color:C.textSub}}>No listings yet</div>
          ):listings.map((l,i)=>(
            <div key={l.id} style={{display:"flex",alignItems:"center",gap:"12px",padding:"12px 16px",borderBottom:i<listings.length-1?`1px solid ${C.border}`:"none",flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:"150px"}}>
                <div style={{fontWeight:"700",color:C.text,fontSize:"13px"}}>{l.title}</div>
                <div style={{fontSize:"11px",color:C.textSub}}>{l.category} · {l.location} · {l.country}</div>
                <div style={{fontSize:"10px",color:C.textSub}}>{new Date(l.created_at).toLocaleDateString()} · seller: {l.seller_name||l.seller_id?.slice(0,8)}</div>
              </div>
              <Tag color={l.status==="live"?C.forest:C.textSub}>{l.status?.toUpperCase()}</Tag>
              <div style={{color:C.kente,fontWeight:"800",fontSize:"13px"}}>{l.price>0?`${l.price.toLocaleString()}`:"—"}</div>
              <button onClick={()=>deleteListing(l.id)}
                style={{background:"#DC262618",border:"1px solid #DC262640",color:"#DC2626",borderRadius:"8px",padding:"5px 10px",cursor:"pointer",fontSize:"11px",fontWeight:"700",fontFamily:"inherit"}}>
                🗑️ {isFr?"Supprimer":"Delete"}
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading&&tab==="users"&&(
        <div style={{background:C.bgCard,borderRadius:"14px",border:`1px solid ${C.border}`,overflow:"hidden"}}>
          {users.length===0?(
            <div style={{padding:"40px",textAlign:"center",color:C.textSub}}>No users yet</div>
          ):users.map((u,i)=>(
            <div key={u.id} style={{display:"flex",alignItems:"center",gap:"12px",padding:"12px 16px",borderBottom:i<users.length-1?`1px solid ${C.border}`:"none",flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:"150px"}}>
                <div style={{fontWeight:"700",color:C.text,fontSize:"13px"}}>{u.name||"No name"}</div>
                <div style={{fontSize:"11px",color:C.textSub}}>{u.email} · {u.country} · 📱 {u.phone||"—"}</div>
                <div style={{fontSize:"10px",color:C.textSub}}>{isFr?"Inscrit":"Joined"}: {new Date(u.created_at).toLocaleDateString()}</div>
              </div>
              <Tag color={C.intBlue}>{u.country}</Tag>
            </div>
          ))}
        </div>
      )}

      {!loading&&tab==="overview"&&(
        <div style={{background:C.bgCard,borderRadius:"14px",border:`1px solid ${C.border}`,padding:"20px"}}>
          <div style={{fontWeight:"800",color:C.text,marginBottom:"14px"}}>📋 {isFr?"Dernières activités":"Recent activity"}</div>
          {listings.slice(0,10).map((l,i)=>(
            <div key={l.id} style={{display:"flex",gap:"10px",padding:"8px 0",borderBottom:i<9?`1px solid ${C.border}`:"none",alignItems:"center"}}>
              <span style={{fontSize:"16px"}}>📦</span>
              <div style={{flex:1,fontSize:"12px",color:C.textSub}}>
                <strong style={{color:C.text}}>{l.title}</strong> — {l.seller_name||"user"} · {l.country} · {new Date(l.created_at).toLocaleDateString()}
              </div>
              <Tag color={C.forest}>{l.status}</Tag>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// ─── Reset Password Page ──────────────────────────────────────────
function ResetPasswordPage({go,lang}){
  const isFr=lang==="fr";
  const [pw,setPw]=useState("");
  const [confirm,setConfirm]=useState("");
  const [showPw,setShowPw]=useState(false);
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(false);
  const [err,setErr]=useState("");
  const inp={width:"100%",padding:"11px 44px 11px 13px",borderRadius:"10px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text};

  async function saveNewPassword(){
    if(pw.length<8){setErr(isFr?"Min 8 caractères":"Min 8 characters");return;}
    if(!/[A-Z]/.test(pw)){setErr(isFr?"Besoin d'une majuscule":"Need 1 uppercase");return;}
    if(!/[0-9]/.test(pw)){setErr(isFr?"Besoin d'un chiffre":"Need 1 number");return;}
    if(pw!==confirm){setErr(isFr?"Les mots de passe ne correspondent pas":"Passwords don't match");return;}
    setLoading(true);setErr("");
    try{
      const {error}=await sb.auth.updateUser({password:pw});
      if(error){setErr(isFr?"Erreur: "+error.message:"Error: "+error.message);}
      else{setDone(true);}
    }catch(e){setErr(isFr?"Erreur de connexion":"Connection error");}
    setLoading(false);
  }

  if(done) return(
    <div style={{maxWidth:"400px",margin:"80px auto",textAlign:"center",padding:"0 20px"}}>
      <div style={{fontSize:"60px",marginBottom:"12px"}}>✅</div>
      <h2 style={{fontFamily:"'Georgia',serif",color:C.text,marginBottom:"8px"}}>
        {isFr?"Mot de passe changé!":"Password changed!"}
      </h2>
      <p style={{color:C.textSub,marginBottom:"20px"}}>
        {isFr?"Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.":"You can now log in with your new password."}
      </p>
      <Btn onClick={()=>go("login")}>{isFr?"Se connecter":"Log In"}</Btn>
    </div>
  );

  return(
    <div style={{maxWidth:"420px",margin:"60px auto",padding:"0 20px"}}>
      <div style={{background:C.bgCard,borderRadius:"20px",border:`1px solid ${C.border}`,padding:"28px",boxShadow:"0 4px 18px rgba(0,0,0,0.06)"}}>
        <div style={{textAlign:"center",marginBottom:"22px"}}>
          <div style={{fontSize:"40px",marginBottom:"8px"}}>🔒</div>
          <h2 style={{fontFamily:"'Georgia',serif",color:C.text,fontSize:"20px",marginBottom:"4px"}}>
            {isFr?"Nouveau Mot de Passe":"New Password"}
          </h2>
          <p style={{color:C.textSub,fontSize:"12px"}}>{isFr?"Choisissez un mot de passe sécurisé":"Choose a secure password"}</p>
        </div>
        {err&&<div style={{background:"#DC262618",border:"1px solid #DC262640",borderRadius:"8px",padding:"10px",color:"#DC2626",fontSize:"13px",marginBottom:"14px"}}>{err}</div>}
        <div style={{display:"flex",flexDirection:"column",gap:"13px"}}>
          <div>
            <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"5px",display:"block"}}>
              {isFr?"Nouveau mot de passe":"New password"}
            </label>
            <div style={{position:"relative"}}>
              <input type={showPw?"text":"password"} value={pw} onChange={e=>setPw(e.target.value)}
                placeholder={isFr?"Min 8 car, 1 MAJUSCULE, 1 chiffre":"Min 8 chars, 1 UPPERCASE, 1 number"}
                style={{...inp,border:`1.5px solid ${pw.length===0?C.border:pw.length>=8&&/[A-Z]/.test(pw)&&/[0-9]/.test(pw)?C.forest:"#F59E0B"}`}}/>
              <button type="button" onClick={()=>setShowPw(!showPw)}
                style={{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:"18px",padding:0}}>
                {showPw?"🙈":"👁"}
              </button>
            </div>
            {pw.length>0&&(
              <div style={{display:"flex",gap:"5px",marginTop:"6px"}}>
                {[
                  {ok:pw.length>=8,l:isFr?"8+ car":"8+ chars"},
                  {ok:/[A-Z]/.test(pw),l:isFr?"Majuscule":"Uppercase"},
                  {ok:/[0-9]/.test(pw),l:isFr?"Chiffre":"Number"},
                ].map((r,i)=>(
                  <div key={i} style={{flex:1,textAlign:"center",padding:"3px",borderRadius:"6px",fontSize:"10px",fontWeight:"700",background:r.ok?`${C.forest}20`:"#DC262618",color:r.ok?C.forest:"#DC2626"}}>
                    {r.ok?"✅":"❌"} {r.l}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"5px",display:"block"}}>
              {isFr?"Confirmer":"Confirm"}
            </label>
            <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)}
              placeholder={isFr?"Répétez le mot de passe":"Repeat password"}
              style={{...inp,border:`1.5px solid ${confirm.length===0?C.border:confirm===pw?C.forest:"#DC2626"}`}}/>
            {confirm.length>0&&<div style={{fontSize:"11px",marginTop:"4px",color:confirm===pw?C.forest:"#DC2626",fontWeight:"700"}}>
              {confirm===pw?(isFr?"✅ Identiques":"✅ Match"):(isFr?"❌ Différents":"❌ Don't match")}
            </div>}
          </div>
          <Btn size="lg" onClick={saveNewPassword} disabled={loading} style={{width:"100%",justifyContent:"center"}}>
            {loading?(isFr?"Sauvegarde...":"Saving..."):(isFr?"💾 Enregistrer le nouveau mot de passe":"💾 Save new password")}
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────
export default function Afrigatemarket(){
  const [page,setPage]=useState("home");
  const [cc,setCC]=useState("CM");
  const [cart,setCart]=useState(0);
  const [user,setUser]=useState(null);
  const [lang,setLang]=useState("fr"); // Default French (Cameroon)

  const go=useCallback((p)=>{
    setPage(p);
    if(typeof window!=="undefined") window.scrollTo({top:0,behavior:"smooth"});
  },[]);

  const onLogin=(u)=>setUser(u);
  const onLogout=async()=>{await sb.auth.signOut();setUser(null);go("home");};

  // Restore session on app load
  useEffect(()=>{
    // Check if coming from password reset email
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get("reset")==="true"){
      go("reset_password");
      window.history.replaceState({},document.title,window.location.pathname);
    }
    async function restoreSession(){
      try{
        const {data:{session}} = await sb.auth.getSession();
        if(session?.user){
          const {data:prof} = await sb.from("profiles").select("*").eq("id",session.user.id).single();
          const restoredUser = {
            id: session.user.id,
            email: session.user.email,
            name: prof?.name || session.user.email.split("@")[0],
            phone: prof?.phone || "",
            country: prof?.country || "CM",
            is_subscribed: prof?.is_subscribed||false,
            subscription_plan: prof?.subscription_plan||"trial",
            subscription_expiry: prof?.subscription_expiry||null,
          };
          setUser(restoredUser);
          // Check if returning from CinetPay payment
          await checkPaymentReturn(restoredUser, lang);
        }
      }catch(e){console.error("Session restore error:",e);}
    }
    restoreSession();
  },[]);

  // Re-engagement check on load
  useEffect(()=>{
    if(user) checkAndSendReengagement(user, lang);
  },[user]);
  const [cookieOk,setCookieOk]=useState(()=>!!localStorage.getItem("agm_cookie_ok"));

  const isListing=page.startsWith("listing_");
  const isCat=page.startsWith("cat_");
  const isStore=page.startsWith("store_");
  const t=T[lang];

  return(
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Segoe UI','Helvetica Neue',Arial,sans-serif",position:"relative",overflowX:"hidden",maxWidth:"100vw"}}>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:${C.bg};}
        ::-webkit-scrollbar-thumb{background:${C.gold}70;border-radius:3px;}
        input::placeholder,textarea::placeholder{color:${C.silver};}
        select option,optgroup{background:#1a0a00;color:#f5e6c8;}
        @keyframes pulse{0%,100%{box-shadow:0 4px 14px rgba(37,211,102,0.4)}50%{box-shadow:0 4px 24px rgba(37,211,102,0.85)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        button{-webkit-tap-highlight-color:transparent!important;touch-action:manipulation!important;user-select:none!important;-webkit-user-select:none!important;}
        button:active{opacity:0.8;transform:scale(0.97);}
        a{-webkit-tap-highlight-color:transparent;touch-action:manipulation;}
        *{-webkit-tap-highlight-color:rgba(0,0,0,0);}
      `}</style>

      <KenteBg/>
      <div style={{position:"relative",zIndex:1}}>
        <Header cc={cc} setCC={setCC} go={go} cartN={cart} user={user} onLogout={onLogout} lang={lang} setLang={setLang}/>

        <main style={{animation:"fadeIn 0.32s ease",minHeight:"60vh"}}>
          {page==="home"&&<>
            <Hero go={go} lang={lang}/>
            <HandshakeBanner t={t}/>
            <CatGrid go={go} lang={lang}/>
            <Featured cc={cc} go={go} lang={lang}/>
            <IntlSection go={go} lang={lang}/>
            <TrialBanner go={go} lang={lang}/>
          </>}
          {page==="listings"  && <AllListings cc={cc} go={go} lang={lang}/>}
          {page==="login"     && <LoginPage go={go} onLogin={onLogin} lang={lang}/>}
          {page==="register"  && <Register cc={cc} go={go} onLogin={onLogin} lang={lang}/>}
          {page==="sell"      && <PostListing user={user} lang={lang} cc={cc}/>}
          {page==="dashboard" && <Dashboard cc={cc} go={go} user={user} lang={lang}/>}
          {page==="intl"      && <IntlPage cc={cc} go={go} lang={lang}/>}
          {page==="pricing"    && <PricingPage cc={cc} go={go} lang={lang} user={user}/>}
          {page.startsWith("search_") && <SearchResults query={decodeURIComponent(page.replace("search_",""))} cc={cc} go={go} lang={lang}/>}
          {page==="privacy"    && <PrivacyPage go={go} lang={lang}/>}
          {page==="terms"      && <TermsPage go={go} lang={lang}/>}
          {page==="reviews"    && <ReviewsPage go={go} lang={lang} user={user}/>}
          {page==="delete_account" && <DeleteAccountPage go={go} lang={lang} user={user} onLogout={onLogout}/>}
          {page==="contact"    && <ContactPage go={go} lang={lang}/>}
          {page==="faq"        && <FAQPage go={go} lang={lang}/>}
          {page==="how"        && <HowItWorksPage go={go} lang={lang}/>}
          {page.startsWith("report_") && <ReportPage go={go} lang={lang} listingId={page.replace("report_","")}/>}
          {page==="admin"   && <AdminPanel go={go} lang={lang}/>}
          {page==="reset_password" && <ResetPasswordPage go={go} lang={lang}/>}
          {page==="profile"  && <ProfilePage go={go} user={user} onLogin={onLogin} lang={lang} cc={cc} onLogout={onLogout}/>}
          {page.startsWith("real_") && <RealListingDetail id={parseInt(page.replace("real_",""))} go={go} cc={cc} lang={lang} user={user}/>}
          {page==="cart"      && (
            <div style={{maxWidth:"560px",margin:"56px auto",textAlign:"center",padding:"0 20px"}}>
              <div style={{fontSize:"56px",marginBottom:"12px"}}>🛒</div>
              <h2 style={{fontFamily:"'Georgia',serif",color:C.text,marginBottom:"9px"}}>{t.cart}</h2>
              <p style={{color:C.textSub,marginBottom:"20px"}}>{t.cart_empty}</p>
              <Btn size="lg" onClick={()=>go("listings")}>{t.browse}</Btn>
            </div>
          )}
          {isListing && (()=>{
            const lid=page.replace("listing_","");
            const listing=ALL_LISTINGS.find(l=>l.id===parseInt(lid))||ALL_LISTINGS[0];
            const catId=Object.entries(LISTINGS).find(([,items])=>items.some(i=>i.id===listing.id))?.[0]||"";
            const cat=CATS.find(c=>c.id===catId);
            const seller=SELLERS[listing.sid]||SELLERS.s1;
            const [imgIdx,setImgIdx]=useState(0);
            const gallery=[listing.img,...(cat?.imgs||[]).slice(0,9)];
            const title=lang==="fr"&&listing.title_fr?listing.title_fr:listing.title;
            return(
              <div style={{maxWidth:"1100px",margin:"0 auto",padding:"26px 20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
                  <button onClick={()=>go("listings")} style={{background:"none",border:"none",color:C.intBlue,cursor:"pointer",fontSize:"13px",fontFamily:"inherit",fontWeight:"600"}}>{t.back}</button>
                  <button onClick={()=>go("report_"+listing.id)} style={{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"12px",fontFamily:"inherit",fontWeight:"700",padding:"6px 12px",borderRadius:"20px",border:"1px solid #DC262640"}}>🚨 {lang==="en"?"Report":"Signaler"}</button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:"26px"}}>
                  <div>
                    <div style={{borderRadius:"16px",overflow:"hidden",height:"320px",background:C.bg,marginBottom:"9px"}}>
                      <img src={gallery[imgIdx]} alt={title} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.target.style.opacity="0";}}/>
                    </div>
                    <div style={{display:"flex",gap:"6px",overflowX:"auto",paddingBottom:"3px"}}>
                      {gallery.map((src,i)=>(
                        <img key={i} src={src} alt="" loading="lazy" onClick={()=>setImgIdx(i)}
                          style={{width:"58px",height:"58px",objectFit:"cover",borderRadius:"7px",border:`2px solid ${i===imgIdx?C.gold:C.border}`,cursor:"pointer",flexShrink:0}}/>
                      ))}
                    </div>
                    <div style={{marginTop:"6px",fontSize:"11px",color:C.textSub}}>📸 {gallery.length} {lang==="en"?"photos · Lazy-loaded":"photos · Chargement rapide"}</div>
                  </div>
                  <div>
                    <div style={{marginBottom:"8px"}}><Tag color={cat?.color||C.kente}>{cat?.icon} {cat?.[lang]?.label}</Tag></div>
                    <h1 style={{fontFamily:"'Georgia',serif",fontSize:"21px",color:C.text,marginBottom:"9px",lineHeight:1.3}}>{title}</h1>
                    {listing.price>0
                      ? <div style={{color:C.kente,fontSize:"25px",fontWeight:"900",marginBottom:"11px"}}>{fp(listing.price,cc)}</div>
                      : <div style={{color:C.intBlue,fontSize:"16px",fontWeight:"700",marginBottom:"11px"}}>{lang==="en"?"Contact for details":"Contactez pour détails"}</div>
                    }
                    <div style={{display:"flex",gap:"14px",flexWrap:"wrap",marginBottom:"12px"}}>
                      <span style={{fontSize:"12px",color:C.textSub}}>📍 {listing.loc}</span>
                      <span style={{fontSize:"12px",color:C.gold,fontWeight:"700"}}>⭐ {listing.rating}</span>
                      <span style={{fontSize:"12px",color:C.textSub}}>👁 {listing.views} {t.views}</span>
                    </div>
                    {listing.extra&&Object.keys(listing.extra).length>0&&(
                      <div style={{background:`${cat?.color||C.kente}11`,border:`1px solid ${cat?.color||C.kente}30`,borderRadius:"11px",padding:"13px",marginBottom:"12px"}}>
                        <div style={{fontSize:"11px",fontWeight:"800",color:cat?.color||C.kente,marginBottom:"7px"}}>{cat?.icon} {t.specifications}</div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5px"}}>
                          {Object.entries(listing.extra).map(([k,v])=>(
                            <div key={k} style={{fontSize:"12px"}}>
                              <span style={{color:C.textSub,fontWeight:"600"}}>{k.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase())}:</span>{" "}
                              <span style={{color:C.text,fontWeight:"700"}}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div onClick={()=>go("store_"+seller.id)} style={{background:C.bg,borderRadius:"11px",padding:"13px",marginBottom:"12px",cursor:"pointer",border:`1px solid ${C.border}`,transition:"all 0.15s"}}
                      onMouseEnter={e=>e.currentTarget.style.borderColor=C.intBlue} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div>
                          <div style={{fontWeight:"800",color:C.text,fontSize:"14px"}}>{seller.name}</div>
                          <div style={{fontSize:"11px",color:C.textSub,marginTop:"2px"}}>⭐ {seller.rating} · {seller.count} {lang==="en"?"listings":"annonces"} · {lang==="en"?"Joined":"Depuis"} {seller.joined}</div>
                        </div>
                        <div style={{fontSize:"26px"}}>{seller.av}</div>
                      </div>
                      <div style={{fontSize:"11px",color:C.intBlue,marginTop:"5px",fontWeight:"600"}}>{t.view_store}</div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                      <a href={`https://wa.me/${(seller.soc?.wa||MY_WA).replace(/\D/g,"")}?text=${lang==="en"?"Hi! I found this on Afrigatemarket:":"Bonjour! J'ai trouvé ceci sur Afrigatemarket:"} ${encodeURIComponent(title)}`}
                        target="_blank" rel="noreferrer"
                        style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",padding:"13px",borderRadius:"12px",background:C.success,color:"#fff",textDecoration:"none",fontWeight:"800",fontSize:"15px"}}>
                        💬 {t.chat_wa}
                      </a>
                      <div style={{display:"flex",gap:"8px"}}>
                        <Btn v="ghost" style={{flex:1,justifyContent:"center"}}>📞 {t.call_seller}</Btn>
                        <Btn v="secondary" style={{flex:1,justifyContent:"center"}}>🛒 {t.add_cart}</Btn>
                      </div>
                    </div>
                    <div style={{marginTop:"14px"}}>
                      <div style={{fontSize:"11px",color:C.textSub,marginBottom:"7px",fontWeight:"700"}}>{t.share}</div>
                      <div style={{display:"flex",gap:"7px",flexWrap:"wrap"}}>
                        {[{ic:"📘",l:"Facebook",c:"#1877F2"},{ic:"📸",l:"Instagram",c:"#E1306C"},{ic:"🎵",l:"TikTok",c:"#333"},{ic:"▶️",l:"YouTube",c:"#FF0000"}].map(s=>(
                          <button key={s.l} style={{padding:"6px 11px",borderRadius:"8px",border:`1px solid ${s.c}44`,background:`${s.c}12`,color:C.text,cursor:"pointer",fontSize:"11px",fontFamily:"inherit",fontWeight:"600"}}>{s.ic} {s.l}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
          {isCat    && <CatPage cid={page.replace("cat_","")} cc={cc} go={go} lang={lang}/>}
          {isStore  && <Storefront sid={page.replace("store_","")} cc={cc} go={go} lang={lang}/>}
        </main>
        <Footer go={go} lang={lang}/>
        {/* Cookie Consent Banner — required by Google Play & GDPR */}
        {!cookieOk&&(
          <div style={{position:"fixed",bottom:"70px",left:0,right:0,zIndex:999,background:C.slate,borderTop:`2px solid ${C.gold}`,padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px",flexWrap:"wrap"}}>
            <div style={{color:"rgba(255,255,255,0.85)",fontSize:"12px",flex:1,minWidth:"200px"}}>
              🍪 {lang==="fr"?"Nous utilisons des cookies essentiels pour votre session. Voir notre":"We use essential cookies for your session. See our"}{" "}
              <span onClick={()=>go("privacy")} style={{color:C.gold,cursor:"pointer",textDecoration:"underline"}}>{lang==="fr"?"Politique de Confidentialité":"Privacy Policy"}</span>
            </div>
            <Btn size="sm" onClick={()=>{localStorage.setItem("agm_cookie_ok","1");setCookieOk(true);}}>
              {lang==="fr"?"Accepter":"Accept"}
            </Btn>
          </div>
        )}
      </div>


      
      {/* ── STICKY BOTTOM NAVIGATION BAR ────────────────────────────── */}
      <nav style={{
        position:"fixed",bottom:0,left:0,right:0,zIndex:1000,
        background:"rgba(255,255,255,0.97)",
        borderTop:"1px solid #e0d5c5",
        boxShadow:"0 -4px 20px rgba(0,0,0,0.10)",
        display:"flex",alignItems:"center",justifyContent:"space-around",
        padding:"4px 4px 6px",height:"58px",
        width:"100%",boxSizing:"border-box",
        paddingBottom:"max(6px,env(safe-area-inset-bottom))",
      }}>
        {[
          {id:"home",    tp:"home",  label:lang==="en"?"Home":"Accueil"},
          {id:"listings",tp:"grid",  label:lang==="en"?"Browse":"Annonces"},
          {id:"sell",    tp:"post",  label:lang==="en"?"Post":"Vendre", isPost:true},
          {id:"dashboard",tp:"dash", label:lang==="en"?"Board":"Tableau"},
          {id:"login",   tp:"user",  label:user?(lang==="en"?"Me":"Moi"):(lang==="en"?"Login":"Compte")},
        ].map(btn=>(
          btn.isPost
          ? <button key="sell" onClick={()=>go("sell")} style={{
              flex:"0 0 52px",width:"52px",height:"44px",
              background:"linear-gradient(135deg,"+C.gold+",#E8A000)",
              border:"none",cursor:"pointer",
              display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1px",
              borderRadius:"14px",
              boxShadow:"0 4px 14px "+C.gold+"60",
              fontFamily:"inherit",transform:"translateY(-6px)",flexShrink:0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              <span style={{fontSize:"8px",fontWeight:"900",color:"#fff",fontFamily:"inherit"}}>{btn.label}</span>
            </button>
          : <button key={btn.id} onClick={()=>go(btn.id==="login"?(user?"profile":"login"):btn.id)} style={{
              flex:"1 1 0",minWidth:0,maxWidth:"72px",background:"none",border:"none",cursor:"pointer",
              display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",
              padding:"2px 2px",fontFamily:"inherit",
              color:page===btn.id||page.startsWith(btn.id+"_")?C.kente:"#999",
            }}>
              {btn.tp==="home"&&<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={page==="home"?C.kente:"#999"} strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>}
              {btn.tp==="grid"&&<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={page==="listings"||page.startsWith("cat_")?C.kente:"#999"} strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>}
              {btn.tp==="dash"&&<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={page==="dashboard"?C.kente:"#999"} strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>}
              {btn.tp==="user"&&<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={page==="login"||page==="register"||page==="profile"?C.kente:"#999"} strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              <span style={{fontSize:"7.5px",fontWeight:page===btn.id?"800":"500",fontFamily:"inherit",whiteSpace:"nowrap",overflow:"hidden",maxWidth:"100%",textOverflow:"ellipsis"}}>{btn.label}</span>
            </button>
        ))}
      </nav>
      <div style={{height:"66px"}}/>

      {/* Floating WhatsApp */}
      <a href={`https://wa.me/${MY_WA}?text=Hello%20Afrigatemarket!`} target="_blank" rel="noreferrer"
        style={{position:"fixed",bottom:"72px",right:"16px",zIndex:998,background:C.success,borderRadius:"50px",padding:"12px 18px",display:"flex",alignItems:"center",gap:"7px",color:"#fff",fontWeight:"700",textDecoration:"none",boxShadow:`0 4px 18px ${C.success}60`,fontSize:"13px",animation:"pulse 2s infinite"}}>
        <span style={{fontSize:"20px"}}>💬</span><span>WhatsApp</span>
      </a>


    </div>
  );
}
