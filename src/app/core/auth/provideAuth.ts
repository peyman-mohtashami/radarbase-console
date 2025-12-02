import {AuthService} from "./services/auth.service";
import {map} from "rxjs/operators";
import {
  EnvironmentProviders,
  importProvidersFrom,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from "@angular/core";
import {JwtModule} from "@auth0/angular-jwt";
import {StorageService} from "../storage/services/storage.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {ServerErrorInterceptor} from "./interceptors/server-error.interceptor";
import {provideRouter} from "@angular/router";
import {authRoutes} from "./auth.routes";

const authInitializerFn = (authService: AuthService) => {
  return () => authService.init().pipe(map(() => true));
};

export function provideAuth(): EnvironmentProviders {

  return makeEnvironmentProviders([
    provideRouter(authRoutes),
    importProvidersFrom(JwtModule.forRoot({
      config: { tokenGetter: StorageService.getAccessToken },
    })),
    provideAppInitializer(() => {
      const initializer = authInitializerFn(inject(AuthService));
      return initializer();
    }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
  ]);
}
