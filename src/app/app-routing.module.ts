import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    component: ProjectDescriptionComponent,
    path: 'about',
  },
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
    loadChildren: () =>
      import('./components/admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
