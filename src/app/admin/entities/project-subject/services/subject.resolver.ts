import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router,} from '@angular/router';
import {AppSubject} from "../models/subject";
import {SubjectStore} from './subject.store';

@Injectable({ providedIn: 'root' })
export class SubjectResolver implements Resolve<AppSubject | null> {
  private store = inject(SubjectStore);
  private router = inject(Router);

  async resolve(route: ActivatedRouteSnapshot): Promise<AppSubject | null> {
    const subjectId = route.paramMap.get('subjectId')!;
    await this.store.getByKey(subjectId);

    const subject = this.store.selected();
    if (!subject) await this.router.navigate(['/admin/organizations']); //?

    return subject;
  }
}
