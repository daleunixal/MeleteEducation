import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TuiRootModule, TuiDialogModule, TuiNotificationsModule, TUI_SANITIZER } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLayerComponent } from './page-layout/page.component';
import { AsideLayerComponent } from './page-layout/children/aside/aside.component';
import { HeaderLayerComponent } from './page-layout/children/header/header.component';
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
  declarations: [
    AppComponent,
    PageLayerComponent,
    AsideLayerComponent,
    HeaderLayerComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      TuiRootModule,
      BrowserAnimationsModule,
      TuiDialogModule,
      TuiNotificationsModule
],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
