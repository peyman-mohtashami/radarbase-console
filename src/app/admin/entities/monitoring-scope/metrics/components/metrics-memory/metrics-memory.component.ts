import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {KeyValuePipe, PercentPipe} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {TranslatePipe} from "@ngx-translate/core";
import {JvmMetrics} from '../../models/radar-metrics.model';
import {FileSizePipe} from '../../../../../../shared/pipes/file-size.pipe';

@Component({
  selector: 'app-metrics-memory',
  templateUrl: './metrics-memory.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    FileSizePipe,
    MatProgressBar,
    TranslatePipe,
    KeyValuePipe,
    PercentPipe
  ]
})
export class MetricsMemoryComponent {

  @Input() jvmMemoryMetrics?: Map<string, JvmMetrics>;

}
