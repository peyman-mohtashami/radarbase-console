import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  NavigationStart,
  Router, RouterOutlet,
} from '@angular/router';
import { delay, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { isMenuOpen } from '../core/store/ui.selectors';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { shareReplay } from 'rxjs/operators';
import {StorageService} from "../core/storage/services/storage.service";
import {SidebarNavComponent} from "./components/sidebar-nav/sidebar-nav.component";
import {FooterComponent} from "../shared/components/footer/footer.component";

@Component({
  selector: 'rb-admin',
  templateUrl: './admin.component.html',
  imports: [
    SidebarNavComponent,
    FooterComponent,
    RouterOutlet,
    MatDrawer,
    MatDrawerContent,
    MatDrawerContainer,
  ]
})
export class AdminComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private store = inject(Store);
  private breakpointObserver = inject(BreakpointObserver);

  @ViewChild('drawer') drawer?: MatDrawer;

  isHandset = false;
  isMenuOpened = true;

  private _destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.store.select(isMenuOpen).subscribe((isMenuOpened) => {
      this.isMenuOpened = isMenuOpened;
      if (this.isHandset) {
        this.drawer?.toggle().then();
      }
    });

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this._destroy$), shareReplay())
      .subscribe((result) => {
        this.isHandset =
          result.breakpoints[Breakpoints.XSmall] ||
          result.breakpoints[Breakpoints.Small];
      });

    this.router.events.pipe(takeUntil(this._destroy$), delay(0)).subscribe({
      next: (event) => {
        switch (true) {
          case event instanceof NavigationStart:
            if ((event as NavigationStart).url.startsWith('/admin')) {
              StorageService.setLastLocation((event as NavigationStart).url);
            }
            break;
          default:
            break;
        }
      },
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
