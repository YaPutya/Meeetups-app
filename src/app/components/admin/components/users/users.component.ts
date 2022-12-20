import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RoleUser, User } from 'src/app/user';
import { AdminService } from '../../services/admin.service';

// interface SelectOption {
//   value: RoleUser;
//   text: 'Admin' | 'User';
// }

export interface RegistrationDto {
  email: string;
  fio: string;
  password: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  isAddUser: boolean = false;

  myUsersReactiveForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    fio: new FormControl('', [Validators.required]),
  });

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  editedUserId: number | undefined;
  isEditing: boolean = false;
  // selectOptions: SelectOption[] = [
  //   { value: 'ADMIN', text: 'Admin' },
  //   { value: 'USER', text: 'User' }
  // ];

  updateUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  allUsers: Observable<User[]> = this.updateUser.pipe(
    switchMap(() => this.adminService.getAllUsers())
  );

  onSubmitAddUser() {
    const registrationUserDto: RegistrationDto = {
      email: this.myUsersReactiveForm.value.email as string,
      fio: this.myUsersReactiveForm.value.fio as string,
      password: this.myUsersReactiveForm.value.password as string,
    };

    this.addUser(registrationUserDto);

    this.isAddUser = !this.isAddUser;
  }

  getRole(user: User): RoleUser {
    const roleUser = user?.roles?.some((elem) => elem.name === 'ADMIN')
      ? 'ADMIN'
      : 'USER';

    return roleUser;
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

  addUser(userDto: RegistrationDto) {
    this.adminService.addUser(userDto).subscribe();
  }

  changeRole(role: RoleUser, user: User) {
    console.log(role, 333);
    console.log(user, 'user');

    // if (user?.roles && user.roles[0] && user.roles[0].name) {
    // user.roles[0].name = role.toUpperCase();
    this.adminService.editRoles(role, user).subscribe();
    // }
  }

  isCurrentRoleByUser(role: RoleUser, user: User): boolean {
    if (!user.roles) {
      return false;
    }

    const findRole = user.roles.find((roleUser) => roleUser.name === role);

    return findRole !== undefined;
  }

  isSelectedOptionRole(role: RoleUser, user: User): string {
    return this.isCurrentRoleByUser(role, user) ? 'selected' : '';
  }
}
