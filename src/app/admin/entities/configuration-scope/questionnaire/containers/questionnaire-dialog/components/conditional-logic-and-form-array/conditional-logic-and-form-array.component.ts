import {Component} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, ValidationErrors, Validator
} from '@angular/forms';
import {CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {moveItemInFormArray} from "../../questionnaire-dialog.component";
import {MatButton, MatIconButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {ChoiceFormGroupComponent} from '../choice-form-group/choice-form-group.component';
import {ConditionalLogicItem} from '../conditional-logic-dialog/conditional-logic-dialog.component';
import {
  ConditionalLogicItemFormGroupComponent
} from '../conditional-logic-item-form-group/conditional-logic-item-form-group.component';

export interface Choice {
  code: string;
  label: Record<string, string>;
}

@Component({
  selector: 'app-conditional-logic-and-form-array',
  templateUrl: './conditional-logic-and-form-array.component.html',
  imports: [
    CdkDropList,
    ReactiveFormsModule,
    MatIconButton,
    TranslatePipe,
    MatIcon,
    ChoiceFormGroupComponent,
    ConditionalLogicItemFormGroupComponent,
    MatButton,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ConditionalLogicAndFormArrayComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ConditionalLogicAndFormArrayComponent
    }
  ]
})
export class ConditionalLogicAndFormArrayComponent implements ControlValueAccessor, Validator {
  // languages = input.required<RadarOption[]>();
  // selectedLanguage = input.required<string>();

  form = new FormArray<FormControl<ConditionalLogicItem | undefined>>([]);

  onTouch: () => void = () => undefined;
  onChange: (value: (ConditionalLogicItem | undefined)[]) => void = () => undefined;

  validate(): ValidationErrors | null {
    const errors: ValidationErrors = {};

    // 1) Require at least one question row
    if (this.form.length === 0) {
      errors['required'] = 'At least one Question is required';
      return errors;
    }

    // 2) Collect duplicate field_name values (among non-empty names)
    // const nameMap = new Map<string, number[]>();
    //
    // this.form.controls.forEach((control, index) => {
    //   const rawName = (control.value?.code ?? '');
    //   const name = rawName.trim();
    //   if (!name) {
    //     return; // ignore empty names
    //   }
    //
    //   const indexes = nameMap.get(name) ?? [];
    //   indexes.push(index);
    //   nameMap.set(name, indexes);
    // });
    //
    // const duplicateIndexes: number[] = [];
    // const duplicateNames: string[] = [];
    //
    // nameMap.forEach((indexes, name) => {
    //   if (indexes.length > 1) {
    //     duplicateIndexes.push(...indexes);
    //     duplicateNames.push(name);
    //   }
    // });
    //
    // if (duplicateIndexes.length) {
    //   errors['duplicateFieldNames'] = {
    //     message: 'field_name values must be unique',
    //     names: duplicateNames,
    //     indexes: duplicateIndexes,
    //   };
    // }

    // 3) Collect any child control errors
    this.form.controls.forEach((control, index) => {
      if (control.errors) {
        errors[`question${index}`] = control.errors;
      }
    });

    return Object.keys(errors).length > 0 ? errors : null;
  }

  writeValue(choices: ConditionalLogicItem[]) {
    this.form.clear();

    if (!choices || choices.length === 0) {
      this.addItem();
      return;
    }
    choices.forEach(choice => this.addItem(choice));
  }

  registerOnChange(fn: (value: (ConditionalLogicItem | undefined)[]) => void) {
    this.onChange = fn;
    this.form.valueChanges.subscribe(value => {
      fn(value);
      // const _value = value.map(v => {
      //   return {
      //     code: v?.code ?? '',
      //     label: v?.label ?? {}
      //   }
      // })
      // fn(_value);
    });
  }

  registerOnTouched(fn: () => void) {
    this.onTouch = fn;
  }

  addItem(question?: ConditionalLogicItem) {
    this.form.push(new FormControl(question, {nonNullable: true}));
  }

  removeItem(index: number) {
    this.form.removeAt(index);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInFormArray(this.form, event.previousIndex, event.currentIndex);
  }
}
