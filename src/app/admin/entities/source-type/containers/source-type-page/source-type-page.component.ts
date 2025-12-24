import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {AppSourceType, RadarSourceType} from "../../models/source-type";
import {TranslatePipe} from "@ngx-translate/core";
import {SourceTypeDialogService} from '../../services/source-type-dialog.service';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatPrefix} from '@angular/material/input';
import {SourceTypeDetailsComponent} from '../../components/source-type-details/source-type-details.component';
import {SourceTypeConfigService} from '../../services/source-type-config.service';
import {BaseEntityPageComponent} from '../../../../components/entity-page/base-entity-page.component';
import {SourceTypeActionsComponent} from '../../components/source-type-actions/source-type-actions.component';

@Component({
  selector: 'app-source-type-page',
  templateUrl: './source-type-page.component.html',
  imports: [
    MatCard,
    MatCardContent,
    TranslatePipe,
    MatPrefix,
    SourceTypeDetailsComponent,
    SourceTypeActionsComponent,
  ]
})
export class SourceTypePageComponent extends BaseEntityPageComponent<AppSourceType, RadarSourceType> implements OnInit, OnDestroy {
  override configService = inject(SourceTypeConfigService);
  override dialogService = inject(SourceTypeDialogService);

  override entity = signal<AppSourceType>(this.activatedRoute.snapshot.data['sourceType']);

  ngOnInit(): void {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }

  override navigateOnUpdateSuccess(entity: AppSourceType) {
    this.router
      .navigate([
        '/admin',
        'source-types',
        entity.producer,
        entity.model,
        entity.catalogVersion,
      ])
      .then();
  }
}
