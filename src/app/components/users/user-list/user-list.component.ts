import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterMethods } from "../../../services/toaster-methods.service";
import { AuthenticationService } from '../../../services/authntication.service';
import * as _ from 'lodash-es'
import { ToastrService } from "ngx-toastr";
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [AuthenticationService,ToasterMethods]
  
})
export class userlistComponent implements OnInit {
private UserListsubscription: Subscription;
private deleteUsersubscription: Subscription;
public uIDObj:any={};
public UID:any="sdfsfjygwf655gf-34543f-fy45674";
public UserID:any;
public allUserList:any=[];
modalOption: NgbModalOptions = {};
public deleteUserModel: NgbModalRef;
public isLoading:boolean;
constructor( private modalService: NgbModal, private _mqttService: MqttService,private toastr: ToastrService,private router: Router,private _authenticationService: AuthenticationService) {
	this.UID = localStorage.getItem('uID');
	if (this.UID == '' || this.UID == null || this.UID == undefined) {
		this.toastr.error('Failed, Something went wrong');
		this.router.navigate(['/authentication/login']);
	} else{
		this.isLoading = true;
	}
}

	ngOnInit() {
	this.getUserList();
	}
	getUserList(){
		this.uIDObj = {
			"uID":this.UID
			}
		this._mqttService.unsafePublish('grayscale_input', JSON.stringify(this.uIDObj), { qos: 1, retain: true })
		this.UserListsubscription = this._mqttService.observe('grayscale_input').subscribe((message: IMqttMessage) => {
			let obj = JSON.parse(message.payload.toString());
			console.log(obj)
			
			let res = true;
			this.allUserList =[];
			if(res){
				this.allUserList = 
				[
				{
					"id":1,
					"Name":"Tim Smith",
					"AccessLevel":"Engineer",
					"username": "Tim@gmail.com",
					"status": "A",
					"defaultLanguage": "EN"
				},
				{
					"id":2,
					"Name":"Gina Thomas",
					"AccessLevel":"QAQC",
					"username": "Gina@gmail.com",
					"status": "A",
					"defaultLanguage": "EN"
				},
				{
					"id":3,
					"Name":"Alex",
					"AccessLevel":"Engineer",
					"username": "Alex@gmail.com",
					"status": "A",
					"defaultLanguage": "EN"
				},
				{
					"id":4,
					"Name":"Jack",
					"AccessLevel":"QAQC",
					"username": "Jack@gmail.com",
					"status": "A",
					"defaultLanguage": "EN"
				},
				{
					"id":5,
					"Name":"Tim",
					"AccessLevel":"Engineer",
					"username": "Tim@gmail.com",
					"status": "A",
					"defaultLanguage": "EN"
				},
				{
					"id":6,
					"Name":"Thomas",
					"AccessLevel":"QAQC",
					"username": "Thomas@gmail.com",
					"status": "A",
					"defaultLanguage": "EN"
				},
				{
					"id":7,
					"Name":"Tim Smith",
					"AccessLevel":"Engineer",
					"username": "Tim@gmail.com",
					"status": "A",
					"defaultLanguage": "EN"
				},
				{
					"id":8,
					"Name":"Gina Thomas",
					"AccessLevel":"QAQC",
					"username": "Gina@gmail.com",
					"status": "A",
					"defaultLanguage": "EN"
				},
				{
					"id":9,
					"Name":"Alex",
					"AccessLevel":"Engineer",
					"username": "Alex@gmail.com",
					"status": "A",
					"defaultLanguage": "EN"
				},
				{
					"id":10,
					"Name":"Jack",
					"AccessLevel":"QAQC",
					"username": "Jack@gmail.com",
					"status": "A",
					"defaultLanguage": "EN"
				},
				{
					"id":11,
					"Name":"Tim",
					"AccessLevel":"Engineer",
					"username": "Tim@gmail.com",
					"status": "A",
					"defaultLanguage": "EN"
				},
				{
					"id":12,
					"Name":"Thomas",
					"AccessLevel":"QAQC",
					"username": "Thomas@gmail.com",
					"status": "A",
					"defaultLanguage": "EN"
				},
				{
					"id":13,
					"Name":"Tim",
					"AccessLevel":"Engineer",
					"username": "Tim@gmail.com",
					"status": "A",
					"defaultLanguage": "EN"
				},
				{
					"id":14,
					"Name":"Thomas",
					"AccessLevel":"QAQC",
					"username": "Thomas@gmail.com",
					"status": "A",
					"defaultLanguage": "EN"
				}
				]
				this.isLoading = false;
				this.UserListsubscription.unsubscribe();
			}else{
				this.isLoading = false;
				this.toastr.error('plese try again');
			}
		});
	}
	deleteUserModelFunction(delete_User) {
		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;
		this.modalOption.windowClass = 'custom-modalv1';
		this.deleteUserModel = this.modalService.open(delete_User, this.modalOption);
	}
	StatusFunction(id){
		this.UserID = '';
		this.UserID = id;
	}
	userDeleteFunction(){
		let deleteObj = {"id": this.UserID,"status":"D"}
		this._mqttService.unsafePublish('grayscale', JSON.stringify(deleteObj), { qos: 1, retain: true })
		this.deleteUsersubscription = this._mqttService.observe('grayscale').subscribe((message: IMqttMessage) => {
		let obj = JSON.parse(message.payload.toString());
		console.log(obj)
		let res = true;
		if(res){
			this.toastr.success('User deleted successfully');
			this.getUserList();
			this.deleteUserModel.close();
			this.deleteUsersubscription.unsubscribe();
		}else{
			this.toastr.error('plese try again');
		}
	  });
	}
	sortingDsending(item){
		if(item == 'id'){
			this.allUserList.sort(function (a, b) {
				return  b.id - a.id ;
			});
		}else if(item == 'string'){
			this.allUserList.sort(function (a, b) {
				var nameA = a.Name.toUpperCase(); 
				var nameB = b.Name.toUpperCase(); 
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			});
		}
	}
	SortingAsending(item){
		if(item == 'id'){
			this.allUserList.sort(function (a, b) {
				return  a.id - b.id;
			});
		}else if(item == 'string'){
			this.allUserList.sort(function (a, b) {
				var nameA = a.Name.toUpperCase(); 
				var nameB = b.Name.toUpperCase(); 
				if (nameA > nameB) {
					return -1;
				}
				if (nameA < nameB) {
					return 1;
				}
				return 0;
			});
		}
	}
	addNewUser(){
		this.router.navigate(['/machine/adduser']);
	}
	editUser(user){
		localStorage.setItem('editUserDetails', JSON.stringify(user))
		this.router.navigate(['/machine/edituser']);
	}
}
