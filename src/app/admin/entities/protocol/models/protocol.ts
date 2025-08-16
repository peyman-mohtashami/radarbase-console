import { minutes2WDHM, WDHM2minutes } from "../services/protocol.service";
import {RadarProtocol} from '../../../../shared/models/radar-protocol.model';
import {AppBaseModel} from '../../../../shared/models/base.model';

export type AppProtocol =  RadarProtocol & AppBaseModel & {
  languages: {code: string; default: boolean}[]; //?
  // defaultLanguage: string; //?
  language?: string;
  customStartText: {
    enabled: boolean;
    startText: string; //Record<string, string>;
  };
  customEndText: {
    enabled: boolean;
    endText: string;//Record<string, string>;
  };
  customWarnText: {
    enabled: boolean;
    warn: string;//Record<string, string>;
  };
  customProtocol: {
    repeatProtocol: {
      enabled: boolean;
      unit?: string;
      amount?: number;
    };
    repeatQuestionnaire: {
      times?: string;
      unit?: string;
      //unitsFromZero: repeatQuestionnaireTimes,
    };
    reminders: {
      enabled: boolean;
      unit?: string;
      amount?: number;
      repeat?: number;
    };
    clinicalProtocol: {
      enabled: boolean;
      requiresInClinicCompletion?: boolean;
      repeatAfterClinicVisit?: {
        enabled: boolean;
        unit?: string;
        unitsFromZero?: string;
      };
    };
    notification: {
      enabled: boolean;
        title?: string; //Record<string, string>;
        text?: string; //Record<string, string>;
    },
    completionWindow: {
      enabled: boolean;
      unit: string;
      amount: number;
    },
  },
} & Record<string, any>;

