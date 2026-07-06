import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { SourceDataService } from './source-data.service';
import { AppSourceData } from "../models/source-data";

@Injectable({ providedIn: 'root' })
export class SourceDataResolver implements Resolve<AppSourceData> {
  private entityService = inject(SourceDataService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSourceData> {
    return this.entityService.getByKey(route.params['sourceDataId']);
  }
}
