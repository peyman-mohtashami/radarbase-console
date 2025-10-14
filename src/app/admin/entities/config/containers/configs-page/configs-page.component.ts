import {Component, computed, effect, inject, OnDestroy, OnInit, signal, untracked, WritableSignal} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';


import { DialogMode } from '../../../../enums/dialog';
import {
  FilterItem, TableElement,
  // TableType
} from '../../../../models/table.model';
import { ConfigService } from '../../services/config.service';
import {Observable, of, Subject} from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
import {TABLE_ANIMATION} from "../../../../animation";
import {AppConfig} from "../../models/config";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
// import {ConfigPublishComponent} from "../../components/config-publish/config-publish.component";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {RbSort, TableQueryReflectorDirective} from "../../../../directives/table-query-reflector.directive";
import {TranslatePipe} from "@ngx-translate/core";
import {MatOption} from "@angular/material/core";
import {MatFormField} from "@angular/material/input";
import {MatLabel, MatSelect} from "@angular/material/select";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ConfigTableRowComponent} from "../../components/config-table-row/config-table-row.component";
import {
  DataTableFilterComponent,
  FilterEvent
} from "../../../../components/data-table-filter/data-table-filter.component";
import {SelectionModel} from "@angular/cdk/collections";
import {takeUntil} from "rxjs/operators";
import {EntitiesPageHeaderComponent} from "../../../../components/entities-page-header/entities-page-header.component";
import {MatCheckbox} from "@angular/material/checkbox";
import {ConfigConfigService} from "../../services/config-config.service";
import {ConfigDialogService} from "../../services/config-dialog.service";
import {AppClient} from "../../../client/models/client";
import {JsonPipe} from "@angular/common";
import {AppProject} from '../../../project/models/project';
// import {ConfigPublishComponent} from "../../components/config-publish/config-publish.component";

@Component({
  selector: 'rb-configs-page',
  templateUrl: './configs-page.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    // MatFormField,
    // MatLabel,
    // MatSelect,
    // MatOption,
    // MatFormField,
    // ConfigPublishComponent,
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    MatPaginator,
    ReactiveFormsModule,
    // MatButton,
    MatAnchor,
    ConfigTableRowComponent,
    EntitiesPageHeaderComponent,
    MatCheckbox,
    DataTableFilterComponent,
    JsonPipe,
    // ConfigPublishComponent,
    MatButton
  ]
})
export class ConfigsPageComponent implements OnInit, OnDestroy {
  protected readonly DEFAULT_PAGE_SIZE = 20;
  protected readonly PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
  protected readonly MIN_ENTITIES_FOR_FILTERS = 0;
  protected readonly MIN_ENTITIES_FOR_PAGINATION = 0;
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ROLES = ROLES;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private entityService = inject(ConfigService);
  private configService = inject(ConfigConfigService);
  public dialogService = inject(ConfigDialogService);

  tableFields = this.configService.getTableFields();
  tableFilters = this.configService.getTableFilters();
  configFields = this.configService.getFormFields();

  // entities: AppConfig = this.activatedRoute.snapshot.data['entities'];
  entities$ = signal<AppConfig[]>(this.activatedRoute.snapshot.data['entities']);
  processedEntities$ = signal<AppConfig[]>(this.activatedRoute.snapshot.data['entities']);
  visibleEntities$ = signal<AppConfig[]>([]);

  currentClient: AppClient = this.activatedRoute.parent?.parent?.snapshot?.data['entity'];
  currentProject: AppProject = this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot?.data['entity'];

  page$: WritableSignal<PageEvent>;
  sort$: WritableSignal<RbSort>;
  filter$: WritableSignal<FilterEvent>;

  loading$ = signal(true);
  extensionClass$ = signal('hidden');
  filterEnabled = false;
  isFilterOpened = true;
  selection = new SelectionModel<any>(true, []);

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    const { pageSize, pageIndex, sortField, sortOrder } = this.activatedRoute.snapshot.queryParams;
    this.page$ = signal({
      pageIndex: pageIndex ?? 0,
      pageSize: pageSize ?? this.DEFAULT_PAGE_SIZE,
      length: 0,
    });
    this.sort$ = signal({sortField: sortField ?? 'name', sortOrder: sortOrder ?? 'desc'});
    this.filter$ = signal<FilterEvent>(
      this.tableFilters.reduce((map: { [key: string]: string | undefined }, filterItem) => {
        map[filterItem.name] = this.activatedRoute.snapshot.queryParams[filterItem.name];
        return map;
      }, {})
    );

