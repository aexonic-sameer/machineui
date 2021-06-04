import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({providedIn: 'root'})

export class AuthenticationService {
	public successmsg;
	public errormsg;
	public headers;
	public tempHeaders;
	private baseUrl: String = environment.backendURL;
	private metabaseUrl: String = environment.analyticsURL;

	constructor(private http: HttpClient) {
		
  }






	getToken(){
		let credentials = JSON.parse(sessionStorage.getItem('get_token'));
		let credentialsObj = {
			"username":credentials.username,
			"password":credentials.password
		}
		return  this.http.post(this.baseUrl+'/authenticate',credentialsObj);
	}

	getTokenLogin() {
	return this.http.post(this.baseUrl+'/token',environment.superUsercredentials)
	}
	setHeader(token:any){
	this.headers = new HttpHeaders({
		"Content-Type": "application/json",
		'Authorization': 'Bearer '+ token,
		'Access-Control-Allow-Origin' : '*'
		})
	}
	loginAuthentication(loginObj) {
		return this.http.post(this.baseUrl+'/login', loginObj, { headers: this.headers })
	}
	getcompanydashboard(uID) {
		return this.http.post(this.baseUrl+'/url', uID, { headers: this.headers })
	}
	userRegistration(userDetails){
		return this.http.post(this.baseUrl+'/registration', userDetails, { headers: this.headers })
	}
	forgotpassword(forgotObj){
		return this.http.post(this.baseUrl+'/forgetPassword', forgotObj, { headers: this.headers })
	}
	updatepassword(updateObj){
		return this.http.post(this.baseUrl+'/updatePassword', updateObj, { headers: this.headers })
	}
	userListDetails(){
	
		return this.http.get(this.baseUrl+'/userList', { headers: this.headers })
	}
	deleteUser(ChangedStatus){
		return this.http.post(this.baseUrl+'/updateUserStatus', ChangedStatus, { headers: this.headers })
	}
	updateUserDetails(UpdateuserDetails){
		return this.http.post(this.baseUrl+'/updateUserProfile', UpdateuserDetails, { headers: this.headers })
	}
	imagedetailsapi(imagepath){
	
		return this.http.get(this.baseUrl+'/getPresignurl'+imagepath, { headers: this.headers })
	}
	// ***************************My Profile****************************
	getProfileDetailsApi(loginID){
		return this.http.get(this.baseUrl+'/myProfile/'+loginID, { headers: this.headers })
	}
	UpdateProfileDetailsApi(profileObj){
		return this.http.post(this.baseUrl+'/myProfileUpdate', profileObj, { headers: this.headers })
	}

	get isLoggedIn(): boolean {
		const user = localStorage.getItem('biLoginUser')
		return user !== null
	}
	userLogout(){
		return this.http.get(this.metabaseUrl+"/auth/logout")
	}

	checksessionExpire(){
		if (localStorage.getItem('token')) {
            var currentUser = localStorage.getItem('token');
            let token = currentUser;
            let decryptedToken = JSON.parse(window.atob(token.split('.')[1]));
            var exp_timestamp = decryptedToken.exp;
            var today_timestamp = Math.floor(new Date().getTime() / 1000)
            if (exp_timestamp < today_timestamp) {
                
                return true;
            }
            else {
                return false;
            }
        }
		return true;
	}




}
