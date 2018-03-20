import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { FiltroMenu } from './menu.pipe';

@NgModule({
  declarations: [ MenuComponent, FiltroMenu ],
  exports: [ MenuComponent, FiltroMenu ]
})

export class MenuModule { }