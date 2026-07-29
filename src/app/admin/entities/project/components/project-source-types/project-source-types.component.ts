import {Component, input} from "@angular/core";
import {SourceTypeDto} from '../../../source-type/models/source-type';
import {TranslatePipe} from '@ngx-translate/core';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-project-source-types',
  templateUrl: './project-source-types.component.html',
  imports: [
    TagComponent,
    TranslatePipe
  ]
})
export class ProjectSourceTypesComponent {
  sourceTypes = input<SourceTypeDto[] | null>();

  showAll = false;

  toggleView($event: MouseEvent, showAll: boolean) {
    $event?.stopPropagation();
    this.showAll = !showAll
  }
}
