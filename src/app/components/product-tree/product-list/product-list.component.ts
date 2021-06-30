import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterMethods } from "../../../services/toaster-methods.service";
import { AuthenticationService } from '../../../services/authntication.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash-es'
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [AuthenticationService,ToasterMethods]
  
})
export class productlistComponent implements OnInit {
	private productListsubscription: Subscription;
	private deleteProductsubscription: Subscription;
	public isLoading:boolean;
	public uIDObj:any={};
	public UID:any="sdfsfjygwf655gf-34543f-fy45674";
	public ProductID:any;
	public allProductList:any=[];
	modalOption: NgbModalOptions = {};
	public deleteProductModel: NgbModalRef;
constructor(private modalService: NgbModal, private _mqttService: MqttService, private toastr: ToastrService,private router: Router,private _authenticationService: AuthenticationService) {
	this.UID = localStorage.getItem('uID');
	if (this.UID == '' || this.UID == null || this.UID == undefined) {
		this.toastr.error('Failed, Something went wrong');
		this.router.navigate(['/authentication/login']);
	} else{
		this.isLoading = true;
	}
}

ngOnInit() {
	this.getProductList();
}

getProductList(){
	this.uIDObj = {
		"uID":this.UID
		}
	this._mqttService.unsafePublish('grayscale_input', JSON.stringify(this.uIDObj), { qos: 1, retain: true })
	this.productListsubscription = this._mqttService.observe('grayscale_input').subscribe((message: IMqttMessage) => {
		let obj = JSON.parse(message.payload.toString());
		console.log(obj)
		
		let res = true;
		this.allProductList =[];
		if(res){
			this.allProductList = 
			[
			{
				"number":1,
				"name":"Tuna Pouch",
				"productCode":"123",
				"image": "assets/images/productimg/product1.PNG",
				"productlength":"120",
				"inspectionBeltSpeed":"25",
				"rejectorBeltSpeed":"25",
				"tubeVoltage":"20",
				"tubeCurrent":"15",
				"consecutivefailure":"Enabled",
				"consecutiveVariable":"5",
				"minimumSealwidthTop":"0.25",
				"maximumSealwidthTop":"0.25",
				"minimumSealwidthBottom":"0.25",
				"maximumSealWidthBottom":"0.25",
				"minimumSealwidthRightSide":"0.25",
				"maximimSealwidthRightSide":"0.25",
				"minimumSealwidthLeftSide":"0.25",
				"maximumSealwidthLeftSide":"0.25"
			},
			{
				"number":2,
				"name":"Soup Pouch",
				"productCode":"456",
				"image": "assets/images/productimg/product2.PNG",
				"productlength":"120",
				"inspectionBeltSpeed":"25",
				"rejectorBeltSpeed":"25",
				"tubeVoltage":"20",
				"tubeCurrent":"15",
				"consecutivefailure":"Enabled",
				"consecutiveVariable":"5",
				"minimumSealwidthTop":"0.25",
				"maximumSealwidthTop":"0.25",
				"minimumSealwidthBottom":"0.25",
				"maximumSealWidthBottom":"0.25",
				"minimumSealwidthRightSide":"0.25",
				"maximimSealwidthRightSide":"0.25",
				"minimumSealwidthLeftSide":"0.25",
				"maximumSealwidthLeftSide":"0.25"
			},
			{
				"number":3,
				"name":"Protein Pouch",
				"productCode":"346",
				"image": "assets/images/productimg/product3.PNG",
				"productlength":"120",
				"inspectionBeltSpeed":"25",
				"rejectorBeltSpeed":"25",
				"tubeVoltage":"20",
				"tubeCurrent":"15",
				"consecutivefailure":"Enabled",
				"consecutiveVariable":"5",
				"minimumSealwidthTop":"0.25",
				"maximumSealwidthTop":"0.25",
				"minimumSealwidthBottom":"0.25",
				"maximumSealWidthBottom":"0.25",
				"minimumSealwidthRightSide":"0.25",
				"maximimSealwidthRightSide":"0.25",
				"minimumSealwidthLeftSide":"0.25",
				"maximumSealwidthLeftSide":"0.25"
			},
			{
				"number":4,
				"name":"Pill Pouch",
				"productCode":"678",
				"image": "assets/images/productimg/product4.PNG",
				"productlength":"120",
				"inspectionBeltSpeed":"25",
				"rejectorBeltSpeed":"25",
				"tubeVoltage":"20",
				"tubeCurrent":"15",
				"consecutivefailure":"Enabled",
				"consecutiveVariable":"5",
				"minimumSealwidthTop":"0.25",
				"maximumSealwidthTop":"0.25",
				"minimumSealwidthBottom":"0.25",
				"maximumSealWidthBottom":"0.25",
				"minimumSealwidthRightSide":"0.25",
				"maximimSealwidthRightSide":"0.25",
				"minimumSealwidthLeftSide":"0.25",
				"maximumSealwidthLeftSide":"0.25"
			},
			{
				"number":5,
				"name":"Tea Pouch",
				"productCode":"325",
				"image": "assets/images/productimg/product5.PNG",
				"productlength":"120",
				"inspectionBeltSpeed":"25",
				"rejectorBeltSpeed":"25",
				"tubeVoltage":"20",
				"tubeCurrent":"15",
				"consecutivefailure":"Enabled",
				"consecutiveVariable":"5",
				"minimumSealwidthTop":"0.25",
				"maximumSealwidthTop":"0.25",
				"minimumSealwidthBottom":"0.25",
				"maximumSealWidthBottom":"0.25",
				"minimumSealwidthRightSide":"0.25",
				"maximimSealwidthRightSide":"0.25",
				"minimumSealwidthLeftSide":"0.25",
				"maximumSealwidthLeftSide":"0.25"
			},
			{
				"number":6,
				"name":"Tuna Pouch",
				"productCode":"123",
				"image": "assets/images/productimg/product1.PNG",
				"productlength":"120",
				"inspectionBeltSpeed":"25",
				"rejectorBeltSpeed":"25",
				"tubeVoltage":"20",
				"tubeCurrent":"15",
				"consecutivefailure":"Enabled",
				"consecutiveVariable":"5",
				"minimumSealwidthTop":"0.25",
				"maximumSealwidthTop":"0.25",
				"minimumSealwidthBottom":"0.25",
				"maximumSealWidthBottom":"0.25",
				"minimumSealwidthRightSide":"0.25",
				"maximimSealwidthRightSide":"0.25",
				"minimumSealwidthLeftSide":"0.25",
				"maximumSealwidthLeftSide":"0.25"
			},
			{
				"number":7,
				"name":"Soup Pouch",
				"productCode":"456",
				"image": "assets/images/productimg/product2.PNG",
				"productlength":"120",
				"inspectionBeltSpeed":"25",
				"rejectorBeltSpeed":"25",
				"tubeVoltage":"20",
				"tubeCurrent":"15",
				"consecutivefailure":"Enabled",
				"consecutiveVariable":"5",
				"minimumSealwidthTop":"0.25",
				"maximumSealwidthTop":"0.25",
				"minimumSealwidthBottom":"0.25",
				"maximumSealWidthBottom":"0.25",
				"minimumSealwidthRightSide":"0.25",
				"maximimSealwidthRightSide":"0.25",
				"minimumSealwidthLeftSide":"0.25",
				"maximumSealwidthLeftSide":"0.25"
			},
			{
				"number":8,
				"name":"Protein Pouch",
				"productCode":"346",
				"image": "assets/images/productimg/product3.PNG",
				"productlength":"120",
				"inspectionBeltSpeed":"25",
				"rejectorBeltSpeed":"25",
				"tubeVoltage":"20",
				"tubeCurrent":"15",
				"consecutivefailure":"Enabled",
				"consecutiveVariable":"5",
				"minimumSealwidthTop":"0.25",
				"maximumSealwidthTop":"0.25",
				"minimumSealwidthBottom":"0.25",
				"maximumSealWidthBottom":"0.25",
				"minimumSealwidthRightSide":"0.25",
				"maximimSealwidthRightSide":"0.25",
				"minimumSealwidthLeftSide":"0.25",
				"maximumSealwidthLeftSide":"0.25"
			},
			{
				"number":9,
				"name":"Pill Pouch",
				"productCode":"678",
				"image": "assets/images/productimg/product4.PNG",
				"productlength":"120",
				"inspectionBeltSpeed":"25",
				"rejectorBeltSpeed":"25",
				"tubeVoltage":"20",
				"tubeCurrent":"15",
				"consecutivefailure":"Enabled",
				"consecutiveVariable":"5",
				"minimumSealwidthTop":"0.25",
				"maximumSealwidthTop":"0.25",
				"minimumSealwidthBottom":"0.25",
				"maximumSealWidthBottom":"0.25",
				"minimumSealwidthRightSide":"0.25",
				"maximimSealwidthRightSide":"0.25",
				"minimumSealwidthLeftSide":"0.25",
				"maximumSealwidthLeftSide":"0.25"
			},
			{
				"number":10,
				"name":"Tea Pouch",
				"productCode":"325",
				"image": "assets/images/productimg/product5.PNG",
				"productlength":"120",
				"inspectionBeltSpeed":"25",
				"rejectorBeltSpeed":"25",
				"tubeVoltage":"20",
				"tubeCurrent":"15",
				"consecutivefailure":"Enabled",
				"consecutiveVariable":"5",
				"minimumSealwidthTop":"0.25",
				"maximumSealwidthTop":"0.25",
				"minimumSealwidthBottom":"0.25",
				"maximumSealWidthBottom":"0.25",
				"minimumSealwidthRightSide":"0.25",
				"maximimSealwidthRightSide":"0.25",
				"minimumSealwidthLeftSide":"0.25",
				"maximumSealwidthLeftSide":"0.25"
			},
			]
			this.isLoading = false;
			this.productListsubscription.unsubscribe();
		}else{
			this.isLoading = false;
			this.toastr.error('plese try again');
		}
	});
}
deleteProductModelFunction(delete_product) {
	this.modalOption.backdrop = 'static';
	this.modalOption.keyboard = false;
	this.modalOption.windowClass = 'custom-modalv1';
	this.deleteProductModel = this.modalService.open(delete_product, this.modalOption);
}
StatusFunction(id){
	this.ProductID = '';
	this.ProductID = id;
}
productDeleteFunction(){
	let deleteObj = {"id": this.ProductID,"status":"D"}
	this._mqttService.unsafePublish('grayscale', JSON.stringify(deleteObj), { qos: 1, retain: false })
	this.deleteProductsubscription = this._mqttService.observe('grayscale').subscribe((message: IMqttMessage) => {
	let obj = JSON.parse(message.payload.toString());
	console.log(obj)
	let res = true;
	if(res){
		this.toastr.success('Product deleted successfully');
		this.getProductList();
		this.deleteProductModel.close();
		this.deleteProductsubscription.unsubscribe();
	}else{
		this.toastr.error('plese try again');
	}
  });
}

sortingDsending(item){
	if(item == 'Number'){
		this.allProductList.sort(function (a, b) {
			return  b.number - a.number ;
		});
	}else if(item == 'name'){
		this.allProductList.sort(function (a, b) {
			var nameA = a.name.toUpperCase(); 
			var nameB = b.name.toUpperCase(); 
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
	}else if(item == 'productCode'){
		this.allProductList.sort(function (a, b) {
			return  b.productCode - a.productCode ;
		});
	}
}
SortingAsending(item){
	if(item == 'Number'){
		this.allProductList.sort(function (a, b) {
			return  a.number - b.number;
		});
	}else if(item == 'name'){
		this.allProductList.sort(function (a, b) {
			var nameA = a.name.toUpperCase(); 
			var nameB = b.name.toUpperCase(); 
			if (nameA > nameB) {
				return -1;
			}
			if (nameA < nameB) {
				return 1;
			}
			return 0;
		});
	}else if(item == 'productCode'){
		this.allProductList.sort(function (a, b) {
			return  a.productCode - b.productCode;
		});
	}
}

addNewProduct(){
	this.router.navigate(['/machine/product-add']);
}
editProductFunction(editproduct){
	localStorage.setItem('ProductDetails', JSON.stringify(editproduct))
	this.router.navigate(['/machine/product-edit']);
}
viewProductFunction(viewProduct){
	localStorage.setItem('ProductDetails', JSON.stringify(viewProduct))
	this.router.navigate(['/machine/product-view']);
}
cloneProductFunction(cloneProduct){
	localStorage.setItem('ProductDetails', JSON.stringify(cloneProduct))
	this.router.navigate(['/machine/product-clone']);
}
}
