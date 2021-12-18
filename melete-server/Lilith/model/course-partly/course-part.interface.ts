import mongoose from 'mongoose';
import { Ref } from '@typegoose/typegoose';
import { UserModel } from '../user/user.model';

export interface ICoursePart{
    id?: mongoose.Types.ObjectId
    description: string,
    videoLink: string,
    total: number
    userOwner: Ref<UserModel>
}
