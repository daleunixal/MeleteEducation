import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TuiRootModule, TuiDialogModule, TuiNotificationsModule, TUI_SANITIZER, TuiButtonModule, TuiScrollbarModule } from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLayerComponent } from './page-layout/page.component';
import { AsideLayerComponent } from './page-layout/children/aside/aside.component';
import { HeaderLayerComponent } from './page-layout/children/header/header.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TuiActionModule } from '@taiga-ui/kit';


@NgModule({
  declarations: [
    AppComponent,
    PageLayerComponent,
    AsideLayerComponent,
    HeaderLayerComponent,
    DashboardComponent,
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
        TuiActionModule
    ],
  providers: [
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    // {provide: MELETE_ENDPOINTS, useClass: }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
