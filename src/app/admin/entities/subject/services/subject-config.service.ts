import {computed, inject, Injectable} from '@angular/core';
// import {instanceConfig} from '../../../../core/config/store/config.selectors';
// import {Store} from '@ngrx/store';
// import {toSignal} from '@angular/core/rxjs-interop';
// import {map} from 'rxjs/operators';
// import {ConfigState} from '../../../../core/config/models/config.model';
import {FilterItem, TableElement} from '../../../models/table.model';
import {FormFieldType} from '../../../models/dialog.model';
import {AppCustomizationService} from "../../../../core/app-customization/services/app-customization.service";
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";

export const TableElements: TableElement[] = [
  {name: 'checkbox', width: 'w-12', tableClass: "block", extensionClass: "hidden", editable: true},
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true, editable: false},
  { name: 'login', width: 'w-48', tableClass: "block", extensionClass: "hidden", sortable: true, editable: false, showInSummary: true},
  // { name: 'login', tableClass: "block", extensionClass: "hidden", sortable: true, showInDelete: true},
  { name: 'externalId', width: 'w-56', tableClass: "hidden 2xl:block", extensionClass: "block lg:hidden", sortable: true, editable: true, showInSummary: true},
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
  { name: 'attributes', tableClass: "hidden", extensionClass: "block", showInDelete: true, editable: true},
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
    label: 'ADMIN.subject.login.tableLabel',
    placeHolder: '',
    type: FormFieldType.INPUT,
  },
  {
    name: 'externalId',
    label: 'ADMIN.subject.externalId.tableLabel',
    placeHolder: '',
    type: FormFieldType.INPUT,
  },
  {
    name: 'personName',
    label: 'ADMIN.subject.personName.tableLabel',
    type: FormFieldType.INPUT,
  },
  {
    name: 'dateOfBirth.is',
    advanced: true,
    label: 'ADMIN.subject.dateOfBirth.tableLabel',
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
    label: 'ADMIN.subject.enrollmentDate.tableLabel',
    type: FormFieldType.RANGE_PICKER,
  },
]


@Injectable({providedIn: 'root'})
export class SubjectConfigService {
  private readonly appCustomizationService = inject(AppCustomizationService);

  config = computed(() => {
    return this.appCustomizationService.entitiesCustomization()[this.getEntityMetadata().name];
  })

  // extraFields$ = toSignal(
  //   this.store.select(instanceConfig).pipe(
  //     map((c: ConfigState | undefined) => c?.entities?.[ENTITY_NAME.subject]?.['extraFields'])
  //   ), { initialValue: {} });

  getFormFields(): Record<string, boolean> {
    return this.config();
  }

  getTableFields() {
    return TableElements.filter(e => {
      if (e.editable) {
        return this.config()?.[e.name] !== false;
      } else {
        return true;
      }
    })
  }

  getTableFilters() {
    return filters.filter(f => this.config()?.[f.name] !== false);
  }

  getExtraFields() {
    return this.config().extraFields;
  }

  getEntityMetadata() {
    return ENTITY_REGISTRY.subject;
  }
}
