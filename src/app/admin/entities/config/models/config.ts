import {RadarConfig, RadarConfigBundle} from '../../../../shared/models/radar-config.model';
import {AppBaseModel} from '../../../../shared/models/base.model';

export type AppConfigBundle =  RadarConfigBundle & Record<string, string | number | RadarConfig[] | undefined>;
export type AppConfig =  RadarConfig & AppBaseModel & {changed?: boolean;} & Record<string, string | number | boolean | undefined>;
