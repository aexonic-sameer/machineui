import { Component,OnInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authntication.service";
import { ToastrService } from "ngx-toastr";
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
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
  public loginObj:any={};
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private _authenticationService: AuthenticationService,
    private _mqttService: MqttService
  ) {
  
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

 

   login(): void {
    this.loginObj = {
        "userName":this.username,
        "password":this.password,
        "responseTopic": "authentication_"+this.username

      }
    this._mqttService.unsafePublish('grayscale_input', JSON.stringify(this.loginObj), { qos: 0, retain: false })

    this.subscription = this._mqttService.observe('grayscale_output').subscribe((message: IMqttMessage) => {
      let obj = JSON.parse(message.payload.toString());
      console.log(obj)
      
      let res = true;
      if(res){
          let demoObj = {
            "name": "Afjal",
            "email": "admin1@gmail.com",
            "role": "Admin",
            "accessLevel": "Engineer",
            "uniqueID":"edr-343er43rr3-rerr34rwr-432"
          }
          localStorage.setItem('userRole', demoObj.role);
          localStorage.setItem('uID', demoObj.uniqueID);
          localStorage.setItem('accessLevel', demoObj.accessLevel);
          this.toastr.success('Logged in successfully');
          this.router.navigate(["/machine/home"]);
          this.subscription.unsubscribe();
        }else{
          this.toastr.error('plese try again');
      }
  });
  }
  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
}
