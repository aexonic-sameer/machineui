import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthenticationService } from '../../services/authntication.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-updatePassword-pw',
  templateUrl: './updatePassword.component.html',
  styleUrls: ['./updatePassword.component.css'],
  providers: [ToastrService]
})
export class updatePasswordComponent implements OnInit {

  public email: any;
  public oldpassword:any;
  public newPassword:any;
  public passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  public confirmPassword:any;
  
  constructor(private _authenticationService: AuthenticationService,private router: Router, private activatedRoute: ActivatedRoute, private Router: Router, private toastr: ToastrService) {
  
  }
  // =======================================[check PWD]========================================
 
  // =======================================[check PWD]========================================
  ngOnInit() {
  }
  updatePassword() {
    if (this.newPassword != this.confirmPassword) {
      this.toastr.error("New password and Confirm password did not match");
  }else{
          let update_password_data = {
            "userEmail":this.email,
            "newPassword":this.newPassword,
            "oldPassword":this.oldpassword
          }
      this._authenticationService.updatepassword(update_password_data)
      .subscribe(
                  (data) => {
                    console.log(data)
                              this.toastr.success(data['message']);
                              this.router.navigate(['/authentication/login']);
                          },
                  (error) => {
                    console.log(error)
                              this.toastr.error(error.error.message);
                              this.email='';
                              this.newPassword = '';
                            this.oldpassword = '';
                          },
                  () => { }
              );
  }
















 
  
  }
}
