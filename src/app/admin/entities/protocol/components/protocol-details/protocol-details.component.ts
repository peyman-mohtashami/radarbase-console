import { Component } from '@angular/core';
import { BaseDetailsComponent } from '../../../../components/base-details/base-details.component';
import { AppProtocol } from "../../models/protocol";
import { PROPERTIES } from '../../protocol.module';
import {DetailWrapperComponent} from "../../../../components/base-details/detail-wrapper/detail-wrapper.component";
import {DetailElementComponent} from "../../../../components/base-details/detail-element/detail-element.component";
import {NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";

@Component({
  selector: 'rb-protocol-details',
  templateUrl: './protocol-details.component.html',
  imports: [
    DetailWrapperComponent,
    DetailElementComponent,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    TranslatePipe,
    LocalDateComponent,
    NgSwitchDefault
  ]
})
export class ProtocolDetailsComponent extends BaseDetailsComponent<AppProtocol> {
  protected readonly PROPERTIES = PROPERTIES;
}
