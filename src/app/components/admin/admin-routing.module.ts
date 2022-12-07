import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { HomeMeetupsAllComponent } from './components/home-meetups-all/home-meetups-all.component';
import { MyMeetupsComponent } from './components/my-meetups/my-meetups.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', component: HeaderAdminComponent,
  children: [
    { path: 'allMeetups', component: HomeMeetupsAllComponent },
    { path: 'myMeetups', component: MyMeetupsComponent },
    { path: 'users', component: UsersComponent },
    { path: '', redirectTo: 'allMeetups', pathMatch: 'full' },
  ]
} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
