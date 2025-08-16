import { Component, Input } from '@angular/core';
import { DialogMode } from '../../enums/dialog';
import { DetailType } from '../../enums/detail-type';
import {instanceConfig} from "../../../core/config/store/config.selectors";
import {map} from "rxjs/operators";
import {ENTITY_NAME} from "../../enums/entities";
import {Store} from "@ngrx/store";

@Component({
    selector: 'rb-base-details',
    template: '<div></div>',
})
export class BaseDetailsComponent<T> {
  DialogMode = DialogMode;
  DetailType = DetailType;

  @Input({required: true}) entity!: T;

  @Input()
  mode?: DialogMode;

  @Input()
  type?: DetailType;

  config$;

  constructor(private store: Store) {
    this.config$ = this.store?.select(instanceConfig).pipe(
      map(config => config.entities) //[ENTITY_NAME.subject])
    );
  }

}
