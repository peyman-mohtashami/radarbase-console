import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from "rxjs";
import { SubjectService } from './subject.service';
import { AppSubject } from "../models/subject";
import {SelectedEntitiesService} from '../../../services/selected-entities.service';
import {tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SubjectResolver implements Resolve<AppSubject> {
  private entityService = inject(SubjectService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSubject> {
    return this.entityService.getByKey(route.params['id']).pipe(
      tap(subject => this.selectedEntitiesService.setSelectedSubject(subject)),
    )
  }
}
