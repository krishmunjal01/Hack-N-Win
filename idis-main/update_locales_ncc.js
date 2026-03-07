import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, 'src', 'locales');

const nccTranslations = {
  en: {
    "ncc_title": "National Control Center",
    "ncc_subtitle": "Real-time disaster intelligence overview across India",
    "ncc_total_buildings": "Total Buildings",
    "ncc_critical_incidents": "Critical Incidents",
    "ncc_active_alerts": "Active Alerts",
    "ncc_states_monitored": "States Monitored",
    "ncc_avg_risk_index": "Avg Risk Index",
    "ncc_evacuations_today": "Evacuations Today",
    "ncc_india_risk_map": "India Risk Map",
    "ncc_alerts": "alerts",
    "ncc_risk": "Risk",
    "ncc_filter": "Filter",
    "ncc_all_states": "All States",
    "ncc_normal": "Normal",
    "ncc_alert": "Alert",
    "ncc_dangerous": "Dangerous",
    "ncc_critical": "Critical",
    "ncc_risk_score": "Risk Score",
    "ncc_buildings": "Buildings"
  },
  hi: {
    "ncc_title": "राष्ट्रीय नियंत्रण केंद्र",
    "ncc_subtitle": "संपूर्ण भारत में रीयल-टाइम आपदा बुद्धिमत्ता अवलोकन",
    "ncc_total_buildings": "कुल इमारतें",
    "ncc_critical_incidents": "गंभीर घटनाएं",
    "ncc_active_alerts": "सक्रिय अलर्ट",
    "ncc_states_monitored": "राज्यों की निगरानी",
    "ncc_avg_risk_index": "औसत जोखिम सूचकांक",
    "ncc_evacuations_today": "आज की निकासी",
    "ncc_india_risk_map": "भारत जोखिम मानचित्र",
    "ncc_alerts": "अलर्ट",
    "ncc_risk": "जोखिम",
    "ncc_filter": "फ़िल्टर",
    "ncc_all_states": "सभी राज्य",
    "ncc_normal": "सामान्य",
    "ncc_alert": "अलर्ट",
    "ncc_dangerous": "खतरनाक",
    "ncc_critical": "गंभीर",
    "ncc_risk_score": "जोखिम स्कोर",
    "ncc_buildings": "इमारतें"
  },
  bn: {
    "ncc_title": "জাতীয় নিয়ন্ত্রণ কেন্দ্র", "ncc_subtitle": "ভারতজুড়ে রিয়েল-টাইম দুর্যোগ বুদ্ধিমত্তার ওভারভিউ",
    "ncc_total_buildings": "মোট ভবন", "ncc_critical_incidents": "গুরুতর ঘটনা", "ncc_active_alerts": "সক্রিয় সতর্কতা",
    "ncc_states_monitored": "রাজ্যগুলি পর্যবেক্ষণে", "ncc_avg_risk_index": "গড় ঝুঁকি সূচক", "ncc_evacuations_today": "আজকে সরিয়ে নেওয়া",
    "ncc_india_risk_map": "ভারতের ঝুঁকি মানচিত্র", "ncc_alerts": "সতর্কতা", "ncc_risk": "ঝুঁকি", "ncc_filter": "ফিল্টার",
    "ncc_all_states": "সব রাজ্য", "ncc_normal": "স্বাভাবিক", "ncc_alert": "সতর্কতা", "ncc_dangerous": "বিপজ্জনক",
    "ncc_critical": "সঙ্কটজনক", "ncc_risk_score": "ঝুঁকি স্কোর", "ncc_buildings": "ভবন"
  },
  te: {
    "ncc_title": "జాతీయ నియంత్రణ కేంద్రం", "ncc_subtitle": "భారతదేశ వ్యాప్తంగా రియల్-టైమ్ విపత్తు మేధస్సు అవలోకనం",
    "ncc_total_buildings": "మొత్తం భవనాలు", "ncc_critical_incidents": "క్లిష్టమైన సంఘటనలు", "ncc_active_alerts": "క్రియాశీల హెచ్చరికలు",
    "ncc_states_monitored": "పర్యవేక్షించబడుతున్న రాష్ట్రాలు", "ncc_avg_risk_index": "సగటు రిస్క్ ఇండెక్స్", "ncc_evacuations_today": "ఈరోజు తరలింపులు",
    "ncc_india_risk_map": "భారతదేశ ప్రమాద పటం", "ncc_alerts": "హెచ్చరికలు", "ncc_risk": "ప్రమాదం", "ncc_filter": "ఫిల్టర్",
    "ncc_all_states": "అన్ని రాష్ట్రాలు", "ncc_normal": "సాధారణం", "ncc_alert": "హెచ్చరిక", "ncc_dangerous": "ప్రమాదకరం",
    "ncc_critical": "విపత్కరమైనది", "ncc_risk_score": "ప్రమాద స్కోరు", "ncc_buildings": "భవనాలు"
  },
  mr: {
    "ncc_title": "राष्ट्रीय नियंत्रण केंद्र", "ncc_subtitle": "संपूर्ण भारतभर रिअल-टाइम आपत्ती बुद्धिमत्ता विहंगावलोकन",
    "ncc_total_buildings": "एकूण इमारती", "ncc_critical_incidents": "गंभीर घटना", "ncc_active_alerts": "सक्रिय अलर्ट",
    "ncc_states_monitored": "निरीक्षण केलेली राज्ये", "ncc_avg_risk_index": "सरासरी जोखीम निर्देशांक", "ncc_evacuations_today": "आजचे स्थलांतर",
    "ncc_india_risk_map": "भारताचा जोखीम नकाशा", "ncc_alerts": "अलर्ट", "ncc_risk": "जोखीम", "ncc_filter": "फिल्टर",
    "ncc_all_states": "सर्व राज्ये", "ncc_normal": "सामान्य", "ncc_alert": "अलर्ट", "ncc_dangerous": "धोकादायक",
    "ncc_critical": "गंभीर", "ncc_risk_score": "जोखीम स्कोअर", "ncc_buildings": "इमारती"
  },
  ta: {
    "ncc_title": "தேசிய கட்டுப்பாட்டு மையம்", "ncc_subtitle": "இந்தியா முழுவதும் நிகழ் நேர பேரிடர் நுண்ணறிவு",
    "ncc_total_buildings": "மொத்த கட்டிடங்கள்", "ncc_critical_incidents": "முக்கிய சம்பவங்கள்", "ncc_active_alerts": "எச்சரிக்கைகள்",
    "ncc_states_monitored": "கண்காணிக்கப்படும் மாநிலங்கள்", "ncc_avg_risk_index": "சராசரி ஆபத்து குறியீடு", "ncc_evacuations_today": "இன்று வெளியேற்றப்பட்டவர்கள்",
    "ncc_india_risk_map": "இந்தியா ஆபத்து வரைபடம்", "ncc_alerts": "எச்சரிக்கைகள்", "ncc_risk": "ஆபத்து", "ncc_filter": "வடிகட்டி",
    "ncc_all_states": "அனைத்து மாநிலங்கள்", "ncc_normal": "சாதாரண", "ncc_alert": "எச்சரிக்கை", "ncc_dangerous": "ஆபத்தான",
    "ncc_critical": "நெருக்கடியான", "ncc_risk_score": "ஆபத்து மதிப்பெண்", "ncc_buildings": "கட்டிடங்கள்"
  },
  ur: {
    "ncc_title": "نیشنل کنٹرول سینٹر", "ncc_subtitle": "بھارت بھر میں ریئل ٹائم تباہی کی معلومات", "ncc_total_buildings": "کل عمارتیں", "ncc_critical_incidents": "سنگین واقعات", "ncc_active_alerts": "فعال الرٹس", "ncc_states_monitored": "ریاستوں کی نگرانی", "ncc_avg_risk_index": "اوسط خطرے کا اشاریہ", "ncc_evacuations_today": "آج کے انخلاء", "ncc_india_risk_map": "بھارت کا رسک میپ", "ncc_alerts": "الرٹس", "ncc_risk": "خطرہ", "ncc_filter": "فلٹر", "ncc_all_states": "تمام ریاستیں", "ncc_normal": "نارمل", "ncc_alert": "الرٹ", "ncc_dangerous": "خطرناک", "ncc_critical": "سنگین", "ncc_risk_score": "خطرہ سکور", "ncc_buildings": "عمارتیں"
  }
};

const langs = ['en', 'hi', 'bn', 'te', 'mr', 'ta', 'ur', 'gu', 'kn', 'or', 'ml', 'pa'];

langs.forEach(lang => {
  const file = path.join(localesDir, lang, 'translation.json');
  let current = {};
  if (fs.existsSync(file)) {
    current = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  
  const updates = nccTranslations[lang] || nccTranslations['en'];
  const updated = { ...current, ...updates };
  
  fs.writeFileSync(file, JSON.stringify(updated, null, 2));
  console.log(`Updated translations for NCC keys in ${lang}`);
});
