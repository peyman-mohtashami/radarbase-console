import {Injectable, signal, WritableSignal} from '@angular/core';
import {BaseEntityService, DEFAULT_PAGE_SIZE} from '../../../services/base.entity.service';
import {AppSourceData} from "../models/source-data";
import {RadarSourceData} from '../../../../shared/models/radar-source-data.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Params, Router} from '@angular/router';
// import {TableType} from '../../../models/table.model';
import {DialogMode} from '../../../enums/dialog';
import {SourceDataDialogComponent} from '../containers/source-data-dialog/source-data-dialog.component';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {map, tap} from 'rxjs/operators';
import {QueryParams} from '@ngrx/data';

export interface DialogData { mode: DialogMode, entity?: AppSourceData, extra?: any }

@Injectable({providedIn: 'root'})
export class SourceDataService {
  resourceUrl = 'api/source-data';
  protected total = 0;

  updateTrigger$: BehaviorSubject<string> = new BehaviorSubject<string>('init');
  updated: WritableSignal<string | undefined> = signal(undefined);

  constructor(private http: HttpClient) {}

  // publish?: ((configs: AppModel[]) => Observable<AppModel[]>) | undefined;

  // openDialog(data: {mode: DialogMode, entity?: any, data?: any, extra?: any}): void {
  //   throw new Error('Method not implemented.');
  // }

  // entities$?: Observable<AppModel[]> | Store<AppModel[]>;

  getTotal(): number {
    return this.total;
  }

  // getAll(): Observable<AppModel[]> {
  //   return this.http
  //     .get<RadarModel[]>(this.resourceUrl)
  //     .pipe(
  //       map((entities) =>
  //         entities.map((entity) => this.toAppModel(entity))
  //       )
  //     );
  // }

  getWithQuery(queryParams?: Params | string): Observable<AppSourceData[]> {
    const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<RadarSourceData[]>(this.resourceUrl, {
      params,
      observe: 'response',
    }).pipe(
      tap(
        (res) => {
          this.total = +(
            res.headers.get('x-total-count') ||
            res.body?.length.toString() ||
            '0'
          )
        }
      ),
      map((res) => {
        return (res.body || []).map((entity) => this.toAppModel(entity));
      })
    );
  }

