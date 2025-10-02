import {Component, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {MatCard, MatCardContent} from "@angular/material/card";
import {SubjectDetailsComponent} from "../../components/subject-details/subject-details.component";
import {TranslatePipe} from "@ngx-translate/core";
import {AppSubject} from '../../models/subject';
import {SubjectConfigService} from '../../services/subject-config.service';

@Component({
  selector: 'rb-subject-details-page',
  templateUrl: './subject-details-page.component.html',
  imports: [
    LoaderComponent,
    MatCard,
    MatCardContent,
    SubjectDetailsComponent,
    TranslatePipe,
  ]
})
export class SubjectDetailsPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private configService = inject(SubjectConfigService);

  loading = false;
  entity = this.activatedRoute.snapshot.parent?.data['entity'] as AppSubject;
  tableFields = this.configService.getTableFields();
}
