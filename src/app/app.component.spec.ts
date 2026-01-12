import { TestBed } from '@angular/core/testing';
import {AppComponent} from './app.component';
import {provideRouter, RouterOutlet} from '@angular/router';
import {Component, Input, output} from '@angular/core';
import {By} from '@angular/platform-browser';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  template: '',
})
class ToolbarStubComponent {
  menuStatus = output<boolean>();
}

@Component({
  selector: 'app-footer',
  standalone: true,
  template: '',
})
class FooterStubComponent {
  @Input() isMenuOpen = true;
}

@Component({
  selector: 'app-sidebar-nav',
  standalone: true,
  template: '',
})
class SidebarNavStubComponent {
  @Input() isMenuOpen = true;
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    })
      .overrideComponent(AppComponent, {
        set: {
          imports: [
            RouterOutlet,
            ToolbarStubComponent,
            FooterStubComponent,
            SidebarNavStubComponent,
          ],
        },
      })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have menu opened by default', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.isMenuOpened).toBe(true);
  });

  it('should update isMenuOpened when toolbar emits menuStatus', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const toolbar = fixture.debugElement.query(By.directive(ToolbarStubComponent))
      .componentInstance as ToolbarStubComponent;

    toolbar.menuStatus.emit(false);
    fixture.detectChanges();

    expect(fixture.componentInstance.isMenuOpened).toBe(false);
  });
});
