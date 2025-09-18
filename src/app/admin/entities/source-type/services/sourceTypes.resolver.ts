import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AppSourceType } from "../models/source-type";
import {SourceTypeService} from "./sourceType.service";

@Injectable({ providedIn: 'root' })
export class SourceTypesResolver implements Resolve<AppSourceType[]> {
  constructor(private entityService: SourceTypeService) {}

  resolve():
    | Observable<AppSourceType[]>
    | Promise<AppSourceType[]>
    | AppSourceType[] {
    return this.entityService.getAll();
  }
}
