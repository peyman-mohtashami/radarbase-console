// import { HttpUrlGenerator } from '@ngrx/data';
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
//
// import { BaseDataService } from '../../../../services/base.data.service';
// import { AppSourceType } from "../../models/source-type";
// import { RadarSourceType } from "@rb/models";
//
// @Injectable()
// export class SourceTypeDataService extends BaseDataService<
//   RadarSourceType,
//   AppSourceType
// > {
//   override resourceUrl = 'api/source-types';
//
//   constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
//     super('RadarSourceType', http, httpUrlGenerator);
//   }
//
//   //!
//   override toAppModel(entity: RadarSourceType): AppSourceType {
//     return {
//       ...entity,
//       //!
//       id: entity.id,
//       name: `${entity.producer}/${entity.model}/${entity.catalogVersion}`,
//     };
//   }
//   //!
//   override toRadarModel(entity: AppSourceType): RadarSourceType {
//     return { ...entity };
//   }
// }
