// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from "rxjs";
// import {map, shareReplay} from 'rxjs/operators';
//
// import {RadarSourceClient} from "../models/radar-entities.model";
//
//
// @Injectable()
// export class SourceClientService {
//
//   constructor(private http: HttpClient) {}
//
//   getSourceClients(): Observable<RadarSourceClient[]> {
//     return this.http.get<{sourceClients: RadarSourceClient[]}>(
//       'authorizer-api/source-clients'
//     ).pipe(
//       map(result => result.sourceClients),
//       shareReplay()
//     );
//   }
// }
