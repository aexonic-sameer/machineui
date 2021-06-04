import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authntication.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginform = true;
  recoverform = false;
  public username: any;
  public password: any;
  public user_login_data = {};
  public IsLogin: boolean = true;
  public email: any;
  public token: any;
  public headers: any;
  public staySignIn: any;
  public isSessionExpire: boolean = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private _authenticationService: AuthenticationService
  ) {
  
  }

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  login() {
    // alert('hi')
    this.router.navigate(["/machine/home"]);
  }
 
}