export function toAppProtocol(entity: RadarProtocol): AppProtocol {
  // find all languages and default language
  // const defaultLanguage: ProtocolLanguage = {
  //   code: 'en',
  //   default: true,
  //   valid: true,
  // };
  const languagesSet = new Set<string>();
  // languagesSet.add('en');
  Object.keys(entity.startText || {}).forEach((language) => {
    if (entity.startText?.[language]) {
      languagesSet.add(language);
    }
  });
  Object.keys(entity.endText || {}).forEach((language, index) => {
    if (entity.endText?.[language] || index === 0) {
      languagesSet.add(language);
    }
  });
  Object.keys(entity.warn || {}).forEach((language, index) => {
    if (entity.warn?.[language] || index === 0) {
      languagesSet.add(language);
    }
  });
  Object.keys(entity.protocol?.notification?.title || {}).forEach(
    (language, index) => {
      if (entity.protocol?.notification?.title?.[language] || index === 0) {
        languagesSet.add(language);
      }
    }
  );
  Object.keys(entity.protocol?.notification?.text || {}).forEach(
    (language, index) => {
      if (entity.protocol?.notification?.text?.[language] || index === 0) {
        languagesSet.add(language);
      }
    }
  );

  // if (!languagesSet.size) {
  //   languagesSet.add('en');
  // }
  // const defaultLanguage = [...languagesSet][0];
  console.log(entity);

  const languages = [...languagesSet].map((l, index) => ({
      code: l,
      default: index === 0,
    })
  );

  return {
    ...entity,
    // uId: entity.id,
    // uName: entity.name,
    languages: languages,
    // defaultLanguage: defaultLanguage,
    customStartText: {
      enabled: !!entity.showIntroduction,
      startText: entity.startText?.[languages[0].code],
      // defaultLanguage
      //   ? entity.startText //?.[defaultLanguage.name]
      //   : undefined,
    },
    customEndText: {
      enabled: !!entity.endText?.[languages[0].code],
      endText: entity.endText?.[languages[0].code]
      // defaultLanguage
      //   ? entity.endText //?.[defaultLanguage]
      //   : undefined,
    },
    customWarnText: {
      enabled: !!entity.warn?.[languages[0].code],
      warn: entity.warn?.[languages[0].code]
      // defaultLanguage
      //   ? entity.warn
      //   : undefined, //?.[defaultLanguage] : undefined,
    },
    customProtocol: {
      repeatProtocol: {
        enabled:
          (!!entity.protocol.repeatProtocol?.unit &&
            !!entity.protocol.repeatProtocol?.amount &&
            entity.protocol.repeatProtocol?.unit !== 'year') ||
          (entity.protocol.repeatProtocol?.unit === 'year' &&
            (entity.protocol.repeatProtocol?.amount || 0) < 10),
        unit: entity.protocol?.repeatProtocol?.unit,
        amount: entity.protocol?.repeatProtocol?.amount,
      },
      repeatQuestionnaire: {
        times: entity?.protocol?.repeatQuestionnaire?.unitsFromZero
          ?.map((t) => minutes2WDHM(t))
          .join(','),
        //repeatQuestionnaireTimes, //rawData.protocol?.repeatQuestionnaire?.times,
        unit: entity.protocol?.repeatQuestionnaire?.unit,
        //unitsFromZero: repeatQuestionnaireTimes,
      },
      reminders: {
        enabled: !!(
          entity.protocol?.reminders?.unit &&
          entity.protocol?.reminders?.repeat
        ),
        unit: entity.protocol?.reminders?.unit,
        amount: entity.protocol?.reminders?.amount,
        repeat: entity.protocol?.reminders?.repeat,
      },
      clinicalProtocol: {
        enabled: !!entity.protocol?.clinicalProtocol, //?.enabled,
        requiresInClinicCompletion:
        entity.protocol?.clinicalProtocol?.requiresInClinicCompletion,
        repeatAfterClinicVisit: {
          enabled: !!(
            entity.protocol?.clinicalProtocol?.repeatAfterClinicVisit?.unit &&
            entity.protocol?.clinicalProtocol?.repeatAfterClinicVisit
              ?.unitsFromZero
          ),
          unit: entity.protocol?.clinicalProtocol?.repeatAfterClinicVisit
            ?.unit,
          unitsFromZero:
            entity.protocol?.clinicalProtocol?.repeatAfterClinicVisit?.unitsFromZero?.join(
              ','
            ),
        },
      },
      notification: {
        enabled: !!(
          languages[0] &&
          (entity.protocol?.notification?.title?.[languages[0].code] ||
            entity.protocol?.notification?.text?.[languages[0].code])
        ),
        title:  entity.protocol?.notification?.title?.[languages[0].code],
        // ? entity.protocol?.notification?.title //?.[defaultLanguage]
        // : undefined,
        text: entity.protocol?.notification?.text?.[languages[0].code],
        // // defaultLanguage
        // ? entity.protocol?.notification?.text //?.[defaultLanguage]
        // : undefined,
      },
      completionWindow: {
        enabled: !!(
          entity.protocol?.completionWindow?.unit &&
          entity.protocol?.completionWindow?.amount
        ),
        unit: entity.protocol.completionWindow?.unit || '',
        amount: entity.protocol?.completionWindow?.amount || 0,
      },
    },
  };
}
export function toRadarProtocol(entity: AppProtocol): RadarProtocol {
  const modifiedEntity = {
    id: entity.id,
    name: entity.name,
    showIntroduction: entity.customStartText?.enabled,
    showInCalendar: entity.showInCalendar,
    isDemo: entity.isDemo,
    order: entity.order,
    questionnaire: {
      repository: '',
      name: entity.questionnaire.name,
      avsc: entity.questionnaire.avsc,
    },
    startText: {
      ...entity.startText,
      [entity.language || entity.languages?.[0]?.code || "en"]: entity.customStartText.startText,
    },
    endText: {
      ...entity.endText,
      [entity.language || entity.languages?.[0]?.code || "en"]: entity.customEndText.endText,
    },
    warn: {
      ...entity.warn,
      [entity.language || entity.languages?.[0]?.code || "en"]: entity.customWarnText.warn,
    },
    estimatedCompletionTime: entity.estimatedCompletionTime,
    protocol: {
      repeatProtocol: {
        unit: entity.customProtocol.repeatProtocol?.enabled
          ? entity.customProtocol.repeatProtocol.unit
          : 'year',
        amount: entity.customProtocol.repeatProtocol?.enabled
          ? entity.customProtocol.repeatProtocol.amount
          : 9999,
      },
      repeatQuestionnaire: {
        unit: entity.customProtocol.repeatQuestionnaire?.unit,
        unitsFromZero: entity.customProtocol.repeatQuestionnaire?.times
          ?.split(',')
          .map((item) => WDHM2minutes(item)), // todo
      },
      reminders: entity.customProtocol.reminders?.enabled
        ? {
          unit: entity.customProtocol.reminders.unit,
          amount: entity.customProtocol.reminders.amount,
          repeat: entity.customProtocol.reminders.repeat,
        }
        : undefined,
      clinicalProtocol: entity.customProtocol.clinicalProtocol?.enabled
        ? {
          requiresInClinicCompletion:
          entity.customProtocol.clinicalProtocol
            .requiresInClinicCompletion,
          repeatAfterClinicVisit: {
            unit: entity.customProtocol.clinicalProtocol
              ?.repeatAfterClinicVisit?.unit || "",
            unitsFromZero:
              entity.customProtocol.clinicalProtocol?.repeatAfterClinicVisit
                ?.unitsFromZero?.split(',').map(item => +item) || [],
          },
        }
        : undefined,
      notification: entity.customProtocol.notification?.enabled
        ? {
          title: {
            ...entity.protocol.notification?.title,
            [entity.language || entity.languages?.[0]?.code || "en"]:
            entity.customProtocol.notification.title || "",
          },
          text: {
            ...entity.protocol.notification?.text,
            [entity.language || entity.languages?.[0]?.code || "en"]:
            entity.customProtocol.notification.text || "",
          },
        }
        : undefined,
      completionWindow: entity.customProtocol.completionWindow?.enabled
        ? {
          unit: entity.customProtocol.completionWindow?.enabled
            ? entity.customProtocol.completionWindow.unit
            : '',
          amount: entity.customProtocol.completionWindow?.enabled
            ? entity.customProtocol.completionWindow.amount
            : 0,
        } : undefined,
    }, //RadarSubProtocol,
    // description: entity.description,
    //createdAt?: entity.createdAt,
    modifiedAt: new Date().toString(),
    //createdBy?: string;
    modifiedBy: 'peyman',
    // attributes?: Record<string, string>;
  };
  console.log(modifiedEntity);
  return modifiedEntity;
  // return { ...entity };
}


