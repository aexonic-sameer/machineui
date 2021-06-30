import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterMethods } from "../../../services/toaster-methods.service";
import { AuthenticationService } from '../../../services/authntication.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash'
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [AuthenticationService,ToasterMethods]
  
})
export class addUserComponent implements OnInit ,OnDestroy{
public userName;
public password;
public accessLevel:any ='';
public userLanguage:any ='';
private addNewUserSubscription: Subscription;
public userObj:any={};
public UID:any;

	constructor( private _mqttService: MqttService,private toastr: ToastrService,private router: Router,private _authenticationService: AuthenticationService) {
		this.UID = localStorage.getItem('uID');
		if (this.UID == '' || this.UID == null || this.UID == undefined) {
			this.toastr.error('Failed, Something went wrong');
			this.router.navigate(['/authentication/login']);
		} 
	}
	ngOnInit() {
	}
	ngOnDestroy(): void {
		this.addNewUserSubscription.unsubscribe();
	}
	
	cancelButton(){
		this.router.navigate(['/machine/user-management']);
	}
	saveuserdetails(){
		this.userObj = 
			{
				"accessLevel": this.accessLevel,
				"userName": this.userName,
				"password":this.password,
				"defaultLanguage": this.userLanguage
			}
			this._mqttService.unsafePublish('grayscale_adduser', JSON.stringify(this.userObj), { qos: 1, retain: true })
			this.addNewUserSubscription = this._mqttService.observe('grayscale_adduser').subscribe((message: IMqttMessage) => {
			  let obj = JSON.parse(message.payload.toString());
			  console.log(obj)
			  let res = true;
			  if(res){
				  this.toastr.success('User added successfully');
				  this.router.navigate(["/machine/user-management"]);
				  this.addNewUserSubscription.unsubscribe();
				}else{
				  this.toastr.error('plese try again');
			  }
		  });
	}
    }
