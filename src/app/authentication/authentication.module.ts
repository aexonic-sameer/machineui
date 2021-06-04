import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './404/not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutes } from './authentication.routing';
import { updatePasswordComponent } from '../authentication/updatePassword/updatePassword.component';
@NgModule({
  imports: [CommonModule,RouterModule.forChild(AuthenticationRoutes),NgbModule,FormsModule],
  declarations: [NotFoundComponent,LoginComponent,updatePasswordComponent]
})
export class AuthenticationModule {}
