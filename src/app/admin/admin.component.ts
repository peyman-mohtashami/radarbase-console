import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router, RouterOutlet,
} from '@angular/router';
import { delay, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
// import { organization, project } from './store/admin.selectors';
import { isMenuOpen } from '../core/store/ui.selectors';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { shareReplay } from 'rxjs/operators';
import {StorageService} from "../core/storage/services/storage.service";
import {SidebarNavComponent} from "./components/sidebar-nav/sidebar-nav.component";
import {FooterComponent} from "../shared/components/footer/footer.component";
import {LoaderComponent} from "../shared/components/loader/loader.component";

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
  @ViewChild('drawer') drawer?: MatDrawer;

  routeLoading = false;

  isHandset = false;
  isMenuOpened = true;


  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private store: Store,
    private breakpointObserver: BreakpointObserver
  ) {}

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
          case event instanceof NavigationStart: {
            // console.log('Class: AppComponent, Function: next, Line 102 ' , (event as NavigationStart).url);
            if ((event as NavigationStart).url.startsWith('/admin')) {
              // console.log('Class: AppComponent, Function: next, Line 103 startsWithAdmin');
              StorageService.setLastLocation((event as NavigationStart).url);
            }
            //TODO ----------------------
            // console.log((event as NavigationStart).url);
            // const tree: UrlTree = this.router.parseUrl(
            //   (event as NavigationStart).url
            // );
            // // '/team/33/(user/victor//support:help)?debug=true#fragment'
            //
            // // const f = tree.fragment; // return 'fragment'
            // // const q = tree.queryParams; // returns {debug: 'true'}
            // const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
            // const segments: UrlSegment[] = g.segments; // returns 2 segments 'team' and '33'
            // // console.log('F:', f);
            // // console.log('Q:', q);
            // console.log('tree:', tree);
            // console.log('G:', g);
            // console.log('S:', segments);
            // for (const index in segments) {
            //   if (segments[index].path === 'organizations') {
            //     if (segments[+index + 1]) {
            //       console.log('Org:', segments[+index + 1].path);
            //     }
            //   }
            //   if (segments[index].path === 'projects') {
            //     if (segments[+index + 1]) {
            //       console.log('Prj:', segments[+index + 1].path);
            //     }
            //   }
            // }

            this.routeLoading = true;
            break;
          }
          case event instanceof NavigationEnd: {
            // console.log('Class: AppComponent, Function: next, Line 140 NavigationEnd' , );
            this.routeLoading = false;
            break;
          }
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            // console.log('Class: AppComponent, Function: next, Line 146 NavigationCancel | NavigationError' , );
            this.routeLoading = false;
            break;
          }
          default: {
            // console.log('Class: AppComponent, Function: next, Line 150 default' , );
            break;
          }
        }
      },
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // closeMenu() {
  //   this.store.dispatch(UiActions.toggleMenu());
  // }
}
