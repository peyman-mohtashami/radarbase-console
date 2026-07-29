import {MatDialogRef} from '@angular/material/dialog';

export function animateDialogIn(id: string) {
  const innerContainer = document.getElementById(id);
  const panel = innerContainer?.closest('.tailwind-slide-panel');
  setTimeout(() => {
    panel?.classList.add('dialog-enter-active');
  });
}

export function animateDialogOut(id: string, dialogRef: MatDialogRef<any, any>){
  const innerContainer = document.getElementById(id);
  const panel = innerContainer?.closest('.tailwind-slide-panel');
  panel?.classList.remove('dialog-enter-active');
  panel?.classList.add('dialog-exit-active');

  setTimeout(() => {
    dialogRef?.close();
  }, 300);
}
