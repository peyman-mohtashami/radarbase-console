import { Component } from '@angular/core';
import { BaseDetailsComponent } from '../../../../components/base-details/base-details.component';
import {AppConfig} from "../../models/config";

@Component({
    selector: 'rb-config-details',
    templateUrl: './config-details.component.html',
})
export class ConfigDetailsComponent extends BaseDetailsComponent<AppConfig> {}
