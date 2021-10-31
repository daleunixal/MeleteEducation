import { Component, OnInit } from '@angular/core';
import { RegisterViewModel } from './models/view-model/register.view-model';

@Component({
  selector: 'medu-register.web.component',
  templateUrl: './register.web.component.component.html',
  styleUrls: ['./styles/register.web.component.component.less']
})
export class RegisterWebComponentComponent implements OnInit {

    public model!: RegisterViewModel;

  constructor() { }

  public ngOnInit(): void {
      this.model = new RegisterViewModel();
  }

}
