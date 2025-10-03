import {Component, inject, input} from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';
import {AppSubject} from '../../models/subject';
import {MatTooltip} from '@angular/material/tooltip';
import {SubjectDialogMode} from '../../enums/dialog';

@Component({
  selector: 'app-subject-actions',
  templateUrl: './actions.component.html',
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatIconButton,
    MatTooltip
  ]
})
export class ActionsComponent {
  protected readonly DialogMode = SubjectDialogMode;

  entity$ = input.required<AppSubject>();
  isExpanded$ = input<boolean>(true);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onAction(mode: SubjectDialogMode) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
      fragment: `/${mode}/subject/${this.entity$().id}`
    }).then()
  }
}