// export interface RadarClientDef extends BaseDef, RadarClientDTO {
//   formAuthorizedGrantTypes: Record<string, boolean>;
// }

// type UserFullname = Pick<User, 'firstname' | 'lastname'>;
//Omit<RadarOrganization, "isAdmin" | "isMaintainer"> & { role: Role };
// export interface RadarProtocolDef extends BaseDTO, RadarProtocolDTO {
//   //   Record<
//   // string,
//   // | boolean
//   // | number
//   // | string
//   // | RadarSubProtocolDef
//   // | Record<string, string>
//   // | undefined
//   // >
//   languages: ProtocolLanguage[];
//   // id: number;
//   // name: string;
//   defaultLanguage: string; //ProtocolLanguage;
//   customStartText?: { enabled: boolean; startText?: Record<string, string> };
//   // showInCalendar?: boolean;
//   // isDemo?: boolean;
//   // order?: number;
//   // questionnaire: {
//   //   name: string;
//   //   avsc: string;
//   // };
//   // startText?: string;
//   customEndText: { enabled: boolean; endText?: Record<string, string> };
//   customWarnText: { enabled: boolean; warn?: Record<string, string> };
//   // warn?: string;
//   // estimatedCompletionTime?: number;
//   customProtocol: RadarSubProtocolDef; //RadarAppSubProtocol;
//   // attributes?: Record<string, string>;
//   // showIntroduction: {};
//   // customEndText: {};
//   // customWarnText: {};
// }
//
// // export interface RadarAppProtocol
// //   extends Record<
// //       string,
// //       | boolean
// //       | number
// //       | string
// //       | RadarSubProtocol
// //       | Record<string, string>
// //       | RadarAppSubProtocol
// //       | undefined
// //     >,
// //     RadarProtocol {
//
// // }
// //

