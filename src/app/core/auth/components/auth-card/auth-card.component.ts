import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {BrandingComponent} from "../branding/branding.component";

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatCard,
    MatCardContent,
    BrandingComponent
  ],
})
export class AuthCardComponent {}
