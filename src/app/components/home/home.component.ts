import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authntication.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from "lodash-es";
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthenticationService]
  
})
export class homeComponent implements OnInit {
public successmsg;
public errormsg;
public authUserUID:any;
public companyAllCollection:any;
public filtered_array:any = [];
public companyData:any = [];
public dashboardTabArray:any;
public finaldashboardTabArray:any =[];
public noRecord:boolean = false;
public userName:any;
iframeUrl: string="";
private analyticsURL: String = environment.analyticsURL;

public urlLink:any;
public srcuRl:any ='';

constructor( private toastr: ToastrService,private router: Router,private _authenticationService: AuthenticationService) {
	
	}



	ngOnInit():void {

}

}
