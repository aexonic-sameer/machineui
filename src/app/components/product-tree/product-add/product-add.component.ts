import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterMethods } from "../../../services/toaster-methods.service";
import { AuthenticationService } from '../../../services/authntication.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash-es';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  providers: [AuthenticationService,ToasterMethods]
  
})
export class productaddComponent implements OnInit {

	file_Input:any;
	public updatedProductObj:any;
	public UID:any;
	public editProductDetails:any;
	private addProductSubscription: Subscription;
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
	public isXRAYONDO1:boolean= false;
	public isXRAYONDO2:boolean= false;
	public isXRAYONDO3:boolean= false;
	public isXRAYONDO4:boolean= false;
	public isXRAYONDO5:boolean= false;
	public isXRAYONDO6:boolean= false;
	public isXRAYONDO7:boolean= false;
	public isXRAYONDO8:boolean= false;
	public isERRORstop:boolean= false;
	public isERRORDO1:boolean= false;
	public isERRORDO2:boolean= false;
	public isERRORDO3:boolean= false;
	public isERRORDO4:boolean= false;
	public isERRORDO5:boolean= false;
	public isERRORDO6:boolean= false;
	public isERRORDO7:boolean= false;
	public isERRORDO8:boolean= false;

	public isEstop:boolean= false;
	public isEDO1:boolean= false;
	public isEDO2:boolean= false;
	public isEDO3:boolean= false;
	public isEDO4:boolean= false;
	public isEDO5:boolean= false;
	public isEDO6:boolean= false;
	public isEDO7:boolean= false;
	public isEDO8:boolean= false;

	public isConveyorRunningstop:boolean= false;
	public isConveyorRunningDO1:boolean= false;
	public isConveyorRunningDO2:boolean= false;
	public isConveyorRunningDO3:boolean= false;
	public isConveyorRunningDO4:boolean= false;
	public isConveyorRunningDO5:boolean= false;
	public isConveyorRunningDO6:boolean= false;
	public isConveyorRunningDO7:boolean= false;
	public isConveyorRunningDO8:boolean= false;

	public isSealDefectstop:boolean= false;
	public isSealDefectDO1:boolean= false;
	public isSealDefectDO2:boolean= false;
	public isSealDefectDO3:boolean= false;
	public isSealDefectDO4:boolean= false;
	public isSealDefectDO5:boolean= false;
	public isSealDefectDO6:boolean= false;
	public isSealDefectDO7:boolean= false;
	public isSealDefectDO8:boolean= false;

