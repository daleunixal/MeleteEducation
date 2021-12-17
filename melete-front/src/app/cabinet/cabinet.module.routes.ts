import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { RegisterWebComponent } from './register/register-web.component';
import { LoginWebComponent } from './login/login.web.component';

const routes: Routes = [
    {path: '', redirectTo: 'register'},
    {path: 'register', component: RegisterWebComponent},
    {path: 'login', component: LoginWebComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CabinetWebRoutes {
}
