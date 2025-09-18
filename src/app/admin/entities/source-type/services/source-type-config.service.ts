import {inject, Injectable} from '@angular/core';
import {TableElements} from '../config';
import {instanceConfig} from '../../../../core/config/store/config.selectors';
import {Store} from '@ngrx/store';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';
import {ENTITY_NAME} from '../../../enums/entities';
import {ConfigState} from '../../../../core/config/models/config.model';

@Injectable({providedIn: 'root'})
export class SourceTypeConfigService {
  private readonly store = inject(Store);

  config$ = toSignal(
    this.store.select(instanceConfig).pipe(
      map((c: ConfigState) => c.entities[ENTITY_NAME.sourceType].fields)
    ), { initialValue: {} });

  // config$ = this.store.select(instanceConfig);


  constructor(
  ) {}

  getAvailableDialogFields() {}

  getAvailableTableFields() {
    return TableElements.filter(e => {
      if (e.editable) {
        return this.config$()[e.name] !== false;
      } else {
        return true;
      }
    })


  }

}
