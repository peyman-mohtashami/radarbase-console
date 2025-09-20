import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { SourceDataService } from './source-data.service';
import { AppSourceData } from "../models/source-data";

@Injectable({ providedIn: 'root' })
export class SourcesDataResolver implements Resolve<AppSourceData[]> {
  private entityService = inject(SourceDataService);

  resolve(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<AppSourceData[]>
    | Promise<AppSourceData[]>
    | AppSourceData[] {
    return this.entityService.getWithQuery(route.queryParams);
  }
}
