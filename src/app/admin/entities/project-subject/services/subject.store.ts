import {inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Params} from '@angular/router';
import {execute} from '../../../shared/utils/store-helpers';
import {SubjectService} from './subject.service';
import {AppSubject, CreateSubjectDto, SubjectDto, UpdateSubjectDto} from '../models/subject';

@Injectable({providedIn: 'root'})
export class SubjectStore {
  private api = inject(SubjectService);
  // private configService = inject(SubjectConfigService);

  readonly items = signal<AppSubject[]>([]);
  readonly selected = signal<AppSubject | null>(null);
  readonly total = signal<number>(0);
  readonly loading = signal(false);
  readonly error = signal<Error | null>(null);

  queryParams = signal<Params | undefined>(undefined);

  async getWithQuery(queryParams: Params): Promise<boolean> {
    this.queryParams.set(queryParams);
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        const response = await firstValueFrom(this.api.getWithQuery(queryParams));
        const subjects = (response.body ?? []).map((dto: SubjectDto) => this.toAppModel(dto));
        const total = response.headers.get('X-Total-Count');
        this.items.set(subjects);
        this.total.set(total ? +total : 0);
      },
    });
  }

  async getByKey(key: string): Promise<boolean> {
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        const dto = await firstValueFrom(this.api.getByKey(key));
        const entity = this.toAppModel(dto);
        this.selected.set(entity);
      },
    });
  }

  async add(entity: CreateSubjectDto): Promise<boolean> {
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        await firstValueFrom(this.api.add(entity));
        await this.getWithQuery(this.queryParams()!);
      }
    });
  }

  async update(entity: UpdateSubjectDto): Promise<boolean> {
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        const updatedEntity = await firstValueFrom(this.api.update(entity));
        await this.getWithQuery(this.queryParams()!);
        this.selected.set(this.toAppModel(updatedEntity));
      }
    });
  }

  async delete(entity: AppSubject): Promise<boolean> {
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        await firstValueFrom(this.api.delete(entity));
        await this.getWithQuery(this.queryParams()!);
        this.selected.set(null);
      }
    });
  }

  toAppModel(entity: SubjectDto): AppSubject {
    return {
      ...entity,
      name: entity.login,
      search: `${entity.login}`,
    };
  }
}

