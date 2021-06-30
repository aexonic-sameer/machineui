import { Component, AfterViewInit,OnInit, EventEmitter, Output } from '@angular/core';
import {  NgbModal, ModalDismissReasons,  NgbPanelChangeEvent,  NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  public config: PerfectScrollbarConfigInterface = {};
  public userRole:any;
  public accessLevel:any;
  public UID:any;
  public showSearch = false;
  public pstTime:any;
  public menus = new Array();
  public submenu = new Array();
  constructor(private modalService: NgbModal,private router: Router,private toastr: ToastrService) {
    this.UID = localStorage.getItem('uID');
		if (this.UID == '' || this.UID == null || this.UID == undefined) {
			this.toastr.error('Failed, Something went wrong');
			this.router.navigate(['/authentication/login']);
		} else {
      let userrole = localStorage.getItem('userRole')
		  this.userRole = userrole.toUpperCase()
      this.accessLevel = localStorage.getItem('accessLevel');
		}
  }
  ngOnInit(): void {
    let propertyListForEmail = setInterval(() => this.currentPstTime(), 2000)
		setTimeout(() => {
			this.currentPstTime();
		}, 3000)
  }

  navmenuclick(value){
    for(let i= 0; i<6; i++){
      if(i != value){
          this.menus[i] = false;  
          /*Submenu Code Start*/
          this.submenu[i+'.'+0] = false;
          this.submenu[i+'.'+1] = false;
          /*Submenu Code Close*/
      }
    }
    if(this.menus[value] == true){
      this.menus[value] = false;  
    }else{
      this.menus[value] = true;  
    }
 }







  currentPstTime(){
    let d = new Date();
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let target_offset = -7;//PST from UTC 7 hours behind right now, will need to fix for daylight
    let los_angles = utc+(3600000*target_offset);
    this.pstTime = new Date(los_angles);
    
}
 
  logOut(){
    this.router.navigate(['/authentication/login']);
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
