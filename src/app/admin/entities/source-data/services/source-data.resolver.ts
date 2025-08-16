import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { SourceDataService } from './source-data.service';
import { AppSourceData } from "../models/source-data";

@Injectable({ providedIn: 'root' })
export class SourceDataResolver implements Resolve<AppSourceData> {
  constructor(private entityService: SourceDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<AppSourceData>
    | Promise<AppSourceData>
    | AppSourceData {
    return this.entityService.getByKey(route.params['id']);
  }
}
