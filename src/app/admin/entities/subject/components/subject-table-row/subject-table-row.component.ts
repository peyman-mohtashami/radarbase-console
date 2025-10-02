import {Component, effect, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {AppSubject} from "../../models/subject";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatCard} from "@angular/material/card";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SubjectStatusComponent} from "../subject-status/subject-status.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {SubjectGroupComponent} from "../subject-group/subject-group.component";
import {TagComponent} from "../../../../components/tag/tag.component";
// import {PairAppComponent} from "../pair-app/pair-app.component";
// import {PairSourceComponent} from "../pair-source/pair-source.component";
// import {DiscontinueComponent} from "../discontinue/discontinue.component";
import {SubjectDetailsComponent} from "../subject-details/subject-details.component";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIconButton} from "@angular/material/button";
import {TableElement} from '../../../../models/table.model';
import {UpdateTrigger} from '../../services/subject-dialog.service';
import {ActionsComponent} from '../actions/actions.component';
import {SelectionModel} from '@angular/cdk/collections';
import {SubjectDialogMode} from '../../enums/dialog';

@Component({
  selector: 'rb-subject-table-row',
  templateUrl: './subject-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCheckbox,
    MatCard,
    RouterLink,
    SubjectStatusComponent,
    LocalDateComponent,
    SubjectGroupComponent,
    TagComponent,
    MatTooltip,
    // PairAppComponent,
    // PairSourceComponent,
    // DiscontinueComponent,
    SubjectDetailsComponent,
    MatIconButton,
    ActionsComponent,
  ]
})
export class SubjectTableRowComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;

  entity$ = input.required<AppSubject>();
  entityUpdateTrigger$= input<UpdateTrigger>();
  tableFields$ = input.required<TableElement[]>();
  configFields$ = input.required<Record<string, boolean>>();
  extensionClass$ = input<string>();
  selection$ = input.required<SelectionModel<any>>();


  expanded$ = signal(false);
  updated$ = signal(false);
  gridView = input<boolean>(false);

  constructor() {
    effect(() => {
      const updateTrigger = this.entityUpdateTrigger$();
      if (!updateTrigger) return;

      const {mode, entity} = updateTrigger;
      if (entity.id !== this.entity$().id) return;
      if (mode === SubjectDialogMode.ADD || mode === SubjectDialogMode.EDIT) {
        this.updated$.set(true);
        setTimeout(() => {
          this.updated$.set(false);
        }, 1000);
      }
    });
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded$.update((currentValue) => !currentValue);
  }

  openSourceDialog(entity: any, source: any, i: number) {
    // const dialogRef = this.dialog.open(SubjectDataDetailsPageComponent, {
    //   panelClass: 'tailwind-slide-panel',
    //   width: '50%', // adjust as needed
    //   height: '100vh',
    //   position: { right: '0' },
    //   hasBackdrop: true,
    // });
    //
    // dialogRef.componentInstance.entity = entity;
    // dialogRef.componentInstance.source = source;
    // dialogRef.componentInstance.index = i;
    // // dialogRef.componentInstance.age = 30;
  }

  mockSources = [
    {
      name: 'aRMT v2.5',
      status: 'CONNECTED',
      color: 'text-green-500',
      icon: 'check_circle'
    },
    {
      name: 'pRMT v2.7',
      status: 'PAUSED',
      color: 'text-orange-500',
      icon: 'pause_circle'
    },
    {
      name: 'Fitbit charge2',
      status: 'PENDING',
      color: 'text-purple-500',
      icon: 'hourglass_empty'
    },
  ]

  sourceClients = [
    {
      "sourceType": "FitBit",
      "authorizationEndpoint": "https://www.fitbit.com/oauth2/authorize",
      "tokenEndpoint": "https://api.fitbit.com/oauth2/token",
      "clientId": "22CYGY",
      "scope": "activity heartrate sleep profile"
    },
    {
      "sourceType": "Garmin",
      "authorizationEndpoint": "https://www.fitbit.com/oauth2/authorize",
      "tokenEndpoint": "https://api.fitbit.com/oauth2/token",
      "clientId": "22CYGY",
      "scope": "activity heartrate sleep profile"
    },
    {
      "sourceType": "Withings",
      "authorizationEndpoint": "https://www.fitbit.com/oauth2/authorize",
      "tokenEndpoint": "https://api.fitbit.com/oauth2/token",
      "clientId": "22CYGY",
      "scope": "activity heartrate sleep profile"
    }
  ]

  thirdPartyLogos: any = {
    'FitBit': 'assets/images/fitbit.svg',
    'Garmin': 'assets/images/garmin.svg',
    'Withings': 'assets/images/withings.png',
  }

  authorizerColumns: string[] = ['fitbit', 'garmin', 'whithings'];



  onAuthorizationAction(mode: DialogMode, entity?: AppSubject, entityName?: string, e?: Event, extra?: any): void {
    // console.log(entity);
    // e?.stopPropagation();
    //
    // if (entity) {
    //   return this.openAuthorizationDialog(mode, entity, extra);
    // }
    //
    // if (entityName) {
    //   const _entity = this.entities?.find(
    //     (e) => this.getEntityName(e) === entityName
    //   );
    //   if (_entity) {
    //     return this.openAuthorizationDialog(mode, _entity, extra);
    //   }
    // }
    //
    // if (entityName) {
    //   this.getByKey(entityName).subscribe({
    //     next: (_entity) => this.openAuthorizationDialog(mode, _entity),
    //     error: (err) => console.log(err),
    //   });
    // } else {
    //   this.openAuthorizationDialog(mode);
    // }
  }

  // openAuthorizationDialog(mode: DialogMode, entity?: AppSubject, extra?: any) {
  //   const dialogRef = this.getAuthorizationDialogRef(mode, entity, extra);
  //   this.applyStateChangesToUrlQueryParams({
  //     [mode]: entity ? this.getEntityName(entity) : 'new',
  //   });
  //
  //   const dialogActionSubscription =
  //     dialogRef.componentInstance.actionTriggered.subscribe({
  //       next: (value: { action: DialogMode | string; entity: AppSubject }) => {
  //         if (value.action === DialogMode.EDIT) {
  //           // this.updated = entity?.['id'];
  //           this.authorizationUpdate(value.entity).subscribe({
  //             next: () => this.onAuthorizationSuccess(mode, dialogRef, value.entity),
  //             error: (err) => this.onAuthorizationError(err, dialogRef),
  //           });
  //         } else if (value.action === DialogMode.ADD) {
  //           this.authorizationAdd(value.entity)
  //             .pipe()
  //             .subscribe({
  //               next: (res) => this.onAuthorizationSuccess(mode, dialogRef, res),
  //               error: (err) => this.onAuthorizationError(err, dialogRef),
  //             });
  //         } else if (value.action === DialogMode.DELETE) {
  //           console.log('Class: BaseEntitiesPage, Function: next, Line 253 delete' , value);
  //           this.authorizationDelete(value.entity).subscribe({
  //             next: () => this.onAuthorizationSuccess(mode, dialogRef, value.entity),
  //             error: (err) => this.onAuthorizationError(err, dialogRef),
  //           });
  //         } else if (value.action === 'close') {
  //           this.applyStateChangesToUrlQueryParams({ [mode]: null });
  //         }
  //       },
  //     });
  //   dialogRef.afterClosed().subscribe(() => {
  //     dialogActionSubscription.unsubscribe();
  //   });
  // }

  // authorizationUpdate(entity: AppSubject): Observable<AppSubject> {
  //   return this.entityService.update(entity);
  //   // throw new Error('BaseListPageComponent "update" method not implemented');
  //   // return this.entityService.update(entity);
  // }

  // authorizationAdd(entity: AppSubject): Observable<AppSubject> {
  //   console.log(555);
  //   return this.entityService.add(entity);
  //   // throw new Error('BaseListPageComponent "add" method not implemented');
  //   // return this.entityService.add(entity)
  // }

  isSourceClientsVisible = false;

  // authorizationDelete(entity: AppSubject): Observable<string | number> {
  //   if (this.type === TableType.GET_ALL_FROM_STORE) {
  //     return this.entityService.delete(`${entity['name']},${entity['id']}`);
  //   }
  //   return this.entityService.delete(entity['name']);
  //   // throw new Error('BaseListPageComponent "delete" method not implemented');
  // }
  //
  // onAuthorizationSuccess(mode: string, dialogRef: MatDialogRef<SubjectAuthorizationDialogComponent>, entity: AppSubject): void {
  //   if (this.type === TableType.GET_WITH_QUERY || this.type === TableType.GET_ALL) {
  //     this.updateTrigger$.next(entity['id']?.toString() || '0');
  //   }
  //   this.applyStateChangesToUrlQueryParams({ [mode]: null });
  //   dialogRef.close();
  //   console.log('Class: BaseEntitiesPage, Function: onSuccess, Line 253 ' , );
  //   this.updated = entity['id'];
  //   setTimeout(() => {
  //     this.updated = undefined;
  //   }, 1000);
  // }
  //
  // onAuthorizationError(error: HttpErrorResponse, dialogRef: MatDialogRef<SubjectAuthorizationDialogComponent>) {
  //   dialogRef.componentInstance.errorHappened(error);
  // }
  //
  // getAuthorizationDialogRef(mode: DialogMode, entity?: AppSubject, extra?: any) {
  //   return this.dialog.open(SubjectAuthorizationDialogComponent, {
  //     data: {
  //       mode,
  //       entity,
  //       // projectName: this.projectName,
  //       projects: this.projects,
  //       groups: this.groups,
  //     },
  //     panelClass: ['w-full', 'sm:w-1/2'],
  //     disableClose: true,
  //   });
  // }

}
