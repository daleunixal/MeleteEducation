import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IProfileRegisterRequest } from '../models/interfaces/profile-register-request.interface';
import { map, tap } from 'rxjs/operators';
import { IProfileLoginRequest } from '../models/interfaces/profile-login-request.interface';
import { IProfileLoginResponse } from '../models/interfaces/profile-login-response.interface';
import { MeduNotificationService } from './notification.service';

@Injectable()
export class ProfileManagerService{
    private static _userToken: string

    public get userToken(): string{
        if(!ProfileManagerService._userToken){
            const token: string | null = localStorage.getItem('melete-token');
            if(!token){
                this._router.navigate(['cabinet']);
                throw new Error('token undefined');
            }
            ProfileManagerService._userToken = token
        }

        return ProfileManagerService._userToken;
    }

    constructor(
        private _router: Router,
        private _clientHttp: HttpClient,
        private _noti: MeduNotificationService,
    ) {
    }

    public register(data: IProfileRegisterRequest): Observable<boolean>{
        return this._clientHttp.post('/profile/register', data, {
            responseType: 'text' as 'json'
        }).pipe(
            map((value) => {
                if (value){
                    return true
                }

                return false
            })
        )
    }

    public login(data: IProfileLoginRequest): Observable<boolean>{
        return this._clientHttp.post<IProfileLoginResponse>('/profile/login', data)
            .pipe(
                tap((response: IProfileLoginResponse) => {
                    if(response && response.token){
                        ProfileManagerService._userToken = response.token;
                        this._noti.sendPassStatus("Вы успешно вошли в систему")
                    }
                }),
                map((value: IProfileLoginResponse) => {
                if (value){
                    return true
                }

                return false
            })
        )
    }

    public validateToken(): Observable<boolean>{
        return this._clientHttp.get<{isValid: boolean}>('/profile/info').pipe(
            map((val) => {
                return val.isValid
            })
        )
    }


    public debug(): Observable<string>{
        return this._clientHttp.get<string>('/kpo')
    }
}
