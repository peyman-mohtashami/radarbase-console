// import {
//   Component, inject,
//   OnDestroy,
//   OnInit, output,
// } from '@angular/core'
// import { Platform } from '@ionic/angular'
// import { Subscription } from 'rxjs'
//
// import { UsageService } from '../../../../../../core/data-ingestion/usage/usage.service'
// import {
//   IonAlert,
//   IonButton,
// } from '@ionic/angular/standalone'
// import { TranslatePipe } from '@ngx-translate/core'
// import { Router } from '@angular/router'
// import { BaseInputComponent } from '../base-input/base-input.component'
// import {AudioRecordService} from "./audio-record.service";
// import {UsageEventType} from "../../../../../../core/data-ingestion/usage/enums/events";
// import {QuestionHeaderComponent} from "../../question-header/question-header.component";
// import {ScrollableContentComponent} from "../../scrolable-content/scrollable-content.component";
//
// export const DefaultMaxAudioAttemptsAllowed = 5;
//
// @Component({
//   selector: 'app-audio-input',
//   templateUrl: 'audio-input.component.html',
//   imports: [
//     IonButton,
//     IonAlert,
//     TranslatePipe,
//     QuestionHeaderComponent,
//     ScrollableContentComponent,
//   ]
// })
// export class AudioInputComponent extends BaseInputComponent implements OnDestroy, OnInit {
//   private audioRecordService = inject(AudioRecordService);
//   private router = inject(Router);
//   private platform = inject(Platform);
//   private usage = inject(UsageService);
//
//   recordStart = output<boolean>()
//
//   isRecording = false
//   buttonShown = true
//
//   afterAttemptAlert = false
//   recordAttempts = 0
//   attemptsLeft = DefaultMaxAudioAttemptsAllowed
//
//   taskInterruptedAlert = false
//
//   backButtonListener!: Subscription
//   pauseListener!: Subscription
//
//   constructor(
//
//   ) {
//     super()
//   }
//
//   override ngOnInit(): void {
//     super.ngOnInit();
//     // NOTE: Stop audio recording when application is on pause / backButton is pressed
//     this.pauseListener = this.platform.pause.subscribe(async () => {
//       this.isRecording = this.audioRecordService.isRecording;
//       if (this.isRecording) {
//         await this.stopRecording();
//         this.showTaskInterruptedAlert();
//       }
//     })
//
//     this.backButtonListener = this.platform.backButton.subscribe(async () => {
//       await this.stopRecording();
//       (navigator as any)['app'].exitApp();
//     })
//   }
//
//   ngOnDestroy(): void {
//     this.pauseListener.unsubscribe();
//     this.backButtonListener.unsubscribe();
//   }
//
//   async handleRecording(): Promise<void> {
//     this.isRecording = this.audioRecordService.isRecording;
//     if (!this.isRecording) {
//       this.recordAttempts++;
//       if (this.recordAttempts <= DefaultMaxAudioAttemptsAllowed) {
//         try {
//           await this.startRecording();
//           this.isRecording = this.audioRecordService.isRecording;
//         } catch {
//           this.showTaskInterruptedAlert();
//         }
//       }
//     } else {
//       try {
//         await this.stopRecording();
//         this.isRecording = this.audioRecordService.isRecording;
//       } catch {
//         this.showTaskInterruptedAlert();
//       }
//       this.recordStart.emit(false);
//       if (this.recordAttempts == DefaultMaxAudioAttemptsAllowed) {
//         this.finishRecording();
//         this.isRecording = this.audioRecordService.isRecording;
//       } else {
//         this.showAfterAttemptAlert();
//       }
//     }
//   }
//
//   finishRecording = (): void => {
//     this.buttonShown = false;
//     this.onInputChange(this.audioRecordService.getFormattedAudioData());
//   }
//
//   private startRecording(): Promise<void> {
//     this.recordStart.emit(true);
//     this.usage.sendGeneralEvent(UsageEventType.RECORDING_STARTED, true);
//     return this.audioRecordService.startAudioRecording();
//   }
//
//   private async stopRecording(): Promise<void> {
//     this.usage.sendGeneralEvent(UsageEventType.RECORDING_STOPPED, true);
//     await this.audioRecordService.stopAudioRecording();
//   }
//
//   private showTaskInterruptedAlert(): void {
//     this.usage.sendGeneralEvent(UsageEventType.RECORDING_ERROR);
//     this.taskInterruptedAlert = true;
//   }
//
//   taskInterruptedAlertConfirm = (): void => {
//     this.router.navigateByUrl('/').then();
//   }
//
//   private showAfterAttemptAlert(): void {
//     this.attemptsLeft = DefaultMaxAudioAttemptsAllowed - this.recordAttempts;
//     this.afterAttemptAlert = true;
//   }
// }
