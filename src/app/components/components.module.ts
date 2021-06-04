import { NgModule } from '@angular/core';
import * as $ from 'jquery';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './components.routing';
import { statisticalhistoryComponent } from './statistical-history/statistical-history.component';
import { userlistComponent } from './users/user-list/user-list.component';
import { addUserComponent } from './users/add-user/add-user.component';
import { editUserComponent } from './users/edit-user/edit-user.component';
import { homeComponent } from './home/home.component';
import { urlPipesModule  } from '../authentication/pipe/url.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { sidemenuComponent } from './side-menu/side-menu.component';
import { productlistComponent } from './product-tree/product-list/product-list.component';
import { productaddComponent } from './product-tree/product-add/product-add.component';
import { producteditComponent } from './product-tree/product-edit/product-edit.component';

import { NgxImageZoomModule } from 'ngx-image-zoom';
import { settingsComponent } from './settings/settings.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NgbModule,
        RouterModule.forChild(ComponentsRoutes),
        PerfectScrollbarModule,
        ReactiveFormsModule,
        urlPipesModule,
        NgxImageZoomModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: httpTranslateLoader,
              deps: [HttpClient]
            }
          })
    ],
    providers: [
      ],
    declarations: [
        userlistComponent,
        statisticalhistoryComponent,
        addUserComponent,
        editUserComponent,
        homeComponent,
        sidemenuComponent,
        productlistComponent,
        productaddComponent,
        settingsComponent,
        producteditComponent
    ]
})

export class componentsModule { 
   
}
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }