import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    {
        path: 'list',
        loadChildren: './list/list.module#ListPageModule'
    },
    {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule'},
    {path: 'scan', loadChildren: './scan/scan.module#ScanPageModule'},
    {path: 'join', loadChildren: './join/join.module#JoinPageModule'},
    {path: 'historic', loadChildren: './historic/historic.module#HistoricPageModule'},
    {path: 'debt', loadChildren: './debt/debt.module#DebtPageModule'},
    {path: 'bill', loadChildren: './bill/bill.module#BillPageModule'},
    {path: 'validate-bill', loadChildren: './validate-bill/validate-bill.module#ValidateBillPageModule'}


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
