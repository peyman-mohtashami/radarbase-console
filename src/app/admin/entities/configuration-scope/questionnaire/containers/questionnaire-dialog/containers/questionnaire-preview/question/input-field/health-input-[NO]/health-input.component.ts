// import {Component, computed, inject, OnInit, Signal,} from '@angular/core';
// import {FilesToUploadResult, Health} from "@radarbase/capacitor-health";
// import {IonButton, IonItem, IonList, IonSpinner} from "@ionic/angular/standalone";
// import {DatePipe, JsonPipe} from "@angular/common";
// import {TranslatePipe} from "@ngx-translate/core";
// import {HEALTHKIT_DATATYPE_MAP} from "../../../../../../core/data-ingestion/health/consts/health.consts";
// import {HealthItem} from "../../../../../../core/data-ingestion/health/models/health.model";
// import {HealthService} from "../../../../../../core/data-ingestion/health/services/health.service";
// import {BaseInputComponent} from "../base-input/base-input.component";
//
//
// @Component({
//   selector: 'app-health-input',
//   templateUrl: 'health-input.component.html',
//   imports: [
//     IonButton,
//     IonSpinner,
//     DatePipe,
//     TranslatePipe,
//     IonList,
//     IonItem,
//     JsonPipe,
//   ],
// })
// export class HealthInputComponent extends BaseInputComponent implements OnInit {
//   private healthService = inject(HealthService);
//
//   healthKitItems: Signal<HealthItem[]> = computed(() => {
//     return (this.question().select_choices_or_calculations ?? []).map(item => {
//       if (HEALTHKIT_DATATYPE_MAP[item.code]) {
//         return {
//           item,
//           dataType: HEALTHKIT_DATATYPE_MAP[item.code],
//           status: {totalSamples: -1},
//           lastSampleDate: undefined,
//         };
//       } else {
//         return null;
//       }
//     }).filter(item => !!item)
//       .filter(item => !!item.dataType);
//   });
//
//   healthKitDataTypes = computed(() => {
//     return this.healthKitItems().map(item => item.dataType);
//   });
//
//   dataCollectionStatus?: 'started' | 'finished' | 'enabled' | 'authorization';
//
//   cacheSize?: FilesToUploadResult;
//
//   override async ngOnInit() {
//     super.ngOnInit();
//     const availabilityResult = await this.healthService.isAvailable();
//     if (!availabilityResult.available) {
//       this.valueChange.emit(`${Date.now()}`);
//       return;
//     }
//     await this.updateLastSampleDates();
//     this.dataCollectionStatus = 'authorization';
//     await this.checkAuthorization();
//     this.dataCollectionStatus = 'enabled';
//   }
//
//   async updateLastSampleDates() {
//     const lastCollectionDate = await this.healthService.getLastCollectionDate(
//       this.healthKitDataTypes()
//     );
//
//     for (const healthKitItem of this.healthKitItems()) {
//       healthKitItem.lastSampleDate = lastCollectionDate.dataTypes[healthKitItem.dataType];
//     }
//   }
//
//   async checkAuthorization() {
//     await this.healthService.requestReadAuthorization(this.healthKitDataTypes());
//   }
//
//   protected async startCollectingHealthkitData() {
//     this.dataCollectionStatus = 'started';
//
//     const lastCollectionDate = await this.healthService.getLastCollectionDate(
//       this.healthKitDataTypes()
//     );
//
//     for (const healthKitItem of this.healthKitItems()) {
//       const options = await this.healthService.getReadSamplesAndWriteToFilesOptions(
//         healthKitItem.dataType,
//         lastCollectionDate.dataTypes[healthKitItem.dataType],
//         this.toIsoString('2025-10-01T00:00:00.000Z')
//       );
//       healthKitItem.lastSampleDate = options.startDate;
//       const result = await this.healthService.readSamplesAndWriteToFiles(options);
//       healthKitItem.status.totalSamples = result.totalSamples;
//     }
//     this.valueChange.emit(`${Date.now()}`);
//     this.dataCollectionStatus = 'finished';
//
//     await this.uploadCachedData();
//   }
//
//
//   async uploadCachedData() {
//     this.cacheSize = await Health.getFilesToUploadSize();
//     await this.healthService.uploadCachedData();
//     this.cacheSize = await Health.getFilesToUploadSize();
//   }
//
//   private toIsoString = (input: string) => {
//     if (!input) return undefined;
//     const date = new Date(input);
//     return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
//   }
// }
