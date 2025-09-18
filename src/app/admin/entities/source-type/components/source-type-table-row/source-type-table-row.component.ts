import {Component, effect, inject, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";

import {MatCard} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {SourceTypeScopeComponent} from "../source-type-scope/source-type-scope.component";
import {
  SourceTypeSourceRegistrationComponent
} from "../source-type-source-registration/source-type-source-registration.component";
import {SourceTypeDetailsComponent} from "../source-type-details/source-type-details.component";
import {MatIconButton} from "@angular/material/button";
import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AsyncPipe} from "@angular/common";
import {ActionsComponent} from '../actions/actions.component';
import {AppSourceType} from '../../models/source-type';
import {TableElements} from "../../config";
import {UpdateTrigger} from '../../services/source-type-dialog.service';

@Component({
  selector: 'rb-source-type-table-row',
  templateUrl: './source-type-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    RouterLink,
    SourceTypeScopeComponent,
    SourceTypeSourceRegistrationComponent,
    MatIconButton,
    SourceTypeDetailsComponent,
    AsyncPipe,
    ActionsComponent,

  ]
})
export class SourceTypeTableRowComponent {
  protected readonly TableElements = TableElements;
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  private readonly store = inject(Store);
  config$ = this.store.select(entitiesConfig).pipe(
    map(config => config?.[ENTITY_NAME.sourceData]?.fields ?? {})
  )

  entity$ = input.required<AppSourceType>();
  entityUpdateTrigger$= input<UpdateTrigger>();

  expanded$ = signal(false);
  updated$ = signal(false);

  constructor() {
    effect(() => {
      const updateTrigger = this.entityUpdateTrigger$();
      if (!updateTrigger) return;

      const {mode, entity} = updateTrigger;
      if (entity.id !== this.entity$().id) return;
      if (mode === DialogMode.ADD || mode === DialogMode.EDIT) {
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
}
