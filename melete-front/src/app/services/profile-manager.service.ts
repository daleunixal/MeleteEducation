import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProfileRegisterRequest } from '../models/interfaces/profile-register-request.interface';
import { map, switchMap, tap } from 'rxjs/operators';
import { IProfileLoginRequest } from '../models/interfaces/profile-login-request.interface';
import { IProfileLoginResponse } from '../models/interfaces/profile-login-response.interface';
import { MeduNotificationService } from './notification.service';
import { ProfileModel } from '../models/profile/profile.model';
import { IProfile } from '../models/interfaces/progile.interface';

@Injectable()
export class ProfileManagerService {
    private static _userToken: string
    private static _profileBehaviour: BehaviorSubject<ProfileModel | null>
        = new BehaviorSubject<ProfileModel | null>(null)

    public get profile(): Observable<ProfileModel | null> {
        return ProfileManagerService._profileBehaviour.asObservable()
    }

    private get headers(): HttpHeaders {
        return new HttpHeaders().set('Authorization', `Bearer ${ProfileManagerService._userToken}`)
    }

    public get userToken(): string {
        if (!ProfileManagerService._userToken) {
            const token: string | null = localStorage.getItem('melete_token');
            if (!token) {
                this._router.navigate(['cabinet']);
                throw new Error('token undefined');
            }
            ProfileManagerService._userToken = token
            if (!ProfileManagerService._profileBehaviour.value) {
                this.getProfileInfo(true).subscribe()
            }

            return token;
        }

        return ProfileManagerService._userToken;
    }

    constructor(
        private _router: Router,
        private _clientHttp: HttpClient,
        private _noti: MeduNotificationService,
    ) {
    }

    public initializeApp(): void {
        const token: string | null = localStorage.getItem('melete_token');
        if (token) {
            ProfileManagerService._userToken = token;
            this.getProfileInfo(true).subscribe();
        }
    }

    public register(data: IProfileRegisterRequest): Observable<boolean> {
        return this._clientHttp.post('/profile/register', data, {
            responseType: 'text' as 'json'
        }).pipe(
            map((value) => {
                if (value) {
                    return true
                }

                return false
            })
        )
    }

    public login(data: IProfileLoginRequest): Observable<IProfile | null> {
        return this._clientHttp.post<IProfileLoginResponse>('/profile/login', data)
            .pipe(
                tap((response: IProfileLoginResponse) => {
                    if (response && response.token) {
                        localStorage.setItem('melete_token', response.token);
                        ProfileManagerService._userToken = response.token;
                        this._noti.sendPassStatus('Вы успешно вошли в систему')
                        this._router.navigate([''])
                    }
                }),
                switchMap(() => {
                    return this.getProfileInfo(true)
                })
            )
    }

    public logout(): Observable<null> {
        return of(null)
            .pipe(
                tap(() => {
                    localStorage.removeItem('melete_token')
                    ProfileManagerService._profileBehaviour.next(null)
                }),
            )
    }

    public getProfileInfo(emit: boolean = false): Observable<IProfile | null> {
        return this._clientHttp.get<IProfile>('/profile/info', {
            headers: this.headers
        })
            .pipe(
                switchMap((value: IProfile) => {
                    if (!value.isValid) {
                        return this.logout()
                    }
                    if (emit) {
                        ProfileManagerService._profileBehaviour.next(new ProfileModel(value))
                    }

                    return of(value);
                })
            )
    }


    public debug(): Observable<string> {
        return this._clientHttp.get<string>('/kpo')
    }
}
