import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authntication.service";
import { environment } from "../../../environments/environment";
import { ToastrService } from "ngx-toastr";
import { NgbModal, NgbModalOptions, NgbModalRef, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash-es";
import * as $ from 'jquery'
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { AnyARecord } from "node:dns";
@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
  providers: [AuthenticationService],
})
export class settingsComponent implements OnInit {

	private settingssubscription: Subscription;
	private genaralSettingssubscription: Subscription;
  private connectivitySettingssubscription: Subscription;
  public UID:any="sdfsfjygwf655gf-34543f-fy45674";
  public isLoading:boolean;
  public successmsg;
  public errormsg;
  modalOption: NgbModalOptions = {};
  public validationSchedule: NgbModalRef;
  isHvControl:boolean = false;
  public uIDObj:any={};
  public allsettings:any=[];
  public genaralSettingObj:any={};
  public connectivitySettingObj:any={};

  public timeOut:any;
  public screenSaverDelay:any;
  public displayBrightness:any;
  public unitOfMeasurment:any;
  public userLanguage:any;
  public modelNumber:any;
  public softwareVersion:any;
  public mainboardVersion:any;
  public lineSensorVersion:any;
  public validationInterval:any = 1;
  public gracePeriod:any = 1;
  public uponExpiration:any = 1;

  public serialMode:any;
  public communicationStnd:any;
  public baudrate:any;
  public parity:any = 1;
  public stopBit:any;
  public dataBit:any;
  public terminate:any;

  public rotationDirectionXrayBelt:any = "CW";
  public rotationDirectionRejectBelt:any ="CW";
  public defaultBeltSpeedXrayBelt:any = "15 m/min";
  public defaultBeltSpeedRejectBelt:any = "15 m/min";
  public activeSpeedMonitorXrayBelt:any= "30 m/min";
  public activeSpeedMonitorRejectBelt:any= "30 m/min";
  public errorCheckingXrayBelt:any ="ON";
  public errorCheckingRejectBelt:any ="ON";
  
  public isMachineHealthWhite:boolean = false;
  public isMachineHealthGreen:boolean = false;
  public isMachineHealthYellow:boolean = false;
  public isMachineHealthRed:boolean = false;
  public isMachineHealthBlue:boolean = false;
  public isMachineHealthBuzzer:boolean = false;

  public isXrayONWhite:boolean = false;
  public isXrayONGreen:boolean = false;
  public isXrayONYellow:boolean = false;
  public isXrayONRed:boolean = false;
  public isXrayONBlue:boolean = false;
  public isXrayONBuzzer:boolean = false;

  public isProductFailureWhite:boolean = false;
  public isProductFailureGreen:boolean = false;
  public isProductFailureYellow:boolean = false;
  public isProductFailureRed:boolean = false;
  public isProductFailureBlue:boolean = false;
  public isProductFailureBuzzer:boolean = false;

  
  public isOutputErrorWhite:boolean = false;
  public isOutputErrorGreen:boolean = false;
  public isOutputErrorYellow:boolean = false;
  public isOutputErrorRed:boolean = false;
  public isOutputErrorBlue:boolean = false;
  public isOutputErrorBuzzer:boolean = false;
  
  public isNotInspectingWhite:boolean = false;
  public isNotInspectingGreen:boolean = false;
  public isNotInspectingYellow:boolean = false;
  public isNotInspectingRed:boolean = false;
  public isNotInspectingBlue:boolean = false;
  public isNotInspectingBuzzer:boolean = false;

  public isEmergencyStopWhite:boolean = false;
  public isEmergencyStopGreen:boolean = false;
  public isEmergencyStopYellow:boolean = false;
  public isEmergencyStopRed:boolean = false;
  public isEmergencyStopBlue:boolean = false;
  public isEmergencyStopBuzzer:boolean = false;
  public DurationBlue:any = "0.00";
  public DurationBuzzer = "0.00";

  public digitalInputDI1:any ="";
  public  digitalInputDI2:any ="";
  public digitalInputDI3:any="";
  public digitalInputDI4:any="";



    constructor(private _mqttService: MqttService,private toastr: ToastrService,private router: Router,private _authenticationService: AuthenticationService,private modalService: NgbModal) {
      this.UID = localStorage.getItem('uID');
      if (this.UID == '' || this.UID == null || this.UID == undefined) {
        this.toastr.error('Failed, Something went wrong');
        this.router.navigate(['/authentication/login']);
      } else{
        this.isLoading = true;
      }
    }

