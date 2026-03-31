import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation Dictionaries
const resources = {
  en: {
    translation: {
      "nav": {
        "explore": "Explore",
        "my_swaps": "My Swaps",
        "saved": "Saved",
        "messages": "Messages"
      },
      "hero": {
        "title_1": "Swap what you",
        "title_2": "have",
        "title_3": "for what you",
        "title_4": "want.",
        "search_placeholder": "Search for cameras, laptops, clothes...",
        "list_item_btn": "List an Item"
      },
      "categories": {
        "all": "All",
        "electronics": "Electronics",
        "fashion": "Fashion",
        "home": "Home",
        "sports": "Sports"
      },
      "profile": {
        "account_summary": "Account Summary",
        "preferences": "Preferences",
        "live_listings": "Live Listings",
        "total_offers": "Total Offers",
        "recent_activity": "Recent Swap Activity",
        "no_activity": "No recent swap activity to show.",
        "theme": "App Theme",
        "theme_desc": "Toggle dark mode visual interface.",
        "lang": "Display Language",
        "lang_desc": "Select UI translation.",
        "logout": "Log Out of Account",
        "enable_dark": "Enable Dark",
        "enable_light": "Enable Light"
      },
      "app": {
        "value": "Value",
        "years_old": "y old",
        "offer_swap": "Offer Swap",
        "offers_sent": "Offers I've Sent",
        "no_offers": "You haven't offered any swaps yet.",
        "offered_to": "Offered to",
        "on": "on",
        "cancel": "Cancel",
        "items_listed": "Items I've Listed",
        "no_listings": "You haven't listed any items yet.",
        "active_listing": "Active Listing",
        "delete": "Delete",
        "saved_items": "Saved Items",
        "no_saved": "You haven't saved any items yet."
      }
    }
  },
  te: {
    translation: {
      "nav": {
        "explore": "అన్వేషించండి",
        "my_swaps": "నా మార్పిడులు",
        "saved": "సేవ్ చేయబడినవి",
        "messages": "సందేశాలు"
      },
      "hero": {
        "title_1": "మీ వద్ద ఉన్నవాటిని",
        "title_2": "మార్చుకోండి",
        "title_3": "మీకు కావలసిన",
        "title_4": "వాటికోసం.",
        "search_placeholder": "కెమెరాలు, ల్యాప్‌టాప్‌లు, బట్టల కోసం వెతకండి...",
        "list_item_btn": "వస్తువుని జాబితా చేయండి"
      },
      "categories": {
        "all": "అన్నీ",
        "electronics": "ఎలక్ట్రానిక్స్",
        "fashion": "ఫ్యాషన్",
        "home": "ఇల్లు",
        "sports": "క్రీడలు"
      },
      "profile": {
        "account_summary": "ఖాతా సారాంశం",
        "preferences": "ప్రాధాన్యతలు",
        "live_listings": "లైవ్ లిస్టింగ్స్",
        "total_offers": "మొత్తం ఆఫర్లు",
        "recent_activity": "ఇటీవలి మార్పిడి కార్యాచరణ",
        "no_activity": "చూపించడానికి ఇటీవలి కార్యాచరణ లేదు.",
        "theme": "యాప్ థీమ్",
        "theme_desc": "డార్క్ మోడ్ విజువల్ ఇంటర్‌ఫేస్‌ను టోగుల్ చేయండి.",
        "lang": "ప్రదర్శన భాష",
        "lang_desc": "UI అనువాదాన్ని ఎంచుకోండి.",
        "logout": "ఖాతా నుండి లాగ్ అవుట్ చేయండి",
        "enable_dark": "డార్క్ మోడ్ ప్రారంభించండి",
        "enable_light": "లైట్ మోడ్ ప్రారంభించండి"
      },
      "app": {
        "value": "విలువ",
        "years_old": "ఏళ్ల వయసు",
        "offer_swap": "ఆఫర్ స్వప్",
        "offers_sent": "నేను పంపిన ఆఫర్‌లు",
        "no_offers": "మీరు ఇంకా ఎలాంటి మార్పిడులను ఆఫర్ చేయలేదు.",
        "offered_to": "ఆఫర్ చేయబడింది",
        "on": "తేదీ",
        "cancel": "రద్దు",
        "items_listed": "నేను జాబితా చేసిన వస్తువులు",
        "no_listings": "మీరు ఇంకా ఎలాంటి వస్తువులను జాబితా చేయలేదు.",
        "active_listing": "యాక్టివ్ లిస్టింగ్",
        "delete": "తొలగించు",
        "saved_items": "సేవ్ చేయబడిన వస్తువులు",
        "no_saved": "మీరు ఇంకా ఏ వస్తువులనూ సేవ్ చేయలేదు."
      }
    }
  },
  ta: {
    translation: {
      "nav": {
        "explore": "ஆராயுங்கள்",
        "my_swaps": "என் பரிமாற்றங்கள்",
        "saved": "சேமிக்கப்பட்டது",
        "messages": "செய்திகள்"
      },
      "hero": {
        "title_1": "உங்களிடம் இருப்பதை",
        "title_2": "மாற்றுங்கள்",
        "title_3": "உங்களுக்கு தேவையான",
        "title_4": "பொருளுக்காக.",
        "search_placeholder": "கேமராக்கள், மடிக்கணினிகள், உடைகளைத் தேடுங்கள்...",
        "list_item_btn": "பொருளை பட்டியலிடவும்"
      },
      "categories": {
        "all": "அனைத்தும்",
        "electronics": "மின்னணு",
        "fashion": "ஃபேஷன்",
        "home": "வீடு",
        "sports": "விளையாட்டு"
      },
      "profile": {
        "account_summary": "கணக்கு சுருக்கம்",
        "preferences": "விருப்பத்தேர்வுகள்",
        "live_listings": "நேரடி பட்டியல்கள்",
        "total_offers": "மொத்த சலுகைகள்",
        "recent_activity": "சமீபத்திய பரிமாற்ற செயல்பாடு",
        "no_activity": "சமீபத்திய பரிமாற்ற செயல்பாடு இல்லை.",
        "theme": "முக்கிய தீம்",
        "theme_desc": "டார்க் மோட் இடைமுகத்தை நிலைமாற்று.",
        "lang": "காட்சி மொழி",
        "lang_desc": "பயனர் இடைமுக மொழியைத் தேர்ந்தெடுக்கவும்.",
        "logout": "வெளியேறு",
        "enable_dark": "டார்க் மோடை இயக்கு",
        "enable_light": "லைட் மோடை இயக்கு"
      },
      "app": {
        "value": "மதிப்பு",
        "years_old": "வயது",
        "offer_swap": "பரிமாற்றத்தை வழங்கு",
        "offers_sent": "நான் அனுப்பிய சலுகைகள்",
        "no_offers": "நீங்கள் இன்னும் எந்த சலுகைகளையும் வழங்கவில்லை.",
        "offered_to": "வழங்கப்பட்டது",
        "on": "அன்று",
        "cancel": "ரத்துசெய்",
        "items_listed": "பட்டியலிடப்பட்டுள்ள பொருட்கள்",
        "no_listings": "நீங்கள் இன்னும் எந்தப் பொருட்களையும் பட்டியலிடவில்லை.",
        "active_listing": "செயலில் உள்ள பட்டியல்",
        "delete": "நீக்கு",
        "saved_items": "சேமிக்கப்பட்ட பொருட்கள்",
        "no_saved": "நீங்கள் இன்னும் எந்த பொருட்களையும் சேமிக்கவில்லை."
      }
    }
  },
  es: {
    translation: {
      "nav": {
        "explore": "Explorar",
        "my_swaps": "Mis Intercambios",
        "saved": "Guardado",
        "messages": "Mensajes"
      },
      "hero": {
        "title_1": "Intercambia lo que",
        "title_2": "tienes",
        "title_3": "por lo que",
        "title_4": "quieres.",
        "search_placeholder": "Buscar cámaras, laptops, ropa...",
        "list_item_btn": "Publicar Artículo"
      },
      "categories": {
        "all": "Todo",
        "electronics": "Electrónica",
        "fashion": "Moda",
        "home": "Hogar",
        "sports": "Deportes"
      },
      "profile": {
        "account_summary": "Resumen de Cuenta",
        "preferences": "Preferencias",
        "live_listings": "Publicaciones Activas",
        "total_offers": "Ofertas Totales",
        "recent_activity": "Actividad Reciente",
        "no_activity": "No hay actividad reciente para mostrar.",
        "theme": "Tema de la App",
        "theme_desc": "Alternar interfaz en modo oscuro.",
        "lang": "Idioma de visualización",
        "lang_desc": "Seleccionar idioma.",
        "logout": "Cerrar sesión",
        "enable_dark": "Modo Oscuro",
        "enable_light": "Modo Claro"
      }
    }
  },
  fr: {
    translation: {
      "nav": {
        "explore": "Explorer",
        "my_swaps": "Mes Échanges",
        "saved": "Sauvegardé",
        "messages": "Messages"
      },
      "hero": {
        "title_1": "Échangez ce que vous",
        "title_2": "avez",
        "title_3": "pour ce que vous",
        "title_4": "voulez.",
        "search_placeholder": "Rechercher des appareils photo, ordinateurs portables, vêtements...",
        "list_item_btn": "Lister un article"
      },
      "categories": {
        "all": "Tout",
        "electronics": "Électronique",
        "fashion": "Mode",
        "home": "Maison",
        "sports": "Sports"
      },
      "profile": {
        "account_summary": "Résumé du Compte",
        "preferences": "Préférences",
        "live_listings": "Annonces Actives",
        "total_offers": "Offres Totales",
        "recent_activity": "Activité Récente",
        "no_activity": "Aucune activité récente à afficher.",
        "theme": "Thème de l'App",
        "theme_desc": "Basculer l'interface en mode sombre.",
        "lang": "Langue d'Affichage",
        "lang_desc": "Sélectionner la traduction UI.",
        "logout": "Se Déconnecter",
        "enable_dark": "Activer Sombre",
        "enable_light": "Activer Clair"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already escapes values natively
    }
  });

export default i18n;
