import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterMethods } from "../../../services/toaster-methods.service";
import { AuthenticationService } from '../../../services/authntication.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash'
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [AuthenticationService,ToasterMethods]
  
})
export class editUserComponent implements OnInit {
	public userName:any;
	public password:any='*******************';
	public accessLevel:any ='';
	public userLanguage:any ='';
	public UID:any;
	public editUserDetails:any;
	public updateUserObj:any;
	private editUserSubscription: Subscription;
	constructor(private _mqttService: MqttService, private toastr: ToastrService,private router: Router,private _authenticationService: AuthenticationService) {
		this.UID = localStorage.getItem('uID');
		if (this.UID == '' || this.UID == null || this.UID == undefined) {
			this.toastr.error('Failed, Something went wrong');
			this.router.navigate(['/authentication/login']);
		} else{
			this.editUserDetails = JSON.parse(localStorage.getItem('editUserDetails'))
			this.userName = this.editUserDetails.username;
			this.accessLevel = this.editUserDetails.AccessLevel;
			this.userLanguage = this.editUserDetails.defaultLanguage;
		}
	}

	ngOnInit() {
	}

	cancelButton(){
		this.router.navigate(['/machine/user-management']);
	}
	updateUserDetails(){
		this.updateUserObj = 
			{
				"accessLevel": this.accessLevel,
				"userName": this.userName,
				"defaultLanguage": this.userLanguage
			}
		this._mqttService.unsafePublish('grayscale_updateuser', JSON.stringify(this.updateUserObj), { qos: 1, retain: true })
		this.editUserSubscription = this._mqttService.observe('grayscale_updateuser').subscribe((message: IMqttMessage) => {
			let obj = JSON.parse(message.payload.toString());
			console.log(obj)
			let res = true;
			if(res){
				this.toastr.success('User updated successfully');
				this.router.navigate(["/machine/user-management"]);
				this.editUserSubscription.unsubscribe();
				}else{
				this.toastr.error('plese try again');
			}
	  });
	}
}
