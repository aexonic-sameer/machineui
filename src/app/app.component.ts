import { Component ,HostListener,OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './services/authntication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ TranslateService,AuthenticationService]
})

export class AppComponent implements OnInit {
  public srcuRl:any ='';
  $subs:  Subscription;
  constructor(private _authenticationService: AuthenticationService ) {
        
    
   }

   ngOnInit():void {

  }

}
