import { AbstractControl } from '@angular/forms';

// todo: Переделать в абстракный класс. Реализовать модели "прокси" для TaigaUI_Controls
export class ControlBaseModel{
    public name!: string;
    public control!: AbstractControl

    constructor(title: string, control: AbstractControl) {
    }
}
