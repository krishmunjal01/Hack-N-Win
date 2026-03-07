import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, 'src', 'locales');

const sidebarTranslations = {
  en: {
    "nav_operations": "Operations",
    "nav_system": "System",
    "nav_national_control": "National Control",
    "nav_state_command": "State Command",
    "nav_district_dashboard": "District Dashboard",
    "nav_officer_dashboard": "Officer Dashboard",
    "nav_dashboard": "Dashboard",
    "nav_building_monitor": "Building Monitor",
    "nav_analytics": "Analytics",
    "nav_alerts": "Alerts",
    "nav_contributex": "ContriButeX",
    "nav_citizen_portal": "Citizen Portal",
    "nav_incident_logs": "Incident Logs",
    "nav_settings": "Settings",
    "nav_logout": "Logout",
    "app_title_national": "IDIS National",
    "app_subtitle_command": "Command Center"
  },
  hi: {
    "nav_operations": "संचालन (Operations)",
    "nav_system": "प्रणाली (System)",
    "nav_national_control": "राष्ट्रीय नियंत्रण",
    "nav_state_command": "राज्य कमान",
    "nav_district_dashboard": "जिला डैशबोर्ड",
    "nav_officer_dashboard": "अधिकारी डैशबोर्ड",
    "nav_dashboard": "डैशबोर्ड",
    "nav_building_monitor": "इमारत मॉनिटर",
    "nav_analytics": "एनालिटिक्स",
    "nav_alerts": "अलर्ट",
    "nav_contributex": "ContriButeX",
    "nav_citizen_portal": "नागरिक पोर्टल",
    "nav_incident_logs": "घटना लॉग",
    "nav_settings": "सेटिंग्स",
    "nav_logout": "लॉग आउट",
    "app_title_national": "IDIS राष्ट्रीय",
    "app_subtitle_command": "कमांड सेंटर"
  },
  bn: {
    "nav_operations": "অপারেশনস", "nav_system": "সিস্টেম", "nav_national_control": "জাতীয় নিয়ন্ত্রণ",
    "nav_state_command": "রাজ্য কমান্ড", "nav_district_dashboard": "জেলা ড্যাশবোর্ড",
    "nav_officer_dashboard": "অফিসার ড্যাশবোর্ড", "nav_dashboard": "ড্যাশবোর্ড",
    "nav_building_monitor": "বিল্ডিং মনিটর", "nav_analytics": "বিশ্লেষণ",
    "nav_alerts": "সতর্কতা", "nav_contributex": "ContriButeX", "nav_citizen_portal": "নাগরিক পোর্টাল",
    "nav_incident_logs": "ঘটনা লগ", "nav_settings": "সেটিংস", "nav_logout": "লগআউট",
    "app_title_national": "IDIS জাতীয়", "app_subtitle_command": "কমান্ড সেন্টার"
  },
  te: { "nav_operations": "ఆపరేషన్స్", "nav_system": "సిస్టమ్", "nav_national_control": "జాతీయ నియంత్రణ", "nav_state_command": "రాష్ట్ర కమాండ్", "nav_dashboard": "డాష్‌బోర్డ్", "nav_building_monitor": "భవన మానిటర్", "nav_analytics": "విశ్లేషణలు", "nav_alerts": "హెచ్చరికలు", "nav_citizen_portal": "పౌర పోర్టల్", "nav_settings": "సెట్టింగ్‌లు", "nav_logout": "లాగ్అవుట్", "app_title_national": "IDIS జాతీయ", "nav_incident_logs": "సంఘటన లాగ్‌లు", "app_subtitle_command": "కమాండ్ సెంటర్", "nav_district_dashboard": "జిల్లా డాష్‌బోర్డ్", "nav_officer_dashboard": "అధికారి డాష్‌బోర్డ్", "nav_contributex": "ContriButeX" },
  mr: { "nav_operations": "ऑपरेशन्स", "nav_system": "प्रणाली", "nav_dashboard": "डॅशबोर्ड", "nav_national_control": "राष्ट्रीय नियंत्रण", "nav_state_command": "राज्य कमांड", "nav_building_monitor": "इमारत मॉनिटर", "nav_analytics": "अॅनालिटिक्स", "nav_alerts": "अलर्ट", "nav_citizen_portal": "नागरिक पोर्टल", "nav_logout": "लॉग आउट", "app_title_national": "IDIS राष्ट्रीय", "app_subtitle_command": "कमांड सेंटर", "nav_district_dashboard": "जिल्हा डॅशबोर्ड", "nav_officer_dashboard": "अधिकारी डॅशबोर्ड", "nav_contributex": "ContriButeX", "nav_incident_logs": "घटना लॉग", "nav_settings": "सेटिंग्ज" }
};

const langs = ['en', 'hi', 'bn', 'te', 'mr', 'ta', 'ur', 'gu', 'kn', 'or', 'ml', 'pa'];

langs.forEach(lang => {
  const file = path.join(localesDir, lang, 'translation.json');
  let current = {};
  if (fs.existsSync(file)) {
    current = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  
  const updates = sidebarTranslations[lang] || sidebarTranslations['en'];
  const updated = { ...current, ...updates };
  
  fs.writeFileSync(file, JSON.stringify(updated, null, 2));
  console.log(`Updated translations for Sidebar keys in ${lang}`);
});
