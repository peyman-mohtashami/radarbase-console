import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';

import { ClientDialogComponent } from '../client-dialog/client-dialog.component';
import { FormFieldType } from '../../../../models/dialog.model';
import { FilterItem, TableType } from '../../../../models/table.model';
import { DialogMode } from '../../../../enums/dialog';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
// import { AdminActions } from "../../../../store/action.types";
import { Store } from "@ngrx/store";
import { AppClient } from "../../models/client";
import {BaseEntitiesPage} from "../../../../components/base-entities-page/base-entities-page";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField} from "@angular/material/input";
import {MatLabel, MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/core";
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'rb-clients-select',
  templateUrl: './clients-select-page.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    TranslatePipe,
    MatSelect,
    MatOption, MatLabel, RouterOutlet,
  ]
})
export class ClientsSelectPageComponent implements OnInit, OnDestroy {

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  entities: AppClient[] = this.activatedRoute.snapshot.data['entities'];
  // override type = TableType.GET_ALL_FROM_STORE;

  // override filters: FilterItem[] = [
  //   {
  //     name: 'clientId',
  //     label: 'ADMIN.client.clientId.tableLabel',
  //     type: FormFieldType.INPUT,
  //   },
  // ];

  organizationName?: string =
    this.activatedRoute.snapshot.parent?.parent?.params['id'];
  projectName?: string =
    this.activatedRoute.snapshot.parent?.parent?.params['id'];
  subjectId?: string =
    this.activatedRoute.snapshot.parent?.parent?.params['id'];

  // listView = this.activatedRoute.snapshot.paramMap.get('listView');

  form = new FormGroup({
    client: new FormControl(this.activatedRoute.firstChild?.snapshot.params['id'])
  })

  // form = this.fb.group({
  //   client: [this.activatedRoute.firstChild?.snapshot.params['id']],
  //   category: [this.activatedRoute.firstChild?.snapshot.params['category']],
  // });
  //
  // controls = {
  //   client: this.form.get('client'),
  //   category: this.form.get('category'),
  // };

  // selectedClientId = this.activatedRoute.firstChild?.snapshot.params['id'];

  // subscription$: Subject<void> = new Subject<void>();

  // constructor(
  //   private router: Router,
  //   private activatedRoute: ActivatedRoute,
  //   // dialog: MatDialog,
  //   // entityService: ClientService, //ClientEntityService,
  //   // private fb: FormBuilder,
  //   // private store: Store,
  // ) {
  //   console.log('Class: ClientsSelectPageComponent, Function: constructor, Line 84 ' , );
  //   // super(router, activatedRoute, dialog, entityService);
  // }

  ngOnInit(): void {
    // this.init();
    // this.store.dispatch(
    //   AdminActions.subjectSelected({ selectedSubject: null })
    // );
    // this.store.dispatch(
    //   AdminActions.clientSelected({ selectedClient: null })
    // );
    // this.store.dispatch(
    //   AdminActions.clientConfigCategorySelected({ selectedClientConfigCategory: null })
    // );
    console.log('Class: ClientsSelectPageComponent, Function: ngOnInit, Line 96 this.activatedRoute.firstChild?.snapshot.params' , this.activatedRoute.firstChild?.snapshot.params);
    // console.log(this.activatedRoute.firstChild?.snapshot.params);
    // this.form = this.fb.group({
    //   client: [this.activatedRoute.firstChild?.snapshot.params['id']],
    //   category: [this.activatedRoute.firstChild?.snapshot.params['category']],
    // });
    // const clientId = this.activatedRoute.firstChild?.snapshot.params.id;

    this.form.controls.client.valueChanges.subscribe(value => {
      console.log('Class: ClientsSelectPageComponent, Function: , Line 103 value' , value);
      if (value) {
        // this.router.navigateByUrl('/admin/global-configs/apps/' + value ).then();
        this.router.navigate([value], {relativeTo: this.activatedRoute} ).then();
        // this.router.navigate([value], {relativeTo: this.activatedRoute}).then();
        // this.router.navigate([value], {
        //   relativeTo: this.activatedRoute,
        // }).then();
        // this.router.navigate([value]).then();
      }
    })

    // this.controls.client?.valueChanges
    //   .pipe(takeUntil(this.subscription$))
    //   .subscribe((value) => {
    //     this.selectedClientId = value;
    //     this.controls.category?.patchValue('general');
    //     this.store.dispatch(
    //       AdminActions.clientSelected({
    //         selectedClient: value,
    //       })
    //     );
    //     // this.store.dispatch(
    //     //   AdminActions.clientConfigCategorySelected({
    //     //     selectedClientConfigCategory: 'general',
    //     //   })
    //     // );
    //     console.log('Class: ClientsSelectPageComponent, Function: , Line 103 value' , value);
    //     this.router
    //       .navigate([value.clientId], {
    //         relativeTo: this.activatedRoute,
    //       })
    //       .then();
    //   });

    // this.controls.category?.valueChanges
    //   .pipe(takeUntil(this.subscription$))
    //   .subscribe((value) => {
    //     this.store.dispatch(
    //       AdminActions.clientConfigCategorySelected({
    //         selectedClientConfigCategory: value,
    //       })
    //     );
    //       this.router.navigate([this.selectedClientId, value || 'general'], {
    //         relativeTo: this.activatedRoute,
    //       }).then()
    //     }
    //   );

    // this.form?.valueChanges
    //   .pipe(takeUntil(this.subscription$))
    //   .subscribe((value) => {
    //     // this.selectedClient = value.client;
    //     console.log(this.activatedRoute);
    //     this.router.navigate(
    //       [value['client'], value['category'] || 'general'],
    //       {
    //         relativeTo: this.activatedRoute,
    //       }
    //     );
    //     // this.router
    //     //   .navigate([], {
    //     //     queryParams: { id: value.client },
    //     //   })
    //     //   .then();
    //     //this.error = false;
    //   });
  }

