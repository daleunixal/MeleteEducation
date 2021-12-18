import mongoose from 'mongoose';
import { prop } from '@typegoose/typegoose';
import { MongoInteractive } from '../mongo-interactive/mongo-interactive.base';
import { ICourse } from './course.interface';

export class Course extends MongoInteractive<Course> implements ICourse{
    @prop()
    public readonly id?: mongoose.Types.ObjectId
    @prop()
    public title: string
    @prop()
    public description: string
    @prop()
    public parts: {[index: number]: string}
    @prop()
    public rawParts: mongoose.Types.ObjectId[]
}
