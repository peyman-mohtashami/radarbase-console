// import {Component, input, OnInit, output} from '@angular/core'
// // import { AppQuestion } from '../../../../../../core/app-lifecycle/questionnaire/models/question'
// import { IonSpinner } from '@ionic/angular/standalone'
// // import jexl from 'jexl';
// import {AppQuestion} from '../../../models/question';
// import {AnswerWithTimeLog} from '../../../models/kafka';
// // import {AnswerWithTimeLog} from "../../../../../../core/data-ingestion/kafka/models/kafka";
//
// @Component({
//   selector: 'app-calc-input',
//   templateUrl: 'calc-input.component.html',
//   imports: [
//     IonSpinner
//   ]
// })
// export class CalcInputComponent implements OnInit {
//   question = input.required<AppQuestion>();
//   answers = input.required<Record<string, AnswerWithTimeLog[]>>();
//
//   valueChange = output<string | null>()
//
//   selected: string | null = null
//
//   async ngOnInit() {
//     jexl.addTransform('num', (val: any) => Number(val) || 0);
//     this.selected = await this.calculate(this.question());
//     this.valueChange.emit(this.selected);
//   }
//
//   private async calculate(question: AppQuestion): Promise<any> {
//     if (question.calculation_args && question.calculation_fn) {
//       try {
//         const args = JSON.parse(question.calculation_args.replace(/'/g, '"'));
//         const context: Record<string, any> = {};
//
//         args.forEach((arg: string) => {
//           context[arg] = this.getCalculationArgValue(arg);
//         });
//
//         const jexlExpression = this.convertToJexlExpression(question.calculation_fn);
//
//         return await jexl.eval(jexlExpression, context);
//       } catch (error) {
//         console.error('Calculation error:', error);
//         return undefined;
//       }
//     }
//     return undefined;
//   }
//
//   private convertToJexlExpression(calculation_fn: string): string {
//     let expr = calculation_fn;
//
//     expr = expr.replace(/const\s+\w+\s*=\s*/g, '');
//     expr = expr.replace(/let\s+\w+\s*=\s*/g, '');
//     expr = expr.replace(/var\s+\w+\s*=\s*/g, '');
//     expr = expr.replace(/return\s+(\w+);?/g, '$1');
//     expr = expr.replace(/;/g, '');
//
//     expr = expr.replace(/\+\((\w+\s*\|\|\s*0)\)/g, '($1)|num');
//
//     return expr.trim();
//   }
//
//   private getCalculationArgValue(arg: string): string | undefined {
//     return this.answers()[arg]?.[0]?.value?.toString();
//     // switch (arg) {
//     //   // case '_start_timestamp':
//     //   //   return this.task?.timestamp?.toString() ?? Date.now().toString();
//     //   // case '_next_start_timestamp':
//     //   //   return this.getNextTaskTimestamp() ?? Date.now().toString();
//     //   default:
//     //     return this.answers()[arg]?.value;
//     // }
//   }
// }
