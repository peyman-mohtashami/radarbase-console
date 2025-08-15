import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
// import { ManagementPortalUser } from '@rb/models';
import { Subject } from 'rxjs';
import {AuthService } from '../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import {ManagementPortalUser} from '../../../shared/models/auth.model';

/**
 * Add the template content to the DOM if user has the role.
 */
@Directive({
    selector: '[rbPermission]',
})
export class RbPermissionDirective implements OnDestroy {
  private _thenTemplateRef: TemplateRef<any> | null = null;
  private _elseTemplateRef: TemplateRef<any> | null = null;
  private _thenViewRef: EmbeddedViewRef<any> | null = null;
  private _elseViewRef: EmbeddedViewRef<any> | null = null;

  private _user?: ManagementPortalUser;
  private _roles?: { role: string; entityName?: string }[];
  private _hasPermission?: boolean;
  // private hasView = false;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<never>,
    private _viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this._thenTemplateRef = templateRef;
    this.authService
      .getUserFromStore()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (user) => {
          // console.log(user);
          this._user = user;
          this.checkPermission();
          this._updateView();
        },
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  @Input() set rbPermission(
    roles: { role: string; entityName?: string }[] | undefined
  ) {
    // if (roles === null || roles === undefined) {
    //   if (!this.hasView) {
    //     this._viewContainer.createEmbeddedView(this.templateRef);
    //     this.hasView = true;
    //   }
    //   return;
    // }
    this._roles = roles;
    this.checkPermission();
    this._updateView();
  }

  /**
   * A template to show if the condition expression evaluates to false.
   */
  @Input()
  set rbPermissionElse(templateRef: TemplateRef<any> | null) {
    // console.log('rbPermissionElse');
    // assertTemplate('ngIfElse', templateRef);
    this._elseTemplateRef = templateRef;
    this._elseViewRef = null; // clear previous view if any.
    this.checkPermission();
    this._updateView();
  }

  private checkPermission() {
    // this._hasPermission = true;
    // console.log(this._user, this._roles);

    if (!this._user) {
      this._hasPermission = undefined;
      return;
    }

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
    if (this._hasPermission === undefined) {
      return;
    }
    if (this._hasPermission) {
      if (!this._thenViewRef) {
        this._viewContainer.clear();
        this._elseViewRef = null;
        if (this._thenTemplateRef) {
          this._thenViewRef = this._viewContainer.createEmbeddedView(
            this._thenTemplateRef
          );
        }
      }
    } else {
      if (!this._elseViewRef) {
        this._viewContainer.clear();
        this._thenViewRef = null;
        if (this._elseTemplateRef) {
          this._elseViewRef = this._viewContainer.createEmbeddedView(
            this._elseTemplateRef
          );
        }
      }
    }
    // if (!this._roles) {
    //   if (!this.hasView) {
    //     this.viewContainer.createEmbeddedView(this.templateRef);
    //     this.hasView = true;
    //   }
    //   return;
    // }
    //
    // let hasRole = false;
    // console.log(this._user?.roles);
    // this._user?.roles.forEach((role) => {
    //   this._roles?.forEach((_role) => {
    //     if (_role.role === role.authorityName) {
    //       if (
    //         !_role.entityName ||
    //         _role.entityName === role.projectName ||
    //         _role.entityName === role.organizationName
    //       ) {
    //         hasRole = true;
    //         // TODO break
    //       }
    //     }
    //   });
    // });
    // if (hasRole && !this.hasView) {
    //   this.viewContainer.createEmbeddedView(this.templateRef);
    //   this.hasView = true;
    // } else if (!hasRole && this.hasView) {
    //   this.viewContainer.clear();
    //   this.hasView = false;
    // }
  }
}

// function assertTemplate(property: string, templateRef: TemplateRef<any>|null): void {
//   const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
//   if (!isTemplateRefOrNull) {
//     throw new Error(`${property} must be a TemplateRef, but received '${stringify(templateRef)}'.`);
//   }
// }
