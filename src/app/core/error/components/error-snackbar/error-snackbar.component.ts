import {Component, inject} from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
// import {NgForOf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {AppError} from "../../models/error.model";

@Component({
  selector: 'rb-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  imports: [
    // NgForOf,
    TranslatePipe,
    MatIconButton
  ]
})
export class ErrorSnackbarComponent {
  private readonly snackBarRef = inject(MatSnackBarRef<ErrorSnackbarComponent>)
  protected readonly data: AppError = inject(MAT_SNACK_BAR_DATA);

  // constructor(
  //   private snackBarRef: MatSnackBarRef<ErrorSnackbarComponent>,
  //   @Inject(MAT_SNACK_BAR_DATA) public data: string
  // ) {}

  close(): void {
    this.snackBarRef.dismiss();
  }
}
