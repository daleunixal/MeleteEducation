import { MongoInteractive } from '../mongo-interactive/mongo-interactive.base';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { mongoose, prop, ReturnModelType } from '@typegoose/typegoose';
import { from, map, Observable } from 'rxjs';
import { IUser } from './user.interface';
import * as jwt from 'jsonwebtoken'
import { secretJWT } from '../../configuration';
import dayjs from 'dayjs';
import { UserPayload } from './user.payload';

export class UserModel extends MongoInteractive<UserModel> implements IUser {
    @prop()
    public admin: boolean;
    @prop()
    public password: string;
    @prop()
    public username: string;
    @prop()
    public email: string;
    @prop()
    public readonly _id: mongoose.Types.ObjectId


    constructor(data: IUser) {
        super(UserModel);
        this.password = data.password;
        this.username = data.username;
        this.email = data.email
        this._id = data.id?? MongoInteractive.generateObjectID();
    }

    // @ts-ignore
    public static getModel(): ReturnModelType<UserModel> {
        if(this.dataModel){
            return this.dataModel
        }

        // this.dataModel = getModelForClass(UserModel);
    }

    /**
     * Сохранение модели в DB
     */
    public saveModel(throwOnExist: boolean = false): Observable<boolean> {
        return from(UserModel.dataModel.find({username: this.username}).exec()).pipe(
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
                UserModel.dataModel.create({
                    password: this.password,
                    username: this.username,
                    email: this.email
                })

                return true;
            })
        );
    }

    public getToken(): string{
        return jwt.sign({
            payload: {
                admin: this.admin,
                id: this._id
            },
            expire: dayjs().add(72, 'h').unix()
        } as UserPayload, secretJWT)
    }

    /**
     * Заполнение модели для отправки на DBM
     * @param data
     * @protected
     */
    protected fillModel(data: DocumentType<UserModel>){
        // data.password = this.password;
        data.password = this.password;
        data.email = this.email;
    }
}
