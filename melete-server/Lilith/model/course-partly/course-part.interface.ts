import mongoose from 'mongoose';

export interface ICoursePart{
    id?: mongoose.Types.ObjectId
    description: string,
    videoLink: string,
    total: number
}
