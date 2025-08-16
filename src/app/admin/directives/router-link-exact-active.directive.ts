import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from "@angular/core";
import { Subscription, filter } from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";

@Directive({
    selector: '[rbRouterLinkExactActive]',
})
export class RouterLinkExactActiveDirective implements OnInit, OnDestroy {
  @Input('rbRouterLinkExactActive') activeClass = 'routerLinkActive';
  @Input() targetUrl?: string;

  private sub?: Subscription;

  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.sub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // console.log('Class: RouterLinkExactActiveDirective, Function: , Line 18 ' , );
        const currentUrl = this.router.url.split('?')[0];
        // const targetUrl = '/admin/organizations'; //this.el.nativeElement.getAttribute('href');
        // console.log('Class: RouterLinkExactActiveDirective, Function: , Line 21 currentUrl, targetUrl' , currentUrl, this.targetUrl);
        if (currentUrl === this.targetUrl) {
          this.renderer.addClass(this.el.nativeElement, this.activeClass);
        } else {
          this.renderer.removeClass(this.el.nativeElement, this.activeClass);
        }
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
