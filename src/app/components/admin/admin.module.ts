import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { MyMeetupsComponent } from './components/my-meetups/my-meetups.component';
import { UsersComponent } from './components/users/users.component';
import { AllMeetupsComponent } from './components/all-meetups/all-meetups.component';
import { FormMeetupComponent } from './components/form-meetup/form-meetup.component';

@NgModule({
  declarations: [
    MyMeetupsComponent,
    UsersComponent,
    AllMeetupsComponent,
    FormMeetupComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AdminModule {}
