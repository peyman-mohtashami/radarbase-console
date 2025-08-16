// import { HttpUrlGenerator } from '@ngrx/data';
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
//
// import { RadarProject } from "@rb/models";
// import { BaseDataService } from '../../../../services/base.data.service';
// import { AppProject } from "../../models/project";
//
// @Injectable()
// export class ProjectDataService extends BaseDataService<
//   RadarProject,
//   AppProject
// > {
//   override resourceUrl = 'api/projects';
//
//   constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
//     super('RadarProject', http, httpUrlGenerator);
//   }
//
//   override toAppModel(entity: RadarProject): AppProject {
//     return { ...entity, name: entity.projectName };
//   }
//   override toRadarModel(entity: AppProject): RadarProject {
//     return { ...entity };
//   }
// }
