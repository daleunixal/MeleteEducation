import mongoose, { HydratedDocument } from 'mongoose';
import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';
import { MongoInteractive } from '../mongo-interactive/mongo-interactive.base';
import { ICourse } from './course.interface';
import { from, map, Observable } from 'rxjs';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { UserModel } from '../user/user.model';

export class CourseModel extends MongoInteractive<CourseModel> implements ICourse{
    @prop()
    public readonly id?: mongoose.Types.ObjectId
    @prop()
    public title: string
    @prop()
    public description: string
    @prop()
    public parts: string[]
    @prop()
    public rawParts: mongoose.Types.ObjectId[]

    public static getModel(): ReturnModelType<typeof CourseModel> {
        return getModelForClass(CourseModel)
    }

    public saveModel(throwOnExist: boolean): Observable<boolean> {
        return from(CourseModel.getModel().findById(this.id).exec())
            .pipe(
                map((response: HydratedDocument<DocumentType<CourseModel>>): boolean => {
                    if(response){
                        response.title = this.title
                        response.description = this.description
                        response.parts = this.parts
                        response.rawParts = this.rawParts
                        response.save();

                        return true
                    }
                    CourseModel.getModel().create({
                        _id: CourseModel.generateObjectID(),
                        title: this.title,
                        description: this.description,
                        parts: this.parts,
                        rawParts: this.rawParts,
                    })

                    return true
                })
            )
    }
}
