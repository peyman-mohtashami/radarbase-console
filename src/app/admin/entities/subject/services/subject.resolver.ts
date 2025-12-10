import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from "rxjs";
import { SubjectService } from './subject.service';
import { AppSubject } from "../models/subject";

@Injectable({ providedIn: 'root' })
export class SubjectResolver implements Resolve<AppSubject> {
  private entityService = inject(SubjectService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSubject> {
    return this.entityService.getByKey(route.params['id'])
  }
}
