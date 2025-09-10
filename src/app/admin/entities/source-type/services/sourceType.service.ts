import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";

import {BaseEntityService, DEFAULT_PAGE_SIZE} from '../../../services/base.entity.service';
import {AppSourceType, RadarSourceType} from "../models/source-type";
// import {TableType} from '../../../models/table.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DialogMode} from '../../../enums/dialog';
import {DialogData} from '../../source-data/services/source-data.service';
import {SourceTypeDialogComponent} from '../containers/source-type-dialog/source-type-dialog.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {map, tap} from 'rxjs/operators';
import {QueryParams} from '@ngrx/data';
import {AppSourceData} from '../../source-data/models/source-data';

@Injectable({ providedIn: 'root' })
export class SourceTypeService {
  resourceUrl = 'api/source-types';
  // type = TableType.GET_WITH_QUERY;

  constructor(private http: HttpClient) {}

  toAppModel(entity: RadarSourceType): AppSourceType {
    return {
      ...entity,
      name: `${entity.producer}/${entity.model}/${entity.catalogVersion}`,
    };
  }

  toRadarModel(entity: AppSourceType): RadarSourceType {
    return { ...entity };
  }

  // override openDialog(dialogData: DialogData) {
  //   const dialogRef = this.getDialogRef(dialogData);
  //
  //   const dialogActionSubscription =
  //     dialogRef.componentInstance.actionTriggered.subscribe({
  //       next: ({action, entity}: { action: DialogMode | string; entity: any }) => {
  //         switch (action) {
  //           case DialogMode.EDIT:
  //             this.update(entity).subscribe({
  //               next: () => this.onSuccess(dialogRef, entity),
  //               error: (err) => this.onError(err, dialogRef),
  //             });
  //             break;
  //           case DialogMode.ADD:
  //             this.add(entity).subscribe({
  //               next: (res) => this.onSuccess(dialogRef, res),
  //               error: (err) => this.onError(err, dialogRef),
  //             });
  //             break;
  //           case DialogMode.DELETE:
  //             this.delete(entity['name']).subscribe({
  //               next: () => this.onSuccess(dialogRef, entity),
  //               error: (err) => this.onError(err, dialogRef),
  //             });
  //             break;
  //           case 'close':
  //             this.router.navigate([], {
  //               relativeTo: this.activatedRoute,
  //               queryParamsHandling: 'preserve'
  //             }).then(() => {
  //               // dialogRef.componentInstance.close()
  //             });
  //           // this.router.navigate([], {
  //           //   relativeTo: this.activatedRoute,
  //           //   queryParamsHandling: 'preserve'
  //           // }).then();
  //           // break;
  //         }
  //       },
  //     });
  //   dialogRef.afterClosed().subscribe(() => {
  //     console.log('Class: SourceDataService, Function: , Line 80 ' , );
  //     dialogActionSubscription.unsubscribe();
  //   });
  // }
  //
  // onSuccess(dialogRef: MatDialogRef<any>, entity: AppSourceType): void {
  //   // if (this.type === TableType.GET_WITH_QUERY || this.type === TableType.GET_ALL) {
  //     this.updateTrigger$.next(`${entity?.['id'] ?? '0'}`);
  //   // }
  //
  //   this.router.navigate([], {
  //     relativeTo: this.activatedRoute,
  //     queryParamsHandling: 'preserve'
  //   }).then(() => {
  //     dialogRef.componentInstance.close()
  //   });
  //
  //   this.updated.set(`${entity['id']}`);// = undefined;
  //   // this.updated = entity['id'];
  //   setTimeout(() => {
  //     this.updated.set(undefined);// = undefined;
  //   }, 1000);
  // }
  //
  // onError(error: HttpErrorResponse, dialogRef: MatDialogRef<any>) {
  //   dialogRef.componentInstance.errorHappened(error);
  // }
  //
  // getDialogRef(data: DialogData): MatDialogRef<SourceTypeDialogComponent> {
  //   return this.dialog.open(SourceTypeDialogComponent,
  //     {
  //       data: data,
  //       panelClass: 'tailwind-slide-panel',
  //       width: '50%',
  //       height: '100vh',
  //       position: {right: '0'},
  //       hasBackdrop: true,
  //       disableClose: true,
  //       autoFocus: false,
  //       restoreFocus: false
  //     }
  //   );
  // }

