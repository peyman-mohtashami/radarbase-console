import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from "rxjs";

import {
  getGlobalConfiguration,
  getProjectConfiguration, getSubjectConfiguration, postGlobalConfiguration, postProjectConfiguration
} from "../mock/mock-configs";
import { map } from "rxjs/operators";
import {AppConfig, RadarConfig, RadarConfigBundle} from "../models/config";
import {environment} from "../../../../../environments/environment";

export const RESERVED_CONFIG_NAMES = [
  'measurements',
  'feedbackConfig',
  'protocols',
  'questionnaires',
];

@Injectable({ providedIn: 'root' })
export class ConfigService {

  private http = inject(HttpClient);

  total = 0;

  toAppModel(entity: RadarConfig): AppConfig {
    const generateShortId = () => Math.random().toString(36).substring(2, 10); // 8 chars like "f7ight4w"
    return {
      ...entity,
      // id: generateShortId(),
      id: entity.name,
      _name: entity.name,
      _search: entity.name
    };
  }

  toRadarModel(entity: AppConfig): RadarConfig {
    return {
      ...entity,
    };
  }

  getAll(clientId: string, projectId?: string, subjectId?: string): Observable<AppConfig[]> {
    if (!environment.localDeployment) { // server side config
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
      // const baseUrl = 'http://localhost/appconfig/api';
      const appConfigBaseUrl =
        typeof window !== 'undefined'
          ? `${window.location.origin}/appconfig/api`
          : '/appconfig/api'; // fallback for SSR or tests

      let urlSegment = `global`;
      if (projectId) {
        urlSegment = `projects/${projectId}`;
        if (subjectId) {
          urlSegment = `${urlSegment}/users/${subjectId}`;
        }
      }

      return this.http.get<RadarConfigBundle>(`${appConfigBaseUrl}/${urlSegment}/config/${clientId}`, {headers}).pipe(
        map((configBundle) =>
          this.getConfigsFromConfigBundle(configBundle).map((config) => this.toAppModel(config)),
        ));
    } else {
      let radarConfigBundle;
      if (subjectId && projectId) {
        radarConfigBundle = getSubjectConfiguration(clientId, projectId, subjectId);
      } else {
        if (projectId) {
          radarConfigBundle = getProjectConfiguration(clientId, projectId);
        } else {
          radarConfigBundle = getGlobalConfiguration(clientId);
        }
      }
      console.log('Class: ConfigService, Function: getAll, Line 71 radarConfigBundle', radarConfigBundle);
      console.log('Class: ConfigService, Function: getAll, Line 71 radarConfigBundle.config', radarConfigBundle.config);
      return (
        of(radarConfigBundle).pipe(
          map((configBundle) => {
            return this.getConfigsFromConfigBundle(configBundle)
          }),
          map((configs) => {
            return configs.map((config) => {
              return this.toAppModel(config)
            })
          }),
        )
      );
    }
  }

  // add(entity: AppConfig): Observable<AppConfig> {
  //   const e = { ...entity, id: entity.name, changed: true };
  //   this.entities.push(e);
  //   this.entitiesChanged();
  //   this.updated = e['id'];
  //   setTimeout(() => {
  //     this.updated = undefined;
  //   }, 1000);
  //   // this.entitiesToShow.push(e);
  //   this.checkIfChangeHappened(true);
  //   return of(e);
  // }
  //
  // override delete(entity: AppConfig): Observable<string | number> {
  //   this.entities = this.entities.filter((e) => e.name !== entity.name);
  //   this.entitiesChanged();
  //   this.checkIfChangeHappened(true);
  //   return of(entity.name);
  // }
  //
  // override update(entity: AppConfig): Observable<AppConfig> {
  //   console.log('Class: ConfigsPageComponent, Function: update, Line 188 entity' , entity);
  //   const itemIndex = this.entities.findIndex(
  //     (item) => {
  //       console.log('Class: ConfigsPageComponent, Function: , Line 191 item' , item);
  //       return item.id == entity.id
  //     }
  //   );
  //   console.log('Class: ConfigsPageComponent, Function: update, Line 195 itemIndex' , itemIndex);
  //   const e = { ...entity, changed: true };
  //   this.entities[itemIndex] = e;
  //   console.log('Class: ConfigsPageComponent, Function: update, Line 194 this.entities' , this.entities);
  //   this.entitiesChanged();
  //   this.updated = entity['id'];
  //   setTimeout(() => {
  //     this.updated = undefined;
  //   }, 1000);
  //   this.checkIfChangeHappened(true);
  //   return of(e);
  // }

