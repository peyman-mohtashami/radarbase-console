import {inject, Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {ClientStore} from './client.store';

@Injectable({providedIn: 'root'})
export class ClientFullListResolver implements Resolve<void> {
  private store = inject(ClientStore);

  async resolve(): Promise<void> {
    const res = await this.store.getAll();
    if (res) this.store.selected.set(null);
  }
}
