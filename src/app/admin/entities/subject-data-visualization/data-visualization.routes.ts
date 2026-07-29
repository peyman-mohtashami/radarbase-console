import {Routes} from "@angular/router";
import {
  DataVisualizationListPageComponent
} from './containers/data-visualization-list-page/data-visualization-list-page.component';

export const dataVisualizationRoutes: Routes = [
  {
    path: '',
    component: DataVisualizationListPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];
