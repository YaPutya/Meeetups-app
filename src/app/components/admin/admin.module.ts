import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeMeetupsAllComponent } from './components/home-meetups-all/home-meetups-all.component';
import { MyMeetupsComponent } from './components/my-meetups/my-meetups.component';
import { UsersComponent } from './components/users/users.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';


@NgModule({
  declarations: [
    HomeMeetupsAllComponent,
    MyMeetupsComponent,
    UsersComponent,
    HeaderAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
