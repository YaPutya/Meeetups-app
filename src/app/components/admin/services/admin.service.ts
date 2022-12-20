import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Meetups } from '../meetups';
import { AuthService } from 'src/app/services/auth.service';
import { RoleUser, User } from 'src/app/user';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { RegistrationDto } from '../components/users/users.component';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  meetups: any;
  private _allUsersBehSubj: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllMeetups() {
    return this.http.get<Meetups[]>(`${this.authService.baseUrl}/meetup`)
    // .pipe(
    //   map((meetups) => {
    //     return meetups.filter((meetup) => meetup.owner !== null);
    //   })
    // );
  }

  getAllUsers(): Observable<User[]> {
    // return this.http.get<User[]>(`${this.authService.baseUrl}/user`);
    return this._allUsersBehSubj.pipe(
      switchMap((_) =>
        this.http.get<User[]>(`${this.authService.baseUrl}/user`)
      ),
      map((users) => {
        return users.sort((userA, userB) => userA.id - userB.id);
      })
    );
  }

  subscribeMeetups(meetup: Meetups) {
    return this.http.put<Meetups>(`${this.authService.baseUrl}/meetup`, {
      idMeetup: meetup.id,
      idUser: this.authService.user?.id,
    });
  }

  unSubscribeMeetups(meetup: Meetups) {
    return this.http.delete<Meetups>(`${this.authService.baseUrl}/meetup`, {
      body: {
        idMeetup: meetup.id,
        idUser: this.authService.user?.id,
      },
    });
  }

  createMeetup(data: any) {
    console.log(data, 5555);
    return this.http.post<any>(`${this.authService.baseUrl}/meetup`, data);
  }

  deleteMeetups(id: number) {
    return this.http.delete<Meetups>(
      `${this.authService.baseUrl}/meetup/${id}`
    );
  }

  editMeetups(meetup: Meetups) {
    console.log(meetup, 4444);
    return this.http.put<Meetups>(
      `${this.authService.baseUrl}/meetup/${meetup.id}`,
      {
        name: meetup.name,
        description: meetup.description,
        time: meetup.time,
        location: meetup.location,
        duration: meetup.duration,
        target_audience: meetup.target_audience,
        need_to_know: meetup.need_to_know,
        will_happen: meetup.will_happen,
        reason_to_come: meetup.reason_to_come,
      }
    );
  }

  editUsers(user: User) {
    return this.http.put<User>(`${this.authService.baseUrl}/user/${user.id}`, {
      email: user.email,
      password: user.password,
      fio: user.fio,
    });
  }

  editRoles(role: RoleUser, user: User): Observable<User> {
    return this.http
      .post<User>(`${this.authService.baseUrl}/user/role`, {
        names: [role],
        userId: user.id,
      })
      .pipe(
        tap((user) => {
          this._allUsersBehSubj.next(true);
        })
      );
  }

  deleteUsers(id: number) {
    return this.http.delete<User>(`${this.authService.baseUrl}/user/${id}`);
  }

  addUser(userDto: RegistrationDto): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(
        `${this.authService.baseUrl}/auth/registration`,
        {
          email: userDto.email,
          password: userDto.password,
          fio: userDto.fio,
        }
      )
      .pipe(
        tap((user) => {
          this._allUsersBehSubj.next(true);
        })
      );
  }
}
