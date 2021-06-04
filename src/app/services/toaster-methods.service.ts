import { Injectable, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// import { CommonUrl } from '../services/common-url';

@Injectable({ providedIn: 'root'})
export class ToasterMethods {

    constructor(private toastr: ToastrService) {
    }

    showSuccess(msg) {
        this.toastr.success(msg, 'Success !');
    }

    showError(msg) {
        this.toastr.error(msg, 'Error !');
    }

    showWarning(msg) {
        this.toastr.warning(msg, 'Alert !');
    }

    showInfo(info) {
        this.toastr.info(info);
    }

    showProgress(msg){
        // this.toastr.
    }
}