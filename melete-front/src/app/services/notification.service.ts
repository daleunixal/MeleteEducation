import { Injectable } from '@angular/core';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';

@Injectable({
    providedIn: 'root'
})
export class MeduNotificationService {

    constructor(
        private _notifyService: TuiNotificationsService
    ) {
    }

    public sendAuthWarning(reason: string): void {
        this._notifyService.show(reason, {
            label: 'Авторизация',
            autoClose: 2500,
            status: TuiNotification.Warning
        }).subscribe();
    }

    public sendNotImplemented(): void {
        this._notifyService
            .show('К сожалению, данный курс недоступен для просмотра',
                {
                    label: 'Нереализованная часть',
                    status: TuiNotification.Error,
                    autoClose: true
                }).subscribe();
    }

    public sendNotValidForm(): void {
        this._notifyService.show('Пожалуйста, проверьте корректность введенных данных',
            {
                label: 'Ошибка формы',
                autoClose: 3000,
                status: TuiNotification.Warning
            }
        ).subscribe();
    }

    public sendPassStatus(message?: string): void{
        this._notifyService.show(message?? "Операция успешна😎",
            {
                label: "Статус операции",
                autoClose: 3000,
                status: TuiNotification.Success
            }).subscribe();
    }
}
