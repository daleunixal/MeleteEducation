import { AbstractControl, Form, FormBuilder, FormGroup, NG_ASYNC_VALIDATORS, Validators } from "@angular/forms";
import { ControlBaseModel } from '../controls/control.base.model';

export abstract class FormBaseViewModel<T>{

    public abstract model: T;
    public controls: ControlBaseModel[] = [];
    /** все контролы формы с именем контрола в качестве ключа */
    private _controlsMap: { [name: string]: ControlBaseModel } = {};

    private _form!: FormGroup;

    /**
     *
     */
    constructor(
        private _fb: FormBuilder
    ) {
        this.initialize()
    }

    /**
     * Заполняет модель данными из формы
     *
     * @abstract
     * @param {T} model
     * @memberof FormBaseViewModel
     */
    public abstract updateModel(model: T): void;


    protected initialize(): void{
        
    }

    /**
     * Заполняет форму из модели
     *
     * @protected
     * @param {T} model
     * @memberof FormBaseViewModel
     */
    protected abstract fillFromModel(model: T): void;

    /**
     * Устанавливает в форму контролы
     *
     * @protected
     * @abstract
     * @memberof FormBaseViewModel
     */
    protected abstract setInitialControls(): void;

    private setForm(): void{
        const formGroup: { [name: string]: AbstractControl } = {};
        this.controls.forEach((control: ControlBaseModel) => {
            this._controlsMap[control.name] = control;
            formGroup[control.name] = control.control;
        });
        this._form = new FormGroup(formGroup);
    }

    

}