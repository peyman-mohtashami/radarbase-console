// import {Component, input} from '@angular/core';
//
// import {AppProject} from "../../../project/models/project";
// import {DialogMode} from "../../../../enums/dialog";
// import {DetailType} from "../../../../enums/detail-type";
// import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
// import {map} from "rxjs/operators";
// import {ENTITY_NAME} from "../../../../enums/entities";
// import {Store} from "@ngrx/store";
//
// @Component({
//     selector: 'rb-revision-details',
//     templateUrl: './revision-details.component.html',
// })
// export class RevisionDetailsComponent {
//   protected readonly PROPERTIES = PROPERTIES;
//
//   entity = input.required<AppProject>();
//   mode = input<DialogMode>();
//   type = input<DetailType>();
//
//   config$ = this.store?.select(entitiesConfig).pipe(
//     map(config => config?.[ENTITY_NAME.project]?.fields ?? {})
//   )
//
//   constructor(private store: Store) {}
// }
