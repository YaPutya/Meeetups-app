import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
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

  editedUserId: number | undefined;
  isEditing: boolean = false;

  updateUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  allUsers: Observable<User[]> = this.updateUser.pipe(
    switchMap(() => this.adminService.getAllUsers())
  );

  getRole(user: User) {
    return user?.roles?.some((elem) => elem.name === 'ADMIN')
      ? 'admin'
      : 'user';
  }

  editUser(id: number) {
    this.isEditing = true;
    this.editedUserId = id;
  }

  saveEditUser(user: User) {
    this.adminService.editUsers(user).subscribe(() => {
      this.editedUserId = undefined;
    });
  }

  deleteUser(id: number) {
    this.adminService.deleteUsers(id).subscribe(() => {
      this.updateUser.next(true);
    });
  }

  // addUser(user: User) {
  //   this.adminService.addUsers(user).subscribe();
  // }

  changeRole(role: string, user: User) {
    console.log(role, 333)
    // if (user?.roles && user.roles[0] && user.roles[0].name) {
      // user.roles[0].name = role.toUpperCase();
      this.adminService.editRoles(role.toUpperCase(), user).subscribe()
    // }
  }
}
