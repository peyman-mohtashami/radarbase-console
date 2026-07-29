import {computed, inject, Injectable} from '@angular/core';
import {AppSource, CreateSourceDto, SourceDto, UpdateSourceDto} from "../models/source";
import {Params} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ProjectStore} from '../../project/services/project.store';

@Injectable({ providedIn: 'root' })
export class SourceService {
  private http = inject(HttpClient);
  private projectStore = inject(ProjectStore);

  private apiUrl = computed(() => {
    const project = this.projectStore.selected()!;
    return `${environment.apiUrl}api/projects/${project.projectName}/sources`;
  });

  getWithQuery(queryParams: Params) {
    return this.http.get<SourceDto[]>(this.apiUrl(), {
      params: queryParams,
      observe: 'response',
    });
  }

  getByKey(key: string) {
    return this.http.get<SourceDto>(`${this.apiUrl()}/${key}`);
  }

  add(entity: CreateSourceDto) {
    return this.http.post<SourceDto>(this.apiUrl(), entity);
  }

  update(entity: UpdateSourceDto) {
    return this.http.put<SourceDto>(this.apiUrl(), entity);
  }

  delete(entity: AppSource) {
    return this.http.delete<SourceDto>(`${this.apiUrl()}/${entity.id}`);
  }
}
//   extends
// } BaseEntityService<AppSource, SourceDto> {
//   override configService = inject(SourceConfigService);
//
//   override getResourceUrl(): string {
//     return `${environment.apiUrl}api/sources`;
//   }
//
//   override toAppModel(entity: SourceDto): AppSource {
//     return { ...entity, _name: entity.sourceName, _search: `${entity.sourceName} ${entity.sourceId} ${entity.expectedSourceName}` };
//   }
//
//   override toRadarModel(entity: AppSource): SourceDto {
//     return { ...entity, assigned: !!entity.assigned, };
//   }
//
//   override getWithQuery(queryParams: Params | undefined, projectName?: string): Observable<AppSource[]> {
//     const { params } = this.convertParamsToHttpParams(queryParams as Params);
//     return this.http.get<SourceDto[]>(`${environment.apiUrl}api/projects/${projectName}/sources`, {
//       params,
//       observe: 'response',
//     }).pipe(
//       tap(
//         (res) => {
//           this.total.set(+(
//             res.headers.get('x-total-count') ||
//             res.body?.length.toString() ||
//             '0'
//           ))
//         }
//       ),
//       map((res) => {
//         const entities = (res.body || []).map((entity) => this.toAppModel(entity));
//         this.cache = entities;
//         return entities;
//       })
//     );
//   }
// }
