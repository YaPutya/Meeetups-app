import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMeetupsComponent } from './components/admin/components/all-meetups/all-meetups.component';
import { MyMeetupsComponent } from './components/admin/components/my-meetups/my-meetups.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    component: ProjectDescriptionComponent,
    path: 'about',
  },
  { path: 'allMeetups', component: AllMeetupsComponent },
  { path: 'myMeetups', component: MyMeetupsComponent },
  {
    component: LoginComponent,
    path: 'login',
  },
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/admin/admin.module').then((m) => m.AdminModule),
  },
  // {
  //   path: '*', redirectTo: 'login'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