  // getWithQuery(clientId: string, projectId?: string): Observable<AppConfig[]> {
  //   // const clientId = (queryParams as Params)?.['id'];
  //   // const projectId = (queryParams as Params)?.['projectId'];
  //   let radarConfigBundle;
  //   console.log('Class: ConfigService, Function: getWithQuery, Line 73 clientId, projectId' , clientId, projectId);
  //   if (projectId) {
  //     radarConfigBundle = getProjectConfiguration(clientId, projectId);
  //   } else {
  //     radarConfigBundle = getGlobalConfiguration(clientId);
  //   }
  //   console.log('Class: ConfigService, Function: getWithQuery, Line 71 radarConfigBundle' , radarConfigBundle);
  //   return (
  //     of(radarConfigBundle).pipe(
  //       map((configBundle) => {
  //         console.log('Class: ConfigService, Function: , Line 75 configBundle' , configBundle);
  //         return this.getConfigsFromConfigBundle(configBundle)
  //       }),
  //       map((configs) => {
  //         console.log('Class: ConfigService, Function: , Line 79' , configs.map((config) => this.toAppModel(config)));
  //         return configs.map((config) => {
  //           console.log('Class: ConfigService, Function: config, Line 89 config' , config);
  //           return this.toAppModel(config)
  //         })
  //       }),
  //       // map((configs) => {
  //       //   console.log('Class: ConfigService, Function: , Line 93' , this.filterConfigsByCategory(configs, category));
  //       //   return this.filterConfigsByCategory(configs, category)
  //       // })
  //     )
  //   );
  // }

  // override getWithQuery(queryParams?: Params | string): Observable<AppConfig[]> {
  //   return getGlobalConfiguration(queryParams?.['clientId']);
  //
  //
  //   console.log("*** ", queryParams)
  //   const category = (queryParams as Params)?.['category'] ?? 'general';
  //   console.log("*** ", category)
  //   console.log("*** ", this.client, this.project)
  //   if (this.client) {
  //     if (this.project) {
  //       this.entities = getProjectConfiguration(this.client.clientId.toString(), this.project.projectName.toString());
  //     } else {
  //       this.entities = getGlobalConfiguration(this.client.clientId.toString());
  //     }
  //     console.log("*** ", this.entities)
  //
  //     return (
  //       of(this.entities).pipe(
  //         map((configBundle) => {
  //           console.log('Class: ConfigService, Function: , Line 85 configBundle' , configBundle);
  //           return this.getConfigsFromConfigBundle(configBundle)
  //         }),
  //         map((configs) => {
  //           console.log('Class: ConfigService, Function: , Line 89' , configs.map((config) => this.toAppModel(config)));
  //           return configs.map((config) => this.toAppModel(config))
  //         }),
  //         map((configs) => {
  //           console.log('Class: ConfigService, Function: , Line 93' , this.filterConfigsByCategory(configs, category));
  //           return this.filterConfigsByCategory(configs, category)
  //         })
  //       )
  //     );
  //   }
  //   return of([]);
  // }

