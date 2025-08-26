import {Component, inject, input, output} from '@angular/core';
import {AppOrganization} from "../../models/organization";
import {DialogMode} from "../../../../enums/dialog";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'rb-actions',
  templateUrl: './actions.component.html',
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatIconButton
  ]
})
export class ActionsComponent {
  protected readonly DialogMode = DialogMode;

  entity = input.required<AppOrganization>();
  action = output<{mode: DialogMode; entity: AppOrganization}>();

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // onAction(mode: DialogMode, entity: AppOrganization) {
  //   this.action.emit({mode, entity});
  // }

  // constructor(private router: Router, private route: ActivatedRoute) {}


  onAction(mode: DialogMode, entity: AppOrganization) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
      fragment: `/${mode}/organization/${entity.id}`
    }).then()
    // this.action.emit({mode, entity});
  }

}
