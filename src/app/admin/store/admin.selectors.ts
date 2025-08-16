import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './reducers';

export const selectAdminState = createFeatureSelector<AdminState>('admin');

export const organization = createSelector(
  selectAdminState,
  (admin) => admin.selectedOrganization
);

export const project = createSelector(
  selectAdminState,
  (admin) => admin.selectedProject
);

export const subject = createSelector(
  selectAdminState,
  (admin) => admin.selectedSubject
);

export const client = createSelector(
  selectAdminState,
  (admin) => admin.selectedClient
);

export const clientConfigCategory = createSelector(
  selectAdminState,
  (admin) => admin.selectedClientConfigCategory
);
