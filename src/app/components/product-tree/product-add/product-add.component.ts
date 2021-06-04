import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterMethods } from "../../../services/toaster-methods.service";
import { AuthenticationService } from '../../../services/authntication.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash-es'

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  providers: [AuthenticationService,ToasterMethods]
  
})
export class productaddComponent implements OnInit {

	file_Input:any;
	imageUrl:any;
	constructor( private toastr: ToastrService,private router: Router,private _authenticationService: AuthenticationService) {
	
	}

	ngOnInit() {
		
	}

	

	gotoProductList(){
		this.router.navigate(['/machine/product']);
	}


}
