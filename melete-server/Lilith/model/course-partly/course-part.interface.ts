import mongoose from 'mongoose';
import { ICourse } from '../Course/course.interface';
import { Material } from '../material/material.model';
import { prop } from '@typegoose/typegoose';
import { CourseModel } from '../Course/course.model';
import { ObjectId } from 'mongodb';

export interface ICoursePart{
    id?: ObjectId,
    parent: CourseModel,
    description: string,
    materialList: Material
    total: number
}
