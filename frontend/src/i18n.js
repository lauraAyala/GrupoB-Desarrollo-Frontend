import i18n from "i18next";
import {reactI18nextModule} from "react-i18next";
//import Backend from 'i18next-http-backend';
import translationEn from './translation/en/global.json';
import translationEs from './translation/es/global.json';

const resources = {
    en:{
        translation: translationEn
    },
    es: {
        translation: translationEs
    }
    };

i18n

.use(reactI18nextModule)
.init({
    resources,
    lng:"en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;