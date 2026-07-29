import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router,} from '@angular/router';
import {AppClient} from "../models/client";
import {ClientStore} from './client.store';

@Injectable({ providedIn: 'root' })
export class ClientResolver implements Resolve<AppClient | null> {
  private store = inject(ClientStore);
  private router = inject(Router);

  async resolve(route: ActivatedRouteSnapshot): Promise<AppClient | null> {
    const clientId = route.paramMap.get('clientId')!;
    await this.store.getByKey(clientId);

    const client = this.store.selected();

    if (!client) await this.router.navigate(['/admin/clients']);
    return client;
  }
}
