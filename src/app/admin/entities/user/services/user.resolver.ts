import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot, Router,
} from '@angular/router';
import { AppUser } from "../models/user";
import {UserStore} from './user.store';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<AppUser | null> {
  private store = inject(UserStore);
  private router = inject(Router);

  async resolve(route: ActivatedRouteSnapshot): Promise<AppUser | null> {
    const userId = route.paramMap.get('userId')!;
    await this.store.getByKey(userId);

    const user = this.store.selected();
    if (!user) await this.router.navigate(['/admin/organizations']);

    return user;
  }
}
