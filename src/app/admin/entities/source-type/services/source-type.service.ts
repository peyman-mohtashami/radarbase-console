import {Injectable} from '@angular/core';
import {AppSourceType, RadarSourceType} from "../models/source-type";
import {BaseEntityService} from '../../../services/base-entity.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class SourceTypeService extends BaseEntityService<AppSourceType, RadarSourceType> {
  override getResourceUrl(): string {
    return `${environment.apiUrl}api/source-types`;
  }

  override toAppModel(entity: RadarSourceType): AppSourceType {
    return {
      ...entity,
      _name: `${entity.producer}_${entity.model}_${entity.catalogVersion}`,
      _search: `${entity.producer} ${entity.model} ${entity.catalogVersion} ${entity.description} ${entity.name}`,
    };
  }

  override toRadarModel(entity: AppSourceType): RadarSourceType {
    return entity;
  }

  override getByKey(key: number | string): Observable<AppSourceType> {
    return this.http.get<RadarSourceType>(`${this.getResourceUrl()}/${key}`)
      .pipe(
        map((entity) => this.toAppModel(entity)),
        tap((entity) => {
          this.cache = [entity];
        })
      );
  }

  override delete(entity: AppSourceType): Observable<void> {
    return this.http.delete<void>(`${this.getResourceUrl()}/${entity.producer}/${entity.model}/${entity.catalogVersion}`).pipe(
      tap(() => {
        this.cacheLoaded = false;
      })
    );
  }
}
