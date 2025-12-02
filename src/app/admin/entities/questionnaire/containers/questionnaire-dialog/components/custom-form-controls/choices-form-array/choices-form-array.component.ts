import {Component, input} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl, FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {RadarOption} from "../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {moveItemInFormArray} from "../../../questionnaire-dialog.component";
import {TextFormGroupComponent} from "../text-form-group/text-form-group.component";

@Component({
  selector: 'app-choices-form-array',
  templateUrl: './choices-form-array.component.html',
  imports: [
    CdkDropList,
    CdkDrag,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    TextFormGroupComponent,
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: ChoicesFormArrayComponent
  }]
})
export class ChoicesFormArrayComponent implements ControlValueAccessor {
  languages = input.required<RadarOption[]>();
  selectedLanguage = input.required<string>();

  form = new FormArray<FormGroup<{
    code: FormControl<string | undefined>;
    label: FormControl<Record<string, string> | undefined>
  }>>([]);

  onChange = (value: any) => {};
  onTouch = () => {};

  writeValue(choices: {
    code: string
    label: Record<string, string>
  }[]) {
    if (choices) {
      this.form.clear();
      choices.forEach(choice => this.addItem(choice));
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  addItem(question?: {
    code: string
    label: Record<string, string>
  }) {
    this.form.push(new FormGroup({
      code: new FormControl(question?.code, {nonNullable: true}),
      label: new FormControl(question?.label, {nonNullable: true})
    }));
  }

  removeItem(index: number) {
    this.form.removeAt(index);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInFormArray(this.form, event.previousIndex, event.currentIndex);
  }
}
