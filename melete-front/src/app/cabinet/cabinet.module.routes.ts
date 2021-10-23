import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { RegisterWebComponentComponent } from './register/register.web.component.component';

const routes: Routes = [
    { path: '', redirectTo: 'register'},
    { path: 'register', component: RegisterWebComponentComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CabinetWebRoutes {
}
