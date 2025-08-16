import {RadarAudit} from '../../../../shared/models/radar-audit.model';
import {AppBaseModel} from '../../../../shared/models/base.model';

export type AppAudit =  RadarAudit & AppBaseModel & Record<string, string | Map<string, string>>;
