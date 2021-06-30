import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { LoginComponent } from './authentication/login/login.component';
export const Approutes: Routes = [
  
  { path: '', redirectTo: '/authentication/login',  pathMatch: 'full' },
  
 

  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'machine',
        loadChildren: './components/components.module#componentsModule'
      },
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];

