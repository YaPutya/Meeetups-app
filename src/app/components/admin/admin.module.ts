import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MyMeetupsComponent } from './components/my-meetups/my-meetups.component';
import { UsersComponent } from './components/users/users.component';
import { AllMeetupsComponent } from './components/all-meetups/all-meetups.component';

@NgModule({
  declarations: [
    MyMeetupsComponent,
    UsersComponent,
    AllMeetupsComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
