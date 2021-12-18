import { Component, OnInit } from '@angular/core';
import { ProfileManagerService } from './services/profile-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent{

    constructor(
        private _profileMan: ProfileManagerService
    ) {
        this._profileMan.initializeApp();
    }

}
