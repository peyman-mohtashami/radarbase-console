// import {inject, Injectable} from '@angular/core'
// // import {VoiceRecorder} from 'capacitor-voice-recorder'
// // import {RemoteConfigService} from "../../../../../../core/configuration/remote-config/remote-config.service";
// // import {ConfigKeys} from "../../../../../../core/configuration/remote-config/enums/config";
// // import {LogService} from "../../../../../core/log/log.service";
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AudioRecordService {
//   // private logger = inject(LogService);
//   // private remoteConfigService = inject(RemoteConfigService);
//
//   private samplingRate?: number;
//   private bitRate?: number;
//   private encoder?: string;
//
//   isRecording = false;
//   encoding = 'base64';
//   data: any;
//
//   async startAudioRecording(): Promise<void> {
//     // const sampleRate = await this.remoteConfigService.get(ConfigKeys.AUDIO_SAMPLING_RATE);
//     // this.samplingRate = Number(sampleRate);
//     //
//     // const bitRate = await this.remoteConfigService.get(ConfigKeys.AUDIO_BIT_RATE);
//     // this.bitRate = Number(bitRate);
//     //
//     // this.encoder = await this.remoteConfigService.get(ConfigKeys.AUDIO_ENCODER);
//
//     try {
//       await VoiceRecorder.requestAudioRecordingPermission()
//       await VoiceRecorder.startRecordingWithCompression({
//         sampleRate: this.samplingRate,
//         bitRate: this.bitRate,
//         audioEncoder: this.encoder
//       })
//       this.isRecording = true
//     } catch (err) {
//       this.isRecording = false
//     }
//   }
//
//   async stopAudioRecording() {
//     try {
//       const result = await VoiceRecorder.stopRecording();
//       this.isRecording = false;
//       this.data = result.value;
//       return result.value;
//     } catch (error) {
//       console.log(error);
//       this.isRecording = false;
//       return Promise.reject(error);
//     }
//   }
//
//   getFormattedAudioData(): string {
//     const mimeType = this.data.mimeType
//     const data = this.data.recordDataBase64
//     return `data:${mimeType};${this.encoding},${data}`
//   }
//
//   // getIsRecording(): boolean {
//   //   return this.isRecording
//   // }
//   //
//   // success(): void {
//   //   this.logger.log('Action is successful')
//   // }
//   //
//   // failure(error: any): void {
//   //   this.logger.error('Error! ', error)
//   // }
// }
