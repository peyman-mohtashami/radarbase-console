import {Component, inject, Input, input, output} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';
import {PermissionDirective} from '../../../core/auth/directives/show-if-has-role.directive';
import {DialogMode} from '../../enums/dialog';
import {EntityRegistry} from "../../../shared/consts/entity-registry";
import {MatIcon} from '@angular/material/icon';
import {ROLES} from '../../../shared/enums/roles';

@Component({
  selector: 'app-entities-page-header',
  templateUrl: './entities-page-header.component.html',
  imports: [
    TranslatePipe,
    MatIconButton,
    PermissionDirective,
    MatButton,
    MatIcon
  ]
})
export class EntitiesPageHeaderComponent {
  public router = inject(Router);
  public route = inject(ActivatedRoute);

  protected readonly DialogMode = DialogMode;

  entityMetadata = input.required<EntityRegistry>();
  showTitle = input<boolean>(true);
  enableAddButton = input<boolean>(true);
  permission = input<{role: ROLES; entityName?: string;}[]>();

  //TODO
  @Input() isGridView?: boolean;

  gridListToggled = output<boolean>();

  toggleGridListView() {
    this.isGridView = !this.isGridView;
    this.gridListToggled.emit(this.isGridView);
  }
}
