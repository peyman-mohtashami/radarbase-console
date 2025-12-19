import {inject, Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AppClient} from "../models/client";
import {ClientService} from "./client.service";

@Injectable({providedIn: 'root'})
export class ClientFullListResolver implements Resolve<AppClient[]> {
  private entityService = inject(ClientService);

  resolve(): Observable<AppClient[]> {
    return this.entityService.getWithQuery();
  }
}
