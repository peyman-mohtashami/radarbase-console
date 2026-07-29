import {inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Params} from '@angular/router';
import {execute} from '../../../shared/utils/store-helpers';
import {SourceService} from './source.service';
import {AppSource, CreateSourceDto, SourceDto, UpdateSourceDto} from '../models/source';

@Injectable({providedIn: 'root'})
export class SourceStore {
  private api = inject(SourceService);

  readonly items = signal<AppSource[]>([]);
  readonly selected = signal<AppSource | null>(null);
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
        const subjects = (response.body ?? []).map((dto: SourceDto) => this.toAppModel(dto));
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

  async add(entity: CreateSourceDto): Promise<boolean> {
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        await firstValueFrom(this.api.add(entity));
        await this.getWithQuery(this.queryParams()!);
      }
    });
  }

  async update(entity: UpdateSourceDto): Promise<boolean> {
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

  async delete(entity: AppSource): Promise<boolean> {
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

  toAppModel(entity: SourceDto): AppSource {
    return {
      ...entity,
      name: entity.sourceName,
      search: `${entity.sourceName}`,
    };
  }
}

