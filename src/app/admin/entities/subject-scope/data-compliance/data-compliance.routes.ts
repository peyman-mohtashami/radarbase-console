import {Routes} from "@angular/router";
import {
  DataComplianceListPageComponent
} from './containers/data-compliance-list-page/data-compliance-list-page.component';

export const dataComplianceRoutes: Routes = [
  {
    path: '',
    component: DataComplianceListPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];
