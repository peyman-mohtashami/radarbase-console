import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import {client, organization, project, subject} from "../../../store/admin.selectors";
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatPrefix} from "@angular/material/input";
import {BackButtonDirective} from "../../../directives/back-button.directive";

@Component({
  selector: 'rb-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  imports: [
    NgIf,
    RouterLink,
    AsyncPipe,
    TranslatePipe,
    MatButton,
    MatIcon,
    MatPrefix,
    BackButtonDirective
  ]
})
export class BreadcrumbComponent {
  selectedOrganization$;// = this.store.select(organization);
  selectedProject$;// = this.store.select(project);
  selectedClient$;// = this.store.select(client);
  selectedSubject$;// = this.store.select(subject);

  constructor(private store: Store) {
    this.selectedOrganization$ = this.store.select(organization);
    this.selectedProject$ = this.store.select(project);
    this.selectedClient$ = this.store.select(client);
    this.selectedSubject$ = this.store.select(subject);
  }
}
