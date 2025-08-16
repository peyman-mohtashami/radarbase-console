import { createAction, props } from '@ngrx/store';
import { AppOrganization } from "../entities/organization/models/organization";
import { AppProject } from "../entities/project/models/project";
import { AppSubject } from "../entities/subject/models/subject";
import { AppClient } from "../entities/client/models/client";
// import {
//   RadarClientDef,
//   RadarOrganizationDef,
//   RadarProjectDef,
//   RadarSubjectDef
// } from "@rb/models";

export const organizationSelected = createAction(
  '[Admin: OrganizationPage] Set Selected Organization',
  props<{ selectedOrganization: AppOrganization | null | undefined }>()
);

export const projectSelected = createAction(
  '[Admin: ProjectPage] Set Selected Project',
  props<{ selectedProject: AppProject | null | undefined }>()
);

export const subjectSelected = createAction(
  '[Admin: SubjectPage] Set Selected Subject',
  props<{ selectedSubject: AppSubject | null | undefined}>()
);

export const clientSelected = createAction(
  '[Admin: ???] Set Selected Client',
  props<{ selectedClient: AppClient | null | undefined }>()
);

export const clientConfigCategorySelected = createAction(
  '[Admin: ???] Set Selected Client Config Category',
  props<{ selectedClientConfigCategory: string | null | undefined}>()
);