	public isForeignMaterialDefectstop:boolean= false;
	public isForeignMaterialDefectDO1:boolean= false;
	public isForeignMaterialDefectDO2:boolean= false;
	public isForeignMaterialDefectDO3:boolean= false;
	public isForeignMaterialDefectDO4:boolean= false;
	public isForeignMaterialDefectDO5:boolean= false;
	public isForeignMaterialDefectDO6:boolean= false;
	public isForeignMaterialDefectDO7:boolean= false;
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
	public isPolarityDO3:boolean= false;
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
		} 
	}

	ngOnInit() {
		
	}

	addProductDetails(){
		this.updatedProductObj = 
			{
				"number":this.productNumber,
				"name":this.prodcutName,
				"productCode":this.productCode,
				"image": this.imageUrl,
				"productlength":this.productlength,
				"inspectionBeltSpeed":this.inspectionBeltSpeed,
				"rejectorBeltSpeed":this.rejectorBeltSpeed,
				"tubeVoltage":this.tubeVoltage,
				"tubeCurrent":this.tubeCurrent,
				"consecutivefailure":this.consecutivefailure,
				"consecutiveVariable":this.consecutiveVariable,
				"minimumSealwidthTop":this.minimumSealwidthTop,
				"maximumSealwidthTop":this.maximumSealwidthTop,
				"minimumSealwidthBottom":this.minimumSealwidthBottom,
				"maximumSealWidthBottom":this.maximumSealWidthBottom,
				"minimumSealwidthRightSide":this.minimumSealwidthRightSide,
				"maximimSealwidthRightSide":this.maximimSealwidthRightSide,
				"minimumSealwidthLeftSide":this.minimumSealwidthLeftSide,
				"maximumSealwidthLeftSide":this.maximumSealwidthLeftSide
			}
		this._mqttService.unsafePublish('grayscale_addProduct', JSON.stringify(this.updatedProductObj), { qos: 1, retain: false })
		this.addProductSubscription = this._mqttService.observe('grayscale_addProduct').subscribe((message: IMqttMessage) => {
			let obj = JSON.parse(message.payload.toString());
			console.log(obj)
			let res = true;
			if(res){
				this.toastr.success('Product added successfully');
				this.router.navigate(["/machine/product"]);
				this.addProductSubscription.unsubscribe();
				}else{
				this.toastr.error('plese try again');
			}
	  });
	}

	gotoProductList(){
		this.router.navigate(['/machine/product']);
	}
	digitalOutputValChange(item,val){

	if(val == 'XRAYON-stop'){if(item){this.isXRAYONstop = false;}else{this.isXRAYONstop = true;}
	}else if(val=='XRAYON-DO1'){if(item){this.isXRAYONDO1 = false;}else{this.isXRAYONDO1 = true;}
	}else if(val=='XRAYON-DO2'){if(item){this.isXRAYONDO2 = false;}else{this.isXRAYONDO2 = true;}
	}else if(val=='XRAYON-DO3'){if(item){this.isXRAYONDO3 = false;}else{this.isXRAYONDO3 = true;}
	}else if(val=='XRAYON-DO4'){if(item){this.isXRAYONDO4 = false;}else{this.isXRAYONDO4 = true;}
	}else if(val=='XRAYON-DO5'){if(item){this.isXRAYONDO5 = false;}else{this.isXRAYONDO5 = true;}
	}else if(val=='XRAYON-DO6'){if(item){this.isXRAYONDO6 = false;}else{this.isXRAYONDO6 = true;}
	}else if(val=='XRAYON-DO7'){if(item){this.isXRAYONDO7 = false;}else{this.isXRAYONDO7 = true;}
	}else if(val=='XRAYON-DO8'){if(item){this.isXRAYONDO8 = false;}else{this.isXRAYONDO8 = true;}	
	}
	else if(val == 'ERROR-stop'){if(item){this.isERRORstop = false;}else{this.isERRORstop = true;}
	}else if(val=='ERROR-DO1'){if(item){this.isERRORDO1 = false;}else{this.isERRORDO1 = true;}
	}else if(val=='ERROR-DO2'){if(item){this.isERRORDO2 = false;}else{this.isERRORDO2 = true;}
	}else if(val=='ERROR-DO3'){if(item){this.isERRORDO3 = false;}else{this.isERRORDO3 = true;}
	}else if(val=='ERROR-DO4'){if(item){this.isERRORDO4 = false;}else{this.isERRORDO4 = true;}
	}else if(val=='ERROR-DO5'){if(item){this.isERRORDO5 = false;}else{this.isERRORDO5 = true;}
	}else if(val=='ERROR-DO6'){if(item){this.isERRORDO6 = false;}else{this.isERRORDO6 = true;}
	}else if(val=='ERROR-DO7'){if(item){this.isERRORDO7 = false;}else{this.isERRORDO7 = true;}
	}else if(val=='ERROR-DO8'){if(item){this.isERRORDO8 = false;}else{this.isERRORDO8 = true;}	
	}
	else if(val == 'E-stop'){if(item){this.isEstop = false;}else{this.isEstop = true;}
	}else if(val=='E-DO1'){if(item){this.isEDO1 = false;}else{this.isEDO1 = true;}
	}else if(val=='E-DO2'){if(item){this.isEDO2 = false;}else{this.isEDO2 = true;}
	}else if(val=='E-DO3'){if(item){this.isEDO3 = false;}else{this.isEDO3 = true;}
	}else if(val=='E-DO4'){if(item){this.isEDO4 = false;}else{this.isEDO4 = true;}
	}else if(val=='E-DO5'){if(item){this.isEDO5 = false;}else{this.isEDO5 = true;}
	}else if(val=='E-DO6'){if(item){this.isEDO6 = false;}else{this.isEDO6 = true;}
	}else if(val=='E-DO7'){if(item){this.isEDO7 = false;}else{this.isEDO7 = true;}
	}else if(val=='E-DO8'){if(item){this.isEDO8 = false;}else{this.isEDO8 = true;}	
	}
	else if(val == 'ConveyorRunning-stop'){if(item){this.isConveyorRunningstop = false;}else{this.isConveyorRunningstop = true;}
}else if(val=='ConveyorRunning-DO1'){if(item){this.isConveyorRunningDO1 = false;}else{this.isConveyorRunningDO1 = true;}
}else if(val=='ConveyorRunning-DO2'){if(item){this.isConveyorRunningDO2 = false;}else{this.isConveyorRunningDO2 = true;}
}else if(val=='ConveyorRunning-DO3'){if(item){this.isConveyorRunningDO3 = false;}else{this.isConveyorRunningDO3 = true;}
}else if(val=='ConveyorRunning-DO4'){if(item){this.isConveyorRunningDO4 = false;}else{this.isConveyorRunningDO4 = true;}
}else if(val=='ConveyorRunning-DO5'){if(item){this.isConveyorRunningDO5 = false;}else{this.isConveyorRunningDO5 = true;}
}else if(val=='ConveyorRunning-DO6'){if(item){this.isConveyorRunningDO6 = false;}else{this.isConveyorRunningDO6 = true;}
}else if(val=='ConveyorRunning-DO7'){if(item){this.isConveyorRunningDO7 = false;}else{this.isConveyorRunningDO7 = true;}
}else if(val=='ConveyorRunning-DO8'){if(item){this.isConveyorRunningDO8 = false;}else{this.isConveyorRunningDO8 = true;}	
}
else if(val == 'SealDefect-stop'){if(item){this.isSealDefectstop = false;}else{this.isSealDefectstop = true;}
}else if(val=='SealDefect-DO1'){if(item){this.isSealDefectDO1 = false;}else{this.isSealDefectDO1 = true;}
}else if(val=='SealDefect-DO2'){if(item){this.isSealDefectDO2 = false;}else{this.isSealDefectDO2 = true;}
}else if(val=='SealDefect-DO3'){if(item){this.isSealDefectDO3 = false;}else{this.isSealDefectDO3 = true;}
}else if(val=='SealDefect-DO4'){if(item){this.isSealDefectDO4 = false;}else{this.isSealDefectDO4 = true;}
}else if(val=='SealDefect-DO5'){if(item){this.isSealDefectDO5 = false;}else{this.isSealDefectDO5 = true;}
}else if(val=='SealDefect-DO6'){if(item){this.isSealDefectDO6 = false;}else{this.isSealDefectDO6 = true;}
}else if(val=='SealDefect-DO7'){if(item){this.isSealDefectDO7 = false;}else{this.isSealDefectDO7 = true;}
}else if(val=='SealDefect-DO8'){if(item){this.isSealDefectDO8 = false;}else{this.isSealDefectDO8 = true;}	
}else if(val == 'ForeignMaterialDefect-stop'){if(item){this.isForeignMaterialDefectstop = false;}else{this.isForeignMaterialDefectstop = true;}
}else if(val=='ForeignMaterialDefect-DO1'){if(item){this.isForeignMaterialDefectDO1 = false;}else{this.isForeignMaterialDefectDO1 = true;}
}else if(val=='ForeignMaterialDefect-DO2'){if(item){this.isForeignMaterialDefectDO2 = false;}else{this.isForeignMaterialDefectDO2 = true;}
}else if(val=='ForeignMaterialDefect-DO3'){if(item){this.isForeignMaterialDefectDO3 = false;}else{this.isForeignMaterialDefectDO3 = true;}
}else if(val=='ForeignMaterialDefect-DO4'){if(item){this.isForeignMaterialDefectDO4 = false;}else{this.isForeignMaterialDefectDO4 = true;}
}else if(val=='ForeignMaterialDefect-DO5'){if(item){this.isForeignMaterialDefectDO5 = false;}else{this.isForeignMaterialDefectDO5 = true;}
}else if(val=='ForeignMaterialDefect-DO6'){if(item){this.isForeignMaterialDefectDO6 = false;}else{this.isForeignMaterialDefectDO6 = true;}
}else if(val=='ForeignMaterialDefect-DO7'){if(item){this.isForeignMaterialDefectDO7 = false;}else{this.isForeignMaterialDefectDO7 = true;}
}else if(val=='ForeignMaterialDefect-DO8'){if(item){this.isForeignMaterialDefectDO8 = false;}else{this.isForeignMaterialDefectDO8 = true;}	
}else if(val == 'Polarity-stop'){if(item){this.isPolaritystop = false;}else{this.isPolaritystop = true;}
}else if(val=='Polarity-DO1'){if(item){this.isPolarityDO1 = false;}else{this.isPolarityDO1 = true;}
}else if(val=='Polarity-DO2'){if(item){this.isPolarityDO2 = false;}else{this.isPolarityDO2 = true;}
}else if(val=='Polarity-DO3'){if(item){this.isPolarityDO3 = false;}else{this.isPolarityDO3 = true;}
}else if(val=='Polarity-DO4'){if(item){this.isPolarityDO4 = false;}else{this.isPolarityDO4 = true;}
}else if(val=='Polarity-DO5'){if(item){this.isPolarityDO5 = false;}else{this.isPolarityDO5 = true;}
}else if(val=='Polarity-DO6'){if(item){this.isPolarityDO6 = false;}else{this.isPolarityDO6 = true;}
}else if(val=='Polarity-DO7'){if(item){this.isPolarityDO7 = false;}else{this.isPolarityDO7 = true;}
}else if(val=='Polarity-DO8'){if(item){this.isPolarityDO8 = false;}else{this.isPolarityDO8 = true;}	
}

	

	}

}
