// import { BaseDTO } from './base.model';

export interface RadarProtocol {
  id: number | string;
  name: string;
  showIntroduction?: boolean;
  showInCalendar?: boolean;
  isDemo?: boolean;
  order?: number;
  questionnaire: {
    repository: string;
    name: string;
    avsc: string; //questionnaire
  };
  startText: Record<string, string>;
  endText: Record<string, string>;
  warn: Record<string, string>;
  estimatedCompletionTime?: number;
  protocol: RadarSubProtocol;
  description?: string;
  createdAt?: string;
  modifiedAt?: string;
  createdBy?: string;
  modifiedBy?: string;
  attributes?: Record<string, string>;
}

export interface RadarSubProtocol {
  repeatProtocol?: {
    unit?: string;
    amount?: number;
  };
  repeatQuestionnaire?: {
    unit?: string;
    unitsFromZero?: number[];
  };
  reminders?: {
    unit?: string;
    amount?: number;
    repeat?: number;
  };
  clinicalProtocol?: {
    requiresInClinicCompletion?: boolean;
    repeatAfterClinicVisit?: {
      unit?: string;
      unitsFromZero?: number[];
    };
  };
  notification?: {
    title?: Record<string, string>;
    text?: Record<string, string>;
  };
  completionWindow?: {
    unit: string;
    amount: number;
  };
}
// export interface RadarProtocolDTO
//   extends Record<
//     string,
//     | boolean
//     | number
//     | string
//     | RadarSubProtocolDTO
//     | Record<string, string>
//     | undefined
//     | RadarSubProtocolDef
//   > {
//   id: number | string;
//   name: string;
//   showIntroduction?: boolean;
//   showInCalendar?: boolean;
//   isDemo?: boolean;
//   order?: number;
//   questionnaire: {
//     repository: string;
//     name: string;
//     avsc: string; //questionnaire
//   };
//   startText?: Record<string, string>;
//   endText?: Record<string, string>;
//   warn?: Record<string, string>;
//   estimatedCompletionTime?: number;
//   protocol: RadarSubProtocolDTO;
//   description?: string;
//   createdAt?: string;
//   modifiedAt?: string;
//   createdBy?: string;
//   modifiedBy?: string;
//   attributes?: Record<string, string>;
// }

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
//
// export interface RadarSubProtocolDTO extends Record<string, any> {
//   repeatProtocol?: {
//     unit?: string;
//     amount?: number;
//   };
//   repeatQuestionnaire?: {
//     unit?: string;
//     unitsFromZero?: number[];
//   };
//   reminders?: {
//     unit?: string;
//     amount?: number;
//     repeat?: number;
//   };
//   clinicalProtocol?: {
//     requiresInClinicCompletion?: boolean;
//     repeatAfterClinicVisit?: {
//       unit?: string;
//       unitsFromZero?: number[];
//     };
//   };
//   notification?: {
//     title?: Record<string, string>;
//     text?: Record<string, string>;
//   };
//   completionWindow?: {
//     unit: string;
//     amount: number;
//   };
// }
//
// export interface RadarSubProtocolDef {
//   repeatProtocol?: {
//     enabled: boolean;
//     unit?: string;
//     amount?: number;
//   };
//   repeatQuestionnaire?: {
//     times?: string; //number;
//     unit?: string;
//     // unitsFromZero?: string;
//   };
//   reminders?: {
//     enabled?: boolean;
//     unit?: string;
//     amount?: number;
//     repeat?: number;
//   };
//   clinicalProtocol?: {
//     enabled?: boolean;
//     requiresInClinicCompletion?: boolean;
//     repeatAfterClinicVisit?: {
//       enabled?: boolean;
//       unit?: string;
//       unitsFromZero?: string;
//     };
//   };
//   notification?: {
//     enabled?: boolean;
//     title?: Record<string, string>;
//     text?: Record<string, string>;
//   };
//   completionWindow?: {
//     enabled: boolean;
//     unit: string;
//     amount: number;
//   };
// }

// export interface RadarAppSubProtocol extends Record<string, any> {
//   //} extends RadarSubProtocol {

// }
export interface ProtocolLanguage {
  code: string;
  name?: string;
  nativeName?: string;
  default?: boolean;
  valid?: boolean;
}
