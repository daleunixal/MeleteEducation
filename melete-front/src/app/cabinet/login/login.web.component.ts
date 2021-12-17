import { Component, OnInit } from '@angular/core';
import { LoginViewModel } from './models/view-model/login.view-model';
import { FormBuilder } from '@angular/forms';
import { ProfileManagerService } from '../../services/profile-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'medu-register.web.component',
  templateUrl: './login.web.component.html',
  styleUrls: ['./styles/login.web.component.less']
})
export class LoginWebComponent implements OnInit {

    public model!: LoginViewModel;

  constructor(
      private _fb: FormBuilder,
      private _profileManagerService: ProfileManagerService,
      private _router: Router,
  ) { }

  public ngOnInit(): void {
      this.model = new LoginViewModel(this._fb);
  }

  public onSubmit(): void{
      console.log(this.model.toModel())
      this._profileManagerService.login(this.model.toModel()).subscribe()
  }
}
