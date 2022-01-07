import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePageComponent } from './dashboard/components/course-page/course-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'cabinet',
        loadChildren: () => import('./cabinet/cabinet.module').then(m => m.CabinetWebModule),
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'dashboard/TypeScript',
        component: CoursePageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
