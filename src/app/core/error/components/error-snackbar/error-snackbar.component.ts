import {Component, inject} from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {AppError} from "../../models/error.model";

@Component({
  selector: 'app-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  imports: [
    TranslatePipe,
    MatIconButton
  ]
})
export class ErrorSnackbarComponent {
  private readonly snackBarRef = inject(MatSnackBarRef<ErrorSnackbarComponent>)
  protected readonly data: AppError = inject(MAT_SNACK_BAR_DATA);

  close(): void {
    this.snackBarRef.dismiss();
  }
}
