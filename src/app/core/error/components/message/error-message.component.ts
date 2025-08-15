import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { MessageService } from '../../services/message.service';
import {Store} from "@ngrx/store";
// import {messageError} from "../../store/message.selectors";
import {TranslatePipe} from "@ngx-translate/core";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {serverError} from "../../store/error.selectors";
import {AppError} from '../../models/error.model';

// import { MessageService } from '@rb/rb-util/rb-message';

export enum MessageBoxType {
  ERROR = 'error',
  WARNING = 'warn',
  INFO = 'info',
}

@Component({
  selector: 'rb-message',
  templateUrl: './error-message.component.html',
  imports: [
    TranslatePipe,
    NgIf,
    NgForOf,
    AsyncPipe,
    JsonPipe
  ]
})
export class ErrorMessageComponent {
  // errors$ = this.store.select(messageError)

  errors$:  Observable<AppError | undefined>

  // errors$: Observable<string[]> = this.messagesService.errors$.pipe(
  //   tap(() => (this._showMessages = true))
  // );

  // type$: Observable<MessageBoxType> = this.messagesService.type$;

  // _showMessages = false;

  // @Input() set showMessage(value: boolean) {
  //   this._showMessages = value;
  // }

  constructor(private store: Store,
              // public messagesService: MessageService
  ) {
    this.errors$ = this.store.select(serverError)
  }

  // onClose() {
  //   this._showMessages = false;
  // }
}
