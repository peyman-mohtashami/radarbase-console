import { Component, input } from '@angular/core';
import {DialogMode} from "../../../enums/dialog";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-dialog-body-description',
  templateUrl: './dialog-body-description.component.html',
  imports: [
    TranslatePipe
  ]
})
export class DialogBodyDescriptionComponent {
  DialogMode = DialogMode;

  dialogMode = input<DialogMode>();
  label = input<string>();
  entityName = input<string>();
}
