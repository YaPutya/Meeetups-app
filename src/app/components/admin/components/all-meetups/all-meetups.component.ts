import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  showForm: boolean = false;

  updateMeetup: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  enteredSearchValue: string = '';

  searchText: string = '';

  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

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
    switchMap(() => {
      return this.adminService.getAllMeetups();
    }),
    map((meetups) => meetups.sort((a, b) => a.id - b.id))
  );

  showHideForm() {
    this.showForm = !this.showForm;
  }

  onSearchTextChanged(searchEvent: any) {
    // console.log('...', searchEvent.target.value);
    this.searchText = searchEvent.target.value;
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    // console.log(this.searchText);
  }

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.loading$ = this.router.events.pipe(
    //   filter(
    //     (e) =>
    //       e instanceof NavigationStart ||
    //       e instanceof NavigationEnd ||
    //       e instanceof NavigationCancel ||
    //       e instanceof NavigationError
    //   ),
    //   map((e) => e instanceof NavigationStart)
    // );
  }
}
