import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { filter, startWith } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

// todo: Переделать в абстракный класс. Реализовать модели "прокси" для TaigaUI_Controls
export class ControlBaseModel{

    /**
     * Инкремент айдишника контролов
     */
    private static _autoControlID: number = 0;

    /**Отрабатывает при изменении значения */
    public get valueChanges$(): Observable<any> {
        return this.control.valueChanges;
    }


    /** Subject события на фокус */
    public focused$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /** Имя контрола */
    public name: string;

    /** Признак, что контрол обязателен для заполнения */
    public isRequired: boolean = false;
    /** Флаг показывающий в фокусе контрол или нет */
    public get isFocused(): boolean {
        return this.focused$.getValue();
    };
    /** модель контрола */
    public control: AbstractControl;


    /** Базовая модель контрола */
    constructor(name: string, control: FormControl) {
        this.name = name;
        this.control = control;


        this.control.statusChanges
            .pipe(
                filter((status: string) => {
                    return (status === "invalid" || status === "valid");
                }),
                startWith(null)
            )
            .subscribe(() => {
            });

    }

    /**
     * помечает контрол как потроганный
     * @param onlySelf если false то обновит значение для всей формы, иначе только для одного контрола
     */
    public markAsTouched(onlySelf: boolean = false): void {
        this.control.markAsTouched({ onlySelf: onlySelf });
        (this.control.statusChanges as EventEmitter<any>).emit('TOUCHED'); // for OnPush
    }

    /**
     * Когда вы добавляете или удаляете валидатор во время выполнения, нужно вызвать этот метод, чтобы изменения зафиксировались.
     * Также можно использовать для возбуждения valueChanges формы.
     * @param onlySelf - если false то обновит значение для всей формы, иначе только для одного контрола
     * @param emitEvent - возбудит событие valueChanges.
     */
    public updateValueAndValidity(onlySelf: boolean, emitEvent: boolean): void {
        this.control.updateValueAndValidity({ onlySelf, emitEvent });
    }

    /** Получить текущее значение контрола */
    public getValue(): any {
        return this.control.value;
    }

    /**
     * Установка значения в контрол
     * @param value новое значение контрола
     * @param change Вызовет valueChanges
     * @param markAsTouched если true, то контрол будет считаться потроганным
     */
    public setValue(value: any, change: boolean = true, markAsTouched: boolean = true): void {
        this.control.setValue(value, { emitEvent: change });
        if (markAsTouched) {
            this.control.markAsTouched();
        }
    }


}
