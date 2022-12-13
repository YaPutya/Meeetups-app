import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  myMeetupsReactiveForm!: FormGroup<{
    name: FormControl<string | null>;
    date: FormControl<string | null>;
    time: FormControl<string | null>;
    location: FormControl<string | null>;
    short_description: FormControl<string | null>;
    long_description: FormControl<string | null>;
    target_audience: FormControl<string | null>;
    need_to_know: FormControl<string | null>;
    will_happen: FormControl<string | null>;
    reason_to_come: FormControl<string | null>;
  }>;

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
    private http: HttpClient, 
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
  }

  initForm() {
    this.myMeetupsReactiveForm = this.fb.group({
      name: [''],
      date: ['23.03.22'],
      time: ['16:06'],
      location: [''],
      short_description: [''],
      long_description: [''],
      target_audience: [''],
      need_to_know: [''],
      will_happen: [''],
      reason_to_come: [''],
    });
  }
}
