import {Component, inject, input, Input, OnInit, signal} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList} from '@angular/cdk/drag-drop';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {ValidatorError} from '../../../../../../../../../shared/utils/validators';
import {AppQuestionChoice} from '../../../../../models/questionnaire';
import {TextFormGroupComponent} from '../text-form-group/text-form-group.component';

@Component({
  selector: 'app-question-choices-form-array',
  templateUrl: './question-choices-form-array.html',
  imports: [
    ReactiveFormsModule,
    CdkDropList,
    MatIcon,
    MatIconButton,
    TranslatePipe,
    CdkDrag,
    MatError,
    MatFormField,
    MatInput,
    TextFormGroupComponent,
    CdkDragHandle,
  ],
  styles: `
    .cdk-drag-preview {
      background: white;
      border-radius: 8px;
      box-shadow:
        0 5px 5px -3px rgb(0 0 0 / 20%),
        0 8px 10px 1px rgb(0 0 0 / 14%),
        0 3px 14px 2px rgb(0 0 0 / 12%);
    }

    .cdk-drag-placeholder {
      background: #f3f4f6;
      border: 2px dashed #9ca3af;
      border-radius: 8px;
      opacity: 0.6;
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .cdk-drop-list-dragging .cdk-drag:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
  `
})
export class QuestionChoicesFormArray implements OnInit {
  private fb = inject(FormBuilder);

  protected readonly ValidatorError = ValidatorError;

  index = input.required<number>();
  _choices = input<AppQuestionChoice[]>();

  @Input({ required: true })
  choices!: FormArray;

  isValid = signal(false);

  ngOnInit() {
    if (this._choices() && this._choices()?.length) {
      this._choices()?.forEach((choice) => {
        this.choices.push(this.fb.group({
          code: choice.code,
          label: this.fb.group(choice.label ?? {}),
        }));
      });
    } else {
      this.addChoice();
    }

    this.choices.valueChanges.subscribe(() => {
      this.isValid.set(this.choices.valid);
    });
  }

  addChoice() {
    this.choices.push(this.fb.group({
      code: '',
      label: this.fb.group({}),
    }));
  }

  removeChoice(index: number) {
    this.choices.removeAt(index);
  }

  get choiceGroups(): FormGroup[] {
    return this.choices.controls as FormGroup[];
  }

  protected onDrop(event: CdkDragDrop<any>) {
    const control = this.choices.at(event.previousIndex);

    this.choices.removeAt(event.previousIndex);
    this.choices.insert(event.currentIndex, control);
  }

  protected asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