  // resourceUrl = '';
  // protected total = 0;

  updateTrigger$: BehaviorSubject<string> = new BehaviorSubject<string>('init');
  updated: WritableSignal<string | undefined> = signal(undefined);

  // protected constructor(public http: HttpClient) {}

  // publish?: ((configs: AppModel[]) => Observable<AppModel[]>) | undefined;

  // openDialog(data: {mode: DialogMode, entity?: any, data?: any, extra?: any}): void {
  //   throw new Error('Method not implemented.');
  // }
  //
  // entities$?: Observable<AppModel[]> | Store<AppModel[]>;
  //
  // getTotal(): number {
  //   return this.total;
  // }

  getAll(): Observable<AppSourceType[]> {
    return this.http.get<RadarSourceType[]>(this.resourceUrl)
      .pipe(
        map((entities) =>
          entities.map((entity) => this.toAppModel(entity))
        )
      );
  }

  // getWithQuery(queryParams?: QueryParams | string): Observable<AppModel[]> {
  //   console.log("BaseEntityService getWithQuery")
  //   const { params } = this.convertParamsToHttpParams(queryParams as Params);
  //   return (
  //     this.http
  //       // .get<DTO[]>(this.getResourceUrl(parentEntityName), {
  //       .get<RadarModel[]>(this.resourceUrl, {
  //         params,
  //         observe: 'response',
  //       })
  //       .pipe(
  //         tap(
  //           (res) =>
  //             (this.total = +(
  //               res.headers.get('x-total-count') ||
  //               res.body?.length.toString() ||
  //               '0'
  //             ))
  //         ),
  //         map((res) => {
  //           console.log("BaseEntityService getWithQuery", res.body)
  //           return (res.body || []).map((entity) =>
  //             this.toAppModel(entity)
  //           );
  //         })
  //       )
  //   );
  // }

  add(entity: AppSourceType): Observable<AppSourceType> {
    return this.http.post<RadarSourceType>(this.resourceUrl, this.toRadarModel(entity))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  getByKey(key: number | string): Observable<AppSourceType> {
    return this.http.get<RadarSourceType>(`${this.resourceUrl}/${encodeURIComponent(key)}`)
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  update(update: AppSourceType): Observable<AppSourceType> {
    return this.http.put<RadarSourceType>(this.resourceUrl, this.toRadarModel(update))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  delete(key: number | string): Observable<number | string> {
    return this.http.delete<number | string>(
      `${this.resourceUrl}/${key}`
    );
  }

  // convertParamsToHttpParams(queryParams: Params): {
  //   params: HttpParams;
  //   parentEntityName: string;
  // } {
  //   let params = new HttpParams();
  //   params = params.append(
  //     'size',
  //     queryParams?.['pageSize'] || DEFAULT_PAGE_SIZE
  //   );
  //   params = params.append('page', queryParams?.['pageIndex'] || '0');
  //   if (
  //     queryParams?.['sortField'] &&
  //     queryParams['sortField'] !== '' &&
  //     queryParams?.['sortOrder'] &&
  //     queryParams['sortOrder'] !== ''
  //   ) {
  //     params = params.append(
  //       'sort',
  //       queryParams['sortField'] + ',' + queryParams['sortOrder']
  //     );
  //   } else {
  //     params = params.append('sort', 'id' + ',' + 'desc');
  //   }
  //   params = this.convertFilterParamsToHttpParams(params, queryParams);
  //   return { params, parentEntityName: queryParams?.['parentEntityName'] };
  // }
  //
  // convertFilterParamsToHttpParams(params: HttpParams, queryParams?: Params) {
  //   return params;
  // }
  //
  // //TODO should remove
  // getResourceUrl(parentEntityName?: string | string[]): string {
  //   return this.resourceUrl;
  // }
}
