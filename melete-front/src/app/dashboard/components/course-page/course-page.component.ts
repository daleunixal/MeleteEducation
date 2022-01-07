import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ICourseData } from './interfase/course-data.interfase';
import { safeUrl } from './pipe/safeUrl'
import courseData from './mock';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.less']
})
export class CoursePageComponent{

    public courseTitle: string[] = [];
    public themeVideo: string[] = [];
    public lessonNumber: number = 0;

    private _courseData: ICourseData[] = courseData;

    constructor(){
        this._courseData.forEach(
            (data: ICourseData) => {
                this.courseTitle.push(data.theme);
                this.themeVideo.push(data.video ? data.video : '');
            }
        );
        this.themeVideo.forEach(
            value => value.replace("watch?v=", "v/")
        );
    }

    public setTheme(title: string): void{
        this.lessonNumber = this.courseTitle.findIndex(value => value === title)
    }
}
