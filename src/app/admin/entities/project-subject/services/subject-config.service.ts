import {computed, inject, Injectable, resource} from '@angular/core';
import {FilterItem, TableElement} from '../../../shared/models/table.model';
import {FormFieldType} from '../../../shared/models/dialog.model';
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../shared/services/base-config.service';
import {firstValueFrom} from 'rxjs';
import {CustomConfiguration} from '../../../../core/configuration/models/deployment-configuration.model';
import {ProjectStore} from '../../project/services/project.store';
import {RadarbaseAppConfigService} from '../../../../core/configuration/services/radarbase-app-config.service';

export const TableElements: TableElement[] = [
  {name: 'checkbox', width: 'w-12', tableClass: "block", extensionClass: "hidden", editable: true},
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true, editable: false},
  { name: 'login', width: 'w-92', tableClass: "block", extensionClass: "hidden", sortable: true, editable: false, showInSummary: true},
  // { name: 'login', tableClass: "block", extensionClass: "hidden", sortable: true, showInDelete: true},
  { name: 'externalId', width: 'w-56', tableClass: "hidden 2xl:block", extensionClass: "block lg:hidden", sortable: true, editable: false, showInSummary: true},
  // { name: 'externalId', width: 'w-40', tableClass: "hidden", extensionClass: "block md:hidden", sortable: true, showInDelete: true},
  { name: 'externalLink', tableClass: "hidden", extensionClass: "block", editable: true, showInSummary: true },
  { name: 'personName', tableClass: "hidden", extensionClass: "hidden", editable: true, showInSummary: true},
  { name: 'dateOfBirth', width: 'w-36', tableClass: "hidden", extensionClass: "block xl:hidden", sortable: true, editable: true, showInSummary: true},
  // { name: 'dateOfBirth', width: 'w-36', tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true},
  { name: 'status', tableClass: "hidden", extensionClass: "block", editable: true},
  { name: 'group', width: 'w-40', tableClass: "hidden lg:block", extensionClass: "block lg:hidden", sortable: true, editable: true, showInSummary: true},
  // { name: 'sources', width: 'w-56', tableClass: "hidden 2xl:block", extensionClass: "block 2xl:hidden", sortable: true},
  { name: 'sources', tableClass: "hidden block xl:block", extensionClass: "block 2xl:hidden", sortable: true, editable: true},
  // { name: 'sources', width: "w-80", tableClass: "block", extensionClass: "block 2xl:hidden", sortable: true},
  { name: 'attributes', tableClass: "hidden", extensionClass: "block", showInDelete: true, editable: false},
  { name: 'enrollmentDate', tableClass: "hidden", extensionClass: "block", editable: true, showInSummary: true },
  { name: 'createdBy', tableClass: "hidden", extensionClass: "block", editable: true},
  { name: 'createdDate', tableClass: "hidden", extensionClass: "block", editable: true },
  { name: 'lastModifiedBy', tableClass: "hidden", extensionClass: "block", editable: true },
  { name: 'lastModifiedDate', tableClass: "hidden", extensionClass: "block", editable: true},
  {name: "actions", width: "w-20", tableClass: "flex flex-wrap", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [
  {
    name: 'login',
    label: 'ADMIN.subject.login',
    placeHolder: '',
    type: FormFieldType.INPUT,
  },
  {
    name: 'externalId',
    label: 'ADMIN.subject.externalId',
    placeHolder: '',
    type: FormFieldType.INPUT,
  },
  {
    name: 'personName',
    label: 'ADMIN.subject.personName',
    type: FormFieldType.INPUT,
  },
  {
    name: 'dateOfBirth.is',
    advanced: true,
    label: 'ADMIN.subject.dateOfBirth',
    type: FormFieldType.DATEPICKER,
  },
  // {
  //   name: 'groupId',
  //   advanced: true,
  //   label: 'ADMIN.subject.group.tableLabel',
  //   type: FormFieldType.SELECT,
  //   options: this.groups?.map((g) => ({ value: g.id, label: g.name })) || [],
  // },
  {
    name: '',
    advanced: true,
    names: ['enrollmentDate.from', 'enrollmentDate.to'],
    label: 'ADMIN.subject.enrollmentDate',
    type: FormFieldType.RANGE_PICKER,
  },
]


@Injectable({providedIn: 'root'})
export class SubjectConfigService extends BaseConfigService {
  projectStore = inject(ProjectStore);
  // configurationService = inject(ConfigurationService);
  radarbaseAppConfigService = inject(RadarbaseAppConfigService);

  override tableElements = TableElements;
  override filters = filters;
  override entityMetadata = ENTITY_REGISTRY.subject;

  customEntitiesConfig = resource({
    params: () => {
      const project = this.projectStore.selected() ?? undefined;
      return project ? { projectName: project.projectName } : undefined;
    },

    loader: async ({ params }) => {
      const customEntitiesConfig = this.configurationService.customConfiguration()?.entities;
      const configBundleDto = await firstValueFrom(this.radarbaseAppConfigService.getRadarConfigBundle('ManagementPortalapp', params.projectName));
      const configDto = this.radarbaseAppConfigService.getConfig(configBundleDto,'configs');

      const customConfiguration = (!configDto ?  customEntitiesConfig : JSON.parse(configDto.value)) as CustomConfiguration;
      return customConfiguration.entities;
    },
  });

  protected override config = computed(() => {
    return (this.customEntitiesConfig.value() as Record<string, any>)?.[this.entityMetadata?.name];
  });
}


// import {inject, Injectable, resource} from '@angular/core';
// import {FilterItem, TableElement} from '../../../shared/models/table.model';
// import {FormFieldType} from '../../../shared/models/dialog.model';
// import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";
// import {RadarbaseAppConfigService} from '../../../../core/configuration/services/radarbase-app-config.service';
// import {ConfigurationService} from '../../../../core/configuration/services/configuration.service';
// import {firstValueFrom} from 'rxjs';
// import {ProjectStore} from '../../project/services/project.store';
// import {CustomConfiguration} from '../../../../core/configuration/models/deployment-configuration.model';
//
// export const TableElements: TableElement[] = [
//   {name: 'checkbox', width: 'w-12', tableClass: "block", extensionClass: "hidden", editable: true},
//   { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true, editable: false},
//   { name: 'login', width: 'w-92', tableClass: "block", extensionClass: "hidden", sortable: true, editable: false, showInSummary: true},
//   // { name: 'login', tableClass: "block", extensionClass: "hidden", sortable: true, showInDelete: true},
//   { name: 'externalId', width: 'w-56', tableClass: "hidden 2xl:block", extensionClass: "block lg:hidden", sortable: true, editable: false, showInSummary: true},
//   // { name: 'externalId', width: 'w-40', tableClass: "hidden", extensionClass: "block md:hidden", sortable: true, showInDelete: true},
//   { name: 'externalLink', tableClass: "hidden", extensionClass: "block", editable: true, showInSummary: true },
//   { name: 'personName', tableClass: "hidden", extensionClass: "hidden", editable: true, showInSummary: true},
//   { name: 'dateOfBirth', width: 'w-36', tableClass: "hidden", extensionClass: "block xl:hidden", sortable: true, editable: true, showInSummary: true},
//   // { name: 'dateOfBirth', width: 'w-36', tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true},
//   { name: 'status', tableClass: "hidden", extensionClass: "block", editable: true},
//   { name: 'group', width: 'w-40', tableClass: "hidden lg:block", extensionClass: "block lg:hidden", sortable: true, editable: true, showInSummary: true},
//   // { name: 'sources', width: 'w-56', tableClass: "hidden 2xl:block", extensionClass: "block 2xl:hidden", sortable: true},
//   { name: 'sources', tableClass: "hidden block xl:block", extensionClass: "block 2xl:hidden", sortable: true, editable: true},
//   // { name: 'sources', width: "w-80", tableClass: "block", extensionClass: "block 2xl:hidden", sortable: true},
//   { name: 'attributes', tableClass: "hidden", extensionClass: "block", showInDelete: true, editable: false},
//   { name: 'enrollmentDate', tableClass: "hidden", extensionClass: "block", editable: true, showInSummary: true },
//   { name: 'createdBy', tableClass: "hidden", extensionClass: "block", editable: true},
//   { name: 'createdDate', tableClass: "hidden", extensionClass: "block", editable: true },
//   { name: 'lastModifiedBy', tableClass: "hidden", extensionClass: "block", editable: true },
//   { name: 'lastModifiedDate', tableClass: "hidden", extensionClass: "block", editable: true},
//   {name: "actions", width: "w-20", tableClass: "flex flex-wrap", extensionClass: "hidden"},
// ];
//
// export const filters: FilterItem[] = [
//   {
//     name: 'login',
//     label: 'ADMIN.subject.login',
//     placeHolder: '',
//     type: FormFieldType.INPUT,
//   },
//   {
//     name: 'externalId',
//     label: 'ADMIN.subject.externalId',
//     placeHolder: '',
//     type: FormFieldType.INPUT,
//   },
//   {
//     name: 'personName',
//     label: 'ADMIN.subject.personName',
//     type: FormFieldType.INPUT,
//   },
//   {
//     name: 'dateOfBirth.is',
//     advanced: true,
//     label: 'ADMIN.subject.dateOfBirth',
//     type: FormFieldType.DATEPICKER,
//   },
//   // {
//   //   name: 'groupId',
//   //   advanced: true,
//   //   label: 'ADMIN.subject.group.tableLabel',
//   //   type: FormFieldType.SELECT,
//   //   options: this.groups?.map((g) => ({ value: g.id, label: g.name })) || [],
//   // },
//   {
//     name: '',
//     advanced: true,
//     names: ['enrollmentDate.from', 'enrollmentDate.to'],
//     label: 'ADMIN.subject.enrollmentDate',
//     type: FormFieldType.RANGE_PICKER,
//   },
// ]
//
//
// @Injectable({providedIn: 'root'})
// export class SubjectConfigService { //extends BaseConfigService {
//   tableElements = TableElements;
//   filters = filters;
//   entityMetadata = ENTITY_REGISTRY.subject;
//
//   radarbaseAppConfigService = inject(RadarbaseAppConfigService);
//
//   // protected readonly tableElements: TableElement[] = [];
//   // protected readonly filters: FilterItem[] = [];
//   // protected readonly entityMetadata!: EntityRegistry;
//
//   private readonly configurationService = inject(ConfigurationService);
//   private selectedProject = inject(ProjectStore).selected;
//
//   // constructor() {
//   //   effect(async () => {
//   //     const t = await firstValueFrom(this.radarbaseAppConfigService.getRadarConfigBundle('ManagementPortalapp', this.selectedProject()!.projectName));
//   //     console.log('Class: SubjectConfigService, Function: , Line 94 t' , t);
//   //     const j = this.radarbaseAppConfigService.getConfig(t, "subjectsConfig");
//   //     console.log('Class: SubjectConfigService, Function: , Line 96 j' , j);
//   //     const h = JSON.parse(j!.value);
//   //     console.log('Class: SubjectConfigService, Function: , Line 99 h' , h);
//   //     const f = h.fields;
//   //     console.log('Class: SubjectConfigService, Function: , Line 101 f' , f);
//   //   });
//   // }
//   // _configs = computed(async () => {
//   //
//   // })
//
//   // readonly configs = resource({
//   //   params: () => {
//   //     const id = this.userId();
//   //     return id ? { id } : undefined;
//   //   },
//   //   loader: ({ params }) => {
//   //     const deploymentConfig = (this.configurationService.entitiesCustomization() as Record<string, any>)?.[this.entityMetadata?.name];
//   //     const configBundleDto = await firstValueFrom(this.radarbaseAppConfigService.getRadarConfigBundle('ManagementPortalapp', this.selectedProject()!.projectName));
//   //     const configDto = this.radarbaseAppConfigService.getConfig(configBundleDto, "subjectsConfig");
//   //     if (!configDto) return deploymentConfig;
//   //     return JSON.parse(j.value);
//   //     // this.userService.getUser(params.id)
//   //   },
//   // });
//
//   private config = resource({
//     params: () => {
//       const project = this.selectedProject();
//
//       return project
//         ? {
//           projectName: project.projectName,
//           entityName: this.entityMetadata?.name,
//         }
//         : undefined;
//     },
//
//     loader: async ({ params }) => {
//       const deploymentConfig = (this.configurationService.customEntitiesConfig() as Record<string, any>)?.[params.entityName];
//       const configBundleDto = await firstValueFrom(this.radarbaseAppConfigService.getRadarConfigBundle('ManagementPortalapp', params.projectName));
//       const configDto = this.radarbaseAppConfigService.getConfig(configBundleDto,'subjectsConfig');
//
//       const subjectConfigs = (!configDto ?  deploymentConfig : JSON.parse(configDto.value)) as CustomConfiguration['entities']['subject'];
//       return {
//         fields: {
//           personName: subjectConfigs.fields.personName,
//           externalId: subjectConfigs.fields.externalId,
//           externalLink: subjectConfigs.fields.externalLink,
//           dateOfBirth: subjectConfigs.fields.dateOfBirth,
//           group: subjectConfigs.fields.group,
//           attributes: subjectConfigs.fields.attributes,
//           "attributes.participant_group": subjectConfigs.fields["attributes.participant_group"],
//           "attributes.humanReadableIdentifier": subjectConfigs.fields["attributes.humanReadableIdentifier"],
//         },
//         extraFields: [...(subjectConfigs.extraFields) ?? []],
//       } as {fields: {personName: boolean; externalId: boolean; externalLink: boolean; dateOfBirth: boolean; group: boolean; attributes: boolean;
//           "attributes.participant_group": boolean; "attributes.humanReadableIdentifier": boolean;}, extraFields: any[]}; //DeploymentConfiguration['entities']['subject'];
//     },
//   });
//
//   // private config = computed(() => {
//   //   // const deploymentConfig = (this.configurationService.entitiesCustomization() as Record<string, any>)?.[this.entityMetadata?.name];
//   //   // const t = await firstValueFrom(this.radarbaseAppConfigService.getRadarConfigBundle('ManagementPortalapp', this.selectedProject()!.projectName));
//   //   // console.log('Class: SubjectConfigService, Function: , Line 94 t' , t);
//   //   // const j = this.radarbaseAppConfigService.getConfig(t, "subjectsConfig");
//   //   // if (!j) return deploymentConfig;
//   //   // console.log('Class: SubjectConfigService, Function: , Line 96 j' , j);
//   //   // const h = JSON.parse(j.value);
//   //   // console.log('Class: SubjectConfigService, Function: , Line 99 h' , h);
//   //   // const f = h.fields;
//   //   // console.log('Class: SubjectConfigService, Function: , Line 101 f' , f);
//   //   // return (h as any);
//   //   return (this.configurationService.entitiesCustomization() as Record<string, any>)?.[this.entityMetadata?.name];
//   // })
//
//   getFormFields(): {personName: boolean; externalId: boolean; externalLink: boolean; dateOfBirth: boolean; group: boolean; attributes: boolean;
//     "attributes.participant_group": boolean; "attributes.humanReadableIdentifier": boolean;} | undefined {
//     return this.config.value()?.fields;
//   }
//
//   getTableFields() {
//     return this.tableElements.filter(e => {
//       if (e.editable) {
//         return (this.config.value()?.fields as Record<string, boolean>)[e.name];
//       } else {
//         return true;
//       }
//     });
//   }
//
//   getTableFilters() {
//     return this.filters.filter(f => (this.config.value()?.fields as Record<string, boolean>)[f.name] !== false);
//   }
//
//   getExtraFields() {
//     return this.config.value()?.extraFields;
//   }
//
//   getEntityMetadata() {
//     return this.entityMetadata;
//   }
//
//   getStoredPageSize() {
//     return +(localStorage.getItem(`${this.entityMetadata.name}_pageSize`) || '10');
//   }
//
//   getViewMode() {
//     return localStorage.getItem(`${this.entityMetadata.name}_viewMode`) || 'list';
//   }
//
//   getLatestFormEntry() {
//     return localStorage.getItem(`${this.entityMetadata.name}_formEntry`);
//   }
//
//   setStoredPageSize(pageSize: number) {
//     localStorage.setItem(`${this.entityMetadata.name}_pageSize`, pageSize.toString());
//   }
//
//   setViewMode(viewMode: 'grid' | 'list') {
//     localStorage.setItem(`${this.entityMetadata.name}_viewMode`, viewMode);
//   }
//
//   setLatestFormEntry(value: unknown | null | undefined = null) {
//     return localStorage.setItem(`${this.entityMetadata.name}_formEntry`, (value as string));
//   }
//
//   /**
//    * Persists the currently open dialog (mode, target entity and entered fields)
//    * so it can be restored after an unexpected close, e.g. a session expiry.
//    */
//   setDialogState(state: unknown | null | undefined) {
//     const key = `${this.entityMetadata.name}_dialogState`;
//     if (state === null || state === undefined) {
//       localStorage.removeItem(key);
//       return;
//     }
//     localStorage.setItem(key, JSON.stringify(state));
//   }
//
//   getDialogState<T>(): T | null {
//     const raw = localStorage.getItem(`${this.entityMetadata.name}_dialogState`);
//     if (!raw) return null;
//     try {
//       return JSON.parse(raw) as T;
//     } catch {
//       return null;
//     }
//   }
//
//   clearDialogState() {
//     localStorage.removeItem(`${this.entityMetadata.name}_dialogState`);
//   }
// }
//
//
// // get fields from deployment ->
// // override with fields from appConfigMPGlobal ->
// // override with fields from appConfigMPOrg ->
// // override with fields from appConfigMPPrj ->
// // override with fields from appConfigMPSubj
// // => fields
