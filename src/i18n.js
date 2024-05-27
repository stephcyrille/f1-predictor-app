import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detectBrowserLanguage from 'detect-browser-language'

console.log("==============", detectBrowserLanguage())
i18n.use(initReactI18next).init({
  lng: detectBrowserLanguage().split('-')[0],
  fallbackLng: "en",
  interpolation: {
      escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        "driver.selection": "Select the driver",
        'select.driver': "Select this driver",
        'prediction.error.line.1': "Error: Missings values !",
        'prediction.error.line.2': "If the problem persist",
        'prediction.error.line.3': "contact the administrator",
        'round.no': "Round",
        'round.location': "Location",
        'round.date': "Date",
        'select.track': "Select this track",
        'prediction.position': "Predicted rank",
        'prediction.track.name': "Track name",
        'prediction.important': "Note",
        'prediction.about.prediction': "The winning probability is around 30% with margin estimated to +/- 6 rank positions",
        'restart': 'Restart'
      }
    },
    fr: {
      translation: {
        "driver.selection": "Sélectionnez le pilote",
        'select.driver': 'Sélectionner ce pilote',
        'prediction.error.line.1': "Erreur: Valeurs manquantes !",
        'prediction.error.line.2': "Si le problème persiste",
        'prediction.error.line.3': "contactez l'administrateur",
        'round.no': "GP",
        'round.location': "Localisation",
        'round.date': "Date",
        'select.track': "Sélectionner ce circuit",
        'prediction.position': "Prediction",
        'prediction.track.name': "Nom du circuit",
        'prediction.important': "Note",
        'prediction.about.prediction': "La probabilité de victoire est d'environ 30% avec une marge estimée à +/- 6 places de classement",
        'restart': 'Recommencer'
      }
    },
  },
  });;

export default i18n;