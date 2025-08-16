import {Routes} from "@angular/router";
import {HealthCheckComponent} from "./containers/health-list-page/health.component";

export const healthRoutes: Routes = [
  {
    path: '',
    component: HealthCheckComponent,
  },
];
