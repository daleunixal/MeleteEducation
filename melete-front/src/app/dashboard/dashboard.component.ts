import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MeduNotificationService } from '../services/notification.service';

@Component({
    selector: "medu-dashboard",
    templateUrl: "dashboard.component.html",
    styleUrls: ["/styles/style.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit{
    public index = 0

    public courses: string[] = ['1','2','3','4']

    constructor(
        private _noti: MeduNotificationService,
    ) {
    }

    public ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }

    public goToAllCourses(): void{
        this._noti.sendNotImplemented()
    }

}
