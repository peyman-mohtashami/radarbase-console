import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from 'rxjs';
import {AppUser} from "../models/user";
import {PermissionService} from './permission.service';
import {map} from 'rxjs/operators';
import {user} from '../../../../core/auth/store/auth.selectors';

@Injectable({ providedIn: 'root' })
export class PermissionsResolver implements Resolve<AppUser[]> {
  private entityService = inject(PermissionService);

  resolve(
    // route: ActivatedRouteSnapshot,
  ): Observable<AppUser[]> | Promise<AppUser[]> | AppUser[] {
    return this.entityService.getAll()
    // console.log('Class: PermissionsResolver, Function: resolve, Line 15 ' , );
    // const path = route.parent?.parent?.parent?.routeConfig?.path;
    // console.log('Class: PermissionsResolver, Function: resolve, Line 17 path' , path);
    // if (path === 'organizations') {
    //   return this.entityService.getAll().pipe(
    //     map(users => {
    //       return users.filter(user => {
    //         if (user._roles?._sysAdmin) {
    //           return true
    //         }
    //         if (user._roles?._organizationAdmin) {
    //           const organization = user._roles?._organizations?.filter(o => o.name === route.parent?.parent?.params['id'])?.[0];
    //           return !!organization;
    //         }
    //         return false;
    //       });
    //     })
    //   );
    // } else if (path === 'projects') {
    //   console.log('Class: PermissionsResolver, Function: resolve, Line 32 AAAA ' , );
    //   return this.entityService.getAll().pipe(
    //     map(users => {
    //       console.log('Class: PermissionsResolver, Function: , Line 36 ' , route.parent?.parent?.params['id']);
    //       console.log('Class: PermissionsResolver, Function: , Line 38 users' , users);
    //       const t =  users.filter(user => {
    //         console.log('Class: PermissionsResolver, Function: , Line 39 ' , );
    //         if (user._roles?._sysAdmin) {
    //           return true
    //         }
    //         // if (user._roles?._organizationAdmin) {
    //         //   const organization = user._roles?._organizations?.filter(o => o.name === route.parent?.parent?.params['id'])
    //         //   return !!organization;
    //         // }
    //         if (user._roles?._projectAdmin) {
    //           const project = user._roles?._projects?.filter(p => p.name === route.parent?.parent?.params['id'])?.[0];
    //           console.log('Class: PermissionsResolver, Function: , Line 48 project' , project);
    //           return !!project;
    //         }
    //         return false;
    //       });
    //       console.log('Class: PermissionsResolver, Function: , Line 49 t' , t);
    //       return t;
    //     })
    //   );
    // } else {
    //   return this.entityService.getWithQuery(route.queryParams);
    // }
  }
}
