import { Component, Input } from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {MatProgressBar} from "@angular/material/progress-bar";
import {PercentPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {Thread, ThreadState} from '../../models/radar-metrics.model';
import {DetailElementComponent} from '../../../../components/detail-element/detail-element.component';

@Component({
  selector: 'app-metrics-threads',
  templateUrl: './metrics-threads.component.html',
  imports: [
    DetailElementComponent,
    TranslatePipe,
    MatProgressBar,
    PercentPipe,
    RouterLink,
    MatButton
  ]
})
export class MetricsThreadsComponent {
  threadStats = {
    threadDumpAll: 0,
    threadDumpRunnable: 0,
    threadDumpTimedWaiting: 0,
    threadDumpWaiting: 0,
    threadDumpBlocked: 0,
  };

  @Input()
  set threads(threads: Thread[] | undefined) {
    this._threads = threads;

    threads?.forEach(thread => {
      if (thread.threadState === ThreadState.Runnable) {
        this.threadStats.threadDumpRunnable += 1;
      } else if (thread.threadState === ThreadState.Waiting) {
        this.threadStats.threadDumpWaiting += 1;
      } else if (thread.threadState === ThreadState.TimedWaiting) {
        this.threadStats.threadDumpTimedWaiting += 1;
      } else if (thread.threadState === ThreadState.Blocked) {
        this.threadStats.threadDumpBlocked += 1;
      }
    });

    this.threadStats.threadDumpAll =
      this.threadStats.threadDumpRunnable +
      this.threadStats.threadDumpWaiting +
      this.threadStats.threadDumpTimedWaiting +
      this.threadStats.threadDumpBlocked;
  }

  get threads(): Thread[] | undefined {
    return this._threads;
  }

  private _threads: Thread[] | undefined;

  // @ViewChild("chart") chart?: ChartComponent;

  // open(): void {
  //   // const modalRef = this.modalService.open(MetricsModalThreadsComponent);
  //   // modalRef.componentInstance.threads = this.threads;
  // }
}
