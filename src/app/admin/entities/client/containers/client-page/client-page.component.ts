import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, Location, NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DialogMode } from '../../../../enums/dialog';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';
// import { ClientEntityService } from '../../store/services/client.entity.service';
import { BaseEntityPage } from '../../../../components/base-entity-page/base-entity-page';
import { AdminActions } from "../../../../store/action.types";
import { select, Store } from "@ngrx/store";
import { project } from "../../../../store/admin.selectors";
import { map } from "rxjs/operators";
import { AppClient } from "../../models/client";
import { ENTITY_NAME } from '../../../../enums/entities';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {TranslatePipe} from "@ngx-translate/core";
import {
  StaticBreadcrumbComponent
} from "../../../../components/base-entity-page/static-breadcrumb/static-breadcrumb.component";
import {MatAccordion, MatExpansionPanel} from "@angular/material/expansion";
import {ClientDetailsComponent} from "../../components/client-details/client-details.component";
import {MatFormField} from "@angular/material/input";
import {MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'rb-client-page',
  templateUrl: './client-page.component.html',
  imports: [
    LoaderComponent,
    NgIf,
    TranslatePipe,
    StaticBreadcrumbComponent,
    AsyncPipe,
    MatFormField,
    ReactiveFormsModule,
    MatSelect,
    MatLabel,
    MatAccordion,
    MatExpansionPanel,
    ClientDetailsComponent,
    RouterOutlet,
    MatOption
  ]
})
export class ClientPageComponent
  extends BaseEntityPage<AppClient, ClientDialogComponent>
  implements OnInit
{
  protected readonly ENTITY_NAME = ENTITY_NAME;

  store = inject(Store);

  entities: AppClient[] = this.activatedRoute.snapshot.data['entities'];

  form = new FormGroup({
    category: new FormControl('general'),
  })

  panelOpenState = false;
  inGlobalScope$ = this.store.pipe(
    select(project),
    map(project => !project)
  )

  constructor(
    router: Router,
    dialog: MatDialog,
    activatedRoute: ActivatedRoute,
    location: Location,
    entityService: ClientService, //ClientEntityService,
  ) {
    super(router, activatedRoute, dialog, location, entityService);
  }

  ngOnInit() {
    this.store.dispatch(
      AdminActions.clientSelected({
        selectedClient: this.entity,
      })
    );
    this.store.dispatch(
      AdminActions.clientConfigCategorySelected({
        selectedClientConfigCategory: 'general',
      })
    );
    const category = this.activatedRoute.firstChild?.snapshot.params["category"];
    if(category){
      this.form?.patchValue({category})
    }
    this.form.valueChanges.subscribe((value) => {
      this.store.dispatch(AdminActions.clientConfigCategorySelected({selectedClientConfigCategory: value.category}))
      this.router.navigate([value.category], {relativeTo: this.activatedRoute}).then();
    });

    this.entityService.entities$?.subscribe({
      next: (value) => {
        const entity = value.find(
          (v) => v.clientId === this.activatedRoute.snapshot.params['id']
        );
        if (entity) {
          this.entity = entity;
        }
      },
    });
  }

  override getDialogRef(
    mode: DialogMode,
    entity: AppClient
  ): MatDialogRef<ClientDialogComponent> {
    return this.dialog.open(ClientDialogComponent, {
      data: { mode, entity, entities: this.entities },
      panelClass: ['w-full', 'sm:w-1/2'],
      disableClose: true,
    });
  }

  // override navigateOnUpdateSuccess(entity: AppClient) {
  //   //this.router.navigate(['/admin', 'clients', entity.clientId, 'general']).then();
  // }
  //
  // override navigateOnDeleteSuccess() {
  //   this.router.navigate(['/admin', 'clients']).then();
  // }
}
