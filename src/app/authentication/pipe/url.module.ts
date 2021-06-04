import { SafePipe } from './url.pipe';
import { NgModule } from '@angular/core';
@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    SafePipe
  ],
  exports: [
    SafePipe
  ]
})
export class urlPipesModule {}