import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { HomeMeetupsAllComponent } from './components/home-meetups-all/home-meetups-all.component';
import { MyMeetupsComponent } from './components/my-meetups/my-meetups.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', component: HomeMeetupsAllComponent },
  { path: '', component: HeaderAdminComponent },
  { path: '', component: MyMeetupsComponent },
  { path: '', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
