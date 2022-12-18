import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  deleteMeetups(meetup: Meetups) {
    return this.http.delete<Meetups>(`${this.authService.baseUrl}/meetup`, {
      params: {
        id: meetup.id,
      },
    });
  }

  createMeetup(data: any) {
    console.log(data, 5555)
    return this.http.post<any>(`${this.authService.baseUrl}/meetup`, 
        data
    );
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
