import {inject, Injectable} from '@angular/core';
import {AppOrganization, CreateOrganizationDto, OrganizationDto, UpdateOrganizationDto} from "../models/organization";
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class OrganizationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}api/organizations`;

  getWithQuery() {
    return this.http.get<OrganizationDto[]>(this.apiUrl);
  }

  getByKey(key: string) {
    return this.http.get<OrganizationDto>(`${this.apiUrl}/${key}`);
  }

  add(entity: CreateOrganizationDto) {
    return this.http.post<OrganizationDto>(this.apiUrl, entity);
  }

  update(entity: UpdateOrganizationDto) {
    return this.http.put<OrganizationDto>(this.apiUrl, entity);
  }

  delete(entity: AppOrganization) {
    return this.http.delete<OrganizationDto>(`${this.apiUrl}/${entity.name}`);
  }
}

