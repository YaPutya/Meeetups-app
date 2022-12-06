import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';

const routes: Routes = [
  {
    component: ProjectDescriptionComponent,
    path: 'about',
  },
  {
    component: LoginComponent,
    path: 'login',
  },
  // {
  //   component: AppComponent,
  //   path: '/',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
