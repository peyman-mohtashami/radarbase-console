// import { EntityActionOptions } from '@ngrx/data/src/actions/entity-action';
import { Observable } from 'rxjs';
import { QueryParams } from '@ngrx/data';
import { Store } from '@ngrx/store';
// import { RadarConfigDef, RadarConfigDTO } from "@rb/models";

export interface IBaseEntityService<T> {
  add(entity: T, options?: any): Observable<T>;
  // delete(entity: T, options?: EntityActionOptions): Observable<number | string>;
  delete(
    key: number | string,
    options?: any
  ): Observable<number | string>;

  getAll(options?: any): Observable<T[]>;
  // getAll(options?: EntityActionOptions): Observable<T[]>;
  getByKey(key: any, options?: any): Observable<T>;
  getWithQuery(
    queryParams: QueryParams | string,
    options?: any
  ): Observable<T[]>;
  // load(options?: EntityActionOptions): Observable<T[]>;
  update(entity: Partial<T>, options?: any): Observable<T>;
  getTotal(): number;
  // upsert(entity: T, options?: EntityActionOptions): Observable<T>;
  entities$?: Observable<T[]> | Store<T[]>;

  publish?: (configs: T[]) => Observable<T[]>;


}
