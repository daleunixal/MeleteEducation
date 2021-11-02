// import { AbstractControl, FormGroup } from '@angular/forms';
// import { ControlBaseModel } from '../controls/control.base.model';
// import { AsyncSubject, merge, NEVER, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
//
// export abstract class FormBaseViewModel<T> {
//
//     public get form(): FormGroup {
//         return this._form;
//     }
//
//     /** Сабжект инициализации формы */
//     public onInit: AsyncSubject<boolean> = new AsyncSubject<boolean>();
//
//     /** флаг инициализации модели */
//     public initialized: boolean = false;
//
//     /** флаг валидности формы */
//     public get valid(): boolean {
//         return this.form.valid;
//     };
//
//     public loading: boolean = false;
//     /** базовая результирующая модель */
//     public modelBaseValue!: T;
//
//     public controls: ControlBaseModel[] = [];
//
//     /** все контролы формы с именем контрола в качестве ключа  */
//     public get controlsMap(): { [name: string]: ControlBaseModel } {
//         return this._controlsMap;
//     }
//
//     /** ангуляровская форм группа */
//     private _form!: FormGroup;
//     /** все контролы формы с именем контрола в качестве ключа */
//     private _controlsMap: { [name: string]: ControlBaseModel } = {};
//
//     private _form!: FormGroup;
//
//     /**
//      *
//      */
//     constructor() {
//         this.initialize();
//     }
//
//     /**
//      * Заполняет модель данными из формы
//      *
//      * @abstract
//      * @param {T} model
//      * @memberof FormBaseViewModel
//      */
//     public abstract updateModel(model: T): void;
//
//
//     /**
//      * Получение значения контрола
//      * @param name имя контрола
//      * @returns значение контрола
//      */
//     public getFormValue(name: string): any {
//         if (this._controlsMap[name] && this.initialized) {
//             return this._controlsMap[name].getValue();
//         }
//
//         return undefined;
//     }
//
//     /**
//      * Установка значения в контрол формы
//      * @param name имя контрола
//      * @param value значение
//      * @param change Вызовет valueChanges
//      * @param markAsTouched если true, то контрол будет считаться потроганным
//      */
//     public setFormValue(name: string, value: any, change: boolean = true, markAsTouched: boolean = true): void {
//         if (this._controlsMap[name] && this.initialized) {
//             this._controlsMap[name].setValue(value, change, markAsTouched);
//         }
//     }
//
//     /**
//      * Срабатывает при изменении полей формы, возвращает название изменившегося поля формы.
//      * @param excludeFields названия полей исключенные из наблюдения
//      * @param debounceTime интревал в течение которого накапливаются результаты
//      */
//     public formValueChanges(options?: { excludeFields?: string[], debounceTime?: number }): Observable<string[]> {
//         const resOptions: { excludeFields?: string[], debounceTime?: number } = plainCopy(
//             { excludeFields: [], debounceTime: 100 },
//             options || {}
//         );
//
//         if (!this.controls || !this.controls.length) {
//             return NEVER;
//         }
//         const observables: Array<Observable<string>> = [];
//
//         this.controls
//             .filter((control: ControlBaseModel) => resOptions && resOptions.excludeFields && resOptions.excludeFields.indexOf(control.name) === -1)
//             .forEach((control: ControlBaseModel) => {
//                 observables.push(control.valueChanges$
//                     .pipe(
//                         map(() => control.name)
//                     )
//                 );
//             });
//
//         return accumulateResults(merge(...observables), resOptions.debounceTime || 0)
//             .pipe(
//                 map((results: string[]) => {
//                     return distinctArray(results);
//                 })
//             );
//     }
//
//     /**
//      * трогает всю форму
//      */
//     public markAsTouched(): void {
//         this.controls.forEach((control: ControlBaseModel) => {
//             control.markAsTouched();
//         });
//     }
//
//     /**
//      * добавляет контрол к форме
//      */
//     public setControl(control: ControlBaseModel): void {
//         const controlIndex: number = this.controls.findIndex((ctrl: ControlBaseModel) => ctrl.name === ctrl.name);
//         if (controlIndex > -1) {
//             this.controls[controlIndex] = control;
//         } else {
//             this.controls.push(control);
//         }
//         this._controlsMap[control.name] = control;
//         this.form.setControl(control.name, control.control);
//     }
//
//     /**
//      * удаляет контрол из формы
//      * @param controlName
//      */
//     public removeControl(controlName: string): void {
//         const controlIndex: number = this.controls.findIndex((control: ControlBaseModel) => control.name === controlName);
//         if (controlIndex > -1) {
//             this.controls.splice(controlIndex, 1);
//             delete this._controlsMap[controlName];
//             this.form.removeControl(controlName);
//         }
//     }
//
//     /** Сравнивает данные с базовой моделью */
//     public get isUpdate(): boolean {
//         return !isEquivalent(this.toModel(), this.modelBaseValue);
//     }
//
//     /**
//      * получить контрол формы
//      * @param name имя контрола
//      */
//     public getControl(name: string): ControlBaseModel {
//         const controlIndex: number = this.controls.findIndex((control: ControlBaseModel) => control.name === name);
//         if (controlIndex > -1) {
//             return this.controls[controlIndex];
//         }
//
//         throw new Error('Контрол не существует, возможно опечатка в написании имени');
//     }
//
//     /**
//      * сделать контрол формы Untouched
//      * @param name имя контрола
//      */
//     public markAsUntouchedControl(name: string): void {
//         const controlIndex: number = this.controls.findIndex((control: ControlBaseModel) => control.name === name);
//         if (controlIndex > -1) {
//             this.controls[controlIndex].control.markAsUntouched();
//         }
//     }
//
//     /**
//      * Отменяет изменения в форме
//      */
//     public cancel(): void {
//         if (this.modelBaseValue) {
//             this.fillFromModel(this.modelBaseValue);
//         }
//         this.form.markAsPristine();
//     }
//
//     /**
//      * Установка фокуса на контрол
//      * @param name имя контрола
//      */
//     public focus(name: string): void {
//         const controlIndex: number = this.controls.findIndex((control: ControlBaseModel) => control.name === name);
//         if (controlIndex > -1) {
//             this.controls[controlIndex].focused$.next(true);
//         }
//     }
//
//
//     protected initialize(): void {
//         this.controls = this.setInitialControls();
//         this.setForm();
//         this.initialized = true;
//
//         this.onInit.next(true);
//         this.onInit.complete();
//     }
//
//
//     /**
//      * Заполняет форму из модели
//      *
//      * @protected
//      * @param {T} model
//      * @memberof FormBaseViewModel
//      */
//     protected abstract fillFromModel(model: T): void;
//
//     /**
//      * Устанавливает в форму контролы
//      *
//      * @protected
//      * @abstract
//      * @memberof FormBaseViewModel
//      */
//     protected abstract setInitialControls(): ControlBaseModel[];
//
//     private setForm(): void {
//         const formGroup: { [name: string]: AbstractControl } = {};
//         this.controls.forEach((control: ControlBaseModel) => {
//             this._controlsMap[control.name] = control;
//             formGroup[control.name] = control.control;
//         });
//         this._form = new FormGroup(formGroup);
//     }
// }
