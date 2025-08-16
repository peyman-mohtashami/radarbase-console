export const WORKSHOP_TEST = [
  {
    id: 5895,
    name: 'ESM',
    showIntroduction: false,
    questionnaire: {
      repository:
        'https://raw.githubusercontent.com/RADAR-CNS/RADAR-REDCap-aRMT-Definitions/master/questionnaires/',
      name: 'esm',
      avsc: 'questionnaire',
    },
    startText: {
      en: '',
      it: '',
      nl: '',
      da: '',
      de: '',
      es: '',
    },
    endText: {
      en: '',
      it: '',
      nl: '',
      da: '',
      de: '',
      es: '',
    },
    warn: {
      en: '',
      it: '',
      nl: '',
      da: '',
      de: '',
      es: '',
    },
    estimatedCompletionTime: 3,
    protocol: {
      repeatProtocol: {
        unit: 'day',
        amount: 1,
      },
      repeatQuestionnaire: {
        unit: 'min',
        unitsFromZero: [
          1095, 1890, 1985, 2073, 2160, 2253, 2385, 2440, 2543, 2612,
        ],
      },
      reminders: {
        unit: 'day',
        amount: 0,
        repeat: 0,
      },
    },
  },
];
