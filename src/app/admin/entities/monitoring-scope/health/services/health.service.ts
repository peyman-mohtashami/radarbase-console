import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {HealthDto} from '../models/health.model';

@Injectable({providedIn: 'root'})
export class HealthService {
  private http = inject(HttpClient);

  checkHealth(): Observable<HealthDto> {
    return this.http.get<HealthDto>(`${environment.apiUrl}management/health`);
  }
}
