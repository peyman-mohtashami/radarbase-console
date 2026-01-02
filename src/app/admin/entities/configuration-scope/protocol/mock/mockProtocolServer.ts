// import {Observable, of} from "rxjs";
// import {RadarConfigBundle} from "../../config/models/config";
// import {DynaMORE} from "./protocols/DynaMORE/protocol";
// import {NSHD} from "./protocols/NSHD/protocol";
//
// export class MockProtocolServer {
//   static get(url: string): Observable<RadarConfigBundle>{
//     const segments = url.split("/");
//     let scope = 'global';
//     if (segments.find(segment => segment === 'projects')) scope = segments[segments.indexOf('projects') + 1];
//
//     if (scope === 'global') return of(globalRadarProtocolBundle);
//     return of(radarRadarProtocolBundle);
//   }
// }
//
// const globalProtocols = NSHD;
// const radarProtocols = DynaMORE;
//
// export const globalRadarProtocolBundle: RadarConfigBundle = {
//   "clientId": "protocol-service",
//   "scope": "global",
//   "config": [
//     {
//       "name": "main",
//       "value": JSON.stringify(globalProtocols)
//     }
//   ]
// }
//
// export const radarRadarProtocolBundle: RadarConfigBundle = {
//   "clientId": "protocol-service",
//   "scope": "project.radar",
//   "config": [
//     {
//       "name": "main",
//       "value": JSON.stringify(radarProtocols)
//     }
//   ],
//   "defaults": [
//     {
//       "name": "main",
//       "value": JSON.stringify(globalProtocols),
//       "scope": "global"
//     }
//   ]
// }
//
// //----------------
//
// // export const sub1Protocols: RadarConfigBundle = {
// // }
// //
// // const data = {
// //   "clientId": "protocol-service",
// //   "scope": "global",
// //   "config": [
// //     {
// //       "name": "main",
// //       "value": {
// //         protocols: [
// //           {
// //             _search: "questionnaire_100",
// //             languages:[
// //               {id: "nl",_name:"Dutch",nativeName:"Nederlands, Vlaams"},
// //               {"id":"en","_name":"English","nativeName":"English"}
// //             ],
// //             "onDemand":false,
// //             "name":"questionnaire_100",
// //             "showIntroduction":false,
// //             "showInCalendar":true,
// //             "isDemo":false,
// //             "questionnaire":{
// //               "name":"",
// //               "avsc":"questionnaire"
// //             },
// //             "startText":{
// //               "en":"Can please, please, please fill out this questionnaire?",
// //               "nl":""
// //             },
// //             "estimatedCompletionTime":1,
// //             "protocol":{
// //               "repeatProtocol":{
// //                 "unit":"week",
// //                 "amount":2
// //               },
// //               "repeatQuestionnaire":{
// //                 "unit":"min",
// //                 "unitsFromZero":[600,1800,null]
// //               },
// //               "completionWindow":{
// //                 "unit":"min",
// //                 "amount":1
// //               },
// //               "notification":{
// //                 "title":{"en":"You!","nl":""},
// //                 "text":{"en":"","nl":""}
// //               },
// //               "reminders":{
// //                 "unit":"min","amount":1,"repeat":5
// //               }
// //             },
// //             "order":null,
// //             "endText":{"en":"","nl":""},
// //             "warn":{"en":"","nl":""}
// //           },
// //           {
// //             "_search":"q1",
// //             "languages":[{"id":"en","_name":"English","nativeName":"English"}],
// //             "onDemand":false,
// //             "name":"q1",
// //             "showIntroduction":false,
// //             "showInCalendar":false,
// //             "isDemo":false,
// //             "questionnaire":{"name":"","avsc":"questionnaire"},
// //             "protocol":{"repeatProtocol":{"unit":"month","amount":6},"repeatQuestionnaire":{"unit":"min","unitsFromZero":[600]},
// //               "completionWindow":{"unit":"year","amount":5},"notification":{"title":{},"text":{}},
// //               "reminders":{"unit":"","amount":null,"repeat":0}},
// //             "order":null,"estimatedCompletionTime":null,"startText":{},"endText":{},"warn":{}
// //           }
// //         ]
// //       }
// //     }
// //   ]
// // }
// //
// // const f = {
// //   "clientId": "pRMT",
// //   "scope": "project.STAGING_PROJECT",
// //   "config": [],
// //   "defaults": [
// //     {
// //       "name": "test",
// //       "value": "test",
// //       "scope": "global"
// //     }
// //   ]
// // }
