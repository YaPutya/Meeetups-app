import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, switchMap, map } from 'rxjs';
import { AuthService, Role } from 'src/app/services/auth.service';
import { Meetups } from '../../meetups';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-all-meetups',
  templateUrl: './all-meetups.component.html',
  styleUrls: ['./all-meetups.component.scss'],
})
export class AllMeetupsComponent implements OnInit {
  conditions: boolean[] = [];

  updateMeetup: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

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

  allMeetups: Observable<Meetups[]> = this.updateMeetup.pipe(
    switchMap(() => this.adminService.getAllMeetups()),
    map((meetups) => meetups.sort((a,b) => a.id - b.id) )
  );

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // this.http
    //   .post<Role>(`${this.authService.baseUrl}/login`, {}).subscribe(res => {
    //     this.authService.role = res;
    //   });
    // this.allMeetups =
  }
}
