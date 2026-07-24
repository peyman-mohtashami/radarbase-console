import {Component, inject, ChangeDetectionStrategy} from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TranslatePipe,
    MatIconButton,
    MatIcon
  ]
})
export class ErrorSnackbarComponent {
  private readonly snackBarRef = inject(MatSnackBarRef<ErrorSnackbarComponent>)
  protected readonly data: string[] = inject(MAT_SNACK_BAR_DATA);

  close(): void {
    this.snackBarRef.dismiss();
  }
}
