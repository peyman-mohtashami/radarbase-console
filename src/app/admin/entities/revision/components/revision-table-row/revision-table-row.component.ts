import {Component, inject, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {DialogMode} from "../../../../enums/dialog";
import {AppRevision} from "../../models/revision";
import {MatCard} from "@angular/material/card";
import {ModificationComponent} from "../modifications/modification.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {MatIconButton} from "@angular/material/button";
import {OrganizationConfigService} from "../../../organization/services/organization-config.service";

@Component({
  selector: 'app-revision-table-row',
  templateUrl: './revision-table-row.component.html',
  imports: [
    MatCard,
    ModificationComponent,
    LocalDateComponent,
    MatIconButton,
  ]
})
export class RevisionTableRowComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  configService = inject(OrganizationConfigService);

  entity = input.required<AppRevision>();
  extensionClass = input<string>();

  expanded = signal(false);
  updated = signal(false);

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded.update((currentValue) => !currentValue);
  }
}