  ngOnInit() {
    this.getSettings();
    var countDownDate = new Date("June 24, 2021 15:37:25").getTime();
    var x = setInterval(function() {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("demo").innerHTML = days + "Days " + hours + "Hours"
      + minutes + "Minutes" + seconds + "Seconds";
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
  }


  getSettings(){
    this.uIDObj = {
      "uID":this.UID
      }
    // this._mqttService.unsafePublish('grayscale_input', JSON.stringify(this.uIDObj), { qos: 1, retain: false })
    // this.settingssubscription = this._mqttService.observe('grayscale_input').subscribe((message: IMqttMessage) => {
      // let obj = JSON.parse(message.payload.toString());
      // console.log(obj)

      let res = true;
      this.allsettings =[];
      if(res){
        this.allsettings =  [{
          "timeOut":1,
          "screenSaverDelay":"1",
          "displayBrightness":"1",
          "unitOfMeasurment": "Standard",
          "userLanguage":"EN",
          "modelNumber":"D-345",
          "softwareVersion":"2.4",
          "mainboardVersion":"3.4",
          "lineSensorVersion":"2.3",
          "validationInterval":"1",
          "gracePeriod":"1",
          "uponExpiration":"1",

           "serialMode":"Enable",
           "communicationStnd":"Rs-232",
           "baudrate":"115200",
           "parity":"None",
           "stopBit":"1bit",
           "dataBit":"8bit",
           "terminate":"OFF"
        }]
        
        
         this.timeOut=this.allsettings[0].timeOut;
         this.screenSaverDelay=this.allsettings[0].screenSaverDelay;
         this.displayBrightness=this.allsettings[0].displayBrightness;
         this.unitOfMeasurment =this.allsettings[0].unitOfMeasurment;
         this.userLanguage=this.allsettings[0].userLanguage;
         this.modelNumber=this.allsettings[0].modelNumber;
         this.softwareVersion=this.allsettings[0].softwareVersion;
         this.mainboardVersion=this.allsettings[0].mainboardVersion;
         this.lineSensorVersion=this.allsettings[0].lineSensorVersion;
         this.validationInterval=this.allsettings[0].validationInterval;
         this.gracePeriod=this.allsettings[0].gracePeriod;
         this.uponExpiration=this.allsettings[0].uponExpiration;

         this.serialMode=this.allsettings[0].serialMode;
         this.communicationStnd=this.allsettings[0].communicationStnd;
         this.baudrate=this.allsettings[0].baudrate;
         this.parity=this.allsettings[0].parity;
         this.stopBit=this.allsettings[0].stopBit;
         this.dataBit=this.allsettings[0].dataBit;
         this.terminate=this.allsettings[0].terminate;
        
         this.isLoading = false;
        // this.settingssubscription.unsubscribe();
      }else{
        this.isLoading = false;
        this.toastr.error('plese try again');
      }
    // });
  }


  genaralSettingFunction(){
    this.connectivitySettingObj = {
      "timeOut":this.timeOut,
      "screenSaverDelay":this.screenSaverDelay,
      "displayBrightness":this.displayBrightness,
      "unitOfMeasurment": this.unitOfMeasurment,
      "userLanguage":this.userLanguage,
      "modelNumber":this.modelNumber,
      "softwareVersion":this.softwareVersion,
      "mainboardVersion":this.mainboardVersion,
      "lineSensorVersion":this.lineSensorVersion,
      "validationInterval":this.validationInterval,
      "gracePeriod":this.gracePeriod,
      "uponExpiration":this.uponExpiration,
      }
    // this._mqttService.unsafePublish('grayscale_input', JSON.stringify(this.connectivitySettingObj), { qos: 1, retain: false })
    // this.genaralSettingssubscription = this._mqttService.observe('grayscale_input').subscribe((message: IMqttMessage) => {
    // let obj = JSON.parse(message.payload.toString());
    // console.log(obj)
      let res = true;
      if(res){
        this.toastr.success('success message');
         this.isLoading = false;
        // this.genaralSettingssubscription.unsubscribe();
      }else{
        this.isLoading = false;
        this.toastr.error('plese try again');
      }
    // });
  }

  connectivitySettingFunction(){
    this.genaralSettingObj = {
        "serialMode":this.serialMode,
        "communicationStnd":this.communicationStnd,
        "baudrate":this.baudrate,
        "parity":this.parity,
        "stopBit":this.stopBit,
        "dataBit":this.dataBit,
        "terminate":this.terminate
      }
    // this._mqttService.unsafePublish('grayscale_input', JSON.stringify(this.genaralSettingObj), { qos: 1, retain: false })
    // this.connectivitySettingssubscription = this._mqttService.observe('grayscale_input').subscribe((message: IMqttMessage) => {
    // let obj = JSON.parse(message.payload.toString());
    // console.log(obj)
      let res = true;
      if(res){
        this.toastr.success('success message');
         this.isLoading = false;
        // this.connectivitySettingssubscription.unsubscribe();
      }else{
        this.isLoading = false;
        this.toastr.error('plese try again');
      }
    // });
  }




  ValidationModelFunction(validationSchedule) {
	  this.modalOption.backdrop = 'static';
	  this.modalOption.keyboard = false;
	  this.modalOption.windowClass = 'custom-modalv1';
	  this.validationSchedule = this.modalService.open(validationSchedule, this.modalOption);
	}


 saveValidationSetting(){

 }
NetworkConfigurator(){
  
}
togglefunction(item){
    if(item){
      this.isHvControl = false;
    }else{
      this.isHvControl = true;
    }
}
digitalOutputValChange(item,val){

	if(val == 'MachineHealthWhite'){if(item){this.isMachineHealthWhite = false;}else{this.isMachineHealthWhite = true;}
	}else if(val=='MachineHealthGreen'){if(item){this.isMachineHealthGreen = false;}else{this.isMachineHealthGreen = true;}
	}else if(val=='MachineHealthYellow'){if(item){this.isMachineHealthYellow = false;}else{this.isMachineHealthYellow = true;}
	}else if(val=='MachineHealthRed'){if(item){this.isMachineHealthRed = false;}else{this.isMachineHealthRed = true;}
	}else if(val=='MachineHealthBlue'){if(item){this.isMachineHealthBlue = false;}else{this.isMachineHealthBlue = true;}
	}else if(val=='MachineHealthBuzzer'){if(item){this.isMachineHealthBuzzer = false;}else{this.isMachineHealthBuzzer = true;}
	}
  else if(val == 'XrayONWhite'){if(item){this.isXrayONWhite = false;}else{this.isXrayONWhite = true;}
}else if(val=='XrayONGreen'){if(item){this.isXrayONGreen = false;}else{this.isXrayONGreen = true;}
}else if(val=='XrayONYellow'){if(item){this.isXrayONYellow = false;}else{this.isXrayONYellow = true;}
}else if(val=='XrayONRed'){if(item){this.isXrayONRed = false;}else{this.isXrayONRed = true;}
}else if(val=='XrayONBlue'){if(item){this.isXrayONBlue = false;}else{this.isXrayONBlue = true;}
}else if(val=='XrayONBuzzer'){if(item){this.isXrayONBuzzer = false;}else{this.isXrayONBuzzer = true;}
}  else if(val == 'ProductFailureWhite'){if(item){this.isProductFailureWhite = false;}else{this.isProductFailureWhite = true;}
}else if(val=='ProductFailureGreen'){if(item){this.isProductFailureGreen = false;}else{this.isProductFailureGreen = true;}
}else if(val=='ProductFailureYellow'){if(item){this.isProductFailureYellow = false;}else{this.isProductFailureYellow = true;}
}else if(val=='ProductFailureRed'){if(item){this.isProductFailureRed = false;}else{this.isProductFailureRed = true;}
}else if(val=='ProductFailureBlue'){if(item){this.isProductFailureBlue = false;}else{this.isProductFailureBlue = true;}
}else if(val=='ProductFailureBuzzer'){if(item){this.isProductFailureBuzzer = false;}else{this.isProductFailureBuzzer = true;}
}
else if(val == 'OutputErrorWhite'){if(item){this.isOutputErrorWhite = false;}else{this.isOutputErrorWhite = true;}
}else if(val=='OutputErrorGreen'){if(item){this.isOutputErrorGreen = false;}else{this.isOutputErrorGreen = true;}
}else if(val=='OutputErrorYellow'){if(item){this.isOutputErrorYellow = false;}else{this.isOutputErrorYellow = true;}
}else if(val=='OutputErrorRed'){if(item){this.isOutputErrorRed = false;}else{this.isOutputErrorRed = true;}
}else if(val=='OutputErrorBlue'){if(item){this.isOutputErrorBlue = false;}else{this.isOutputErrorBlue = true;}
}else if(val=='OutputErrorBuzzer'){if(item){this.isOutputErrorBuzzer = false;}else{this.isOutputErrorBuzzer = true;}
}
else if(val == 'NotInspectingWhite'){if(item){this.isNotInspectingWhite = false;}else{this.isNotInspectingWhite = true;}
}else if(val=='NotInspectingGreen'){if(item){this.isNotInspectingGreen = false;}else{this.isNotInspectingGreen = true;}
}else if(val=='NotInspectingYellow'){if(item){this.isNotInspectingYellow = false;}else{this.isNotInspectingYellow = true;}
}else if(val=='NotInspectingRed'){if(item){this.isNotInspectingRed = false;}else{this.isNotInspectingRed = true;}
}else if(val=='NotInspectingBlue'){if(item){this.isNotInspectingBlue = false;}else{this.isNotInspectingBlue = true;}
}else if(val=='NotInspectingBuzzer'){if(item){this.isNotInspectingBuzzer = false;}else{this.isNotInspectingBuzzer = true;}
}
else if(val == 'EmergencyStopWhite'){if(item){this.isEmergencyStopWhite = false;}else{this.isEmergencyStopWhite = true;}
}else if(val=='EmergencyStopGreen'){if(item){this.isEmergencyStopGreen = false;}else{this.isEmergencyStopGreen = true;}
}else if(val=='EmergencyStopYellow'){if(item){this.isEmergencyStopYellow = false;}else{this.isEmergencyStopYellow = true;}
}else if(val=='EmergencyStopRed'){if(item){this.isEmergencyStopRed = false;}else{this.isEmergencyStopRed = true;}
}else if(val=='EmergencyStopBlue'){if(item){this.isEmergencyStopBlue = false;}else{this.isEmergencyStopBlue = true;}
}else if(val=='EmergencyStopBuzzer'){if(item){this.isEmergencyStopBuzzer = false;}else{this.isEmergencyStopBuzzer = true;}
}
	

	}

}
