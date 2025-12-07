// import {inject, Injectable} from '@angular/core';
// import {HttpClient} from "@angular/common/http";
// import {Observable} from 'rxjs';
// import {map} from 'rxjs/operators';
//
// @Injectable({providedIn: 'root'})
// export class BaseEntityService<T, U> {
//   private http = inject(HttpClient);
//
//   private readonly resourceUrl = 'api/organizations';
//
//   toAppModel(entity: U): T {
//     throw new Error('Method not implemented.');
//     // return entity as T;
//     // return {
//     //   ...entity,
//     //   _name: entity.name,
//     //   _search: `${entity.name} ${entity.description} ${entity.location}`,
//     // };
//   }
//
//   toRadarModel(entity: T): U {
//     throw new Error('Method not implemented.');
//     // return entity;
//   }
//
//   getAll(): Observable<T[]> {
//     return this.http.get<U[]>(this.resourceUrl)
//       .pipe(
//         map((entities) =>
//           entities.map((entity) => this.toAppModel(entity))
//         )
//       );
//   }
//
//   getByKey(key: number | string): Observable<T> {
//     return this.http.get<U>(`${this.resourceUrl}/${encodeURIComponent(key)}`)
//       .pipe(map((entity) => this.toAppModel(entity)));
//   }
//
//   add(entity: T): Observable<T> {
//     return this.http.post<U>(this.resourceUrl, this.toRadarModel(entity))
//       .pipe(map((entity) => this.toAppModel(entity)));
//   }
//
//   update(update: T): Observable<T> {
//     return this.http.put<U>(this.resourceUrl, this.toRadarModel(update))
//       .pipe(map((entity) => this.toAppModel(entity)));
//   }
//
//   delete(entity: T): Observable<void> {
//     return this.http.delete<void>(`${this.resourceUrl}/${entity.id}`);
//   }
// }
