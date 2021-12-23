import { NgModule, Type } from '@angular/core';
import { RegisterWebComponent } from './register/register-web.component';
import { CommonModule } from '@angular/common';
import { CabinetWebRoutes } from './cabinet.module.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule, TuiIslandModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { HttpClient } from '@angular/common/http';
import { ProfileManagerService } from '../services/profile-manager.service';
import { LoginWebComponent } from './login/login.web.component';
import { MeduNotificationService } from '../services/notification.service';
import { AccountWebComponent } from './account/account.web.component';
import { TuiLetModule } from '@taiga-ui/cdk';

const components: Array<Type<any>> = [
    RegisterWebComponent,
    LoginWebComponent,
    AccountWebComponent,
]

@NgModule({
    imports: [
        CommonModule,
        CabinetWebRoutes,
        ReactiveFormsModule,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiIslandModule,
        TuiButtonModule,
        TuiLetModule,
    ],
    exports: [],
    declarations: components,
    providers: [
        HttpClient,
        ProfileManagerService,
        MeduNotificationService
    ]
})
export class CabinetWebModule {

}
