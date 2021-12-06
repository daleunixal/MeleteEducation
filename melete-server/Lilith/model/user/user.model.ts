import { MongoInteractive } from '../mongo-interactive/mongo-interactive.base';
import { AnyParamConstructor, DocumentType } from '@typegoose/typegoose/lib/types';
import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { IUser } from './user.interface';

export class UserModel extends MongoInteractive<UserModel> implements IUser {
    @prop()
    public admin: boolean;
    @prop()
    public password: string;
    @prop()
    public username: string;
    @prop()
    public email: string;


    constructor(data: IUser) {
        super(UserModel);
        this.password = data.password;
        this.username = data.username;
        this.email = data.email
    }

    // @ts-ignore
    public getModel(): ReturnModelType<UserModel> {
        if(this.dataModel){
            return this.dataModel
        }

        // this.dataModel = getModelForClass(UserModel);
    }

    /**
     * Сохранение модели в DB
     */
    public saveModel(throwOnExist: boolean = false): Observable<boolean> {
        return from(this.dataModel.find({username: this.username}).exec()).pipe(
            map((response): boolean => {
                if(response.length === 1){
                    if (throwOnExist){
                        throw new Error("User already exist")
                    }
                    const model = response[0] as DocumentType<UserModel>
                    model.password = this.password
                    model.email = this.email
                    model.save();

                    return true;
                }
                this.dataModel.create({
                    password: this.password,
                    username: this.username,
                    email: this.email
                })

                return true;
            })
        );
    }

    /**
     * Заполнение модели для отправки на DBM
     * @param data
     * @protected
     */
    protected fillModel(data: DocumentType<UserModel>){
        // data.password = this.password;

    }
}
