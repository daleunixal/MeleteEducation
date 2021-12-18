import mongoose from 'mongoose';
import { prop } from '@typegoose/typegoose';
import { MongoInteractive } from '../mongo-interactive/mongo-interactive.base';
import { ICoursePart } from './course-part.interface';

export class CoursePart extends MongoInteractive<CoursePart> implements ICoursePart{
    @prop()
    public readonly id?: mongoose.Types.ObjectId

    @prop()
    public description: string

    @prop()
    public videoLink: string

    @prop()
    public total: number
}
