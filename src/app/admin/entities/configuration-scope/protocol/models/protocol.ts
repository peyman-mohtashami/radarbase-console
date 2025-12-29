// import {RadarOption} from "../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";

import {RadarOption} from "../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component";

export interface RadarProtocolWrapper extends Record<string, string | string[] | null | RadarProtocol[]> {
  version: string | null;
  schemaVersion: string | null;
  name: string | null;
  healthIssues: string[] | null;
  protocols: RadarProtocol[];
}

export interface RadarProtocol {
  name: string;
  type?: string;
  showIntroduction?: boolean;
  showInCalendar?: boolean;
  isDemo?: boolean;
  order?: number;
  questionnaire?: {
    repository: string;
    name: string;
    avsc: string;
  };
  appQuestionnaire?: string;
  startText: Record<string, string>;
  endText: Record<string, string>;
  warn: Record<string, string>;
  estimatedCompletionTime?: number;
  protocol?: RadarSubProtocol;
}

export interface RadarSubProtocol {
  referenceTimestamp?: {timestamp: string; format: string};
  repeatProtocol: {
    unit: string;
    amount: number;
  };
  repeatQuestionnaire: {
    unit: string;
    unitsFromZero: number[];
  };
  reminders?: {
    unit: string;
    amount: number;
    repeat: number;
    title?: Record<string, string>;
    text?: Record<string, string>;
  };
  clinicalProtocol?: {
    requiresInClinicCompletion: boolean;
    repeatAfterClinicVisit?: {
      unit: string;
      unitsFromZero: number[];
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

export enum QuestionnaireTimeUnit {
  min = 'min',
  hour = 'hour',
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
}

export interface QuestionnaireLanguage extends RadarOption {
  id: string | number;
  _name: string;
  nativeName?: string;
}

export interface AppProtocol extends RadarProtocol {
  _name: string;
  _languages: QuestionnaireLanguage[];
  _onDemand: boolean;
  _github: boolean;
  _repeatedProtocol: boolean;
  _relativeToReferenceTime: boolean;
  _reminderEnabled: boolean;
}

export interface FormProtocol {
  _name: string;
  general: {
    name: string;
    languages: QuestionnaireLanguage[];
    onDemand: boolean;
    order?: number;
    showInCalendar: boolean;
    isDemo: boolean;
  };
  questionsGroup: {
    github: boolean;
    questionnaire?: {
      repository: string;
      name: string;
      avsc: string;
    };
    appQuestionnaire?: string;
    estimatedCompletionTime?: number;
  };
  content: {
    showIntroduction: boolean;
    startText: Record<string, string>;
    endText: Record<string, string>;
    warn: Record<string, string>;
    notification?: {
      title: Record<string, string>;
      text: Record<string, string>;
    };
  };
  scheduling?: {
    repeatedProtocol: boolean;
    relativeToReferenceTime: boolean;
    referenceTimestamp?: string;
    repeatProtocol: {
      unit: QuestionnaireTimeUnit;
      amount: number;
    };
    repeatQuestionnaire: {
      unit: QuestionnaireTimeUnit;
      unitsFromZero: number[];
    };
    completionWindow?: {
      unit: QuestionnaireTimeUnit;
      amount: number;
    };
    reminders?: {
      enabled: boolean;
      unit: QuestionnaireTimeUnit;
      amount: number;
      repeat: number;
    };
  };
}


//
// export interface AppProtocol extends RadarProtocol {
//   // id?: number | string;
//   _name: string;
//   _search?: string;
//   languages: RadarOption[];
//   onDemand: boolean;
// }
//
