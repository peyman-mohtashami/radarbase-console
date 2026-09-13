import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MenuStateService {
  isOpen = signal(true);

  toggle() {
    this.isOpen.update(v => !v);
  }

  set(value: boolean) {
    this.isOpen.set(value);
  }
}
