import {inject, Injectable} from '@angular/core';
import {Resolve,} from '@angular/router';
import {Observable} from 'rxjs';
import {AppUser} from "../models/user";
import {PermissionService} from './permission.service';

@Injectable({ providedIn: 'root' })
export class PermissionsResolver implements Resolve<AppUser[]> {
  private entityService = inject(PermissionService);

  resolve(): Observable<AppUser[]> | Promise<AppUser[]> | AppUser[] {
    return this.entityService.getAll();
  }
}
