import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'ko'], // preload supported languages
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/translation.json'),
    },
    detection: {
      order: ['header', 'querystring'], // API-friendly detection
      lookupQuerystring: 'lng',
      lookupHeader: 'accept-language',
      caches: false
    },
    debug: false
  });

export default i18next;
