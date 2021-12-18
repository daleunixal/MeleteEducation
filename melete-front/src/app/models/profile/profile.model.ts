import { IProfile } from '../interfaces/progile.interface';

export class ProfileModel{
    public readonly fullname!: string

    constructor(data?: IProfile) {
        if(data){
            this.fullname = data?.fullname;
        }
    }
}
