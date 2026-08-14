import {Component, inject, output, input, signal} from "@angular/core";
import {AppQuestionnaire} from "../../models/questionnaire";
import {QuestionnaireDetailsComponent} from "../questionnaire-details/questionnaire-details.component";
import {QuestionnaireConfigService} from '../../services/questionnaire-config.service';
import {EntityTableRowComponent} from '../../../../shared/components/entity-table-row/entity-table-row.component';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {QuestionnaireActionsComponent} from '../questionnaire-actions/questionnaire-actions.component';
import {TranslatePipe} from '@ngx-translate/core';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {MatSlideToggle, MatSlideToggleChange} from '@angular/material/slide-toggle';
import {ROLES} from '../../../../../shared/enums/roles';
import {DetailType} from '../../../../shared/enums/detail-type';
import {JsonPipe} from '@angular/common';
import {QuestionnaireDialogService} from '../../services/questionnaire-dialog.service';
import {DialogMode} from '../../../../shared/enums/dialog';
import {QuestionnaireStore} from '../../services/questionnaire.store';
import {OffsetTimePipe} from '../../../../../shared/pipes/offset-time.pipe';

@Component({
  selector: 'app-questionnaire-table-row',
  templateUrl: './questionnaire-table-row.component.html',
  imports: [
    QuestionnaireDetailsComponent,
    EntityTableRowComponent,
    PermissionDirective,
    QuestionnaireActionsComponent,
    TranslatePipe,
    TagComponent,
    MatSlideToggle,
    JsonPipe,
    OffsetTimePipe,
  ]
})
export class QuestionnaireTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(QuestionnaireConfigService);
  dialogService = inject(QuestionnaireDialogService);
  store = inject(QuestionnaireStore);

  entity = input.required<AppQuestionnaire>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);

  // duplicateEvent = output<void>();
  // activeEvent = output<boolean>();

  async openDialog() {
    await this.dialogService.openDialog(DialogMode.EDIT, this.entity());
  }

  async onDuplicate() {
    // this.duplicateEvent.emit();
    const duplicateEntity: AppQuestionnaire = {...this.entity(), name: `${this.entity().name}_copy`};
    await this.store.add(duplicateEntity);//.subscribe(() => this.handleDialogUpdate());
    await this.store.publish();
  }

  protected async onActiveChange($event: MatSlideToggleChange) {
    console.log('Class: QuestionnaireTableRowComponent, Function: onActiveChange, Line 60 $event.checked' , $event.checked);
    await this.store.update({...this.entity(), isActive: $event.checked});
    await this.store.publish();
    // this.activeEvent.emit($event.checked);
  }
}
