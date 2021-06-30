import { Routes } from '@angular/router';
import { NotFoundComponent } from './404/not-found.component';
import { LoginComponent } from './login/login.component';
import { updatePasswordComponent } from '../authentication/updatePassword/updatePassword.component';
export const AuthenticationRoutes: Routes = [
  
  {
    path: '',
    children: [
      // { path: '', redirectTo: '/login',  pathMatch: 'full' },
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'update-password',
        component: updatePasswordComponent
      },
    ]
  }
];
