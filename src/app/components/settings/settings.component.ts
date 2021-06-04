import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authntication.service";
import { environment } from "../../../environments/environment";
import { ToastrService } from "ngx-toastr";
import { NgbModal, NgbModalOptions, NgbModalRef, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash-es";
import * as $ from 'jquery'

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
  providers: [AuthenticationService],
})
export class settingsComponent implements OnInit {
  public successmsg;
  public errormsg;
  public inspectionRecord:any='2';
  unitOfMeasurment:any = 2;
  userLanguage:any = 1;
  validationInterval = 1;
  gracePeriod = 1;
  uponExpiration = 1;
  modalOption: NgbModalOptions = {};
  public validationSchedule: NgbModalRef;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private _authenticationService: AuthenticationService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
  }
  ValidationModelFunction(validationSchedule) {
	  this.modalOption.backdrop = 'static';
	  this.modalOption.keyboard = false;
	  this.modalOption.windowClass = 'custom-modalv1';
	  this.validationSchedule = this.modalService.open(validationSchedule, this.modalOption);
	}

  cancelValidationSetting(){

  }
 savValidationSetting(){

 }
NetworkConfigurator(){
  
}

}
