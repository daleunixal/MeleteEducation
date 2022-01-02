import mongoose from 'mongoose';
import { ICourse } from '../Course/course.interface';
import { Material } from '../material/material.model';
import { prop } from '@typegoose/typegoose';
import { CourseModel } from '../Course/course.model';

export interface ICoursePart{
    id?: mongoose.Types.ObjectId,
    parent: CourseModel,
    description: string,
    materialList: Material
    total: number
}
