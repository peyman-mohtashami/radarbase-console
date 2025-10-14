import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { AppClient } from "../../models/client";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField} from "@angular/material/input";
import {MatLabel, MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/core";

@Component({
  selector: 'rb-clients-select',
  templateUrl: './clients-select-page.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    TranslatePipe,
    MatSelect,
    MatOption, MatLabel, RouterOutlet,
  ]
})
export class ClientsSelectPageComponent implements OnInit, OnDestroy {

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  entities: AppClient[] = this.activatedRoute.snapshot.data['entities'];

  organizationName?: string =
    this.activatedRoute.snapshot.parent?.parent?.params['id'];
  projectName?: string =
    this.activatedRoute.snapshot.parent?.parent?.params['id'];
  subjectId?: string =
    this.activatedRoute.snapshot.parent?.parent?.params['id'];

  form = new FormGroup({
    client: new FormControl(this.activatedRoute.firstChild?.snapshot.params['id'])
  })

  ngOnInit(): void {
    this.form.controls.client.valueChanges.subscribe(value => {
      console.log('Class: ClientsSelectPageComponent, Function: , Line 41 value' , value);
      if (value) {
        this.router.navigate([value], {relativeTo: this.activatedRoute} ).then();
        // this.router.navigate([value]).then();
      }
    })
  }

  ngOnDestroy() {
  }
}
