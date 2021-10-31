import { RegisterTransferModel } from '../data/dto/register.transfer-model';
import { FormControl } from '@angular/forms';
import { FormBaseViewModel } from 'common-models/forms/form.base.model';
import { ControlBaseModel } from '../../../../../../common-models/controls/control.base.model';

export class RegisterViewModel extends FormBaseViewModel<RegisterTransferModel>{
    public model!: RegisterTransferModel;

    public updateModel(model: RegisterTransferModel): void {
        model.password = this.controlsMap["password"].getValue();
    }

    protected fillFromModel(model: RegisterTransferModel): void {
    }

    protected setInitialControls(): ControlBaseModel[] {
        return [
            new ControlBaseModel("name", new FormControl('')),
            new ControlBaseModel("login", new FormControl('')),
            new ControlBaseModel("password", new FormControl(''))
        ];
    }

}
