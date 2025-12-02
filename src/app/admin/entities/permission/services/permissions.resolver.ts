import {inject, Injectable} from '@angular/core';
import {Resolve,} from '@angular/router';
import {Observable} from 'rxjs';
import {AppUser} from "../../user/models/user";
import {UserService} from "../../user/services/user.service";

@Injectable({providedIn: 'root'})
export class PermissionsResolver implements Resolve<AppUser[]> {
  private entityService = inject(UserService);

  resolve(): Observable<AppUser[]> {
    return this.entityService.getAll();
  }
}
