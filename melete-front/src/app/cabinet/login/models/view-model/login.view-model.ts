import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProfileRegisterRequest } from '../../../../models/interfaces/profile-register-request.interface';
import { IProfileLoginResponse } from '../../../../models/interfaces/profile-login-response.interface';
import { IProfileLoginRequest } from '../../../../models/interfaces/profile-login-request.interface';

export class LoginViewModel {
    public form!: FormGroup
    private _fb: FormBuilder;

    constructor(formBuilder: FormBuilder) {
        this._fb = formBuilder
        this.initializeForm()
    }

    public toModel(): IProfileLoginRequest{
        if(!this.form.valid){
            throw new Error("Profile form uncorrect")
        }

        return {
            username: this.form.get('login')?.value!,
            password: this.form.get('password')?.value!,
        } as IProfileLoginRequest
    }

    public setUsername(username: string): void{
        this.form.get('login')?.setValue(username);
    }

    private initializeForm(): void{
        this.form = this._fb.group({
            login: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(3)]],
        })
    }
}
