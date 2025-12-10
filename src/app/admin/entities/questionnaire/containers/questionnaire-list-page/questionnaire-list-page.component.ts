import {Component, effect, inject, OnDestroy, OnInit, signal, untracked, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from "rxjs/operators";
import {TranslatePipe} from "@ngx-translate/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {MatCheckbox} from "@angular/material/checkbox";
// import {TABLE_ANIMATION} from '../../../../animation';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {TableQueryReflectorDirective} from '../../../../directives/table-query-reflector.directive';
import {RbSort, TableElement} from '../../../../models/table.model';
import {DialogMode} from '../../../../enums/dialog';
import {ROLES} from "../../../../../shared/enums/roles";
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
  FilterEvent
} from '../../../../components/data-table-filter/data-table-filter.component';

import {QuestionnaireService} from "../../services/questionnaire.service";
import {QuestionnaireConfigService} from "../../services/questionnaire-config.service";
import {QuestionnaireDialogService} from "../../services/questionnaire-dialog.service";
import {AppQuestionnaire} from "../../models/questionnaire";
import {
  QuestionnaireTableRowComponent
} from "../../components/questionnaire-table-row/questionnaire-table-row.component";
import {AppProject} from "../../../project/models/project";
import {AppSubject} from "../../../subject/models/subject";
import {AppProtocol} from "../../../protocol/models/protocol";
import {MatButton} from "@angular/material/button";
import {
  DEFAULT_PAGE_SIZE,
  MIN_ENTITIES_FOR_FILTERS,
  MIN_ENTITIES_FOR_PAGINATION, PAGE_SIZE_OPTIONS
} from "../../../../consts/default-table-values";
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';
import {
  OrganizationTableRowComponent
} from '../../../organization/components/organization-table-row/organization-table-row.component';

@Component({
  selector: 'app-questionnaire-list-page',
  templateUrl: './questionnaire-list-page.component.html',
  // animations: TABLE_ANIMATION,
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    MatPaginator,
    MatCheckbox,
    QuestionnaireTableRowComponent,
    EntitiesPageComponent,
    OrganizationTableRowComponent,
    // MatButton,
  ]
})
export class QuestionnaireListPageComponent extends BaseEntityListPageComponent<AppQuestionnaire> implements OnInit, OnDestroy {
  override entityService = inject(QuestionnaireService);
  override configService = inject(QuestionnaireConfigService);
  override dialogService = inject(QuestionnaireDialogService);

  currentProject: AppProject | undefined = undefined; //this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot?.data['entity'];
  currentSubject: AppSubject | undefined = undefined; //this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot?.data['entity'];

  ngOnInit() {
    // this.dialogService.dialogUpdateEvent$.set(undefined);
    // this.applyFilter();
    // this.handleDialogUrlFragment();
    this.currentProject = this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot.data['entity'];
    // this.currentSubject: AppSubject | undefined = undefined;
    if (this.activatedRoute.parent?.parent?.parent?.parent?.parent?.parent?.snapshot.routeConfig?.path === 'subjects') {
      this.currentSubject = this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot.data['entity'];
      this.currentProject = this.activatedRoute.parent?.parent?.parent?.parent?.parent?.parent?.parent?.snapshot.data['entity'];
    }

    // this.activatedRoute.data.subscribe(data => {
    //   this.entities$.set(data['entities']);
    //   this.processedEntities$.set(data['entities']);
    //   this.dialogService.dialogUpdateEvent.set(undefined);
    //   this.applyFilter();
    // })
    //
    // console.log('Class: ConfigsPageComponent, Function: ngOnInit, Line 126 this.entities$()' , this.entities$());
    // //=======
    // // console.log('Class: ConfigsPageComponent, Function: ngOnInit, Line 152 this.clientId, this.projectName' , this.clientId, this.projectName);
    // // this.init();
    // // this.createExport();
    // // // this.form = this.fb.group({
    // // //   category: ['general'],
    // // // });
    // // if (this.clientId === 'pRMT' || this.clientId === 'aRMT') {
    // //   this.form = new FormGroup({
    // //     category: new FormControl('general')
    // //   })
    // // }
    // // this.form?.valueChanges.subscribe((value) => {
    // //   console.log('Class: ConfigsPageComponent, Function: , Line 164 value' , value);
    // //   this.queryParams = {'pageIndex': 0, 'pageSize': 20, 'category': value.category ?? 'general'};
    // //   // const queryParams = new HttpParams()
    // //   //   // .append('pageIndex', 0).append('pageSize', 20)
    // //   //   .appendAll({'pageIndex': 0, 'pageSize': 20, 'category': value.category ?? 'general'})
    // //   this.router.navigate([], {queryParams: this.queryParams, relativeTo: this.activatedRoute}).then();
    // //   this.page = {pageIndex: 0, pageSize: 20, length: 0};
    // //   if(value){
    // //     this.entityService
    // //       .getWithQuery(this.queryParams)
    // //       .subscribe((entities) => {
    // //         // console.log("***() ent", entities)
    // //         this.entities = entities;
    // //         this.filteredAndSortedEntities = this.entities;
    // //         this.applyFilter();
    // //         this.applySort();
    // //         this.applyPage();
    // //         this.createExport();
    // //         // this.entitiesToShow = entities
    // //       });
    // //   }
    // // });
    // //=======
    // // this.dialogService.dialogUpdateEvent$.set(undefined);
    // // this.applyFilter();
    // this.handleDialogUrlFragment();
  }

