import {computed, inject, Injectable} from '@angular/core';
import {AppGroup, CreateGroupDto, GroupDto} from "../models/group";
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ProjectStore} from '../../project/services/project.store';

@Injectable({
  providedIn: "root"
})
export class GroupService {
  private http = inject(HttpClient);
  private projectStore = inject(ProjectStore);

  private apiUrl = computed(() => {
    const project = this.projectStore.selected()!;
    return `${environment.apiUrl}api/projects/${project.projectName}/groups`;
  });

  getWithQuery() {
    return this.http.get<GroupDto[]>(this.apiUrl());
  }

  add(entity: CreateGroupDto) {
    return this.http.post<GroupDto>(this.apiUrl(), entity);
  }

  delete(entity: AppGroup) {
    return this.http.delete<GroupDto>(`${this.apiUrl()}/${entity.id}`);
  }
}
