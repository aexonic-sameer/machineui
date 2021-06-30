import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterMethods } from "../../../services/toaster-methods.service";
import { AuthenticationService } from '../../../services/authntication.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash-es'
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  providers: [AuthenticationService,ToasterMethods]
  
})
export class productViewComponent implements OnInit {

	file_Input:any;
	public updatedProductObj:any;
	public UID:any;
	public editProductDetails:any;
	private updateProductSubscription: Subscription;
	public productNumber:any;
	public prodcutName:any;
	public productCode:any;
	public imageUrl:any;
	public productlength:any;
	public inspectionBeltSpeed:any;
	public rejectorBeltSpeed:any;
	public tubeVoltage:any;
	public tubeCurrent:any;
	public consecutivefailure:any;
	public consecutiveVariable:any;
	public minimumSealwidthTop:any;
	public maximumSealwidthTop:any;
	public minimumSealwidthBottom:any;
	public maximumSealWidthBottom:any;
	public minimumSealwidthRightSide:any;
	public maximimSealwidthRightSide:any;
	public minimumSealwidthLeftSide:any;
	public maximumSealwidthLeftSide:any;

	public isXRAYONstop:boolean= false;
	public isXRAYONDO1:boolean= true;
	public isXRAYONDO2:boolean= false;
	public isXRAYONDO3:boolean= false;
	public isXRAYONDO4:boolean= false;
	public isXRAYONDO5:boolean= false;
	public isXRAYONDO6:boolean= true;
	public isXRAYONDO7:boolean= false;
	public isXRAYONDO8:boolean= false;
	public isERRORstop:boolean= false;
	public isERRORDO1:boolean= false;
	public isERRORDO2:boolean= false;
	public isERRORDO3:boolean= true;
	public isERRORDO4:boolean= false;
	public isERRORDO5:boolean= false;
	public isERRORDO6:boolean= false;
	public isERRORDO7:boolean= false;
	public isERRORDO8:boolean= false;

	public isEstop:boolean= false;
	public isEDO1:boolean= false;
	public isEDO2:boolean= true;
	public isEDO3:boolean= false;
	public isEDO4:boolean= false;
	public isEDO5:boolean= false;
	public isEDO6:boolean= false;
	public isEDO7:boolean= true;
	public isEDO8:boolean= false;

	public isConveyorRunningstop:boolean= false;
	public isConveyorRunningDO1:boolean= false;
	public isConveyorRunningDO2:boolean= true;
	public isConveyorRunningDO3:boolean= false;
	public isConveyorRunningDO4:boolean= false;
	public isConveyorRunningDO5:boolean= false;
	public isConveyorRunningDO6:boolean= false;
	public isConveyorRunningDO7:boolean= false;
	public isConveyorRunningDO8:boolean= false;

	public isSealDefectstop:boolean= false;
	public isSealDefectDO1:boolean= false;
	public isSealDefectDO2:boolean= true;
	public isSealDefectDO3:boolean= false;
	public isSealDefectDO4:boolean= false;
	public isSealDefectDO5:boolean= false;
	public isSealDefectDO6:boolean= true;
	public isSealDefectDO7:boolean= false;
	public isSealDefectDO8:boolean= false;

	public isForeignMaterialDefectstop:boolean= false;
	public isForeignMaterialDefectDO1:boolean= false;
	public isForeignMaterialDefectDO2:boolean= true;
	public isForeignMaterialDefectDO3:boolean= false;
	public isForeignMaterialDefectDO4:boolean= false;
	public isForeignMaterialDefectDO5:boolean= true;
	public isForeignMaterialDefectDO6:boolean= false;
	public isForeignMaterialDefectDO7:boolean= true;
	public isForeignMaterialDefectDO8:boolean= false;
	public delatTimeStop:any = "0.00";
	public delatTimeD01:any = "0.00";
	public delatTimeD02:any = "0.00";
	public delatTimeD03:any = "0.00";
	public delatTimeD04:any = "0.00";
	public delatTimeD05:any = "0.00";
	public delatTimeD06:any = "0.00";
	public delatTimeD07:any = "0.00";
	public delatTimeD08:any = "0.00";

	public holdTimeStop:any = "1.00";
	public holdTimeD01:any = "1.00";
	public holdTimeD02:any = "1.00";
	public holdTimeD03:any = "1.00";
	public holdTimeD04:any = "1.00";
	public holdTimeD05:any = "1.00";
	public holdTimeD06:any = "1.00";
	public holdTimeD07:any = "1.00";
	public holdTimeD08:any = "1.00";


	public isPolaritystop:boolean= false;
	public isPolarityDO1:boolean= false;
	public isPolarityDO2:boolean= false;
	public isPolarityDO3:boolean= true;
	public isPolarityDO4:boolean= false;
	public isPolarityDO5:boolean= false;
	public isPolarityDO6:boolean= false;
	public isPolarityDO7:boolean= false;
	public isPolarityDO8:boolean= false;
	constructor( private _mqttService: MqttService,private toastr: ToastrService,private router: Router,private _authenticationService: AuthenticationService) {
		this.UID = localStorage.getItem('uID');
		if (this.UID == '' || this.UID == null || this.UID == undefined) {
			this.toastr.error('Failed, Something went wrong');
			this.router.navigate(['/authentication/login']);
		} else{
			this.editProductDetails = JSON.parse(localStorage.getItem('ProductDetails'))
			this.productNumber = this.editProductDetails.number;
			this.prodcutName = this.editProductDetails.name;
			this.productCode = this.editProductDetails.productCode;
			this.imageUrl = this.editProductDetails.image;
			this.productlength = this.editProductDetails.productlength;
			this.inspectionBeltSpeed = this.editProductDetails.inspectionBeltSpeed;
			this.rejectorBeltSpeed = this.editProductDetails.rejectorBeltSpeed;
			this.tubeVoltage = this.editProductDetails.tubeVoltage;
			this.tubeCurrent = this.editProductDetails.tubeCurrent;
			this.consecutivefailure = this.editProductDetails.consecutivefailure;
			this.consecutiveVariable = this.editProductDetails.consecutiveVariable;
			this.minimumSealwidthTop = this.editProductDetails.minimumSealwidthTop;
			this.maximumSealwidthTop = this.editProductDetails.maximumSealwidthTop;
			this.minimumSealwidthBottom = this.editProductDetails.minimumSealwidthBottom;
			this.maximumSealWidthBottom = this.editProductDetails.maximumSealWidthBottom;
			this.minimumSealwidthRightSide = this.editProductDetails.minimumSealwidthRightSide;
			this.maximimSealwidthRightSide = this.editProductDetails.maximimSealwidthRightSide;
			this.minimumSealwidthLeftSide = this.editProductDetails.minimumSealwidthLeftSide;
			this.maximumSealwidthLeftSide = this.editProductDetails.maximumSealwidthLeftSide;
		}
	}

	ngOnInit() {
		
	}

	

	gotoProductList(){
		this.router.navigate(['/machine/product']);
	}
	editProductFunction(){
		this.router.navigate(['/machine/product-edit']);
	}

}
