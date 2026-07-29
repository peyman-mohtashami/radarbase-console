import {inject, Injectable} from '@angular/core';
import {AppSourceData, CreateSourceDataDto, SourceDataDto, UpdateSourceDataDto} from "../models/source-data";
import {Params} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class SourceDataService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}api/source-data`;

  getWithQuery(queryParams: Params) {
    // const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<SourceDataDto[]>(this.apiUrl, {
      params: queryParams,
      observe: 'response',
    });
  }

  getByKey(key: string) {
    return this.http.get<SourceDataDto>(`${this.apiUrl}/${key}`);
  }

  add(entity: CreateSourceDataDto) {
    return this.http.post<SourceDataDto>(this.apiUrl, entity);
  }

  update(entity: UpdateSourceDataDto) {
    return this.http.put<SourceDataDto>(this.apiUrl, entity);
  }

  delete(entity: AppSourceData) {
    return this.http.delete<SourceDataDto>(`${this.apiUrl}/${entity.sourceDataName}`);
  }
}
