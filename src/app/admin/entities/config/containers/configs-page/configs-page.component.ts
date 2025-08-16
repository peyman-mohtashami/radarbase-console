import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DialogMode } from '../../../../enums/dialog';
import { ConfigDialogComponent } from '../config-dialog/config-dialog.component';
import { FilterItem, TableType } from '../../../../models/table.model';
import { ConfigService } from '../../services/config.service';
// import { QueryParams } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { DialogConfig } from '@angular/cdk/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {BaseEntitiesPage} from "../../../../components/base-entities-page/base-entities-page";
import {PROPERTIES} from "../../config";
import {ENTITY_NAME} from "../../../../enums/entities";
import {TABLE_ANIMATION} from "../../../../animation";
import {FormFieldType} from "../../../../models/dialog.model";
import {AppConfig} from "../../models/config";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  EntitiesPageHeaderComponent
} from "../../../../components/base-entities-page/entities-page-header/entities-page-header.component";
import {JsonPipe, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {ConfigPublishComponent} from "../../components/config-publish/config-publish.component";
import {
  DataTableFilterComponent
} from "../../../../components/base-entities-page/data-table-filter/data-table-filter.component";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {TableQueryReflectorDirective} from "../../../../directives/table-query-reflector.directive";
import {TranslatePipe} from "@ngx-translate/core";
import {MatOption} from "@angular/material/core";
import {MatFormField} from "@angular/material/input";
import {MatLabel, MatSelect} from "@angular/material/select";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";
import {ConfigTableRowComponent} from "../../components/config-table-row/config-table-row.component";
// import {HttpParams} from "@angular/common/http";
// import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'rb-configs-page',
  templateUrl: './configs-page.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    EntitiesPageHeaderComponent,
    MatFormField,
    // NgIf,
    MatLabel,
    MatSelect,
    MatOption,
    MatFormField,
    ConfigPublishComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TableQueryReflectorDirective,
    // NgForOf,
    TranslatePipe,
    // NgClass,
    // NgSwitch,
    // NgSwitchCase,
    // NgSwitchDefault,
    MatIconButton,
    MatPaginator,
    ReactiveFormsModule,
    MatButton,
    MatAnchor,
    ConfigTableRowComponent,
    JsonPipe
  ]
})
export class ConfigsPageComponent
  extends BaseEntitiesPage<AppConfig, ConfigDialogComponent>
  implements OnInit, OnDestroy
{
  name = ENTITY_NAME.config
  protected readonly PROPERTIES = PROPERTIES;

  override type = TableType.GET_ALL;

  override entities: AppConfig[] = [];

  projectName?: string =
    this.activatedRoute.parent?.parent?.parent?.parent?.snapshot.params['id'];
  // this.activatedRoute.snapshot.parent?.parent?.params['id'];
  clientId?: string = this.activatedRoute.snapshot.params['id'];
  // category?: string = this.activatedRoute.snapshot.params['category'];

  isChanged = false;

  file?: Blob;

  downloadJsonHref?: SafeUrl;

  override filters: FilterItem[] = [
    { name: 'name', label: 'Name', type: FormFieldType.INPUT },
  ];

  // form?: UntypedFormGroup;
  form?: FormGroup;
  //   = new FormGroup({
  //   category: new FormControl('general')
  // })
  //   this.fb.group({
  //     category: ['general'],
  //   })
  // };
  queryParams?: any;

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    entityService: ConfigService,
    private sanitizer: DomSanitizer,
    // private fb: FormBuilder
  ) {
    super(router, activatedRoute, dialog, entityService);
    console.log('Class: ConfigsPageComponent, Function: , Line 84 clientId' , this.clientId);
    this.activatedRoute.params.subscribe((p) => {
      console.log("**-- p", p);
      const clientId = p['id'];
      const projectId = this.activatedRoute.parent?.parent?.parent?.parent?.snapshot.params['id'];
      this.entityService
        .getWithQuery({id: clientId, projectId: projectId})
        .subscribe((entities) => {
          this.entities = entities;
          this.entitiesChanged();
          // this.entitiesToShow = entities;
        });
    });
    // this.queryParams = this.activatedRoute.snapshot.queryParams;
    // if(this.queryParams['category']){
    //   this.form?.patchValue({category: this.queryParams['category']})
    // // } else {
    // //   queryParams['category'] = 'general';
    // }
    // console.log("***() queryP", this.queryParams)
    // // this.entityService
    // //   .getWithQuery(params)
    // //   .subscribe((entities) => (this.entities = entities));
    // this.entityService
    //   .getWithQuery(this.queryParams)
    //   .subscribe((entities) => {
    //     console.log("***() ent", entities)
    //     this.entities = entities;
    //     this.entitiesChanged();
    //     // this.filteredAndSortedEntities = this.entities;
    //     // this.applyFilter();
    //     // this.applySort();
    //     // this.applyPage();
    //     // this.entitiesToShow = entities
    //   });
  }

  ngOnInit(): void {
    console.log('Class: ConfigsPageComponent, Function: ngOnInit, Line 152 this.clientId, this.projectName' , this.clientId, this.projectName);
    this.init();
    this.createExport();
    // this.form = this.fb.group({
    //   category: ['general'],
    // });
    if (this.clientId === 'pRMT' || this.clientId === 'aRMT') {
      this.form = new FormGroup({
        category: new FormControl('general')
      })
    }
    this.form?.valueChanges.subscribe((value) => {
      console.log('Class: ConfigsPageComponent, Function: , Line 164 value' , value);
      this.queryParams = {'pageIndex': 0, 'pageSize': 20, 'category': value.category ?? 'general'};
      // const queryParams = new HttpParams()
      //   // .append('pageIndex', 0).append('pageSize', 20)
      //   .appendAll({'pageIndex': 0, 'pageSize': 20, 'category': value.category ?? 'general'})
      this.router.navigate([], {queryParams: this.queryParams, relativeTo: this.activatedRoute}).then();
      this.page = {pageIndex: 0, pageSize: 20, length: 0};
      if(value){
        this.entityService
          .getWithQuery(this.queryParams)
          .subscribe((entities) => {
            // console.log("***() ent", entities)
            this.entities = entities;
            this.filteredAndSortedEntities = this.entities;
            this.applyFilter();
            this.applySort();
            this.applyPage();
            this.createExport();
            // this.entitiesToShow = entities
          });
      }
      // const queryParams = new HttpParams().append(value)
      // this.entityService
      //   .getWithQuery(value)
      //   .subscribe((entities) => {
      //     console.log("***() ent", entities)
      //     this.entities = entities
      //     this.entitiesToShow = entities
      //   });
      // this.store.dispatch(AdminActions.clientConfigCategorySelected({selectedClientConfigCategory: value['category']}))
      // this.router
      //   .navigate([value['category']], {
      //     relativeTo: this.activatedRoute,
      //   })
      //   .then();
    });
  }

  ngOnDestroy() {
    this.destroy();
  }

  override getDialogRef(mode: DialogMode, entity?: AppConfig) {
    return this.dialog.open(ConfigDialogComponent, {
      data: { mode, entity },
      panelClass: 'tailwind-slide-panel',
      width: '50%',
      height: '100vh',
      position: { right: '0' },
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }

  entitiesChanged(){
    this.filteredAndSortedEntities = this.entities;
    this.applyFilter();
    this.applySort();
    this.applyPage();
  }

  override add(entity: AppConfig): Observable<AppConfig> {
    const e = { ...entity, id: entity.name, changed: true };
    this.entities.push(e);
    this.entitiesChanged();
    this.updated = e['id'];
    setTimeout(() => {
      this.updated = undefined;
    }, 1000);
    // this.entitiesToShow.push(e);
    this.checkIfChangeHappened(true);
    return of(e);
  }

  override delete(entity: AppConfig): Observable<string | number> {
    this.entities = this.entities.filter((e) => e.name !== entity.name);
    this.entitiesChanged();
    this.checkIfChangeHappened(true);
    return of(entity.name);
  }

  override update(entity: AppConfig): Observable<AppConfig> {
    console.log('Class: ConfigsPageComponent, Function: update, Line 188 entity' , entity);
    const itemIndex = this.entities.findIndex(
      (item) => {
        console.log('Class: ConfigsPageComponent, Function: , Line 191 item' , item);
        return item.id == entity.id
      }
    );
    console.log('Class: ConfigsPageComponent, Function: update, Line 195 itemIndex' , itemIndex);
    const e = { ...entity, changed: true };
    this.entities[itemIndex] = e;
    console.log('Class: ConfigsPageComponent, Function: update, Line 194 this.entities' , this.entities);
    this.entitiesChanged();
    this.updated = entity['id'];
    setTimeout(() => {
      this.updated = undefined;
    }, 1000);
    this.checkIfChangeHappened(true);
    return of(e);
  }

  checkIfChangeHappened(value: boolean) {
    this.isChanged = value;
  }

  override onSuccess(
    mode: string,
    dialogRef: MatDialogRef<DialogConfig>,
    entity: AppConfig
  ): void {
    if (
      this.type === TableType.GET_WITH_QUERY ||
      this.type === TableType.GET_ALL
    ) {
      // this.updateTrigger$.next(entity['id']?.toString() || '0');

      // this.dataSource.data = this.entities;
    }
    this.applyStateChangesToUrlQueryParams({ [mode]: null });
    dialogRef.close();
    // this.updated = entity['id'];
    setTimeout(() => {
      this.updated = undefined;
    }, 1000);
  }

  triggerUpdate($event: string) {
    this.entities.map((entity) => (entity.changed = false));
    this.checkIfChangeHappened(false);
    // this.updateTrigger$.next($event);
    this.entityService
      .getWithQuery(this.queryParams)
      .subscribe((entities) => {
        // console.log("***() ent", entities)
        this.entities = entities;
        this.entitiesChanged();
        // this.filteredAndSortedEntities = this.entities;
        // this.applyFilter();
        // this.applySort();
        // this.applyPage();
        // this.entitiesToShow = entities
      });
  }

  onFileSelected(e: any) {
    console.log('file changed');
    this.file = e.target.files[0];
    this.updateEntities(this.file);
  }

  updateEntities(file?: Blob) {
    console.log('upload file');
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      if (fileReader.result) {
        try {
          const entities: AppConfig[] = JSON.parse(
            fileReader.result as string
          );
          this.entities = entities.map((entity) => ({
            ...entity,
            changed: true,
          }));
          this.checkIfChangeHappened(true);
          // this.dataSource.data = this.entities;
        } catch (error: unknown) {
          console.log(error);
        }
      }
    };
    if (file) {
      fileReader.readAsText(file);
    }
  }

  private createExport() {
    const configJson = JSON.stringify(this.entities, null, 2);
    const blob = new Blob([configJson], { type: 'text/json' });
    const uri = URL.createObjectURL(blob);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl(uri);
  }


}
