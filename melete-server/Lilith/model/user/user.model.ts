import { MongoInteractive } from '../mongo-interactive/mongo-interactive.base';
import { AnyParamConstructor, DocumentType } from '@typegoose/typegoose/lib/types';
import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';
import { Observable, switchMap } from 'rxjs';
import { fromPromise } from 'rxjs/dist/types/internal/observable/innerFrom';

export class UserModel extends MongoInteractive<UserModel>{
    @prop()
    public readonly admin: boolean;
    @prop()
    public readonly password: string;
    @prop()
    public readonly username: string;
    @prop()
    public readonly email: string;


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

    /**
     * Сохранение модели в DB
     */
    public saveModel(): Observable<boolean> {
        return fromPromise(this.dataModel.find({email: this.email}).exec()).pipe(
            switchMap((response) => {
                if(response.length === 1){
                    return response[0] as DocumentType<UserModel>
                }
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
