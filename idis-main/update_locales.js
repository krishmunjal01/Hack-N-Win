import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, 'src', 'locales');

const translations = {
  en: {
    "app_name": "IDIS",
    "welcome": "Welcome to IDIS",
    "login": "Officer Login",
    "register": "Register",
    "dashboard": "Dashboard",
    "citizen_portal": "Citizen Portal",
    "contribute": "ContriButeX Initiative"
  },
  hi: {
    "app_name": "आईडीआईएस (IDIS)",
    "welcome": "IDIS में आपका स्वागत है",
    "login": "लॉग इन",
    "register": "पंजीकरण",
    "dashboard": "डैशबोर्ड",
    "citizen_portal": "नागरिक पोर्टल",
    "contribute": "योगदान (Contribute)"
  },
  bn: {
    "app_name": "আইডিআইএস (IDIS)",
    "welcome": "IDIS এ স্বাগতম",
    "login": "লগইন",
    "register": "নিবন্ধন",
    "dashboard": "ড্যাশবোর্ড",
    "citizen_portal": "নাগরিক পোর্টাল",
    "contribute": "অবদান (Contribute)"
  },
  te: {
    "app_name": "ఐడిఐఎస్ (IDIS)",
    "welcome": "IDIS కు స్వాగతం",
    "login": "లాగిన్",
    "register": "నమోదు",
    "dashboard": "డాష్‌బోర్డ్",
    "citizen_portal": "పౌర పోర్టల్",
    "contribute": "సహకారం (Contribute)"
  },
  mr: {
    "app_name": "आयडीआयएस (IDIS)",
    "welcome": "IDIS मध्ये आपले स्वागत आहे",
    "login": "लॉगिन",
    "register": "नोंदणी",
    "dashboard": "डॅशबोर्ड",
    "citizen_portal": "नागरिक पोर्टल",
    "contribute": "योगदान (Contribute)"
  },
  ta: {
    "app_name": "ஐடிஐஎஸ் (IDIS)",
    "welcome": "IDIS க்கு வருக",
    "login": "உள்நுழை",
    "register": "பதிவு",
    "dashboard": "டாஷ்போர்டு",
    "citizen_portal": "குடிமக்கள் போர்ட்டல்",
    "contribute": "பங்களிப்பு (Contribute)"
  },
  ur: {
    "app_name": "آئی ڈی آئی ایس (IDIS)",
    "welcome": "IDIS میں خوش آمدید",
    "login": "لاگ ان",
    "register": "رجسٹر",
    "dashboard": "ڈیش بورڈ",
    "citizen_portal": "سٹیزن پورٹل",
    "contribute": "تعاون (Contribute)"
  },
  gu: {
    "app_name": "આઈડીઆઈએસ (IDIS)",
    "welcome": "IDIS માં આપનું સ્વાગત છે",
    "login": "લૉગિન",
    "register": "નોંધણી",
    "dashboard": "ડેશબોર્ડ",
    "citizen_portal": "નાગરિક પોર્ટલ",
    "contribute": "યોગદાન (Contribute)"
  },
  kn: {
    "app_name": "ಐಡಿಐಎಸ್ (IDIS)",
    "welcome": "IDIS ಗೆ ಸುಸ್ವಾಗತ",
    "login": "ಲಾಗಿನ್",
    "register": "ನೋಂದಣಿ",
    "dashboard": "ಡ್ಯಾಶ್ಬೋರ್ಡ್",
    "citizen_portal": "ನಾಗರಿಕ ಪೋರ್ಟಲ್",
    "contribute": "ಕೊಡುಗೆ (Contribute)"
  },
  or: {
    "app_name": "ଆଇଡିଆଇଏସ୍ (IDIS)",
    "welcome": "IDIS କୁ ସ୍ୱାଗତ",
    "login": "ଲଗଇନ୍",
    "register": "ପଞ୍ଜିକରଣ",
    "dashboard": "ଡାସବୋର୍ଡ",
    "citizen_portal": "ନାଗରିକ ପୋର୍ଟାଲ୍",
    "contribute": "ଯୋଗଦାନ (Contribute)"
  },
  ml: {
    "app_name": "ഐഡിഐഎസ് (IDIS)",
    "welcome": "IDIS ലേക്ക് സ്വാഗതം",
    "login": "ലോഗിൻ",
    "register": "രജിസ്റ്റർ",
    "dashboard": "ഡാഷ്ബോർഡ്",
    "citizen_portal": "സിറ്റിസൺ പോർട്ടൽ",
    "contribute": "സംഭാവന (Contribute)"
  },
  pa: {
    "app_name": "ਆਈਡੀਆਈਐਸ (IDIS)",
    "welcome": "IDIS ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ",
    "login": "ਲਾਗਇਨ",
    "register": "ਰਜਿਸਟਰ",
    "dashboard": "ਡੈਸ਼ਬੋਰਡ",
    "citizen_portal": "ਸਿਟੀਜ਼ਨ ਪੋਰਟਲ",
    "contribute": "ਯੋਗਦਾਨ (Contribute)"
  }
};

Object.entries(translations).forEach(([lang, data]) => {
  const file = path.join(localesDir, lang, 'translation.json');
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`Updated translations for ${lang}`);
});
