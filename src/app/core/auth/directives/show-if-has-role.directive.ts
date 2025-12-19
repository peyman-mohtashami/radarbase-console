import {
  Directive, effect,
  EmbeddedViewRef, inject,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {ManagementPortalUser} from '../models/auth.model';

@Directive({
  selector: '[showIfHasRole]',
})
export class PermissionDirective implements OnDestroy {

  authService = inject(AuthService);
  private templateRef = inject(TemplateRef<never>);
  private _viewContainer = inject(ViewContainerRef);

  private _thenTemplateRef: TemplateRef<any> | null = null;
  private _elseTemplateRef: TemplateRef<any> | null = null;
  private _thenViewRef: EmbeddedViewRef<any> | null = null;
  private _elseViewRef: EmbeddedViewRef<any> | null = null;

  private _user: ManagementPortalUser | null = this.authService.user()
  private _roles?: { role: string; entityName?: string }[];
  private _hasPermission?: boolean;
  // private hasView = false;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    // private templateRef: TemplateRef<never>,
    // private _viewContainer: ViewContainerRef,
    // private authService: AuthService
  ) {
    this._thenTemplateRef = this.templateRef;

    effect(() => {
      this._user = this.authService.user()
      this.checkPermission();
      this._updateView();
    });
    // this._user = this.authService.user()
    // this.checkPermission();
    // this._updateView();
    // this.authService.getUserFromStore().pipe(takeUntil(this._destroy$)).subscribe({
    //   next: (user) => {
    //     this._user = user;
    //     this.checkPermission();
    //     this._updateView();
    //   },
    // });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  @Input() set showIfHasRole(
    roles: { role: string; entityName?: string }[] | undefined
  ) {
      if (!roles) {
          this._roles = roles;
          this._hasPermission = true;
          this._updateView();
      } else {
          this._roles = roles;
          this.checkPermission();
          this._updateView();
      }

  }

  /**
   * A template to show if the condition expression evaluates to false.
   */
  @Input()
  set showIfHasRoleElse(templateRef: TemplateRef<any> | null) {
    this._elseTemplateRef = templateRef;
    this._elseViewRef = null; // clear previous view if any.
    this.checkPermission();
    this._updateView();
  }

  private checkPermission() {
    // if (!this._user) {
    //   this._hasPermission = undefined;
    //   return;
    // }

    if (!this._roles) {
      this._hasPermission = true;
      return;
    }

    let hasRole = false;
    // console.log(this._user?.roles);
    this._user?.roles.forEach((role) => {
      this._roles?.forEach((_role) => {
        if (_role.role === role.authorityName) {
          if (
            !_role.entityName ||
            _role.entityName === role.projectName ||
            _role.entityName === role.organizationName
          ) {
            hasRole = true;
            // TODO break
          }
        }
      });
    });

    this._hasPermission = hasRole;
  }

  private _updateView() {
      // console.log('Class: showIfHasRoleDirective, Function: _updateView, Line 104 this._hasPermission' , this._hasPermission);
    if (this._hasPermission === undefined && this._user === undefined) {
      this._viewContainer.clear();
      return;
    }

    if (this._hasPermission === undefined) {
      return;
    }

    if (this._hasPermission) {
      if (!this._thenViewRef) {
        this._viewContainer.clear();
        this._elseViewRef = null;
        if (this._thenTemplateRef) {
          this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef);
        }
      }
    } else {
      if (!this._elseViewRef) {
        this._viewContainer.clear();
        this._thenViewRef = null;
        if (this._elseTemplateRef) {
          this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef);
        }
      }
    }
  }
}
