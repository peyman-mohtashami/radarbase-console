import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppSourceType } from "../models/source-type";
import {map} from 'rxjs/operators';
import {SourceTypeService} from './source-type.service';

@Injectable({ providedIn: 'root' })
export class SourceTypeResolver implements Resolve<AppSourceType> {
  private entityService = inject(SourceTypeService);

  resolve(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<AppSourceType>
    | Promise<AppSourceType>
    | AppSourceType {
    return this.entityService.getAll().pipe(
      map(entities => {
        const entity = entities.find(entity =>
          entity.producer === route.params['producer'] && entity.model === route.params['model'] && entity.catalogVersion === route.params['version'])
        if (entity) {
          return entity;
        } else {
          throw new Error('Entity not found');
        }
      }));
  }
}
