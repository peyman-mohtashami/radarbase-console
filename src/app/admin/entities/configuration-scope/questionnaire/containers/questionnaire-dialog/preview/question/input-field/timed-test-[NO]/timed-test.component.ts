// import {
//   Component, OnInit
// } from '@angular/core'
// // import { Haptics } from '@capacitor/haptics'
//
// import { IonButton } from '@ionic/angular/standalone'
// import { QuestionHeaderComponent } from '../../question-header/question-header.component'
// import { BaseInputComponent } from '../base-input/base-input.component'
// import {
//   ScrollableContentComponent
// } from '../../scrolable-content/scrollable-content.component'
// import {TaskTimer} from "../time-input/time-input.component";
//
// @Component({
//   selector: 'app-timed-test',
//   templateUrl: 'timed-test.component.html',
//   imports: [
//     IonButton,
//     QuestionHeaderComponent,
//     ScrollableContentComponent,
//   ]
// })
// export class TimedTestComponent extends BaseInputComponent implements OnInit {
//   taskTimer!: TaskTimer
//   startTime!: number
//   endTime!: number
//
//   override ngOnInit() {
//     super.ngOnInit()
//     if (this.question().field_annotation.autoStart !== 'false') {
//       this.startTimer()
//     }
//     this.initTimer()
//   }
//
//   initTimer() {
//     if (!this.question().field_annotation.timer) {
//       this.question().field_annotation.timer = { start: 0, end: 0 }
//     }
//
//     this.taskTimer = {
//       hasStarted: false,
//       hasFinished: false,
//       secondsElapsed: 0,
//       secondsRemaining: this.question().field_annotation.timer.start,
//       duration:
//         this.question().field_annotation.timer.start -
//         this.question().field_annotation.timer.end,
//       displayTime: this.question().field_annotation.timer.start
//     }
//   }
//
//   startTimer() {
//     this.taskTimer.hasStarted = true
//     this.startTime = Date.now()
//     this.endTime =
//       this.startTime + this.taskTimer.duration * 1000
//     this.timerTick()
//   }
//
//   updateCountdown() {
//     this.taskTimer.secondsElapsed = Math.floor(
//       (Date.now() - this.startTime) / 1000
//     )
//     this.taskTimer.displayTime =
//       this.question().field_annotation.timer.start -
//       this.taskTimer.secondsElapsed
//   }
//
//   timerTick() {
//     if (!this.taskTimer.hasStarted) {
//       return
//     }
//     const timerId = setInterval(async () => {
//       this.updateCountdown()
//
//       if (this.endTime - Date.now() <= 0) {
//         clearInterval(timerId)
//         await this.stopTimer()
//       }
//     }, 1000)
//   }
//
//   async stopTimer() {
//     // await Haptics.vibrate()
//     this.taskTimer.hasFinished = true
//     this.onInputChange(this.endTime.toString())
//   }
// }
