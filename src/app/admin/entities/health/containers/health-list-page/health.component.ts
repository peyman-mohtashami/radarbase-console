import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";

import { HealthService } from '../../services/health.service';
import { ENTITY_NAME } from "../../../../enums/entities";
import {TranslatePipe} from "@ngx-translate/core";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {TagComponent} from "../../../../components/tag/tag.component";
import {DetailElementComponent} from "../../../../components/base-details/detail-element/detail-element.component";
import {MatButton} from "@angular/material/button";
import {FileSizePipe} from "../../../../pipes/file-size.pipe";
import {RadarHealth} from '../../../../../shared/models/radar-health.model';

@Component({
  selector: 'rb-health-check',
  templateUrl: './health.component.html',
  imports: [
    TranslatePipe,
    MatButton,
    LoaderComponent,
    NgIf,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    NgForOf,
    TagComponent,
    DetailElementComponent,
    KeyValuePipe,
    FileSizePipe, MatExpansionPanelHeader
  ]
})
export class HealthCheckComponent implements OnInit {
  loading = false;
  error?: any;

  health?: RadarHealth;

  constructor(
    private healthService: HealthService
  ) {}

  ngOnInit(): void {
      this.refresh();
  }

  refresh(): void {
    this.healthService.checkHealth().subscribe({
        next: health => (this.health = health),
        error: (error: HttpErrorResponse) => {
          if (error.status === 503) {
            this.health = error.error;
          }
        }
      });
  }

  protected readonly ENTITY_NAME = ENTITY_NAME;
}
