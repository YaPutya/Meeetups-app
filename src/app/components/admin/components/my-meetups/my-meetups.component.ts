import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, filter, Observable, switchMap, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/user';
import { Meetups } from '../../meetups';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-my-meetups',
  templateUrl: 'my-meetups.component.html',
  styleUrls: ['my-meetups.component.scss'],
})
export class MyMeetupsComponent implements OnInit {
  conditions: boolean[] = [];

  showForm: boolean = false;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}
  updateMeetup: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  allMeetups: Observable<Meetups[]> = this.updateMeetup.pipe(
    switchMap(() => this.adminService.getAllMeetups()),
    map((meetups: Meetups[]) =>
      meetups.filter((meetup) =>
        meetup.users?.some(
          (user: User) => user.id === this.authService.user?.id
        )
      )
    ),
    map((meetups) => meetups.sort((a, b) => a.id - b.id))
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

  deleteMeetup(meetup: Meetups) {
    this.adminService
      .deleteMeetups(meetup)
      .subscribe(() => this.updateMeetup.next(true));
  }

  showHideForm() {
    this.showForm = !this.showForm;
  }

  ngOnInit(): void {}

  //  remove(meetup: Meetups) {
  //   this.adminService.removeMeetupsById(meetup.id);
  //  }
}
