import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BehaviorSubject, filter, Observable, switchMap, map} from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/user';
import { Meetups } from '../../meetups';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-my-meetups',
  templateUrl: '../all-meetups/all-meetups.component.html',
  styleUrls: ['../all-meetups/all-meetups.component.scss']
})
export class MyMeetupsComponent {
  conditions: boolean[] = [];
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private http: HttpClient
  ) {}
  updateMeetup: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  
  allMeetups: Observable<Meetups[]> = this.updateMeetup.pipe(
    switchMap(() => this.adminService.getAllMeetups()),
    map((meetups: Meetups[]) => meetups.filter((meetup => meetup.users?.some((user: User) => user.id === this.authService.user?.id)))),
    map((meetups) => meetups.sort((a,b) => a.id - b.id) )
    );

  toggle(i: number) {
    this.conditions[i] = !this.conditions[i];
  }
  
  isSubscribeToMeetup(meetup: Meetups): boolean {
    return meetup.users.some((user) => user.id === this.authService.user?.id);
  }

  subscribeMeetup(meetup: Meetups) {
    this.adminService
      .subscribeMeetups(meetup)
      .subscribe(() => this.updateMeetup.next(true));
  }

  unSubscribeMeetup(meetup: Meetups) {
    this.adminService
      .unSubscribeMeetups(meetup)
      .subscribe(() => this.updateMeetup.next(true));
  }

}
