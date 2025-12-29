import { Component, Input } from '@angular/core';
import {DecimalPipe, PercentPipe} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {LocalDateComponent} from "../../../../../../core/locale/components/local-date/local-date.component";
import {ProcessMetrics} from '../../models/radar-metrics.model';
import {DetailElementComponent} from '../../../../../base-entities/components/entity-details/detail-element/detail-element.component';
import {DurationPipe} from '../../../../../../shared/pipes/duration.pipe';

@Component({
  selector: 'app-metrics-system',
  templateUrl: './metrics-system.component.html',
  imports: [
    DetailElementComponent,
    TranslatePipe,
    LocalDateComponent,
    PercentPipe,
    DecimalPipe,
    DurationPipe
  ]
})
export class MetricsSystemComponent {

  @Input() systemMetrics?: ProcessMetrics;
}
