import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterMethods } from "../../../services/toaster-methods.service";
import { AuthenticationService } from '../../../services/authntication.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash-es'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [AuthenticationService,ToasterMethods]
  
})
export class productlistComponent implements OnInit {


	constructor( private toastr: ToastrService,private router: Router,private _authenticationService: AuthenticationService) {
	
	}

	ngOnInit() {
		
	}

	

	addNewProduct(){
		this.router.navigate(['/machine/product-add']);
	}
	editProductFunction(){
		this.router.navigate(['/machine/product-edit']);
	}
}
