import {inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Metrics, ThreadDump} from '../models/radar-metrics.model';
import {environment} from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  private http = inject(HttpClient);

  getMetrics(): Observable<Metrics> {
    return this.http.get<Metrics>(`${environment.apiUrl}management/jhimetrics`);
  }

  threadDump(): Observable<ThreadDump> {
    return this.http.get<ThreadDump>(`${environment.apiUrl}management/threaddump`);
  }
}
