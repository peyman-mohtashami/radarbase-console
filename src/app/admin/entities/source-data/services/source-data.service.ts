import {Injectable} from '@angular/core';
import {AppSourceData, RadarSourceData} from "../models/source-data";
import {Params} from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {BaseEntityService} from '../../../services/base-entity.service';
import {environment} from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class SourceDataService extends BaseEntityService<AppSourceData, RadarSourceData> {
  override getResourceUrl(): string {
    return `${environment.apiUrl}api/source-data`;
  }

  override toAppModel(entity: RadarSourceData): AppSourceData {
    return {
      ...entity,
      _name: entity.sourceDataName
    };
  }

  override toRadarModel(entity: AppSourceData): RadarSourceData {
    return entity;
  }

  override getWithQuery(queryParams: Params): Observable<AppSourceData[]> {
    const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<RadarSourceData[]>(this.getResourceUrl(), {
      params,
      observe: 'response',
    }).pipe(
      tap(
        (res) => {
          this.total.set(+(
            res.headers.get('x-total-count') ||
            res.body?.length.toString() ||
            '0'
          ))
        }
      ),
      map((res) => {
        const entities = (res.body || []).map((entity) => this.toAppModel(entity));
        this.cache = [...entities];
        return entities;
      })
    );
  }
}
