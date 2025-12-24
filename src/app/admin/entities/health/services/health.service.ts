import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {RadarHealth} from '../models/health.model';

@Injectable({providedIn: 'root'})
export class HealthService {
  private http = inject(HttpClient);

  checkHealth(): Observable<RadarHealth> {
    return this.http.get<RadarHealth>(`${environment.apiUrl}management/health`);
  }
}
