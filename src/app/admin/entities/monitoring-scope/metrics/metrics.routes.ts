import {Routes} from "@angular/router";
import {MetricsPageComponent} from "./containers/metrics-page/metrics-page.component";
import {MetricsThreadsDetailsComponent} from "./components/metrics-threads-details/metrics-threads-details.component";

export const metricsRoutes: Routes = [
  {
    path: '',
    component: MetricsPageComponent,
  },
  {
    path: 'threads',
    component: MetricsThreadsDetailsComponent,
  },
];
