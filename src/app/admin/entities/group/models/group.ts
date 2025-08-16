import {RadarGroup} from '../../../../shared/models/radar-group.model';
import {AppBaseModel} from '../../../../shared/models/base.model';
import {RadarProject} from '../../../../shared/models/radar-project.model';

export type AppGroup =  RadarGroup & AppBaseModel & {project?: RadarProject} & Record<string, number | string | undefined | RadarProject>;
