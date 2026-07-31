import {inject, Injectable} from '@angular/core';
import {AppSource, CreateSourceDto, SourceDto, UpdateSourceDto} from "../models/source";
import {Params} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SourceService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}api/sources`;

  getWithQuery(queryParams: Params) {
    return this.http.get<SourceDto[]>(this.apiUrl, {
      params: queryParams,
      observe: 'response',
    });
  }

  getByKey(key: string) {
    return this.http.get<SourceDto>(`${this.apiUrl}/${key}`);
  }

  add(entity: CreateSourceDto) {
    return this.http.post<SourceDto>(this.apiUrl, entity);
  }

  update(entity: UpdateSourceDto) {
    return this.http.put<SourceDto>(this.apiUrl, entity);
  }

  delete(entity: AppSource) {
    return this.http.delete<SourceDto>(`${this.apiUrl}/${entity.id}`);
  }
}
