import {Injectable} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {SourceTypeService} from './sourceType.service';
import {AppSourceType} from '../models/source-type';
import {SourceTypeDialogComponent} from '../containers/source-type-dialog/source-type-dialog.component';

@Injectable({providedIn: 'root'})
export class SourceTypeDialogService {
  updateTrigger$ = new BehaviorSubject<string>('init');

  constructor(
    private entityService: SourceTypeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  openDialog(mode: DialogMode, entity?: any, extra?: any) {
    const dialogRef = this.getDialogRef(mode, entity, extra);

    const dialogActionSubscription =
      dialogRef.componentInstance.actionTriggered.subscribe({
        next: (value: { action: DialogMode | string; entity: any }) => {
          if (value.action === DialogMode.EDIT) {
            // this.updated = entity?.['id'];
            this.update(value.entity).subscribe({
              next: () => this.onSuccess(mode, dialogRef, value.entity),
              error: (err) => this.onError(err, dialogRef),
            });
          } else if (value.action === DialogMode.ADD) {
            this.add(value.entity)
              .subscribe({
                next: (res) => this.onSuccess(mode, dialogRef, res),
                error: (err) => this.onError(err, dialogRef),
              });
          } else if (value.action === DialogMode.DELETE) {
            this.delete(value.entity).subscribe({
              next: () => this.onSuccess(mode, dialogRef, value.entity),
              error: (err) => this.onError(err, dialogRef),
            });
          } else if (value.action === DialogMode.CLOSE) {
            this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParamsHandling: 'preserve'
            }).then();
          }
        },
      });
    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  onSuccess(mode: string, dialogRef: MatDialogRef<any>, entity: any): void {
    this.updateTrigger$.next(entity['id']?.toString() || '0');
    this.applyStateChangesToUrlQueryParams({[mode]: null});
    dialogRef.close();
    // this.updated = entity['id'];
    setTimeout(() => {
      // this.updated = undefined;
    }, 1000);
  }

  onError(error: HttpErrorResponse, dialogRef: MatDialogRef<any>) {
    dialogRef.componentInstance.errorHappened(error);
  }

  applyStateChangesToUrlQueryParams(queryParams: Params): void {
    this.router
      .navigate([], {
        replaceUrl: true,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
        fragment: this.activatedRoute.snapshot.fragment ?? undefined,
      })
      .then();
  }

  getDialogRef(mode: DialogMode, entity?: AppSourceType, extra?: any): MatDialogRef<any> {
    return this.dialog.open(SourceTypeDialogComponent, {
      data: {mode, entity, extra},
      panelClass: 'tailwind-slide-panel',
      width: '50%',
      height: '100vh',
      position: {right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }

  update(entity: AppSourceType): Observable<AppSourceType> {
    return this.entityService.update(entity);
  }

  add(entity: AppSourceType): Observable<AppSourceType> {
    return this.entityService.add(entity);
  }

  delete(entity: AppSourceType): Observable<string | number> {
    return this.entityService.delete(entity.name);
  }

  // handleDialogUrlFragment() {
  //   this.activatedRoute.fragment
  //     .pipe(takeUntil(this._destroy$))
  //     .subscribe(fragment => {
  //       if (!fragment) return;
  //
  //       const fragmentItems = fragment.split('/');
  //
  //       const actionType = fragmentItems[1];
  //       const actionEntity = fragmentItems[2];
  //       const actionId = fragmentItems[3];
  //
  //       if (actionEntity === 'sourceData') {
  //         if (actionType === 'add') {
  //           this.openDialog(DialogMode.ADD, this.data);
  //         } else if (actionType === 'edit') {
  //           const entity = this.entities.find(e => e['id'] == actionId);
  //           this.openDialog(DialogMode.EDIT, entity, this.data);
  //         } else if (actionType === 'delete') {
  //           // const id = fragment.split('/')[2];
  //           // console.log('Class: ImplEntitiesPageComponent, Function: , Line 274 id', id);
  //           // console.log('Class: ImplEntitiesPageComponent, Function: , Line 275 this.entities', this.entities);
  //           const entity = this.entities.find(e => {
  //             // console.log('Class: ImplEntitiesPageComponent, Function: , Line 277 e ', e, e['id'], id, e['id'] == id);
  //             return e['id'] == actionId
  //           });
  //           this.openDialog(DialogMode.DELETE, entity, this.data);
  //         }
  //       }
  //     });
  // }

}
