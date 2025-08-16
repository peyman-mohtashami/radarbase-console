import { createReducer, on } from '@ngrx/store';
import { AdminActions } from '../action.types';
import { AppOrganization } from "../../entities/organization/models/organization";
import { AppProject } from "../../entities/project/models/project";
import { AppSubject } from "../../entities/subject/models/subject";
import { AppClient } from "../../entities/client/models/client";
// import {
//   RadarClientDef,
//   RadarOrganizationDef,
//   RadarProjectDef,
//   RadarSubjectDef
// } from "@rb/models";

export interface AdminState {
  selectedOrganization?: AppOrganization | null;
  selectedProject?: AppProject | null;
  selectedSubject?: AppSubject | null;
  selectedClient?: AppClient | null;
  selectedClientConfigCategory?: string | null;
}

export const initialAdminState: AdminState = {
  selectedOrganization: undefined,
  selectedProject: undefined,
  selectedSubject: undefined,
  selectedClient: undefined,
  selectedClientConfigCategory: undefined,
};

export const adminReducer = createReducer(
  initialAdminState,
  on(AdminActions.organizationSelected, (state, action) => {
    return {
      selectedOrganization: action.selectedOrganization,
      selectedProject: null,
      selectedSubject: null,
      selectedClient: null,
      selectedClientConfigCategory: null
    };
  }),
  on(AdminActions.projectSelected, (state, action) => {
    return {
      ...state,
      selectedProject: action.selectedProject,
      selectedSubject: null,
      selectedClient: null
    };
  }),
  on(AdminActions.subjectSelected, (state, action) => {
    return {
      ...state,
      selectedSubject: action.selectedSubject,
      selectedClient: null
    };
  }),
  on(AdminActions.clientSelected, (state, action) => {
    return {
      ...state,
      selectedClient: action.selectedClient,
      selectedProject: state.selectedProject || null,
    };
  }),
  on(AdminActions.clientConfigCategorySelected, (state, action) => {
    return {
      ...state,
      selectedClientConfigCategory: action.selectedClientConfigCategory,
    };
  })
);
