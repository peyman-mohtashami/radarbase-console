import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { FilterItem, TableType } from '../../../../models/table.model';
import { FormFieldType } from '../../../../models/dialog.model';

import { DialogMode } from '../../../../enums/dialog';
import { ProtocolDialogComponent } from '../protocol-dialog/protocol-dialog.component';

import { ProtocolService } from '../../services/protocol.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProtocolTranslationDialogComponent } from '../protocol-translation-dialog/protocol-translation-dialog.component';
import { AppProtocol } from "../../models/protocol";
import { AppQuestionnaire } from "../../../questionnaire/models/questionnaire";
import { ENTITY_NAME } from '../../../../enums/entities';
import {BaseEntitiesPage} from "../../../../components/base-entities-page/base-entities-page";
import {PROPERTIES} from "../../protocol.module";
import {TABLE_ANIMATION} from "../../../../animation";
import {ProtocolLanguage} from '../../../../../shared/models/radar-protocol.model';

@Component({
    selector: 'rb-protocols-page',
    templateUrl: './protocols-page.component.html',
    animations: TABLE_ANIMATION,
})
export class ProtocolsPageComponent
  extends BaseEntitiesPage<AppProtocol, ProtocolDialogComponent>
  implements OnInit, OnDestroy
{
  name = ENTITY_NAME.protocol;
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly PROPERTIES = PROPERTIES;

  override type = TableType.GET_ALL;

  override filters: FilterItem[] = [
    {
      name: 'search:name, description',
      label: 'Search ..',
      type: FormFieldType.INPUT,
    },
    // {
    //   name: 'name',
    //   label: 'ADMIN.protocol.name.tableLabel',
    //   type: FormFieldType.INPUT,
    // },
  ];

  questionnaires?: AppQuestionnaire[] = this.activatedRoute.snapshot.data["questionnaires"];

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    entityService: ProtocolService,
  ) {
    super(router, activatedRoute, dialog, entityService);
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy() {
    this.destroy();
  }

  override getDialogRef(mode: DialogMode, entity?: AppProtocol) {
    return this.dialog.open(ProtocolDialogComponent, {
      data: {
        mode,
        entity,
        entities: this.entities,
        questionnaires: this.questionnaires,
      },
      panelClass: ['scrollable', 'w-full', 'full-width-dialog'],
      disableClose: true,
    });
  }

  override getByKey(entityName: string): Observable<AppProtocol> {
    return this.entityService.getByKey(entityName);
  }

  override update(entity: AppProtocol) {
    return this.entityService.update(entity);
  }

  override add(entity: AppProtocol) {
    return this.entityService.add(entity);
  }

  override delete(entity: AppProtocol) {
    return this.entityService.delete(entity.id);
  }

  override getEntityName(entity: AppProtocol): string {
    return entity.name;
  }

  onTranslationAction(
    mode: DialogMode,
    entity?: AppProtocol,
    language?: ProtocolLanguage,
    entityName?: string,
    e?: Event
  ): void {
    e?.stopPropagation();

    if (entity) {
      return this.openTranslationDialog(mode, entity, language);
    }

    if (entityName) {
      const _entity = this.entities?.find(
        (e) => this.getEntityName(e) === entityName
      );
      if (_entity) {
        return this.openTranslationDialog(mode, _entity, language);
      }
    }

    if (entityName) {
      this.getByKey(entityName).subscribe({
        next: (_entity) => this.openTranslationDialog(mode, _entity, language),
        error: (err) => console.log(err),
      });
    } else {
      this.openTranslationDialog(mode, undefined, language);
    }
  }

  openTranslationDialog(
    mode: DialogMode,
    entity?: AppProtocol,
    language?: ProtocolLanguage
  ) {
    const translationDialogRef = this.getTranslationDialogRef(
      mode,
      entity,
      language
    );
    this.applyStateChangesToUrlQueryParams({
      [mode]: entity ? this.getEntityName(entity) : 'new',
    });

    const translationDialogActionSubscription =
      translationDialogRef.componentInstance.actionTriggered.subscribe({
        next: (value: {
          action: DialogMode | string;
          entity: AppProtocol;
        }) => {
          if (value.action === DialogMode.EDIT) {
            this.update(value.entity).subscribe({
              next: () =>
                this.onTranslationSuccess(
                  mode,
                  translationDialogRef,
                  value.entity
                ),
              error: (err) =>
                this.onTranslationError(err, translationDialogRef),
            });
          } else if (value.action === DialogMode.ADD) {
            this.add(value.entity)
              .pipe()
              .subscribe({
                next: (res) =>
                  this.onTranslationSuccess(mode, translationDialogRef, res),
                error: (err) =>
                  this.onTranslationError(err, translationDialogRef),
              });
          } else if (value.action === DialogMode.DELETE) {
            this.delete(value.entity).subscribe({
              next: () =>
                this.onTranslationSuccess(
                  mode,
                  translationDialogRef,
                  value.entity
                ),
              error: (err) =>
                this.onTranslationError(err, translationDialogRef),
            });
          } else if (value.action === 'close') {
            this.applyStateChangesToUrlQueryParams({ [mode]: null });
          }
        },
      });
    translationDialogRef.afterClosed().subscribe(() => {
      translationDialogActionSubscription.unsubscribe();
    });
  }

  getTranslationDialogRef(
    mode: DialogMode,
    entity?: AppProtocol,
    language?: ProtocolLanguage
  ) {
    return this.dialog.open(ProtocolTranslationDialogComponent, {
      data: { mode, language, entity, entities: this.entities },
      panelClass: ['scrollable', 'w-full', 'full-width-dialog'],
      disableClose: true,
    });
  }

  onTranslationSuccess(
    mode: string,
    dialogRef: MatDialogRef<ProtocolTranslationDialogComponent>,
    entity: AppProtocol
  ): void {
    if (
      this.type === TableType.GET_WITH_QUERY ||
      this.type === TableType.GET_ALL
    ) {
      this.updateTrigger$.next(entity['id'].toString() || '0');
    }
    this.applyStateChangesToUrlQueryParams({ [mode]: null });
    dialogRef.close();
  }

  onTranslationError(
    error: HttpErrorResponse,
    dialogRef: MatDialogRef<ProtocolTranslationDialogComponent>
  ) {
    dialogRef.componentInstance.errorHappened(error);
  }
}
