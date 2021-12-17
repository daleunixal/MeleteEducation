import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: "header-layer",
    templateUrl: "./header.component.html",
    styleUrls: ['styles/styles.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLayerComponent{

    constructor(
        private _router: Router
    ) {
    }

    public redirectLogin(): void{
        this._router.navigateByUrl('/cabinet/login')
    }
}
