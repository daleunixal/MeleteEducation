import {NgModule, Type} from '@angular/core';
import {RegisterWebComponentComponent} from './register/register.web.component.component';
import {CommonModule} from '@angular/common';
import {CabinetWebRoutes} from './cabinet.module.routes';

const components: Array<Type<any>> = [
  RegisterWebComponentComponent
]

@NgModule({
  imports: [
    CommonModule,
    CabinetWebRoutes
  ],
  exports: [],
  declarations: components,
  providers: []
})
export class CabinetWebModule{

}
