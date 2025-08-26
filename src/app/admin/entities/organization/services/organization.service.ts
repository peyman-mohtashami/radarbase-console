import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

// import { BaseEntityService } from '../../../services/base.entity.service';
import {AppOrganization} from "../models/organization";
// import {Observable} from "rxjs";
// import {map, switchMap} from "rxjs/operators";
import {RadarOrganization} from '../../../../shared/models/radar-organization.model';
import {EntityService} from '../../../services/entity.service';

@Injectable({providedIn: 'root'})
export class OrganizationService extends EntityService<
  RadarOrganization,
  AppOrganization
> {
  public override resourceUrl = 'api/organizations';

  constructor(http: HttpClient) {
    super(http, 'api/organizations');
  }

  override toAppModel(entity: RadarOrganization): AppOrganization {
    return {
      ...entity,
      //name: entity.sourceDataName
    };
  }

  // override toRadarModel(entity: AppSourceData): RadarSourceData {
  //   return { ...entity };
  // }

  // override delete(key: string): Observable<string | number> {
  //   return this.getByKey(key).pipe(
  //     switchMap((entity)=>
  //       this.update({...entity, name: `@DEL_${entity.name}`}).pipe(
  //         map(o => o.name)
  //       )
  //     ),
  //   );
  // }
}

// @Injectable({providedIn: 'root'})
// export class OrganizationService extends BaseEntityService<
//   RadarOrganization,
//   AppOrganization
// > {
//   public override resourceUrl = 'api/organizations';
//
//   constructor(http: HttpClient) {
//     super(http);
//   }
//
//   override toAppModel(entity: RadarOrganization): AppOrganization {
//     return {
//       ...entity,
//       //name: entity.sourceDataName
//     };
//   }
//
//   // override toRadarModel(entity: AppSourceData): RadarSourceData {
//   //   return { ...entity };
//   // }
//
//   override delete(key: string): Observable<string | number> {
//     return this.getByKey(key).pipe(
//       switchMap((entity)=>
//         this.update({...entity, name: `@DEL_${entity.name}`}).pipe(
//           map(o => o.name)
//         )
//       ),
//     );
//   }
// }
