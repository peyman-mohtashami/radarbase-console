import {Component, effect, inject, OnDestroy, OnInit, signal, untracked, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {RbSort, TableElement} from '../../../../models/table.model';
import {DialogMode} from '../../../../enums/dialog';
import {ROLES} from "../../../../../shared/enums/roles";
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
  FilterEvent
} from '../../../../components/data-table-filter/data-table-filter.component';

import {QuestionnaireService} from "../../services/questionnaire.service";
import {QuestionnaireConfigService} from "../../services/questionnaire-config.service";
import {QuestionnaireDialogService} from "../../services/questionnaire-dialog.service";
import {AppQuestionnaire} from "../../models/questionnaire";
import {
  QuestionnaireTableRowComponent
} from "../../components/questionnaire-table-row/questionnaire-table-row.component";
import {AppProject} from "../../../project/models/project";
import {AppSubject} from "../../../subject/models/subject";
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';
import {DEFAULT_PAGE_SIZE, MIN_ENTITIES_FOR_FILTERS} from '../../../../consts/default-table-values';

@Component({
  selector: 'app-questionnaire-list-page',
  templateUrl: './questionnaire-list-page.component.html',
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    QuestionnaireTableRowComponent,
    EntitiesPageComponent,
  ]
})
export class QuestionnaireListPageComponent implements OnInit, OnDestroy {
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private entityService = inject(QuestionnaireService);
  protected configService = inject(QuestionnaireConfigService);
  public dialogService = inject(QuestionnaireDialogService);

  tableFields = this.configService.getTableFields();
  tableFilters = this.configService.getTableFilters();
  configFields = this.configService.getFormFields();

  entities = signal<AppQuestionnaire[]>(this.activatedRoute.snapshot.data['entities']);
  processedEntities = signal<AppQuestionnaire[]>(this.activatedRoute.snapshot.data['entities']);
  visibleEntities = signal<AppQuestionnaire[]>([]);

  currentProject: AppProject | undefined = undefined; //this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot?.data['entity'];
  currentSubject: AppSubject | undefined = undefined; //this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot?.data['entity'];

  page: WritableSignal<PageEvent>;
  sort: WritableSignal<RbSort>;
  filter: WritableSignal<FilterEvent>;

  loading = signal(true);
  extensionClass = signal('hidden');
  filterEnabled = false;
  isFilterOpened = true;
  selection = new SelectionModel<any>(true, []);
  gridView = false;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    const { pageSize, pageIndex, sortField, sortOrder } = this.activatedRoute.snapshot.queryParams;
    this.page = signal({
      pageIndex: pageIndex ?? 0,
      pageSize: pageSize ?? DEFAULT_PAGE_SIZE,
      length: 0,
    });
    this.sort = signal({sortField: sortField ?? 'id', sortOrder: sortOrder ?? 'desc'});
    this.filter = signal<FilterEvent>(
      this.tableFilters.reduce((map: { [key: string]: string | undefined }, filterItem) => {
        map[filterItem.name] = this.activatedRoute.snapshot.queryParams[filterItem.name];
        return map;
      }, {})
    );

    this.initializeDialogEffect();

