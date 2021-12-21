import { ensuredRequest } from '../../../../utils/ensure-authenticated.middleware';
import { Response } from 'express';
import { from, map } from 'rxjs';
import { CourseModel } from '../../../../model/Course/course.model';

export function getAllCourses(request: ensuredRequest, response: Response) {
    from(CourseModel.getModel().find().exec())
        .pipe(
            map((modelList) => {
                response.send({
                    models: modelList
                        .map((x) => x.toJSON())
                })
            })
        )
        .subscribe()
}
