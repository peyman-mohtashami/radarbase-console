import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RadarHealth} from '../../../../shared/models/radar-health.model';

@Injectable({providedIn: 'root'})
export class HealthService {
  private http = inject(HttpClient);

  checkHealth(): Observable<RadarHealth> {
    return this.http.get<RadarHealth>('management/health');
  }
}
