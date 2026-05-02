
// export interface RadarSpecification {
//   questionnaire_definition_url: string;
//   topic: string;
//   type: string;
//   value_schema: string;
// }

export interface SchemaMetadata {
  id: number
  version: number
  schema: string
}

export interface KeyExport {
  userId: string
  sourceId: string
  projectId: string
}

export interface KafkaObject {
  key?: KeyExport
  value: KafkaExportType //EventValueExport | AnswerValueExport | CompletionLogValueExport | ApplicationTimeZoneValueExport
}

export interface ObservationKey {
  projectId: { string: string };
  sourceId: string;
  userId: string;
}

export interface SentKafkaResult {
  successKeys: string[], failedKeys: string[];
}

export interface KafkaRecordsContainer {
  key_schema_id: number,
  value_schema_id: number,
  records: KafkaRecord[]
}

export interface KafkaRecord {
  key: ObservationKey,
  value: unknown;
}

export interface AnswerValueExport {
  name: string;
  version: string;
  answers: AnswerWithTimeLog[];
  time: number;
  timeCompleted: number;
  timeNotification: number;
}

export interface CompletionLogValueExport {
  name: string
  time: number
  timeNotification: number
  completionPercentage: number
}

export interface EventValueExport {
  time: number
  eventType: string
  questionnaireName?: string
  metadata?: any
}

export interface ApplicationTimeZoneValueExport {
  time: number
  offset: number
}

export interface HealthKitDateValueExport {
  // name: string //'healthkit',
  time: number //getSeconds({ milliseconds: Date.now() }),
  timeCompleted: number //getSeconds({ milliseconds: Date.now() }),
  // data: {key: string, value: any} //{ key: data.key, value: data.value }
  key: string
  value: { startTime: Date | number | string; endTime: Date | number | string; } //any //{ key: data.key, value: data.value }
}

export interface HealthKitValueExport {
  time: number;
  endTime: number;
  timeReceived: number;
  sourceId: string;
  sourceName: string;
  unit: string;
  key: string;
  intValue: number | null;
  floatValue: number | null;
  doubleValue: number | null;
  stringValue: string | null;
}


export type KafkaExportType =
  | ApplicationTimeZoneValueExport
  | AnswerValueExport
  | CompletionLogValueExport
  | EventValueExport
  | HealthKitDateValueExport
  | HealthKitValueExport
  // | HealthKitValueExport;


export enum SchemaType {
  ASSESSMENT = 'assessment',
  COMPLETION_LOG = 'completion_log',
  TIMEZONE = 'timezone',
  APP_EVENT = 'app_event',
  OTHER = 'other',
  KEY = 'key',
  HEALTHKIT = 'healthkit',

  // generic
  GENERAL_HEALTH = 'healthkit_generic_data',

  // aggregated data
  // !Will have to remove activity here, since each activity acutally contains more payload
  // Steps, Calroies, Nutrition    [ 'steps', 'distance','calories','activity', 'nutrition']
  AGGREGATED_HEALTH = 'healthkit_aggregated_exercise_data'
}


// Add interface for progress tracking
export interface KafkaSendProgress {
  total: number
  sent: number
  failed: number
  percentage: number
}

export interface AnswerWithTimeLog {
  id: string
  value: string | null // | string[] | number | boolean | null
  type: string
  startTime: number
  endTime: number
}
