import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  ngOnInit(): void {
    this.initForm();
    this.myMeetupsReactiveForm.valueChanges.subscribe((value) =>
	console.log(`${value.name}: ${value.date}`)
);
  }

  initForm() {
    this.myMeetupsReactiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/[А-я]/)]],
      date: [''],
      time: [''],
      location: [''],
      short_description: [''],
      long_description: [''],
      target_audience: [''],
      need_to_know: [''],
      will_happen: [''],
      reason_to_come: [''],
    });
  }

  onSubmit() {
    if (this.myMeetupsReactiveForm.invalid) {
      return;
    }
    console.log(this.myMeetupsReactiveForm.value);
   }
}




