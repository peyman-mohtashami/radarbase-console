import {RadarLog} from '../../../../shared/models/radar-log.model';
import {AppBaseModel} from '../../../../shared/models/base.model';

export type AppLog =  RadarLog & AppBaseModel & Record<string, number | string>;
