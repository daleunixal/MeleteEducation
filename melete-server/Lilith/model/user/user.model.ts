import { MongoInteractive } from '../mongo-interactive/mongo-interactive.base';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';
import { Observable } from 'rxjs';

export class UserModel extends MongoInteractive<UserModel>{
    @prop()
    public readonly admin: boolean;
    @prop()
    public readonly password: string;
    @prop()
    public readonly username: string;


    constructor(admin: boolean, password: string, username: string) {
        super(UserModel);
        this.admin = admin;
        this.password = password;
        this.username = username;
    }

    // @ts-ignore
    public getModel(): ReturnModelType<UserModel> {
        if(this.dataModel){
            return this.dataModel
        }

        // this.dataModel = getModelForClass(UserModel);
    }

    public saveModel(): Observable<boolean> {
        return undefined;
    }
}
