import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    TuiRootModule,
    TuiDialogModule,
    TuiNotificationsModule,
    TUI_SANITIZER,
    TuiButtonModule,
    TuiScrollbarModule
} from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLayerComponent } from './page-layout/page.component';
import { AsideLayerComponent } from './page-layout/children/aside/aside.component';
import { HeaderLayerComponent } from './page-layout/children/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
    TuiActionModule,
    TuiAvatarModule,
    TuiCarouselModule,
    TuiIslandModule,
    TuiPaginationModule, TuiProgressModule
} from '@taiga-ui/kit';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProfileManagerService } from './services/profile-manager.service';
import { TuiLetModule } from '@taiga-ui/cdk';
import { CoursePlateComponent } from './dashboard/components/course-plate/course-plate.component';
import { CoursePageComponent } from './dashboard/components/course-page/course-page.component';
import { safeUrl } from './dashboard/components/course-page/pipe/safeUrl';

@NgModule({
    declarations: [
        AppComponent,
        PageLayerComponent,
        AsideLayerComponent,
        HeaderLayerComponent,
        DashboardComponent,
        CoursePlateComponent,
        CoursePageComponent,
        safeUrl
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        TuiRootModule,
        BrowserAnimationsModule,
        TuiDialogModule,
        TuiNotificationsModule,
        TuiButtonModule,
        TuiScrollbarModule,
        TuiActionModule,
        HttpClientModule,
        TuiLetModule,
        TuiAvatarModule,
        TuiCarouselModule,
        TuiIslandModule,
        TuiPaginationModule,
        TuiProgressModule
    ],
    providers: [
        {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
        HttpClient,
        ProfileManagerService,
        // {provide: MELETE_ENDPOINTS, useClass: }

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
