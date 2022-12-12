import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(route, state, this.authService.user);
    if (this.authService.user?.roles?.some((role) => role.name === 'ADMIN')) {
      return true;
    } else if (this.authService.user && state.url !== '/users') {
      return true;
    } else if (this.authService.user && state.url === '/users') {
      return false;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
