import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AppSourceType} from "../models/source-type";
import {SourceTypeService} from './source-type.service';

@Injectable({providedIn: 'root'})
export class SourceTypesResolver implements Resolve<AppSourceType[]> {
  private entityService = inject(SourceTypeService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSourceType[]> {
    return this.entityService.getWithQuery(route.queryParams);
  }
}
