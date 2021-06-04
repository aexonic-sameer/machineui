import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterMethods } from "../../../services/toaster-methods.service";
import { AuthenticationService } from '../../../services/authntication.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [AuthenticationService,ToasterMethods]
  
})
export class editUserComponent implements OnInit {
public successmsg;
public errormsg;
public authUserUID:any;
public companyAllCollection:any;
public filtered_array:any = [];
public companyData:any = [];
public dashboardTabArray:any;
public finaldashboardTabArray:any =[];
public noRecord:boolean = false;
public userfirstName:any;
public userlastname:any;
public userJobTitle:any;
public userEmail:any;
public userMobileNumber:any;
public userCompanyName:any;
public userRole:any;
public userID:any; 
dataList: Array<any> = [];
public userDetails:any;

	constructor( private toastr: ToastrService,private router: Router,private _authenticationService: AuthenticationService) {
	
	}

	ngOnInit() {
	}

	backButton(){
		this.router.navigate(['/bi/user-management']);
	}
	updateuserdetails(){
		let updateuserDetails = {
				"id": this.userID,
				"firstName": this.userfirstName,
				"lastName": this.userlastname,
				"jobTitle": this.userJobTitle,
				"mobileNumber": this.userMobileNumber,
				"email": this.userEmail
			}
		this._authenticationService.setHeader(localStorage.getItem('token'))
		this._authenticationService.updateUserDetails(updateuserDetails)
		.subscribe(
					(data) => {
							this.toastr.success('User updated successfully');
							this.router.navigate(['/bi/user-management']);
							},
					(error) => {
								this.router.navigate(['/authentication/login']);
								localStorage.clear();
							},
					
					);
	}

}
