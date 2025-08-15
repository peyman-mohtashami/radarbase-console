import {Component, inject,} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {instanceConfig} from "../../../core/config/store/config.selectors";
import {Store} from "@ngrx/store";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'rb-logo',
  templateUrl: './logo.component.html',
  imports: [
    AsyncPipe,
    RouterLink,
  ],
})
export class LogoComponent {
  private readonly store = inject(Store);

  instanceConfig$ = this.store.select(instanceConfig);
}