    this.initializeDialogEffect();

    this.extensionClass$.set(this.getHighestPriorityClass(this.tableFields));
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.entities$.set(data['entities']);
      this.processedEntities$.set(data['entities']);
      this.dialogService.dialogUpdateEvent$.set(undefined);
      this.applyFilter();
    })

    console.log('Class: ConfigsPageComponent, Function: ngOnInit, Line 126 this.entities$()' , this.entities$());
    //=======
    // console.log('Class: ConfigsPageComponent, Function: ngOnInit, Line 152 this.clientId, this.projectName' , this.clientId, this.projectName);
    // this.init();
    // this.createExport();
    // // this.form = this.fb.group({
    // //   category: ['general'],
    // // });
    // if (this.clientId === 'pRMT' || this.clientId === 'aRMT') {
    //   this.form = new FormGroup({
    //     category: new FormControl('general')
    //   })
    // }
    // this.form?.valueChanges.subscribe((value) => {
    //   console.log('Class: ConfigsPageComponent, Function: , Line 164 value' , value);
    //   this.queryParams = {'pageIndex': 0, 'pageSize': 20, 'category': value.category ?? 'general'};
    //   // const queryParams = new HttpParams()
    //   //   // .append('pageIndex', 0).append('pageSize', 20)
    //   //   .appendAll({'pageIndex': 0, 'pageSize': 20, 'category': value.category ?? 'general'})
    //   this.router.navigate([], {queryParams: this.queryParams, relativeTo: this.activatedRoute}).then();
    //   this.page = {pageIndex: 0, pageSize: 20, length: 0};
    //   if(value){
    //     this.entityService
    //       .getWithQuery(this.queryParams)
    //       .subscribe((entities) => {
    //         // console.log("***() ent", entities)
    //         this.entities = entities;
    //         this.filteredAndSortedEntities = this.entities;
    //         this.applyFilter();
    //         this.applySort();
    //         this.applyPage();
    //         this.createExport();
    //         // this.entitiesToShow = entities
    //       });
    //   }
    // });
    //=======
    // this.dialogService.dialogUpdateEvent$.set(undefined);
    // this.applyFilter();
    this.handleDialogUrlFragment();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * Determines the highest priority extension class from a list of table fields
   * and maps it to its corresponding class string.
   *
   * @param tableFields - Array of table field objects containing an extensionClass property.
   * @returns The CSS class string corresponding to the highest priority extension class.
   */
  private getHighestPriorityClass(tableFields: { extensionClass?: string }[]): string {
    /**
     * Maps extension class strings to their respective numeric representations.
     */
    const extensionClassMapper: Record<string, number> = {
      'hidden': 0,
      'block xs:hidden': 1,
      'block sm:hidden': 2,
      'block md:hidden': 3,
      'block lg:hidden': 4,
      'block xl:hidden': 5,
      'block 2xl:hidden': 6,
      'block 3xl:hidden': 7,
      'block': 8,
    };

    /**
     * Maps numeric extension class representations back to their corresponding class strings.
     */
    const numericToClassMapper: Record<number, string> = {
      0: 'hidden',
      1: 'block xs:hidden',
      2: 'block sm:hidden',
      3: 'block md:hidden',
      4: 'block lg:hidden',
      5: 'block xl:hidden',
      6: 'block 2xl:hidden',
      7: 'block 3xl:hidden',
      8: 'block',
    };

    let highestPriority = 0;

    tableFields.forEach(field => {
      if (field.extensionClass && extensionClassMapper[field.extensionClass] !== undefined) {
        highestPriority = Math.max(highestPriority, extensionClassMapper[field.extensionClass]);
      }
    });

    return numericToClassMapper[highestPriority];
  }


  private initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent$();
      console.log('Class: ConfigsPageComponent, Function: , Line 219 ' , updated);
      if (updated) untracked(() => this.handleDialogUpdate(updated));
    });
  }

  private handleDialogUpdate(updated: { mode: DialogMode | string, entity?: AppConfig }) {
    console.log('Class: ConfigsPageComponent, Function: handleDialogUpdate, Line 224 updated', updated);
    const {mode, entity} = updated;
    if (entity) {
      switch (mode) {
        case DialogMode.ADD:
          this.isChanged = true;
          this.addEntityToView(entity);
          break;
        case DialogMode.EDIT:
          this.isChanged = true;
          this.updateEntityInView(entity);
          break;
        case DialogMode.DELETE:
          this.isChanged = true;
          this.removeEntityFromView(entity);
          break;
      }
    } else {
      switch(mode) {
        case "discarded":
          this.isChanged = false;
          this.refreshEntities();
          break;
        case "published":
          this.isChanged = false;
          this.refreshEntities();
          break;
      }
    }
    this.removeFragmentUrl();
    this.loading$.set(false);
    this.selection.clear();
  }

  private addEntityToView(entity: AppConfig) {
    // if (entity) {
      const entities = untracked(this.entities$);
      // const updatedEntities = untracked(this.updatedEntities$);
      // this.updatedEntities$.set([entity, ...updatedEntities]);
      this.entities$.set([entity, ...entities]);
      this.applyFilter();
    // }
  }

  private updateEntityInView(entity: AppConfig) {
    // if (entity) {
      // const updatedEntities = untracked(this.updatedEntities$);

      const updatedEntities = untracked(this.entities$).map(e => e.id === entity.id ? entity : e);
      this.entities$.set(updatedEntities);
      this.applyFilter();
    // }
  }

  private removeEntityFromView(entity?: AppConfig) {
    if (entity) {
      const entities = untracked(this.entities$);
      const updatedEntities = entities.filter(e => e.id !== entity.id);
      // this.entities$.set([entity, ...entities]);
      this.entities$.set(updatedEntities);
      this.applyFilter();
    }
  }

  private refreshEntities() {
    this.entityService.getAll(this.currentClient.clientId, this.currentProject.projectName).subscribe({
      next: (entities) => {
        this.entities$.set(entities);
        this.applyFilter();
      }
    });
  }

  private handleDialogUrlFragment() {
    this.activatedRoute.fragment
      .pipe(takeUntil(this._destroy$))
      .subscribe(fragment => {
        if (fragment) this.processUrlFragment(fragment);
      });
  }

  private processUrlFragment(fragment: string) {
    const [_, action, entityType, entityId] = fragment.split('/');
    if (entityType === 'config') {
      const entity = this.visibleEntities$().find(e => e.id == entityId);
      switch (action) {
        case 'add':
          this.dialogService.openDialog(DialogMode.ADD, undefined);
          break;
        case 'edit':
          if (entity) this.dialogService.openDialog(DialogMode.EDIT, entity);
          break;
        case 'delete':
          if (entity) this.dialogService.openDialog(DialogMode.DELETE, entity);
          break;
      }
    }
  }

  onPublishDialogAction(mode: "discard" | "publish") {
    return this.dialogService.openPublishDialog(mode, this.entities$());
  }

  removeFragmentUrl() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined
    }).then();
  }

  handleActiveQueryChange(event: {page: PageEvent, sort: RbSort}){
    this.sort$.set(event.sort);
    this.page$.set(event.page);
  }

  onFilterEnabledChanged($event: boolean) {
    this.filterEnabled = $event;
  }

  switchFilter(event: FilterEvent){
    this.loading$.set(true);
    this.filter$.set(event);
    this.page$.set({...this.page$(), pageIndex: 0});
    this.applyFilter();
  }

  switchSort(event: TableElement) {
    if (!event.sortable) return;
    const currentSort = this.sort$();
    this.sort$.set({
      sortField: event.name,
      sortOrder: currentSort?.sortOrder === 'asc' ? 'desc' : 'asc'
    });
    this.applySortAndPagination();
  }

  switchPage(page: PageEvent) {
    this.page$.set(page);
    this.applySortAndPagination();
  }

  private applySortAndPagination() {
    const sortedEntities = this.applySorting();
    const pagedEntities = this.applyPagination(sortedEntities);
    this.visibleEntities$.set(pagedEntities);
    this.loading$.set(false);
  }

  private applySorting(): AppConfig[] {
    const {sortField, sortOrder} = this.sort$();
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
    return this.processedEntities$().sort((a, b) => {
      const sorted = collator.compare(a[sortField]?.toString() ?? '', b[sortField]?.toString() ?? '');
      return sortOrder === 'asc' ? sorted : -1 * sorted;
    })
  }

  private applyPagination(entities: AppConfig[]): AppConfig[] {
    const { pageSize, pageIndex } = this.page$();
    const startIndex = pageSize * pageIndex;
    return entities.slice(startIndex, startIndex + pageSize);
  }

  applyFilter() {
    const filteredEntities = this.getFilteredEntities();
    this.processedEntities$.set(filteredEntities);
    this.applySortAndPagination();
  }

  private getFilteredEntities(): AppConfig[] {
    let filteredEntities = [...this.entities$()];

    Object.entries(this.filter$()).forEach(([key, value]) => {
      if (!value) return;

      filteredEntities = filteredEntities.filter((entity) =>
        entity[key]?.toString()?.toLowerCase()?.includes(value.toLowerCase())
      );
    });

    return filteredEntities;
  }

  /** Selection Helper Methods */
  isAllSelected() {
    return this.selection.selected.length === this.visibleEntities$().length;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.visibleEntities$());
    }
  }

  checkboxLabel(row?: any): string {
    return row
      ? `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`
      : `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }

  isChanged = false;


  triggerUpdate($event: string) {
    console.log('Class: ConfigsPageComponent, Function: triggerUpdate, Line 534 $event' , $event);
    if ($event === 'discard') {
      this.dialogService.dialogUpdateEvent$.set({mode: 'discard', entity: undefined})
    }

  }

  // override add(entity: AppConfig): Observable<AppConfig> {
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

  // checkIfChangeHappened(value: boolean) {
  //   this.isChanged = value;
  // }

  // override onSuccess(
  //   mode: string,
  //   dialogRef: MatDialogRef<DialogConfig>,
  //   entity: AppConfig
  // ): void {
  //   // if (
  //   //   this.type === TableType.GET_WITH_QUERY ||
  //   //   this.type === TableType.GET_ALL
  //   // ) {
  //   //   // this.updateTrigger$.next(entity['id']?.toString() || '0');
  //   //
  //   //   // this.dataSource.data = this.entities;
  //   // }
  //   this.applyStateChangesToUrlQueryParams({ [mode]: null });
  //   dialogRef.close();
  //   // this.updated = entity['id'];
  //   setTimeout(() => {
  //     this.updated = undefined;
  //   }, 1000);
  // }

  // triggerUpdate($event: string) {
  //   this.entities.map((entity) => (entity.changed = false));
  //   this.checkIfChangeHappened(false);
  //   // this.updateTrigger$.next($event);
  //   this.entityService
  //     .getWithQuery(this.queryParams)
  //     .subscribe((entities) => {
  //       // console.log("***() ent", entities)
  //       this.entities = entities;
  //       this.entitiesChanged();
  //       // this.filteredAndSortedEntities = this.entities;
  //       // this.applyFilter();
  //       // this.applySort();
  //       // this.applyPage();
  //       // this.entitiesToShow = entities
  //     });
  // }

  // onFileSelected(e: any) {
  //   console.log('file changed');
  //   this.file = e.target.files[0];
  //   this.updateEntities(this.file);
  // }
  //
  // updateEntities(file?: Blob) {
  //   console.log('upload file');
  //   const fileReader = new FileReader();
  //   fileReader.onload = (e) => {
  //     console.log(fileReader.result);
  //     if (fileReader.result) {
  //       try {
  //         const entities: AppConfig[] = JSON.parse(
  //           fileReader.result as string
  //         );
  //         this.entities = entities.map((entity) => ({
  //           ...entity,
  //           changed: true,
  //         }));
  //         this.checkIfChangeHappened(true);
  //         // this.dataSource.data = this.entities;
  //       } catch (error: unknown) {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   if (file) {
  //     fileReader.readAsText(file);
  //   }
  // }

  // private createExport() {
  //   const configJson = JSON.stringify(this.entities, null, 2);
  //   const blob = new Blob([configJson], { type: 'text/json' });
  //   const uri = URL.createObjectURL(blob);
  //   this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl(uri);
  // }

}