  ngOnDestroy() {
    // this.destroy();
  }

  // override subscribeToStoreEntities() {
  //   this.entityService.entities$
  //     ?.pipe(takeUntil(this._destroy$), skip(1))
  //     .subscribe({
  //       next: (value) => {
  //         this.entities = value;
  //         // this.dataSource.data = this.entities;
  //         // this.dataSource.paginator = this.paginator;
  //         // this.dataSource.sort = this.sort;
  //       },
  //     });
  // }
  //
  // override getDialogRef(mode: DialogMode, entity?: AppClient) {
  //   return this.dialog.open(ClientDialogComponent, {
  //     data: { mode, entity, entities: this.entities },
  //     panelClass: ['scrollable', 'full-width-dialog'],
  //     disableClose: true,
  //   });
  // }
  //
  // override getByKey(entityName: string): Observable<AppClient> {
  //   return this.entityService.getByKey(entityName);
  // }
  //
  // override update(entity: AppClient) {
  //   return this.entityService.update(entity);
  // }
  //
  // override add(entity: AppClient) {
  //   return this.entityService.add(entity);
  // }
  //
  // override delete(entity: AppClient) {
  //   return this.entityService.delete(entity.clientId);
  // }
  //
  // override trackId(index: number, item: AppClient): string {
  //   return `${item.clientId}`;
  // }
  //
  // // override customFilterPredicate(
  // //   data: AppClient,
  // //   filter: string,
  // //   searchTerms: { [key: string]: string }
  // // ): boolean {
  // //   for (const key in searchTerms) {
  // //     if (Object.prototype.hasOwnProperty.call(searchTerms, key)) {
  // //       switch (key) {
  // //         case 'clientId':
  // //           if (
  // //             !searchTerms[key] ||
  // //             (searchTerms[key] &&
  // //               data.clientId
  // //                 .toString()
  // //                 .toLowerCase()
  // //                 .indexOf(searchTerms[key].toLowerCase()) === -1)
  // //           ) {
  // //             return false;
  // //           }
  // //           break;
  // //       }
  // //     }
  // //   }
  // //   return true;
  // // }
  //
  // override getEntityName(entity: AppClient): string {
  //   return entity.clientId;
  // }
}