  // filterConfigsByCategory(configs: AppConfig[], category?: string): AppConfig[] {
  //   if (category === 'general') {
  //     return configs.filter(
  //       (config) => !RESERVED_CONFIG_NAMES.includes(config.name)
  //     );
  //   } else {
  //     // console.log('Class: ConfigService, Function: filterConfigsByCategory, Line 98 ', category);
  //     return configs.filter((config) => {
  //       // console.log('Class: ConfigService, Function: , Line 100 config.name' , config.name);
  //       return config.name === category
  //     });
  //   }
  // }

/*
{
  "clientId": "aRMT",
  "scope": "user.31be62f4-e28b-424e-8401-e4d81010db4f",
  "config": [
    {
      "name": "user",
      "value": "1"
    },
    {
      "name": "newVal",
      "value": "newVal"
    },
    {
      "name": "test2",
      "value": "test25-26-27"
    },
    {
      "name": "test",
      "value": "test"
    },
    {
      "name": "t1",
      "value": "1"
    },
    {
      "name": "yyy",
      "value": "yyy"
    }
  ],
  "defaults": [
    {
      "name": "newVal",
      "value": "newVal",
      "scope": "project.demo"
    },
    {
      "name": "test2",
      "value": "test25",
      "scope": "project.demo"
    },
    {
      "name": "test",
      "value": "test12",
      "scope": "project.demo"
    },
    {
      "name": "t1",
      "value": "1",
      "scope": "project.demo"
    },
    {
      "name": "yyy",
      "value": "yyy",
      "scope": "project.demo"
    }
  ]
}
*/
  /*
{
  "clientId": "aRMT",
  "scope": "project.demo",
  "config": [
  {
    "name": "newVal",
    "value": "newVal"
  },
  {
    "name": "test2",
    "value": "test25"
  },
  {
    "name": "test",
    "value": "test12"
  },
  {
    "name": "t1",
    "value": "1"
  },
  {
    "name": "yyy",
    "value": "yyy"
  }
],
  "defaults": [
  {
    "name": "test2",
    "value": "test25",
    "scope": "global"
  },
  {
    "name": "test",
    "value": "test",
    "scope": "global"
  },
  {
    "name": "t1",
    "value": "1",
    "scope": "global"
  },
  {
    "name": "yyy",
    "value": "yyy",
    "scope": "global"
  }
]
}
*/

  getConfigsFromConfigBundle(configBundle: RadarConfigBundle): RadarConfig[] {
    console.log('Class: ConfigService, Function: getConfigsFromConfigBundle, Line 117 configBundle' , configBundle);
    const mergedDefaultsWithConfigs = configBundle.defaults?.map((defaultConfig) => {
      let _config: RadarConfig = {
        name: defaultConfig.name,
        default: defaultConfig.value,
        value: defaultConfig.value,
        scope: defaultConfig.scope,
      };
      configBundle.config.forEach((config, index, arr) => {
        if (defaultConfig.name === config.name) {
          _config = {
            name: defaultConfig.name,
            default: defaultConfig.value,
            value: config.value,
            scope: defaultConfig.scope,
          };
          arr.splice(index, 1);
        }
      });
      return _config;
    });

    let _configs = [...configBundle.config];
    if (mergedDefaultsWithConfigs) {
      _configs = [..._configs, ...mergedDefaultsWithConfigs];
    }
    return _configs;
  }

