import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authntication.service';

import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash'

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
  providers: [AuthenticationService]
  
})
export class sidemenuComponent implements OnInit {
public authUserUID:any;
public userName:any;
public filepath:any;
public imagePath:any;
public displayImage:any=[];
public image_view:any;
public urlLink:any;

	constructor( private toastr: ToastrService,private router: Router,private _authenticationService: AuthenticationService) {

	}

	ngOnInit() {
		
	}

  goToUsers(){
    this.router.navigate(["/machine/user-management"]);
  }
  goToHome(){
    this.router.navigate(["/machine/home"]);
  }
  goToProducts(){
    this.router.navigate(["/machine/product"]);
  }
  goTostatisticalhistory(){
    this.router.navigate(["/machine/statistical-history"]);
  }
  goToSettings(){
    this.router.navigate(["/machine/settings"]);
  }
    }
