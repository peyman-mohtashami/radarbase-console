import {Component, inject, input, Input, OnInit, output} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AppQuestionChoice} from '../../../../../models/questionnaire';
import {QuestionnaireStateService} from '../../../services/questionnaire-state.service';
import {TranslatePipe} from '@ngx-translate/core';
import {CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {QuestionChoice} from '../question-choice/question-choice';
import {RadarOption} from '../../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';

@Component({
  selector: 'app-question-choices',
  templateUrl: './question-choices.html',
  imports: [
    MatIcon,
    MatIconButton,
    TranslatePipe,
    CdkDropList,
    QuestionChoice,
  ],
})
export class QuestionChoices implements OnInit {
  @Input() choices!: AppQuestionChoice[];
  _choices!: AppQuestionChoice[];

  languages = input.required<RadarOption[]>();

  changeEvent = output<AppQuestionChoice[]>();
  validEvent = output<boolean>();

  protected questionnaireStateService = inject(QuestionnaireStateService);
  language = input.required<RadarOption>();

  ngOnInit() {
    this._choices = [...this.choices];
    if (this._choices.length === 0) {
      this.addItem(0);
    }
    // if (this.choices.length === 0) {
    //   this.addItem(0);
    // }
  }

  addItem(index: number) {
    // this.choices.splice(index + 1, 0, {
    //   code: '',
    //   label: {},
    // });
    this._choices.splice(index + 1, 0, {
      code: '',
      label: {},
    });
  }

  removeItem(index: number) {
    // this.choices.splice(index, 1);
    this._choices.splice(index, 1);
    this.validEvent.emit(this.checkValidity());
    this.changeEvent.emit(this.choices);
  }

  protected onValueChange(event: AppQuestionChoice, index: number) {
    console.log('Class: QuestionChoices, Function: onValueChange, Line 50 event, index' , event, index);
    // this.choices[index] = event;
    const choices = [...this.choices];
    choices[index] = event
    this.changeEvent.emit(choices);
  }

  protected onValidChange($event: boolean, i: number) {

  }

  checkValidity() {
    // return this.choices.every(choice => choice.code && choice.code.trim() !== '');
    return this._choices.every(choice => choice.code && choice.code.trim() !== '');
  }

  protected onDrop($event: CdkDragDrop<any, any, any>) {

  }


}
