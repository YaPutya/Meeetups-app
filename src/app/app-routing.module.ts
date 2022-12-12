import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMeetupsComponent } from './components/admin/components/all-meetups/all-meetups.component';
import { MyMeetupsComponent } from './components/admin/components/my-meetups/my-meetups.component';
import { UsersComponent } from './components/admin/components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { AuthGuard } from './guards/auth.guard';
// import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    component: ProjectDescriptionComponent,
    path: 'about',
  },
  {
    path: 'allMeetups',
    canActivate: [AuthGuard],
    component: AllMeetupsComponent,
  },
  {
    path: 'myMeetups',
    canActivate: [AuthGuard],
    component: MyMeetupsComponent,
  },
  {
    component: LoginComponent,
    path: 'login',
    // canActivate: [LoginGuard],
  },
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
