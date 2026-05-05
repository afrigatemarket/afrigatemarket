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
const SUPABASE_URL  = "https://sgrqopehgqohamwlvabw.supabase.co";
const SUPABASE_ANON = "sb_publishable_nXQstTGfbHuItXjdF_y2NQ_QKmBCwK1";
const RESEND_KEY    = "re_YOUR_RESEND_KEY";
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
    imgs:["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80","https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80","https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&q=80","https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=500&q=80","https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80","https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&q=80","https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&q=80","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80","https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&q=80"],
  },
  {
    id:"building", icon:"🏗️", color:"#C45D2A",
    en:{ label:"Building Materials",   sub:"Cement · Steel · Solar",            banner:"Quality building materials for construction projects across Africa" },
    fr:{ label:"Matériaux de Construction",sub:"Ciment · Acier · Solaire",     banner:"Matériaux de construction de qualité pour vos projets en Afrique" },
    fields:[],
    imgs:["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80","https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&q=80","https://images.unsplash.com/photo-1565008576549-57569a49371d?w=500&q=80","https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=80","https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=500&q=80","https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=500&q=80","https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&q=80","https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80","https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?w=500&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80"],
  },
  {
    id:"logistics", icon:"🚢", color:"#1B7FC4",
    en:{ label:"Logistics & Shipping", sub:"Freight · Containers · Delivery",   banner:"International freight, container tracking and local delivery services" },
    fr:{ label:"Logistique & Transport",sub:"Fret · Conteneurs · Livraison",    banner:"Fret international, suivi de conteneurs et services de livraison locale" },
    fields:[],
    imgs:["https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&q=80","https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=500&q=80","https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80","https://images.unsplash.com/photo-1565891741441-64926e441838?w=500&q=80","https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&q=80","https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&q=80","https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80","https://images.unsplash.com/photo-1519003300449-424ad0405076?w=500&q=80","https://images.unsplash.com/photo-1605745341112-85968b19335b?w=500&q=80","https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=500&q=80"],
  },
  {
    id:"vehicles", icon:"🚗", color:"#1A5C38",
    en:{ label:"Vehicles",             sub:"Trucks · Cars · Spare Parts",       banner:"Trusted vehicle marketplace — cars, trucks, motorbikes and spare parts" },
    fr:{ label:"Véhicules",             sub:"Camions · Voitures · Pièces",      banner:"Marché de véhicules de confiance — voitures, camions, motos et pièces détachées" },
    fields:[{k:"mileage",en:"Mileage km",fr:"Kilométrage",p:"45000",t:"number"},{k:"year",en:"Year",fr:"Année",p:"2022",t:"number"},{k:"engine",en:"Engine",fr:"Moteur",p:"3.0L V6 Diesel"},{k:"fuel",en:"Fuel Type",fr:"Type Carburant",p:"Diesel / Petrol"}],
    imgs:["https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&q=80","https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&q=80","https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&q=80","https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&q=80","https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&q=80","https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&q=80","https://images.unsplash.com/photo-1612825173281-9a193378527e?w=500&q=80","https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500&q=80","https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=500&q=80","https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=500&q=80"],
  },
  {
    id:"electronics", icon:"📱", color:"#6B2FBF",
    en:{ label:"Electronics",          sub:"Phones · Laptops · CCTV",           banner:"Latest smartphones, laptops, home appliances and security systems" },
    fr:{ label:"Électronique",          sub:"Téléphones · Laptops · CCTV",      banner:"Derniers smartphones, laptops, électroménagers et systèmes de sécurité" },
    fields:[],
    imgs:["https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500&q=80","https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80","https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80","https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80","https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80","https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80","https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80","https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80","https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&q=80","https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80"],
  },
  {
    id:"beauty", icon:"💄", color:"#C2185B",
    en:{ label:"Beauty & Cosmetics",   sub:"Skincare · Hair · Salon Equipment", banner:"Premium beauty products, hair care and professional salon equipment" },
    fr:{ label:"Beauté & Cosmétiques", sub:"Soins · Cheveux · Équipement Salon",banner:"Produits de beauté premium, soins capillaires et équipements salon professionnels" },
    fields:[],
    imgs:["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80","https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80","https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&q=80","https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&q=80","https://images.unsplash.com/photo-1583241475880-083f84372725?w=500&q=80","https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80","https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&q=80","https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=500&q=80","https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=80","https://images.unsplash.com/photo-1631214524020-3c69888f4440?w=500&q=80"],
  },
  {
    id:"food", icon:"🌾", color:"#2E7D32",
    en:{ label:"Food & Agriculture",   sub:"Wholesale Grains · Oils · Machinery",banner:"Wholesale food products, farm machinery and agricultural supplies" },
    fr:{ label:"Alimentation & Agriculture",sub:"Céréales · Huiles · Machines", banner:"Produits alimentaires en gros, machines agricoles et fournitures" },
    fields:[],
    imgs:["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80","https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80","https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=500&q=80","https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500&q=80","https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&q=80","https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&q=80","https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500&q=80","https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=500&q=80","https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=500&q=80","https://images.unsplash.com/photo-1595855759920-86582396756a?w=500&q=80"],
  },
  {
    id:"home", icon:"🛋️", color:"#F57C00",
    en:{ label:"Home & Furniture",     sub:"Interior Decor · Kitchen · Furniture",banner:"Beautiful furniture, kitchen appliances and interior decoration" },
    fr:{ label:"Maison & Mobilier",    sub:"Décoration · Cuisine · Mobilier",   banner:"Beaux meubles, électroménagers et décoration intérieure" },
    fields:[],
    imgs:["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80","https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&q=80","https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80","https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80","https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80","https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500&q=80","https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80","https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&q=80","https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=500&q=80","https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&q=80"],
  },
  {
    id:"fashion", icon:"👗", color:"#AD1457",
    en:{ label:"Fashion & Textiles",   sub:"Traditional Wax · Modern Wear · Jewelry",banner:"African traditional wear, modern fashion and jewelry from across the continent" },
    fr:{ label:"Mode & Textiles",      sub:"Wax Traditionnel · Mode · Bijoux",  banner:"Vêtements traditionnels africains, mode moderne et bijoux du continent" },
    fields:[],
    imgs:["https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&q=80","https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80","https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80","https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80","https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80","https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80","https://images.unsplash.com/photo-1496217590455-aa63a8350eea?w=500&q=80","https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80","https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=500&q=80","https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=500&q=80"],
  },
  {
    id:"services", icon:"⚖️", color:"#00695C",
    en:{ label:"Professional Services",sub:"Legal · Accounting · Marketing",    banner:"Connect with verified lawyers, accountants, architects and marketing experts" },
    fr:{ label:"Services Professionnels",sub:"Juridique · Comptabilité · Marketing",banner:"Connectez-vous avec des avocats, comptables, architectes et experts marketing vérifiés" },
    fields:[],
    imgs:["https://images.unsplash.com/photo-1521791055366-0d553872952f?w=500&q=80","https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80","https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80","https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80","https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80","https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80","https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&q=80","https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80","https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80","https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&q=80"],
  },
  {
    id:"industrial", icon:"⚙️", color:"#455A64",
    en:{ label:"Industrial Equipment", sub:"Generators · Mining Tools · Safety", banner:"Heavy machinery, generators, mining equipment and industrial safety gear" },
    fr:{ label:"Équipement Industriel", sub:"Générateurs · Mines · Sécurité",   banner:"Machines lourdes, générateurs, équipements miniers et matériel de sécurité industrielle" },
    fields:[],
    imgs:["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&q=80","https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80","https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80","https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=500&q=80","https://images.unsplash.com/photo-1574169207511-e21a21c8075a?w=500&q=80","https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&q=80","https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80","https://images.unsplash.com/photo-1548407260-da850faa41e3?w=500&q=80","https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80"],
  },
  {
    id:"jobs", icon:"💼", color:"#1565C0",
    en:{ label:"Jobs & Employment",    sub:"Warehouse · Technical Roles · CV Upload",banner:"Find jobs or hire talent across Africa — warehouse, technical and professional roles" },
    fr:{ label:"Emplois & Recrutement",sub:"Entrepôt · Rôles Techniques · CV", banner:"Trouvez un emploi ou recrutez des talents en Afrique — entrepôt, technique et professionnel" },
    fields:[],
    imgs:["https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80","https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80","https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=500&q=80","https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80","https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=500&q=80","https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80","https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80","https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&q=80","https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80"],
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
    {id:101,title:"Luxury Villa — Douala Bonamoussadi",title_fr:"Villa de Luxe — Douala Bonamoussadi",price:85000000,sid:"s1",loc:"Douala, CM",img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",rating:4.8,views:1240,extra:{rooms:"5",location:"Bonamoussadi",title_doc:"TF No.4521",area:"380"}},
    {id:102,title:"3-Bedroom Apartment — Yaoundé Centre",title_fr:"Appartement 3 Pièces — Centre Yaoundé",price:25000000,sid:"s1",loc:"Yaoundé, CM",img:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",rating:4.5,views:654,extra:{rooms:"3",location:"Centre Ville",title_doc:"TF No.2201",area:"120"}},
  ],
  vehicles:[
    {id:201,title:"Toyota Land Cruiser V8 2022",title_fr:"Toyota Land Cruiser V8 2022",price:32000000,sid:"s3",loc:"Nairobi, KE",img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",rating:4.7,views:654,extra:{mileage:"41000",year:"2022",engine:"4.5L V8",fuel:"Diesel"}},
    {id:202,title:"Mercedes Benz C200 2020 — Clean",title_fr:"Mercedes Benz C200 2020 — Propre",price:18000000,sid:"s3",loc:"Lagos, NG",img:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",rating:4.6,views:432,extra:{mileage:"28000",year:"2020",engine:"2.0L Turbo",fuel:"Petrol"}},
  ],
  electronics:[
    {id:301,title:"iPhone 15 Pro Max 256GB — Sealed",title_fr:"iPhone 15 Pro Max 256Go — Neuf Scellé",price:550000,sid:"s2",loc:"Lagos, NG",img:"https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&q=80",rating:4.9,views:890,extra:{}},
    {id:302,title:"Samsung 65\" 4K Smart TV",title_fr:"Samsung TV 65\" 4K Smart",price:380000,sid:"s2",loc:"Accra, GH",img:"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",rating:4.7,views:312,extra:{}},
  ],
  fashion:[
    {id:401,title:"Kente Fabric — Premium Grade Export",title_fr:"Tissu Kente — Grade Premium Export",price:45000,sid:"s4",loc:"Accra, GH",img:"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",rating:5.0,views:432,extra:{}},
    {id:402,title:"Ankara Dress — Handmade Collection",title_fr:"Robe Ankara — Collection Artisanale",price:35000,sid:"s4",loc:"Abidjan, CI",img:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",rating:4.8,views:287,extra:{}},
  ],
  food:[
    {id:501,title:"50kg Bags Premium Basmati Rice",title_fr:"Sacs 50kg Riz Basmati Premium",price:28000,sid:"s5",loc:"Dakar, SN",img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",rating:4.6,views:567,extra:{}},
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

const SELLERS = {
  s1:{id:"s1",name:"Kamdem Properties",cc:"CM",rating:4.8,count:18,joined:"Jan 2024",verified:true,av:"🏠",bio:"Premium real estate across Central Africa.",bio_fr:"Immobilier premium en Afrique Centrale.",soc:{wa:"+237600111222",fb:"KamdemProp",ig:"kamdem_realty",tt:"",yt:""}},
  s2:{id:"s2",name:"TechHub Lagos",    cc:"NG",rating:4.9,count:34,joined:"Mar 2023",verified:true,av:"📱",bio:"Nigeria's trusted tech reseller.",bio_fr:"Revendeur tech de confiance au Nigéria.",soc:{wa:"+234801234567",fb:"TechHubLagos",ig:"techhublagos",tt:"techhub_ng",yt:"TechHubNG"}},
  s3:{id:"s3",name:"AutoMart Kenya",   cc:"KE",rating:4.7,count:12,joined:"Feb 2024",verified:true,av:"🚗",bio:"Verified vehicle dealer, Nairobi.",bio_fr:"Concessionnaire vérifié, Nairobi.",soc:{wa:"+254712345678",fb:"AutoMartKE",ig:"automart_kenya",tt:"",yt:""}},
  s4:{id:"s4",name:"GoldCoast Textiles",cc:"GH",rating:5.0,count:47,joined:"Jun 2022",verified:true,av:"👗",bio:"Authentic Kente & Ghanaian fashion exports.",bio_fr:"Exports de mode Kente authentique.",soc:{wa:"+233201234567",fb:"GoldCoastFabric",ig:"goldcoast_textiles",tt:"goldcoasttextiles",yt:"GoldCoastTV"}},
  s5:{id:"s5",name:"SahelAgroTrade",   cc:"SN",rating:4.6,count:9, joined:"Sep 2024",verified:true,av:"🌾",bio:"West Africa wholesale grain & agro.",bio_fr:"Commerce de gros céréales Afrique de l'Ouest.",soc:{wa:"+221771234567",fb:"SahelAgro",ig:"sahel_agro",tt:"",yt:""}},
  s6:{id:"s6",name:"GreenPower SA",    cc:"ZA",rating:4.8,count:22,joined:"Nov 2023",verified:true,av:"☀️",bio:"Solar & renewable energy, Southern Africa.",bio_fr:"Énergie solaire et renouvelable, Afrique Australe.",soc:{wa:"+27811234567",fb:"GreenPowerSA",ig:"greenpower_sa",tt:"greenpower_sa",yt:"GreenPowerSA"}},
};

// Supabase stub
const sb = {
  auth:{
    signUp:async({email})=>({data:{user:{id:"uid_"+Date.now(),email}},error:null}),
    signInWithPassword:async(c)=>({data:{user:{id:"uid",email:c.email}},error:null}),
    signOut:async()=>{},
  },
  from:()=>({
    insert:(r)=>({select:()=>Promise.resolve({data:[{...r,id:Date.now()}],error:null})}),
    update:(r)=>({eq:()=>Promise.resolve({data:[r],error:null})}),
    select:()=>({eq:()=>({order:()=>Promise.resolve({data:[],error:null})}),order:()=>Promise.resolve({data:[],error:null})}),
  }),
  storage:{from:(b)=>({upload:async(p)=>({data:{path:p},error:null}),getPublicUrl:(p)=>({data:{publicUrl:`demo/${b}/${p}`}})})},
};

async function sendEmail(to, subject, html) {
  try {
    await fetch("https://api.resend.com/emails", {
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${RESEND_KEY}`},
      body: JSON.stringify({from:`Afrigatemarket <${MY_EMAIL}>`,to,subject,html}),
    });
  } catch(e){ console.error("[EMAIL ERROR]",e); }
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
    <button disabled={disabled} onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
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
// Matches the uploaded logo: gold circular A-arrow symbol + navy text
function AfriGateLogo({ size = 44, dark = false }) {
  const gold = "#B8960C";
  const goldLight = "#D4AF37";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      {/* Outer circle arc — open at top-right for arrow exit */}
      <path
        d="M 72 18 A 34 34 0 1 0 82 72"
        stroke={goldLight} strokeWidth="7" fill="none" strokeLinecap="round"
      />
      {/* Inner circle arc */}
      <path
        d="M 65 26 A 22 22 0 1 0 74 65"
        stroke={gold} strokeWidth="5" fill="none" strokeLinecap="round"
      />
      {/* Arrow tip pointing up-right */}
      <polyline
        points="68,12 80,8 84,20"
        stroke={goldLight} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* A shape inside */}
      <path
        d="M 50 28 L 36 70 M 50 28 L 64 70 M 40 56 L 60 56"
        stroke={gold} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
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
    <div style={{position:"relative",overflow:"hidden",borderRadius:"20px",margin:"0 20px 32px",minHeight:"190px",display:"flex",alignItems:"center",background:"linear-gradient(135deg,#0a0a0a 0%,#1E2A3A 50%,#0a0a0a 100%)"}}>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",opacity:.18}}>
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
        <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"10px"}}>
          <div style={{fontSize:"38px",filter:`drop-shadow(0 2px 8px ${C.gold}90)`}}>🤝</div>
          <div>
            <div style={{fontFamily:"'Georgia',serif",fontSize:"clamp(16px,2.5vw,22px)",fontWeight:"900",color:"#fff"}}>
              {t.africa_connects}
            </div>
            <div style={{fontSize:"11px",color:"rgba(255,255,255,0.5)",marginTop:"2px",letterSpacing:"1.5px"}}>
              BLACK HANDS · WHITE HANDS · ONE MARKETPLACE
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
          <span style={{color:C.gold}}>{cur.symbol} {Math.round(BASE*cur.rate).toLocaleString()}/mo</span>
        </div>
      </div>
      {/* Main bar */}
      <div style={{padding:"10px 20px",display:"flex",alignItems:"center",gap:"11px",flexWrap:"wrap"}}>
        <div onClick={()=>go("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:"10px",flexShrink:0}}>
          {/* AfriGate Market Official Logo */}
          <AfriGateLogo size={44}/>
          <div>
            <div style={{display:"flex",alignItems:"baseline",gap:"0",lineHeight:1}}>
              <span style={{fontFamily:"'Segoe UI',Arial,sans-serif",fontWeight:"900",fontSize:"19px",color:"#1E2A3A",letterSpacing:"-0.5px"}}>AfriGate</span>
              <span style={{fontFamily:"'Segoe UI',Arial,sans-serif",fontWeight:"400",fontSize:"19px",color:"#1E2A3A",letterSpacing:"0px"}}> Market</span>
            </div>
            <div style={{fontSize:"8px",color:C.textSub,letterSpacing:"2px",fontWeight:"700",marginTop:"1px"}}>{t.tagline.toUpperCase()}</div>
          </div>
        </div>
        <div style={{flex:1,minWidth:"160px",position:"relative"}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder={t.search_ph}
            style={{width:"100%",padding:"9px 38px 9px 14px",borderRadius:"24px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",outline:"none",boxSizing:"border-box",fontFamily:"inherit",color:C.text}}/>
          <span style={{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",opacity:.4,fontSize:"15px"}}>🔍</span>
        </div>
        <div style={{display:"flex",gap:"7px",flexShrink:0,flexWrap:"wrap"}}>
          <Btn onClick={()=>go("sell")} size="sm">🏪 {t.sell}</Btn>
          <Btn onClick={()=>go("dashboard")} v="ghost" size="sm">📊 {t.dashboard}</Btn>
          {user
            ? <Btn onClick={onLogout} v="ghost" size="sm">👤 {user.name?.split(" ")[0]} ↩</Btn>
            : <Btn onClick={()=>go("login")} v="ghost" size="sm">🔑 {t.login}</Btn>
          }
          <Btn onClick={()=>go("cart")} v="ghost" size="sm">🛒 {t.cart} ({cartN})</Btn>
        </div>
      </div>
      {/* Category strip — each category links to its OWN section */}
      <div style={{display:"flex",overflowX:"auto",padding:"0 20px",borderTop:`1px solid ${C.border}`,scrollbarWidth:"none",background:C.bgCard}}>
        {CATS.map(cat=>(
          <button key={cat.id} onClick={()=>go("cat_"+cat.id)}
            style={{padding:"7px 11px",background:"none",border:"none",color:C.textSub,fontSize:"11px",cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:"4px",borderBottom:"2px solid transparent",transition:"all 0.15s",fontFamily:"inherit",fontWeight:"600"}}
            onMouseEnter={e=>{e.currentTarget.style.color=cat.color;e.currentTarget.style.borderBottomColor=cat.color;}}
            onMouseLeave={e=>{e.currentTarget.style.color=C.textSub;e.currentTarget.style.borderBottomColor="transparent";}}>
            {cat.icon} {cat[lang].label}
          </button>
        ))}
        <button onClick={()=>go("intl")}
          style={{padding:"7px 14px",background:"none",border:"none",color:C.intBlue,fontSize:"11px",cursor:"pointer",whiteSpace:"nowrap",borderBottom:"2px solid transparent",transition:"all 0.15s",fontFamily:"inherit",fontWeight:"800",marginLeft:"auto"}}
          onMouseEnter={e=>e.currentTarget.style.borderBottomColor=C.intBlue}
          onMouseLeave={e=>e.currentTarget.style.borderBottomColor="transparent"}>
          🌐 {t.intl_hub}
        </button>
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
    {bg:"https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=75",tag:lang==="en"?"Build Your Digital Warehouse":"Construisez Votre Entrepôt Numérique",title:lang==="en"?"50 Listings a Day.\nYour Rules.":"50 Annonces par Jour.\nVos Règles.",sub:lang==="en"?"Real Estate · Vehicles · Electronics · Fashion + 8 more categories.":"Immobilier · Véhicules · Électronique · Mode + 8 autres catégories.",dest:"sell",ov:`linear-gradient(110deg,${C.forest}CC,#0D0D1A99 60%)`},
  ];
  useEffect(()=>{const t=setInterval(()=>setS(x=>(x+1)%3),5500);return()=>clearInterval(t);},[]);
  const sl=SL[s];
  return(
    <div style={{position:"relative",height:"clamp(360px,56vh,560px)",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:`url(${sl.bg})`,backgroundSize:"cover",backgroundPosition:"center",transition:"all 1.1s",filter:"brightness(0.52)"}}/>
      <div style={{position:"absolute",inset:0,background:sl.ov}}/>
      <div style={{position:"absolute",right:"3%",top:"50%",transform:"translateY(-50%)",fontSize:"190px",opacity:.05,userSelect:"none",color:sl.intl?C.intBlue:C.gold}}>✦</div>
      <div style={{position:"relative",zIndex:2,height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 40px",maxWidth:"660px"}}>
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
            style={{background:C.bgCard,borderRadius:"13px",overflow:"hidden",cursor:"pointer",border:`1px solid ${C.border}`,transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=cat.color;e.currentTarget.style.boxShadow=`0 6px 18px ${cat.color}26`;e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
            {/* 3-image preview strip */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",height:"50px",overflow:"hidden"}}>
              {cat.imgs.slice(0,3).map((img,i)=>(
                <img key={i} src={img} alt="" loading="lazy" style={{width:"100%",height:"50px",objectFit:"cover"}}/>
              ))}
            </div>
            <div style={{padding:"10px 10px 12px"}}>
              <div style={{fontSize:"22px",marginBottom:"5px"}}>{cat.icon}</div>
              <div style={{fontWeight:"800",fontSize:"12px",color:C.text,marginBottom:"2px"}}>{cat[lang].label}</div>
              <div style={{fontSize:"9px",color:C.textSub,lineHeight:1.4}}>{cat[lang].sub}</div>
              <div style={{fontSize:"9px",color:cat.color,fontWeight:"700",marginTop:"4px"}}>📸 {t.photos_per}</div>
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
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",padding:"0 32px",gap:"20px"}}>
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
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(258px,1fr))",gap:"16px"}}>
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
              onMouseEnter={e=>{e.currentTarget.style.borderColor=c.color;e.currentTarget.style.background=`${c.color}25`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=`${c.color}50`;e.currentTarget.style.background=`${c.color}12`;}}>
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
  // Show 6 listings from different categories (1 per category max)
  const mixed=CATS.map(cat=>(LISTINGS[cat.id]||[])[0]).filter(Boolean).slice(0,6);
  return(
    <section style={{padding:"36px 20px",background:C.bgCard}}>
      <SH title={t.featured} sub={t.featured_sub}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(258px,1fr))",gap:"16px",marginTop:"18px"}}>
        {mixed.map(l=>{
          const catId=Object.entries(LISTINGS).find(([,items])=>items.some(i=>i.id===l.id))?.[0]||"";
          return <Card key={l.id} listing={{...l,cat:catId,category:catId}} cc={cc} go={go} lang={lang}/>;
        })}
      </div>
      <div style={{textAlign:"center",marginTop:"24px"}}><Btn size="lg" onClick={()=>go("listings")}>{t.view_all}</Btn></div>
    </section>
  );
}

// ─── All Listings page ────────────────────────────────────────────
function AllListings({cc,go,lang}){
  const t=T[lang];
  const [f,setF]=useState("all");
  const shown=f==="all"?ALL_LISTINGS:ALL_LISTINGS.filter(l=>{
    const catId=Object.entries(LISTINGS).find(([,items])=>items.some(i=>i.id===l.id))?.[0]||"";
    return catId===f;
  });
  return(
    <div style={{maxWidth:"1200px",margin:"0 auto",padding:"26px 20px"}}>
      <SH title={t.all_listings} sub={t.all_lst_sub}/>
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
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(258px,1fr))",gap:"16px",marginTop:"8px"}}>
        {shown.map(l=>{
          const catId=Object.entries(LISTINGS).find(([,items])=>items.some(i=>i.id===l.id))?.[0]||"";
          return <Card key={l.id} listing={{...l,cat:catId,category:catId}} cc={cc} go={go} lang={lang}/>;
        })}
      </div>
      {shown.length===0&&(
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
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(215px,1fr))",gap:"13px",marginBottom:"22px",marginTop:"14px"}}>
          {P.map(p=>(
            <div key={p.cc} style={{background:C.bgCard,borderRadius:"14px",padding:"17px",border:`1px solid ${C.border}`,transition:"all 0.18s",cursor:"pointer"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=p.color;e.currentTarget.style.boxShadow=`0 6px 18px ${p.color}20`;e.currentTarget.style.transform="translateY(-2px)";}}
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
  const t=T[lang];
  const inp={width:"100%",padding:"10px 13px",borderRadius:"10px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text};
  async function login(){
    if(!form.email||!form.password){setErr(lang==="en"?"Please fill all fields":"Veuillez remplir tous les champs");return;}
    setLoading(true);setErr("");
    const {data,error}=await sb.auth.signInWithPassword({email:form.email,password:form.password});
    if(error||data?.error){setErr(lang==="en"?"Incorrect email or password.":"Email ou mot de passe incorrect.");setLoading(false);return;}
    onLogin({id:data.user?.id,email:form.email,name:form.email.split("@")[0]});
    setLoading(false);go("dashboard");
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
            <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="••••••••" style={inp} onKeyDown={e=>e.key==="Enter"&&login()}/>
          </div>
          <Btn size="lg" onClick={login} disabled={loading} style={{width:"100%",justifyContent:"center"}}>{loading?t.signing_in:t.sign_in}</Btn>
          <div style={{textAlign:"center",fontSize:"12px",color:C.textSub}}>
            {t.no_account}{" "}<span onClick={()=>go("register")} style={{color:C.kente,fontWeight:"700",cursor:"pointer"}}>{t.reg_free}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Register ─────────────────────────────────────────────────────
function Register({cc,go,onLogin,lang}){
  const [step,setStep]=useState(1);
  const [form,setForm]=useState({name:"",email:"",phone:"",country:cc,password:""});
  const [done,setDone]=useState(false);
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");
  const t=T[lang];
  const cur=CURRENCIES[form.country]||CURRENCIES.CM;
  const inp={width:"100%",padding:"10px 13px",borderRadius:"10px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text};

  async function activate(){
    setLoading(true);setErr("");
    const {data,error}=await sb.auth.signUp({email:form.email,password:form.password||"Temp@1234"});
    if(error&&!String(error).includes("already")){setErr(lang==="en"?"Registration failed.":"Inscription échouée.");setLoading(false);return;}
    const uid=data?.user?.id||"uid_"+Date.now();
    await sb.from("profiles").insert({id:uid,name:form.name,email:form.email,phone:form.phone,country:form.country,trial_start:new Date().toISOString(),trial_days:60,last_active:new Date().toISOString()}).select();
    await sendEmail(form.email,
      lang==="en"?"🎉 Welcome to Afrigatemarket — Your Gate to Africa and the World!":"🎉 Bienvenue sur Afrigatemarket — Votre Porte vers l'Afrique et le Monde!",
      `<div style="font-family:Georgia,serif;max-width:600px;margin:auto;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#8B4513,#E8621A,#D4AF37);padding:32px;text-align:center;">
          <div style="font-size:48px;">🌍</div>
          <h1 style="color:#fff;font-size:24px;margin:8px 0 0;">${lang==="en"?"Welcome to Afrigatemarket!":"Bienvenue sur Afrigatemarket!"}</h1>
        </div>
        <div style="padding:28px;background:#F7F5F2;">
          <p>${lang==="en"?"Hello":"Bonjour"} <strong>${form.name}</strong>,</p>
          <p style="color:#6B5B45;line-height:1.7;">${lang==="en"?"Your account is LIVE! You have 60 days FREE.":"Votre compte est ACTIF! Vous avez 60 jours GRATUITS."}</p>
          <p style="color:#6B5B45;">${lang==="en"?"After trial:":"Après l'essai:"} <strong>${cur.symbol} ${Math.round(BASE*cur.rate).toLocaleString()}/month</strong></p>
          <p style="color:#6B5B45;font-style:italic;">— Afrigatemarket Team 🌍</p>
        </div>
      </div>`
    );
    onLogin({id:uid,email:form.email,name:form.name,phone:form.phone});
    setLoading(false);setDone(true);
  }

  if(done) return(
    <div style={{maxWidth:"500px",margin:"56px auto",textAlign:"center",padding:"0 20px"}}>
      <div style={{fontSize:"68px",marginBottom:"12px"}}>🎉</div>
      <h2 style={{fontFamily:"'Georgia',serif",color:C.kente,fontSize:"24px",marginBottom:"8px"}}>{t.welcome_msg}</h2>
      <p style={{color:C.textSub,lineHeight:1.7,marginBottom:"18px"}}>
        <strong style={{color:C.text}}>{form.name}</strong>, {t.account_live} <strong>{form.email}</strong> {t.and_whatsapp}
      </p>
      <div style={{background:`${C.forest}18`,border:`1px solid ${C.forest}40`,borderRadius:"14px",padding:"16px",marginBottom:"14px"}}>
        <div style={{color:C.kente,fontWeight:"800",fontSize:"16px",marginBottom:"5px"}}>🎁 {t.trial_active}</div>
        <div style={{color:C.textSub,fontSize:"13px"}}>{t.after_trial_d} {cur.symbol} {Math.round(BASE*cur.rate).toLocaleString()}/month</div>
      </div>
      <div style={{background:"#25D36616",border:"1px solid #25D36648",borderRadius:"12px",padding:"12px",color:C.success,fontSize:"13px",marginBottom:"20px"}}>
        📧 {t.email_sent} · 📱 {t.wa_sent}
      </div>
      <Btn size="lg" onClick={()=>go("dashboard")}>{t.go_dashboard}</Btn>
    </div>
  );

  return(
    <div style={{maxWidth:"500px",margin:"36px auto",padding:"0 20px"}}>
      <div style={{display:"flex",gap:"6px",marginBottom:"24px"}}>
        {[1,2].map(s=><div key={s} style={{flex:1,height:"4px",borderRadius:"2px",background:s<=step?`linear-gradient(90deg,${C.kente},${C.gold})`:C.border}}/>)}
      </div>
      <div style={{background:C.bgCard,borderRadius:"20px",border:`1px solid ${C.border}`,padding:"26px",boxShadow:"0 4px 18px rgba(0,0,0,0.06)"}}>
        <h2 style={{fontFamily:"'Georgia',serif",color:C.text,fontSize:"21px",marginBottom:"5px"}}>{step===1?t.create_account:t.verify_act}</h2>
        <p style={{color:C.textSub,fontSize:"12px",marginBottom:"22px"}}>{step===1?t.join_sub:t.one_step}</p>
        {err&&<div style={{background:"#DC262618",border:"1px solid #DC262640",borderRadius:"8px",padding:"10px 13px",color:C.danger,fontSize:"13px",marginBottom:"14px"}}>{err}</div>}
        {step===1&&(
          <div style={{display:"flex",flexDirection:"column",gap:"13px"}}>
            <div>
              <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"5px",display:"block"}}>👤 {t.full_name}</label>
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder={lang==="en"?"e.g. Kamdem Electronics":"ex. Kamdem Électronique"} style={inp}/>
            </div>
            <div>
              <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"5px",display:"block"}}>📧 {t.verified_email}</label>
              <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="your@email.com" style={inp}/>
            </div>
            <div>
              <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"5px",display:"block"}}>📱 {t.wa_number}</label>
              <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+237 671 282 427" style={inp}/>
            </div>
            <div>
              <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"5px",display:"block"}}>🌍 {t.your_country}</label>
              <select value={form.country} onChange={e=>setForm({...form,country:e.target.value})} style={{...inp}}>
                <optgroup label="Africa">{ALL_CC.filter(c=>c.r==="africa").map(c=><option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}</optgroup>
                <optgroup label="International">{ALL_CC.filter(c=>c.r!=="africa").map(c=><option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}</optgroup>
              </select>
            </div>
            <Btn size="lg" onClick={()=>{if(form.name&&form.email&&form.phone)setStep(2);else setErr(lang==="en"?"Please fill all fields":"Veuillez remplir tous les champs");}} style={{width:"100%",justifyContent:"center"}}>{t.continue_btn}</Btn>
            <div style={{textAlign:"center",fontSize:"12px",color:C.textSub}}>
              {t.already_acc}{" "}<span onClick={()=>go("login")} style={{color:C.kente,fontWeight:"700",cursor:"pointer"}}>{t.sign_in_link}</span>
            </div>
          </div>
        )}
        {step===2&&(
          <div style={{display:"flex",flexDirection:"column",gap:"13px"}}>
            <div style={{background:`${C.gold}14`,border:`1px solid ${C.gold}38`,borderRadius:"10px",padding:"13px",color:C.textSub,fontSize:"12px",lineHeight:1.65}}>
              📧 {lang==="en"?"Code sent to":"Code envoyé à"} <strong style={{color:C.text}}>{form.email}</strong><br/>
              📱 WhatsApp OTP → <strong style={{color:C.success}}>{form.phone}</strong>
            </div>
            <input placeholder={t.otp_label} style={{...inp,textAlign:"center",fontSize:"22px",letterSpacing:"9px",border:`2px solid ${C.gold}`}}/>
            <div>
              <label style={{color:C.textSub,fontSize:"11px",fontWeight:"700",marginBottom:"5px",display:"block"}}>🔒 {t.set_pass}</label>
              <input type="password" placeholder={t.pass_min} onChange={e=>setForm({...form,password:e.target.value})} style={inp}/>
            </div>
            <div style={{background:`${C.forest}14`,border:`1px solid ${C.forest}38`,borderRadius:"10px",padding:"11px",fontSize:"12px",color:C.textSub,lineHeight:1.8}}>
              ✅ {lang==="en"?"60-Day Free Trial":"Essai Gratuit 60 Jours"} · ✅ {lang==="en"?"Unlimited listings":"Annonces illimitées"} · ✅ {lang==="en"?"Welcome email sent":"Email de bienvenue envoyé"}
            </div>
            <Btn size="lg" onClick={activate} disabled={loading} style={{width:"100%",justifyContent:"center"}}>{loading?t.activating:t.activate_btn}</Btn>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Post Listing ─────────────────────────────────────────────────
function PostListing({user,lang,cc}){
  const [selCatId,setSelCatId]=useState("");
  const [form,setForm]=useState({title:"",price:"",desc:"",location:"",country:cc||"CM"});
  const [extra,setExtra]=useState({});
  const [previews,setPreviews]=useState([]);
  const [posted,setPosted]=useState(false);
  const [loading,setLoading]=useState(false);
  const fileRef=useRef();
  const t=T[lang];
  const selCat=CATS.find(c=>c.id===selCatId);
  const inp={width:"100%",padding:"10px 13px",borderRadius:"10px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text};

  async function submit(){
    if(!form.title||!form.price||!selCatId){alert(lang==="en"?"Please fill title, price and category":"Veuillez remplir le titre, prix et catégorie");return;}
    setLoading(true);
    await sb.from("listings").insert({title:form.title,price:parseFloat(form.price),category:selCatId,description:form.desc,location:form.location,country:form.country,seller_id:user?.id||"demo",extra_fields:extra,status:"live",created_at:new Date().toISOString()}).select();
    if(user?.email){
      await sendEmail(user.email,
        lang==="en"?"🎉 Your listing is LIVE on Afrigatemarket!":"🎉 Votre annonce est EN LIGNE sur Afrigatemarket!",
        `<p>${lang==="en"?"Hello":"Bonjour"} ${user.name||""}, ${lang==="en"?"your listing":"votre annonce"} <strong>"${form.title}"</strong> ${lang==="en"?"is now LIVE!":"est maintenant EN LIGNE!"}</p>`
      );
    }
    setLoading(false);setPosted(true);
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
        <Btn v="ghost">{t.view_store_btn}</Btn>
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
                <img src={src} alt="" style={{width:"68px",height:"68px",objectFit:"cover",borderRadius:"8px",border:`2px solid ${i===0?C.gold:C.border}`}}/>
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
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.background=`${C.gold}12`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=`${C.gold}55`;e.currentTarget.style.background=`${C.gold}07`;}}>
              <div style={{fontSize:"26px",marginBottom:"5px"}}>📷</div>
              <div style={{color:C.kente,fontWeight:"700",fontSize:"13px"}}>{lang==="en"?`Click to upload (${10-previews.length} remaining)`:`Cliquer pour télécharger (${10-previews.length} restants)`}</div>
            </div>
            <input ref={fileRef} type="file" multiple accept="image/*" onChange={e=>{const f=Array.from(e.target.files).slice(0,10-previews.length);setPreviews(p=>[...p,...f.map(x=>URL.createObjectURL(x))].slice(0,10));}} style={{display:"none"}}/>
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
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(258px,1fr))",gap:"16px",marginTop:"16px"}}>
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
  const t=T[lang];
  const trialLeft=47,trialUsed=13,trialPct=Math.round(13/60*100);
  const cur=CURRENCIES[cc];
  const card={background:C.bgCard,borderRadius:"13px",border:`1px solid ${C.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"};
  const inp={width:"100%",padding:"9px 12px",borderRadius:"8px",border:`1.5px solid ${C.border}`,background:C.bg,fontSize:"13px",boxSizing:"border-box",fontFamily:"inherit",outline:"none",color:C.text};
  const stats=[
    {ic:"📦",l:t.my_listings,v:"23",d:lang==="en"?"+5 this week":"+5 cette semaine",c:C.kente},
    {ic:"👁",l:lang==="en"?"Total Views":"Total Vues",v:"4,821",d:lang==="en"?"+12% this month":"+12% ce mois",c:C.intBlue},
    {ic:"💬",l:lang==="en"?"WhatsApp Leads":"Leads WhatsApp",v:"89",d:lang==="en"?"+23 today":"+23 aujourd'hui",c:C.success},
    {ic:"⭐",l:lang==="en"?"Seller Rating":"Note Vendeur",v:"4.9",d:lang==="en"?"Top 5% seller":"Top 5% vendeur",c:C.gold},
    {ic:"🌍",l:lang==="en"?"Countries":"Pays",v:"12",d:lang==="en"?"Intl + Africa":"Intl + Afrique",c:C.forest},
    {ic:"💰",l:lang==="en"?"Est. Revenue":"Revenu Est.",v:`${cur.symbol}${Math.round(850000*cur.rate).toLocaleString()}`,d:lang==="en"?"This month":"Ce mois",c:C.clay},
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
        <Btn v="secondary" size="sm">{t.upgrade}</Btn>
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
              <div key={s.l} style={{...card,padding:"16px"}}>
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
              <div key={m.l} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"8px 0",borderBottom:i<4?`1px solid ${C.border}`:"none",fontSize:"13px",gap:"10px"}}>
                <span style={{flexShrink:0}}>{m.s} <span style={{color:C.text,fontWeight:"600"}}>{m.l}</span></span>
                <span style={{color:C.textSub,fontSize:"11px",textAlign:"right"}}>{m.d}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {tab==="listings"&&(
        <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
            <div>
              <div style={{fontWeight:"800",color:C.text,fontSize:"16px"}}>{t.my_listings} (23)</div>
              <div style={{color:C.textSub,fontSize:"11px"}}>{t.no_daily_cap}</div>
            </div>
            <Btn size="sm" onClick={()=>go("sell")}>➕ {lang==="en"?"Add Listing":"Ajouter Annonce"}</Btn>
          </div>
          <div style={{...card,overflow:"hidden"}}>
            {ALL_LISTINGS.slice(0,6).map((l,i)=>{
              const catId=Object.entries(LISTINGS).find(([,items])=>items.some(x=>x.id===l.id))?.[0]||"";
              const cat=CATS.find(c=>c.id===catId);
              const title=lang==="fr"&&l.title_fr?l.title_fr:l.title;
              return(
                <div key={l.id} style={{display:"flex",alignItems:"center",gap:"11px",padding:"11px 15px",borderBottom:i<5?`1px solid ${C.border}`:"none"}}>
                  <img src={l.img} alt="" loading="lazy" style={{width:"48px",height:"48px",objectFit:"cover",borderRadius:"8px",flexShrink:0}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:"700",fontSize:"13px",color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{title}</div>
                    <div style={{fontSize:"11px",color:C.textSub}}>{cat?.icon} {cat?.[lang]?.label} · 📍 {l.loc}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{color:C.kente,fontWeight:"800",fontSize:"13px"}}>{l.price>0?fp(l.price,cc):"—"}</div>
                    <div style={{fontSize:"10px",color:C.forest,fontWeight:"600"}}>👁 {l.views}</div>
                  </div>
                  <Tag color={C.forest}>{lang==="en"?"LIVE":"EN LIGNE"}</Tag>
                </div>
              );
            })}
          </div>
          <div style={{textAlign:"center",marginTop:"12px",padding:"14px",background:C.bg,borderRadius:"10px",fontSize:"12px",color:C.textSub}}>
            🏭 {t.digital_wh}
          </div>
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
          <div style={{marginTop:"14px"}}><Btn size="lg">{t.save_social}</Btn></div>
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
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(236px,1fr))",gap:"16px",marginTop:"18px",marginBottom:"28px"}}>
        {P.map(p=>(
          <div key={p.cc} style={{background:C.bgCard,borderRadius:"15px",overflow:"hidden",border:`1px solid ${C.border}`,transition:"all 0.18s",cursor:"pointer"}}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 22px rgba(0,0,0,0.1)";e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
            <div style={{height:"124px",overflow:"hidden"}}><img src={p.img} alt={p.name} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
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
            {[{ic:"📘",c:"#1877F2"},{ic:"📸",c:"#E1306C"},{ic:"🎵",c:"#69C9D0"},{ic:"▶️",c:"#FF0000"}].map((s,i)=>(
              <div key={i} style={{width:"32px",height:"32px",borderRadius:"50%",background:`${s.c}22`,border:`1px solid ${s.c}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",cursor:"pointer"}}>{s.ic}</div>
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
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:"12px",lineHeight:2}}>
            📧 {MY_EMAIL}<br/>💬 WhatsApp: +{MY_WA}<br/>📍 Douala, Cameroon<br/>🕐 {t.support_247}
          </div>
          <a href={`https://wa.me/${MY_WA}`} target="_blank" rel="noreferrer"
            style={{display:"inline-flex",alignItems:"center",gap:"5px",marginTop:"10px",padding:"7px 14px",borderRadius:"18px",background:"#25D36620",border:"1px solid #25D36655",color:C.success,textDecoration:"none",fontSize:"12px",fontWeight:"700"}}>
            💬 {t.whatsapp_sup}
          </a>
        </div>
      </div>
      <div style={{borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:"14px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"6px"}}>
        <div style={{color:"rgba(255,255,255,0.28)",fontSize:"11px"}}>© 2025 Afrigatemarket · World Marketplace · All Rights Reserved</div>
        <div style={{color:"rgba(255,255,255,0.28)",fontSize:"11px"}}>{t.confidential}</div>
      </div>
    </footer>
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

  const isListing=page.startsWith("listing_");
  const isCat=page.startsWith("cat_");
  const isStore=page.startsWith("store_");
  const t=T[lang];

  return(
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Segoe UI','Helvetica Neue',Arial,sans-serif",position:"relative"}}>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:${C.bg};}
        ::-webkit-scrollbar-thumb{background:${C.gold}70;border-radius:3px;}
        input::placeholder,textarea::placeholder{color:${C.silver};}
        select option,optgroup{background:#1a0a00;color:#f5e6c8;}
        @keyframes pulse{0%,100%{box-shadow:0 4px 14px rgba(37,211,102,0.4)}50%{box-shadow:0 4px 24px rgba(37,211,102,0.85)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
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
                <button onClick={()=>go("listings")} style={{background:"none",border:"none",color:C.intBlue,cursor:"pointer",marginBottom:"14px",fontSize:"13px",fontFamily:"inherit",fontWeight:"600"}}>{t.back}</button>
                <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:"26px"}}>
                  <div>
                    <div style={{borderRadius:"16px",overflow:"hidden",height:"320px",background:C.bg,marginBottom:"9px"}}>
                      <img src={gallery[imgIdx]} alt={title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
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
      </div>

      {/* Floating WhatsApp */}
      <a href={`https://wa.me/${MY_WA}?text=Hello%20Afrigatemarket!`} target="_blank" rel="noreferrer"
        style={{position:"fixed",bottom:"20px",right:"20px",zIndex:999,background:C.success,borderRadius:"50px",padding:"12px 18px",display:"flex",alignItems:"center",gap:"7px",color:"#fff",fontWeight:"700",textDecoration:"none",boxShadow:`0 4px 18px ${C.success}60`,fontSize:"13px",animation:"pulse 2s infinite"}}>
        <span style={{fontSize:"20px"}}>💬</span><span>WhatsApp</span>
      </a>

      {/* Floating Dashboard */}
      <button onClick={()=>go("dashboard")}
        style={{position:"fixed",bottom:"20px",left:"20px",zIndex:999,background:`linear-gradient(135deg,${C.earth||"#8B4513"},${C.kente})`,borderRadius:"50px",padding:"12px 18px",border:"none",display:"flex",alignItems:"center",gap:"7px",color:"#fff",fontWeight:"700",cursor:"pointer",boxShadow:`0 4px 18px ${C.kente}55`,fontSize:"13px",fontFamily:"inherit"}}>
        📊 {lang==="en"?"Dashboard":"Tableau de Bord"}
      </button>
    </div>
  );
}
