import {inject, Pipe, PipeTransform} from '@angular/core';
import {PreviewStateService} from '../services/preview-state.service';

@Pipe({
  name: 'translateLang',
  pure: false
})
export class TranslateLangPipe implements PipeTransform {
  private previewState = inject(PreviewStateService);

  transform(key: string): string {
    return this.previewState.translate(key);
  }
}
