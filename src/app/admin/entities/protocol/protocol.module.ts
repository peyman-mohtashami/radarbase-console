// import { NgModule } from '@angular/core';
//
// // import { SharedModule } from '../../../shared/shared.module';
//
// import { ProtocolsPageComponent } from './containers/protocols-page/protocols-page.component';
// import { ProtocolDialogComponent } from './containers/protocol-dialog/protocol-dialog.component';
// import { ProtocolPageComponent } from './containers/protocol-page/protocol-page.component';
// import { ProtocolDetailsComponent } from './components/protocol-details/protocol-details.component';
// import { ProtocolRoutingModule } from './protocol-routing.module';
// import { ProtocolService } from './services/protocol.service';
// import { DragDropModule } from '@angular/cdk/drag-drop';
// import { ProtocolTranslationDialogComponent } from './containers/protocol-translation-dialog/protocol-translation-dialog.component';
// // import { RoleModule } from '../../../core/auth/role/role.module';
// // import { RbMessageModule } from '../../../core/rb-message/rb-message.module';
// import { ProtocolEditPageComponent } from './containers/protocol-edit-page/protocol-edit-page.component';
// import { ProtocolsResolver } from './services/protocols.resolver';
// // import { AdminModule } from '../../admin.module';
// import { QuestionnaireModule } from "../questionnaire/questionnaire.module";
// import {TableElement} from "../../models/table.model";
// import {DetailWrapperComponent} from "../../components/base-details/detail-wrapper/detail-wrapper.component";
// import {DetailElementComponent} from "../../components/base-details/detail-element/detail-element.component";
// import {DialogTitleComponent} from "../../components/base-dialog/dialog-title/dialog-title.component";
// import {
//   DialogBodyDescriptionComponent
// } from "../../components/base-dialog/dialog-body-description/dialog-body-description.component";
// import {DialogActionsComponent} from "../../components/base-dialog/dialog-actions/dialog-actions.component";
//
import {TableElement} from "../../models/table.model";

export const PROPERTIES: TableElement[] = [
  { name: 'id', width: 'w-16', tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true },
  { name: 'name', tableClass: "block", extensionClass: "hidden", sortable: true },
  { name: 'questionnaire', width: "w-64", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true },
  { name: 'repeatProtocol', width:"w-64", tableClass: "hidden xl:block", extensionClass: "block xl:hidden" },
  { name: 'completionWindow', tableClass: "hidden", extensionClass: "block" },
  { name: 'createdBy', tableClass: "hidden", extensionClass: "block" },
  { name: 'modifiedBy', tableClass: "hidden", extensionClass: "block" },
  { name: 'createdAt', tableClass: "hidden", extensionClass: "block" },
  { name: 'modifiedAt', tableClass: "hidden", extensionClass: "block" },
  // { name: 'questionCount', width: "w-32", tableClass: "hidden lg:block", extensionClass: "block lg:hidden", sortable: true},
  // { name: 'translations', tableClass: "hidden", extensionClass: "block"}
];
//
// @NgModule({
//   // declarations: [
//   //   ProtocolsPageComponent,
//   //   ProtocolDialogComponent,
//   //   ProtocolPageComponent,
//   //   ProtocolDetailsComponent,
//   //   ProtocolTranslationDialogComponent,
//   //   ProtocolEditPageComponent,
//   // ],
//   imports: [
//     ProtocolRoutingModule,
//     // QuestionnaireModule,
//     // SharedModule,
//     // RoleModule,
//     DragDropModule,
//     // RbMessageModule,
//     // AdminModule,
//     DetailWrapperComponent,
//     DetailElementComponent,
//     DialogTitleComponent,
//     DialogBodyDescriptionComponent,
//     DialogActionsComponent,
//   ],
//   providers: [ProtocolService, ProtocolsResolver],
// })
// export class ProtocolModule {}
