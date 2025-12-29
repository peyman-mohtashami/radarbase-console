import {Routes} from "@angular/router";
import {DataDownloadListPageComponent} from './containers/data-download-list-page/data-download-list-page.component';

export const dataDownloadRoutes: Routes = [
  {
    path: '',
    component: DataDownloadListPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];
