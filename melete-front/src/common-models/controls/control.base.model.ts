import { AbstractControl } from '@angular/forms';


export abstract class ControlBaseModel{
    public name!: string;
    public control!: AbstractControl
}