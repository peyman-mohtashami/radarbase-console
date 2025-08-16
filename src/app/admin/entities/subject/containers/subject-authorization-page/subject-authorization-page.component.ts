// import {Component, OnInit} from '@angular/core';
// import {ActivatedRoute} from '@angular/router';
//
// import {AuthorizationService} from "../../services/authorization.service";
// import {StorageItem} from "../../../../enums/storage-item";
// import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
// import {NgIf} from "@angular/common";
// import {MatCard, MatCardContent} from "@angular/material/card";
// import {TranslatePipe} from "@ngx-translate/core";
// import {MessageBoxComponent} from "../../../../../core/rb-message/components/message-box/message-box.component";
// import {MatButton} from "@angular/material/button";
// // import { StorageItem } from "../../../../../shared/enums/storage-item";
// // import {StorageItem} from "@app/shared/enums/storage-item";
//
// @Component({
//   selector: 'rb-subject-authorization-page',
//   templateUrl: './subject-authorization-page.component.html',
//   imports: [
//     LoaderComponent,
//     NgIf,
//     MatCard,
//     MatCardContent,
//     TranslatePipe,
//     MessageBoxComponent,
//     MatButton
//   ]
// })
// export class SubjectAuthorizationPageComponent implements OnInit {
//   isLoading = true;
//   error?: any;
//
//   sourceType?: string;
//   project?: string;
//   authEndpointUrl?: string;
//
//   constructor(
//     private activatedRoute: ActivatedRoute,
//     private userService: AuthorizationService,
//   ) {}
//
//   ngOnInit(): void {
//     const {token, secret} = this.activatedRoute.snapshot.queryParams;
//     if(!token || !secret){
//       this.error = 'SHARED.AUTHORIZATION_PAGE.ERROR.badUrl';
//       this.isLoading = false;
//       return;
//     }
//     localStorage.setItem(StorageItem.AUTHORIZATION_TOKEN, token);
//     this.userService.getAuthEndpointUrl({secret}, token).subscribe({
//       next: (resp) => {
//         if (resp.authEndpointUrl) {
//           this.sourceType = resp.sourceType;
//           this.project = resp.project.id;
//           this.authEndpointUrl = resp.authEndpointUrl;
//           this.isLoading = false;
//         }
//       },
//       error: (error) => {
//         this.isLoading = false;
//         if(error.status === 400 && error.error.error === 'registration_not_found'){
//           this.error = 'SHARED.AUTHORIZATION_PAGE.ERROR.registrationNotFound';
//           return;
//         }
//         if(error.status === 400 && error.error.error === 'bad_secret'){
//           this.error = 'SHARED.AUTHORIZATION_PAGE.ERROR.badSecret';
//           return;
//         }
//         this.error = error.error?.error_description || error.message || error;
//       },
//     });
//   }
//
//   authorize(): void {
//     if(this.authEndpointUrl) {
//       window.location.href = this.authEndpointUrl;
//     }
//   }
// }
