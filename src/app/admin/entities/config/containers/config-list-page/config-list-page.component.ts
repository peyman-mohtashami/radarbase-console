import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { ConfigService } from '../../services/config.service';
import {AppConfig} from "../../models/config";
import {ReactiveFormsModule} from "@angular/forms";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {TableQueryReflectorDirective} from "../../../../directives/table-query-reflector.directive";
import {TranslatePipe} from "@ngx-translate/core";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";
import {ConfigTableRowComponent} from "../../components/config-table-row/config-table-row.component";
import {
  DataTableFilterComponent,
} from "../../../../components/data-table-filter/data-table-filter.component";
import {EntitiesPageHeaderComponent} from "../../../../components/entities-page-header/entities-page-header.component";
import {MatCheckbox} from "@angular/material/checkbox";
import {ConfigConfigService} from "../../services/config-config.service";
import {ConfigDialogService} from "../../services/config-dialog.service";
import {AppClient} from "../../../client/models/client";
import {AppProject} from '../../../project/models/project';
import {AppSubject} from "../../../subject/models/subject";
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';
import {
  OrganizationTableRowComponent
} from '../../../organization/components/organization-table-row/organization-table-row.component';

@Component({
  selector: 'app-config-list-page',
  templateUrl: './config-list-page.component.html',
  imports: [
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    MatPaginator,
    ReactiveFormsModule,
    MatAnchor,
    ConfigTableRowComponent,
    EntitiesPageHeaderComponent,
    MatCheckbox,
    DataTableFilterComponent,
    MatButton,
    EntitiesPageComponent,
    OrganizationTableRowComponent,
  ]
})
export class ConfigListPageComponent extends BaseEntityListPageComponent<AppConfig> implements OnInit, OnDestroy {
  override entityService = inject(ConfigService);
  override configService = inject(ConfigConfigService);
  override dialogService = inject(ConfigDialogService);

  currentClient: AppClient = this.activatedRoute.parent?.parent?.snapshot?.data['entity'];
  currentProject: AppProject | undefined = undefined; //this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot?.data['entity'];
  currentSubject: AppSubject | undefined = undefined; //this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot?.data['entity'];

  ngOnInit() {
    this.currentProject = this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot.data['entity'];
    if (this.activatedRoute.parent?.parent?.parent?.parent?.parent?.parent?.snapshot.routeConfig?.path === 'subjects') {
      this.currentSubject = this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot.data['entity'];
      this.currentProject = this.activatedRoute.parent?.parent?.parent?.parent?.parent?.parent?.parent?.snapshot.data['entity'];
    }

    this.activatedRoute.data.subscribe(data => {
      this.entities.set(data['entities']);
      this.dialogService.dialogUpdateEvent.set(undefined);
    })
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }

  override getEntities() {
    return this.entityService.getWithQuery(this.params(), this.currentClient.clientId, this.currentProject?.projectName, this.currentSubject?._name);
  }

  // private handleDialogUpdate(updated: { mode: DialogMode | string, entity?: AppConfig }) {
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

  // private addEntityToView(entity: AppConfig) {
  //     const entities = untracked(this.entities);
  //     this.entities.set([entity, ...entities]);
  //     this.applyFilter();
  // }
  //
  // private updateEntityInView(entity: AppConfig) {
  //     const updatedEntities = untracked(this.entities).map(e => e.id === entity.id ? entity : e);
  //     this.entities.set(updatedEntities);
  //     this.applyFilter();
  // }
  //
  // private removeEntityFromView(entity?: AppConfig) {
  //   if (entity) {
  //     const entities = untracked(this.entities);
  //     const updatedEntities = entities.filter(e => e.id !== entity.id);
  //     this.entities.set(updatedEntities);
  //     this.applyFilter();
  //   }
  // }
  //
  // private refreshEntities() {
  //   this.entityService.getAll(this.currentClient.clientId, this.currentProject?.projectName).subscribe({
  //     next: (entities) => {
  //       this.entities.set(entities);
  //       this.applyFilter();
  //     }
  //   });
  // }

  //
  // private processUrlFragment(fragment: string) {
  //   const [_, action, entityType, entityId] = fragment.split('/');
  //   if (entityType === this.entityMetadata.name) {
  //     const entity = this.visibleEntities().find(e => e.id == entityId);
  //     switch (action) {
  //       case 'add':
  //         this.dialogService.openDialog(DialogMode.ADD, undefined);
  //         break;
  //       case 'edit':
  //         if (entity) this.dialogService.openDialog(DialogMode.EDIT, entity);
  //         break;
  //       case 'delete':
  //         if (entity) this.dialogService.openDialog(DialogMode.DELETE, entity);
  //         break;
  //     }
  //   }
  // }
  onPublishDialogAction(mode: "discard" | "publish") {
    return this.dialogService.openPublishDialog(mode, {entities: this.entities(), clientId: this.currentClient?.clientId, projectId: this.currentProject?.projectName, subjectId: this.currentSubject?.login});
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
