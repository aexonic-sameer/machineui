import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authntication.service";
import { environment } from "../../../environments/environment";
import { ToastrService } from "ngx-toastr";
import { NgbModal, NgbModalOptions, NgbModalRef, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash-es";
import * as $ from 'jquery'

@Component({
  selector: "app-statistical-history",
  templateUrl: "./statistical-history.component.html",
  styleUrls: ["./statistical-history.component.css"],
  providers: [AuthenticationService],
})
export class statisticalhistoryComponent implements OnInit {
  public successmsg;
  public errormsg;
  public inspectionRecord:any='2';
  startTime:any = "2020/11/20 9:45:25";
  endTime:any = "2020/11/20 10:45:31";
  productRun:any = "01-004";
  productName:any = "Tuna Pouch";
  lotCode:any = "230";
  active = 1;
  public configImg:any =[];
  public imgUrl = "assets/images/productimg/xrayImg2.PNG";
  modalOption: NgbModalOptions = {};
  public imageZoomModel: NgbModalRef;
  myThumbnail = "assets/images/productimg/xrayImg2.PNG";
  myFullresImage = "assets/images/productimg/xrayImg2.PNG";
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private _authenticationService: AuthenticationService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
       setTimeout(() => {
      $('.ngxImageZoomThumbnail').css('width', '100%')
    }, 20)

   this.configImg = [
     {"id":1,"img":this.imgUrl},
     {"id":2,"img":this.imgUrl},
     {"id":3,"img":this.imgUrl},
     {"id":4,"img":this.imgUrl},
     {"id":5,"img":this.imgUrl},
     {"id":6,"img":this.imgUrl},
     {"id":7,"img":this.imgUrl},
     {"id":8,"img":this.imgUrl},
     {"id":9,"img":this.imgUrl},
     {"id":10,"img":this.imgUrl},
     {"id":11,"img":this.imgUrl},
     {"id":12,"img":this.imgUrl},
 
    ]
  }
  imageZoomModelFunction(imageZoomModel) {
	  this.modalOption.backdrop = 'static';
	  this.modalOption.keyboard = false;
	  this.modalOption.windowClass = 'custom-modalv1';
	  this.imageZoomModel = this.modalService.open(imageZoomModel, this.modalOption);
	}

 


}
