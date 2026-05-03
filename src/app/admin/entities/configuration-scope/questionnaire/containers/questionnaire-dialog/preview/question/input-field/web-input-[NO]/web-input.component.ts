import {Component, OnInit, output,} from '@angular/core'
// import {KeyboardEventType} from '../../../../../../core/data-ingestion/usage/enums/events'
// import {WebInputType} from '../../../../../../core/app-lifecycle/questionnaire/models/question'
// import {Browser, OpenOptions} from '@capacitor/browser'
// import {Keyboard} from '@capacitor/keyboard'
import {FormsModule} from '@angular/forms'
import {BaseInputComponent} from '../base-input/base-input.component'
// import {WebInputType} from '../../../models/question';

@Component({
  selector: 'app-web-input',
  templateUrl: 'web-input.component.html',
  imports: [
    FormsModule,
  ]
})
export class WebInputComponent extends BaseInputComponent implements OnInit {
  keyboardEvent = output<string>()

  url!: string
  validator?: (nhsId: string) => boolean
  textValue = ''
  inputValid = true
  NHS_URL = 'https://www.nhs.uk/nhs-services/online-services/find-nhs-number/'

  // browserOptions: OpenOptions = {
  //   url: '',
  //   toolbarColor: '#6d9aa5'
  // }

  // override ngOnInit() {
    // this.url = this.getWebUrl()
    // this.validator = this.getInputValidator()
  // }

  emitAnswer(value: string) {
    const valid = this.validator!(this.textValue)
    if (valid) {
      this.valueChange.emit(this.textValue)
      this.inputValid = true
    } else this.inputValid = false
  }

  async emitKeyboardEvent(value: string): Promise<void> {
    value = value.toLowerCase()
    // if (value == KeyboardEventType.ENTER) await Keyboard.hide()

    this.keyboardEvent.emit(value)
  }

  async openUrl() {
    await this.openWithInAppBrowser(this.url)
  }

  async openWithInAppBrowser(url: string) {
    // const options = Object.assign({}, this.browserOptions, { url })
    // await Browser.open(options)
  }

  getWebUrl() {
    // switch (this.question().field_annotation) {
    //   case WebInputType.NHS:
    //     return this.NHS_URL
    //   default:
    //     return this.NHS_URL
    // }
  }

  getInputValidator() {
    // switch (this.question().field_annotation) {
    //   case WebInputType.NHS:
    //     return this.isValidNHSId
    //   default:
    //     return this.isValidNHSId
    // }
  }

  isValidNHSId(nhsId: string) {
    const checksum = this.calculateNHSChecksum(nhsId)
    const lastDigit: number = parseInt(nhsId[9], 10)
    return checksum === lastDigit
  }

  calculateNHSChecksum(nhsId: string): number {
    nhsId = nhsId.replace(/\s/g, '') // Remove any spaces
    if (nhsId.length !== 10) {
      throw new Error('Invalid NHS ID length. Expected length is 10.')
    }
    const weights: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2] // Weights for each digit
    const total: number = nhsId
      .split('')
      .map((digit, index) => parseInt(digit, 10) * weights[index])
      .slice(0, 9)
      .reduce((acc, curr) => acc + curr, 0)
    return (11 - (total % 11)) % 11
  }
}
