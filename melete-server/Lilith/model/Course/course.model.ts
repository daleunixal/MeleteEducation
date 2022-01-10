import mongoose, { HydratedDocument } from 'mongoose';
import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';
import { MongoInteractive } from '../mongo-interactive/mongo-interactive.base';
import { ICourse } from './course.interface';
import { from, map, Observable } from 'rxjs';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { CoursePartModel } from '../course-partly/course-part.model';
import { ObjectId } from 'mongodb';

export class CourseModel extends MongoInteractive<CourseModel> implements ICourse{
    @prop()
    public readonly id?: ObjectId
    @prop()
    public title: string
    @prop()
    public description: string
    @prop({
        ref: () => CoursePartModel
    })
    public rawParts: CoursePartModel[]

    constructor(data: ICourse) {
        super();
        this.id = data.id?? MongoInteractive.generateObjectID();
        this.title = data.title
        this.description = data.description
        this.rawParts = data.rawParts
    }

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
                        response.rawParts = this.rawParts
                        response.save();

                        return true
                    }
                    CourseModel.getModel().create({
                        _id: this.id,
                        title: this.title,
                        description: this.description,
                        rawParts: this.rawParts,
                    })

                    return true
                })
            )
    }
}
