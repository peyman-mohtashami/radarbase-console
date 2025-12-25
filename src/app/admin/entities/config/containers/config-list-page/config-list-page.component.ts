import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import { DialogMode } from '../../../../base-entities/enums/dialog';
import { ConfigService } from '../../services/config.service';
import {AppConfig, RadarConfig} from "../../models/config";
import {ReactiveFormsModule} from "@angular/forms";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {ConfigTableRowComponent} from "../../components/config-table-row/config-table-row.component";
import {
  DataTableFilterComponent,
} from "../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component";
import {ListPageHeaderComponent} from "../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component";
import {ConfigConfigService} from "../../services/config-config.service";
import {ConfigDialogService} from "../../services/config-dialog.service";
import {AppClient} from "../../../client/models/client";
import {AppProject} from '../../../project/models/project';
import {AppSubject} from "../../../subject/models/subject";
import {MatIcon} from '@angular/material/icon';
import {BaseEntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/entity-list-page.component';

@Component({
  selector: 'app-config-list-page',
  templateUrl: './config-list-page.component.html',
  imports: [
    LoaderComponent,
    TranslatePipe,
    ReactiveFormsModule,
    ConfigTableRowComponent,
    ListPageHeaderComponent,
    DataTableFilterComponent,
    MatButton,
    MatIcon,
    EntityListPageComponent,
  ]
})
export class ConfigListPageComponent extends BaseEntityListPageComponent<AppConfig, RadarConfig> implements OnInit, OnDestroy {
  override entityService = inject(ConfigService);
  override configService = inject(ConfigConfigService);
  override dialogService = inject(ConfigDialogService);

  override entities = signal<AppConfig[]>(this.activatedRoute.snapshot.data['configList']);

  client: AppClient = this.selectedEntitiesService.selectedClient()!;
  project: AppProject | undefined = this.selectedEntitiesService.selectedProject();
  subject: AppSubject | undefined = this.selectedEntitiesService.selectedSubject();

  isChanged = false;

  ngOnInit() {
    super.init();
    this.activatedRoute.data.subscribe(() => {
      this.refreshEntities();
      this.dialogService.dialogUpdateEvent.set(undefined);
    })
  }

  ngOnDestroy() {
    super.destroy();
  }

  override getEntities() {
    return this.entityService.getWithQuery(this.params(), this.client._name, this.project?._name, this.subject?._name);
  }

  override handleDialogUpdate(updated: { mode: DialogMode | string, entity?: AppConfig }) {
    const {mode, entity} = updated;
    if (entity) {
      switch (mode) {
        case DialogMode.ADD:
          this.isChanged = true;
          this.addEntityToView(entity);
          break;
        case DialogMode.EDIT:
          this.isChanged = true;
          this.refreshEntities();
          break;
        case DialogMode.DELETE:
          this.isChanged = true;
          this.refreshEntities();
          break;
      }
    } else {
      switch(mode) {
        case "discarded":
          this.isChanged = false;
          this.entityService.clearCache();
          this.refreshEntities();
          break;
        case "published":
          this.isChanged = false;
          this.entityService.clearCache();
          this.refreshEntities();
          break;
      }
    }
    this.removeFragmentUrl();
    this.loading.set(false);
    this.selection.clear();
  }

  onPublishDialogAction(mode: "discard" | "publish") {
    return this.dialogService.openPublishDialog(mode, this.entities(), this.client._name, this.project?._name, this.subject?._name);
  }


  protected showHistory() {
    // TODO
  }
}
