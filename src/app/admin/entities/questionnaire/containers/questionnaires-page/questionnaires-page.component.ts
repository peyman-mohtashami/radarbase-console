// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
//
// import { MatDialog } from "@angular/material/dialog";
//
// import { FilterItem, TableType } from '../../../../models/table.model';
// import { FormFieldType } from '../../../../models/dialog.model';
//
// import { DialogMode } from '../../../../enums/dialog';
// import { QuestionnaireDialogComponent } from '../questionnaire-dialog/questionnaire-dialog.component';
// import { QuestionnaireService } from '../../services/questionnaire.service';
// import { AppQuestionnaireBundle} from "../../models/questionnaire";
// import { TABLE_ANIMATION } from "../../../../animation";
// import { ENTITY_NAME } from "../../../../enums/entities";
// import {BaseEntitiesPage} from "../../../../components/base-entities-page/base-entities-page";
// import {PROPERTIES} from "../../questionnaire.module";
// import {
//   EntitiesPageHeaderComponent
// } from "../../../../components/base-entities-page/entities-page-header/entities-page-header.component";
// import {
//   DataTableFilterComponent
// } from "../../../../components/base-entities-page/data-table-filter/data-table-filter.component";
// import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
// import {KeyValuePipe, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
// import {TableQueryReflectorDirective} from "../../../../directives/table-query-reflector.directive";
// import {TranslatePipe} from "@ngx-translate/core";
// import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
// import {MatIconButton} from "@angular/material/button";
// import {MatPaginator} from "@angular/material/paginator";
//
// @Component({
//   selector: 'rb-questionnaires-page',
//   templateUrl: './questionnaires-page.component.html',
//   animations: TABLE_ANIMATION,
//   imports: [
//     EntitiesPageHeaderComponent,
//     DataTableFilterComponent,
//     LoaderComponent,
//     NgIf,
//     TableQueryReflectorDirective,
//     NgForOf,
//     TranslatePipe,
//     NgClass,
//     NgSwitch,
//     NgSwitchCase,
//     MatIconButton,
//     MatMenu,
//     NgSwitchDefault,
//     MatPaginator,
//     MatMenuTrigger,
//     KeyValuePipe,
//     MatMenuItem
//   ]
// })
// export class QuestionnairesPageComponent
//   extends BaseEntitiesPage<AppQuestionnaireBundle, QuestionnaireDialogComponent>
//   implements OnInit, OnDestroy
// {
//   name = ENTITY_NAME.questionnaire;
//   protected readonly ENTITY_NAME = ENTITY_NAME;
//   protected readonly PROPERTIES = PROPERTIES;
//
//   override type = TableType.GET_WITH_QUERY;
//
//   override filters: FilterItem[] = [
//     {
//       name: 'name',
//       label: 'ADMIN.questionnaire.name.tableLabel',
//       type: FormFieldType.INPUT,
//     },
//   ];
//
//   constructor(
//     router: Router,
//     activatedRoute: ActivatedRoute,
//     dialog: MatDialog,
//     entityService: QuestionnaireService
//   ) {
//     super(router, activatedRoute, dialog, entityService);
//   }
//
//   ngOnInit(): void {
//     this.init();
//   }
//
//   ngOnDestroy() {
//     this.destroy();
//   }
//
//   override getDialogRef(mode: DialogMode, entity?: AppQuestionnaireBundle, extra?: any) {
//     return this.dialog.open(QuestionnaireDialogComponent, {
//       data: { mode, entity, entities: this.entities, language: extra ?? 'en'}, //, language: selectedLanguage },
//       // panelClass: ['w-full', 'sm:w-1/2'],
//       panelClass: ['w-full'],
//       disableClose: true,
//     });
//   }
//
//   onTranslationAction(
//     mode: DialogMode,
//     entity?: AppQuestionnaireBundle,
//     // language?: RadarARMTLanguage,
//     language?: unknown,
//     entityName?: string,
//     e?: Event
//   ): void {
//     e?.stopPropagation();
//     this.onAction(mode, entity, undefined, undefined, language);
//   }
// }
