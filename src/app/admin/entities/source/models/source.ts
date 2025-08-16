import {RadarSource} from '../../../../shared/models/radar-source.model';
import {AppBaseModel} from '../../../../shared/models/base.model';
import {RadarSourceType} from '../../../../shared/models/radar-source-type.model';
import {RadarProject} from '../../../../shared/models/radar-project.model';

export type AppSource =  RadarSource & AppBaseModel & Record<string, number | string | boolean | RadarSourceType | RadarProject | Record<string, string> | undefined>;
