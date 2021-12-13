import * as mongoose from 'mongoose';

export interface IUser {
    email?: string
    password: string
    username: string,
    id?: mongoose.Types.ObjectId
}
