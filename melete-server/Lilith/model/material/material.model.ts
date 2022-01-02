import { IMaterial } from './course-material.interface';
import { BaseContext } from './context/base-context.model';
import { ICoursePart } from '../course-partly/course-part.interface';
import { MaterialType } from './enums/material-type.enum';
import { mongoose, prop } from '@typegoose/typegoose';
import { CoursePartModel } from '../course-partly/course-part.model';

export class Material implements IMaterial<any>{
    @prop()
    public context: BaseContext<any>;
    @prop()
    public id: mongoose.Types.ObjectId;
    @prop({
        ref: () => CoursePartModel
    })
    public parent: CoursePartModel;
    @prop()
    public type: MaterialType;

}
