import {Component, inject, OnDestroy} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogMode } from '../../../../enums/dialog';
import { ProtocolDialogComponent } from '../protocol-dialog/protocol-dialog.component';
import { ProtocolService } from '../../services/protocol.service';
// import { BaseEntityPageComponent } from '../../../../components/base-entity-page/base-entity-page.component';
import { AppProtocol } from "../../models/protocol";
import {AppOrganization} from "../../../organization/models/organization";
import {Store} from "@ngrx/store";
import {AdminActions} from "../../../../store/action.types";

@Component({
    selector: 'rb-protocol-page',
    templateUrl: './protocol-page.component.html',
})
export class ProtocolPageComponent
  // extends BaseEntityPageComponent<AppProtocol, ProtocolDialogComponent>
  // implements OnDestroy
{
  private activatedRoute = inject(ActivatedRoute);
  entity: AppProtocol = this.activatedRoute.snapshot.data['entity'];

  // constructor(
  //   private activatedRoute: ActivatedRoute,
  //   private store: Store
  // ){
  //   // activatedRoute.url.subscribe(() => {
  //   //   if(activatedRoute.snapshot.firstChild?.url[0].path !== 'projects') {
  //   //     this.store.dispatch(
  //   //       AdminActions.projectSelected({ selectedProject: null })
  //   //     );
  //   //   }
  //   // });
  // }
  // entities: AppProtocol[] = this.activatedRoute.snapshot.data['entities'];
  // organizations: RadarOrganization[] = this.activatedRoute.snapshot.data["organizations"];
  // sourceTypes = this.activatedRoute.snapshot.data["sourceTypes"];

  // organizationName?: string = this.entity.organization.name;

  // constructor(
  //   router: Router,
  //   activatedRoute: ActivatedRoute,
  //   dialog: MatDialog,
  //   location: Location,
  //   private entityService: ProtocolService
  // ) {
  //   super(router, activatedRoute, dialog, location);
  // }
  //
  // override ngOnDestroy() {
  //   super.ngOnDestroy();
  // }
  //
  // override getDialogRef(
  //   mode: DialogMode,
  //   entity: AppProtocol
  // ): MatDialogRef<ProtocolDialogComponent> {
  //   return this.dialog.open(ProtocolDialogComponent, {
  //     data: { mode, entity, entities: this.entities },
  //     panelClass: ['scrollable', 'full-width-dialog'],
  //     disableClose: true,
  //   });
  // }

  // override update(entity: RadarProject, dialogRef:  MatDialogRef<QuestionnaireDialogComponent>){
  //   this.entityService.update(entity).subscribe({
  //     next: (_entity) => this.onSuccess(_entity, dialogRef),
  //     error: (err) => this.onError(err, dialogRef)
  //   })
  // }

  // override navigate(entity: RadarQuestionnaire) {
  //   this.router.navigate(['/admin', 'projects', entity.projectName, 'subjects']).then();
  // }
}
