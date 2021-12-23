import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileManagerService } from '../../../services/profile-manager.service';
import { Observable } from 'rxjs';
import { ProfileModel } from '../../../models/profile/profile.model';

@Component({
    selector: "header-layer",
    templateUrl: "./header.component.html",
    styleUrls: ['styles/styles.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLayerComponent implements OnInit{

    public profile!: Observable<ProfileModel | null>

    constructor(
        private _router: Router,
        private _profile: ProfileManagerService,
    ) {
    }

    public ngOnInit(): void {
        this.profile = this._profile.profile
    }

    public redirectLogin(): void{
        this._router.navigateByUrl('/cabinet/login')
    }

    public toAccount(): void{
        this._router.navigate(['cabinet', 'account'])
    }
}
