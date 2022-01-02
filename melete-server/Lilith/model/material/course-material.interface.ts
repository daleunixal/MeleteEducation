import mongoose from 'mongoose';
import { ICoursePart } from '../course-partly/course-part.interface';
import { MaterialType } from './enums/material-type.enum';
import { BaseContext } from './context/base-context.model';
import { CoursePartModel } from '../course-partly/course-part.model';

export interface IMaterial<T> {
    id?: mongoose.Types.ObjectId,
    parent: CoursePartModel
    type: MaterialType
    context: BaseContext<T>
}
