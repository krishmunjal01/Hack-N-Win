import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, 'src', 'locales');

const newTranslations = {
  en: {
    "cp_title": "IDIS Citizen Portal",
    "home": "Home",
    "cp_nearby_alerts": "Nearby Alerts",
    "cp_safety_guidelines": "Safety Guidelines",
    "cp_emergency_helplines": "Emergency Helplines",
    "cp_disaster_awareness": "Disaster Awareness",
    "cp_report_anomaly": "Found an anomaly in building? Report here",
    
    "cp_g1_title": "Fire Emergency",
    "cp_g1_s1": "Stay low, crawl under smoke",
    "cp_g1_s2": "Feel doors before opening",
    "cp_g1_s3": "Use stairs, never elevators",
    "cp_g1_s4": "Call 101 immediately",
    
    "cp_g2_title": "Earthquake",
    "cp_g2_s1": "Drop, Cover, Hold On",
    "cp_g2_s2": "Stay away from windows",
    "cp_g2_s3": "If outdoors, move to open area",
    "cp_g2_s4": "After shaking, check for injuries",
    
    "cp_g3_title": "Gas Leak",
    "cp_g3_s1": "Do not use electrical switches",
    "cp_g3_s2": "Open windows for ventilation",
    "cp_g3_s3": "Evacuate immediately",
    "cp_g3_s4": "Call emergency services",
    
    "cp_g4_title": "Building Collapse",
    "cp_g4_s1": "If trapped, tap on surfaces",
    "cp_g4_s2": "Cover mouth with cloth",
    "cp_g4_s3": "Do not move heavy debris",
    "cp_g4_s4": "Wait for rescue teams",
    
    "cp_h1": "National Emergency",
    "cp_h2": "Fire Service",
    "cp_h3": "Disaster Helpline (NDMA)",
    "cp_h4": "Ambulance",
    "cp_h5": "Police",
    
    "cp_da1_title": "Prepare Your Home",
    "cp_da1_desc": "Keep emergency supplies, first-aid kits, and important documents accessible. Install smoke detectors and fire extinguishers.",
    "cp_da2_title": "Know Your Exits",
    "cp_da2_desc": "Familiarize yourself with evacuation routes in your building, workplace. Practice evacuation drills regularly.",
    "cp_da3_title": "Stay Informed",
    "cp_da3_desc": "Follow IDIS alerts and local emergency broadcasts. Register for NDMA SMS alerts. Keep emergency numbers saved."
  },
  hi: {
    "cp_title": "IDIS नागरिक पोर्टल",
    "home": "होम",
    "cp_nearby_alerts": "आसपास के अलर्ट",
    "cp_safety_guidelines": "सुरक्षा दिशानिर्देश",
    "cp_emergency_helplines": "आपातकालीन हेल्पलाइन",
    "cp_disaster_awareness": "आपदा जागरूकता",
    "cp_report_anomaly": "इमारत में कोई विसंगति मिली? यहां रिपोर्ट करें",
    
    "cp_g1_title": "अग्नि आपातकाल",
    "cp_g1_s1": "नीचे रहें, धुएं के नीचे रेंगें",
    "cp_g1_s2": "खोलने से पहले दरवाजों को महसूस करें",
    "cp_g1_s3": "सीढ़ियों का उपयोग करें, कभी लिफ्ट का नहीं",
    "cp_g1_s4": "तुरंत 101 पर कॉल करें",
    
    "cp_g2_title": "भूकंप",
    "cp_g2_s1": "झुकें, कवर लें, और पकड़ें",
    "cp_g2_s2": "खिड़कियों से दूर रहें",
    "cp_g2_s3": "यदि बाहर हैं, तो खुले क्षेत्र में जाएं",
    "cp_g2_s4": "हिलने के बाद, चोटों की जांच करें",
    
    "cp_g3_title": "गैस रिसाव",
    "cp_g3_s1": "इलेक्ट्रिकल स्विच का उपयोग न करें",
    "cp_g3_s2": "वेंटिलेशन के लिए खिड़कियां खोलें",
    "cp_g3_s3": "तुरंत बाहर निकलें",
    "cp_g3_s4": "आपातकालीन सेवाओं को कॉल करें",
    
    "cp_g4_title": "इमारत ढहना",
    "cp_g4_s1": "यदि फंसे हैं, तो सतहों पर टैप करें",
    "cp_g4_s2": "मुंह को कपड़े से ढकें",
    "cp_g4_s3": "भारी मलबे को न हटाएं",
    "cp_g4_s4": "बचाव दलों की प्रतीक्षा करें",
    
    "cp_h1": "राष्ट्रीय आपातकाल",
    "cp_h2": "अग्निशमन सेवा",
    "cp_h3": "आपदा हेल्पलाइन (NDMA)",
    "cp_h4": "एम्बुलेंस",
    "cp_h5": "पुलिस",
    
    "cp_da1_title": "अपना घर तैयार करें",
    "cp_da1_desc": "आपात आपूर्ति, प्राथमिक चिकित्सा किट और दस्तावेज़ सुलभ रखें। स्मोक डिटेक्टर लगाएं।",
    "cp_da2_title": "अपने निकास द्वार जानें",
    "cp_da2_desc": "अपने भवन में निकासी रास्तों से परिचित हों। नियमित रूप से निकास अभ्यास करें।",
    "cp_da3_title": "सूचित रहें",
    "cp_da3_desc": "IDIS अलर्ट और स्थानीय प्रसारण का पालन करें। आपातकालीन नंबर सहेज कर रखें।"
  },
  bn: {
    "cp_title": "IDIS নাগরিক পোর্টাল", "home": "হোম",
    "cp_nearby_alerts": "কাছাকাছি সতর্কতা", "cp_safety_guidelines": "নিরাপত্তা নির্দেশিকা",
    "cp_emergency_helplines": "জরুরি হেল্পলাইন", "cp_disaster_awareness": "দুর্যোগ সচেতনতা",
    "cp_report_anomaly": "ভবনে কোনো অসঙ্গতি পেয়েছেন? এখানে রিপোর্ট করুন",
    
    "cp_g1_title": "অগ্নি জরুরি অবস্থা", "cp_g1_s1": "নিচু হয়ে থাকুন", "cp_g1_s2": "খোলার আগে দরজা অনুভব করুন", "cp_g1_s3": "সিঁড়ি ব্যবহার করুন", "cp_g1_s4": "101 এ কল করুন",
    "cp_g2_title": "ভূমিকম্প", "cp_g2_s1": "নিচু হন, কভার নিন, ধরে রাখুন", "cp_g2_s2": "জানালা থেকে দূরে থাকুন", "cp_g2_s3": "বাইরে থাকলে খোলা জায়গায় যান", "cp_g2_s4": "আঘাত পরীক্ষা করুন",
    "cp_g3_title": "গ্যাস লিক", "cp_g3_s1": "বৈদ্যুতিক সুইচ ব্যবহার করবেন না", "cp_g3_s2": "জানালা খুলুন", "cp_g3_s3": "অবিলম্বে ত্যাগ করুন", "cp_g3_s4": "জরুরি সেবায় কল করুন",
    "cp_g4_title": "বিল্ডিং ধস", "cp_g4_s1": "আটকে থাকলে শব্দ করুন", "cp_g4_s2": "মুখ কাপড় দিয়ে ঢেকে রাখুন", "cp_g4_s3": "ভারী ধ্বংসস্তূপ সরাবেন না", "cp_g4_s4": "উদ্ধারকারী দলের জন্য অপেক্ষা করুন",
    
    "cp_h1": "জাতীয় জরুরি অবস্থা", "cp_h2": "ফায়ার সার্ভিস", "cp_h3": "দুর্যোগ হেল্পলাইন (NDMA)", "cp_h4": "অ্যাম্বুলেন্স", "cp_h5": "পুলিশ",
    
    "cp_da1_title": "আপনার বাড়ি প্রস্তুত করুন", "cp_da1_desc": "জরুরি সরঞ্জাম এবং প্রাথমিক চিকিৎসা কিট সাথে রাখুন।",
    "cp_da2_title": "আপনার প্রস্থান জানুন", "cp_da2_desc": "আপনার ভবনের প্রস্থান রুট জানুন।",
    "cp_da3_title": "আপডেট থাকুন", "cp_da3_desc": "IDIS সতর্কতা অনুসরণ করুন।"
  },
  te: { "cp_title": "IDIS పౌర పోర్టల్", "home": "హోమ్", "cp_nearby_alerts": "సమీప హెచ్చరికలు", "cp_safety_guidelines": "భద్రత మార్గదర్శకాలు", "cp_emergency_helplines": "అత్యవసర హెల్ప్‌లైన్లు", "cp_disaster_awareness": "విపత్తు అవగాహన", "cp_report_anomaly": "భవనంలో లోపాన్ని కనుగొనారా? ఇక్కడ నివేదించండి", "cp_g1_title": "అగ్ని ప్రమాదం", "cp_g1_s1": "కింద పడుకుని ముందుకు సాగండి", "cp_g1_s2": "తలుపులు తెరవడానికి ముందు వేడిని తనిఖీ చేయండి", "cp_g1_s3": "మెట్లని వాడండి", "cp_g1_s4": "101 కి కాల్ చేయండి", "cp_g2_title": "భూకంపం", "cp_g2_s1": "కింద కూర్చోండి, రక్షణ పొందండి, పట్టుకోండి", "cp_g2_s2": "కిటికీల నుండి దూరంగా ఉండండి", "cp_g2_s3": "బయట ఉంటే, బహిరంగ ప్రదేశానికి వెళ్ళండి", "cp_g2_s4": "గాయాలను తనిఖీ చేయండి", "cp_g3_title": "గ్యాస్ లీక్", "cp_g3_s1": "ఎలక్ట్రికల్ స్విచ్‌లు వాడవద్దు", "cp_g3_s2": "గాలి కోసం కిటికీలు తెరవండి", "cp_g3_s3": "వెంటనే బయటకు వెళ్ళండి", "cp_g3_s4": "అత్యవసర సేవలకు కాల్ చేయండి", "cp_g4_title": "భవనం కూలిపోవడం", "cp_g4_s1": "చికాకులో ఉంటే, శబ్దాలు చేయండి", "cp_g4_s2": "నోరు కప్పుకొండి", "cp_g4_s3": "భారీ శిధిలాలను కదపవద్దు", "cp_g4_s4": "రెస్క్యూ టీమ్‌ కోసం వేచిచూడండి", "cp_h1": "జాతీయ అత్యవసర పరిస్థితి", "cp_h2": "అగ్నిమాపక సేవ", "cp_h3": "విపత్తు హెల్ప్‌లైన్ (NDMA)", "cp_h4": "అంబులెన్స్", "cp_h5": "పోలీసు", "cp_da1_title": "మీ ఇంటిని సిద్ధం చేయండి", "cp_da1_desc": "అత్యవసర వస్తువులు ఉంచండి.", "cp_da2_title": "బయటకు వెళ్లే దారులను తెలుసుకోండి", "cp_da2_desc": "ఎగ్జిట్ దారులను గుర్తించండి.", "cp_da3_title": "తెలుసుకోండి", "cp_da3_desc": "హెచ్చరికలు అనుసరించండి." },
  ta: { "cp_title": "IDIS குடிமக்கள் துறை", "home": "முகப்பு", "cp_nearby_alerts": "அருகிலுள்ள எச்சரிக்கைகள்", "cp_safety_guidelines": "பாதுகாப்பு வழிகாட்டிகள்", "cp_emergency_helplines": "அவசர எண்கள்", "cp_disaster_awareness": "பேரழிவு விழிப்புணர்வு", "cp_report_anomaly": "கட்டிடத்தில் கோளாறு? இங்கே புகாரளிக்கவும்", "cp_g1_title": "தீ ஆபத்து", "cp_g1_s1": "கீழே தவழவும்", "cp_g1_s2": "கதவுகளைத் திறப்பதற்கு முன் வெப்பத்தை உணரவும்", "cp_g1_s3": "படிக்கட்டுகளைப் பயன்படுத்தவும்", "cp_g1_s4": "உடனே 101ஐ அழைக்கவும்", "cp_g2_title": "பூகம்பம்", "cp_g2_s1": "குனிந்து, தஞ்சம் புகுந்து பிடித்துக்கொள்ளுங்கள்", "cp_g2_s2": "ஜன்னல்களில் இருந்து விலகி இருங்கள்", "cp_g2_s3": "வெளியில் இருந்தால், திறந்த பரப்பிற்குச் செல்லுங்கள்", "cp_g2_s4": "காயங்களை பரிசோதிக்கவும்", "cp_g3_title": "எரிவாயு கசிவு", "cp_g3_s1": "மின்சார சுவிட்சுகளை பயன்படுத்த வேண்டாம்", "cp_g3_s2": "காற்றோட்டத்திற்கு ஜன்னல்களை திறக்கவும்", "cp_g3_s3": "உடனே வெளியேறுங்கள்", "cp_g3_s4": "அவசர சேவைக்கு அழைக்கவும்", "cp_g4_title": "கட்டிடம் இடிதல்", "cp_g4_s1": "சிக்கியிருந்தால், ஒலியெழுப்பவும்", "cp_g4_s2": "வாயை துணியால் மூடுங்கள்", "cp_g4_s3": "கனமான குப்பைகளை நகர்த்த வேண்டாம்", "cp_g4_s4": "மீட்பு குழுவுக்காக காத்திருங்கள்", "cp_h1": "தேசிய அவசரநிலை", "cp_h2": "தீயணைப்பு", "cp_h3": "பேரழிவு உதவி", "cp_h4": "ஆம்புலன்ஸ்", "cp_h5": "காவல்துறை", "cp_da1_title": "வீட்டை தயார்படுத்தவும்", "cp_da1_desc": "அவசர பொருட்கள் தயாராக வைத்திருக்கவும்", "cp_da2_title": "வெளியேறும் வழிகளை தெரிந்து கொள்ளுங்கள்", "cp_da2_desc": "வெளியேறும் வழிகளை அறியவும்", "cp_da3_title": "தகவல்களை அறியவும்", "cp_da3_desc": "எச்சரிக்கைகளை பின்பற்றவும்" },
  mr: { "cp_title": "IDIS नागरिक पोर्टल", "home": "मुख्यपृष्ठ", "cp_nearby_alerts": "जवळील अलर्ट", "cp_safety_guidelines": "सुरक्षा मार्गदर्शक तत्त्वे", "cp_emergency_helplines": "आपत्कालीन हेल्पलाइन", "cp_disaster_awareness": "आपत्ती जागरूकता", "cp_report_anomaly": "इमारतीत काही अडचण आढळली? येथे तक्रार करा", "cp_g1_title": "आग", "cp_g1_s1": "खाली रहा", "cp_g1_s2": "दाराला हात लावून पहा", "cp_g1_s3": "पायऱ्यांचा वापर करा", "cp_g1_s4": "101 वर कॉल करा", "cp_g2_title": "भूकंप", "cp_g2_s1": "खाली बसा, कव्हर घ्या", "cp_g2_s2": "खिडक्यांपासून दूर रहा", "cp_g2_s3": "मोकळ्या जागेत जा", "cp_g2_s4": "दुखापती तपासा", "cp_g3_title": "गॅस गळती", "cp_g3_s1": "विद्युत स्विच वापरू नका", "cp_g3_s2": "खिडक्या उघडा", "cp_g3_s3": "बाहेर पडा", "cp_g3_s4": "मदत घ्या", "cp_g4_title": "इमारत कोसळणे", "cp_g4_s1": "आवाज करा", "cp_g4_s2": "तोंड झाका", "cp_g4_s3": "ढिगारा हलवू नका", "cp_g4_s4": "मदतीची वाट पहा", "cp_h1": "राष्ट्रीय आपत्कालीन", "cp_h2": "अग्निशमन", "cp_h3": "आपत्ती हेल्पलाइन", "cp_h4": "रुग्णवाहिका", "cp_h5": "पोलीस", "cp_da1_title": "घर तयार ठेवा", "cp_da1_desc": "साहित्य जवळ ठेवा.", "cp_da2_title": "मार्ग जाणून घ्या", "cp_da2_desc": "मार्ग आणि निकास जाणून घ्या.", "cp_da3_title": "माहिती मिळवा", "cp_da3_desc": "अलर्ट्स फॉलो करा." },
  ur: { "cp_title": "IDIS سٹیزن پورٹل", "home": "ہوم", "cp_nearby_alerts": "قریبی الرٹس", "cp_safety_guidelines": "حفاظتی ہدایات", "cp_emergency_helplines": "ہنگامی ہیلپ لائنز", "cp_disaster_awareness": "آفات سے آگاہی", "cp_report_anomaly": "عمارت میں کوئی مسئلہ ہے؟ یہاں رپورٹ کریں", "cp_g1_title": "آگ", "cp_g1_s1": "نیچے رہیں", "cp_g1_s2": "دروازہ محسوس کریں", "cp_g1_s3": "سیڑھیاں استعمال کریں", "cp_g1_s4": "101 ڈائل کریں", "cp_g2_title": "زلزلہ", "cp_g2_s1": "نیچے جھکیں، چھپیں", "cp_g2_s2": "کھڑکیوں سے دور رہیں", "cp_g2_s3": "کھلی جگہ جائیں", "cp_g2_s4": "چوٹیں چیک کریں", "cp_g3_title": "گیس لیکیج", "cp_g3_s1": "سوئچ آن نہ کریں", "cp_g3_s2": "کھڑکیاں کھولیں", "cp_g3_s3": "باہر نکلیں", "cp_g3_s4": "کال کریں", "cp_g4_title": "عمارت گرنا", "cp_g4_s1": "دستک دے کر آواز کریں", "cp_g4_s2": "منہ ڈھانپیں", "cp_g4_s3": "ملبہ نہ اٹھائیں", "cp_g4_s4": "انتظار کریں", "cp_h1": "قومی ایمرجنسی", "cp_h2": "فائر سروس", "cp_h3": "ڈیزاسٹر ہیلپ لائن", "cp_h4": "ایمبولینس", "cp_h5": "پولیس", "cp_da1_title": "گھر تیار رکھیں", "cp_da1_desc": "اشیاء تیار رکھیں۔", "cp_da2_title": "راستے جانیں", "cp_da2_desc": "باہر نکلنے کے راستے جانیں۔", "cp_da3_title": "باخبر رہیں", "cp_da3_desc": "الرٹس پر نظر رکھیں۔" }
};

const langs = ['en', 'hi', 'bn', 'te', 'mr', 'ta', 'ur', 'gu', 'kn', 'or', 'ml', 'pa'];

langs.forEach(lang => {
  const file = path.join(localesDir, lang, 'translation.json');
  let current = {};
  if (fs.existsSync(file)) {
    current = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  
  // Use translations if available, otherwise fallback to English
  const updates = newTranslations[lang] || newTranslations['en'];
  const updated = { ...current, ...updates };
  
  fs.writeFileSync(file, JSON.stringify(updated, null, 2));
  console.log(`Updated translations for CitizenPortal keys in ${lang}`);
});
