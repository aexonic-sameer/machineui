import { Component, AfterViewInit, EventEmitter, Output ,OnInit, ViewChild, ElementRef  } from '@angular/core';
import {  NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
declare var $: any;
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authntication.service';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';




@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [ TranslateService]
})
export class NavigationComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  public config: PerfectScrollbarConfigInterface = {};
  public UserDetail: any;
  public userrole: any;
  public email: any;
  public name: any;
  public authUserUID:any;
  public myProfileboolean:boolean = false;
  private analyticsURL: String = environment.analyticsURL;
  iframeUrl: any;
  public showSearch = false;
  options:any =[];
  selectedValue:any;
  languageID:any;
  public isLoading:boolean;
public srcuRl:any = 'https://miro.medium.com/fit/c/160/160/1*tAsmdxlEMMP6pRqRH4vF4A.jpeg'

  constructor(public translate: TranslateService,  private modalService: NgbModal,private router: Router,private toastr: ToastrService,private _authenticationService: AuthenticationService) {
    
  }
  LanguageChangeFunction(selectedValue:string){
      this.languageID = selectedValue;
      if (this.languageID == 1) {
        this.translate.use('US/en');
      }
      else if (this.languageID == 2) {
          this.translate.use('HI/hi');
      }
	  }

    ngOnInit() {
  
  }

  logout(){
    this.isLoading = true;
    this.iframeUrl = this.analyticsURL+"/auth/logout";
    setTimeout(()=>{
    localStorage.clear(); 
    this.router.navigate(['/authentication/login']);  
    this.isLoading = false;
			}, 5000);
    //  = this.analyticsURL+"/auth/logout";
  
  }
  ManageUserFunction(){
    this.router.navigate(['/bi/user-management']);
  }
  myProfileFunction(){
    this.router.navigate(['/authentication/update-password']);
  }
  goToHome(){
    this.router.navigate(['/bi/landing']);
	}




}
