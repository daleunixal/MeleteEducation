import { MongoInteractive } from '../mongo-interactive/mongo-interactive.base';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { getModelForClass, mongoose, prop, Ref, ReturnModelType } from '@typegoose/typegoose';
import { from, map, Observable } from 'rxjs';
import { IUser } from './user.interface';
import * as jwt from 'jsonwebtoken'
import { secretJWT } from '../../configuration';
import dayjs from 'dayjs';
import { UserPayload } from './user.payload';
import * as bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';
import { CourseModel } from '../Course/course.model';

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
    public readonly _id: ObjectId
    @prop()
    public fullname: string;
    @prop({
        ref: () => CourseModel
    })
    public joinedCourses: Ref<CourseModel>[];

    constructor(data: IUser) {
        super();
        this.password = bcrypt.hashSync(data.password, 10);
        this.username = data.username;
        this.email = data.email
        this._id = data.id?? MongoInteractive.generateObjectID();
        this.fullname = data.fullname;
    }

    public static getModel(): ReturnModelType<typeof UserModel> {
        return getModelForClass(UserModel)
    }

    /**
     * Сохранение модели в DB
     */
    public saveModel(throwOnExist: boolean = false): Observable<boolean> {
        return from(UserModel.getModel().find({username: this.username}).exec()).pipe(
            map((response: HydratedDocument<DocumentType<UserModel>>[]): boolean => {
                if(response.length === 1){
                    if (throwOnExist){
                        throw new Error("User already exist")
                    }
                    const model = response[0] as DocumentType<UserModel>
                    model.password = this.password;
                    model.email = this.email;
                    model.fullname = this.fullname;
                    model.joinedCourses = this.joinedCourses;
                    model.save();

                    return true;
                }
                UserModel.getModel().create({
                    password: this.password,
                    username: this.username,
                    fullname: this.fullname,
                    email: this.email,
                    _id: UserModel.generateObjectID()
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
