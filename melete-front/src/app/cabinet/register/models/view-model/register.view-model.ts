import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProfileRegisterRequest } from '../../../../models/interfaces/profile-register-request.interface';

export class RegisterViewModel{
    public form!: FormGroup
    private _fb: FormBuilder;

    constructor(formBuilder: FormBuilder) {
        this._fb = formBuilder
        this.initializeForm()
    }

    public toModel(): IProfileRegisterRequest{
        if(!this.form.valid){
            throw new Error("Profile form uncorrect")
        }

        return {
            username: this.form.get('login')?.value!,
            password: this.form.get('password')?.value!,
            email: this.form.get('email')?.value!,
            fullname: this.form.get('fullname')?.value!
        } as IProfileRegisterRequest
    }

    private initializeForm(): void{
        this.form = this._fb.group({
            login: ['', [Validators.required]],
            fullname: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.email, Validators.required]]
        })
    }
}
