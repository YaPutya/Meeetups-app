import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Meetups } from '../meetups';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  meetups: any;
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllMeetups() {
    return this.http.get<Meetups[]>(`${this.authService.baseUrl}/meetup`);
  }

  getAllUsers() {
    return this.http.get<User[]>(`${this.authService.baseUrl}/user`);
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

  editRoles(role: string, user: User) {
    return this.http.put<User>(`${this.authService.baseUrl}/user/${user.id}`, {
      oldName: role === 'ADMIN' ? 'USER' : 'ADMIN',
      newName: role,
    });
  }

  deleteUsers(id: number) {
    return this.http.delete<User>(`${this.authService.baseUrl}/user/${id}`);
  }

  createMeetup(data: any) {
    console.log(data, 5555);
    return this.http.post<any>(`${this.authService.baseUrl}/meetup`, data);
  }

  // removeMeetupsById(id: number | undefined) {
  //   if (id === undefined) {
  //     throw new Error('id = undefined при вызове функции removeMeetupsById');
  //   }

  //   const findIdx = this.meetups.findIndex((meetups: { id: number; }) => meetups.id === id);

  //   if (findIdx !== -1) {
  //     this.meetups.splice(findIdx, 1);
  //   }
  // }
}
