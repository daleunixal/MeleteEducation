import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "page-layout",
    templateUrl: "./page.component.html",
    styleUrls: ["./styles/style.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLayerComponent{

}