    this.extensionClass.set(this.getHighestPriorityClass(this.tableFields));
  }

  ngOnInit() {
    // this.dialogService.dialogUpdateEvent$.set(undefined);
    // this.applyFilter();
    // this.handleDialogUrlFragment();
    this.currentProject = this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot.data['entity'];
    // this.currentSubject: AppSubject | undefined = undefined;
    if (this.activatedRoute.parent?.parent?.parent?.parent?.parent?.parent?.snapshot.routeConfig?.path === 'subjects') {
      this.currentSubject = this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot.data['entity'];
      this.currentProject = this.activatedRoute.parent?.parent?.parent?.parent?.parent?.parent?.parent?.snapshot.data['entity'];
    }

    this.activatedRoute.data.subscribe(data => {
      this.entities.set(data['entities']);
      this.processedEntities.set(data['entities']);
      this.dialogService.dialogUpdateEvent.set(undefined);
      this.applyFilter();
    })

    console.log('Class: ConfigsPageComponent, Function: ngOnInit, Line 126 this.entities$()' , this.entities());
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
      const updated = this.dialogService.dialogUpdateEvent();
      if (updated) untracked(() => this.handleDialogUpdate(updated));
    });
  }

  private handleDialogUpdate(updated: { mode: DialogMode | string, entity?: AppQuestionnaire }) {
    // switch (updated.mode) {
    //   case DialogMode.ADD:
    //     this.addEntityToView(updated?.entity);
    //     break;
    //   case DialogMode.EDIT:
    //     this.updateEntityInView(updated?.entity);
    //     break;
    //   case DialogMode.DELETE:
    //     this.refreshEntities();
    //     break;
    // }
    // this.removeFragmentUrl();
    // this.loading$.set(false);
    // this.selection.clear();
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
    this.loading.set(false);
    this.selection.clear();
  }

  private addEntityToView(entity: AppQuestionnaire) {
    // if (entity) {
    //   const entities = untracked(this.entities$);
    //   this.entities$.set([entity, ...entities]);
    //   this.applyFilter();
    // }
    // if (entity) {
    const entities = untracked(this.entities);
    // const updatedEntities = untracked(this.updatedEntities$);
    // this.updatedEntities$.set([entity, ...updatedEntities]);
    this.entities.set([entity, ...entities]);
    this.applyFilter();
    // }
  }

  private updateEntityInView(entity: AppQuestionnaire) {
    const updatedEntities = untracked(this.entities).map(e => e.name === entity.name ? entity : e);
    this.entities.set(updatedEntities);
    this.applyFilter();
    // if (entity) {
    //   const updatedEntities = untracked(this.entities$).map(e => e._name === entity._name ? entity : e);
    //   this.entities$.set(updatedEntities);
    //   this.applyFilter();
    // }
  }

  private removeEntityFromView(entity?: AppQuestionnaire) {
    if (entity) {
      const entities = untracked(this.entities);
      const updatedEntities = entities.filter(e => e.name !== entity.name);
      // this.entities$.set([entity, ...entities]);
      this.entities.set(updatedEntities);
      this.applyFilter();
    }
  }

  private refreshEntities() {
    this.entityService.getAll(this.currentProject?.projectName).subscribe({
      next: (entities) => {
        this.entities.set(entities);
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
    const [_, action, entityType, entityId, language] = fragment.split('/');
    if (entityType === 'questionnaire') {
      const entity = this.visibleEntities().find(e => e._name == entityId);
      switch (action) {
        case 'add':
          this.dialogService.openDialog(DialogMode.ADD, undefined, this.entities());
          break;
        case 'edit':
          if (entity) this.dialogService.openDialog(DialogMode.EDIT, entity, this.entities(), language);
          break;
        case 'delete':
          if (entity) this.dialogService.openDialog(DialogMode.DELETE, entity, this.entities(), language);
          break;
      }
    }
  }

  // onPublishDialogAction(mode: "discard" | "publish") {
  //   return this.dialogService.openPublishDialog(mode, this.entities$(), this.currentProject?.projectName, this.currentSubject?.login);
  // }

  removeFragmentUrl() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined
    }).then();
  }

  handleActiveQueryChange(event: {page: PageEvent, sort: RbSort}){
    this.sort.set(event.sort);
    this.page.set(event.page);
  }

  onFilterEnabledChanged($event: boolean) {
    this.filterEnabled = $event;
  }

  switchFilter(event: FilterEvent){
    this.loading.set(true);
    this.filter.set(event);
    this.page.set({...this.page(), pageIndex: 0});
    this.applyFilter();
  }

  switchSort(event: TableElement) {
    if (!event.sortable) return;
    const currentSort = this.sort();
    this.sort.set({
      sortField: event.name,
      sortOrder: currentSort?.sortOrder === 'asc' ? 'desc' : 'asc'
    });
    this.applySortAndPagination();
  }

  switchPage(page: PageEvent) {
    this.page.set(page);
    this.applySortAndPagination();
  }

  private applySortAndPagination() {
    const sortedEntities = this.applySorting();
    const pagedEntities = this.applyPagination(sortedEntities);
    this.visibleEntities.set(pagedEntities);
    this.loading.set(false);
  }

  private applySorting(): AppQuestionnaire[] {
    const {sortField, sortOrder} = this.sort();
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
    return this.processedEntities().sort((a: any, b: any) => {
      const sorted = collator.compare(a[sortField]?.toString() ?? '', b[sortField]?.toString() ?? '');
      return sortOrder === 'asc' ? sorted : -1 * sorted;
    })
  }

  private applyPagination(entities: AppQuestionnaire[]): AppQuestionnaire[] {
    const { pageSize, pageIndex } = this.page();
    const startIndex = pageSize * pageIndex;
    return entities.slice(startIndex, startIndex + pageSize);
  }

  applyFilter() {
    const filteredEntities = this.getFilteredEntities();
    this.processedEntities.set(filteredEntities);
    this.applySortAndPagination();
  }

  private getFilteredEntities(): AppQuestionnaire[] {
    let filteredEntities = [...this.entities()];

    Object.entries(this.filter()).forEach(([key, value]) => {
      if (!value) return;
      filteredEntities = filteredEntities.filter((entity: any) =>
        entity[key]?.toString()?.toLowerCase()?.includes(value.toLowerCase())
      );
    });

    return filteredEntities;
  }

  isChanged = false;


  // triggerUpdate($event: string) {
  //   console.log('Class: ConfigsPageComponent, Function: triggerUpdate, Line 534 $event' , $event);
  //   if ($event === 'discard') {
  //     this.dialogService.dialogUpdateEvent.set({mode: 'discard', entity: undefined})
  //   }
  //
  // }
}
