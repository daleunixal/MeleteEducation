import { Component, OnInit } from '@angular/core';
import { LoginViewModel } from './models/view-model/login.view-model';
import { FormBuilder } from '@angular/forms';
import { ProfileManagerService } from '../../services/profile-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

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
      private _aRouter: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
      this.model = new LoginViewModel(this._fb);
      // TODO: Если уже в профиле, то редирект на личный кабинет
      this._aRouter.queryParamMap
          .pipe(
              tap((params) => {
                  const username: string | null = params.get('login')
                  if(username){
                      this.model.setUsername(username);
                  }

              })
          )
          .subscribe()

  }

  public onSubmit(): void{
      this._profileManagerService.login(this.model.toModel()).subscribe()
  }

  public navigateToRegistration(): void {
      this._router.navigate(['cabinet', 'register']);
  }
}
