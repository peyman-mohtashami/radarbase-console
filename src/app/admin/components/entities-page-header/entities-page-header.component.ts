import {Component, inject, Input, input, output} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';
import {PermissionDirective} from '../../../core/auth/directives/show-if-has-role.directive';
import {DialogMode} from '../../enums/dialog';
import {EntityRegistry} from "../../../shared/consts/entity-registry";

@Component({
  selector: 'app-entities-page-header',
  templateUrl: './entities-page-header.component.html',
  imports: [
    TranslatePipe,
    MatIconButton,
    PermissionDirective,
    MatButton
  ]
})
export class EntitiesPageHeaderComponent {
  public router = inject(Router);
  public route = inject(ActivatedRoute);

  protected readonly DialogMode = DialogMode;

  entityMetadata = input.required<EntityRegistry>();
  showTitle = input<boolean>(true);
  enableAddButton = input<boolean>(true);
  permission = input<any>();

  //TODO
  @Input() isGridView?: boolean; // = input<boolean>();

  action = output<any>();
  gridListToggled = output<boolean>();

  toggleGridListView() {
    this.isGridView = !this.isGridView;
    this.gridListToggled.emit(this.isGridView);
  }
}
