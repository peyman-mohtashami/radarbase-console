// import {inject, Injectable} from '@angular/core';
// import {
//   Resolve,
//   ActivatedRouteSnapshot,
// } from '@angular/router';
// import { Observable } from 'rxjs';
//
// import { ConfigService } from './config.service';
// import {AppConfig} from "../models/config";
//
// @Injectable({ providedIn: 'root' })
// export class ConfigResolver implements Resolve<AppConfig> {
//   private entityService = inject(ConfigService);
//
//   resolve(
//     route: ActivatedRouteSnapshot,
//   ): Observable<AppConfig> | Promise<AppConfig> | AppConfig {
//     return this.entityService.getByKey(route.params['id']);
//   }
// }
