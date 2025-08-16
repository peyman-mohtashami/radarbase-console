import {RadarSubject} from '../../../../shared/models/radar-subject.model';
import {AppBaseModel} from '../../../../shared/models/base.model';
import {RadarProject} from '../../../../shared/models/radar-project.model';
import {RadarSource} from '../../../../shared/models/radar-source.model';
import {RadarRole} from '../../../../shared/models/auth.model';

export type AppSubject =  RadarSubject & AppBaseModel & Record<string, boolean | number | string | Date | RadarProject | Record<string, string> | RadarSource[] | RadarRole[] | undefined>;
