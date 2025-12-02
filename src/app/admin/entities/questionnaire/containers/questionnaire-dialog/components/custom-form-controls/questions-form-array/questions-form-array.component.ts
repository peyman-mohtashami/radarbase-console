import {Component, inject, input} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, ValidationErrors, Validator
} from '@angular/forms';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {QuestionListItemComponent} from "../../question-list-item/question-list-item.component";
import {QuestionFormGroupComponent} from "../question-form-group/question-form-group.component";
import {QuestionnaireStateService} from "../../../services/questionnaire-state.service";
import {RadarOption} from "../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {AppQuestion} from "../../../../../models/questionnaire";
import {moveItemInFormArray} from "../../../questionnaire-dialog.component";

@Component({
  selector: 'app-questions-form-array',
  templateUrl: './questions-form-array.component.html',
  imports: [
    MatButton,
    MatIcon,
    CdkDropList,
    QuestionListItemComponent,
    CdkDrag,
    ReactiveFormsModule,
    QuestionFormGroupComponent,
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: QuestionsFormArrayComponent
  },{
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: QuestionsFormArrayComponent
  }]
})
export class QuestionsFormArrayComponent implements ControlValueAccessor, Validator {
  questionnaireStateService = inject(QuestionnaireStateService);

  languages = input.required<RadarOption[]>();

  form = new FormArray<FormControl<AppQuestion | undefined>>([]);

  onChange = () => {};
  onTouch = () => {};

  // registerOnValidatorChange?(fn: () => void): void {
  //   this.onValidatorChange = fn;
  // }

  // private onValidatorChange: (() => void) | undefined;

  validate(): ValidationErrors | null {
    if (this.form.length === 0) {
      return { required: 'At least one Question is required' };
    }

    const errors: ValidationErrors = {};
    this.form.controls.forEach((control, index) => {
      if (control.errors) {
        errors[`question${index}`] = control.errors;
      }
    });

    return Object.keys(errors).length > 0 ? errors : null;
  }

  writeValue(questions: AppQuestion[]) {
    if (questions) {
      this.form.clear();
      questions.forEach(question => this.addQuestion(question));
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
    this.form.valueChanges.subscribe(value => {
      fn(value);
    });
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  addQuestion(question?: AppQuestion) {
    this.form.push(new FormControl(question, {nonNullable: true}));
  }

  removeQuestion(index: number) {
    this.form.removeAt(index);
    setTimeout(() => {
      if (this.form.controls.length === 0) {
        this.questionnaireStateService.selectedQuestionIndex.set(undefined);
      }
    }, 200);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInFormArray(this.form, event.previousIndex, event.currentIndex);
  }

  protected selectQuestion(questionIndex: number) {
    this.questionnaireStateService.selectedQuestionIndex.set(questionIndex);
  }
}
