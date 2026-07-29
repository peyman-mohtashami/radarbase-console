import {Component, inject } from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {SubjectDetailsComponent} from "../../components/subject-details/subject-details.component";
import {SubjectStore} from '../../services/subject.store';

@Component({
  selector: 'app-subject-details-page',
  templateUrl: './subject-details-page.component.html',
  imports: [
    MatCard,
    MatCardContent,
    SubjectDetailsComponent,
  ]
})
export class SubjectDetailsPageComponent {
  protected store = inject(SubjectStore);
}
