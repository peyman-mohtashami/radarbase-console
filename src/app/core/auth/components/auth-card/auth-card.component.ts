import { Component } from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {BrandingComponent} from "../branding/branding.component";

@Component({
  selector: 'rb-auth-card',
  templateUrl: './auth-card.component.html',
  imports: [
    MatCard,
    MatCardContent,
    BrandingComponent
  ],
})
export class AuthCardComponent {}
