import mongoose from 'mongoose';

export interface ICourse{
    id?: mongoose.Types.ObjectId,
    title: string,
    description: string,
    parts: {[index: number]: string},
    rawParts: mongoose.Types.ObjectId[]
}
