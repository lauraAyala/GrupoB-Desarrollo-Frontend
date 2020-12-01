import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import Backend from 'i18next-http-backend';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json'
const resources = {
    en: {
        translation: translationEN
    },
    es: {
        translation: translationES
    }
    };
    
    i18n
        .use(Backend)
        .use(reactI18nextModule) // passes i18n down to react-i18next
        .init({
            resources,
            lng: "es",
            keySeparator: false, // we do not use keys in form messages.welcome
            interpolation: {
                escapeValue: false // react already safes from xss
            }
    });

export default i18n;
