import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../../services/metrics.service';
import {TranslatePipe} from "@ngx-translate/core";
import {NgClass} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {TagComponent} from "../../../../components/tag/tag.component";
import {MatIcon} from "@angular/material/icon";
import {Thread, ThreadState} from '../../../../../shared/models/radar-metrics.model';

@Component({
  selector: 'rb-metrics-threads-details',
  templateUrl: './metrics-threads-details.component.html',
  imports: [
    TranslatePipe,
    NgClass,
    MatButton,
    MatIcon,
    MatCard,
    TagComponent
  ]
})
export class MetricsThreadsDetailsComponent implements OnInit {
  ThreadState = ThreadState;
  threadStateFilter?: ThreadState;
  filteredThreads: Thread[] = [];
  private threads?: Thread[];

  threadDumpAll = 0;
  threadDumpBlocked = 0;
  threadDumpRunnable = 0;
  threadDumpTimedWaiting = 0;
  threadDumpWaiting = 0;

  constructor(private metricsService: MetricsService) {}

  ngOnInit(): void {
    this.metricsService.threadDump().subscribe({
      next: (threadDump) => {
        this.threads = threadDump.threads;
        this.threads.forEach(thread => {
          if (thread.threadState === ThreadState.Runnable) {
            this.threadDumpRunnable ++;
          } else if (thread.threadState === ThreadState.Waiting) {
            this.threadDumpWaiting ++;
          } else if (thread.threadState === ThreadState.TimedWaiting) {
            this.threadDumpTimedWaiting ++;
          } else if (thread.threadState === ThreadState.Blocked) {
            this.threadDumpBlocked ++;
          }
        });

        this.threadDumpAll = this.threadDumpRunnable + this.threadDumpWaiting + this.threadDumpTimedWaiting + this.threadDumpBlocked;
        this.filterThreadState();
      }
    })
  }

  filterThreadState(filter?: ThreadState) {
    this.threadStateFilter = filter;
    this.filteredThreads = this.threads?.filter(
      thread => !filter || thread.threadState === filter
    ) ?? [];
  }
}
