import {inject, Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';

import {LogService} from './log.service';
import {AppLog} from "../models/log";

@Injectable({providedIn: 'root'})
export class LogsResolver implements Resolve<AppLog[]> {
  private entityService = inject(LogService);

  resolve(): Observable<AppLog[]> {
    return this.entityService.getAll();
  }
}
