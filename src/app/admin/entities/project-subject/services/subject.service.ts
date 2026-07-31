import {computed, inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import {AppSubject, CreateSubjectDto, SubjectDto, UpdateSubjectDto} from "../models/subject";
import {environment} from '../../../../../environments/environment';
import {ProjectStore} from '../../project/services/project.store';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  private http = inject(HttpClient);
  private projectStore = inject(ProjectStore);

  private apiUrl = computed(() => {
    const project = this.projectStore.selected()!;
    return `${environment.apiUrl}api/projects/${project.projectName}/subjects`;
  });

  getWithQuery(queryParams: Params) {
    return this.http.get<SubjectDto[]>(this.apiUrl(), {
      params: queryParams,
      observe: 'response',
    });
  }

  getByKey(key: string) {
    return this.http.get<SubjectDto>(`${environment.apiUrl}api/subjects/${key}`);
  }

  add(entity: CreateSubjectDto) {
    return this.http.post<SubjectDto>(`${environment.apiUrl}api/subjects`, entity);
  }

  update(entity: UpdateSubjectDto) {
    return this.http.put<SubjectDto>(`${environment.apiUrl}api/subjects`, entity);
  }

  delete(entity: AppSubject) {
    return this.http.delete<SubjectDto>(`${environment.apiUrl}api/subjects/${entity.login}`);
  }

  discontinue(entity: UpdateSubjectDto): Observable<AppSubject> {
    return this.http.put<AppSubject>(`${environment.apiUrl}api/subjects/discontinue`, entity);
  }

  addSubjectsToGroup(
    groupName: string,
    subjects: { login?: string; id?: number }[]
  ) {
    const project = this.projectStore.selected()!;
    const url = `${environment.apiUrl}api/projects/${project.projectName}/groups/${encodeURIComponent(groupName)}/subjects`;
    const body = [{ op: 'add', value: subjects }];
    return this.http.patch<void>(url, body);
  }
}
