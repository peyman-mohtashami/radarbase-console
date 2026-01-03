import {Component, input} from '@angular/core';
import {DialogMode} from '../../enums/dialog';
import {DetailType} from '../../enums/detail-type';
import {BaseConfigService} from '../../services/base-config.service';

@Component({
  selector: 'app-base-entity-details',
  template: '',
})
export class BaseEntityDetailsComponent<T> {
  protected readonly DetailType = DetailType;

  protected configService!: BaseConfigService;

  entity = input.required<T | undefined>();
  dialogMode = input<DialogMode>();
  detailType = input<DetailType>();
}
