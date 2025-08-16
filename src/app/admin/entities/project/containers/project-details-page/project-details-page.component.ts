import {Component, inject,} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProject } from "../../models/project";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {MatCard, MatCardContent} from "@angular/material/card";
import {ProjectDetailsComponent} from "../../components/project-details/project-details.component";
import {TranslatePipe} from "@ngx-translate/core";
import {DetailsComponent} from "../../../../components/details/details.component";
import {ENTITY_NAME} from "../../../../enums/entities";
import {PROPERTIES} from "../../config";
import {DetailType} from "../../../../enums/detail-type";
import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'rb-project-details-page',
  templateUrl: './project-details-page.component.html',
  imports: [
    LoaderComponent,
    MatCard,
    MatCardContent,
    ProjectDetailsComponent,
    TranslatePipe,
    DetailsComponent,
    AsyncPipe
  ]
})
export class ProjectDetailsPageComponent {
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly PROPERTIES = PROPERTIES;
  protected readonly DetailType = DetailType;

  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store);

  loading = false;
  entity = this.activatedRoute.snapshot.parent?.data['entity'] as AppProject;

  config$ = this.store?.select(entitiesConfig).pipe(
    map(config => config?.[ENTITY_NAME.project]?.fields ?? {})
  )

  // constructor(private activatedRoute: ActivatedRoute, private store: Store) {}
}
