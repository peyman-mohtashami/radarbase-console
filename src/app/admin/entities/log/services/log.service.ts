import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppLog, RadarLog} from '../models/log';

@Injectable({ providedIn: 'root' })
export class LogService {
  private http = inject(HttpClient);

  private readonly resourceUrl = 'management/logs';

  toAppModel(entity: RadarLog): AppLog {
    return {
      ...entity,
      _name: entity.name,
      _search: `${entity.name} ${entity.level}`,
    };
  }

  getAll(): Observable<AppLog[]> {
    return this.http.get<RadarLog[]>(this.resourceUrl)
      .pipe(
        map((entities) =>
          entities.map((entity) => this.toAppModel(entity))
        )
      );
  }
}
