import {inject, Injectable, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Params} from '@angular/router';
import {execute} from '../../../shared/utils/store-helpers';
import {AppSourceData, CreateSourceDataDto, SourceDataDto, UpdateSourceDataDto} from '../models/source-data';
import {SourceDataService} from './source-data.service';

@Injectable({providedIn: 'root'})
export class SourceDataStore {
  private api = inject(SourceDataService);
  // private configService = inject(SubjectConfigService);

  readonly items = signal<AppSourceData[]>([]);
  readonly selected = signal<AppSourceData | null>(null);
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
        const subjects = (response.body ?? []).map((dto: SourceDataDto) => this.toAppModel(dto));
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

  async add(entity: CreateSourceDataDto): Promise<boolean> {
    return await execute({
      loading: this.loading,
      error: this.error,
      action: async () => {
        await firstValueFrom(this.api.add(entity));
        await this.getWithQuery(this.queryParams()!);
      }
    });
  }

  async update(entity: UpdateSourceDataDto): Promise<boolean> {
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

  async delete(entity: AppSourceData): Promise<boolean> {
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

  toAppModel(entity: SourceDataDto): AppSourceData {
    return {
      ...entity,
      name: entity.sourceDataName,
      search: `${entity.sourceDataName}`,
    };
  }
}

