import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterMethods } from "../../../services/toaster-methods.service";
import { AuthenticationService } from '../../../services/authntication.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [AuthenticationService,ToasterMethods]
  
})
export class addUserComponent implements OnInit {
public userName;
public password;
public accessLevel:any ='';
public userLanguage:any ='';


	constructor( private toastr: ToastrService,private router: Router,private _authenticationService: AuthenticationService) {
	
	}
	ngOnInit() {
	}
	cancelButton(){
			this.router.navigate(['/machine/user-management']);
		}
	saveuserdetails(){
		this.router.navigate(['/machine/user-management']);
	}
	
    }
