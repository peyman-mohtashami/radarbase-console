import {Component, effect, inject, OnDestroy, OnInit, signal, untracked, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from "rxjs/operators";
import {TranslatePipe} from "@ngx-translate/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {MatCheckbox} from "@angular/material/checkbox";
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
import {ProtocolService} from "../../services/protocol.service";
import {ProtocolConfigService} from "../../services/protocol-config.service";
import {ProtocolDialogService} from "../../services/protocol-dialog.service";
import {AppProtocol} from "../../models/protocol";
import {AppProject} from "../../../project/models/project";
import {AppSubject} from "../../../subject/models/subject";
import {MatButton} from "@angular/material/button";
import {
  DEFAULT_PAGE_SIZE,
  MIN_ENTITIES_FOR_FILTERS,
  MIN_ENTITIES_FOR_PAGINATION,
  PAGE_SIZE_OPTIONS
} from "../../../../consts/default-table-values";
import {ProtocolTableRowComponent} from "../../components/protocol-table-row/protocol-table-row.component";
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';
import {
  QuestionnaireTableRowComponent
} from '../../../questionnaire/components/questionnaire-table-row/questionnaire-table-row.component';

@Component({
  selector: 'app-protocol-list-page',
  templateUrl: './protocol-list-page.component.html',
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    MatPaginator,
    MatCheckbox,
    MatButton,
    ProtocolTableRowComponent,
    EntitiesPageComponent,
    QuestionnaireTableRowComponent,
  ]
})
export class ProtocolListPageComponent extends BaseEntityListPageComponent<AppProtocol> implements OnInit, OnDestroy {
  override entityService = inject(ProtocolService);
  override configService = inject(ProtocolConfigService);
  override dialogService = inject(ProtocolDialogService);

  currentProject: AppProject | undefined = undefined; //this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot?.data['entity'];
  currentSubject: AppSubject | undefined = undefined; //this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot?.data['entity'];

  ngOnInit() {
    this.currentProject = this.activatedRoute.parent?.parent?.snapshot.data['entity'];
    // this.currentSubject: AppSubject | undefined = undefined;
    if (this.activatedRoute.parent?.parent?.parent?.parent?.parent?.parent?.snapshot.routeConfig?.path === 'subjects') {
      this.currentSubject = this.activatedRoute.parent?.parent?.snapshot.data['entity'];
      this.currentProject = this.activatedRoute.parent?.parent?.parent?.parent?.parent?.parent?.parent?.snapshot.data['entity'];
    }

    // this.activatedRoute.data.subscribe(data => {
    //   this.entities.set(data['entities']);
    //   this.processedEntities.set(data['entities']);
    //   this.dialogService.dialogUpdateEvent.set(undefined);
    //   this.applyFilter();
    // })
    //
    // this.handleDialogUrlFragment();
  }

  ngOnDestroy() {
    super.destroy();
  }

  // private handleDialogUpdate(updated: { mode: DialogMode | string, entity?: AppProtocol }) {
  //   const {mode, entity} = updated;
  //   if (entity) {
  //     switch (mode) {
  //       case DialogMode.ADD:
  //         this.isChanged = true;
  //         this.addEntityToView(entity);
  //         break;
  //       case DialogMode.EDIT:
  //         this.isChanged = true;
  //         this.updateEntityInView(entity);
  //         break;
  //       case DialogMode.DELETE:
  //         this.isChanged = true;
  //         this.removeEntityFromView(entity);
  //         break;
  //     }
  //   } else {
  //     switch(mode) {
  //       case "discarded":
  //         this.isChanged = false;
  //         this.refreshEntities();
  //         break;
  //       case "published":
  //         this.isChanged = false;
  //         this.refreshEntities();
  //         break;
  //     }
  //   }
  //   this.removeFragmentUrl();
  //   this.loading.set(false);
  //   this.selection.clear();
  // }

  // private addEntityToView(entity: AppProtocol) {
  //   const entities = untracked(this.entities);
  //   this.entities.set([entity, ...entities]);
  //   this.applyFilter();
  // }
  //
  // private updateEntityInView(entity: AppProtocol) {
  //   const updatedEntities = untracked(this.entities).map(e => e.name === entity.name ? entity : e);
  //   this.entities.set(updatedEntities);
  //   this.applyFilter();
  // }
  //
  // private removeEntityFromView(entity?: AppProtocol) {
  //   if (entity) {
  //     const entities = untracked(this.entities);
  //     const updatedEntities = entities.filter(e => e.name !== entity.name);
  //     this.entities.set(updatedEntities);
  //     this.applyFilter();
  //   }
  // }
  //
  // private refreshEntities() {
  //   this.entityService.getAll(this.currentProject?.projectName).subscribe({
  //     next: (entities) => {
  //       this.entities.set(entities);
  //       this.applyFilter();
  //     }
  //   });
  // }
  //
  // private handleDialogUrlFragment() {
  //   this.activatedRoute.fragment
  //     .pipe(takeUntil(this._destroy$))
  //     .subscribe(fragment => {
  //       if (fragment) this.processUrlFragment(fragment);
  //     });
  // }
  //
  // private processUrlFragment(fragment: string) {
  //   const [_, action, entityType, entityId] = fragment.split('/');
  //   if (entityType === this.entityMetadata.name) {
  //     const entity = this.visibleEntities().find(e => e.name == entityId);
  //     switch (action) {
  //       case 'add':
  //         this.dialogService.openDialog(DialogMode.ADD, undefined, this.entities());
  //         break;
  //       case 'edit':
  //         if (entity) this.dialogService.openDialog(DialogMode.EDIT, entity, this.entities());
  //         break;
  //       case 'delete':
  //         if (entity) this.dialogService.openDialog(DialogMode.DELETE, entity, this.entities());
  //         break;
  //     }
  //   }
  // }

  onPublishDialogAction(mode: "discard" | "publish") {
    return this.dialogService.openPublishDialog(mode, {entities: this.entities(), projectId: this.currentProject?.projectName, subjectId: this.currentSubject?.login});
  }

  isChanged = false;


  triggerUpdate($event: string) {
    console.log('Class: ConfigsPageComponent, Function: triggerUpdate, Line 534 $event' , $event);
    if ($event === 'discard') {
      this.dialogService.dialogUpdateEvent.set({mode: 'discard', entity: undefined})
    }

  }

  protected showHistory() {

  }
}
