import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterMethods } from "../../../services/toaster-methods.service";
import { AuthenticationService } from '../../../services/authntication.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash-es'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [AuthenticationService,ToasterMethods]
  
})
export class userlistComponent implements OnInit {


	constructor( private toastr: ToastrService,private router: Router,private _authenticationService: AuthenticationService) {
	
	}

	ngOnInit() {
		
	}

	
	addNewUser(){
		this.router.navigate(['/machine/adduser']);
	}

	editUser(user){
		this.router.navigate(['/machine/edituser']);
	}


}
