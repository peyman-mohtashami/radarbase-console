import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSourceType, RadarSourceType} from "../models/source-type";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SourceTypeService {
  private http = inject(HttpClient);

  private readonly resourceUrl = 'api/source-types';

  toAppModel(entity: RadarSourceType): AppSourceType {
    return {
      ...entity,
      _name: `${entity.producer}/${entity.model}/${entity.catalogVersion}`,
      _search: `${entity.producer} ${entity.model} ${entity.catalogVersion} ${entity.description} ${entity.name}`,
    };
  }

  toRadarModel(entity: AppSourceType): RadarSourceType {
    return entity;
  }

  getAll(): Observable<AppSourceType[]> {
    return this.http.get<RadarSourceType[]>(this.resourceUrl)
      .pipe(
        map((entities) =>
          entities.map((entity) => this.toAppModel(entity))
        )
      );
  }

  getByKey(key: number | string): Observable<AppSourceType> {
    return this.http.get<RadarSourceType>(`${this.resourceUrl}/${key}`)//;//encodeURIComponent(key)}`)
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  add(entity: AppSourceType): Observable<AppSourceType> {
    return this.http.post<RadarSourceType>(this.resourceUrl, this.toRadarModel(entity))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  update(update: AppSourceType): Observable<AppSourceType> {
    return this.http.put<RadarSourceType>(this.resourceUrl, this.toRadarModel(update))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  delete(entity: AppSourceType): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${entity._name}`
    );
  }
}
