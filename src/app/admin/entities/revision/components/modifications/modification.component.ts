import {Component, input, ChangeDetectionStrategy} from '@angular/core';
import { AppRevision } from "../../models/revision";
import {RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {KeyValuePipe} from "@angular/common";
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TagComponent,
    RouterLink,
    TranslatePipe,
    KeyValuePipe
  ]
})
export class ModificationComponent {
  protected readonly REVISION_TYPES: Record<string, string> = {
    'ADD': 'bg-green-100 text-green-700',
    'MOD': 'bg-cyan-100 text-cyan-700',
    'DEL': 'bg-red-100 text-red-700'
  }
  protected readonly REVISION_ENTITIES: Record<string, string> = {
    'project': '/projects',
    'subject': '/subjects',
    'source': '/sources',
    'sourceType': '/source-types',
    'sourceData': '/source-data',
    'user': '/users'
  }

  revision = input<AppRevision>();
}
