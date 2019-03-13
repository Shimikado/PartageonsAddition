import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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
    {path: 'validate-bill', loadChildren: './validate-bill/validate-bill.module#ValidateBillPageModule'},
    {path: 'register', loadChildren: './register/register.module#RegisterPageModule'},
    {path: 'result', loadChildren: './result/result.module#ResultPageModule'},
    // {path: 'payer-pour-modal', loadChildren: './result/payer-pour-modal/payer-pour-modal.module#PayerPourModalPageModule'},
    /* { path: 'payer-pour-modal', loadChildren: './result/payer-pour-modal/payer-pour-modal.module#PayerPourModalPageModule' },*/

    /*    { path: 'ModalItemBill', loadChildren: './validate-bill/modal-item-bill/modal-item-bill.module#ModalItemBillPageModule' },
      { path: 'user-join', loadChildren: './list/user-join/user-join.module#UserJoinPageModule' },
      { path: 'debt-modal', loadChildren: './debt/debt-modal/debt-modal.module#DebtModalPageModule' },*/


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
