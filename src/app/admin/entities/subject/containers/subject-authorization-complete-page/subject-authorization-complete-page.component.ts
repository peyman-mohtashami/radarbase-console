// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
//
// import { AuthorizationService } from '../../services/authorization.service';
// import { StorageItem } from '../../../../enums/storage-item';
// import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
// import {MatCard, MatCardContent} from "@angular/material/card";
// import {NgIf} from "@angular/common";
// import {TranslatePipe} from "@ngx-translate/core";
// import {MessageBoxComponent} from "../../../../../core/rb-message/components/message-box/message-box.component";
// // import {AuthService} from "@app/auth/services/auth.service";
// // import {StorageItem as SharedStorageItem} from "@app/shared/enums/storage-item";
// // import {StorageItem} from "@app/auth/enums/storage-item";
//
// @Component({
//   selector: 'rb-subject-authorization-complete-page',
//   templateUrl: './subject-authorization-complete-page.component.html',
//   imports: [
//     LoaderComponent,
//     MatCard,
//     MatCardContent,
//     NgIf,
//     TranslatePipe,
//     MessageBoxComponent
//   ]
// })
// export class SubjectAuthorizationCompletePageComponent implements OnInit {
//   isLoading = true;
//   error?: string;
//
//   sourceType?: string;
//   project?: string;
//
//   constructor(
//     private activatedRoute: ActivatedRoute,
//     private router: Router,
//     private authorizationService: AuthorizationService
//   ) // public authService: AuthService
//   {}
//
//   ngOnInit(): void {
//     this.isLoading = true;
//     const queryParams = this.activatedRoute.snapshot.queryParams;
//     const storedParams = this.authorizationService.getUserAuthParams();
//     const state = this.getOrDefault(queryParams['state'], storedParams.state);
//     const oauth_token = this.getOrDefault(
//       queryParams['oauth_token'],
//       storedParams.oauth_token
//     );
//     const oauth_verifier = this.getOrDefault(
//       queryParams['oauth_verifier'],
//       storedParams.oauth_verifier
//     );
//     const oauth_token_secret = this.getOrDefault(
//       queryParams['oauth_token_secret'],
//       storedParams.oauth_token_secret
//     );
//     const code = this.getOrDefault(queryParams['code'], storedParams.code);
//
//     let stateOrToken = state;
//     if (!state) {
//       stateOrToken = localStorage.getItem(StorageItem.AUTHORIZATION_TOKEN);
//     }
//     if (!stateOrToken) {
//       this.error = 'SHARED.AUTHORIZATION_COMPLETE_PAGE.ERROR.badUrl';
//       this.isLoading = false;
//       return;
//     }
//     const authorizeRequest = {
//       code,
//       oauth_token,
//       oauth_verifier,
//       oauth_token_secret,
//     };
//     this.authorizationService
//       .authorizeUser(authorizeRequest, stateOrToken)
//       .subscribe({
//         next: (resp) => {
//           this.sourceType = resp.sourceType;
//           this.project = resp.project.id;
//           if (resp.persistent) {
//             this.isLoading = false;
//           } else {
//             const lastLocation = JSON.parse(
//               localStorage.getItem(StorageItem.LAST_LOCATION) || '{}'
//             );
//             this.router
//               .navigate([lastLocation.url || '/'], {
//                 queryParams: lastLocation.params,
//               })
//               .then(() => this.authorizationService.clearUserAuthParams());
//           }
//         },
//         error: (error) => {
//           this.isLoading = false;
//           // TODO translate errors
//           this.error = error.error?.error_description || error.message || error;
//         },
//       });
//   }
//
//   getOrDefault(value: any, defaultValue: any) {
//     return value ? value : defaultValue;
//   }
// }
