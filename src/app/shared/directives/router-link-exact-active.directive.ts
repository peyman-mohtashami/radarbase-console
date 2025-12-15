import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from "@angular/core";
import { Subscription, filter } from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Directive({
    selector: '[routerLinkExactActive]',
})
export class RouterLinkExactActiveDirective implements OnInit, OnDestroy {
  @Input('routerLinkExactActive') activeClass = 'routerLinkActive';
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
        const currentUrl = this.router.url.split('?')[0];
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
