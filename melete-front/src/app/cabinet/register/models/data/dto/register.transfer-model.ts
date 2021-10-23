import { DataTransferBaseModel } from 'common-models/data-models/data-transfer-base-model';
import {IRegisterTransferModel} from './interfaces/register.transfer-interface';

export class RegisterTransferModel extends DataTransferBaseModel<IRegisterTransferModel> implements IRegisterTransferModel {
  public email?: string;
  public number?: string;
  public login!: string;
  public password!: string;


  constructor(data?: IRegisterTransferModel) {
    super();
    if (data) {
      this.email = data.email;
      this.login = data.login;
      this.number = data.number;
      this.password = data.password;
    }
  }

  public toDto(): IRegisterTransferModel {
      return {
        email: this.email,
        login: this.login,
        number: this.number,
        password: this.password
    };
  }
}
