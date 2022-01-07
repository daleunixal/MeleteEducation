import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseManagerService } from '../../../services/course-manager.service';
import { ICourse } from '../../../models/interfaces/course-plate.interface';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-course-plate',
    templateUrl: './course-plate.component.html',
    styleUrls: ['./course-plate.component.less']
})
export class CoursePlateComponent implements OnInit {

    @Input()
    public id!: string;

    public sucessProcent: number = 86;

    public course!: ICourse;

    constructor(
        private _router: Router,
        private _cpm: CourseManagerService,
    ) {
    }

    public ngOnInit(): void {
        this._cpm.getPlateDescripton(this.id)
            .pipe(
                tap((val) => this.course = val)
            )
            .subscribe();
    }

    public goToCourse(): void {
        if(this.course.id !== '3'){
            return
        }
        this._router.navigateByUrl(`dashboard/${this.course.title}`)
    }

}
