import { Component, Input } from '@angular/core';
import {DecimalPipe, PercentPipe} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {ProcessMetrics} from '../../models/radar-metrics.model';
import {DetailElementComponent} from '../../../../base-entities/components/entity-details/detail-element/detail-element.component';
import {DhmsPipe} from '../../../../../shared/pipes/dhms.pipe';

@Component({
  selector: 'app-metrics-system',
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
