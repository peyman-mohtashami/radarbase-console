import { Component, Input } from '@angular/core';
import {DecimalPipe, PercentPipe} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {DhmsPipe} from "../../../../pipes/dhms.pipe";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {ProcessMetrics} from '../../../../../shared/models/radar-metrics.model';
import {DetailElementComponent} from '../../../../components/detail-element/detail-element.component';

@Component({
  selector: 'rb-metrics-system',
  templateUrl: './metrics-system.component.html',
  imports: [
    DetailElementComponent,
    TranslatePipe,
    DhmsPipe,
    LocalDateComponent,
    PercentPipe,
    DecimalPipe
  ]
})
export class MetricsSystemComponent {

  @Input() systemMetrics?: ProcessMetrics;
}
