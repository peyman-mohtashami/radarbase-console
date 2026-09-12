import {
  computed,
  Directive, effect,
  inject, input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {AuthService} from '../services/auth.service';

interface RequiredRole {
  role: string;
  entityName?: string;
}

@Directive({
  selector: '[appShowIfHasRole]',
})
export class PermissionDirective {

  private readonly authService = inject(AuthService);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  readonly appShowIfHasRole = input<RequiredRole[] | undefined>(undefined);
  readonly appShowIfHasRoleElse = input<TemplateRef<unknown> | null>(null);

  private readonly hasPermission = computed(() => {
    const roles = this.appShowIfHasRole();
    if (!roles) {
      return true;
    }

    const user = this.authService.user();
    return roles.some((required) =>
      user?.roles?.some((userRole) =>
        required.role === userRole.authorityName &&
        (!required.entityName ||
          required.entityName === userRole.projectName ||
          required.entityName === userRole.organizationName)
      )
    );
  });

  constructor() {
    effect(() => {
      const hasPermission = this.hasPermission();
      const elseTemplate = this.appShowIfHasRoleElse();

      this.viewContainer.clear();
      if (hasPermission) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else if (elseTemplate) {
        this.viewContainer.createEmbeddedView(elseTemplate);
      }
    });
  }
}
