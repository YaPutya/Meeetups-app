import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/user';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  allUsers: Observable<User[]> = this.adminService
    .getAllUsers()
    .pipe(tap(console.log));

  getRole(user: User) {
    return user?.roles?.some((elem) => elem.name === 'ADMIN')
      ? 'admin'
      : 'user';
  }
}
