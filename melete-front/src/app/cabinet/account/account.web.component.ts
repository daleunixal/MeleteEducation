import { Component, OnInit } from '@angular/core';
import { ProfileManagerService } from '../../services/profile-manager.service';
import { Router } from '@angular/router';
import { ProfileModel } from '../../models/profile/profile.model';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-account',
    templateUrl: './account.web.component.html',
    styleUrls: ['./styles/styles.less']
})
export class AccountWebComponent implements OnInit{

    public profileData$!: Observable<ProfileModel | null>

    constructor(
        private _profileManagerService: ProfileManagerService,
        private _router: Router,
    ) {

    }

    public ngOnInit(): void {
        this.profileData$ = this._profileManagerService.profile.pipe(
            filter((x) => !!x)
        );
    }

    public logout(): void{
        this._profileManagerService.logout().subscribe({
            next: () => this._router.navigate(['dashboard'])
        })
    }
}
