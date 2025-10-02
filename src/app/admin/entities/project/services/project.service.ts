import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AppProject, RadarProject} from "../models/project";
import {Params} from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {DEFAULT_PAGE_SIZE} from '../../../services/base.entity.service';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);

  private readonly resourceUrl = 'api/projects';
  total = 0;

  private toAppModel(entity: RadarProject): AppProject {
    return { ...entity, _name: entity.projectName, _search: `${entity.projectName} ${entity.description} ${entity.location}` };
  }

  private toRadarModel(entity: AppProject): RadarProject {
    return { ...entity, organizationName: undefined };
  }

  getAll(organizationName?: string): Observable<AppProject[]> {
    return this.http.get<RadarProject[]>(this.resourceUrl)
      .pipe(
        map((entities) =>
          entities.filter(entity => {
            if (!organizationName) return true;
            return entity.organization.name === organizationName;
          }).map((entity) => this.toAppModel(entity))
        )
      );
  }

  // getWithQuery(queryParams?: Params | string): Observable<AppProject[]> {
  //   const { params } = this.convertParamsToHttpParams(queryParams as Params);
  //   return this.http.get<RadarProject[]>(this.resourceUrl, {
  //     params,
  //     observe: 'response',
  //   }).pipe(
  //     tap(
  //       (res) => {
  //         this.total = +(
  //           res.headers.get('x-total-count') ||
  //           res.body?.length.toString() ||
  //           '0'
  //         )
  //       }
  //     ),
  //     map((res) => {
  //       return (res.body || []).map((entity) => this.toAppModel(entity));
  //     })
  //   );
  // }

  add(entity: AppProject): Observable<AppProject> {
    return this.http.post<RadarProject>(this.resourceUrl, this.toRadarModel(entity))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  getByKey(key: number | string): Observable<AppProject> {
    console.log('!!!Class: ProjectService, Function: getByKey, Line 63 ' , key);
    return this.http.get<RadarProject>(`${this.resourceUrl}/${encodeURIComponent(key)}`)
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  update(update: AppProject): Observable<AppProject> {
    return this.http.put<RadarProject>(this.resourceUrl, this.toRadarModel(update))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  delete(entity: AppProject): Observable<void> {
    return this.http.delete<void>(
      `${this.resourceUrl}/${encodeURIComponent(entity._name)}`
    );
  }

  // private convertParamsToHttpParams(queryParams: Params): {
  //   params: HttpParams;
  //   parentEntityName: string;
  // } {
  //   let params = new HttpParams();
  //   params = params.append(
  //     'size',
  //     queryParams?.['pageSize'] || DEFAULT_PAGE_SIZE
  //   );
  //   params = params.append('page', queryParams?.['pageIndex'] || '0');
  //   if (
  //     queryParams?.['sortField'] &&
  //     queryParams['sortField'] !== '' &&
  //     queryParams?.['sortOrder'] &&
  //     queryParams['sortOrder'] !== ''
  //   ) {
  //     params = params.append(
  //       'sort',
  //       queryParams['sortField'] + ',' + queryParams['sortOrder']
  //     );
  //   } else {
  //     params = params.append('sort', 'id' + ',' + 'desc');
  //   }
  //   return { params, parentEntityName: queryParams?.['parentEntityName'] };
  // }
}
