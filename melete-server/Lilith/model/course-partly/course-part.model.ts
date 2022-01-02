import mongoose, { HydratedDocument } from 'mongoose';
import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';
import { MongoInteractive } from '../mongo-interactive/mongo-interactive.base';
import { ICoursePart } from './course-part.interface';
import { from, map, Observable } from 'rxjs';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { Material } from '../material/material.model';
import { CourseModel } from '../Course/course.model';

export class CoursePartModel extends MongoInteractive<CoursePartModel> implements ICoursePart{
    @prop()
    public readonly id?: mongoose.Types.ObjectId

    @prop()
    public description: string

    @prop()
    public total: number

    @prop({
        ref: () => Material
    })
    public materialList: Material;

    @prop({
        ref: () => CourseModel
    })
    public parent: CourseModel;


    constructor(data: ICoursePart) {
        super();
        this.description = data.description
        this.total = data.total
        this.materialList = data.materialList
        this.parent = data.parent
        this._id = data.id?? MongoInteractive.generateObjectID();
    }

    public static getModel(): ReturnModelType<typeof CoursePartModel> {
        return getModelForClass(CoursePartModel)
    }

    public saveModel(throwOnExist: boolean): Observable<boolean> {
        return from(CoursePartModel.getModel().findById(this.id).exec())
            .pipe(
                map((response: HydratedDocument<DocumentType<CoursePartModel>>): boolean => {
                    if(response){
                        response.description = this.description
                        response.total = this.total
                        response.parent = this.parent
                        response.materialList = this.materialList
                        response.save();

                        return true
                    }
                    CoursePartModel.getModel().create({
                        _id: this.id,
                        description: this.description,
                        total: this.total,
                        parent: this.parent,
                        materialList: this.materialList
                    })

                    return true
                })
            )
    }

}
