import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

import { DialogMode } from '../../../../enums/dialog';
import {takeUntil} from "rxjs/operators";
import { AppClient } from "../../models/client";
import { ENTITY_NAME } from '../../../../enums/entities';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {MatPrefix} from "@angular/material/input";
import {Subject} from 'rxjs';
import {ClientConfigService} from '../../services/client-config.service';
import {ClientDialogService} from '../../services/client-dialog.service';
import {ENTITIES} from '../../../../consts/entities';
import {BackButtonDirective} from '../../../../directives/back-button.directive';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent} from '@angular/material/card';
import {ActionsComponent} from '../../components/actions/actions.component';
import {ClientDetailsComponent} from '../../components/client-details/client-details.component';

@Component({
  selector: 'rb-client-page',
  templateUrl: './client-page.component.html',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    ActionsComponent,
    BackButtonDirective,
    MatButton,
    MatCard,
    MatCardContent,
    MatPrefix,
    RouterLink,
    ClientDetailsComponent
  ]
})
export class ClientPageComponent implements OnInit, OnDestroy {
  private configService = inject(ClientConfigService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialogService = inject(ClientDialogService);

  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ENTITIES = ENTITIES;
  protected readonly DialogMode = DialogMode;

  entity$ = signal<AppClient>(this.activatedRoute.snapshot.data['entity']);
  entities = this.activatedRoute.snapshot.data['entities'];
  tableFields = this.configService.getTableFields();

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    this.initializeDialogEffect();
  }

  ngOnInit(): void {
    this.handleDialogUrlFragment();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent$();
      if (updated) {
        switch (updated.mode) {
          case DialogMode.EDIT:
            if (updated?.entity) {
              this.entity$.set(updated.entity);
            }
            this.navigateOnUpdateSuccess(updated.entity);
            break;
          case DialogMode.DELETE:
            this.navigateOnDeleteSuccess();
            break;
        }
      }
    })
  }

  private handleDialogUrlFragment() {
    this.activatedRoute.fragment
      .pipe(takeUntil(this._destroy$))
      .subscribe(fragment => {
        if (fragment) this.processUrlFragment(fragment);
      });
  }

  private processUrlFragment(fragment: string) {
    const [_, action, entityType] = fragment.split('/');
    if (entityType === 'client') {
      switch(action) {
        case 'edit':
          this.dialogService.openDialog(DialogMode.EDIT, this.entity$(), this.entities);
          break;
        case 'delete':
          this.dialogService.openDialog(DialogMode.DELETE, this.entity$(), this.entities);
      }
    }
  }

  navigateOnUpdateSuccess(entity: AppClient) {
    this.router.navigate(['/admin', 'clients', entity.clientId]).then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'clients']).then();
  }


  form = new FormGroup({
    category: new FormControl('general'),
  })
}
