import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { FiltroMenu } from './menu.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [ MenuComponent, FiltroMenu ],
  exports: [ MenuComponent, FiltroMenu ],
  imports: [ CommonModule ]
})

export class MenuModule { }