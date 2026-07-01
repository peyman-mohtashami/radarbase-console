import {Component, inject, signal} from '@angular/core';
import { DialogMode } from '../../../../../base-entities/enums/dialog';
import { ConfigService } from '../../services/config.service';
import {AppConfig, RadarConfig} from "../../models/config";
import {ReactiveFormsModule} from "@angular/forms";
import {LoaderComponent} from "../../../../../../shared/components/loader/loader.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {ConfigTableRowComponent} from "../../components/config-table-row/config-table-row.component";
import {
  DataTableFilterComponent,
} from "../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component";
import {ConfigConfigService} from "../../services/config-config.service";
import {ConfigDialogService} from "../../services/config-dialog.service";
import {AppProject} from '../../../../main-scope/project/models/project';
import {AppSubject} from "../../../../project-scope/subject/models/subject";
import {MatIcon} from '@angular/material/icon';
import {BaseEntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {DEFAULT_PAGE_SIZE} from '../../../../../base-entities/consts/default-table-values';
import {PermissionDirective} from '../../../../../../core/auth/directives/show-if-has-role.directive';

@Component({
  selector: 'app-config-list-page',
  templateUrl: './config-list-page.component.html',
  imports: [
    LoaderComponent,
    TranslatePipe,
    ReactiveFormsModule,
    ConfigTableRowComponent,
    DataTableFilterComponent,
    MatButton,
    MatIcon,
    EntityListPageComponent,
    PermissionDirective,
  ]
})
export class ConfigListPageComponent extends BaseEntityListPageComponent<AppConfig, RadarConfig> {
  override entityService = inject(ConfigService);
  override configService = inject(ConfigConfigService);
  override dialogService = inject(ConfigDialogService);

  override entities = signal<AppConfig[]>(this.activatedRoute.snapshot.data['configList']);

  client = this.selectedEntitiesService.getSelected().client;
  project: AppProject | undefined = this.selectedEntitiesService.getSelected().project();
  subject: AppSubject | undefined = this.selectedEntitiesService.getSelected().subject();

  isChanged = signal( false);

  override ngOnInit() {
    super.ngOnInit();
    this.activatedRoute.data.subscribe(() => {
      this.page.set({pageIndex: 0, pageSize: this.page()?.pageSize ?? DEFAULT_PAGE_SIZE, length: this.page()?.length ?? 0});
      this.refreshEntities();
      this.dialogService.dialogUpdateEvent.set(undefined);
    })
  }

  override getEntities() {
    return this.entityService.getWithQuery(this.params(), this.client()!._name, this.project?._name, this.subject?._name);
  }

  override handleDialogUpdate(updated: { mode: DialogMode | string, entity?: AppConfig }) {
    const {mode, entity} = updated;
    if (entity) {
      switch (mode) {
        case DialogMode.ADD:
          this.isChanged.set(true);
          this.addEntityToView(entity);
          break;
        case DialogMode.EDIT:
          this.isChanged.set(true);
          this.refreshEntities();
          break;
        case DialogMode.DELETE:
          this.isChanged.set(true);
          this.refreshEntities();
          break;
      }
    } else {
      switch(mode) {
        case "discarded":
          this.isChanged.set(false);
          this.entityService.clearCache();
          this.refreshEntities();
          break;
        case "published":
          this.isChanged.set(false);
          this.entityService.clearCache();
          this.refreshEntities();
          break;
      }
    }
    this.loading.set(false);
    this.selection.clear();
  }

  onPublishDialogAction(mode: "discard" | "publish") {
    return this.dialogService.openPublishDialog(mode, this.entities(), this.client()!._name, this.project?._name, this.subject?._name);
  }


  protected showHistory() {
    // TODO
  }
}
