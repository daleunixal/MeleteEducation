import { Component, OnInit } from '@angular/core';
import { RegisterViewModel } from './models/view-model/register.view-model';
import { FormBuilder } from '@angular/forms';
import { ProfileManagerService } from '../../services/profile-manager.service';
import { Route, Router } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { takeUntil } from 'rxjs/operators';
import { TuiNotificationsService } from '@taiga-ui/core';
import { MeduNotificationService } from '../../services/notification.service';

@Component({
    selector: 'medu-register.web.component',
    templateUrl: './register-web.component.html',
    styleUrls: ['./styles/register.web.component.component.less'],
    providers: [
        TuiDestroyService
    ]
})
export class RegisterWebComponent implements OnInit {

    public model!: RegisterViewModel;

    constructor(
        private _fb: FormBuilder,
        private _profileManagerService: ProfileManagerService,
        private _router: Router,
        private _destroy$: TuiDestroyService,
        private _notify: MeduNotificationService,
    ) {
    }

    public ngOnInit(): void {
        this.model = new RegisterViewModel(this._fb);
    }

    public onSubmit(): void {
        console.log(this.model.toModel())
        this._profileManagerService.register(this.model.toModel())
            .pipe(
                takeUntil(this._destroy$)
            )
            .subscribe({
                next: (value) => {
                    if (value) {
                        this._router.navigate(['login'], {
                            queryParams: {
                                login: this.model.toModel().username
                            }
                        })
                    }
                },
                error: (err) => {
                    this._notify.sendNotValidForm()
                }
            })
    }
}
