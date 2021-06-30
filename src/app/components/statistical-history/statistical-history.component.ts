import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authntication.service";
import { ToastrService } from "ngx-toastr";
import { NgbModal, NgbModalOptions, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash-es";
import * as $ from 'jquery'
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

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
  public filterModel:NgbModalRef;
	private recordssubscription: Subscription;
	private deleteProductsubscription: Subscription;
  public UID:any="sdfsfjygwf655gf-34543f-fy45674";
  public isLoading:boolean;
  public searchObj:any;
  public allrecords:any=[];
  public summary:any=[];
  public noRecord:boolean= true;

  constructor(private toastr: ToastrService,private router: Router,private _authenticationService: AuthenticationService,private modalService: NgbModal,private _mqttService: MqttService) {
  	this.UID = localStorage.getItem('uID');
	if (this.UID == '' || this.UID == null || this.UID == undefined) {
		this.toastr.error('Failed, Something went wrong');
		this.router.navigate(['/authentication/login']);
	} else{
		this.isLoading = false;
	}
  }

  ngOnInit() {
  
  }
  searchRecords(){
    this.noRecord = false;
    this.searchObj = {
      "inspectionRecord":this.inspectionRecord,
      "startTime":this.startTime,
      "endTime":this.endTime,
      "productRun":this.productRun,
      "productName":this.productName,
      "lotCode":this.lotCode
      }
    this.getAllRecordsList();
    
  }
  getAllRecordsList(){
    this.isLoading = true;
    this.filterModel.close();
    // this._mqttService.unsafePublish('grayscale_statisticalHistory', JSON.stringify(this.searchObj), { qos: 1, retain: false })
    // this.recordssubscription = this._mqttService.observe('grayscale_statisticalHistory').subscribe((message: IMqttMessage) => {
      // let obj = JSON.parse(message.payload.toString());
      // console.log(obj)
      
      let res = true;
      this.allrecords =[];
      if(res){
        this.allrecords = 
        [
        {
          "id":1,
          "time":"11/20/2020 9:46:43",
          "Judgement":"seal",
          "defectType": "Width-Minor",
          "inspectionResult":"Fail",
          "sealScore":"75",
          "sealDefectLocation":"Top-R gt",
          "image":this.imgUrl,
        },
        {
          "id":2,
          "time":"11/20/2020 9:46:44",
          "Judgement":"Foreign",
          "defectType": "Contaminant",
          "inspectionResult":"Fail",
          "sealScore":"99",
          "sealDefectLocation":"None",
          "image":this.imgUrl,
        },
        {
          "id":3,
          "time":"11/20/2020 9:46:43",
          "Judgement":"seal",
          "defectType": "Width-Minor",
          "inspectionResult":"Fail",
          "sealScore":"75",
          "sealDefectLocation":"Top-R gt",
          "image":this.imgUrl,
        },
        {
          "id":4,
          "time":"11/20/2020 9:46:44",
          "Judgement":"Foreign",
          "defectType": "Contaminant",
          "inspectionResult":"Fail",
          "sealScore":"99",
          "sealDefectLocation":"None",
          "image":this.imgUrl,
        },   
         {
          "id":5,
          "time":"11/20/2020 9:46:43",
          "Judgement":"seal",
          "defectType": "Width-Minor",
          "inspectionResult":"Fail",
          "sealScore":"75",
          "sealDefectLocation":"Top-R gt",
          "image":this.imgUrl,
        },
        {
          "id":6,
          "time":"11/20/2020 9:46:44",
          "Judgement":"Foreign",
          "defectType": "Contaminant",
          "inspectionResult":"Fail",
          "sealScore":"99",
          "sealDefectLocation":"None",
          "image":this.imgUrl,
        },
        {
          "id":7,
          "time":"11/20/2020 9:46:43",
          "Judgement":"seal",
          "defectType": "Width-Minor",
          "inspectionResult":"Fail",
          "sealScore":"75",
          "sealDefectLocation":"Top-R gt",
          "image":this.imgUrl,
        },
        {
          "id":8,
          "time":"11/20/2020 9:46:44",
          "Judgement":"Foreign",
          "defectType": "Contaminant",
          "inspectionResult":"Fail",
          "sealScore":"99",
          "sealDefectLocation":"None",
          "image":this.imgUrl,
        },
        {
          "id":9,
          "time":"11/20/2020 9:46:43",
          "Judgement":"seal",
          "defectType": "Width-Minor",
          "inspectionResult":"Fail",
          "sealScore":"75",
          "sealDefectLocation":"Top-R gt",
          "image":this.imgUrl,
        },
        {
          "id":10,
          "time":"11/20/2020 9:46:44",
          "Judgement":"Foreign",
          "defectType": "Contaminant",
          "inspectionResult":"Fail",
          "sealScore":"99",
          "sealDefectLocation":"None",
          "image":this.imgUrl,
        },
        {
          "id":11,
          "time":"11/20/2020 9:46:43",
          "Judgement":"seal",
          "defectType": "Width-Minor",
          "inspectionResult":"Fail",
          "sealScore":"75",
          "sealDefectLocation":"Top-R gt",
          "image":this.imgUrl,
        },
        {
          "id":12,
          "time":"11/20/2020 9:46:44",
          "Judgement":"Foreign",
          "defectType": "Contaminant",
          "inspectionResult":"Fail",
          "sealScore":"99",
          "sealDefectLocation":"None",
          "image":this.imgUrl,
        },   
         {
          "id":13,
          "time":"11/20/2020 9:46:43",
          "Judgement":"seal",
          "defectType": "Width-Minor",
          "inspectionResult":"Fail",
          "sealScore":"75",
          "sealDefectLocation":"Top-R gt",
          "image":this.imgUrl,
        },
        {
          "id":14,
          "time":"11/20/2020 9:46:44",
          "Judgement":"Foreign",
          "defectType": "Contaminant",
          "inspectionResult":"Fail",
          "sealScore":"99",
          "sealDefectLocation":"None",
          "image":this.imgUrl,
        },
        {
          "id":15,
          "time":"11/20/2020 9:46:43",
          "Judgement":"seal",
          "defectType": "Width-Minor",
          "inspectionResult":"Fail",
          "sealScore":"75",
          "sealDefectLocation":"Top-R gt",
          "image":this.imgUrl,
        },
        {
          "id":16,
          "time":"11/20/2020 9:46:44",
          "Judgement":"Foreign",
          "defectType": "Contaminant",
          "inspectionResult":"Fail",
          "sealScore":"99",
          "sealDefectLocation":"None",
          "image":this.imgUrl,
        },
        {
          "id":17,
          "time":"11/20/2020 9:46:43",
          "Judgement":"seal",
          "defectType": "Width-Minor",
          "inspectionResult":"Fail",
          "sealScore":"75",
          "sealDefectLocation":"Top-R gt",
          "image":this.imgUrl,
        },
        {
          "id":18,
          "time":"11/20/2020 9:46:44",
          "Judgement":"Foreign",
          "defectType": "Contaminant",
          "inspectionResult":"Fail",
          "sealScore":"99",
          "sealDefectLocation":"None",
          "image":this.imgUrl,
        },
        {
          "id":19,
          "time":"11/20/2020 9:46:43",
          "Judgement":"seal",
          "defectType": "Width-Minor",
          "inspectionResult":"Fail",
          "sealScore":"75",
          "sealDefectLocation":"Top-R gt",
          "image":this.imgUrl,
        },
        {
          "id":20,
          "time":"11/20/2020 9:46:44",
          "Judgement":"Foreign",
          "defectType": "Contaminant",
          "inspectionResult":"Fail",
          "sealScore":"99",
          "sealDefectLocation":"None",
          "image":this.imgUrl,
        },   
   
        ]
        this.summary = [
          {
              "inspectionRecordPassValue":"530",
              "inspectionRecordPassPercentage":"99.6%",
              "inspectionRecordFailValue":"2",
              "inspectionRecordFailPercentage":"0.376%",
              "inspectionRecordTotalValue":"532",
              "inspectionRecordTotalPercentage":"100%",
              "failTypePassValue":"530",
              "failTypePassPercentage":"99.6%",
              "failTypeFailValue":"2",
              "failTypeFailPercentage":"0.376%",
              "failTypeTotalValue":"532",
              "failTypeTotalPercentage":"100%",
          }
        ]
        this.isLoading = false;
        this.noRecord = false;
        // this.recordssubscription.unsubscribe();
      }else{
        this.isLoading = false;
        this.noRecord = true;
        this.toastr.error('plese try again');
      }
    // });
  }






  imageZoomModelFunction(imageZoomModel) {
	  this.modalOption.backdrop = 'static';
	  this.modalOption.keyboard = false;
	  this.modalOption.windowClass = 'custom-modalv1';
	  this.imageZoomModel = this.modalService.open(imageZoomModel, this.modalOption);
	}
  FilterModelFunction(filterrecords) {
	  this.modalOption.backdrop = 'static';
	  this.modalOption.keyboard = false;
	  this.modalOption.windowClass = 'custom-modalv1';
	  this.filterModel = this.modalService.open(filterrecords, this.modalOption);
	}
 


}
