import {RadarSourceData} from '../../../../shared/models/radar-source-data.model';
import {AppBaseModel} from '../../../../shared/models/base.model';
import {RadarSourceType} from '../../../../shared/models/radar-source-type.model';
import {RadarProject} from '../../../../shared/models/radar-project.model';

export type AppSourceData =  RadarSourceData & AppBaseModel & Record<string, number | string | boolean | RadarSourceType | RadarProject | undefined>;
