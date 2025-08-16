import { Component, Input } from '@angular/core';
import {DialogMode} from "../../../enums/dialog";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'rb-dialog-body-description',
  templateUrl: './dialog-body-description.component.html',
  imports: [
    TranslatePipe
  ]
})
export class DialogBodyDescriptionComponent {
  DialogMode = DialogMode;

  @Input() mode?: DialogMode;
  @Input() label?: string;
  @Input() entityName?: string;
}
