import {RadarSourceType} from '../../../../shared/models/radar-source-type.model';
import {AppBaseModel} from '../../../../shared/models/base.model';
import {RadarSourceData} from '../../../../shared/models/radar-source-data.model';

export type AppSourceType =  RadarSourceType & AppBaseModel & Record<string, number | string | boolean | undefined | RadarSourceData[]>;