// export class ClientsSelectPageComponent
//   extends BaseEntitiesPage<AppClient, ClientDialogComponent>
//   implements OnInit, OnDestroy
// {
//   override type = TableType.GET_ALL_FROM_STORE;
//
//   override filters: FilterItem[] = [
//     {
//       name: 'clientId',
//       label: 'ADMIN.client.clientId.tableLabel',
//       type: FormFieldType.INPUT,
//     },
//   ];
//
//   organizationName?: string =
//     this.activatedRoute.snapshot.parent?.parent?.params['id'];
//   projectName?: string =
//     this.activatedRoute.snapshot.parent?.parent?.params['id'];
//   subjectId?: string =
//     this.activatedRoute.snapshot.parent?.parent?.params['id'];
//
//   listView = this.activatedRoute.snapshot.paramMap.get('listView');
//
//   form = this.fb.group({
//     client: [this.activatedRoute.firstChild?.snapshot.params['id']],
//     category: [this.activatedRoute.firstChild?.snapshot.params['category']],
//   });
//
//   controls = {
//     client: this.form.get('client'),
//     category: this.form.get('category'),
//   };
//
//   selectedClientId = this.activatedRoute.firstChild?.snapshot.params['id'];
//
//   subscription$: Subject<void> = new Subject<void>();
//
//   constructor(
//     router: Router,
//     activatedRoute: ActivatedRoute,
//     dialog: MatDialog,
//     entityService: ClientService, //ClientEntityService,
//     private fb: FormBuilder,
//     private store: Store,
//   ) {
//     console.log('Class: ClientsSelectPageComponent, Function: constructor, Line 84 ' , );
//     super(router, activatedRoute, dialog, entityService);
//   }
//
//   ngOnInit(): void {
//     this.init();
//     this.store.dispatch(
//       AdminActions.subjectSelected({ selectedSubject: null })
//     );
//     this.store.dispatch(
//       AdminActions.clientSelected({ selectedClient: null })
//     );
//     this.store.dispatch(
//       AdminActions.clientConfigCategorySelected({ selectedClientConfigCategory: null })
//     );
//     console.log(this.activatedRoute.firstChild?.snapshot.params);
//     // this.form = this.fb.group({
//     //   client: [this.activatedRoute.firstChild?.snapshot.params['id']],
//     //   category: [this.activatedRoute.firstChild?.snapshot.params['category']],
//     // });
//
//     this.controls.client?.valueChanges
//       .pipe(takeUntil(this.subscription$))
//       .subscribe((value) => {
//         this.selectedClientId = value;
//         this.controls.category?.patchValue('general');
//         this.store.dispatch(
//           AdminActions.clientSelected({
//             selectedClient: value,
//           })
//         );
//         // this.store.dispatch(
//         //   AdminActions.clientConfigCategorySelected({
//         //     selectedClientConfigCategory: 'general',
//         //   })
//         // );
//         console.log('Class: ClientsSelectPageComponent, Function: , Line 103 value' , value);
//         this.router
//           .navigate([value.clientId], {
//             relativeTo: this.activatedRoute,
//           })
//           .then();
//       });
//
//     // this.controls.category?.valueChanges
//     //   .pipe(takeUntil(this.subscription$))
//     //   .subscribe((value) => {
//     //     this.store.dispatch(
//     //       AdminActions.clientConfigCategorySelected({
//     //         selectedClientConfigCategory: value,
//     //       })
//     //     );
//     //       this.router.navigate([this.selectedClientId, value || 'general'], {
//     //         relativeTo: this.activatedRoute,
//     //       }).then()
//     //     }
//     //   );
//
//     // this.form?.valueChanges
//     //   .pipe(takeUntil(this.subscription$))
//     //   .subscribe((value) => {
//     //     // this.selectedClient = value.client;
//     //     console.log(this.activatedRoute);
//     //     this.router.navigate(
//     //       [value['client'], value['category'] || 'general'],
//     //       {
//     //         relativeTo: this.activatedRoute,
//     //       }
//     //     );
//     //     // this.router
//     //     //   .navigate([], {
//     //     //     queryParams: { id: value.client },
//     //     //   })
//     //     //   .then();
//     //     //this.error = false;
//     //   });
//   }
//
//   ngOnDestroy() {
//     this.destroy();
//   }
//
//   override subscribeToStoreEntities() {
//     this.entityService.entities$
//       ?.pipe(takeUntil(this._destroy$), skip(1))
//       .subscribe({
//         next: (value) => {
//           this.entities = value;
//           // this.dataSource.data = this.entities;
//           // this.dataSource.paginator = this.paginator;
//           // this.dataSource.sort = this.sort;
//         },
//       });
//   }
//
//   override getDialogRef(mode: DialogMode, entity?: AppClient) {
//     return this.dialog.open(ClientDialogComponent, {
//       data: { mode, entity, entities: this.entities },
//       panelClass: ['scrollable', 'full-width-dialog'],
//       disableClose: true,
//     });
//   }
//
//   override getByKey(entityName: string): Observable<AppClient> {
//     return this.entityService.getByKey(entityName);
//   }
//
//   override update(entity: AppClient) {
//     return this.entityService.update(entity);
//   }
//
//   override add(entity: AppClient) {
//     return this.entityService.add(entity);
//   }
//
//   override delete(entity: AppClient) {
//     return this.entityService.delete(entity.clientId);
//   }
//
//   override trackId(index: number, item: AppClient): string {
//     return `${item.clientId}`;
//   }
//
//   // override customFilterPredicate(
//   //   data: AppClient,
//   //   filter: string,
//   //   searchTerms: { [key: string]: string }
//   // ): boolean {
//   //   for (const key in searchTerms) {
//   //     if (Object.prototype.hasOwnProperty.call(searchTerms, key)) {
//   //       switch (key) {
//   //         case 'clientId':
//   //           if (
//   //             !searchTerms[key] ||
//   //             (searchTerms[key] &&
//   //               data.clientId
//   //                 .toString()
//   //                 .toLowerCase()
//   //                 .indexOf(searchTerms[key].toLowerCase()) === -1)
//   //           ) {
//   //             return false;
//   //           }
//   //           break;
//   //       }
//   //     }
//   //   }
//   //   return true;
//   // }
//
//   override getEntityName(entity: AppClient): string {
//     return entity.clientId;
//   }
// }
