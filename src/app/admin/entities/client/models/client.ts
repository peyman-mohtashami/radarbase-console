import {RadarClient} from '../../../../shared/models/radar-client.model';
import {AppBaseModel} from '../../../../shared/models/base.model';

export type AppClient =  RadarClient & AppBaseModel & {formAuthorizedGrantTypes: Record<string, boolean>} &
  Record<string, number | string | Record<string, string | boolean> | string[] | undefined>;
