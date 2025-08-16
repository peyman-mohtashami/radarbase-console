import {RadarOrganization} from '../../../../shared/models/radar-organization.model';
import {RadarProject} from '../../../../shared/models/radar-project.model';

export type AppOrganization =  RadarOrganization & Record<string, string | number | RadarProject[] | undefined>;