  publish1(configs: AppConfig[], clientId: string, projectId?: string, subjectId?: string): Observable<AppConfig[]>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    const appConfigBaseUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}/appconfig/api`
        : '/appconfig/api'; // fallback for SSR or tests
    // const baseUrl = 'http://localhost/appconfig/api';

    let urlSegment = `global`;
    if (projectId) {
      urlSegment = `projects/${projectId}`;
      if (subjectId) {
        urlSegment = `${urlSegment}/users/${subjectId}`;
      }
    }

    return this.http.post<RadarConfigBundle>(`${appConfigBaseUrl}/${urlSegment}/config/${clientId}`,{config: configs}, {headers}).pipe(
      map((configBundle) => this.getConfigsFromConfigBundle(configBundle)),
      map((configs) => configs.map((config) => this.toAppModel(config))),
      // map((configs) => this.filterConfigsByCategory(configs))
    )

    // let configBundle: RadarConfigBundle;
    // if (this.client) {
    //   if (this.project) {
    //     configBundle = postProjectConfiguration(this.client.clientId, this.project.projectName, configs)
    //   } else {
    //     configBundle = postGlobalConfiguration(this.client.clientId, configs)
    //   }
    //   return (
    //     of(configBundle).pipe(
    //       map((configBundle) => this.getConfigsFromConfigBundle(configBundle)),
    //       map((configs) => configs.map((config) => this.toAppModel(config))),
    //       map((configs) => this.filterConfigsByCategory(configs))
    //     )
    //   );
    // }
    // return of([]);
  }
}
/*
-----------
-----
  http://localhost/appconfig/api/projects
{
  "projects": [
  {
    "projectName": "demo",
    "location": "",
    "organization": "main",
    "description": ""
  }
]
}
-------
//     http://localhost/appconfig/api/global/config/ManagementPortalapp
//     {
//       "clientId": "ManagementPortalapp",
//       "scope": "global",
//       "config": [
//       {
//         "name": "config",
//         "value": "{   \"theme\": {     \"__light\": {       \"primary\": \"#e91e63\",       \"on-primary\": \"#ffffff\",       \"accent\": \"#673ab7\",       \"on-accent\": \"#ffffff\",       \"tertiary\": \"#673ab7\",       \"on-tertiary\": \"#ffffff\"     },     \"___light\": {       \"primary\": \"#004F6E\",       \"on-primary\": \"#ffffff\",       \"accent\": \"#22A2C9\",       \"on-accent\": \"#ffffff\",       \"tertiary\": \"#4F6E00\",       \"on-tertiary\": \"#ffffff\"     },     \"light\": {       \"primary\": \"#004F6E\",       \"on-primary\": \"#ffffff\",       \"accent\": \"#22A2C9\",       \"on-accent\": \"#ffffff\",       \"tertiary\": \"#004F6E\",       \"on-tertiary\": \"#ffffff\"     },     \"_light\": {       \"primary\": \"#22A2C9\",       \"on-primary\": \"#ffffff\",       \"accent\": \"#004F6E\",       \"on-accent\": \"#ffffff\",       \"tertiary\": \"#4F6E00\",       \"on-tertiary\": \"#ffffff\"     },     \"_dark\": {       \"primary\": \"#22A2C9\",       \"on-primary\": \"#ffffff\",       \"accent\": \"#22A2C9\",       \"on-accent\": \"#ffffff\",       \"tertiary\": \"#004F6E\",       \"on-tertiary\": \"#ffffff\"     },     \"dark\": {       \"primary\": \"#22A2C9\",       \"on-primary\": \"#ffffff\",       \"accent\": \"#22A2C9\",       \"on-accent\": \"#ffffff\",       \"tertiary\": \"#004F6E\",       \"on-tertiary\": \"#ffffff\"     },     \"colorHints\": {       \"amber\": \"#ffc107\",       \"deepPurple\": \"#673ab7\",       \"pink\": \"#ff4081\",       \"indigo\": \"#3f51b5\",       \"blueGrey\": \"#607d8b\",       \"pinkDark\": \"#e91e63\",       \"green\": \"#4caf50\",       \"purple\": \"#9c27b0\",       \"rb-dark-blue\": \"#004F6E\",       \"rb-light-blue\": \"#22A2C9\",       \"rb-gray\": \"#858785\"     }   },   \"translationsBaseUrl\": \"/assets/i18n/\",   \"locale\": [     {       \"code\": \"en\",       \"locale\": \"en-GB\",       \"label\": \"English\",       \"shortLabel\": \"EN\",       \"dateFormat\": \"dd/mm/yyyy\"     },     {       \"code\": \"nl\",       \"locale\": \"nl-NL\",       \"label\": \"Nederlands\",       \"dateFormat\": \"dd-mm-yyyy\"     }   ],   \"title\": \"RADAR-base Console\",   \"logo\": \"assets/images/rb-logo-full-white.svg\",   \"logo2\": \"https://www.thehyve.nl/static/img/logos/the-hyve_logo.png\",   \"branding\": {     \"title\": \"Welcome to RADAR-base Console\",     \"description\": \"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\"   },   \"entities\": {     \"organization\": {       \"fields\": {         \"location\": true,         \"description\": true,         \"projects\": true       }     },     \"project\": {       \"fields\": {         \"location\": true,         \"description\": true,         \"startDate\": true,         \"endDate\": true,         \"projectStatus\": true,         \"sourceTypes\": true,         \"humanReadableProjectName\": true,         \"attributes\": true,         \"attributes.Privacy-policy-url\": true,         \"attributes.Work-package\": true,         \"attributes.Phase\": true,         \"attributes.External-project-url\": true,         \"attributes.External-project-id\": true       }     },     \"client\": {       \"fields\": {         \"resourceIds\": true,         \"authorizedGrantTypes\": true,         \"dynamic_registration\": true,         \"accessTokenValiditySeconds\": true,         \"refreshTokenValiditySeconds\": true,         \"scope\": true,         \"autoApproveScopes\": true,         \"registeredRedirectUri\": true       }     },     \"subject\": {       \"fields\": {         \"personName\": true,         \"externalId\": true,         \"externalLink\": true,         \"dateOfBirth\": true,         \"group\": true,         \"status\": true,         \"sources\": true,         \"attributes\": true,         \"attributes.participant_group\": true,         \"attributes.humanReadableIdentifier\": true,         \"enrollmentDate\": true,         \"createdBy\": true,         \"createdDate\": true,         \"lastModifiedBy\": true,         \"lastModifiedDate\": true       },       \"extraFields\": [         {\"name\": \"email\", \"type\": \"text\", \"validators\": {}},         {\"name\": \"lastInjectionDate\", \"type\": \"date\", \"validators\": {}, \"minDate\": \"01-01-2023\", \"maxDate\": \"01-01-2026\"}       ]     },     \"_subject\": {       \"fields\": {         \"personName\": false,         \"externalId\": true,         \"externalLink\": false,         \"dateOfBirth\": false,         \"attributes\": true,         \"group\": false       },       \"extraFields\": [         {\"name\": \"email\", \"type\": \"text\", \"validators\": {}},         {\"name\": \"lastInjectionDate\", \"type\": \"date\", \"validators\": {}, \"minDate\": \"01-01-2023\", \"maxDate\": \"01-01-2026\"}       ]     },     \"__subject\": {       \"fields\": {         \"personName\": {\"enabled\": false},         \"externalId\": {\"enabled\": true, \"required\": true},         \"externalLink\": {\"enabled\": false},         \"dateOfBirth\": {\"enabled\": false}       },       \"extraFields\": {         \"email\": {           \"type\": \"text\",           \"required\": true,           \"validators\": {}         },         \"lastInjectionDate\": {           \"type\": \"date\",           \"required\": false,           \"validators\": {},           \"minDate\": \"01-01-2023\",           \"maxDate\": \"01-01-2026\"         }       }     },     \"___subject\": {       \"fields\": [         {\"name\": \"personName\", \"enabled\": false},         {\"name\": \"externalId\", \"enabled\": false, \"required\": true},         {\"name\": \"externalLink\", \"enabled\": false},         {\"name\": \"dateOfBirth\", \"enabled\": false},         {\"name\": \"attributes.humanReadableIdentifier\", \"enabled\": false},         {\"name\": \"attributes.participant_group\", \"enabled\": false}       ],       \"extraFields\": [         {\"name\": \"email\", \"type\": \"text\", \"required\": true, \"validators\": {}},         {\"name\": \"lastInjectionDate\", \"type\": \"date\", \"required\": false, \"validators\": {}, \"minDate\": \"01-01-2023\", \"maxDate\": \"01-01-2026\"}       ]     },     \"user\": {       \"fields\": {         \"firstName\": true,         \"lastName\": true,         \"createdBy\": true,         \"createdDate\": true,         \"lastModifiedBy\": true,         \"lastModifiedDate\": true,         \"langKey\": false       }     },     \"_project\": {       \"fields\": [         {\"name\": \"humanReadableProjectName\", \"enabled\": false},         {\"name\": \"startDate\", \"enabled\": false},         {\"name\": \"endDate\", \"enabled\": false},         {\"name\": \"projectStatus\", \"enabled\": false},         {\"name\": \"organizationName\", \"enabled\": false},         {\"name\": \"attributes\", \"enabled\": false},         {\"name\": \"attributes.Work-package\", \"enabled\": false},         {\"name\": \"attributes.Phase\", \"enabled\": false},         {\"name\": \"attributes.External-project-url\", \"enabled\": false},         {\"name\": \"attributes.External-project-id\", \"enabled\": false},         {\"name\": \"attributes.Privacy-policy-url\", \"enabled\": false}       ],       \"extraFields\": [         {\"name\": \"midDate\", \"type\": \"date\", \"validators\": {}, \"minDate\": \"01-01-2023\", \"maxDate\": \"01-01-2026\"},         {\"name\": \"projectState\", \"type\": \"simpleSelect\", \"validators\": {}, \"options\": [           {\"value\": \"active\", \"label\": \"Active\"},           {\"value\": \"inactive\", \"label\": \"Inactive\"},           {\"value\": \"archived\", \"label\": \"Archived\"}         ]}       ]     },     \"sourceType\": {       \"fields\": {         \"description\": true,         \"appProvider\": true,         \"assessmentType\": true,         \"name\": true,         \"sourceTypeScope\": true,         \"canRegisterDynamically\": true,         \"sourceData\": true       }     },     \"sourceData\": {       \"fields\": {         \"topic\": true,         \"processingState\": true,         \"keySchema\": true,         \"valueSchema\": true,         \"frequency\": true,         \"unit\": true       }     },     \"source\": {       \"fields\": {         \"expectedSourceName\": true,         \"attributes\": true,         \"attributes.External-identifier\": true       }     }   } }"
//       }
//     ]
//     }
// //----------
//     http://localhost/appconfig/api/global/config/aRMT
//     {
//       "clientId": "aRMT",
//       "scope": "global",
//       "config": []
//     }
----------
  http://localhost/appconfig/api/projects/demo/config/pRMT
{
  "clientId": "pRMT",
  "scope": "project.demo",
  "config": [],
  "defaults": [
  {
    "name": "test",
    "value": "1",
    "scope": "global"
  }
]
}

----------
POST  http://localhost/appconfig/api/projects/demo/config/pRMT
{
  "config": [
  {
    "name": "test",
    "value": "5"
  }
]
}
+++
  {
    "clientId": "pRMT",
    "scope": "project.demo",
    "config": [
      {
        "name": "test",
        "value": "5"
      }
    ],
    "defaults": [
      {
        "name": "test",
        "value": "1",
        "scope": "global"
      }
    ]
  }
  ------
    POST http://localhost/appconfig/api/projects/demo/config/pRMT
{
  "config": [
  {
    "name": "test",
    "value": "5"
  },
  {
    "name": "projectlevel",
    "value": "10"
  }
]
}
+++
  {
    "clientId": "pRMT",
    "scope": "project.demo",
    "config": [
      {
        "name": "test",
        "value": "5"
      },
      {
        "name": "projectlevel",
        "value": "10"
      }
    ],
    "defaults": [
      {
        "name": "test",
        "value": "1",
        "scope": "global"
      }
    ]
  }
  -----------
    http://localhost/appconfig/api/projects/demo/users/
{
  "users": [
  {
    "id": "31be62f4-e28b-424e-8401-e4d81010db4f"
  }
]
}
------
  http://localhost/appconfig/api/projects/demo/users/31be62f4-e28b-424e-8401-e4d81010db4f/config/pRMT
{
  "clientId": "pRMT",
  "scope": "user.31be62f4-e28b-424e-8401-e4d81010db4f",
  "config": [],
  "defaults": [
  {
    "name": "test",
    "value": "5",
    "scope": "project.demo"
  },
  {
    "name": "projectlevel",
    "value": "10",
    "scope": "project.demo"
  }
]
}
------

  ---------


*/
// http://localhost/appconfig/api/projects/demo/config/pRMT
// {
//   "clientId": "pRMT",
//   "scope": "project.demo",
//   "config": [],
//   "defaults": [
//   {
//     "name": "test",
//     "value": "1",
//     "scope": "global"
//   }
// ]
// }
// http://localhost/appconfig/api/projects/demo/users/31be62f4-e28b-424e-8401-e4d81010db4f/config/pRMT
// {
//   "clientId": "pRMT",
//   "scope": "user.31be62f4-e28b-424e-8401-e4d81010db4f",
//   "config": [],
//   "defaults": [
//   {
//     "name": "test",
//     "value": "5",
//     "scope": "project.demo"
//   },
//   {
//     "name": "projectlevel",
//     "value": "10",
//     "scope": "project.demo"
//   }
// ]
// }
// POST  http://localhost/appconfig/api/global/config/pRMT
// {
//   "config": [
//   {
//     "name": "test",
//     "value": "1"
//   },
//   {
//     "name": "test2",
//     "value": "2"
//   }
// ]
// }
// +++
//   {
//     "clientId": "pRMT",
//     "scope": "global",
//     "config": [
//       {
//         "name": "test",
//         "value": "1"
//       },
//       {
//         "name": "test2",
//         "value": "2"
//       }
//     ]
//   }
// POST  http://localhost/appconfig/api/projects/demo/config/pRMT
// {
//   "config": [
//   {
//     "name": "test",
//     "value": "5"
//   }
// ]
// }
// +++
//   {
//     "clientId": "pRMT",
//     "scope": "project.demo",
//     "config": [
//       {
//         "name": "test",
//         "value": "5"
//       }
//     ],
//     "defaults": [
//       {
//         "name": "test",
//         "value": "1",
//         "scope": "global"
//       }
//     ]
//   }

// POST http://localhost/appconfig/api/projects/demo/users/31be62f4-e28b-424e-8401-e4d81010db4f/config/pRMT
// {
//   "config": [
//   {
//     "name": "subjectlevel",
//     "value": "20"
//   }
// ]
// }
// +++
//   {
//     "clientId": "pRMT",
//     "scope": "user.31be62f4-e28b-424e-8401-e4d81010db4f",
//     "config": [
//       {
//         "name": "subjectlevel",
//         "value": "20"
//       }
//     ],
//     "defaults": [
//       {
//         "name": "test",
//         "value": "5",
//         "scope": "project.demo"
//       },
//       {
//         "name": "projectlevel",
//         "value": "10",
//         "scope": "project.demo"
//       }
//     ]
//   }
// ---------
//   POST http://localhost/appconfig/api/projects/demo/users/31be62f4-e28b-424e-8401-e4d81010db4f/config/pRMT
// {
//   "config": [
//   {
//     "name": "projectlevel",
//     "value": "15"
//   },
//   {
//     "name": "subjectlevel",
//     "value": "20"
//   }
// ]
// }
// +++
//   {
//     "clientId": "pRMT",
//     "scope": "user.31be62f4-e28b-424e-8401-e4d81010db4f",
//     "config": [
//       {
//         "name": "projectlevel",
//         "value": "15"
//       },
//       {
//         "name": "subjectlevel",
//         "value": "20"
//       }
//     ],
//     "defaults": [
//       {
//         "name": "test",
//         "value": "5",
//         "scope": "project.demo"
//       },
//       {
//         "name": "projectlevel",
//         "value": "10",
//         "scope": "project.demo"
//       }
//     ]
//   }
