import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: "medu-dashboard",
    templateUrl: "dashboard.component.html",
    styleUrls: ["/styles/style.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit{
    public index = 0

    public courses: string[] = ['1','2','3','4']

    public ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }

}
