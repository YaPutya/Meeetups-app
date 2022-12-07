import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, Role } from 'src/app/services/auth.service';
import { Meetups } from '../../meetups';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-all-meetups',
  templateUrl: './all-meetups.component.html',
  styleUrls: ['./all-meetups.component.scss']
})
export class AllMeetupsComponent implements OnInit{
  allMeetups: Observable<Meetups[]> = this.adminService.getAllMeetups()
  // allMeetups: Observable<Meetups[]> = of([ {
  //   id: 3,
  //   name: 'string',
  //   description: 'string',
  //   location: 'string',
  //   need_to_know: 'string',
  //   will_happen: 'string',
  //   reason_to_come: 'string',
  //   duration: 4,
  //   createdBy: 4'
  // }
  // ])

  constructor(private adminService: AdminService, 
    private authService: AuthService,
    private http: HttpClient) {}

  ngOnInit(): void {
    // this.http
    //   .post<Role>(`${this.authService.baseUrl}/login`, {}).subscribe(res => {
    //     this.authService.role = res;
    //   });
    // this.allMeetups = 
  }
}
