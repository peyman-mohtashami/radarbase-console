import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

import { MetricsService } from '../../services/metrics.service';
import {TranslatePipe} from "@ngx-translate/core";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {JsonPipe, NgIf} from "@angular/common";
import {MetricsMemoryComponent} from "../../components/metrics-memory/metrics-memory.component";
import {MetricsThreadsComponent} from "../../components/metrics-threads/metrics-threads.component";
import {MetricsSystemComponent} from "../../components/metrics-system/metrics-system.component";
import {
  MetricsGarbageCollectorComponent
} from "../../components/metrics-garbage-collector/metrics-garbage-collector.component";
import {MetricsRequestComponent} from "../../components/metrics-request/metrics-request.component";
import {
  MetricsEndpointsRequestsComponent
} from "../../components/metrics-endpoints-requests/metrics-endpoints-requests.component";
import {MetricsCacheComponent} from "../../components/metrics-cache/metrics-cache.component";
import {MetricsDatasourceComponent} from "../../components/metrics-datasource/metrics-datasource.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {Metrics, Thread} from '../../../../../shared/models/radar-metrics.model';

@Component({
  selector: 'rb-metrics-page',
  templateUrl: './metrics-page.component.html',
  imports: [
    MatIcon,
    TranslatePipe,
    LoaderComponent,
    MatAccordion,
    MatExpansionPanel,
    NgIf,
    MatExpansionPanelTitle,
    MetricsMemoryComponent,
    MetricsThreadsComponent,
    MetricsSystemComponent,
    MetricsGarbageCollectorComponent,
    MetricsRequestComponent,
    MetricsEndpointsRequestsComponent,
    MetricsCacheComponent,
    MetricsDatasourceComponent,
    JsonPipe,
    MatButton, MatExpansionPanelHeader
  ]
})
export class MetricsPageComponent implements OnInit {
  loading = true;

  metrics?: Metrics;
  threads?: Thread[];

  constructor(private metricsService: MetricsService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loading = true;
    combineLatest([this.metricsService.getMetrics(), this.metricsService.threadDump()])
      .subscribe(([metrics, threadDump]) => {
        this.metrics = metrics;
        this.threads = threadDump.threads;
        this.loading = false;
    });
  }
}
