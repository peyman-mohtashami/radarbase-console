import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot, Router,
} from '@angular/router';
import { AppSourceData } from "../models/source-data";
import {SourceDataStore} from './source-data.store';

@Injectable({ providedIn: 'root' })
export class SourceDataResolver implements Resolve<AppSourceData | null> {
  private store = inject(SourceDataStore);
  private router = inject(Router);

  async resolve(route: ActivatedRouteSnapshot): Promise<AppSourceData | null> {
    const sourceDataId = route.paramMap.get('sourceDataId')!;
    await this.store.getByKey(sourceDataId);

    const sourceData = this.store.selected();
    if (!sourceData) await this.router.navigate(['/admin/organizations']);

    return sourceData;
  }
}
