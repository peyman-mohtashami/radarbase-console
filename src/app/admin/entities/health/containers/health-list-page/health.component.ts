import {Component, inject, OnInit, signal} from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";

import { HealthService } from '../../services/health.service';
import {TranslatePipe} from "@ngx-translate/core";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {KeyValuePipe} from "@angular/common";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton} from "@angular/material/button";
import {RadarHealth} from '../../../../../shared/models/radar-health.model';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {DetailElementComponent} from '../../../../components/detail-element/detail-element.component';
import {FileSizePipe} from '../../../../../shared/pipes/file-size.pipe';

@Component({
  selector: 'app-health-check',
  templateUrl: './health.component.html',
  imports: [
    TranslatePipe,
    MatButton,
    LoaderComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    TagComponent,
    DetailElementComponent,
    KeyValuePipe,
    FileSizePipe,
    MatExpansionPanelHeader
  ]
})
export class HealthCheckComponent implements OnInit {

  private healthService = inject(HealthService);

  loading$ = signal(false);
  health$ = signal<RadarHealth | undefined>(undefined);

  error?: any;


  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.healthService.checkHealth().subscribe({
        next: health => {
          this.health$.set(health)
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 503) {
            this.health$.set(error.error);
          }
        }
      });
  }
}
