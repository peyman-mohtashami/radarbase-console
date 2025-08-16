import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {RadarHealth} from '../../../../shared/models/radar-health.model';

@Injectable({ providedIn: 'root' })
export class HealthService {

    constructor(private http: HttpClient) {}

    checkHealth(): Observable<RadarHealth> {
        return this.http.get<RadarHealth>('management/health');
    }
}
