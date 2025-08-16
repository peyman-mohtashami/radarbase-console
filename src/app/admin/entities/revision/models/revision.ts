import {RadarRevision} from '../../../../shared/models/radar-revision.model';
import {AppBaseModel} from '../../../../shared/models/base.model';

export type AppRevision =  RadarRevision & AppBaseModel & Record<string, string | number | Date | any | undefined>;
