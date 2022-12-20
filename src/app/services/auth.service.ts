import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments';
import { map, } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../user';
export interface Role {
  names: string[];
  userId?: number;
}
@Injectable()
export class AuthService {
  baseUrl: string = `${environment.backendOrigin}`;

  isAdmin: boolean | undefined;

  constructor(private http: HttpClient, private routes: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((res) => {
          if (res.token) {
            localStorage.setItem('del_meetups_auth_token', res.token);
          }
          return null;
        })
      );
  }

  logout() {
    localStorage.removeItem('del_meetups_auth_token');
    this.routes.navigate(['login']);
  }

  parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  public get user(): User | null {
    const token = localStorage.getItem('del_meetups_auth_token');
    if (token) {
      const user: User = this.parseJwt(token);
      this.isAdmin = user?.roles?.some((role) => role.name === 'ADMIN');
      // console.log(user)
      return user;
    } else return null;
  }

  public get token(): string | null {
    return localStorage.getItem('del_meetups_auth_token');
  }
}

// Сохранение не через JWT, а через LOCAL(Пусть останется для красоты)

// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, of, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor(private router: Router) {}

//   setToken(token: string) {
//     localStorage.setItem('token', token);
//   }

//   getToken() {
//     return localStorage.getItem('token');
//   }

//   isLoggedIn() {
//     return this.getToken() !== null;
//   }

//   login(userInfo: {
//     email: string;
//     password: string;
//   }): Observable<string | boolean> {
//     if (
//       userInfo.email === 'admin1@mail.ru' &&
//       userInfo.password === 'password1'
//     ) {
//       this.setToken('dfhdkdfsdhnbdfg');
//       return of(true);
//     }
//     return throwError(() => new Error('Failed Login'));
//   }

//   logout() {
//     this.router.navigate(['login'])
//   }
// }