  add(entity: AppSourceData): Observable<AppSourceData> {
    return this.http.post<RadarSourceData>(this.resourceUrl, this.toRadarModel(entity))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  getByKey(key: number | string): Observable<AppSourceData> {
    return this.http.get<RadarSourceData>(`${this.resourceUrl}/${encodeURIComponent(key)}`)
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  update(update: AppSourceData): Observable<AppSourceData> {
    return this.http.put<RadarSourceData>(this.resourceUrl, this.toRadarModel(update))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  delete(key: number | string): Observable<number | string> {
    return this.http.delete<number | string>(
      `${this.resourceUrl}/${encodeURIComponent(key)}`
    );
  }

  convertParamsToHttpParams(queryParams: Params): {
    params: HttpParams;
    parentEntityName: string;
  } {
    let params = new HttpParams();
    params = params.append(
      'size',
      queryParams?.['pageSize'] || DEFAULT_PAGE_SIZE
    );
    params = params.append('page', queryParams?.['pageIndex'] || '0');
    if (
      queryParams?.['sortField'] &&
      queryParams['sortField'] !== '' &&
      queryParams?.['sortOrder'] &&
      queryParams['sortOrder'] !== ''
    ) {
      params = params.append(
        'sort',
        queryParams['sortField'] + ',' + queryParams['sortOrder']
      );
    } else {
      params = params.append('sort', 'id' + ',' + 'desc');
    }
    params = this.convertFilterParamsToHttpParams(params, queryParams);
    return { params, parentEntityName: queryParams?.['parentEntityName'] };
  }

  convertFilterParamsToHttpParams(params: HttpParams, queryParams?: Params) {
    return params;
  }

  //TODO should remove
  getResourceUrl(parentEntityName?: string | string[]): string {
    return this.resourceUrl;
  }

  toAppModel(entity: RadarSourceData): AppSourceData {
    return {
      ...entity,
      name: entity.sourceDataName
    };
  }

  toRadarModel(entity: AppSourceData): RadarSourceData {
    return { ...entity } as unknown as RadarSourceData;
  }
}
// export class SourceDataService extends BaseEntityService<
//   RadarSourceData,
//   AppSourceData
// > {
//
//   override resourceUrl = 'api/source-data';
//   // type = TableType.GET_WITH_QUERY;
//
//   constructor(
//     http: HttpClient,
//     private dialog: MatDialog,
//     private activatedRoute: ActivatedRoute,
//     private router: Router) {
//     super(http);
//   }
//
//
//
//   override openDialog(dialogData: DialogData) {
//     const dialogRef = this.getDialogRef(dialogData);
//
//     const dialogActionSubscription =
//       dialogRef.componentInstance.actionTriggered.subscribe({
//         next: ({action, entity}: { action: DialogMode | string; entity: any }) => {
//           console.log('Class: SourceDataService, Function: next, Line 44 action' , action);
//           switch (action) {
//             case DialogMode.EDIT:
//               this.update(entity).subscribe({
//                 next: () => this.onSuccess(dialogRef, entity),
//                 error: (err) => this.onError(err, dialogRef),
//               });
//               break;
//             case DialogMode.ADD:
//               this.add(entity).subscribe({
//                   next: (res) => this.onSuccess(dialogRef, res),
//                   error: (err) => this.onError(err, dialogRef),
//                 });
//               break;
//             case DialogMode.DELETE:
//               this.delete(entity['name']).subscribe({
//                 next: () => this.onSuccess(dialogRef, entity),
//                 error: (err) => this.onError(err, dialogRef),
//               });
//               break;
//             case 'close':
//               this.router.navigate([], {
//                 relativeTo: this.activatedRoute,
//                 queryParamsHandling: 'preserve'
//               }).then(() => {
//                 // dialogRef.componentInstance.close()
//               });
//               // this.router.navigate([], {
//               //   relativeTo: this.activatedRoute,
//               //   queryParamsHandling: 'preserve'
//               // }).then();
//               // break;
//           }
//         },
//       });
//     dialogRef.afterClosed().subscribe(() => {
//       console.log('Class: SourceDataService, Function: , Line 80 ' , );
//       dialogActionSubscription.unsubscribe();
//     });
//   }
//
//   onSuccess(dialogRef: MatDialogRef<any>, entity: AppSourceData): void {
//     // if (this.type === TableType.GET_WITH_QUERY || this.type === TableType.GET_ALL) {
//       this.updateTrigger$.next(`${entity?.['id'] ?? '0'}`);
//     // }
//
//     this.router.navigate([], {
//       relativeTo: this.activatedRoute,
//       queryParamsHandling: 'preserve'
//     }).then(() => {
//       dialogRef.componentInstance.close()
//     });
//
//     this.updated.set(`${entity['id']}`);// = undefined;
//     // this.updated = entity['id'];
//     setTimeout(() => {
//       this.updated.set(undefined);// = undefined;
//     }, 1000);
//   }
//
//   onError(error: HttpErrorResponse, dialogRef: MatDialogRef<any>) {
//     console.log('Class: SourceDataService, Function: onError, Line 97 ' , );
//     dialogRef.componentInstance.errorHappened(error);
//   }
//
//   getDialogRef(data: DialogData): MatDialogRef<SourceDataDialogComponent> {
//     return this.dialog.open(SourceDataDialogComponent,
//       {
//         data: data,
//         panelClass: 'tailwind-slide-panel',
//         width: '50%',
//         height: '100vh',
//         position: {right: '0'},
//         hasBackdrop: true,
//         disableClose: true,
//         autoFocus: false,
//         restoreFocus: false
//       }
//     );
//   }
// }
//
//
