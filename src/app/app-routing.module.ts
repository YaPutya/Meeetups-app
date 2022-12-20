import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMeetupsComponent } from './components/admin/components/all-meetups/all-meetups.component';
import { MyMeetupsComponent } from './components/admin/components/my-meetups/my-meetups.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { AuthGuard } from './guards/auth.guard';
// import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'about', component: ProjectDescriptionComponent },
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
    path: 'login',
    component: LoginComponent,
    // canActivate: [LoginGuard], если понадобится
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
    component: NotFoundComponent,
    pathMatch: 'full',
    // redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
