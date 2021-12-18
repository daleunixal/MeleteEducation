import mongoose, { HydratedDocument } from 'mongoose';
import { getModelForClass, prop, Ref, ReturnModelType } from '@typegoose/typegoose';
import { MongoInteractive } from '../mongo-interactive/mongo-interactive.base';
import { ICoursePart } from './course-part.interface';
import { from, map, Observable } from 'rxjs';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { UserModel } from '../user/user.model';

export class CoursePartModel extends MongoInteractive<CoursePartModel> implements ICoursePart{
    @prop()
    public readonly id?: mongoose.Types.ObjectId

    @prop()
    public description: string

    @prop()
    public videoLink: string

    @prop()
    public total: number

    @prop({
        ref: () => UserModel
    })
    public userOwner: Ref<UserModel>



    constructor(data: ICoursePart) {
        super();
        this.description = data.description
        this.videoLink = data.videoLink
        this.total = data.total

    }

    public static getModel(): ReturnModelType<typeof CoursePartModel> {
        return getModelForClass(CoursePartModel)
    }

    public saveModel(throwOnExist: boolean): Observable<boolean> {
        return from(CoursePartModel.getModel().findById(this.id).exec())
            .pipe(
                map((response: HydratedDocument<DocumentType<CoursePartModel>>): boolean => {
                    if(response){
                        response.videoLink = this.videoLink
                        response.description = this.description
                        response.total = this.total
                        response.save();

                        return true
                    }
                    CoursePartModel.getModel().create({
                        _id: CoursePartModel.generateObjectID(),
                        videoLink: this.videoLink,
                        description: this.description,
                        total: this.total,
                        userOwner: this.userOwner,
                    })

                    return true
                })
            )
    }
}
