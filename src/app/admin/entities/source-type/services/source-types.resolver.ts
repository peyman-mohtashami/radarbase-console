import {inject, Injectable} from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AppSourceType } from "../models/source-type";
import {SourceTypeService} from './source-type.service';

@Injectable({ providedIn: 'root' })
export class SourceTypesResolver implements Resolve<AppSourceType[]> {
  private entityService = inject(SourceTypeService);

  resolve():
    | Observable<AppSourceType[]>
    | Promise<AppSourceType[]>
    | AppSourceType[] {
    return this.entityService.getAll();
  }
}
