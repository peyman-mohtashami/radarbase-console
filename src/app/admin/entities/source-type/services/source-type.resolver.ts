import {inject, Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AppSourceType} from "../models/source-type";
import {catchError} from 'rxjs/operators';
import {SourceTypeService} from './source-type.service';

@Injectable({providedIn: 'root'})
export class SourceTypeResolver implements Resolve<AppSourceType> {
  private entityService = inject(SourceTypeService);
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSourceType> {
    const sourceTypeId = `${route.params['producer']}/${route.params['model']}/${route.params['version']}`;

    return this.entityService.getByKey(sourceTypeId).pipe(
      catchError(() => {
        this.router.navigate(['/admin', 'source-types']).then(() => {
          throw new Error(`ADMIN.sourceType.error.notFound`);
        });
        throw new Error();
      })
    );
  }
}
