// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   CanDeactivate,
//   Router,
//   RouterStateSnapshot,
//   UrlTree,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoginGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//       console.log(route, state)
//     if (this.authService.user) {
//       return false;
//     } else {
//       this.router.navigate(['allMeetups']);
//       return true;
//     }
//   }
// }
