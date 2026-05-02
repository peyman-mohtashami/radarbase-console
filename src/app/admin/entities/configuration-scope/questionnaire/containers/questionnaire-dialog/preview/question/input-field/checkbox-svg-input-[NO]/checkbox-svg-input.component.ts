import {Component, inject, input, OnInit} from '@angular/core'
import { BaseInputComponent } from '../base-input/base-input.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'app-checkbox-svg-input',
  templateUrl: 'checkbox-svg-input.component.html',
})
export class CheckboxSvgInputComponent extends BaseInputComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);

  multiSelect = input<boolean>(true);

  safeSvg?: SafeHtml;
  _selectedValue: string[] = [];

  override ngOnInit() {
    super.ngOnInit();
    this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(this.question().field_annotation);
    setTimeout(() => {
      this.attachClickHandlers();
      document.querySelectorAll('svg path').forEach(path => {
        if (this.selectedValue?.includes(path.id)) {
          path.classList.add('active')
        } else {
          path.classList.remove('active')
        }
      });
    }, 0);
  }

  attachClickHandlers() {
    document.querySelectorAll('svg path').forEach(path =>
      path.addEventListener('click', event => this.handlePathClick(event))
    );
  }

  private handlePathClick(event: Event) {
    if (this.isDisabled) return;

    const target = event.target as SVGElement;
    const label = target.getAttribute('id');
    if (!label) return

    if (this.multiSelect()) {
      target.classList.toggle('active');
      this._selectedValue = target.classList.contains('active')
        ? [...this._selectedValue, label]
        : this._selectedValue.filter(item => item !== label);
    } else {
      document.querySelectorAll('svg path').forEach(p => p.classList.remove('active'));
      target.classList.add('active');
      this._selectedValue = [label];
    }

    this.onInputChange(this._selectedValue.toString());
  }
}
