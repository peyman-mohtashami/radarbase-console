import {inject, Injectable} from '@angular/core';
import {AppProject, CreateProjectDto, ProjectDto, UpdateProjectDto} from "../models/project";
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}api/projects`;

  getWithQuery() {
    return this.http.get<ProjectDto[]>(this.apiUrl);
  }

  getByKey(key: string) {
    return this.http.get<ProjectDto>(`${this.apiUrl}/${key}`);
  }

  add(entity: CreateProjectDto) {
    return this.http.post<ProjectDto>(this.apiUrl, entity);
  }

  update(entity: UpdateProjectDto) {
    return this.http.put<ProjectDto>(this.apiUrl, entity);
  }

  delete(entity: AppProject) {
    return this.http.delete<ProjectDto>(`${this.apiUrl}/${entity.projectName}`);
  }
}
