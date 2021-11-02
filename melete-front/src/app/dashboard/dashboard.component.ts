import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: "medu-dashboard",
    templateUrl: "dashboard.component.html",
    styleUrls: ["/styles/style.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit{
    public ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }

}
