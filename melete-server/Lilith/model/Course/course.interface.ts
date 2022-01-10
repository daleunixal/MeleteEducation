import mongoose from 'mongoose';
import { CoursePartModel } from '../course-partly/course-part.model';
import { ObjectId } from 'mongodb';

export interface ICourse{
    id?: ObjectId,
    title: string,
    description: string,
    rawParts: CoursePartModel[]
}
