// import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core'
// import { BaseInputComponent } from '../base-input/base-input.component';
// // import {NgSignaturePadOptions, SignaturePadComponent} from "@almothafar/angular-signature-pad";
// import {IonButton} from "@ionic/angular/standalone";
//
// @Component({
//   selector: 'app-signature-input',
//   templateUrl: 'signature-input.component.html',
//   imports: [
//     SignaturePadComponent,
//     IonButton,
//   ]
// })
// export class SignatureInputComponent extends BaseInputComponent implements AfterViewInit  {
//   signaturePad = viewChild.required<SignaturePadComponent>('signature');
//   signatureWrapper = viewChild.required<ElementRef>('signatureWrapper');
//
//
//   public signaturePadOptions: NgSignaturePadOptions = {
//     minWidth: 5,
//     canvasWidth: 200,
//     canvasHeight: 300,
//   };
//
//   ngAfterViewInit() {
//     setTimeout(() => {
//       const wrapperWidth = this.signatureWrapper()?.nativeElement?.offsetWidth;
//       if (wrapperWidth) {
//         this.signaturePad()?.set('canvasWidth', wrapperWidth - 16);
//       }
//       this.signaturePad()?.clear();
//     }, 0);
//   }
//
//   drawComplete(event: MouseEvent | Touch) {
//     if (event) {
//       this.valueChange.emit(this.signaturePad()?.toDataURL());
//     }
//   }
//
//   drawStart(event: MouseEvent | Touch) {}
//
//   override onReset() {
//     super.onReset();
//     this.signaturePad()?.clear();
//   }
// }
