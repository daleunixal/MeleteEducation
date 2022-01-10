import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICourse } from '../models/interfaces/course-plate.interface';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CourseManagerService{

    private _courses: ICourse[] = [
        {
            id: '1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida fringilla varius. Mauris accumsan feugiat sem, eu commodo nisl feugiat tempus. Aliquam pretium et nunc et gravida. Integer varius tristique molestie',
            title: "JavaScript"
        },
        {
            id: '2',
            title: 'Lorem Ipsum!',
            description: 'Curabitur sit amet risus cursus, malesuada tellus sit amet, ornare turpis. In urna ipsum, pretium sed tincidunt at, varius quis metus. Sed accumsan risus turpis, vel vulputate dolor laoreet vel. Curabitur pellentesque lacus in pharetra gravida. Donec justo elit, sollicitudin ac egestas vel, finibus eget massa'
        },
        {
            id: '4',
            title: 'Taiga is awesome',
            description: 'Curabitur sit amet risus cursus, malesuada tellus sit amet, ornare turpis. In urna ipsum, pretium sed tincidunt at, varius quis metus. Sed accumsan risus turpis, vel vulputate dolor laoreet vel. Curabitur pellentesque lacus in pharetra gravida. Donec justo elit, sollicitudin ac egestas vel, finibus eget massa'
        },
        {
            id: '3',
            title: 'TypeScript',
            description: 'Курс по TypeScript, РТФ - 3 семестр / 2021 год. Ведущий: CTO Abanking'
        }
    ]

    constructor() {
    }

    public getPlateDescripton(id: string): Observable<ICourse>{
        return of(this._courses).pipe(
            map((value: ICourse[]): ICourse =>{
                return value.find(q => q.id === id)!
            })
        )
    }
}
