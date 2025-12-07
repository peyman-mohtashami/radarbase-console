import {Component, input} from '@angular/core';
import {DialogMode} from '../../enums/dialog';
import {DetailType} from '../../enums/detail-type';

@Component({
  selector: 'app-base-details',
  template: '',
})
export class BaseDetailsComponent<T> {
  protected readonly DetailType = DetailType;

  protected configService: any;

  entity = input.required<T>();
  dialogMode = input<DialogMode>();
  detailType = input<DetailType>();
}
