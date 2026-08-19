import {inject, Pipe, PipeTransform} from '@angular/core';
import {PreviewStore} from '../services/preview.store';

@Pipe({
  name: 'translateLang',
  pure: false
})
export class TranslateLangPipe implements PipeTransform {
  private previewState = inject(PreviewStore);

  transform(key: string): string {
    return this.previewState.translate(key);
  }
}
