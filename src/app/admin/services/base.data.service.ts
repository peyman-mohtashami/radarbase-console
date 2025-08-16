import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export abstract class BaseDataService<
  RadarModel,
  AppModel
> extends DefaultDataService<AppModel> {
  public resourceUrl = '';

  protected constructor(
    @Inject(String) entityName: string,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super(entityName, http, httpUrlGenerator);
  }

  override getAll(): Observable<AppModel[]> {
    return this.http
      .get<RadarModel[]>(this.resourceUrl)
      .pipe(
        map((entities) =>
          entities.map((entity) => this.toAppModel(entity))
        )
      );
  }

  override getById(key: number | string): Observable<AppModel> {
    return this.http
      .get<RadarModel>(`${this.resourceUrl}/${encodeURIComponent(key)}`)
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  override add(entity: AppModel): Observable<AppModel> {
    console.log('Class: BaseDataService, Function: add, Line 40 entity' , entity);
    console.log('Class: BaseDataService, Function: add, Line 41 this.toRadarModel(entity)' , this.toRadarModel(entity));
    return this.http
      .post<RadarModel>(this.resourceUrl, this.toRadarModel(entity))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  override update(update: Update<AppModel>): Observable<AppModel> {
    return this.http
      .put<RadarModel>(this.resourceUrl, this.toRadarModel(update.changes))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  override delete(key: number | string): Observable<number | string> {
    console.log('Class: BaseDataService, Function: delete, Line 54 key' , key);
    const keys = key.toString().split(',');
    console.log('Class: BaseDataService, Function: delete, Line 56 keys' , keys);
    return this.http
      .delete<number | string>(`${this.resourceUrl}/${keys[0]}`)
      .pipe(map(() => keys[1]));
  }

  toAppModel(entity: RadarModel): AppModel {
    return { ...entity } as unknown as AppModel;
  }
  toRadarModel(entity: Partial<AppModel>): RadarModel {
    return { ...entity } as unknown as RadarModel;
  }
}
