import { Component, Input } from '@angular/core';
import {DetailElementComponent} from "../../../../components/base-details/detail-element/detail-element.component";
import {DecimalPipe, NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {MatProgressBar} from "@angular/material/progress-bar";
import {GarbageCollector} from '../../../../../shared/models/radar-metrics.model';

@Component({
  selector: 'rb-metrics-garbage-collector',
  templateUrl: './metrics-garbage-collector.component.html',
  imports: [
    DetailElementComponent,
    NgIf,
    TranslatePipe,
    MatProgressBar,
    DecimalPipe
  ]
})
export class MetricsGarbageCollectorComponent {

  @Input() garbageCollectorMetrics?: GarbageCollector;

}
