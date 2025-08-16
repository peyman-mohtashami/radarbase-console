import { Component, Input } from "@angular/core";
import {ENTITY_NAME} from "../../../enums/entities";
import {ENTITIES} from "../../../consts/entities";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatPrefix} from "@angular/material/input";
import {BackButtonDirective} from "../../../directives/back-button.directive";


@Component({
  selector: 'rb-static-breadcrumb',
  templateUrl: './static-breadcrumb.component.html',
  imports: [
    NgIf,
    RouterLink,
    TranslatePipe,
    MatButton,
    MatPrefix,
    BackButtonDirective
  ]
})
export class StaticBreadcrumbComponent {
  @Input()
  entityName?: ENTITY_NAME;

  @Input()
  entity?: any;
  protected readonly ENTITIES = ENTITIES;
}
