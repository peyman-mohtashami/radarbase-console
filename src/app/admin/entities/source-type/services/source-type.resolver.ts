import {inject, Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {AppSourceType} from "../models/source-type";
import {SourceTypeStore} from './source-type.store';

@Injectable({providedIn: 'root'})
export class SourceTypeResolver implements Resolve<AppSourceType | null> {
  private store = inject(SourceTypeStore);
  private router = inject(Router);

  async resolve(route: ActivatedRouteSnapshot): Promise<AppSourceType | null> {
    const sourceTypeId = `${route.params['producer']}/${route.params['model']}/${route.params['version']}`;
    await this.store.getByKey(sourceTypeId);

    const sourceType = this.store.selected();

    if (!sourceType) await this.router.navigate(['/admin/source-types']);
    return sourceType;
  }
}
