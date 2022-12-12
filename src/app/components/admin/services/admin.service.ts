import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meetups } from '../meetups';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllMeetups() {
    return this.http.get<Meetups[]>(`${this.authService.baseUrl}/meetup`);
  }

  subscribeMeetups(meetup: Meetups) {
    return this.http.put<Meetups>(`${this.authService.baseUrl}/meetup`, {
      idMeetup: meetup.id,
      idUser: this.authService.user?.id,
    });
  }

  unSubscribeMeetups(meetup: Meetups) {
    return this.http.delete<Meetups>(
      `${this.authService.baseUrl}/meetup`,
      {
        body: {
          idMeetup: meetup.id,
          idUser: this.authService.user?.id,
        },
      }
    );
  }
}
