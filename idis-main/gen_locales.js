import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');
const localesDir = path.join(srcDir, 'locales');
if (!fs.existsSync(localesDir)) fs.mkdirSync(localesDir);

const langs = ['en', 'hi', 'bn', 'te', 'mr', 'ta', 'ur', 'gu', 'kn', 'or', 'ml', 'pa'];
const defaultTranslations = {
  "app_name": "IDIS",
  "welcome": "Welcome to IDIS",
  "login": "Login",
  "register": "Register",
  "dashboard": "Dashboard",
  "citizen_portal": "Citizen Portal",
  "contribute": "Contribute"
};

langs.forEach(lang => {
  const dir = path.join(localesDir, lang);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  const file = path.join(dir, 'translation.json');
  fs.writeFileSync(file, JSON.stringify(defaultTranslations, null, 2));
});