// override transformFromApi(entity: RadarProtocol): ProtocolDTO {
//   // find all languages and default language
//   const defaultLanguage: ProtocolLanguage = {
//     code: 'en',
//     default: true,
//     valid: true,
//   };
//   const languagesSet = new Set<string>();
//   languagesSet.add('en');
//   Object.keys(entity.startText || {}).forEach((language) => {
//     if (entity.startText?.[language]) {
//       languagesSet.add(language);
//     }
//   });
//   Object.keys(entity.endText || {}).forEach((language, index) => {
//     if (entity.endText?.[language] || index === 0) {
//       languagesSet.add(language);
//     }
//   });
//   Object.keys(entity.warn || {}).forEach((language, index) => {
//     if (entity.warn?.[language] || index === 0) {
//       languagesSet.add(language);
//     }
//   });
//   console.log(entity);
//   Object.keys(entity.protocol.notification?.title || {}).forEach(
//     (language, index) => {
//       if (entity.protocol.notification?.title?.[language] || index === 0) {
//         languagesSet.add(language);
//       }
//     }
//   );
//   Object.keys(entity.protocol.notification?.text || {}).forEach(
//     (language, index) => {
//       if (entity.protocol.notification?.text?.[language] || index === 0) {
//         languagesSet.add(language);
//       }
//     }
//   );
//   return {
//     ...entity,
//     uId: entity.id,
//     uName: entity.name,
//     languages: [...languagesSet].map((l, index) => ({
//       code: l,
//       default: index === 0,
//     })),
//     defaultLanguage: defaultLanguage.code,
//     customStartText: {
//       enabled: !!entity.showIntroduction,
//       startText: defaultLanguage
//         ? entity.startText //?.[defaultLanguage.name]
//         : undefined,
//     },
//     customEndText: {
//       enabled: !!entity.endText?.[defaultLanguage.code],
//       endText: defaultLanguage
//         ? entity.endText //?.[defaultLanguage]
//         : undefined,
//     },
//     customWarnText: {
//       enabled: !!entity.warn?.[defaultLanguage.code],
//       warn: defaultLanguage
//         ? entity.warn
//         : undefined, //?.[defaultLanguage] : undefined,
//     },
//     customProtocol: {
//       repeatProtocol: {
//         enabled:
//           (!!entity.protocol.repeatProtocol?.unit &&
//             !!entity.protocol.repeatProtocol?.amount &&
//             entity.protocol.repeatProtocol?.unit !== 'year') ||
//           (entity.protocol.repeatProtocol?.unit === 'year' &&
//             (entity.protocol.repeatProtocol?.amount || 0) < 10),
//         unit: entity.protocol?.repeatProtocol?.unit,
//         amount: entity.protocol?.repeatProtocol?.amount,
//       },
//       repeatQuestionnaire: {
//         times: entity?.protocol?.repeatQuestionnaire?.unitsFromZero
//           ?.map((t) => this.minutes2WDHM(t))
//           .join(','),
//         //repeatQuestionnaireTimes, //rawData.protocol?.repeatQuestionnaire?.times,
//         unit: entity.protocol?.repeatQuestionnaire?.unit,
//         //unitsFromZero: repeatQuestionnaireTimes,
//       },
//       reminders: {
//         enabled: !!(
//           entity.protocol?.reminders?.unit &&
//           entity.protocol?.reminders?.repeat
//         ),
//         unit: entity.protocol?.reminders?.unit,
//         amount: entity.protocol?.reminders?.amount,
//         repeat: entity.protocol?.reminders?.repeat,
//       },
//       clinicalProtocol: {
//         enabled: !!entity.protocol?.clinicalProtocol, //?.enabled,
//         requiresInClinicCompletion:
//         entity.protocol?.clinicalProtocol?.requiresInClinicCompletion,
//         repeatAfterClinicVisit: {
//           enabled: !!(
//             entity.protocol?.clinicalProtocol?.repeatAfterClinicVisit?.unit &&
//             entity.protocol?.clinicalProtocol?.repeatAfterClinicVisit
//               ?.unitsFromZero
//           ),
//           unit: entity.protocol?.clinicalProtocol?.repeatAfterClinicVisit
//             ?.unit,
//           unitsFromZero:
//             entity.protocol?.clinicalProtocol?.repeatAfterClinicVisit?.unitsFromZero?.join(
//               ','
//             ),
//         },
//       },
//       notification: {
//         enabled: !!(
//           defaultLanguage &&
//           (entity.protocol?.notification?.title?.[defaultLanguage.code] ||
//             entity.protocol?.notification?.text?.[defaultLanguage.code])
//         ),
//         title: defaultLanguage
//           ? entity.protocol?.notification?.title //?.[defaultLanguage]
//           : undefined,
//         text: defaultLanguage
//           ? entity.protocol?.notification?.text //?.[defaultLanguage]
//           : undefined,
//       },
//       completionWindow: {
//         enabled: !!(
//           entity.protocol?.completionWindow?.unit &&
//           entity.protocol?.completionWindow?.amount
//         ),
//         unit: entity.protocol.completionWindow?.unit || '',
//         amount: entity.protocol?.completionWindow?.amount || 0,
//       },
//     },
//   };
// }
