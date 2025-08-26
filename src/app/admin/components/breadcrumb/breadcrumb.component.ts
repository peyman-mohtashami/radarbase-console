import {Component, OnInit} from "@angular/core";
import {JsonPipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatPrefix} from "@angular/material/input";
import {BackButtonDirective} from "../../directives/back-button.directive";
import {ENTITY_NAME} from '../../enums/entities';

@Component({
  selector: 'rb-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  imports: [
    RouterLink,
    TranslatePipe,
    MatButton,
    MatPrefix,
    BackButtonDirective,
    JsonPipe
  ]
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: { url: string, name?: string, icon?: string }[] = []; // Array to hold breadcrumb data

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ENTITIES: Record<string, {name: ENTITY_NAME, icon: string; route: string;}> = {
    // [ENTITY_NAME.appConfig]: {name: ENTITY_NAME.appConfig, icon: "app_settings_alt", route: "/admin/global-configs/apps"},
    // [ENTITY_NAME.audit]: {name: ENTITY_NAME.audit, icon: "policy", route: "/admin/audits"},
    // [ENTITY_NAME.authorizer]: {name: ENTITY_NAME.authorizer, icon: "person_outline", route: ""},
    // [ENTITY_NAME.client]: {name: ENTITY_NAME.client, icon: "important_devices", route: "/admin/clients"},//important_devices //devices_other
    // [ENTITY_NAME.config]: {name: ENTITY_NAME.config, icon: "app_settings_alt", route: ""},
    // [ENTITY_NAME.database]: {name: ENTITY_NAME.database, icon: "storage", route: "/admin/databases"},
    // [ENTITY_NAME.detail]: {name: ENTITY_NAME.detail, icon: "article", route: ""},
    // [ENTITY_NAME.group]: {name: ENTITY_NAME.group, icon: "portrait", route: ""},
    // [ENTITY_NAME.metrics]: {name: ENTITY_NAME.metrics, icon: "troubleshoot", route: "/admin/metrics"},
    // [ENTITY_NAME.health]: {name: ENTITY_NAME.health, icon: "heart_check", route: "/admin/health"},
    // [ENTITY_NAME.log]: {name: ENTITY_NAME.log, icon: "description", route: "/admin/logs"},
    "organizations": {name: ENTITY_NAME.organization, icon: "corporate_fare", route: "/admin/organizations"},
    "projects": {name: ENTITY_NAME.project, icon: "folder_open", route: "/admin/projects"},
    // [ENTITY_NAME.questionnaire]: {name: ENTITY_NAME.questionnaire, icon: "pending_actions", route: "/admin/questionnaires"},
    // [ENTITY_NAME.protocol]: {name: ENTITY_NAME.protocol, icon: "content_paste", route: "/admin/protocols"},
    // [ENTITY_NAME.revision]: {name: ENTITY_NAME.revision, icon: "history", route: "/admin/revisions"},
    // [ENTITY_NAME.role]: {name: ENTITY_NAME.role, icon: "history", route: "/admin/revisions"},
    // [ENTITY_NAME.source]: {name: ENTITY_NAME.source, icon: "source", route: ""},
    "source-data": {name: ENTITY_NAME.sourceData, icon: "schema", route: "/admin/source-data"}, //snippet_folder
    "source-types": {name: ENTITY_NAME.sourceType, icon: "category", route: "/admin/source-types"},
    // [ENTITY_NAME.subject]: {name: ENTITY_NAME.subject, icon: "person_outline", route: ""},
    "users": {name: ENTITY_NAME.user, icon: "person", route: "/admin/users"},
    // [ENTITY_NAME.dataStorage]: {name: ENTITY_NAME.dataStorage, icon: "storage", route: "/admin/users"},
    // [ENTITY_NAME.systemLogs]: {name: ENTITY_NAME.systemLogs, icon: "list_alt", route: "/admin/users"},
    // [ENTITY_NAME.systemMonitor]: {name: ENTITY_NAME.systemMonitor, icon: "open_in_new", route: "/admin/users"},
    // [ENTITY_NAME.uploadPortal]: {name: ENTITY_NAME.uploadPortal, icon: "backup", route: "/admin/users"},
    // [ENTITY_NAME.systemStatus]: {name: ENTITY_NAME.systemStatus, icon: "monitor", route: "/admin/users"},
    // [ENTITY_NAME.grafana]: {name: ENTITY_NAME.grafana, icon: "table_chart_view", route: "/admin/users"},
    // [ENTITY_NAME.grafana]: {name: ENTITY_NAME.grafana, icon: "open_in_new", route: "/admin/users"},
    // [ENTITY_NAME.website]: {name: ENTITY_NAME.website, icon: "public", route: "/admin/users"},
    // [ENTITY_NAME.wiki]: {name: ENTITY_NAME.wiki, icon: "menu_book", route: "/admin/users"},
  }


  ngOnInit(): void {
    this.buildBreadcrumbs();
  }

  // Function to create breadcrumbs based on URL
  private buildBreadcrumbs(): void {
    let route = this.activatedRoute;
    let segments: string[] = [];
    while (route.parent) {
      console.log('Class: BreadcrumbComponent, Function: buildBreadcrumbs, Line 71 route.snapshot.url' , route.snapshot.url);
      console.log('Class: BreadcrumbComponent, Function: buildBreadcrumbs, Line 70 route.snapshot.url' , route.snapshot.url?.[0]?.path);
      route.snapshot.url?.reverse()?.forEach(segment => {
        segments.push(segment?.path);
      })
      route = route.parent;
    }

    segments.reverse();
    segments = segments.filter(segment => !!segment && segment !== 'admin');

    this.breadcrumbs = segments.map(s => ({name: this.ENTITIES[s]?.name ?? s, icon: this.ENTITIES[s]?.icon, url: this.ENTITIES[s]?.route}))

    console.log('Class: BreadcrumbComponent, Function: buildBreadcrumbs, Line 76 segments' , segments);


  //   console.log('Class: BreadcrumbComponent, Function: buildBreadcrumbs, Line 68 this.activatedRoute.snapshot' , this.activatedRoute.snapshot);
  //   const rootUrl = '/';
  //   const urlSegments = this.router.url.split('/').filter(segment => segment).slice(1); // Split and filter out empty segments
  //   let accumulatedUrl = rootUrl;
  //
  //   this.breadcrumbs = urlSegments.map((segment, index) => {
  //     console.log('Class: BreadcrumbComponent, Function: , Line 73 segment, index' , segment, index);
  //     if (index === urlSegments.length - 1 && this.ENTITIES[segment]) return;
  //
  //     accumulatedUrl += segment + (index < urlSegments.length - 1 ? '/' : ''); // Construct breadcrumb URL incrementally
  //     if (this.ENTITIES[segment]) {
  //       return {
  //         label: this.ENTITIES[segment].name, //decodeURIComponent(segment), // Decode if URL contains encoded characters
  //         url: accumulatedUrl,
  //         icon: this.ENTITIES[segment].icon,
  //         name: this.ENTITIES[segment].name
  //       };
  //     } else {
  //       return {
  //         label: decodeURIComponent(segment), // Decode if URL contains encoded characters
  //         url: accumulatedUrl,
  //       }
  //     }
  //   }).filter(breadcrumb => !!breadcrumb);
  }

  // selectedOrganization$;// = this.store.select(organization);
  // selectedProject$;// = this.store.select(project);
  // selectedClient$;// = this.store.select(client);
  // selectedSubject$;// = this.store.select(subject);

  // constructor(private store: Store) {
    // this.selectedOrganization$ = this.store.select(organization);
    // this.selectedProject$ = this.store.select(project);
    // this.selectedClient$ = this.store.select(client);
    // this.selectedSubject$ = this.store.select(subject);
  // }
}
