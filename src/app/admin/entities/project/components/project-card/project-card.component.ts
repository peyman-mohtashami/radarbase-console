// import {Component, input, output} from "@angular/core";
// import {DetailType} from "../../../../enums/detail-type";
// import {ROLES} from "../../../../enums/entities";
// import {DialogMode} from "../../../../enums/dialog";
// import {ENTITIES} from "../../../../consts/entities";
// import {AppProject} from "../../models/project";
// import {MatCard, MatCardContent} from "@angular/material/card";
// import {RouterLink} from "@angular/router";
// import {ProjectStatusComponent} from "../project-status/project-status.component";
// import {ActionsComponent} from "../actions/actions.component";
// import {RbPermissionDirective} from "../../../../../core/auth/directives/ng-permission.directive";
// import {ProjectSourceTypesComponent} from "../project-source-types/project-source-types.component";
// import {instanceConfig} from "../../../../../core/config/store/config.selectors";
// import {Store} from "@ngrx/store";
// import {AsyncPipe} from "@angular/common";
// import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
//
// @Component({
//   selector: 'rb-project-card',
//   templateUrl: './project-card.component.html',
//   imports: [
//     MatCard,
//     MatCardContent,
//     RouterLink,
//     ProjectStatusComponent,
//     ActionsComponent,
//     RbPermissionDirective,
//     ProjectSourceTypesComponent,
//     AsyncPipe,
//     LocalDateComponent
//   ]
// })
// export class ProjectCardComponent {
//   protected readonly ENTITIES = ENTITIES;
//   protected readonly DetailType = DetailType;
//   protected readonly ROLES = ROLES;
//
//   updated = input()
//   entity = input.required<AppProject>()
//
//   actionEvent = output<{mode: DialogMode, entity: AppProject}>()
//
//   config$ = this.store.select(instanceConfig);
//
//   constructor(private store: Store) {}
//
//   onAction(mode: DialogMode, entity: AppProject) {
//     this.actionEvent.emit({mode, entity});
//   }
// }
