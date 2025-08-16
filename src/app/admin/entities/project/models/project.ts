import {ProjectStatus, RadarProject} from '../../../../shared/models/radar-project.model';
import {AppBaseModel} from '../../../../shared/models/base.model';
import {RadarOrganization} from '../../../../shared/models/radar-organization.model';
import {RadarSourceType} from '../../../../shared/models/radar-source-type.model';
import {RadarGroup} from '../../../../shared/models/radar-group.model';

export type AppProject =  RadarProject & AppBaseModel & Record<string, number | string | RadarOrganization | ProjectStatus | RadarSourceType[] | RadarGroup[] | Record<string, string> | undefined>;
