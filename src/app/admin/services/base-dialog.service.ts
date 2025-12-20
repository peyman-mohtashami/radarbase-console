import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {DialogMode} from '../enums/dialog';
import {BaseDialogComponent} from '../components/dialog/base-dialog.component';
// import {BaseEntityService} from './base-entity.service';
import {BaseConfigService} from './base-config.service';

@Injectable({providedIn: 'root'})
export class BaseDialogService<T extends {_name: string;}, U extends BaseDialogComponent<T>> {
  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);
  protected dialog = inject(MatDialog);

  protected entityService!: any; //BaseEntityService<T, any>;
  protected configService!: BaseConfigService;

  dialogUpdateEvent: WritableSignal<{mode: DialogMode | string; entity?: T;} | undefined> = signal(undefined);

  processUrlFragment(fragment: string, data: {entity?: T; entities?: T[];}) {
    console.log('Class: BaseDialogService, Function: processUrlFragment, Line 23 ' , fragment, data);
    const entityMetadata = this.configService.getEntityMetadata();
    console.log('Class: BaseDialogService, Function: processUrlFragment, Line 25 entityMetadata' , entityMetadata);
    const [, action, entityType, entityId] = fragment.split('/');
    console.log('Class: BaseDialogService, Function: processUrlFragment, Line 27 action, entityType, entityId' , action, entityType, entityId);
    if (entityType === entityMetadata.name) {
      const entity = data.entity ?? data.entities?.find(e => e._name == entityId);
      console.log('Class: BaseDialogService, Function: processUrlFragment, Line 30 entity' , entity);
      switch (action) {
        case 'add':
          console.log('Class: BaseDialogService, Function: processUrlFragment, Line 33 ' , );
          this.openDialog(DialogMode.ADD, {...data, entity});
          break;
        case 'edit':
          console.log('Class: BaseDialogService, Function: processUrlFragment, Line 37 ' , );
          if (entity) this.openDialog(DialogMode.EDIT, {...data, entity});
          break;
        case 'delete':
          console.log('Class: BaseDialogService, Function: processUrlFragment, Line 41 ' , );
          if (entity) this.openDialog(DialogMode.DELETE, {...data, entity});
          break;
      }
    }
  }

  openDialog(mode: DialogMode | string, data: any) {
    console.log('Class: BaseDialogService, Function: openDialog, Line 49 mode, data' , mode, data);
    if (mode !== DialogMode.ADD && !data.entity) {
      this.clearFragmentUrl();
      return;
    }

    const dialogRef = this.createDialogRef(mode, data);

    const dialogActionSubscription =
      dialogRef.componentInstance.dialogActionEvent.subscribe(
        (value) => {
          const _entity = value.entity;
          const _action = value.action;
          if (!_entity) {
            dialogRef.close();
            this.clearFragmentUrl();
            return;
          }
          this.processDialogAction(_action, _entity).subscribe({
            next: (res) => {
              const entity = res ?? _entity;
              // this.dialogUpdateEvent.set({mode, entity: {...entity, projects: entity.projects}})
              this.dialogUpdateEvent.set({mode, entity})
              dialogRef.close();
            },
            error: (error: HttpErrorResponse) => dialogRef.componentInstance.errorHappened(error),
          });
        }
      );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  processDialogAction(actionType: DialogMode | string, entity: T): Observable<T | void> {
    switch (actionType) {
      case DialogMode.ADD:
        return this.entityService.add(entity);
      case DialogMode.EDIT:
        return this.entityService.update(entity);
      case DialogMode.DELETE:
        return this.entityService.delete(entity);
      default:
        this.clearFragmentUrl();
        return of();
    }
  }

  clearFragmentUrl() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined // Explicitly remove the fragment
    }).then();
  }

  createDialogRef(mode: DialogMode | string, data: any): MatDialogRef<U> {
    throw new Error('Method not implemented.');
  }
}
