// import { Component, OnDestroy } from '@angular/core';
// import {Location, NgIf} from '@angular/common';
// import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
//
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { DialogMode } from '../../../../enums/dialog';
// import { QuestionnaireDialog2Component } from '../questionnaire-dialog/questionnaire-dialog2.component';
// import { QuestionnaireService } from '../../services/questionnaire.service';
// import { BaseEntityPage } from '../../../../components/base-entity-page/base-entity-page';
// import { AppQuestionnaire } from "../../models/questionnaire";
// import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
// import {TranslatePipe} from "@ngx-translate/core";
// import {MatIcon} from "@angular/material/icon";
// import {MatIconButton} from '@angular/material/button';
// import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
// import {MatAccordion, MatExpansionPanel} from '@angular/material/expansion';
// import {QuestionnaireDetailsComponent} from '../../components/questionnaire-details/questionnaire-details.component';
//
// @Component({
//   selector: 'rb-questionnaire-page',
//   templateUrl: './questionnaire-page.component.html',
//   imports: [
//     LoaderComponent,
//     NgIf,
//     TranslatePipe,
//     MatIcon,
//     MatIconButton,
//     MatMenuTrigger,
//     MatMenu,
//     MatMenuItem,
//     MatAccordion,
//     MatExpansionPanel,
//     QuestionnaireDetailsComponent,
//     RouterOutlet
//   ]
// })
// export class QuestionnairePageComponent
//   extends BaseEntityPage<any, QuestionnaireDialog2Component>
//   implements OnDestroy
// {
//   entities: AppQuestionnaire[] =
//     this.activatedRoute.snapshot.data['entities'];
//   // organizations: RadarOrganization[] = this.activatedRoute.snapshot.data["organizations"];
//   // sourceTypes = this.activatedRoute.snapshot.data["sourceTypes"];
//
//   // organizationName?: string = this.entity.organization.name;
//   panelOpenState = false;
//
//   constructor(
//     router: Router,
//     activatedRoute: ActivatedRoute,
//     dialog: MatDialog,
//     location: Location,
//     entityService: QuestionnaireService
//   ) {
//     super(router, activatedRoute, dialog, location, entityService);
//   }
//
//   ngOnDestroy() {
//     this.destroy();
//   }
//
//   override getDialogRef(
//     mode: DialogMode,
//     entity: AppQuestionnaire
//   ): MatDialogRef<QuestionnaireDialog2Component> {
//     return this.dialog.open(QuestionnaireDialog2Component, {
//       data: { mode, entity, entities: this.entities },
//       panelClass: ['scrollable', 'w-full'],
//       disableClose: true,
//     });
//   }
// }
