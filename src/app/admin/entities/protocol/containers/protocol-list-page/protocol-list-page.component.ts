import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {ListPageHeaderComponent} from '../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {ProtocolService} from "../../services/protocol.service";
import {ProtocolConfigService} from "../../services/protocol-config.service";
import {ProtocolDialogService} from "../../services/protocol-dialog.service";
import {AppProtocol, RadarProtocol} from "../../models/protocol";
import {AppProject} from "../../../project/models/project";
import {AppSubject} from "../../../subject/models/subject";
import {MatButton} from "@angular/material/button";
import {ProtocolTableRowComponent} from "../../components/protocol-table-row/protocol-table-row.component";
import {EntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {BaseEntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-protocol-list-page',
  templateUrl: './protocol-list-page.component.html',
  imports: [
    ListPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TranslatePipe,
    MatButton,
    ProtocolTableRowComponent,
    EntityListPageComponent,
    MatIcon,
  ]
})
export class ProtocolListPageComponent extends BaseEntityListPageComponent<AppProtocol, RadarProtocol> implements OnInit, OnDestroy {
  override entityService = inject(ProtocolService);
  override configService = inject(ProtocolConfigService);
  override dialogService = inject(ProtocolDialogService);

  override entities = signal<AppProtocol[]>(this.activatedRoute.snapshot.data['protocolList']);

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
    return this.entityService.getWithQuery(this.params(), this.project?._name, this.subject?._name);
  }

  override handleDialogUpdate(updated: { mode: DialogMode | string, entity?: AppProtocol }) {
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
    return this.dialogService.openPublishDialog(mode, this.entities(), this.project?._name, this.subject?._name);
  }

  protected showHistory() {
    // TODO
  }
}
