import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { AppClient } from "../../models/client";
import {MatFormField} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/core";
import {TranslatePipe} from "@ngx-translate/core";
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {ClientStore} from '../../services/client.store';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-clients-select',
  templateUrl: './clients-select-page.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    RouterOutlet,
    TranslatePipe,
    JsonPipe,
  ]
})
export class ClientsSelectPageComponent implements OnInit {
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  protected store = inject(ClientStore);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  // entities: AppClient[] = this.activatedRoute.snapshot.data['clientFullList'];
  scope = this.activatedRoute.snapshot.data['scope'];

  form = new FormGroup({
    client: new FormControl(this.activatedRoute.firstChild?.snapshot.params['id'])
  })

  ngOnInit(): void {
    this.form.controls.client.valueChanges.subscribe(value => {
      if (value) {
        this.router.navigate([value], {relativeTo: this.activatedRoute} ).then();
      }
    })
  }
}
