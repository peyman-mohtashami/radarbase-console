import {inject, Injectable} from '@angular/core';
import {AppSourceType, CreateSourceTypeDto, SourceTypeDto, UpdateSourceTypeDto} from "../models/source-type";
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class SourceTypeService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}api/source-types`;


  getWithQuery() {
    return this.http.get<SourceTypeDto[]>(this.apiUrl);
  }

  getByKey(key: string) {
    return this.http.get<SourceTypeDto>(`${this.apiUrl}/${key}`);
  }

  add(entity: CreateSourceTypeDto) {
    return this.http.post<SourceTypeDto>(this.apiUrl, entity);
  }

  update(entity: UpdateSourceTypeDto) {
    return this.http.put<SourceTypeDto>(this.apiUrl, entity);
  }

  delete(entity: AppSourceType) {
    return this.http.delete<SourceTypeDto>(`${this.apiUrl}/${entity.producer}/${entity.model}/${entity.catalogVersion}`);
  }
}