  ngOnDestroy() {
    super.destroy();
    // this._destroy$.next();
    // this._destroy$.complete();
  }

  override handleDialogUpdate(updated: { mode: DialogMode | string, entity?: AppQuestionnaire }) {
    // // switch (updated.mode) {
    // //   case DialogMode.ADD:
    // //     this.addEntityToView(updated?.entity);
    // //     break;
    // //   case DialogMode.EDIT:
    // //     this.updateEntityInView(updated?.entity);
    // //     break;
    // //   case DialogMode.DELETE:
    // //     this.refreshEntities();
    // //     break;
    // // }
    // // this.removeFragmentUrl();
    // // this.loading$.set(false);
    // // this.selection.clear();
    // const {mode, entity} = updated;
    // if (entity) {
    //   switch (mode) {
    //     case DialogMode.ADD:
    //       this.isChanged = true;
    //       this.addEntityToView(entity);
    //       break;
    //     case DialogMode.EDIT:
    //       this.isChanged = true;
    //       this.updateEntityInView(entity);
    //       break;
    //     case DialogMode.DELETE:
    //       this.isChanged = true;
    //       this.removeEntityFromView(entity);
    //       break;
    //   }
    // } else {
    //   switch(mode) {
    //     case "discarded":
    //       this.isChanged = false;
    //       this.refreshEntities();
    //       break;
    //     case "published":
    //       this.isChanged = false;
    //       this.refreshEntities();
    //       break;
    //   }
    // }
    // this.removeFragmentUrl();
    // this.loading$.set(false);
    // this.selection.clear();
  }

  // private addEntityToView(entity: AppQuestionnaire) {
  //   // if (entity) {
  //   //   const entities = untracked(this.entities$);
  //   //   this.entities$.set([entity, ...entities]);
  //   //   this.applyFilter();
  //   // }
  //   // if (entity) {
  //   const entities = untracked(this.entities$);
  //   // const updatedEntities = untracked(this.updatedEntities$);
  //   // this.updatedEntities$.set([entity, ...updatedEntities]);
  //   this.entities$.set([entity, ...entities]);
  //   this.applyFilter();
  //   // }
  // }
  //
  // private updateEntityInView(entity: AppQuestionnaire) {
  //   const updatedEntities = untracked(this.entities$).map(e => e.name === entity.name ? entity : e);
  //   this.entities$.set(updatedEntities);
  //   this.applyFilter();
  //   // if (entity) {
  //   //   const updatedEntities = untracked(this.entities$).map(e => e._name === entity._name ? entity : e);
  //   //   this.entities$.set(updatedEntities);
  //   //   this.applyFilter();
  //   // }
  // }
  //
  // private removeEntityFromView(entity?: AppQuestionnaire) {
  //   if (entity) {
  //     const entities = untracked(this.entities$);
  //     const updatedEntities = entities.filter(e => e.name !== entity.name);
  //     // this.entities$.set([entity, ...entities]);
  //     this.entities$.set(updatedEntities);
  //     this.applyFilter();
  //   }
  // }
  //
  // private refreshEntities() {
  //   this.entityService.getAll(this.currentProject?.projectName).subscribe({
  //     next: (entities) => {
  //       this.entities$.set(entities);
  //       this.applyFilter();
  //     }
  //   });
  // }
  //
  // private processUrlFragment(fragment: string) {
  //   const [_, action, entityType, entityId, language] = fragment.split('/');
  //   if (entityType === 'questionnaire') {
  //     const entity = this.visibleEntities$().find(e => e._name == entityId);
  //     switch (action) {
  //       case 'add':
  //         this.dialogService.openDialog(DialogMode.ADD, undefined, this.entities$());
  //         break;
  //       case 'edit':
  //         if (entity) this.dialogService.openDialog(DialogMode.EDIT, entity, this.entities$(), language);
  //         break;
  //       case 'delete':
  //         if (entity) this.dialogService.openDialog(DialogMode.DELETE, entity, this.entities$(), language);
  //         break;
  //     }
  //   }
  // }

  // onPublishDialogAction(mode: "discard" | "publish") {
  //   return this.dialogService.openPublishDialog(mode, this.entities$(), this.currentProject?.projectName, this.currentSubject?.login);
  // }

  isChanged = false;


  triggerUpdate($event: string) {
    console.log('Class: ConfigsPageComponent, Function: triggerUpdate, Line 534 $event' , $event);
    if ($event === 'discard') {
      this.dialogService.dialogUpdateEvent.set({mode: 'discard', entity: undefined})
    }

  }
}
