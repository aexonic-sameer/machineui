import { Routes } from '@angular/router';
import { statisticalhistoryComponent } from './statistical-history/statistical-history.component';

import { editUserComponent } from './users/edit-user/edit-user.component';
import { homeComponent } from './home/home.component';
import { AuthGuard } from '../_guards';

import { userlistComponent } from './users/user-list/user-list.component';
import { addUserComponent } from './users/add-user/add-user.component';
import { productlistComponent } from './product-tree/product-list/product-list.component';
import { productaddComponent } from './product-tree/product-add/product-add.component';
import { settingsComponent } from './settings/settings.component';
import { producteditComponent } from './product-tree/product-edit/product-edit.component';
export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'statistical-history',
        component: statisticalhistoryComponent
        
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'user-management',
        component: userlistComponent,
       
        data: {
          title: 'Greyscale AI',
        }
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'adduser',
        component: addUserComponent,
       
        data: {
          title: 'Greyscale AI',
        }
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'edituser',
        component: editUserComponent,
       
        data: {
          title: 'Greyscale AI',
        }
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'home',
        component: homeComponent
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'product',
        component: productlistComponent
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'product-add',
        component: productaddComponent
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'product-edit',
        component: producteditComponent
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'settings',
        component: settingsComponent
      },
    ]
  }

];
